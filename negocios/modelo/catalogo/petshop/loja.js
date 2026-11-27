/* Catálogo digital · modelo Pet shop e produtos para animais
   Loja de DEMONSTRAÇÃO: nome, endereço, produtos e preços são exemplos. */
window.LOJA = {
  id: 'demo-petshop',
  demo: true,
  tipo: 'loja',
  senhaDemo: '1234',
  ramo: 'Pet shop e produtos para animais',
  repetirExemplo: [{ produto: 'r-caes', escolhas: { 'peso-racao': [2], 'porte-pet': [1] }, campos: {}, meio: '', qtd: 1, obs: '' }],

  visual: {
    nome: 'Bicho Feliz',
    segmento: 'Pet shop, rações e banho & tosa',
    sigla: 'BF',
    cores: { p: '#1f8a7a', d: '#f4b942', escuro: '#122b2b', fundo: '#f5fbfa' },
    fontes: { t: "'Bricolage Grotesque', system-ui, sans-serif", c: "'DM Sans', system-ui, sans-serif" },
    cena: 'pet'
  },
  textos: {
    selo: 'Tudo para o seu melhor amigo',
    titulo: 'Ração na porta e banho & tosa agendado.',
    sub: 'Escolha o peso da ração, repita o último pedido em um toque ou agende banho e tosa direto pelo WhatsApp.',
    botao: 'Ver o catálogo',
    busca: 'Buscar rações, antipulgas, banho...',
    obsPlaceholder: 'Ex.: portaria recebe a ração, pet dócil e agitado'
  },

  dados: {
    loja: {
      whats: '',
      endereco: 'Av. dos Ipês, 290 · Centro',
      cidade: 'Sua cidade · UF',
      horario: {
        0: [['09:00', '18:00']], 1: [['08:30', '20:00']], 2: [['08:30', '20:00']], 3: [['08:30', '20:00']],
        4: [['08:30', '20:00']], 5: [['08:30', '20:00']], 6: [['08:30', '19:00']]
      },
      fechadaAgora: false,
      avisoFechada: 'Hoje estamos fechados. Voltamos amanhã!',
      entrega: {
        ativa: true,
        tempo: 'Entrega grátis de ração acima de R$ 120 · 40 min',
        bairros: [
          { nome: 'Centro', taxa: 5 }, { nome: 'Bairro Norte', taxa: 7 }, { nome: 'Bairro Sul', taxa: 7 },
          { nome: 'Vila Nova', taxa: 9 }, { nome: 'Jardim das Flores', taxa: 10 }
        ]
      },
      retirada: true,
      tempoRetirada: 'Pronto em 15 min',
      pedidoMinimo: 0,
      pagamentos: ['Pix', 'Cartão de crédito em até 3x', 'Cartão de débito', 'Dinheiro']
    },

    equipe: [
      { id: 'f-paula', nome: 'Paula · balcão (exemplo)', pin: '1111', ativo: true, permissoes: { pedidos: true, situacao: true, esgotado: true } },
      { id: 'f-diego', nome: 'Diego · banho & tosa (exemplo)', pin: '1111', ativo: true, permissoes: { pedidos: true, esgotado: true } }
    ],
    entregadores: [
      { id: 'e-carlos', nome: 'Carlos · entregas (exemplo)', whats: '(21) 99999-1234', ativo: true }
    ],
    cupons: [
      { codigo: 'PET10', tipo: 'pct', valor: 10, minimo: 80, ativo: true }
    ],

    categorias: [
      { id: 'caes', nome: 'Rações para cães', icone: 'cat-pet' },
      { id: 'gatos', nome: 'Rações para gatos', icone: 'cat-estrela' },
      { id: 'banho-tosa', nome: 'Banho e tosa', icone: 'cat-presente' },
      { id: 'higiene', nome: 'Higiene e antipulgas', icone: 'cat-promo' },
      { id: 'acessorios-pet', nome: 'Brinquedos e camas', icone: 'cat-acessorio' }
    ],

    grupos: [
      { id: 'peso-racao', nome: 'Peso do pacote', tipo: 'um', obrig: true, itens: [
        { nome: '1 kg', preco: 0 }, { nome: '3 kg', preco: 46 }, { nome: '10,1 kg', preco: 138 }, { nome: '15 kg (econômico)', preco: 189 }] },
      { id: 'porte-pet', nome: 'Porte / fase do pet', tipo: 'um', obrig: true, itens: [
        { nome: 'Porte pequeno / mini', preco: 0 }, { nome: 'Porte médio', preco: 0 }, { nome: 'Porte grande', preco: 0 }, { nome: 'Filhote', preco: 4 }] },
      { id: 'sabor-gato', nome: 'Linha / sabor', tipo: 'um', obrig: true, itens: [
        { nome: 'Gatos castrados · Salmão', preco: 0 }, { nome: 'Gatos castrados · Frango', preco: 0 }, { nome: 'Filhotes · Frango e arroz', preco: 0 }] },
      { id: 'peso-gato', nome: 'Peso do pacote', tipo: 'um', obrig: true, itens: [
        { nome: '1 kg', preco: 0 }, { nome: '3 kg', preco: 52 }, { nome: '10,1 kg', preco: 162 }] },
      { id: 'porte-banho', nome: 'Porte do animal', tipo: 'um', obrig: true, itens: [
        { nome: 'Pequeno (até 10 kg)', preco: 0 }, { nome: 'Médio (11 a 20 kg)', preco: 20 }, { nome: 'Grande (acima de 20 kg)', preco: 45 }, { nome: 'Gato', preco: 15 }] },
      { id: 'extras-banho', nome: 'Cuidados extras', tipo: 'varios', obrig: false, max: 3, itens: [
        { nome: 'Tosa higiênica', preco: 18 }, { nome: 'Hidratação de pelos', preco: 25 }, { nome: 'Corte de unhas e limpeza de ouvidos', preco: 12 }, { nome: 'Táxi Dog (buscar e levar)', preco: 20 }] },
      { id: 'data-banho', nome: 'Data desejada', tipo: 'data', obrig: true, antecedencia: 1, itens: [] },
      { id: 'horario-banho', nome: 'Turno preferido', tipo: 'um', obrig: true, itens: [
        { nome: 'Manhã · 09h às 11h30', preco: 0 }, { nome: 'Tarde · 13h30 às 16h', preco: 0 }, { nome: 'Final da tarde · 16h às 18h', preco: 0 }] },
      { id: 'nome-pet', nome: 'Nome e raça do pet', tipo: 'texto', obrig: true, max: 80,
        placeholder: 'Ex.: Thor · Golden Retriever', dica: 'Ajuda nossa equipe a preparar o atendimento', itens: [] },
      { id: 'faixa-antipulga', nome: 'Peso do cão ou gato', tipo: 'um', obrig: true, itens: [
        { nome: 'Até 5 kg', preco: 0 }, { nome: '5 a 10 kg', preco: 14 }, { nome: '10 a 25 kg', preco: 28 }, { nome: 'Acima de 25 kg', preco: 42 }] }
    ],

    produtos: [
      { id: 'r-caes', cat: 'caes', nome: 'Ração Super Premium Cães', desc: 'Sem corantes artificiais, ômega 3 e 6 para pelos brilhantes. Escolha o peso e o porte.', preco: 32.9, foto: 'fotos/racao-caes.jpg', grupos: ['peso-racao', 'porte-pet'], destaque: true },
      { id: 'r-petisco', cat: 'caes', nome: 'Bifinho natural de carne (pacote 500 g)', desc: 'Petisco macio sem conservantes artificiais, ideal para adestramento.', preco: 24.9, foto: 'fotos/petisco.jpg', grupos: [] },

      { id: 'g-racao', cat: 'gatos', nome: 'Ração Premium Gatos Castrados', desc: 'Controle do trato urinário e bolas de pelo. Pacotes de 1 kg a 10,1 kg.', preco: 36.9, foto: 'fotos/racao-gatos.jpg', grupos: ['sabor-gato', 'peso-gato'], destaque: true },
      { id: 'g-areia', cat: 'gatos', nome: 'Areia sanitária biodegradável (4 kg)', desc: 'Forma torrões firmes, zero poeira e neutraliza odores.', preco: 42.9, foto: 'fotos/areia-gato.jpg', grupos: [] },

      { id: 'b-banho', cat: 'banho-tosa', nome: 'Agendar Banho completo', desc: 'Shampoo hipoalergênico, secagem tranquila, escovação e perfume suave.', preco: 55, foto: 'fotos/banho-tosa.jpg', grupos: ['porte-banho', 'extras-banho', 'data-banho', 'horario-banho', 'nome-pet'], destaque: true },
      { id: 'b-tosa', cat: 'banho-tosa', nome: 'Agendar Banho + Tosa na tesoura', desc: 'Banho completo + tosa personalizada conforme a raça.', preco: 95, foto: 'fotos/tosa.jpg', grupos: ['porte-banho', 'extras-banho', 'data-banho', 'horario-banho', 'nome-pet'], destaque: true },

      { id: 'h-antipulga', cat: 'higiene', nome: 'Antipulgas e carrapatos mastigável', desc: 'Proteção mensal em comprimido palatável. Escolha a faixa de peso.', preco: 69.9, foto: 'fotos/antipulgas.jpg', grupos: ['faixa-antipulga'] },
      { id: 'h-tapete', cat: 'higiene', nome: 'Tapete higiênico super absorvente (30 un.)', desc: 'Gel ultra-absorvente com barreiras antivazamento e atrativo canino.', preco: 64.9, foto: 'fotos/tapete.jpg', grupos: [] },

      { id: 'a-cama', cat: 'acessorios-pet', nome: 'Cama nuvem pelúcia lavável', desc: 'Super macia, fundo impermeável e zíper para lavar na máquina.', preco: 119.9, foto: 'fotos/cama-pet.jpg', grupos: ['porte-pet'] },
      { id: 'a-brinquedo', cat: 'acessorios-pet', nome: 'Corda resistente + bolinha mordedor', desc: 'Ajuda na limpeza dos dentes e diverte cães de todos os portes.', preco: 29.9, foto: 'fotos/brinquedo-pet.jpg', grupos: [] }
    ]
  }
};
