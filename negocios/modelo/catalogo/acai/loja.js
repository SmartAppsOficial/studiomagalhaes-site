/* Catálogo digital · modelo Açaí, sorvetes e sobremesas
   Loja de DEMONSTRAÇÃO: nome, endereço, produtos e preços são exemplos.
   "visual" e "textos" são definidos pelo Studio (mudar é atualização avulsa).
   "dados" é o que a própria loja edita na área da loja. */
window.LOJA = {
  id: 'demo-acai',
  demo: true,
  senhaDemo: '1234',
  ramo: 'Açaí e sorvetes',

  visual: {
    nome: 'Roxo Gelado',
    segmento: 'Açaí, cremes e sorvetes',
    sigla: 'RG',
    cores: { p: '#6b238c', d: '#f4b942', escuro: '#210b2e', fundo: '#faf6fc' },
    fontes: { t: "'Bricolage Grotesque', system-ui, sans-serif", c: "'DM Sans', system-ui, sans-serif" },
    cena: 'acai'
  },
  textos: {
    selo: 'Cremoso e gelado na hora',
    titulo: 'Monte seu açaí do jeito que você ama.',
    sub: 'Escolha o tamanho, os cremes, até 5 acompanhamentos e as caldas passo a passo. O pedido vai pronto para o WhatsApp.',
    botao: 'Montar meu açaí',
    busca: 'Buscar açaí, sorvete ou shake',
    obsPlaceholder: 'Ex.: mandar granola separada, bem caprichado no leite em pó'
  },

  dados: {
    loja: {
      whats: '',
      endereco: 'Av. das Palmeiras, 450 · Centro',
      cidade: 'Sua cidade · UF',
      horario: {
        0: [['09:00', '23:30']], 1: [['09:00', '23:30']], 2: [['09:00', '23:30']], 3: [['09:00', '23:30']],
        4: [['09:00', '23:30']], 5: [['09:00', '23:59']], 6: [['09:00', '23:59']]
      },
      fechadaAgora: false,
      avisoFechada: 'Hoje estamos fechados. Voltamos amanhã bem gelados!',
      entrega: {
        ativa: true,
        tempo: '25 a 40 min',
        bairros: [
          { nome: 'Centro', taxa: 4 }, { nome: 'Bairro Norte', taxa: 6 }, { nome: 'Bairro Sul', taxa: 6 },
          { nome: 'Vila Nova', taxa: 8 }, { nome: 'Jardim das Flores', taxa: 9 }
        ]
      },
      retirada: true,
      tempoRetirada: '10 a 15 min',
      pedidoMinimo: 20,
      pagamentos: ['Pix', 'Cartão de crédito na entrega', 'Cartão de débito na entrega', 'Dinheiro']
    },

    equipe: [
      { id: 'f-bia', nome: 'Bia (exemplo)', pin: '1111', ativo: true, permissoes: { pedidos: true, situacao: true, esgotado: true } },
      { id: 'f-leo', nome: 'Léo (exemplo)', pin: '1111', ativo: true, permissoes: { pedidos: true, esgotado: true } }
    ],
    entregadores: [
      { id: 'e-carlos', nome: 'Carlos · entregador (exemplo)', whats: '(21) 99999-1234', ativo: true }
    ],
    cupons: [
      { codigo: 'BEMVINDO10', tipo: 'pct', valor: 10, minimo: 25, ativo: true }
    ],

    categorias: [
      { id: 'monte', nome: 'Monte seu açaí', icone: 'cat-sorvete' },
      { id: 'prontos', nome: 'Copos prontos', icone: 'cat-estrela' },
      { id: 'barcas', nome: 'Barcas e combos', icone: 'cat-combo' },
      { id: 'sorvetes', nome: 'Sorvetes e picolés', icone: 'cat-doce' },
      { id: 'shakes', nome: 'Milkshakes e bebidas', icone: 'cat-refri' }
    ],

    grupos: [
      { id: 'tam-copo', nome: 'Tamanho', tipo: 'um', obrig: true, itens: [
        { nome: 'Copo 300 ml', preco: 0 },
        { nome: 'Copo 500 ml', preco: 7 },
        { nome: 'Copo 700 ml', preco: 13 },
        { nome: 'Pote 1 litro', preco: 21 }] },
      { id: 'cremes', nome: 'Cremes e base', tipo: 'varios', obrig: true, max: 2, itens: [
        { nome: 'Açaí tradicional puro', preco: 0 },
        { nome: 'Açaí zero açúcar', preco: 2 },
        { nome: 'Creme de Ninho', preco: 3 },
        { nome: 'Creme de cupuaçu', preco: 2 },
        { nome: 'Creme de morango', preco: 3 },
        { nome: 'Creme de Oreo', preco: 4 }] },
      { id: 'acompanhamentos', nome: 'Acompanhamentos', tipo: 'varios', obrig: false, max: 5, itens: [
        { nome: 'Leite em pó', preco: 0 },
        { nome: 'Granola crocante', preco: 0 },
        { nome: 'Paçoca', preco: 0 },
        { nome: 'Banana fatiada', preco: 0 },
        { nome: 'Morango fresco', preco: 3 },
        { nome: 'Kiwi fatiado', preco: 3 },
        { nome: 'Gotas de chocolate', preco: 2 },
        { nome: 'Confete colorido', preco: 2 },
        { nome: 'Ouro Branco picado', preco: 4 },
        { nome: 'Nutella original', preco: 6 }] },
      { id: 'caldas', nome: 'Caldas', tipo: 'varios', obrig: false, max: 2, itens: [
        { nome: 'Leite condensado', preco: 0 },
        { nome: 'Calda de chocolate', preco: 0 },
        { nome: 'Calda de morango', preco: 0 },
        { nome: 'Calda de caramelo', preco: 0 },
        { nome: 'Mel puro', preco: 2 },
        { nome: 'Creme de avelã', preco: 4 }] },
      { id: 'tam-barca', nome: 'Tamanho da barca', tipo: 'um', obrig: true, itens: [
        { nome: 'Barca média · 750 ml (2 pessoas)', preco: 0 },
        { nome: 'Barca grande · 1,2 L (até 4 pessoas)', preco: 22 }] },
      { id: 'sabor-sorvete', nome: 'Sabores do sorvete', tipo: 'varios', obrig: true, max: 3, itens: [
        { nome: 'Chocolate belga', preco: 0 },
        { nome: 'Morango natural', preco: 0 },
        { nome: 'Ninho trufado', preco: 2 },
        { nome: 'Pistache', preco: 4 },
        { nome: 'Flocos', preco: 0 },
        { nome: 'Maracujá cremoso', preco: 0 }] },
      { id: 'tam-shake', nome: 'Tamanho do milkshake', tipo: 'um', obrig: true, itens: [
        { nome: 'Copo 400 ml', preco: 0 },
        { nome: 'Copo 600 ml', preco: 6 }] },
      { id: 'sabor-shake', nome: 'Sabor do milkshake', tipo: 'um', obrig: true, itens: [
        { nome: 'Ovomaltine crocante', preco: 0 },
        { nome: 'Morango com chantilly', preco: 0 },
        { nome: 'Ninho com Nutella', preco: 4 },
        { nome: 'Chocolate belga', preco: 0 }] }
    ],

    produtos: [
      { id: 'a-copo', cat: 'monte', nome: 'Monte seu açaí no copo', desc: 'Passo a passo: escolha tamanho, cremes, até 5 acompanhamentos e caldas.', preco: 16.9, foto: 'fotos/acai-copo.jpg', grupos: ['tam-copo', 'cremes', 'acompanhamentos', 'caldas'], passos: true, destaque: true },
      { id: 'a-tigela', cat: 'monte', nome: 'Monte sua tigela de açaí', desc: 'Tigela generosa com camadas caprichadas para comer de colher.', preco: 21.9, foto: 'fotos/acai-tigela.jpg', grupos: ['tam-copo', 'cremes', 'acompanhamentos', 'caldas'], passos: true, destaque: true },
      { id: 'a-zero', cat: 'monte', nome: 'Monte seu açaí fitness (zero açúcar)', desc: 'Açaí puro sem adição de açúcar com frutas frescas e granola.', preco: 19.9, foto: 'fotos/acai-fit.jpg', grupos: ['tam-copo', 'acompanhamentos', 'caldas'], passos: true },

      { id: 'p-ninho', cat: 'prontos', nome: 'Copo Ninho com Morango (500 ml)', desc: 'Açaí cremoso, camadas de creme de Ninho, morangos frescos e leite em pó.', preco: 24.9, foto: 'fotos/copo-morango.jpg', grupos: ['caldas'], destaque: true },
      { id: 'p-tropical', cat: 'prontos', nome: 'Copo Tropical (500 ml)', desc: 'Açaí tradicional, banana fatiada, granola crocante, paçoca e mel.', preco: 22.9, foto: 'fotos/copo-tropical.jpg', grupos: ['caldas'] },
      { id: 'p-casadinho', cat: 'prontos', nome: 'Casadinho Açaí + Cupuaçu (500 ml)', desc: 'Metade açaí puro, metade creme de cupuaçu com acompanhamentos à escolha.', preco: 23.9, foto: 'fotos/copo-casadinho.jpg', grupos: ['acompanhamentos', 'caldas'] },

      { id: 'b-barca', cat: 'barcas', nome: 'Monte sua barca de açaí', desc: 'Ideal para dividir: escolha o tamanho, cremes, acompanhamentos e caldas passo a passo.', preco: 44.9, foto: 'fotos/barca-acai.jpg', grupos: ['tam-barca', 'cremes', 'acompanhamentos', 'caldas'], passos: true, destaque: true },
      { id: 'b-combo', cat: 'barcas', nome: 'Combo 2 copos de 500 ml', desc: 'Dois copos de 500 ml com acompanhamentos e caldas à escolha.', preco: 42.9, foto: 'fotos/combo-acai.jpg', grupos: ['acompanhamentos', 'caldas'] },

      { id: 's-casquinha', cat: 'sorvetes', nome: 'Sorvete artesanal na casquinha', desc: 'Até 3 bolas cremosas feitas diariamente, com calda à escolha.', preco: 15.9, foto: 'fotos/casquinha.jpg', grupos: ['sabor-sorvete', 'caldas'], passos: true, destaque: true },
      { id: 's-pote', cat: 'sorvetes', nome: 'Pote de sorvete artesanal (500 ml)', desc: 'Escolha até 3 sabores artesanais para levar para casa.', preco: 29.9, foto: 'fotos/pote-sorvete.jpg', grupos: ['sabor-sorvete'] },
      { id: 's-picole', cat: 'sorvetes', nome: 'Picolé de fruta recheado', desc: 'Morango com leite condensado ou maracujá cremoso.', preco: 9.9, foto: 'fotos/picole.jpg', grupos: [] },

      { id: 'm-shake', cat: 'shakes', nome: 'Milkshake cremoso', desc: 'Batido na hora com sorvete artesanal e cobertura na taça.', preco: 18.9, foto: 'fotos/milkshake.jpg', grupos: ['tam-shake', 'sabor-shake'] },
      { id: 'm-agua', cat: 'shakes', nome: 'Água mineral gelada (500 ml)', desc: 'Garrafa 500 ml sem gás, bem gelada.', preco: 4.5, foto: 'fotos/agua.jpg', grupos: [] }
    ]
  }
};
