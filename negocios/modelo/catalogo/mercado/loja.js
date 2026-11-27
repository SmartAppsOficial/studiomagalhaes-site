/* Catálogo digital · modelo Mercado, mercearia e hortifrúti
   Loja de DEMONSTRAÇÃO: nome, endereço, produtos e preços são exemplos.
   "visual" e "textos" são definidos pelo Studio (mudar é atualização avulsa).
   "dados" é o que a própria loja edita na área da loja. */
window.LOJA = {
  id: 'demo-mercado',
  demo: true,
  senhaDemo: '1234',
  ramo: 'Mercado, mercearia e hortifrúti',
  tipo: 'loja',

  visual: {
    nome: 'Mercado da Esquina',
    segmento: 'Hortifrúti, açougue e mercearia',
    sigla: 'ME',
    cores: { p: '#1f7a44', d: '#f2a922', escuro: '#112419', fundo: '#f7fbf7' },
    fontes: { t: "'Plus Jakarta Sans', system-ui, sans-serif", c: "'Inter', system-ui, sans-serif" },
    cena: 'carrinho'
  },
  textos: {
    selo: 'Hortifrúti fresco todo dia',
    titulo: 'Sua compra do dia entregue na porta de casa.',
    sub: 'Escolha frutas, verduras, carnes cortadas na hora, mercearia e limpeza. Monte sua lista, escolha o peso e receba rapidinho pelo WhatsApp.',
    botao: 'Ver ofertas e produtos',
    busca: 'Buscar frutas, carnes, arroz, leite e limpeza',
    obsPlaceholder: 'Ex.: banana mais verde, tomate bem firme, se faltar marca trocar por parecida'
  },

  repetirExemplo: [
    { produto: 'hf-banana', escolhas: { 'peso-horti': [1], maturacao: [1] }, campos: {}, meio: '', qtd: 1, obs: '' },
    { produto: 'mc-arroz', escolhas: { substituicao: [1] }, campos: {}, meio: '', qtd: 1, obs: '' },
    { produto: 'lt-ovos', escolhas: {}, campos: {}, meio: '', qtd: 1, obs: '' }
  ],

  dados: {
    loja: {
      whats: '',
      endereco: 'Av. Principal, 540 · Centro',
      cidade: 'Sua cidade · UF',
      horario: {
        0: [['07:30', '14:00']], 1: [['07:30', '21:00']], 2: [['07:30', '21:00']], 3: [['07:30', '21:00']],
        4: [['07:30', '21:00']], 5: [['07:30', '21:00']], 6: [['07:30', '21:00']]
      },
      fechadaAgora: false,
      avisoFechada: 'Estamos fechados agora. Voltamos amanhã às 07h30 com feira fresquinha!',
      entrega: {
        ativa: true,
        tempo: '35 a 60 min · Entrega no bairro',
        bairros: [
          { nome: 'Centro', taxa: 6 }, { nome: 'Bairro Norte', taxa: 8 }, { nome: 'Bairro Sul', taxa: 8 },
          { nome: 'Vila Nova', taxa: 10 }, { nome: 'Jardim das Flores', taxa: 12 }
        ]
      },
      retirada: true,
      tempoRetirada: 'Pronto em 20 min no balcão',
      pedidoMinimo: 40,
      pagamentos: ['Pix', 'Cartão de crédito na entrega', 'Cartão de débito na entrega', 'Vale-alimentação', 'Dinheiro']
    },

    equipe: [
      { id: 'f-joao', nome: 'João · separação (exemplo)', pin: '1111', ativo: true, permissoes: { pedidos: true, situacao: true, esgotado: true } },
      { id: 'f-paula', nome: 'Paula · caixa (exemplo)', pin: '1111', ativo: true, permissoes: { pedidos: true, esgotado: true } }
    ],
    entregadores: [
      { id: 'e-diego', nome: 'Diego · entregador (exemplo)', whats: '(21) 99999-1234', ativo: true }
    ],
    cupons: [
      { codigo: 'MERCADO10', tipo: 'pct', valor: 10, minimo: 80, ativo: true }
    ],

    categorias: [
      { id: 'hortifruti', nome: 'Hortifrúti', icone: 'cat-salada' },
      { id: 'acougue', nome: 'Açougue e aves', icone: 'cat-frango' },
      { id: 'mercearia', nome: 'Mercearia', icone: 'cat-mercado' },
      { id: 'laticinios', nome: 'Leite e ovos', icone: 'cat-pao' },
      { id: 'bebidas', nome: 'Bebidas', icone: 'cat-garrafa' },
      { id: 'limpeza', nome: 'Limpeza e casa', icone: 'cat-estrela' }
    ],

    grupos: [
      { id: 'peso-horti', nome: 'Peso desejado', tipo: 'um', obrig: true, itens: [
        { nome: '500 g', preco: 0 }, { nome: '1 kg', preco: 4.5 }, { nome: '2 kg', preco: 13.5 }] },
      { id: 'maturacao', nome: 'Ponto da fruta ou legume', tipo: 'um', obrig: false, itens: [
        { nome: 'Maduro (consumir hoje)', preco: 0 }, { nome: 'De vez (para a semana)', preco: 0 }, { nome: 'Bem verdinho', preco: 0 }] },
      { id: 'peso-carne', nome: 'Peso da bandeja', tipo: 'um', obrig: true, itens: [
        { nome: '500 g', preco: 0 }, { nome: '1 kg', preco: 22 }, { nome: '1,5 kg', preco: 44 }] },
      { id: 'corte-carne', nome: 'Como prefere o corte?', tipo: 'um', obrig: true, itens: [
        { nome: 'Em bifes', preco: 0 }, { nome: 'Em cubos / picadinho', preco: 0 }, { nome: 'Em tiras (strogonoff)', preco: 0 }, { nome: 'Moída na hora', preco: 0 }, { nome: 'Peça inteira', preco: 0 }] },
      { id: 'substituicao', nome: 'Se faltar a marca no estoque', tipo: 'um', obrig: false, itens: [
        { nome: 'Me avisar no WhatsApp', preco: 0 }, { nome: 'Trocar por marca parecida', preco: 0 }, { nome: 'Retirar do pedido', preco: 0 }] },
      { id: 'tipo-leite', nome: 'Tipo', tipo: 'um', obrig: true, itens: [
        { nome: 'Integral (1 L)', preco: 0 }, { nome: 'Desnatado (1 L)', preco: 0 }, { nome: 'Zero lactose (1 L)', preco: 1.5 }] }
    ],

    produtos: [
      { id: 'hf-kit', cat: 'hortifruti', nome: 'Cesta feira da semana (6 kg)', desc: 'Seleção fresca do dia: batata, cebola, tomate, cenoura, banana, maçã e folhas verdes.', preco: 49.9, foto: 'fotos/hortifruti.jpg', grupos: ['maturacao'], destaque: true },
      { id: 'hf-banana', cat: 'hortifruti', nome: 'Banana prata selecionada', desc: 'Colheita nova, doce e firme. Escolha o peso e o ponto de maturação.', preco: 4.9, foto: 'fotos/banana.jpg', grupos: ['peso-horti', 'maturacao'], destaque: true },
      { id: 'hf-tomate', cat: 'hortifruti', nome: 'Tomate italiano fresco', desc: 'Ideal para saladas e molhos caseiros. Escolha por peso.', preco: 5.5, foto: 'fotos/tomate.jpg', grupos: ['peso-horti', 'maturacao'] },
      { id: 'hf-alface', cat: 'hortifruti', nome: 'Alface crespa hidropônica (un.)', desc: 'Folhas limpas, crocantes e fresquinhas colhidas cedo.', preco: 4.5, foto: 'fotos/alface.jpg', grupos: [] },

      { id: 'ac-patinho', cat: 'acougue', nome: 'Patinho bovino fresco (por peso)', desc: 'Carne magra selecionada e cortada na hora do seu jeito no nosso açougue.', preco: 23.9, foto: 'fotos/carne-acougue.jpg', grupos: ['peso-carne', 'corte-carne'], destaque: true },
      { id: 'ac-frango', cat: 'acougue', nome: 'Filé de peito de frango (1 kg)', desc: 'Bandeja resfriada de 1 kg, limpo e sem osso.', preco: 21.9, foto: 'fotos/frango-bandeja.jpg', grupos: ['corte-carne'] },

      { id: 'mc-arroz', cat: 'mercearia', nome: 'Arroz branco tipo 1 (5 kg)', desc: 'Grãos longos e soltinhos, pacote econômico de 5 kg.', preco: 28.9, foto: 'fotos/arroz-feijao.jpg', grupos: ['substituicao'], destaque: true },
      { id: 'mc-massa', cat: 'mercearia', nome: 'Kit macarrão + molho de tomate', desc: 'Espaguete 500 g + molho tradicional 340 g para um almoço rápido.', preco: 12.9, foto: 'fotos/massa-azeite.jpg', grupos: ['substituicao'] },

      { id: 'lt-leite', cat: 'laticinios', nome: 'Leite longa vida 1 litro', desc: 'Escolha integral, desnatado ou zero lactose.', preco: 5.8, foto: 'fotos/leite-laticinios.jpg', grupos: ['tipo-leite', 'substituicao'] },
      { id: 'lt-ovos', cat: 'laticinios', nome: 'Ovos vermelhos grandes (12 un.)', desc: 'Dúzia selecionada de granja fresca, embalagem reforçada.', preco: 13.5, foto: 'fotos/ovos.jpg', grupos: [], destaque: true },

      { id: 'bb-agua', cat: 'bebidas', nome: 'Fardo água mineral 500 ml (12 un.)', desc: 'Água leve sem gás, entregue gelada ou natural.', preco: 18.9, foto: 'fotos/agua-suco.jpg', grupos: [] },

      { id: 'lm-kit', cat: 'limpeza', nome: 'Kit limpeza essencial da casa', desc: 'Detergente neutro, desinfetante 2 L, esponja multiuso e sabão líquido.', preco: 34.9, foto: 'fotos/limpeza.jpg', grupos: ['substituicao'] }
    ]
  }
};
