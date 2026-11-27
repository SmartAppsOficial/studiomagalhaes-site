/* Catálogo digital · modelo Cosméticos, perfumaria e beleza
   Loja de DEMONSTRAÇÃO: nome, endereço, produtos e preços são exemplos. */
window.LOJA = {
  id: 'demo-cosmeticos',
  demo: true,
  tipo: 'loja',
  senhaDemo: '1234',
  ramo: 'Cosméticos, perfumaria e beleza',

  visual: {
    nome: 'Essência Viva',
    segmento: 'Perfumaria, maquiagem e skincare',
    sigla: 'EV',
    cores: { p: '#b84b76', d: '#e9c47b', escuro: '#2a1622', fundo: '#fdf8fa' },
    fontes: { t: "'Playfair Display', Georgia, serif", c: "'Nunito Sans', system-ui, sans-serif" },
    cena: 'beleza'
  },
  textos: {
    selo: 'Originais com pronta entrega',
    titulo: 'Beleza, fragrâncias e kits prontos para encantar.',
    sub: 'Escolha seu tom de pele, cor de batom, fragrância favorita ou monte um kit de presente com cartão direto pelo WhatsApp.',
    botao: 'Ver o catálogo',
    busca: 'Buscar perfume, base, batom, kit...',
    obsPlaceholder: 'Ex.: embrulhar para presente, enviar amostra de fragrância'
  },

  dados: {
    loja: {
      whats: '',
      endereco: 'Rua Moreira César, 180 · Loja 05',
      cidade: 'Sua cidade · UF',
      horario: {
        0: [['10:00', '18:00']], 1: [['09:00', '20:00']], 2: [['09:00', '20:00']], 3: [['09:00', '20:00']],
        4: [['09:00', '20:00']], 5: [['09:00', '20:00']], 6: [['09:00', '19:00']]
      },
      fechadaAgora: false,
      avisoFechada: 'Hoje estamos fechados. Voltamos amanhã!',
      entrega: {
        ativa: true,
        tempo: 'Entrega no mesmo dia na região',
        bairros: [
          { nome: 'Centro', taxa: 7 }, { nome: 'Icaraí / Jardim', taxa: 9 }, { nome: 'Bairro Norte', taxa: 11 },
          { nome: 'Vila Nova', taxa: 12 }, { nome: 'Envio pelos Correios (combinar)', taxa: 0 }
        ]
      },
      retirada: true,
      tempoRetirada: 'Pronto em 20 min',
      pedidoMinimo: 0,
      pagamentos: ['Pix', 'Cartão de crédito em até 6x', 'Cartão de débito', 'Dinheiro']
    },

    equipe: [
      { id: 'f-leticia', nome: 'Letícia · consultora (exemplo)', pin: '1111', ativo: true, permissoes: { pedidos: true, situacao: true, esgotado: true } },
      { id: 'f-sofia', nome: 'Sofia · estoque (exemplo)', pin: '1111', ativo: true, permissoes: { pedidos: true, esgotado: true, produtos: true } }
    ],
    entregadores: [
      { id: 'e-carlos', nome: 'Carlos · entregas (exemplo)', whats: '(21) 99999-1234', ativo: true }
    ],
    cupons: [
      { codigo: 'BELEZA10', tipo: 'pct', valor: 10, minimo: 100, ativo: true }
    ],

    categorias: [
      { id: 'perfumaria', nome: 'Perfumaria', icone: 'cat-cosmetico' },
      { id: 'maquiagem', nome: 'Maquiagem', icone: 'cat-estrela' },
      { id: 'skincare', nome: 'Skincare e corpo', icone: 'cat-promo' },
      { id: 'cabelos', nome: 'Cabelos', icone: 'cat-acessorio' },
      { id: 'kits-presente', nome: 'Kits de presente', icone: 'cat-presente' }
    ],

    grupos: [
      { id: 'volume-perf', nome: 'Volume', tipo: 'um', obrig: true, itens: [
        { nome: '50 ml', preco: 0 }, { nome: '100 ml', preco: 55 }] },
      { id: 'fragrancia', nome: 'Fragrância', tipo: 'um', obrig: true, itens: [
        { nome: 'Floral Jasmim & Pera', preco: 0 },
        { nome: 'Baunilha & Âmbar Doce', preco: 0 },
        { nome: 'Frutas Vermelhas & Rosa', preco: 0 },
        { nome: 'Amadeirado Fresco (unissex)', preco: 0 }] },
      { id: 'tom-pele', nome: 'Tom de pele', tipo: 'um', obrig: true, itens: [
        { nome: 'Tom 01 · Claro rosado', cor: '#f3d5c1', preco: 0 },
        { nome: 'Tom 02 · Claro neutro', cor: '#e7be9e', preco: 0 },
        { nome: 'Tom 03 · Médio dourado', cor: '#cf9b74', preco: 0 },
        { nome: 'Tom 04 · Médio bronze', cor: '#b47a52', preco: 0 },
        { nome: 'Tom 05 · Escuro quente', cor: '#8a5233', preco: 0 },
        { nome: 'Tom 06 · Retinto', cor: '#5c341f', preco: 0 }] },
      { id: 'cor-batom', nome: 'Cor', tipo: 'um', obrig: true, itens: [
        { nome: 'Nude rosé', cor: '#c98882', preco: 0 },
        { nome: 'Vermelho clássico', cor: '#b31b2c', preco: 0 },
        { nome: 'Terracota chic', cor: '#a8533b', preco: 0 },
        { nome: 'Vinho intenso', cor: '#691b33', preco: 0 },
        { nome: 'Gloss cristal brilho', cor: '#f5dce3', preco: 0 }] },
      { id: 'embalagem-pres', nome: 'Embalagem presente', tipo: 'um', obrig: false, itens: [
        { nome: 'Sacola presente da loja (grátis)', preco: 0 },
        { nome: 'Caixa rígida luxo + fita de cetim', preco: 14 }] },
      { id: 'cartao-pres', nome: 'Mensagem para o cartão (opcional)', tipo: 'texto', obrig: false, max: 120,
        placeholder: 'Ex.: Para uma pessoa especial! Com carinho, Ana.', dica: 'Escrevemos sua dedicatória no cartão presente', itens: [] }
    ],

    produtos: [
      { id: 'p-eau', cat: 'perfumaria', nome: 'Eau de Parfum Floral Intenso · Linha Atelier', desc: 'Alta fixação (até 10 horas), notas elegantes de jasmim, baunilha e âmbar.', preco: 169.9, foto: 'fotos/perfume.jpg', grupos: ['volume-perf', 'fragrancia', 'embalagem-pres'], destaque: true },
      { id: 'p-splash', cat: 'perfumaria', nome: 'Body Splash Perfumado 200 ml · Linha Viva', desc: 'Refrescância leve para o dia a dia após o banho.', preco: 64.9, foto: 'fotos/bodysplash.jpg', grupos: ['fragrancia'] },

      { id: 'm-base', cat: 'maquiagem', nome: 'Base Líquida Efeito Matte Natural (6 tons)', desc: 'Cobertura média construível com ácido hialurônico e toque seco confortável.', preco: 79.9, foto: 'fotos/base.jpg', grupos: ['tom-pele'], destaque: true },
      { id: 'm-batom', cat: 'maquiagem', nome: 'Batom Hidratante Aveludado · Alta Pigmentação', desc: 'Cor intensa desde a primeira passada sem ressecar os lábios.', preco: 44.9, foto: 'fotos/batom.jpg', grupos: ['cor-batom'], destaque: true },
      { id: 'm-paleta', cat: 'maquiagem', nome: 'Paleta de Sombras Neutras & Brilho (12 cores)', desc: 'Tons fáceis de esfumar para looks do dia e da noite.', preco: 94.9, foto: 'fotos/paleta.jpg', grupos: [] },

      { id: 's-serum', cat: 'skincare', nome: 'Sérum Facial Vitamina C 10% + Ácido Hialurônico', desc: 'Ilumina, uniformiza e hidrata sem deixar a pele oleosa.', preco: 89.9, foto: 'fotos/serum.jpg', grupos: [] },
      { id: 's-hidratante', cat: 'skincare', nome: 'Creme Hidratante Corporal Perfumado 250 g', desc: 'Textura aveludada de absorção rápida com manteiga de karité.', preco: 58.9, foto: 'fotos/hidratante.jpg', grupos: ['fragrancia'] },

      { id: 'c-mascara', cat: 'cabelos', nome: 'Máscara Capilar Nutrição Profunda 300 g', desc: 'Brilho espelhado e redução de frizz para todos os tipos de cabelo.', preco: 74.9, foto: 'fotos/mascara-cabelo.jpg', grupos: [] },

      { id: 'k-presente', cat: 'kits-presente', nome: 'Kit Presente Perfume 50 ml + Hidratante + Caixa', desc: 'Pronto para presentear com laço de cetim e cartão com a sua mensagem.', preco: 209.9, foto: 'fotos/kit-beleza.jpg', grupos: ['fragrancia', 'embalagem-pres', 'cartao-pres'], destaque: true },
      { id: 'k-make', cat: 'kits-presente', nome: 'Kit Maquiagem Essencial (Batom + Gloss + Nécessaire)', desc: 'Presente certeiro embalado com papel de seda.', preco: 119.9, foto: 'fotos/kit-make.jpg', grupos: ['cor-batom', 'embalagem-pres', 'cartao-pres'] }
    ]
  }
};
