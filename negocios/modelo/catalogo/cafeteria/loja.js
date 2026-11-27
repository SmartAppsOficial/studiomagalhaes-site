/* Catálogo digital · modelo Cafeteria
   Loja de DEMONSTRAÇÃO: nome, endereço, produtos e preços são exemplos.
   "visual" e "textos" são definidos pelo Studio (mudar é atualização avulsa).
   "dados" é o que a própria loja edita na área da loja. */
window.LOJA = {
  id: 'demo-cafeteria',
  demo: true,
  senhaDemo: '1234',
  ramo: 'Cafeteria',

  visual: {
    nome: 'Grão & Aroma',
    segmento: 'Cafeteria e brunch',
    sigla: 'GA',
    cores: { p: '#6f3e24', d: '#d89b52', escuro: '#21140d', fundo: '#fbf6f0' },
    fontes: { t: "'Fraunces', Georgia, serif", c: "'DM Sans', system-ui, sans-serif" },
    cena: 'cafe'
  },
  textos: {
    selo: 'Grãos especiais moídos na hora',
    titulo: 'Cafés especiais, gelados cremosos e brunch artesanal.',
    sub: 'Escolha o método, o tipo de leite, adicione acompanhamentos quentinhos e peça para entrega ou retirada rápida pelo WhatsApp.',
    botao: 'Ver o cardápio',
    busca: 'Buscar cafés, iced lattes, brunch e doces',
    obsPlaceholder: 'Ex.: sem açúcar, bem quente, pouco gelo, adoçante à parte'
  },

  dados: {
    loja: {
      whats: '',
      endereco: 'Alameda dos Cafés, 42 · Centro',
      cidade: 'Sua cidade · UF',
      horario: {
        0: [['08:00', '19:00']], 1: [['07:30', '20:00']], 2: [['07:30', '20:00']], 3: [['07:30', '20:00']],
        4: [['07:30', '20:00']], 5: [['07:30', '21:00']], 6: [['08:00', '21:00']]
      },
      fechadaAgora: false,
      avisoFechada: 'Nossa cafeteria abre amanhã com café fresquinho!',
      entrega: {
        ativa: true,
        tempo: '25 a 40 min',
        bairros: [
          { nome: 'Centro', taxa: 5 }, { nome: 'Bairro Norte', taxa: 7 }, { nome: 'Bairro Sul', taxa: 7 },
          { nome: 'Vila Nova', taxa: 9 }, { nome: 'Jardim das Flores', taxa: 10 }
        ]
      },
      retirada: true,
      tempoRetirada: '10 a 15 min',
      pedidoMinimo: 20,
      pagamentos: ['Pix', 'Cartão de crédito na entrega', 'Cartão de débito na entrega', 'Vale-refeição', 'Dinheiro']
    },

    equipe: [
      { id: 'f-clara', nome: 'Clara · barista (exemplo)', pin: '1111', ativo: true, permissoes: { pedidos: true, situacao: true, esgotado: true } },
      { id: 'f-lucas', nome: 'Lucas (exemplo)', pin: '1111', ativo: true, permissoes: { pedidos: true, esgotado: true } }
    ],
    entregadores: [
      { id: 'e-rafael', nome: 'Rafael · entregador (exemplo)', whats: '(21) 99999-1234', ativo: true }
    ],
    cupons: [
      { codigo: 'CAFE10', tipo: 'pct', valor: 10, minimo: 30, ativo: true }
    ],

    categorias: [
      { id: 'quentes', nome: 'Cafés quentes', icone: 'cat-cafe' },
      { id: 'gelados', nome: 'Bebidas geladas', icone: 'cat-refri' },
      { id: 'brunch', nome: 'Brunch e tostados', icone: 'cat-pao' },
      { id: 'doces', nome: 'Cookies e tortas', icone: 'cat-doce' },
      { id: 'combos', nome: 'Combos e boxes', icone: 'cat-presente' }
    ],

    grupos: [
      { id: 'tam-cafe', nome: 'Tamanho', tipo: 'um', obrig: true, itens: [
        { nome: 'Médio · 180 ml', preco: 0 }, { nome: 'Grande · 300 ml', preco: 4.5 }] },
      { id: 'leite', nome: 'Tipo de leite', tipo: 'um', obrig: false, itens: [
        { nome: 'Integral', preco: 0 }, { nome: 'Zero lactose', preco: 2 }, { nome: 'Leite de aveia', preco: 4.5 }, { nome: 'Leite de amêndoas', preco: 4.5 }] },
      { id: 'extras-cafe', nome: 'Toques especiais', tipo: 'varios', obrig: false, max: 3, itens: [
        { nome: 'Shot extra de espresso', preco: 4 }, { nome: 'Calda de caramelo salgado', preco: 3 }, { nome: 'Xarope de baunilha', preco: 3 }, { nome: 'Chantilly fresco', preco: 3.5 }] },
      { id: 'metodo', nome: 'Método de extração', tipo: 'um', obrig: true, itens: [
        { nome: 'Espresso tradicional', preco: 0 }, { nome: 'Coado V60', preco: 3 }, { nome: 'Prensa francesa', preco: 3 }] },
      { id: 'recheio-croissant', nome: 'Recheio', tipo: 'um', obrig: true, itens: [
        { nome: 'Tradicional amanteigado', preco: 0 }, { nome: 'Queijo brie e geleia de damasco', preco: 7 }, { nome: 'Presunto parma e queijo', preco: 8 }, { nome: 'Creme de avelã', preco: 6 }] },
      { id: 'sabor-cookie', nome: 'Sabor do cookie', tipo: 'um', obrig: true, itens: [
        { nome: 'Gotas de chocolate belga', preco: 0 }, { nome: 'Red velvet com chocolate branco', preco: 2 }, { nome: 'Pistache recheado', preco: 4 }] },
      { id: 'bebida-combo', nome: 'Bebidas do combo', tipo: 'um', obrig: true, itens: [
        { nome: '2 Cappuccinos cremosos', preco: 0 }, { nome: '2 Iced Lattes', preco: 4 }, { nome: '1 Cappuccino + 1 Suco natural', preco: 2 }] }
    ],

    produtos: [
      { id: 'cf-cappuccino', cat: 'quentes', nome: 'Cappuccino italiano', desc: 'Espresso 100% arábica, leite vaporizado aveludado e toque de cacau ou canela.', preco: 13.9, foto: 'fotos/cappuccino.jpg', grupos: ['tam-cafe', 'leite', 'extras-cafe'], destaque: true },
      { id: 'cf-especial', cat: 'quentes', nome: 'Café especial da casa', desc: 'Grãos selecionados de torra média, notas de chocolate e caramelo.', preco: 9.9, foto: 'fotos/cafe-espresso.jpg', grupos: ['metodo', 'tam-cafe'] },

      { id: 'gl-iced', cat: 'gelados', nome: 'Iced Latte caramelo', desc: 'Espresso duplo sobre bastante gelo, leite cremoso e fio de caramelo artesanal.', preco: 16.9, foto: 'fotos/iced-coffee.jpg', grupos: ['leite', 'extras-cafe'], destaque: true },
      { id: 'gl-matcha', cat: 'gelados', nome: 'Iced Matcha Latte', desc: 'Chá verde japonês batido com leite cremoso e gelo cristalino.', preco: 18.9, foto: 'fotos/matcha.jpg', grupos: ['leite'] },
      { id: 'gl-suco', cat: 'gelados', nome: 'Suco de laranja fresco', desc: 'Espremido na hora, 400 ml bem gelado.', preco: 11.5, foto: 'fotos/suco-laranja.jpg', grupos: [] },

      { id: 'br-toast', cat: 'brunch', nome: 'Toast de fermentação natural', desc: 'Fatia grossa tostada na manteiga com creme de abacate, ovo cremoso e sementes.', preco: 26.9, foto: 'fotos/toast.jpg', grupos: [], destaque: true },
      { id: 'br-croissant', cat: 'brunch', nome: 'Croissant artesanal quentinho', desc: 'Folhado leve e crocante, servido puro ou com recheios gourmet.', preco: 13.9, foto: 'fotos/croissant.jpg', grupos: ['recheio-croissant'] },
      { id: 'br-paoqueijo', cat: 'brunch', nome: 'Porção de pão de queijo (6 un.)', desc: 'Receita mineira com queijo canastra, assado na hora.', preco: 21.9, foto: 'fotos/pao-queijo.jpg', grupos: [] },

      { id: 'dc-cookie', cat: 'doces', nome: 'Cookie nova-iorquino quentinho', desc: 'Casquinha crocante por fora e centro super macio de chocolate derretido.', preco: 12.9, foto: 'fotos/cookie.jpg', grupos: ['sabor-cookie'], destaque: true },
      { id: 'dc-torta', cat: 'doces', nome: 'Fatia de cheesecake com frutas vermelhas', desc: 'Base amanteigada, creme leve de cream cheese e calda artesanal.', preco: 19.9, foto: 'fotos/torta-cafe.jpg', grupos: [] },

      { id: 'cb-brunch', cat: 'combos', nome: 'Combo brunch para 2', desc: '2 bebidas da cafeteria, 2 croissants recheados, 6 pães de queijo e 2 cookies.', preco: 69.9, foto: 'fotos/combo-cafe.jpg', grupos: ['bebida-combo'], destaque: true },
      { id: 'cb-cesta', cat: 'combos', nome: 'Box presente café especial', desc: 'Caixa presente com croissants, cookies, pão de queijo, geleia, suco e café.', preco: 119.9, foto: 'fotos/cesta-cafe.jpg', grupos: [] }
    ]
  }
};
