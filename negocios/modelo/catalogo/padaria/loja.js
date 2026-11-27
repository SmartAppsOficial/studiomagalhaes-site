/* Catálogo digital · modelo Padaria
   Loja de DEMONSTRAÇÃO: nome, endereço, produtos e preços são exemplos.
   "visual" e "textos" são definidos pelo Studio (mudar é atualização avulsa).
   "dados" é o que a própria loja edita na área da loja. */
window.LOJA = {
  id: 'demo-padaria',
  demo: true,
  senhaDemo: '1234',
  ramo: 'Padaria',

  visual: {
    nome: 'Pão & Forno',
    segmento: 'Padaria artesanal',
    sigla: 'PF',
    cores: { p: '#9c5221', d: '#e9b44c', escuro: '#24170e', fundo: '#fdf8f2' },
    fontes: { t: "'Fraunces', Georgia, serif", c: "'Nunito Sans', system-ui, sans-serif" },
    cena: 'pao'
  },
  textos: {
    selo: 'Fornada quentinha toda hora',
    titulo: 'Pão saindo do forno, frios na hora e bolo caseiro.',
    sub: 'Peça pães por peso ou unidade, frios fatiados, salgados, cestas de café da manhã e escolha o horário de retirada ou entrega.',
    botao: 'Ver o cardápio',
    busca: 'Buscar pães, frios, bolos e cestas',
    obsPlaceholder: 'Ex.: pão bem moreninho, fatiar o pão italiano, frios fininhos'
  },

  dados: {
    loja: {
      whats: '',
      endereco: 'Rua do Trigo, 88 · Centro',
      cidade: 'Sua cidade · UF',
      horario: {
        0: [['06:30', '20:30']], 1: [['06:00', '21:00']], 2: [['06:00', '21:00']], 3: [['06:00', '21:00']],
        4: [['06:00', '21:00']], 5: [['06:00', '21:00']], 6: [['06:00', '21:00']]
      },
      fechadaAgora: false,
      avisoFechada: 'Hoje estamos fechados. Voltamos amanhã bem cedinho!',
      entrega: {
        ativa: true,
        tempo: '25 a 45 min · Cestas agendadas',
        bairros: [
          { nome: 'Centro', taxa: 5 }, { nome: 'Bairro Norte', taxa: 7 }, { nome: 'Bairro Sul', taxa: 7 },
          { nome: 'Vila Nova', taxa: 9 }, { nome: 'Jardim das Flores', taxa: 10 }
        ]
      },
      retirada: true,
      tempoRetirada: 'No horário escolhido ou 15 min',
      pedidoMinimo: 15,
      pagamentos: ['Pix', 'Cartão de crédito na entrega', 'Cartão de débito na entrega', 'Vale-refeição', 'Dinheiro']
    },

    equipe: [
      { id: 'f-marcos', nome: 'Marcos (exemplo)', pin: '1111', ativo: true, permissoes: { pedidos: true, situacao: true, esgotado: true } },
      { id: 'f-julia', nome: 'Júlia (exemplo)', pin: '1111', ativo: true, permissoes: { pedidos: true, esgotado: true } }
    ],
    entregadores: [
      { id: 'e-carlos', nome: 'Carlos · entregador (exemplo)', whats: '(21) 99999-1234', ativo: true }
    ],
    cupons: [
      { codigo: 'BEMVINDO10', tipo: 'pct', valor: 10, minimo: 25, ativo: true }
    ],

    categorias: [
      { id: 'paes', nome: 'Pães e fornada', icone: 'cat-pao' },
      { id: 'cestas', nome: 'Cestas e combos', icone: 'cat-presente' },
      { id: 'salgados', nome: 'Salgados e chapa', icone: 'cat-combo' },
      { id: 'bolos-padaria', nome: 'Frios e bolos caseiros', icone: 'cat-bolo' },
      { id: 'bebidas', nome: 'Café e bebidas', icone: 'cat-cafe' }
    ],

    grupos: [
      { id: 'peso-pao', nome: 'Peso ou quantidade', tipo: 'um', obrig: true, itens: [
        { nome: '250 g (cerca de 4 unidades)', preco: 0 },
        { nome: '500 g (cerca de 8 unidades)', preco: 4.5 },
        { nome: '1 kg (cerca de 16 unidades)', preco: 13.5 }] },
      { id: 'ponto-pao', nome: 'Ponto do pão', tipo: 'um', obrig: false, itens: [
        { nome: 'Moreninho crocante', preco: 0 },
        { nome: 'Clarinho macio', preco: 0 },
        { nome: 'Misto (tanto faz)', preco: 0 }] },
      { id: 'qtd-paoqueijo', nome: 'Quantidade', tipo: 'um', obrig: true, itens: [
        { nome: '1 unidade', preco: 0 },
        { nome: 'Porção com 6 unidades', preco: 19.5 },
        { nome: 'Caixa com 12 unidades', preco: 39.5 }] },
      { id: 'recheio-croissant', nome: 'Sabor do croissant', tipo: 'um', obrig: true, itens: [
        { nome: 'Tradicional amanteigado', preco: 0 },
        { nome: 'Presunto e queijo', preco: 4 },
        { nome: 'Peito de peru com requeijão', preco: 5 },
        { nome: 'Chocolate meio amargo', preco: 4 }] },
      { id: 'fatiar', nome: 'Preparo do pão', tipo: 'um', obrig: false, itens: [
        { nome: 'Inteiro', preco: 0 },
        { nome: 'Fatiado na hora', preco: 0 }] },
      { id: 'horario-retirada', nome: 'Horário de retirada ou entrega', tipo: 'um', obrig: true, itens: [
        { nome: 'Assim que ficar pronto', preco: 0 },
        { nome: 'Manhã · 07h às 08h30', preco: 0 },
        { nome: 'Manhã · 08h30 às 10h30', preco: 0 },
        { nome: 'Tarde · 14h às 16h30', preco: 0 },
        { nome: 'Tarde · 16h30 às 19h', preco: 0 }] },
      { id: 'data-cesta', nome: 'Data da entrega ou retirada', tipo: 'data', obrig: true, antecedencia: 1, itens: [] },
      { id: 'bilhete-cesta', nome: 'Mensagem para o cartão da cesta', tipo: 'texto', obrig: false, max: 120,
        placeholder: 'Ex.: Bom dia, feliz aniversário! Com carinho, Ana.', dica: 'Escreva a dedicatória do cartão presente', itens: [] },
      { id: 'tipo-pao-lanche', nome: 'Pão do lanche', tipo: 'um', obrig: true, itens: [
        { nome: 'Pão francês na chapa', preco: 0 },
        { nome: 'Pão de forma artesanal', preco: 2 },
        { nome: 'Pão ciabatta', preco: 4 }] },
      { id: 'extras-lanche', nome: 'Adicionais', tipo: 'varios', obrig: false, max: 3, itens: [
        { nome: 'Requeijão na saída', preco: 3.5 },
        { nome: 'Ovo mexido cremoso', preco: 5 },
        { nome: 'Queijo minas extra', preco: 4 }] },
      { id: 'sabor-salgado', nome: 'Sabor do salgado', tipo: 'um', obrig: true, itens: [
        { nome: 'Coxinha de frango com catupiry', preco: 0 },
        { nome: 'Joelho de presunto e queijo', preco: 0 },
        { nome: 'Empada cremosa de palmito', preco: 1 },
        { nome: 'Esfiha assada de carne', preco: 0 }] },
      { id: 'qtd-salgado', nome: 'Quantidade', tipo: 'um', obrig: true, itens: [
        { nome: '1 unidade', preco: 0 },
        { nome: 'Combo 4 unidades', preco: 20.5 },
        { nome: 'Caixa 10 unidades', preco: 56.5 }] },
      { id: 'tipo-frios', nome: 'Frios fatiados na hora', tipo: 'um', obrig: true, itens: [
        { nome: 'Mussarela fatiada', preco: 0 },
        { nome: 'Queijo prato', preco: 1 },
        { nome: 'Presunto cozido sem capa', preco: 0 },
        { nome: 'Peito de peru defumado', preco: 4 },
        { nome: 'Bandeja mista (queijo + presunto)', preco: 2 }] },
      { id: 'peso-frios', nome: 'Peso da bandeja', tipo: 'um', obrig: true, itens: [
        { nome: '150 g', preco: 0 },
        { nome: '300 g', preco: 12 },
        { nome: '500 g', preco: 24 }] }
    ],

    produtos: [
      { id: 'p-frances', cat: 'paes', nome: 'Pão francês quentinho (por peso)', desc: 'Fornadas de hora em hora, casquinha crocante e miolo macio. Escolha o peso e o ponto.', preco: 4.9, foto: 'fotos/pao-frances.jpg', grupos: ['peso-pao', 'ponto-pao', 'horario-retirada'], destaque: true },
      { id: 'p-queijo', cat: 'paes', nome: 'Pão de queijo mineiro', desc: 'Feito com queijo meia cura, quentinho e crocante por fora. Por unidade ou caixa.', preco: 4.5, foto: 'fotos/pao-queijo.jpg', grupos: ['qtd-paoqueijo', 'horario-retirada'], destaque: true },
      { id: 'p-croissant', cat: 'paes', nome: 'Croissant folhado amanteigado', desc: 'Massa folhada artesanal bem leve, tradicional ou recheado na hora.', preco: 11.9, foto: 'fotos/croissant.jpg', grupos: ['recheio-croissant', 'horario-retirada'] },
      { id: 'p-italiano', cat: 'paes', nome: 'Pão italiano de fermentação natural', desc: 'Fermentação longa de 24 horas, casca rústica e miolo aerado (600 g).', preco: 24.9, foto: 'fotos/pao-italiano.jpg', grupos: ['fatiar', 'horario-retirada'] },

      { id: 'c-manha', cat: 'cestas', nome: 'Cesta de café da manhã completa', desc: 'Pães artesanais, 2 croissants, bolo caseiro, frios, frutas, geleia, suco, café e cartão presente.', preco: 139, foto: 'fotos/cesta-cafe.jpg', grupos: ['data-cesta', 'horario-retirada', 'bilhete-cesta'], destaque: true },
      { id: 'c-tarde', cat: 'cestas', nome: 'Box café da tarde (4 pessoas)', desc: '1 bolo caseiro inteiro, 12 pães de queijo, 4 croissants e requeijão cremoso.', preco: 74.9, foto: 'fotos/box-tarde.jpg', grupos: ['horario-retirada'], destaque: true },

      { id: 's-misto', cat: 'salgados', nome: 'Misto quente ou pão na chapa', desc: 'Feito na hora com manteiga de primeira, queijo derretido e presunto.', preco: 13.9, foto: 'fotos/misto-quente.jpg', grupos: ['tipo-pao-lanche', 'extras-lanche'] },
      { id: 's-salgado', cat: 'salgados', nome: 'Salgados da vitrine (unidade ou caixa)', desc: 'Coxinha, joelho, empada ou esfiha quentinhos. Peça por unidade ou combo.', preco: 7.5, foto: 'fotos/salgados.jpg', grupos: ['sabor-salgado', 'qtd-salgado'] },

      { id: 'b-frios', cat: 'bolos-padaria', nome: 'Frios fatiados na hora (por peso)', desc: 'Escolha o tipo e o peso (150 g, 300 g ou 500 g), embalado na bandeja.', preco: 14.9, foto: 'fotos/frios.jpg', grupos: ['tipo-frios', 'peso-frios', 'horario-retirada'], destaque: true },
      { id: 'b-fuba', cat: 'bolos-padaria', nome: 'Bolo caseiro de fubá cremoso', desc: 'Bolo inteiro recém-saído do forno, perfeito para acompanhar o café.', preco: 32, foto: 'fotos/bolo-fuba.jpg', grupos: ['horario-retirada'] },

      { id: 'cf-cafe', cat: 'bebidas', nome: 'Café coado ou pingado da casa', desc: 'Café fresco passado na hora, puro ou com leite cremoso (200 ml).', preco: 6.5, foto: 'fotos/cafe-espresso.jpg', grupos: [] },
      { id: 'cf-suco', cat: 'bebidas', nome: 'Suco natural de laranja (400 ml)', desc: 'Espremido na hora, sem adição de açúcar.', preco: 10.9, foto: 'fotos/suco-laranja.jpg', grupos: [] }
    ]
  }
};
