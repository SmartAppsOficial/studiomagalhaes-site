/* Catálogo digital · modelo Lanchonete, hamburgueria e pizzaria
   Loja de DEMONSTRAÇÃO: nome, endereço, produtos e preços são exemplos.
   "visual" e "textos" são definidos pelo Studio (mudar é atualização avulsa).
   "dados" é o que a própria loja edita na área da loja. */
window.LOJA = {
  id: 'demo-lanchonete',
  demo: true,
  senhaDemo: '1234',
  ramo: 'Lanchonete, hamburgueria e pizzaria',

  visual: {
    nome: 'Fornalha',
    segmento: 'Pizzas e lanches',
    sigla: 'F',
    cores: { p: '#c8321e', d: '#f6b52e', escuro: '#1e130e', fundo: '#fff7ee' },
    fontes: { t: "'Bricolage Grotesque', system-ui, sans-serif", c: "'DM Sans', system-ui, sans-serif" },
    cena: 'pizza'
  },
  textos: {
    selo: 'Forno aceso todo dia',
    titulo: 'Pizza no forno, lanche na chapa.',
    sub: 'Escolha no cardápio, monte do seu jeito e mande o pedido pronto no WhatsApp. Entrega no bairro ou retirada no balcão.',
    botao: 'Ver o cardápio'
  },

  /* Pontos de partida que o Studio escolhe no painel antes de visitar a loja. */
  partidas: {
    pizzaria: {
      nome: 'Pizzaria e lanches', cena: 'pizza',
      textos: { selo: 'Forno aceso todo dia', titulo: 'Pizza no forno, lanche na chapa.' }
    },
    hamburgueria: {
      nome: 'Hamburgueria', cena: 'lanche', tirar: ['pizzas', 'doces'],
      segmento: 'Hambúrgueres e porções',
      textos: { selo: 'Chapa quente todo dia', titulo: 'Hambúrguer na chapa, batata sequinha.', sub: 'Monte o seu lanche do seu jeito, escolha a bebida e mande o pedido pronto no WhatsApp. Entrega no bairro ou retirada no balcão.' }
    }
  },

  dados: {
    loja: {
      whats: '',
      endereco: 'Rua do Exemplo, 123 · Centro',
      cidade: 'Sua cidade · UF',
      // horário por dia da semana (0 = domingo): lista de [abre, fecha]
      horario: {
        0: [['10:00', '23:30']], 1: [['10:00', '23:30']], 2: [['10:00', '23:30']], 3: [['10:00', '23:30']],
        4: [['10:00', '23:30']], 5: [['10:00', '23:59']], 6: [['10:00', '23:59']]
      },
      fechadaAgora: false,
      avisoFechada: 'Hoje estamos fechados. Voltamos amanhã!',
      entrega: {
        ativa: true,
        tempo: '40 a 60 min',
        bairros: [
          { nome: 'Centro', taxa: 5 }, { nome: 'Bairro Norte', taxa: 7 }, { nome: 'Bairro Sul', taxa: 7 },
          { nome: 'Vila Nova', taxa: 9 }, { nome: 'Jardim das Flores', taxa: 10 }
        ]
      },
      retirada: true,
      tempoRetirada: '25 a 35 min',
      pedidoMinimo: 30,
      pagamentos: ['Pix', 'Cartão de crédito na entrega', 'Cartão de débito na entrega', 'Dinheiro']
    },

    categorias: [
      { id: 'pizzas', nome: 'Pizzas', icone: 'cat-pizza' },
      { id: 'lanches', nome: 'Lanches', icone: 'cat-burger' },
      { id: 'combos', nome: 'Combos', icone: 'cat-combo' },
      { id: 'porcoes', nome: 'Porções', icone: 'cat-fritas' },
      { id: 'doces', nome: 'Pizzas doces', icone: 'cat-doce' },
      { id: 'bebidas', nome: 'Bebidas', icone: 'cat-refri' }
    ],

    grupos: [
      { id: 'tamanho', nome: 'Tamanho', tipo: 'um', obrig: true, itens: [
        { nome: 'Broto · 4 fatias', preco: 0 }, { nome: 'Média · 6 fatias', preco: 12 }, { nome: 'Grande · 8 fatias', preco: 22 }, { nome: 'Família · 12 fatias', preco: 34 }] },
      { id: 'meio', nome: 'Meio a meio', tipo: 'meio', obrig: false, itens: [] },
      { id: 'borda', nome: 'Borda recheada', tipo: 'um', obrig: false, itens: [
        { nome: 'Catupiry', preco: 8 }, { nome: 'Cheddar', preco: 8 }, { nome: 'Cream cheese', preco: 9 }, { nome: 'Chocolate', preco: 10 }] },
      { id: 'ponto', nome: 'Ponto da carne', tipo: 'um', obrig: true, itens: [
        { nome: 'Ao ponto', preco: 0 }, { nome: 'Bem passado', preco: 0 }, { nome: 'Mal passado', preco: 0 }] },
      { id: 'adicionais', nome: 'Adicionais', tipo: 'varios', obrig: false, max: 5, itens: [
        { nome: 'Bacon', preco: 5 }, { nome: 'Cheddar', preco: 4 }, { nome: 'Ovo', preco: 3 }, { nome: 'Cebola caramelizada', preco: 4 }, { nome: 'Hambúrguer extra', preco: 9 }] },
      { id: 'retirar', nome: 'Retirar', tipo: 'varios', obrig: false, itens: [
        { nome: 'Sem cebola', preco: 0 }, { nome: 'Sem tomate', preco: 0 }, { nome: 'Sem alface', preco: 0 }, { nome: 'Sem picles', preco: 0 }] },
      { id: 'molhos', nome: 'Molhos', tipo: 'varios', obrig: false, max: 2, itens: [
        { nome: 'Maionese da casa', preco: 0 }, { nome: 'Barbecue', preco: 0 }, { nome: 'Cheddar cremoso', preco: 4 }] },
      { id: 'refri', nome: 'Sabor', tipo: 'um', obrig: true, itens: [
        { nome: 'Cola', preco: 0 }, { nome: 'Cola zero', preco: 0 }, { nome: 'Guaraná', preco: 0 }, { nome: 'Laranja', preco: 0 }] },
      { id: 'bebida-combo', nome: 'Bebida do combo', tipo: 'um', obrig: true, itens: [
        { nome: 'Refrigerante lata', preco: 0 }, { nome: 'Suco natural', preco: 4 }] }
    ],

    produtos: [
      { id: 'p-calabresa', cat: 'pizzas', nome: 'Calabresa', desc: 'Molho de tomate, mussarela, calabresa fatiada e cebola roxa.', preco: 39.9, foto: 'fotos/calabresa.jpg', grupos: ['tamanho', 'meio', 'borda'], destaque: true },
      { id: 'p-margherita', cat: 'pizzas', nome: 'Margherita', desc: 'Molho de tomate, mussarela, tomate e manjericão fresco.', preco: 38.9, foto: 'fotos/margherita.jpg', grupos: ['tamanho', 'meio', 'borda'] },
      { id: 'p-pepperoni', cat: 'pizzas', nome: 'Pepperoni', desc: 'Mussarela e pepperoni em fatias, com orégano.', preco: 44.9, foto: 'fotos/pepperoni.jpg', grupos: ['tamanho', 'meio', 'borda'], destaque: true },
      { id: 'p-portuguesa', cat: 'pizzas', nome: 'Portuguesa', desc: 'Presunto, ovo, cebola, azeitona, ervilha e mussarela.', preco: 42.9, foto: 'fotos/portuguesa.jpg', grupos: ['tamanho', 'meio', 'borda'] },
      { id: 'p-frango', cat: 'pizzas', nome: 'Frango com catupiry', desc: 'Frango desfiado temperado e catupiry original.', preco: 42.9, foto: 'fotos/frango.jpg', grupos: ['tamanho', 'meio', 'borda'] },
      { id: 'p-queijos', cat: 'pizzas', nome: 'Quatro queijos', desc: 'Mussarela, provolone, parmesão e gorgonzola.', preco: 45.9, foto: 'fotos/queijos.jpg', grupos: ['tamanho', 'meio', 'borda'] },
      { id: 'l-xburger', cat: 'lanches', nome: 'X-Burger', desc: 'Pão brioche, hambúrguer de 150 g, queijo, alface, tomate e maionese da casa.', preco: 24.9, foto: 'fotos/xburger.jpg', grupos: ['ponto', 'adicionais', 'retirar'] },
      { id: 'l-xbacon', cat: 'lanches', nome: 'X-Bacon duplo', desc: 'Dois hambúrgueres, bacon crocante, cheddar e cebola roxa.', preco: 34.9, foto: 'fotos/xbacon.jpg', grupos: ['ponto', 'adicionais', 'retirar'], destaque: true },
      { id: 'l-smash', cat: 'lanches', nome: 'Smash duplo', desc: 'Duas carnes prensadas na chapa, queijo derretido e picles.', preco: 29.9, foto: 'fotos/smash.jpg', grupos: ['adicionais', 'retirar'] },
      { id: 'l-crispy', cat: 'lanches', nome: 'Frango crocante', desc: 'Sobrecoxa empanada, salada de repolho e molho especial.', preco: 27.9, foto: 'fotos/crispy.jpg', grupos: ['adicionais', 'retirar'] },
      { id: 'c-combo', cat: 'combos', nome: 'Combo da casa', desc: 'X-Burger, batata frita média e bebida.', preco: 39.9, foto: 'fotos/combo.jpg', grupos: ['ponto', 'bebida-combo', 'adicionais', 'retirar'], destaque: true },
      { id: 'o-batata', cat: 'porcoes', nome: 'Batata frita', desc: 'Porção para duas pessoas, sequinha e crocante.', preco: 22.9, foto: 'fotos/batata.jpg', grupos: ['molhos'] },
      { id: 'o-onion', cat: 'porcoes', nome: 'Anéis de cebola', desc: 'Empanados na hora, com molho barbecue.', preco: 24.9, foto: 'fotos/onion.jpg', grupos: ['molhos'] },
      { id: 'd-chocolate', cat: 'doces', nome: 'Chocolate com morango', desc: 'Chocolate ao leite, morangos frescos e granulado.', preco: 44.9, foto: 'fotos/doce.jpg', grupos: ['tamanho', 'borda'] },
      { id: 'b-lata', cat: 'bebidas', nome: 'Refrigerante lata', desc: 'Lata de 350 ml, bem gelada.', preco: 6.5, foto: 'fotos/refri.jpg', grupos: ['refri'] },
      { id: 'b-2l', cat: 'bebidas', nome: 'Refrigerante 2 litros', desc: 'Para dividir com a família.', preco: 14.9, foto: 'fotos/refri2l.jpg', grupos: ['refri'] },
      { id: 'b-suco', cat: 'bebidas', nome: 'Suco natural de laranja', desc: 'Copo de 500 ml, feito na hora.', preco: 11.9, foto: 'fotos/suco.jpg', grupos: [] }
    ]
  }
};
