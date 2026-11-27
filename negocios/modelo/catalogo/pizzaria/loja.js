/* Catálogo digital · modelo Pizzaria
   Loja de DEMONSTRAÇÃO: nome, endereço, produtos e preços são exemplos.
   "visual" e "textos" são definidos pelo Studio (mudar é atualização avulsa).
   "dados" é o que a própria loja edita na área da loja. */
window.LOJA = {
  id: 'demo-pizzaria',
  demo: true,
  senhaDemo: '1234',
  ramo: 'Pizzaria',

  visual: {
    nome: 'Fornalha',
    segmento: 'Pizzaria artesanal',
    sigla: 'F',
    cores: { p: '#c8321e', d: '#f6b52e', escuro: '#1e130e', fundo: '#fff7ee' },
    fontes: { t: "'Bricolage Grotesque', system-ui, sans-serif", c: "'DM Sans', system-ui, sans-serif" },
    cena: 'pizza'
  },
  textos: {
    selo: 'Forno a lenha aceso todo dia',
    titulo: 'Pizza quentinha, massa leve e borda no capricho.',
    sub: 'Escolha o tamanho, monte meio a meio com dois sabores, escolha a borda recheada e mande o pedido pronto no WhatsApp.',
    botao: 'Ver o cardápio',
    busca: 'Buscar pizzas, calzones e bebidas',
    obsPlaceholder: 'Ex.: bem assada, sem cebola, cortar à francesa'
  },

  dados: {
    loja: {
      whats: '',
      endereco: 'Rua da Fornalha, 123 · Centro',
      cidade: 'Sua cidade · UF',
      horario: {
        0: [['18:00', '23:30']], 1: [['18:00', '23:30']], 2: [['18:00', '23:30']], 3: [['18:00', '23:30']],
        4: [['18:00', '23:30']], 5: [['18:00', '23:59']], 6: [['18:00', '23:59']]
      },
      fechadaAgora: false,
      avisoFechada: 'O forno abre às 18h. Voltamos já!',
      entrega: {
        ativa: true,
        tempo: '35 a 55 min',
        bairros: [
          { nome: 'Centro', taxa: 5 }, { nome: 'Bairro Norte', taxa: 7 }, { nome: 'Bairro Sul', taxa: 7 },
          { nome: 'Vila Nova', taxa: 9 }, { nome: 'Jardim das Flores', taxa: 10 }
        ]
      },
      retirada: true,
      tempoRetirada: '20 a 30 min',
      pedidoMinimo: 35,
      pagamentos: ['Pix', 'Cartão de crédito na entrega', 'Cartão de débito na entrega', 'Dinheiro']
    },

    equipe: [
      { id: 'f-ana', nome: 'Ana (exemplo)', pin: '1111', ativo: true, permissoes: { pedidos: true, situacao: true, esgotado: true } },
      { id: 'f-caio', nome: 'Caio (exemplo)', pin: '1111', ativo: true, permissoes: { pedidos: true, esgotado: true } }
    ],
    entregadores: [
      { id: 'e-carlos', nome: 'Carlos · motoboy (exemplo)', whats: '(21) 99999-1234', ativo: true }
    ],
    cupons: [
      { codigo: 'BEMVINDO10', tipo: 'pct', valor: 10, minimo: 40, ativo: true }
    ],

    categorias: [
      { id: 'pizzas', nome: 'Pizzas salgadas', icone: 'cat-pizza' },
      { id: 'doces', nome: 'Pizzas doces', icone: 'cat-doce' },
      { id: 'calzones', nome: 'Calzones e esfihas', icone: 'cat-pao' },
      { id: 'bebidas', nome: 'Bebidas', icone: 'cat-refri' }
    ],

    grupos: [
      { id: 'tamanho', nome: 'Tamanho', tipo: 'um', obrig: true, itens: [
        { nome: 'Broto · 4 fatias', preco: 0 }, { nome: 'Média · 6 fatias', preco: 12 }, { nome: 'Grande · 8 fatias', preco: 22 }, { nome: 'Família · 12 fatias', preco: 34 }] },
      { id: 'meio', nome: 'Meio a meio', tipo: 'meio', obrig: false, itens: [] },
      { id: 'borda', nome: 'Borda recheada', tipo: 'um', obrig: false, itens: [
        { nome: 'Catupiry original', preco: 8 }, { nome: 'Cheddar cremoso', preco: 8 }, { nome: 'Cream cheese', preco: 9 }, { nome: 'Chocolate ao leite', preco: 10 }] },
      { id: 'massa', nome: 'Tipo de massa', tipo: 'um', obrig: false, itens: [
        { nome: 'Tradicional', preco: 0 }, { nome: 'Fina crocante', preco: 0 }, { nome: 'Integral', preco: 4 }] },
      { id: 'recheio-esfiha', nome: 'Sabores (combo com 6)', tipo: 'varios', obrig: true, max: 3, itens: [
        { nome: 'Carne temperada', preco: 0 }, { nome: 'Queijo minas', preco: 0 }, { nome: 'Frango com catupiry', preco: 2 }, { nome: 'Calabresa com queijo', preco: 2 }] },
      { id: 'refri', nome: 'Sabor', tipo: 'um', obrig: true, itens: [
        { nome: 'Cola', preco: 0 }, { nome: 'Cola zero', preco: 0 }, { nome: 'Guaraná', preco: 0 }, { nome: 'Laranja', preco: 0 }] }
    ],

    produtos: [
      { id: 'p-calabresa', cat: 'pizzas', nome: 'Calabresa artesanal', desc: 'Molho de tomate pelati, mussarela, calabresa fatiada e cebola roxa.', preco: 39.9, foto: 'fotos/calabresa.jpg', grupos: ['tamanho', 'meio', 'borda', 'massa'], destaque: true },
      { id: 'p-margherita', cat: 'pizzas', nome: 'Margherita clássica', desc: 'Molho de tomate, mussarela, rodelas de tomate, manjericão fresco e azeite.', preco: 38.9, foto: 'fotos/margherita.jpg', grupos: ['tamanho', 'meio', 'borda', 'massa'] },
      { id: 'p-pepperoni', cat: 'pizzas', nome: 'Pepperoni especial', desc: 'Mussarela derretida e pepperoni em fatias crocantes com orégano.', preco: 44.9, foto: 'fotos/pepperoni.jpg', grupos: ['tamanho', 'meio', 'borda', 'massa'], destaque: true },
      { id: 'p-portuguesa', cat: 'pizzas', nome: 'Portuguesa da casa', desc: 'Presunto, ovo, cebola, azeitona preta, ervilha e mussarela.', preco: 42.9, foto: 'fotos/portuguesa.jpg', grupos: ['tamanho', 'meio', 'borda', 'massa'] },
      { id: 'p-frango', cat: 'pizzas', nome: 'Frango com catupiry', desc: 'Frango desfiado temperado e cobertura generosa de catupiry original.', preco: 42.9, foto: 'fotos/frango.jpg', grupos: ['tamanho', 'meio', 'borda', 'massa'], destaque: true },
      { id: 'p-queijos', cat: 'pizzas', nome: 'Quatro queijos', desc: 'Mussarela, provolone, parmesão ralado na hora e gorgonzola.', preco: 45.9, foto: 'fotos/queijos.jpg', grupos: ['tamanho', 'meio', 'borda', 'massa'] },

      { id: 'd-chocolate', cat: 'doces', nome: 'Chocolate com morango', desc: 'Chocolate ao leite cremoso, morangos frescos fatiados e granulado.', preco: 44.9, foto: 'fotos/doce.jpg', grupos: ['tamanho', 'borda'], destaque: true },

      { id: 'c-calzone', cat: 'calzones', nome: 'Calzone da casa', desc: 'Pizza fechada assada na pedra, recheada com frango, catupiry, mussarela e tomate.', preco: 34.9, foto: 'fotos/calzone.jpg', grupos: ['massa'] },
      { id: 'c-esfiha', cat: 'calzones', nome: 'Combo 6 esfihas abertas', desc: 'Massa leve assada na hora. Escolha até 3 sabores no combo.', preco: 29.9, foto: 'fotos/esfiha.jpg', grupos: ['recheio-esfiha'] },

      { id: 'b-lata', cat: 'bebidas', nome: 'Refrigerante lata', desc: 'Lata de 350 ml, bem gelada.', preco: 6.5, foto: 'fotos/refri.jpg', grupos: ['refri'] },
      { id: 'b-2l', cat: 'bebidas', nome: 'Refrigerante 2 litros', desc: 'Ideal para dividir com a família.', preco: 14.9, foto: 'fotos/refri2l.jpg', grupos: ['refri'] },
      { id: 'b-suco', cat: 'bebidas', nome: 'Suco natural de laranja', desc: 'Copo de 500 ml, espremido na hora.', preco: 11.9, foto: 'fotos/suco.jpg', grupos: [] }
    ]
  }
};
