/* Catálogo digital · modelo Joalheria e gemas naturais (Bloco Loja)
   Loja de DEMONSTRAÇÃO: nome, endereço, produtos e preços são exemplos.
   "visual" e "textos" são definidos pelo Studio (mudar é atualização avulsa).
   "dados" é o que a própria loja edita na área da loja. */
window.LOJA = {
  id: 'demo-joalheria',
  demo: true,
  tipo: 'loja',
  senhaDemo: '1234',
  ramo: 'Joalheria e gemas naturais',

  visual: {
    nome: 'Aurum',
    segmento: 'Joalheria fina e gemas naturais',
    sigla: 'AU',
    cores: { p: '#0f5c4d', d: '#d4af37', escuro: '#101817', fundo: '#faf8f3' },
    fontes: { t: "'Playfair Display', Georgia, serif", c: "'Source Sans 3', system-ui, sans-serif" },
    cena: 'diamante',
    entregaModo: 'ambos',
    cepOrigem: '24220-000'
  },
  textos: {
    selo: 'Ouro 18k e gemas certificadas',
    titulo: 'Joias eternas e gemas naturais lapidadas.',
    sub: 'Escolha aro, ouro, gravação interna, lapidação ou reserve gemas únicas direto pelo WhatsApp com atendimento reservado e certificado.',
    botao: 'Ver a coleção',
    busca: 'Buscar anéis, alianças, esmeralda, safira...',
    obsPlaceholder: 'Ex.: embalagem para pedido de casamento, certificado de autenticidade, gravar data'
  },

  dados: {
    loja: {
      whats: '',
      endereco: 'Rua Moreira César, 240 · Sala 304',
      cidade: 'Sua cidade · UF',
      horario: {
        0: [], 1: [['09:30', '19:00']], 2: [['09:30', '19:00']], 3: [['09:30', '19:00']],
        4: [['09:30', '19:00']], 5: [['09:30', '19:00']], 6: [['10:00', '16:00']]
      },
      fechadaAgora: false,
      avisoFechada: 'Nosso ateliê está fechado hoje. Deixe sua reserva e respondemos no próximo dia útil!',
      entrega: {
        ativa: true,
        tempo: 'segura com portador ou Sedex segurado',
        bairros: [
          { nome: 'Centro / Icaraí (portador próprio)', taxa: 0 },
          { nome: 'Demais bairros (portador segurado)', taxa: 18 },
          { nome: 'Envio nacional (Sedex com seguro)', taxa: 35 }
        ]
      },
      retirada: true,
      tempoRetirada: 'Retirada reservada na joalheria com hora marcada',
      pedidoMinimo: 0,
      pagamentos: ['Pix (5% de desconto combinado no atendimento)', 'Cartão de crédito em até 10x', 'Link de pagamento', 'Transferência bancária']
    },

    medidas: {
      titulo: 'Guia de medidas · Aros de anéis e alianças',
      obs: 'Meça o diâmetro interno de um anel que já serve bem (sem contar a borda) ou a circunferência do dedo com uma fita.',
      colunas: ['Aro BR', 'Diâmetro interno', 'Circunferência'],
      linhas: [
        ['12', '15,6 mm', '5,2 cm'],
        ['14', '16,2 mm', '5,4 cm'],
        ['16', '16,8 mm', '5,6 cm'],
        ['18', '17,5 mm', '5,8 cm'],
        ['20', '18,1 mm', '6,0 cm'],
        ['22', '18,8 mm', '6,2 cm'],
        ['24', '19,4 mm', '6,4 cm']
      ]
    },

    equipe: [
      { id: 'f-helena', nome: 'Helena · consultora (exemplo)', pin: '1111', ativo: true, permissoes: { pedidos: true, situacao: true, esgotado: true } },
      { id: 'f-eduardo', nome: 'Eduardo · ourives (exemplo)', pin: '1111', ativo: true, permissoes: { pedidos: true, esgotado: true } }
    ],
    entregadores: [
      { id: 'e-roberto', nome: 'Roberto · portador (exemplo)', whats: '(21) 99999-1234', ativo: true }
    ],
    cupons: [
      { codigo: 'AURUM10', tipo: 'pct', valor: 10, minimo: 300, ativo: true }
    ],

    categorias: [
      { id: 'aneis', nome: 'Anéis e alianças', icone: 'cat-anel' },
      { id: 'gemas', nome: 'Gemas naturais', icone: 'cat-joia' },
      { id: 'colares', nome: 'Colares e pingentes', icone: 'cat-estrela' },
      { id: 'brincos', nome: 'Brincos e pulseiras', icone: 'cat-acessorio' },
      { id: 'encomenda', nome: 'Cravação e sob medida', icone: 'cat-presente' }
    ],

    grupos: [
      { id: 'metal', nome: 'Metal e acabamento', tipo: 'um', obrig: true, itens: [
        { nome: 'Ouro amarelo 18k', preco: 0, cor: '#e2be58' },
        { nome: 'Ouro branco 18k', preco: 120, cor: '#e5e7eb' },
        { nome: 'Ouro rosé 18k', preco: 80, cor: '#e3a594' },
        { nome: 'Prata 950 polida', preco: 0, cor: '#cbd5e1' }] },
      { id: 'aro', nome: 'Aro do anel', tipo: 'um', obrig: true, itens: [
        { nome: '12', preco: 0 }, { nome: '14', preco: 0 }, { nome: '15', preco: 0 }, { nome: '16', preco: 0 },
        { nome: '17', preco: 0 }, { nome: '18', preco: 0 }, { nome: '19', preco: 0 }, { nome: '20', preco: 0 },
        { nome: '22', preco: 0 }, { nome: '24', preco: 0 }, { nome: 'Definir no atendimento', preco: 0 }] },
      { id: 'gravacao', nome: 'Gravação interna (opcional)', tipo: 'texto', obrig: false, max: 32,
        placeholder: 'Ex.: A & P · 12/06/2026', dica: 'Gravação a laser interna inclusa', itens: [] },
      { id: 'corrente', nome: 'Comprimento da corrente', tipo: 'um', obrig: true, itens: [
        { nome: '40 cm · Gargantilha', preco: 0 }, { nome: '45 cm · Padrão', preco: 0 },
        { nome: '50 cm · Médio', preco: 140 }, { nome: '60 cm · Longo', preco: 260 }] },
      { id: 'lapidacao', nome: 'Lapidação da gema', tipo: 'um', obrig: true, itens: [
        { nome: 'Oval clássica', preco: 0 }, { nome: 'Esmeralda (octogonal)', preco: 0 },
        { nome: 'Gota', preco: 0 }, { nome: 'Brilhante redonda', preco: 0 }, { nome: 'Cushion', preco: 0 }] },
      { id: 'quilates', nome: 'Peso em quilates (ct)', tipo: 'um', obrig: true, itens: [
        { nome: '0,60 ct (delicada)', preco: 0 },
        { nome: '1,20 ct (destaque)', preco: 680 },
        { nome: '2,10 ct (colecionador)', preco: 1650 }] },
      { id: 'certificado', nome: 'Certificação gemológica', tipo: 'um', obrig: true, itens: [
        { nome: 'Certificado de autenticidade da joalheria (incluso)', preco: 0 },
        { nome: 'Laudo gemológico independente', preco: 290 }] },
      { id: 'embalagem', nome: 'Embalagem', tipo: 'um', obrig: false, itens: [
        { nome: 'Estojo de veludo padrão (incluso)', preco: 0 },
        { nome: 'Caixa presente luxo + laço + cartão', preco: 45 }] },
      { id: 'data-encomenda', nome: 'Data desejada para entrega', tipo: 'data', obrig: true, antecedencia: 7, itens: [] }
    ],

    produtos: [
      { id: 'j-solitario', cat: 'aneis', nome: 'Anel solitário diamante 18k', desc: 'Ouro maciço 18k com diamante natural de 30 pontos, lapidação brilhante e cravação em 6 garras.', preco: 2890, foto: 'fotos/solitario.jpg', grupos: ['metal', 'aro', 'gravacao', 'embalagem'], destaque: true },
      { id: 'j-aliancas', cat: 'aneis', nome: 'Par de alianças anatômicas 18k', desc: 'Conforto interno anatômico, largura de 4 mm e acabamento polido ou fosco acetinado.', preco: 3490, foto: 'fotos/aliancas.jpg', grupos: ['metal', 'aro', 'gravacao', 'data-encomenda', 'embalagem'], destaque: true },
      { id: 'j-anel-esmeralda', cat: 'aneis', nome: 'Anel esmeralda com halo de brilhantes', desc: 'Esmeralda natural verde intensa cercada por microcravação de diamantes em ouro 18k.', preco: 4690, foto: 'fotos/anel-esmeralda.jpg', grupos: ['metal', 'aro', 'embalagem'], pecaUnica: true, destaque: true },

      { id: 'g-esmeralda', cat: 'gemas', nome: 'Gema natural · Esmeralda lapidada', desc: 'Esmeralda brasileira de cor verde vivo e ótima transparência, pronta para cravação ou coleção.', preco: 1490, foto: 'fotos/gema-esmeralda.jpg', grupos: ['lapidacao', 'quilates', 'certificado'], pecaUnica: true, destaque: true },
      { id: 'g-safira', cat: 'gemas', nome: 'Gema natural · Safira azul real', desc: 'Safira natural de brilho profundo e lapidação precisa, selecionada por gemólogo.', preco: 1890, foto: 'fotos/gema-safira.jpg', grupos: ['lapidacao', 'quilates', 'certificado'], pecaUnica: true, destaque: true },
      { id: 'g-rubi', cat: 'gemas', nome: 'Gema natural · Rubi sangue de pombo', desc: 'Rubi natural lapidado com fogo intenso, ideal para solitários e pingentes exclusivos.', preco: 2190, foto: 'fotos/gema-rubi.jpg', grupos: ['lapidacao', 'quilates', 'certificado'], pecaUnica: true },
      { id: 'g-ametista', cat: 'gemas', nome: 'Gema natural · Ametista imperial', desc: 'Ametista de tom roxo profundo sem inclusões visíveis, lapidação artesanal.', preco: 380, foto: 'fotos/gema-ametista.jpg', grupos: ['lapidacao', 'quilates', 'certificado'] },
      { id: 'g-turmalina', cat: 'gemas', nome: 'Gema natural · Turmalina verde-água', desc: 'Turmalina brasileira natural de brilho luminoso, peça exclusiva de lote selecionado.', preco: 1290, foto: 'fotos/gema-turmalina.jpg', grupos: ['lapidacao', 'quilates', 'certificado'], pecaUnica: true },

      { id: 'c-pontoluz', cat: 'colares', nome: 'Colar ponto de luz diamante 18k', desc: 'Corrente veneziana delicada em ouro 18k com pingente de diamante natural.', preco: 1390, foto: 'fotos/colar-diamante.jpg', grupos: ['metal', 'corrente', 'embalagem'], destaque: true },
      { id: 'c-safira', cat: 'colares', nome: 'Pingente gota de safira com corrente', desc: 'Gema natural em lapidação gota cravada em ouro 18k com brilho intenso.', preco: 2150, foto: 'fotos/colar-safira.jpg', grupos: ['metal', 'corrente', 'embalagem'] },

      { id: 'b-brincos', cat: 'brincos', nome: 'Brincos argola cravejada 18k', desc: 'Par de argolas médias em ouro 18k com diamantes cravados à mão e fecho click seguro.', preco: 1980, foto: 'fotos/brincos.jpg', grupos: ['metal', 'embalagem'] },
      { id: 'b-riviera', cat: 'brincos', nome: 'Pulseira riviera de brilhantes', desc: 'Clássica e atemporal, com articulação macia e fecho duplo de segurança.', preco: 5490, foto: 'fotos/pulseira.jpg', grupos: ['metal', 'embalagem'] },

      { id: 'e-cravacao', cat: 'encomenda', nome: 'Joia sob medida · Cravação da sua gema', desc: 'Desenhamos e produzimos seu anel ou pingente exclusivo em ouro 18k com a gema escolhida.', preco: 1250, foto: 'fotos/ourives.jpg', grupos: ['metal', 'aro', 'gravacao', 'data-encomenda'] }
    ]
  }
};
