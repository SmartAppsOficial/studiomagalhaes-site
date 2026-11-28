/* Catálogo digital · modelo Bebidas, adega e distribuidora
   Loja de DEMONSTRAÇÃO: nome, endereço, produtos e preços são exemplos. */
window.LOJA = {
  id: 'demo-bebidas',
  demo: true,
  tipo: 'loja',
  senhaDemo: '1234',
  ramo: 'Bebidas, adega e distribuidora',

  visual: {
    nome: 'Adega Gelada',
    segmento: 'Bebidas trincando · Entrega rápida',
    sigla: 'AG',
    cores: { p: '#c98a1c', d: '#f2c46d', escuro: '#141e29', fundo: '#faf8f4' },
    fontes: { t: "'Bricolage Grotesque', system-ui, sans-serif", c: "'DM Sans', system-ui, sans-serif" },
    cena: 'adega'
  },
  textos: {
    selo: 'Entrega expressa em até 30 min · +18',
    titulo: 'Bebida trincando em casa, unidade ou fardo.',
    sub: 'Escolha gelada ou natural, monte seu fardo ou combo de drinks com gelo e receba rápido pelo WhatsApp. Venda proibida para menores de 18 anos.',
    botao: 'Ver as bebidas',
    busca: 'Buscar cerveja, vinho, whisky, gelo...',
    obsPlaceholder: 'Ex.: bem gelada mesmo, interfone apto 204'
  },

  dados: {
    loja: {
      whats: '',
      endereco: 'Av. Roberto Silveira, 620 · Loja A',
      cidade: 'Sua cidade · UF',
      horario: {
        0: [['10:00', '23:30']], 1: [['10:00', '23:30']], 2: [['10:00', '23:30']], 3: [['10:00', '23:30']],
        4: [['10:00', '23:59']], 5: [['10:00', '23:59']], 6: [['10:00', '23:59']]
      },
      fechadaAgora: false,
      avisoFechada: 'Encerramos as entregas por hoje. Voltamos amanhã!',
      entrega: {
        ativa: true,
        tempo: '15 a 30 min (entrega rápida)',
        bairros: [
          { nome: 'Centro', taxa: 5 }, { nome: 'Bairro Norte', taxa: 7 }, { nome: 'Bairro Sul', taxa: 7 },
          { nome: 'Vila Nova', taxa: 9 }, { nome: 'Jardim das Flores', taxa: 10 }
        ]
      },
      retirada: true,
      tempoRetirada: 'Pronto em 5 min no balcão',
      pedidoMinimo: 40,
      pagamentos: ['Pix', 'Cartão de crédito na entrega', 'Cartão de débito na entrega', 'Dinheiro']
    },

    equipe: [
      { id: 'f-andre', nome: 'André · caixa (exemplo)', pin: '1111', ativo: true, permissoes: { pedidos: true, situacao: true, esgotado: true } },
      { id: 'f-felipe', nome: 'Felipe · câmara fria (exemplo)', pin: '1111', ativo: true, permissoes: { pedidos: true, esgotado: true } }
    ],
    entregadores: [
      { id: 'e-carlos', nome: 'Carlos · entregador (exemplo)', whats: '(21) 99999-1234', ativo: true }
    ],
    cupons: [
      { codigo: 'GELADA10', tipo: 'valor', valor: 10, minimo: 90, ativo: true }
    ],

    categorias: [
      { id: 'cervejas', nome: 'Cervejas', icone: 'cat-garrafa' },
      { id: 'combos-beb', nome: 'Fardos e combos', icone: 'cat-combo' },
      { id: 'destilados', nome: 'Destilados e drinks', icone: 'cat-estrela' },
      { id: 'vinhos', nome: 'Vinhos e espumantes', icone: 'cat-promo' },
      { id: 'sem-alcool', nome: 'Sem álcool e gelo', icone: 'cat-refri' }
    ],

    grupos: [
      { id: 'temperatura', nome: 'Temperatura', tipo: 'um', obrig: true, itens: [
        { nome: 'Trincando de gelada', preco: 0 },
        { nome: 'Natural (temperatura ambiente)', preco: 0 }] },
      { id: 'un-fardo', nome: 'Unidade ou fardo', tipo: 'um', obrig: true, itens: [
        { nome: 'Unidade avulsa', preco: 0 },
        { nome: 'Pack com 6 unidades', preco: 26 },
        { nome: 'Fardo / caixa com 12 unidades', preco: 54 }] },
      { id: 'un-long', nome: 'Unidade ou pack', tipo: 'um', obrig: true, itens: [
        { nome: '1 Long Neck (330 ml)', preco: 0 },
        { nome: 'Pack com 6 Long Necks', preco: 34 },
        { nome: 'Caixa com 12 Long Necks', preco: 69 }] },
      { id: 'acompanha-drink', nome: 'Adicionar gelo ou energético', tipo: 'varios', obrig: false, max: 3, itens: [
        { nome: 'Saco de gelo filtrado 3 kg', preco: 12 },
        { nome: 'Gelo de coco (4 unidades)', preco: 14 },
        { nome: 'Energético 2 litros', preco: 16 },
        { nome: 'Água tônica (2 latas)', preco: 11 }] },
      { id: 'tipo-vinho', nome: 'Tipo', tipo: 'um', obrig: true, itens: [
        { nome: 'Tinto seco', preco: 0 }, { nome: 'Tinto suave', preco: 0 }, { nome: 'Branco seco (gelado)', preco: 0 }, { nome: 'Rosé (gelado)', preco: 0 }] }
    ],

    produtos: [
      { id: 'c-puro-malte', cat: 'cervejas', nome: 'Cerveja Puro Malte Lata 350 ml', desc: 'Leve, refrescante e sempre na temperatura certa. Peça unidade, pack com 6 ou fardo com 12.', preco: 5.5, foto: 'fotos/cerveja-pack.jpg', grupos: ['un-fardo', 'temperatura'], destaque: true },
      { id: 'c-longneck', cat: 'cervejas', nome: 'Cerveja Premium Long Neck 330 ml', desc: 'Puro malte importada/premium. Escolha gelada ou natural, unidade ou pack.', preco: 7.5, foto: 'fotos/longneck.jpg', grupos: ['un-long', 'temperatura'], destaque: true },
      { id: 'c-ipa', cat: 'cervejas', nome: 'Cerveja Artesanal IPA 473 ml', desc: 'Notas cítricas e amargor equilibrado para quem curte artesanal.', preco: 16.9, foto: 'fotos/cerveja-ipa.jpg', grupos: ['temperatura'] },

      { id: 'cb-churrasco', cat: 'combos-beb', nome: 'Combo Churrasco (24 latas + gelo 5 kg)', desc: 'Duas caixas com 12 latas puro malte trincando + saco de gelo filtrado.', preco: 119.9, foto: 'fotos/combo-cerveja.jpg', grupos: ['temperatura'], destaque: true },
      { id: 'cb-gin', cat: 'combos-beb', nome: 'Combo Gin + 4 Tônicas + Gelo', desc: 'Garrafa 750 ml + 4 tônicas geladas + gelo de coco para montar seus drinks.', preco: 139.9, foto: 'fotos/combo-gin.jpg', grupos: ['acompanha-drink'], destaque: true },

      { id: 'd-whisky', cat: 'destilados', nome: 'Whisky Escocês 8 anos (1 litro)', desc: 'Original lacrado com selo. Adicione gelo ou energético se quiser.', preco: 118, foto: 'fotos/whisky.jpg', grupos: ['acompanha-drink'] },
      { id: 'd-vodka', cat: 'destilados', nome: 'Vodka Premium Destilada (998 ml)', desc: 'Suave e pura, ideal para drinks com frutas ou energético.', preco: 64.9, foto: 'fotos/vodka.jpg', grupos: ['acompanha-drink'] },

      { id: 'v-chileno', cat: 'vinhos', nome: 'Vinho Chileno Reservado 750 ml', desc: 'Ótima opção para jantar ou presente. Escolha tinto, branco ou rosé.', preco: 54.9, foto: 'fotos/vinho.jpg', grupos: ['tipo-vinho', 'temperatura'] },
      { id: 'v-espumante', cat: 'vinhos', nome: 'Espumante Brut ou Moscatel 750 ml', desc: 'Entregue geladinho pronto para brindar.', preco: 62.9, foto: 'fotos/espumante.jpg', grupos: ['temperatura'] },

      { id: 's-gelo', cat: 'sem-alcool', nome: 'Saco de gelo em cubos filtrado (5 kg)', desc: 'Gelo cristalino próprio para consumo em bebidas.', preco: 15, foto: 'fotos/gelo.jpg', grupos: [] },
      { id: 's-refri', cat: 'sem-alcool', nome: 'Refrigerante 2 litros', desc: 'Cola, guaraná ou laranja — gelado ou natural.', preco: 13.9, foto: 'fotos/refri2l.jpg', grupos: ['temperatura'] },
      { id: 's-energetico', cat: 'sem-alcool', nome: 'Energético lata 250 ml (pack 4 un.)', desc: 'Bem gelado para acompanhar a noite.', preco: 34.9, foto: 'fotos/energetico.jpg', grupos: ['temperatura'] }
    ]
  }
};
