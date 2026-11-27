/* Gerador compacto de QR Code em SVG (sem internet, sem bibliotecas externas).
   Suporta URLs e textos UTF-8 até ~150 caracteres (versões 1 a 8, correção nível M). */
window.QRCodeSVG = (() => {
  'use strict';
  // Tabela de parâmetros para versões 1..8 no nível M (total bytes, ec por bloco, blocos)
  const VERS = [
    null,
    [26, 10, 1], [44, 16, 1], [70, 26, 1], [100, 18, 2],
    [134, 24, 2], [172, 16, 4], [196, 18, 4], [242, 22, 4]
  ];
  const ALINH = [null, [], [6, 18], [6, 22], [6, 26], [6, 30], [6, 34], [6, 22, 38], [6, 24, 42]];
  // Polinômios de Reed-Solomon no corpo GF(256) com polinômio primitivo 0x11D
  const EXP = new Uint8Array(512), LOG = new Uint8Array(256);
  for (let i = 0, x = 1; i < 255; i++) { EXP[i] = EXP[i + 255] = x; LOG[x] = i; x = (x << 1) ^ (x & 128 ? 0x11d : 0); }
  const mul = (a, b) => (a && b) ? EXP[LOG[a] + LOG[b]] : 0;
  function rsDiv(grau) {
    let p = [1];
    for (let i = 0; i < grau; i++) {
      const n = new Array(p.length + 1).fill(0);
      for (let j = 0; j < p.length; j++) { n[j] ^= p[j]; n[j + 1] ^= mul(p[j], EXP[i]); }
      p = n;
    }
    return p;
  }
  function rsResto(dados, ec) {
    const gen = rsDiv(ec), res = new Uint8Array(ec);
    for (const b of dados) {
      const f = b ^ res[0];
      res.copyWithin(0, 1); res[ec - 1] = 0;
      for (let i = 0; i < ec; i++) res[i] ^= mul(gen[i + 1], f);
    }
    return res;
  }
  // Código BCH(15,5) para informação de formato (nível M = 00)
  function formatoBits(mask) {
    const d = (0b00 << 3) | mask;
    let r = d << 10;
    for (let i = 14; i >= 10; i--) if ((r >> i) & 1) r ^= 0x537 << (i - 10);
    return ((d << 10) | r) ^ 0x5412;
  }
  // Versão >= 7 exige bits de versão BCH(18,6)
  function versaoBits(ver) {
    let r = ver << 12;
    for (let i = 17; i >= 12; i--) if ((r >> i) & 1) r ^= 0x1f25 << (i - 12);
    return (ver << 12) | r;
  }

  function gerarMatriz(texto) {
    const bytes = new TextEncoder().encode(String(texto || ''));
    let ver = 1;
    for (; ver < VERS.length; ver++) {
      const [tot, ec, blk] = VERS[ver];
      const cap = tot - ec * blk;
      if (bytes.length + 2 <= cap) break;
    }
    if (ver >= VERS.length) throw new Error('Texto longo demais para o QR Code');
    const [tot, ecPorBloco, numBlocos] = VERS[ver];
    const capDados = tot - ecPorBloco * numBlocos;

    // Monta fluxo de bits (modo Byte = 0100 + tamanho 8 bits + dados + terminador + padding)
    const bits = [];
    const empilhar = (val, n) => { for (let i = n - 1; i >= 0; i--) bits.push((val >> i) & 1); };
    empilhar(0b0100, 4);
    empilhar(bytes.length, 8);
    for (const b of bytes) empilhar(b, 8);
    empilhar(0, Math.min(4, capDados * 8 - bits.length));
    while (bits.length % 8) bits.push(0);
    const codewords = [];
    for (let i = 0; i < bits.length; i += 8) {
      let b = 0; for (let j = 0; j < 8; j++) b = (b << 1) | bits[i + j];
      codewords.push(b);
    }
    for (let p = 0; codewords.length < capDados; p++) codewords.push(p % 2 === 0 ? 0xec : 0x11);

    // Divide em blocos e intercala dados + correção de erro
    const curtos = numBlocos - (capDados % numBlocos), tamCurto = Math.floor(capDados / numBlocos);
    const blocosD = [], blocosE = [];
    for (let i = 0, pos = 0; i < numBlocos; i++) {
      const tam = tamCurto + (i >= curtos ? 1 : 0);
      const d = codewords.slice(pos, pos + tam); pos += tam;
      blocosD.push(d); blocosE.push(rsResto(d, ecPorBloco));
    }
    const finalBytes = [];
    for (let i = 0; i < tamCurto + 1; i++) for (const b of blocosD) if (i < b.length) finalBytes.push(b[i]);
    for (let i = 0; i < ecPorBloco; i++) for (const b of blocosE) finalBytes.push(b[i]);

    // Monta a matriz (17 + 4*ver)
    const N = 17 + 4 * ver;
    const m = Array.from({ length: N }, () => new Int8Array(N)); // 0=branco, 1=preto
    const fixo = Array.from({ length: N }, () => new Uint8Array(N));
    const set = (r, c, v) => { if (r >= 0 && r < N && c >= 0 && c < N) { m[r][c] = v ? 1 : 0; fixo[r][c] = 1; } };

    // Padrões de localização (3 cantos) + separadores
    const finder = (r0, c0) => {
      for (let dr = -1; dr <= 7; dr++) for (let dc = -1; dc <= 7; dc++) {
        const fora = dr < 0 || dr > 6 || dc < 0 || dc > 6;
        const preto = !fora && (dr === 0 || dr === 6 || dc === 0 || dc === 6 || (dr >= 2 && dr <= 4 && dc >= 2 && dc <= 4));
        set(r0 + dr, c0 + dc, preto);
      }
    };
    finder(0, 0); finder(0, N - 7); finder(N - 7, 0);

    // Padrões de alinhamento
    const al = ALINH[ver];
    for (const r of al) for (const c of al) {
      if (fixo[r][c]) continue;
      for (let dr = -2; dr <= 2; dr++) for (let dc = -2; dc <= 2; dc++)
        set(r + dr, c + dc, Math.max(Math.abs(dr), Math.abs(dc)) !== 1);
    }

    // Faixas de temporização
    for (let i = 8; i < N - 8; i++) { set(6, i, i % 2 === 0); set(i, 6, i % 2 === 0); }
    set(N - 8, 8, 1); // módulo escuro fixo

    // Reserva áreas de formato e versão (ISO/IEC 18004: bit 14 = MSB, bit 0 = LSB)
    const gravarFormato = (mat, mask, marcarFixo) => {
      const f = formatoBits(mask);
      const put = (r, c, bit) => { mat[r][c] = bit ? 1 : 0; if (marcarFixo) fixo[r][c] = 1; };
      for (let i = 0; i <= 5; i++) put(8, i, (f >> (14 - i)) & 1);
      put(8, 7, (f >> 8) & 1); put(8, 8, (f >> 7) & 1); put(7, 8, (f >> 6) & 1);
      for (let i = 0; i <= 5; i++) put(i, 8, (f >> i) & 1);
      for (let i = 0; i < 7; i++) put(N - 1 - i, 8, (f >> (14 - i)) & 1);
      for (let i = 0; i < 8; i++) put(8, N - 8 + i, (f >> (7 - i)) & 1);
    };
    gravarFormato(m, 0, true);
    if (ver >= 7) {
      const vb = versaoBits(ver);
      for (let i = 0; i < 18; i++) {
        const bit = (vb >> i) & 1, a = Math.floor(i / 3), b = N - 11 + (i % 3);
        set(a, b, bit); set(b, a, bit);
      }
    }

    // Escreve os dados em zigue-zague
    let bitIdx = 0;
    for (let col = N - 1; col >= 1; col -= 2) {
      if (col === 6) col--;
      const sobe = ((N - 1 - col) >> 1) % 2 === 0;
      for (let step = 0; step < N; step++) {
        const r = sobe ? N - 1 - step : step;
        for (let dc = 0; dc < 2; dc++) {
          const c = col - dc;
          if (fixo[r][c]) continue;
          const b = bitIdx < finalBytes.length * 8 ? (finalBytes[bitIdx >> 3] >> (7 - (bitIdx & 7))) & 1 : 0;
          m[r][c] = b; bitIdx++;
        }
      }
    }

    // Escolhe a melhor máscara (menor penalidade) entre as 8 máscaras padrão
    const mascaras = [
      (r, c) => (r + c) % 2 === 0,
      (r) => r % 2 === 0,
      (_, c) => c % 3 === 0,
      (r, c) => (r + c) % 3 === 0,
      (r, c) => (Math.floor(r / 2) + Math.floor(c / 3)) % 2 === 0,
      (r, c) => ((r * c) % 2) + ((r * c) % 3) === 0,
      (r, c) => (((r * c) % 2) + ((r * c) % 3)) % 2 === 0,
      (r, c) => (((r + c) % 2) + ((r * c) % 3)) % 2 === 0
    ];
    const penalidade = mat => {
      let p = 0, escuros = 0;
      for (let r = 0; r < N; r++) {
        let run = 1;
        for (let c = 0; c < N; c++) {
          if (mat[r][c]) escuros++;
          if (c > 0) { if (mat[r][c] === mat[r][c - 1]) { run++; if (run === 5) p += 3; else if (run > 5) p++; } else run = 1; }
          if (r > 0 && c > 0 && mat[r][c] === mat[r - 1][c] && mat[r][c] === mat[r][c - 1] && mat[r][c] === mat[r - 1][c - 1]) p += 3;
        }
      }
      for (let c = 0; c < N; c++) {
        let run = 1;
        for (let r = 1; r < N; r++) {
          if (mat[r][c] === mat[r - 1][c]) { run++; if (run === 5) p += 3; else if (run > 5) p++; } else run = 1;
        }
      }
      p += Math.floor(Math.abs(escuros * 20 / (N * N) - 10)) * 10;
      return p;
    };

    let melhorM = null, melhorP = Infinity, melhorMask = 0;
    for (let k = 0; k < 8; k++) {
      const mat = m.map((row, r) => row.map((v, c) => fixo[r][c] ? v : (v ^ (mascaras[k](r, c) ? 1 : 0))));
      gravarFormato(mat, k, false);
      const pen = penalidade(mat);
      if (pen < melhorP) { melhorP = pen; melhorM = mat; melhorMask = k; }
    }
    return { matriz: melhorM, tamanho: N, mask: melhorMask };
  }

  return function qrSvg(texto, cor = '#1d1a17', margem = 4) {
    const { matriz, tamanho } = gerarMatriz(texto);
    const total = tamanho + margem * 2;
    let d = '';
    for (let r = 0; r < tamanho; r++) {
      for (let c = 0; c < tamanho; c++) {
        if (matriz[r][c]) d += `M${c + margem},${r + margem}h1v1h-1z`;
      }
    }
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${total} ${total}" shape-rendering="crispEdges" role="img" aria-label="QR Code"><rect width="${total}" height="${total}" fill="#ffffff"/><path d="${d}" fill="${cor}"/></svg>`;
  };
})();
