/* Catálogo digital · modelo Confeitaria, doces e bolos
   Loja de DEMONSTRAÇÃO: nome, endereço, produtos e preços são exemplos.
   "visual" e "textos" são definidos pelo Studio (mudar é atualização avulsa).
   "dados" é o que a própria loja edita na área da loja. */
window.LOJA = {
  id: 'demo-confeitaria',
  demo: true,
  senhaDemo: '1234',
  ramo: 'Confeitaria, doces e bolos',

  visual: {
    nome: 'Flor de Açúcar',
    segmento: 'Bolos e doces artesanais',
    sigla: 'FA',
    cores: { p: '#c94a72', d: '#f2c46d', escuro: '#2a131d', fundo: '#fff8fa' },
    fontes: { t: "'Fraunces', Georgia, serif", c: "'Nunito Sans', system-ui, sans-serif" },
    cena: 'bolo'
  },
  textos: {
    selo: 'Feito à mão todos os dias',
    titulo: 'Bolos sob encomenda e doces que encantam.',
    sub: 'Escolha massa, recheio, cobertura, data de entrega e a frase do topo. Seu pedido chega organizado direto no WhatsApp.',
    botao: 'Ver o cardápio',
    busca: 'Buscar bolos e doces',
    obsPlaceholder: 'Ex.: embalagem para presente, cor da fita, sem nozes'
  },

  dados: {
    loja: {
      whats: '',
      endereco: 'Rua das Camélias, 210 · Centro',
      cidade: 'Sua cidade · UF',
      horario: {
        0: [['08:30', '21:00']], 1: [['08:30', '21:00']], 2: [['08:30', '21:00']], 3: [['08:30', '21:00']],
        4: [['08:30', '21:00']], 5: [['08:30', '21:00']], 6: [['08:30', '21:00']]
      },
      fechadaAgora: false,
      avisoFechada: 'Hoje estamos em produção fechada. Voltamos amanhã!',
      entrega: {
        ativa: true,
        tempo: 'Pronta entrega 45 min · Encomendas agendadas',
        bairros: [
          { nome: 'Centro', taxa: 6 }, { nome: 'Icaraí / Jardim', taxa: 8 }, { nome: 'Bairro Norte', taxa: 9 },
          { nome: 'Vila Nova', taxa: 10 }, { nome: 'Região Oceânica / Alto', taxa: 14 }
        ]
      },
      retirada: true,
      tempoRetirada: 'Com horário combinado',
      pedidoMinimo: 25,
      pagamentos: ['Pix', 'Cartão de crédito na entrega', 'Cartão de débito na entrega', 'Dinheiro']
    },

    equipe: [
      { id: 'f-clara', nome: 'Clara (exemplo)', pin: '1111', ativo: true, permissoes: { pedidos: true, situacao: true, esgotado: true } },
      { id: 'f-lucas', nome: 'Lucas (exemplo)', pin: '1111', ativo: true, permissoes: { pedidos: true, esgotado: true } }
    ],
    entregadores: [
      { id: 'e-carlos', nome: 'Carlos · entregador (exemplo)', whats: '(21) 99999-1234', ativo: true }
    ],
    cupons: [
      { codigo: 'BEMVINDO10', tipo: 'pct', valor: 10, minimo: 30, ativo: true }
    ],

    categorias: [
      { id: 'bolos-encomenda', nome: 'Bolos sob encomenda', icone: 'cat-bolo' },
      { id: 'fatias', nome: 'Fatias e bolos do dia', icone: 'cat-doce' },
      { id: 'docinhos', nome: 'Docinhos e brigadeiros', icone: 'cat-estrela' },
      { id: 'tortas', nome: 'Tortas e sobremesas', icone: 'cat-cafe' },
      { id: 'kits', nome: 'Kits festa', icone: 'cat-presente' }
    ],

    grupos: [
      { id: 'tamanho-bolo', nome: 'Tamanho do bolo', tipo: 'um', obrig: true, itens: [
        { nome: 'Pequeno · 15 cm (até 12 fatias)', preco: 0 },
        { nome: 'Médio · 20 cm (até 22 fatias)', preco: 45 },
        { nome: 'Grande · 25 cm (até 35 fatias)', preco: 95 },
        { nome: 'Dois andares (até 50 fatias)', preco: 180 }] },
      { id: 'massa', nome: 'Massa', tipo: 'um', obrig: true, itens: [
        { nome: 'Baunilha amanteigada', preco: 0 },
        { nome: 'Chocolate 50% cacau', preco: 0 },
        { nome: 'Red velvet', preco: 10 },
        { nome: 'Cenoura fofinha', preco: 0 }] },
      { id: 'recheio', nome: 'Recheio', tipo: 'varios', obrig: true, max: 2, itens: [
        { nome: 'Brigadeiro cremoso', preco: 0 },
        { nome: 'Ninho com morango', preco: 8 },
        { nome: 'Doce de leite artesanal', preco: 0 },
        { nome: 'Ninho com Nutella', preco: 14 },
        { nome: 'Beijinho de coco', preco: 0 },
        { nome: 'Pistache cremoso', preco: 18 }] },
      { id: 'cobertura', nome: 'Cobertura e acabamento', tipo: 'um', obrig: true, itens: [
        { nome: 'Chantininho espatulado', preco: 0 },
        { nome: 'Ganache de chocolate', preco: 12 },
        { nome: 'Buttercream floral', preco: 18 },
        { nome: 'Naked cake com frutas', preco: 15 }] },
      { id: 'data-entrega', nome: 'Data de entrega ou retirada', tipo: 'data', obrig: true, antecedencia: 2, itens: [] },
      { id: 'tema-frase', nome: 'Tema e frase no bolo', tipo: 'texto', obrig: false, max: 110,
        placeholder: 'Ex.: Tema jardim · Parabéns Maria!', dica: 'Informe o tema, cores ou frase para a plaquinha' , itens: [] },
      { id: 'caixa-doces', nome: 'Quantidade na caixa', tipo: 'um', obrig: true, itens: [
        { nome: 'Caixa com 12 unidades', preco: 0 },
        { nome: 'Caixa com 25 unidades', preco: 26 },
        { nome: 'Cento de festa (100 un.)', preco: 118 }] },
      { id: 'sabores-doces', nome: 'Sabores dos docinhos', tipo: 'varios', obrig: true, max: 4, itens: [
        { nome: 'Brigadeiro belga', preco: 0 },
        { nome: 'Ninho com Nutella', preco: 4 },
        { nome: 'Beijinho cremoso', preco: 0 },
        { nome: 'Casadinho', preco: 0 },
        { nome: 'Churros com doce de leite', preco: 2 },
        { nome: 'Pistache', preco: 8 },
        { nome: 'Morango (bicho de pé)', preco: 0 }] },
      { id: 'extra-presente', nome: 'Toque especial', tipo: 'varios', obrig: false, max: 2, itens: [
        { nome: 'Laço de cetim e sacola presente', preco: 6 },
        { nome: 'Cartão escrito à mão', preco: 4 },
        { nome: 'Vela faísca dourada', preco: 8 }] }
    ],

    produtos: [
      { id: 'b-festa', cat: 'bolos-encomenda', nome: 'Bolo personalizado sob encomenda', desc: 'Monte do seu jeito: escolha tamanho, massa, até 2 recheios, cobertura, data e frase do topo.', preco: 95, foto: 'fotos/bolo-festa.jpg', grupos: ['tamanho-bolo', 'massa', 'recheio', 'cobertura', 'data-entrega', 'tema-frase', 'extra-presente'], destaque: true },
      { id: 'b-choco', cat: 'bolos-encomenda', nome: 'Bolo trufado de chocolate belga', desc: 'Massa úmida de cacau 50%, calda de chocolate meio amargo e brigadeiros no topo.', preco: 105, foto: 'fotos/bolo-chocolate.jpg', grupos: ['tamanho-bolo', 'recheio', 'cobertura', 'data-entrega', 'tema-frase'], destaque: true },
      { id: 'b-morango', cat: 'bolos-encomenda', nome: 'Bolo Ninho com morangos frescos', desc: 'Recheio cremoso de leite Ninho intercalado com morangos selecionados.', preco: 110, foto: 'fotos/bolo-morango.jpg', grupos: ['tamanho-bolo', 'massa', 'cobertura', 'data-entrega', 'tema-frase'] },
      { id: 'b-redvelvet', cat: 'bolos-encomenda', nome: 'Bolo Red Velvet com cream cheese', desc: 'Massa aveludada vermelha com creme suave de cream cheese e frutas vermelhas.', preco: 115, foto: 'fotos/red-velvet.jpg', grupos: ['tamanho-bolo', 'cobertura', 'data-entrega', 'tema-frase'] },

      { id: 'f-choco', cat: 'fatias', nome: 'Fatia suprema de brigadeiro', desc: 'Fatia generosa de três camadas bem molhadinha e cobertura cremosa.', preco: 18.9, foto: 'fotos/fatia-choco.jpg', grupos: ['extra-presente'], destaque: true },
      { id: 'f-cenoura', cat: 'fatias', nome: 'Bolo caseiro de cenoura com calda', desc: 'Bolo inteiro de furo no meio com cobertura generosa de brigadeiro.', preco: 38.9, foto: 'fotos/bolo-cenoura.jpg', grupos: [] },
      { id: 'f-cupcake', cat: 'fatias', nome: 'Cupcake recheado gourmet', desc: 'Massa fofinha com recheio cremoso e roseta de buttercream.', preco: 14.9, foto: 'fotos/cupcake.jpg', grupos: ['extra-presente'] },

      { id: 'd-caixa', cat: 'docinhos', nome: 'Caixa de brigadeiros gourmet', desc: 'Escolha o tamanho da caixa e até 4 sabores artesanais enrolados no dia.', preco: 32, foto: 'fotos/brigadeiros.jpg', grupos: ['caixa-doces', 'sabores-doces', 'extra-presente'], destaque: true },
      { id: 'd-brownie', cat: 'docinhos', nome: 'Brownie recheado de brigadeiro', desc: 'Casquinha crocante, miolo úmido de chocolate meio amargo e cobertura.', preco: 19.9, foto: 'fotos/brownie.jpg', grupos: ['extra-presente'] },
      { id: 'd-macarons', cat: 'docinhos', nome: 'Caixa de macarons artesanais (6 un.)', desc: 'Sabores sortidos da semana em caixa presenteável.', preco: 42, foto: 'fotos/macarons.jpg', grupos: ['extra-presente'] },

      { id: 't-limao', cat: 'tortas', nome: 'Torta de limão com merengue', desc: 'Base crocante amanteigada, creme cítrico de limão taiti e merengue maçaricado.', preco: 68, foto: 'fotos/torta-limao.jpg', grupos: ['data-entrega'] },
      { id: 't-cheesecake', cat: 'tortas', nome: 'Cheesecake de frutas vermelhas', desc: 'Cheesecake assado cremoso com calda artesanal de morango e amora.', preco: 74, foto: 'fotos/cheesecake.jpg', grupos: ['data-entrega'] },

      { id: 'k-festa', cat: 'kits', nome: 'Kit festa na caixa', desc: 'Bolo pequeno personalizado (12 fatias) + 25 docinhos gourmet + laço presente.', preco: 189, foto: 'fotos/kit-festa.jpg', grupos: ['massa', 'recheio', 'cobertura', 'sabores-doces', 'data-entrega', 'tema-frase'], destaque: true }
    ]
  }
};
