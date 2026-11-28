/* Catálogo digital · modelo Restaurante, marmitaria e comida caseira
   Loja de DEMONSTRAÇÃO: nome, endereço, produtos e preços são exemplos.
   "visual" e "textos" são definidos pelo Studio (mudar é atualização avulsa).
   "dados" é o que a própria loja edita na área da loja. */
window.LOJA = {
  id: 'demo-restaurante',
  demo: true,
  senhaDemo: '1234',
  ramo: 'Restaurante, marmitaria e comida caseira',

  visual: {
    nome: 'Panela de Casa',
    segmento: 'Restaurante e marmitaria',
    sigla: 'PC',
    cores: { p: '#2f6f3e', d: '#e9a83b', escuro: '#162419', fundo: '#f8faf6' },
    fontes: { t: "'Bricolage Grotesque', system-ui, sans-serif", c: "'DM Sans', system-ui, sans-serif" },
    cena: 'marmita'
  },
  textos: {
    selo: 'Comida caseira fresquinha todo dia',
    titulo: 'Monte sua marmita ou escolha o prato do dia.',
    sub: 'Cardápio do dia atualizado na hora, marmita montada passo a passo e entrega rápida no horário do almoço direto pelo WhatsApp.',
    botao: 'Ver o cardápio do dia',
    busca: 'Buscar pratos, marmitas ou bebidas',
    obsPlaceholder: 'Ex.: enviar talher descartável, sem cebola, feijão separado'
  },

  dados: {
    loja: {
      whats: '',
      endereco: 'Rua do Sabor, 340 · Centro',
      cidade: 'Sua cidade · UF',
      horario: {
        0: [['10:30', '22:00']], 1: [['10:30', '22:00']], 2: [['10:30', '22:00']], 3: [['10:30', '22:00']],
        4: [['10:30', '22:00']], 5: [['10:30', '22:30']], 6: [['10:30', '22:30']]
      },
      fechadaAgora: false,
      avisoFechada: 'Encerramos o almoço por hoje. Voltamos amanhã às 11h!',
      entrega: {
        ativa: true,
        tempo: '30 a 50 min (almoço)',
        bairros: [
          { nome: 'Centro', taxa: 4 }, { nome: 'Bairro Norte', taxa: 6 }, { nome: 'Bairro Sul', taxa: 6 },
          { nome: 'Vila Nova', taxa: 8 }, { nome: 'Jardim das Flores', taxa: 9 }
        ]
      },
      retirada: true,
      tempoRetirada: '15 a 25 min',
      pedidoMinimo: 20,
      pagamentos: ['Pix', 'Vale-refeição', 'Cartão de crédito na entrega', 'Cartão de débito na entrega', 'Dinheiro']
    },

    equipe: [
      { id: 'f-rosa', nome: 'Rosa (exemplo)', pin: '1111', ativo: true, permissoes: { pedidos: true, situacao: true, esgotado: true } },
      { id: 'f-joao', nome: 'João · cozinha (exemplo)', pin: '1111', ativo: true, permissoes: { pedidos: true, esgotado: true } }
    ],
    entregadores: [
      { id: 'e-carlos', nome: 'Carlos · entregador (exemplo)', whats: '(21) 99999-1234', ativo: true }
    ],
    cupons: [
      { codigo: 'ALMOCO10', tipo: 'pct', valor: 10, minimo: 25, ativo: true }
    ],

    categorias: [
      { id: 'marmitas', nome: 'Monte sua marmita', icone: 'cat-prato' },
      { id: 'prato-dia', nome: 'Cardápio do dia', icone: 'cat-estrela' },
      { id: 'executivos', nome: 'Pratos executivos', icone: 'cat-frango' },
      { id: 'saladas', nome: 'Saladas e leves', icone: 'cat-salada' },
      { id: 'bebidas-rest', nome: 'Bebidas e sobremesas', icone: 'cat-refri' }
    ],

    grupos: [
      { id: 'tam-marmita', nome: 'Tamanho da marmita', tipo: 'um', obrig: true, itens: [
        { nome: 'Pequena · 450 g', preco: 0 },
        { nome: 'Média · 600 g', preco: 5 },
        { nome: 'Grande · 800 g (caprichada)', preco: 10 }] },
      { id: 'base-marmita', nome: 'Base (arroz e feijão)', tipo: 'varios', obrig: true, max: 2, itens: [
        { nome: 'Arroz branco soltinho', preco: 0 },
        { nome: 'Arroz integral', preco: 1 },
        { nome: 'Feijão carioca temperado', preco: 0 },
        { nome: 'Feijão preto', preco: 0 },
        { nome: 'Macarrão ao alho e óleo', preco: 0 }] },
      { id: 'proteina', nome: 'Proteína principal', tipo: 'um', obrig: true, itens: [
        { nome: 'Filé de frango grelhado', preco: 0 },
        { nome: 'Bife acebolado na chapa', preco: 4 },
        { nome: 'Carne de panela desfiada', preco: 3 },
        { nome: 'Frango à parmegiana', preco: 5 },
        { nome: 'Omelete recheada (vegetariano)', preco: 0 }] },
      { id: 'guarnicoes', nome: 'Acompanhamentos', tipo: 'varios', obrig: false, max: 3, itens: [
        { nome: 'Farofa crocante de bacon', preco: 0 },
        { nome: 'Purê de batata cremoso', preco: 0 },
        { nome: 'Batata frita', preco: 3 },
        { nome: 'Legumes salteados na manteiga', preco: 0 },
        { nome: 'Salada verde + tomate (pote separado)', preco: 0 },
        { nome: 'Ovo frito de gema mole', preco: 3 }] },
      { id: 'horario-almoco', nome: 'Horário do almoço', tipo: 'um', obrig: true, itens: [
        { nome: 'Entregar / retirar agora', preco: 0 },
        { nome: 'Agendar · 11h30 às 12h30', preco: 0 },
        { nome: 'Agendar · 12h30 às 13h30', preco: 0 },
        { nome: 'Agendar · 13h30 às 14h30', preco: 0 }] },
      { id: 'ponto-bife', nome: 'Ponto da carne', tipo: 'um', obrig: true, itens: [
        { nome: 'Ao ponto', preco: 0 },
        { nome: 'Bem passado', preco: 0 },
        { nome: 'Mal passado', preco: 0 }] },
      { id: 'sabor-refri', nome: 'Sabor da bebida', tipo: 'um', obrig: true, itens: [
        { nome: 'Cola lata 350 ml', preco: 0 },
        { nome: 'Cola zero 350 ml', preco: 0 },
        { nome: 'Guaraná lata 350 ml', preco: 0 },
        { nome: 'Matte gelado com limão', preco: 1 }] }
    ],

    produtos: [
      { id: 'm-tradicional', cat: 'marmitas', nome: 'Monte sua marmita caseira', desc: 'Passo a passo: escolha tamanho, base, proteína, até 3 acompanhamentos e o horário do almoço.', preco: 21.9, foto: 'fotos/marmita-montada.jpg', grupos: ['tam-marmita', 'base-marmita', 'proteina', 'guarnicoes', 'horario-almoco'], passos: true, destaque: true },
      { id: 'm-fit', cat: 'marmitas', nome: 'Monte sua marmita leve / fitness', desc: 'Combinação equilibrada com arroz integral, grelhados e legumes frescos.', preco: 24.9, foto: 'fotos/marmita-fit.jpg', grupos: ['tam-marmita', 'proteina', 'guarnicoes', 'horario-almoco'], passos: true },

      { id: 'd-feijoada', cat: 'prato-dia', nome: 'Feijoada completa (Quarta e Sábado)', desc: 'Feijoada tradicional com carnes nobres, arroz, couve refogada, farofa, laranja e torresmo.', preco: 36.9, foto: 'fotos/feijoada.jpg', grupos: ['tam-marmita', 'horario-almoco'], destaque: true },
      { id: 'd-parmegiana', cat: 'prato-dia', nome: 'Filé à parmegiana com fritas', desc: 'Empanado crocante, molho de tomate da casa, queijo gratinado, arroz branco e batata frita.', preco: 34.9, foto: 'fotos/parmegiana.jpg', grupos: ['horario-almoco'], destaque: true },
      { id: 'd-strogonoff', cat: 'prato-dia', nome: 'Strogonoff cremoso de frango', desc: 'Cubos de frango ao molho cremoso, arroz soltinho e batata palha crocante.', preco: 28.9, foto: 'fotos/strogonoff.jpg', grupos: ['horario-almoco'] },
      { id: 'd-peixe', cat: 'prato-dia', nome: 'Filé de tilápia grelhado (Sexta)', desc: 'Tilápia grelhada no limão, purê de batata, arroz e salada fresca. (Ligue/desligue em Produtos.)', preco: 33.9, foto: 'fotos/peixe.jpg', grupos: ['horario-almoco'] },

      { id: 'e-picanha', cat: 'executivos', nome: 'Executivo de picanha na chapa', desc: 'Picanha fatiada na chapa com arroz, feijão, farofa de ovos, vinagrete e fritas.', preco: 44.9, foto: 'fotos/picanha-prato.jpg', grupos: ['ponto-bife', 'horario-almoco'], destaque: true },
      { id: 'e-frango', cat: 'executivos', nome: 'Executivo de frango grelhado', desc: 'Filé de peito temperado na hora, arroz, feijão carioca, legumes salteados e salada.', preco: 26.9, foto: 'fotos/frango-grelhado.jpg', grupos: ['horario-almoco'] },

      { id: 's-caesar', cat: 'saladas', nome: 'Salada completa com frango grelhado', desc: 'Mix de folhas, frango em tiras, tomate cereja, croutons, parmesão e molho à parte.', preco: 25.9, foto: 'fotos/salada.jpg', grupos: ['horario-almoco'] },

      { id: 'b-suco', cat: 'bebidas-rest', nome: 'Suco natural de laranja (500 ml)', desc: 'Feito na hora, bem gelado.', preco: 10.9, foto: 'fotos/suco.jpg', grupos: [] },
      { id: 'b-refri', cat: 'bebidas-rest', nome: 'Refrigerante lata ou matte', desc: '350 ml bem gelado.', preco: 6.5, foto: 'fotos/refri.jpg', grupos: ['sabor-refri'] },
      { id: 'b-pudim', cat: 'bebidas-rest', nome: 'Pudim de leite condensado (fatia)', desc: 'Cremoso, lisinho e com calda de caramelo.', preco: 11.9, foto: 'fotos/pudim.jpg', grupos: [] }
    ]
  }
};
