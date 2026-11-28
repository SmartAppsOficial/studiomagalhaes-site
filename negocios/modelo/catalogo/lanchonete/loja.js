/* Catálogo digital · modelo Hamburgueria e lanchonete
   Loja de DEMONSTRAÇÃO: nome, endereço, produtos e preços são exemplos.
   "visual" e "textos" são definidos pelo Studio (mudar é atualização avulsa).
   "dados" é o que a própria loja edita na área da loja. */
window.LOJA = {
  id: 'demo-lanchonete',
  demo: true,
  senhaDemo: '1234',
  ramo: 'Hamburgueria e lanchonete',

  visual: {
    nome: 'Chapa Brava',
    segmento: 'Hambúrgueres artesanais e porções',
    sigla: 'CB',
    cores: { p: '#c8321e', d: '#f6b52e', escuro: '#1e130e', fundo: '#fff7ee' },
    fontes: { t: "'Bricolage Grotesque', system-ui, sans-serif", c: "'DM Sans', system-ui, sans-serif" },
    cena: 'lanche'
  },
  textos: {
    selo: 'Chapa quente todo dia',
    titulo: 'Hambúrguer na chapa, batata sequinha.',
    sub: 'Monte o seu lanche do seu jeito, escolha o ponto da carne, os adicionais e mande o pedido pronto no WhatsApp.',
    botao: 'Ver o cardápio',
    busca: 'Buscar burgers, combos e porções',
    obsPlaceholder: 'Ex.: maionese à parte, cortar ao meio, sem picles'
  },

  dados: {
    loja: {
      whats: '',
      endereco: 'Rua do Exemplo, 123 · Centro',
      cidade: 'Sua cidade · UF',
      horario: {
        0: [['17:00', '23:30']], 1: [['17:00', '23:30']], 2: [['17:00', '23:30']], 3: [['17:00', '23:30']],
        4: [['17:00', '23:30']], 5: [['17:00', '23:59']], 6: [['17:00', '23:59']]
      },
      fechadaAgora: false,
      avisoFechada: 'Hoje estamos fechados. Voltamos amanhã!',
      entrega: {
        ativa: true,
        tempo: '30 a 50 min',
        bairros: [
          { nome: 'Centro', taxa: 5 }, { nome: 'Bairro Norte', taxa: 7 }, { nome: 'Bairro Sul', taxa: 7 },
          { nome: 'Vila Nova', taxa: 9 }, { nome: 'Jardim das Flores', taxa: 10 }
        ]
      },
      retirada: true,
      tempoRetirada: '20 a 30 min',
      pedidoMinimo: 25,
      pagamentos: ['Pix', 'Cartão de crédito na entrega', 'Cartão de débito na entrega', 'Dinheiro']
    },

    equipe: [
      { id: 'f-ana', nome: 'Ana (exemplo)', pin: '1111', ativo: true, permissoes: { pedidos: true, situacao: true, esgotado: true } },
      { id: 'f-caio', nome: 'Caio (exemplo)', pin: '1111', ativo: true, permissoes: { pedidos: true, esgotado: true } }
    ],
    entregadores: [
      { id: 'e-carlos', nome: 'Carlos · entregador (exemplo)', whats: '(21) 99999-1234', ativo: true }
    ],
    cupons: [
      { codigo: 'BEMVINDO10', tipo: 'pct', valor: 10, minimo: 30, ativo: true }
    ],

    categorias: [
      { id: 'lanches', nome: 'Hambúrgueres', icone: 'cat-burger' },
      { id: 'combos', nome: 'Combos', icone: 'cat-combo' },
      { id: 'hotdogs', nome: 'Hot dogs', icone: 'cat-hotdog' },
      { id: 'porcoes', nome: 'Porções', icone: 'cat-fritas' },
      { id: 'bebidas', nome: 'Bebidas e shakes', icone: 'cat-refri' }
    ],

    grupos: [
      { id: 'ponto', nome: 'Ponto da carne', tipo: 'um', obrig: true, itens: [
        { nome: 'Ao ponto', preco: 0 }, { nome: 'Bem passado', preco: 0 }, { nome: 'Mal passado', preco: 0 }] },
      { id: 'adicionais', nome: 'Adicionais', tipo: 'varios', obrig: false, max: 5, itens: [
        { nome: 'Bacon crocante', preco: 5 }, { nome: 'Cheddar cremoso', preco: 4 }, { nome: 'Ovo caipira', preco: 3 }, { nome: 'Cebola caramelizada', preco: 4 }, { nome: 'Hambúrguer extra', preco: 9 }] },
      { id: 'retirar', nome: 'Retirar', tipo: 'varios', obrig: false, itens: [
        { nome: 'Sem cebola', preco: 0 }, { nome: 'Sem tomate', preco: 0 }, { nome: 'Sem alface', preco: 0 }, { nome: 'Sem picles', preco: 0 }] },
      { id: 'molhos', nome: 'Molhos', tipo: 'varios', obrig: false, max: 2, itens: [
        { nome: 'Maionese da casa', preco: 0 }, { nome: 'Barbecue defumado', preco: 0 }, { nome: 'Cheddar cremoso', preco: 4 }] },
      { id: 'refri', nome: 'Sabor', tipo: 'um', obrig: true, itens: [
        { nome: 'Cola', preco: 0 }, { nome: 'Cola zero', preco: 0 }, { nome: 'Guaraná', preco: 0 }, { nome: 'Laranja', preco: 0 }] },
      { id: 'bebida-combo', nome: 'Bebida do combo', tipo: 'um', obrig: true, itens: [
        { nome: 'Refrigerante lata', preco: 0 }, { nome: 'Suco natural', preco: 4 }, { nome: 'Milkshake 300 ml', preco: 10 }] },
      { id: 'sabor-shake', nome: 'Sabor do milkshake', tipo: 'um', obrig: true, itens: [
        { nome: 'Ovomaltine', preco: 0 }, { nome: 'Chocolate belga', preco: 0 }, { nome: 'Morango com calda', preco: 0 }, { nome: 'Ninho com Nutella', preco: 4 }] }
    ],

    produtos: [
      { id: 'l-xbacon', cat: 'lanches', nome: 'X-Bacon duplo', desc: 'Dois hambúrgueres de 150 g, bacon crocante, cheddar derretido e cebola roxa no pão brioche.', preco: 34.9, foto: 'fotos/xbacon.jpg', grupos: ['ponto', 'adicionais', 'retirar'], destaque: true },
      { id: 'l-smash', cat: 'lanches', nome: 'Smash duplo', desc: 'Duas carnes prensadas na chapa com crosta crocante, queijo americano e picles.', preco: 29.9, foto: 'fotos/smash.jpg', grupos: ['adicionais', 'retirar'], destaque: true },
      { id: 'l-xburger', cat: 'lanches', nome: 'X-Burger clássico', desc: 'Pão brioche, hambúrguer artesanal 150 g, queijo prato, alface, tomate e maionese da casa.', preco: 24.9, foto: 'fotos/xburger.jpg', grupos: ['ponto', 'adicionais', 'retirar'] },
      { id: 'l-crispy', cat: 'lanches', nome: 'Frango crocante', desc: 'Sobrecoxa empanada bem sequinha, salada de repolho cremosa e molho especial.', preco: 27.9, foto: 'fotos/crispy.jpg', grupos: ['adicionais', 'retirar'] },

      { id: 'c-combo', cat: 'combos', nome: 'Combo da casa', desc: 'X-Burger artesanal, batata frita média e bebida à escolha.', preco: 39.9, foto: 'fotos/combo.jpg', grupos: ['ponto', 'bebida-combo', 'adicionais', 'retirar'], destaque: true },

      { id: 'h-hotdog', cat: 'hotdogs', nome: 'Hot dog prensado completo', desc: 'Pão macio, duas salsichas, molho da casa, queijo maçaricado, milho, bacon e batata palha.', preco: 22.9, foto: 'fotos/hotdog.jpg', grupos: ['adicionais', 'retirar'], destaque: true },

      { id: 'o-batata', cat: 'porcoes', nome: 'Batata frita crocante', desc: 'Porção generosa para duas pessoas, sequinha e temperada na hora.', preco: 22.9, foto: 'fotos/batata.jpg', grupos: ['molhos'] },
      { id: 'o-onion', cat: 'porcoes', nome: 'Anéis de cebola', desc: 'Empanados na hora, acompanha molho barbecue defumado.', preco: 24.9, foto: 'fotos/onion.jpg', grupos: ['molhos'] },

      { id: 'b-shake', cat: 'bebidas', nome: 'Milkshake artesanal 400 ml', desc: 'Batido com sorvete de massa cremoso, chantilly e calda.', preco: 18.9, foto: 'fotos/milkshake.jpg', grupos: ['sabor-shake'], destaque: true },
      { id: 'b-lata', cat: 'bebidas', nome: 'Refrigerante lata', desc: 'Lata de 350 ml, bem gelada.', preco: 6.5, foto: 'fotos/refri.jpg', grupos: ['refri'] },
      { id: 'b-2l', cat: 'bebidas', nome: 'Refrigerante 2 litros', desc: 'Para dividir com a galera.', preco: 14.9, foto: 'fotos/refri2l.jpg', grupos: ['refri'] },
      { id: 'b-suco', cat: 'bebidas', nome: 'Suco natural de laranja', desc: 'Copo de 500 ml, espremido na hora.', preco: 11.9, foto: 'fotos/suco.jpg', grupos: [] }
    ]
  }
};
