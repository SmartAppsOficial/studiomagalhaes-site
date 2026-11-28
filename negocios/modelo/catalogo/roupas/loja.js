/* Catálogo digital · modelo Roupas e moda (Bloco Loja)
   Loja de DEMONSTRAÇÃO: nome, endereço, produtos e preços são exemplos.
   "visual" e "textos" são definidos pelo Studio (mudar é atualização avulsa).
   "dados" é o que a própria loja edita na área da loja. */
window.LOJA = {
  id: 'demo-roupas',
  demo: true,
  tipo: 'loja',
  senhaDemo: '1234',
  ramo: 'Roupas e moda',

  visual: {
    nome: 'Casa Linho',
    segmento: 'Moda feminina, masculina e plus size',
    sigla: 'CL',
    cores: { p: '#8c4a32', d: '#d9b07e', escuro: '#1f1815', fundo: '#fbf8f4' },
    fontes: { t: "'Playfair Display', Georgia, serif", c: "'Source Sans 3', system-ui, sans-serif" },
    cena: 'moda'
  },
  textos: {
    selo: 'Nova coleção · do PP ao G3',
    titulo: 'Peças versáteis para vestir do seu jeito.',
    sub: 'Escolha tamanho, cor, consulte a tabela de medidas e reserve peças únicas direto pelo WhatsApp. Entrega na região ou retirada na loja.',
    botao: 'Ver o catálogo',
    busca: 'Buscar vestidos, blusas, calças...',
    obsPlaceholder: 'Ex.: embalagem para presente, prefiro provar dois tamanhos'
  },

  dados: {
    loja: {
      whats: '',
      endereco: 'Rua das Acácias, 155 · Loja 02',
      cidade: 'Sua cidade · UF',
      horario: {
        0: [['10:00', '18:00']], 1: [['09:00', '20:00']], 2: [['09:00', '20:00']], 3: [['09:00', '20:00']],
        4: [['09:00', '20:00']], 5: [['09:00', '20:00']], 6: [['09:00', '19:00']]
      },
      fechadaAgora: false,
      avisoFechada: 'Hoje estamos em balanço de estoque. Voltamos amanhã!',
      entrega: {
        ativa: true,
        tempo: 'Mesmo dia na região · Correios para todo Brasil',
        bairros: [
          { nome: 'Centro', taxa: 8 }, { nome: 'Icaraí / Jardim', taxa: 10 }, { nome: 'Bairro Norte', taxa: 12 },
          { nome: 'Vila Nova', taxa: 14 }, { nome: 'Envio pelos Correios (combinar frete)', taxa: 0 }
        ]
      },
      retirada: true,
      tempoRetirada: 'Pronto em 30 min (pode provar na loja)',
      pedidoMinimo: 0,
      pagamentos: ['Pix (5% à vista na loja)', 'Cartão de crédito em até 3x', 'Cartão de débito', 'Dinheiro']
    },

    equipe: [
      { id: 'f-camila', nome: 'Camila · vendedora (exemplo)', pin: '1111', ativo: true, permissoes: { pedidos: true, situacao: true, esgotado: true } },
      { id: 'f-bruna', nome: 'Bruna · estoque (exemplo)', pin: '1111', ativo: true, permissoes: { pedidos: true, esgotado: true, produtos: true } }
    ],
    entregadores: [
      { id: 'e-carlos', nome: 'Carlos · entregador (exemplo)', whats: '(21) 99999-1234', ativo: true }
    ],
    cupons: [
      { codigo: 'MODA10', tipo: 'pct', valor: 10, minimo: 120, ativo: true }
    ],

    // Tabela de medidas padrão exibida nos produtos de vestuário (do PP ao G3 Plus Size)
    medidas: {
      titulo: 'Ver tabela de medidas (PP ao G3 Plus Size)',
      colunas: ['Tam.', 'Num.', 'Busto / Tórax', 'Cintura', 'Quadril'],
      linhas: [
        ['PP', '34–36', '80–84 cm', '62–66 cm', '88–92 cm'],
        ['P', '38', '85–89 cm', '67–71 cm', '93–97 cm'],
        ['M', '40–42', '90–96 cm', '72–78 cm', '98–104 cm'],
        ['G', '44', '97–103 cm', '79–85 cm', '105–111 cm'],
        ['GG', '46', '104–110 cm', '86–92 cm', '112–118 cm'],
        ['G1', '48', '111–117 cm', '93–99 cm', '119–125 cm'],
        ['G2', '50–52', '118–126 cm', '100–108 cm', '126–134 cm'],
        ['G3', '54', '127–135 cm', '109–117 cm', '135–143 cm']
      ]
    },

    categorias: [
      { id: 'unicas', nome: 'Peças únicas', icone: 'cat-estrela' },
      { id: 'vestidos', nome: 'Vestidos e conjuntos', icone: 'cat-vestido' },
      { id: 'blusas', nome: 'Blusas e camisas', icone: 'cat-roupa' },
      { id: 'calcas', nome: 'Calças e alfaiataria', icone: 'cat-promo' },
      { id: 'acessorios', nome: 'Bolsas e acessórios', icone: 'cat-acessorio' }
    ],

    grupos: [
      { id: 'tam-roupa', nome: 'Tamanho (inclui Plus Size)', tipo: 'um', obrig: true, itens: [
        { nome: 'PP (34–36)', preco: 0 }, { nome: 'P (38)', preco: 0 }, { nome: 'M (40–42)', preco: 0 },
        { nome: 'G (44)', preco: 0 }, { nome: 'GG (46)', preco: 0 }, { nome: 'G1 · Plus Size (48)', preco: 0 },
        { nome: 'G2 · Plus Size (50–52)', preco: 0 }, { nome: 'G3 · Plus Size (54)', preco: 0 }] },
      { id: 'tam-unico', nome: 'Tamanho da peça única', tipo: 'um', obrig: true, itens: [
        { nome: 'Tamanho único · M (veste 40–42)', preco: 0 }] },
      { id: 'cor-linho', nome: 'Cor', tipo: 'um', obrig: true, itens: [
        { nome: 'Off-white', cor: '#f5f0e6', preco: 0 },
        { nome: 'Terracota', cor: '#a44a32', preco: 0 },
        { nome: 'Preto clássico', cor: '#1c1b1a', preco: 0 },
        { nome: 'Verde oliva', cor: '#546444', preco: 0 },
        { nome: 'Areia', cor: '#d7c3a3', preco: 0 }] },
      { id: 'cor-casual', nome: 'Cor', tipo: 'um', obrig: true, itens: [
        { nome: 'Preto estonado', cor: '#232325', preco: 0 },
        { nome: 'Branco neve', cor: '#f8f8f8', preco: 0 },
        { nome: 'Azul marinho', cor: '#1d3254', preco: 0 },
        { nome: 'Bordô', cor: '#6b2232', preco: 0 }] },
      { id: 'embalagem', nome: 'Embalagem presente', tipo: 'um', obrig: false, itens: [
        { nome: 'Sacola presente + papel de seda', preco: 0 },
        { nome: 'Caixa rígida com laço e cartão', preco: 12 }] }
    ],

    produtos: [
      { id: 'u-vestido-linho', cat: 'unicas', nome: 'Vestido midi em linho bordado', desc: 'Peça exclusiva de coleção limitada com botões naturais e bolsos laterais. Apenas 1 unidade em estoque.', preco: 219.9, foto: 'fotos/vestido-linho.jpg', grupos: ['tam-unico', 'embalagem'], pecaUnica: true, destaque: true },
      { id: 'u-jaqueta', cat: 'unicas', nome: 'Jaqueta jeans oversized vintage', desc: 'Lavagem artesanal exclusiva, acabamento reforçado e modelagem ampla confortável.', preco: 198, foto: 'fotos/jaqueta-jeans.jpg', grupos: ['tam-unico', 'embalagem'], pecaUnica: true, destaque: true },

      { id: 'v-midi', cat: 'vestidos', nome: 'Vestido fluido com fenda lateral', desc: 'Tecido leve com ótimo caimento que não marca. Disponível do PP ao G3 Plus Size.', preco: 169.9, foto: 'fotos/vestido-midi.jpg', grupos: ['tam-roupa', 'cor-linho', 'embalagem'], destaque: true },
      { id: 'v-conjunto', cat: 'vestidos', nome: 'Conjunto alfaiataria colete + calça', desc: 'Elegância para trabalho ou eventos, com elástico discreto atrás para máximo conforto.', preco: 249.9, foto: 'fotos/conjunto.jpg', grupos: ['tam-roupa', 'cor-linho', 'embalagem'], destaque: true },
      { id: 'v-plus', cat: 'vestidos', nome: 'Vestido envelope Plus Size (G1 ao G3)', desc: 'Decote transpassado que valoriza a silhueta, ajuste na cintura e tecido fresco.', preco: 179.9, foto: 'fotos/vestido-plus.jpg', grupos: ['tam-roupa', 'cor-linho', 'embalagem'] },

      { id: 'b-camisa', cat: 'blusas', nome: 'Camisa de linho manga longa', desc: 'Clássica e atemporal, com botões perolados e punho estruturado.', preco: 139.9, foto: 'fotos/camisa-linho.jpg', grupos: ['tam-roupa', 'cor-linho'] },
      { id: 'b-tshirt', cat: 'blusas', nome: 'Camiseta algodão peruano (unissex)', desc: 'Toque macio, gola reforçada que não esgarça e modelagem reta.', preco: 89.9, foto: 'fotos/camiseta.jpg', grupos: ['tam-roupa', 'cor-casual'] },
      { id: 'b-tricot', cat: 'blusas', nome: 'Blusa tricot modal leve', desc: 'Malha respirável para meia-estação com acabamento canelado.', preco: 119.9, foto: 'fotos/blusa-tricot.jpg', grupos: ['tam-roupa', 'cor-linho'] },

      { id: 'c-pantalona', cat: 'calcas', nome: 'Calça pantalona cintura alta', desc: 'Alongamento visual, bolsos faca e tecido encorpado que não fica transparente.', preco: 159.9, foto: 'fotos/pantalona.jpg', grupos: ['tam-roupa', 'cor-linho'] },
      { id: 'c-jeans', cat: 'calcas', nome: 'Calça jeans wide leg premium', desc: '100% algodão com caimento impecável e cintura média-alta.', preco: 174.9, foto: 'fotos/calca-jeans.jpg', grupos: ['tam-roupa', 'cor-casual'] },

      { id: 'a-bolsa', cat: 'acessorios', nome: 'Bolsa tiracolo estruturada', desc: 'Acabamento em couro ecológico macio com alça regulável e bolso interno.', preco: 149.9, foto: 'fotos/bolsa.jpg', grupos: ['cor-linho', 'embalagem'], medidas: false },
      { id: 'a-cinto', cat: 'acessorios', nome: 'Cinto fivela dourada minimalista', desc: 'Combina com vestidos, pantalonas e jeans. Regulagem fácil.', preco: 59.9, foto: 'fotos/cinto.jpg', grupos: ['cor-linho'], medidas: false }
    ]
  }
};
