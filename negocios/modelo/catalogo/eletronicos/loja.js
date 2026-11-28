/* Catálogo digital · modelo Celulares, eletrônicos e acessórios
   Loja de DEMONSTRAÇÃO: nome, endereço, produtos e preços são exemplos. */
window.LOJA = {
  id: 'demo-eletronicos',
  demo: true,
  tipo: 'loja',
  senhaDemo: '1234',
  ramo: 'Celulares, eletrônicos e acessórios',

  visual: {
    nome: 'Ponto Tech',
    segmento: 'Celulares, acessórios e assistência',
    sigla: 'PT',
    cores: { p: '#2563eb', d: '#38bdf8', escuro: '#0d1726', fundo: '#f4f7fc' },
    fontes: { t: "'Montserrat', system-ui, sans-serif", c: "'Inter', system-ui, sans-serif" },
    cena: 'tech'
  },
  textos: {
    selo: 'Garantia real e entrega no mesmo dia',
    titulo: 'Celulares, acessórios e carga rápida sem espera.',
    sub: 'Escolha o modelo compatível, a cor, a capacidade e a garantia. Pedido organizado direto no WhatsApp da loja.',
    botao: 'Ver o catálogo',
    busca: 'Buscar iPhone, capa, carregador, fone...',
    obsPlaceholder: 'Ex.: película aplicada na loja, aparelho modelo exato'
  },

  dados: {
    loja: {
      whats: '',
      endereco: 'Av. Amaral Peixoto, 512 · Loja 14',
      cidade: 'Sua cidade · UF',
      horario: {
        0: [['10:00', '16:00']], 1: [['09:00', '19:30']], 2: [['09:00', '19:30']], 3: [['09:00', '19:30']],
        4: [['09:00', '19:30']], 5: [['09:00', '19:30']], 6: [['09:00', '18:00']]
      },
      fechadaAgora: false,
      avisoFechada: 'Hoje estamos fechados. Voltamos amanhã às 9h!',
      entrega: {
        ativa: true,
        tempo: 'Entrega rápida em 40 min na região',
        bairros: [
          { nome: 'Centro', taxa: 8 }, { nome: 'Icaraí / Jardim', taxa: 10 }, { nome: 'Bairro Norte', taxa: 12 },
          { nome: 'Vila Nova', taxa: 14 }, { nome: 'Envio pelos Correios (combinar)', taxa: 0 }
        ]
      },
      retirada: true,
      tempoRetirada: 'Pronto em 15 min (aplicamos película na hora)',
      pedidoMinimo: 0,
      pagamentos: ['Pix (desconto à vista na loja)', 'Cartão de crédito em até 12x', 'Cartão de débito', 'Dinheiro']
    },

    equipe: [
      { id: 'f-rafael', nome: 'Rafael · vendas (exemplo)', pin: '1111', ativo: true, permissoes: { pedidos: true, situacao: true, esgotado: true } },
      { id: 'f-tiago', nome: 'Tiago · bancada (exemplo)', pin: '1111', ativo: true, permissoes: { pedidos: true, esgotado: true } }
    ],
    entregadores: [
      { id: 'e-carlos', nome: 'Carlos · entregador (exemplo)', whats: '(21) 99999-1234', ativo: true }
    ],
    cupons: [
      { codigo: 'TECH10', tipo: 'pct', valor: 10, minimo: 100, ativo: true }
    ],

    categorias: [
      { id: 'smartphones', nome: 'Smartphones e seminovos', icone: 'cat-celular' },
      { id: 'capas', nome: 'Capinhas e películas', icone: 'cat-estrela' },
      { id: 'energia', nome: 'Carregadores e cabos', icone: 'cat-promo' },
      { id: 'audio', nome: 'Fones e caixas de som', icone: 'cat-acessorio' },
      { id: 'assistencia', nome: 'Assistência e orçamento', icone: 'cat-presente' }
    ],

    grupos: [
      { id: 'capacidade', nome: 'Armazenamento (capacidade)', tipo: 'um', obrig: true, itens: [
        { nome: '128 GB', preco: 0 }, { nome: '256 GB', preco: 350 }, { nome: '512 GB', preco: 750 }] },
      { id: 'cor-aparelho', nome: 'Cor', tipo: 'um', obrig: true, itens: [
        { nome: 'Preto titânio', cor: '#1f232a', preco: 0 },
        { nome: 'Branco estelar', cor: '#f3f4f6', preco: 0 },
        { nome: 'Azul profundo', cor: '#1d4ed8', preco: 0 },
        { nome: 'Grafite / Prata', cor: '#9ca3af', preco: 0 }] },
      { id: 'garantia', nome: 'Garantia', tipo: 'um', obrig: true, itens: [
        { nome: 'Garantia da loja · 90 dias (incluída)', preco: 0 },
        { nome: 'Garantia estendida · 1 ano', preco: 89 }] },
      { id: 'modelo-comp', nome: 'Modelo compatível', tipo: 'um', obrig: true, itens: [
        { nome: 'iPhone 13 / 14', preco: 0 },
        { nome: 'iPhone 15 / 16 (Pro e Pro Max)', preco: 0 },
        { nome: 'Samsung Galaxy S23 / S24', preco: 0 },
        { nome: 'Samsung linha A (A15 / A35 / A55)', preco: 0 },
        { nome: 'Xiaomi / Motorola (informar na obs.)', preco: 0 }] },
      { id: 'cor-acessorio', nome: 'Cor', tipo: 'um', obrig: true, itens: [
        { nome: 'Transparente anti-amarelamento', cor: '#e5eef8', preco: 0 },
        { nome: 'Preto fosco', cor: '#18181b', preco: 0 },
        { nome: 'Azul marinho', cor: '#1e3a8a', preco: 0 },
        { nome: 'Lavanda / Rosa', cor: '#c084fc', preco: 0 }] },
      { id: 'conector', nome: 'Tipo de cabo / entrada', tipo: 'um', obrig: true, itens: [
        { nome: 'USB-C para USB-C (iPhone 15/16 e Android)', preco: 0 },
        { nome: 'USB-C para Lightning (iPhone até 14)', preco: 0 }] },
      { id: 'defeito-txt', nome: 'Modelo do aparelho e problema', tipo: 'texto', obrig: true, max: 120,
        placeholder: 'Ex.: iPhone 13 · tela trincada ou bateria viciada', dica: 'Informe o modelo exato para passarmos o orçamento rápido', itens: [] }
    ],

    produtos: [
      { id: 's-iphone', cat: 'smartphones', nome: 'iPhone 14 Seminovo Premium (saúde >90%)', desc: 'Revisado em 30 pontos, acompanha cabo turbo, película aplicada e garantia real.', preco: 2690, foto: 'fotos/smartphone.jpg', grupos: ['capacidade', 'cor-aparelho', 'garantia'], destaque: true },
      { id: 's-galaxy', cat: 'smartphones', nome: 'Smartphone Android 5G Dual SIM (lacrado)', desc: 'Tela AMOLED 120 Hz, câmera tripla 50 MP e bateria de 5000 mAh.', preco: 1690, foto: 'fotos/android.jpg', grupos: ['capacidade', 'cor-aparelho', 'garantia'], destaque: true },

      { id: 'c-magsafe', cat: 'capas', nome: 'Capa protetora MagSafe anti-impacto', desc: 'Bordas elevadas para proteger tela e câmeras. Escolha o modelo e a cor.', preco: 59.9, foto: 'fotos/capa.jpg', grupos: ['modelo-comp', 'cor-acessorio'], destaque: true },
      { id: 'c-pelicula', cat: 'capas', nome: 'Película 3D Vidro Temperado (ou Privacidade)', desc: 'Alta transparência com kit de aplicação (aplicamos grátis na loja).', preco: 34.9, foto: 'fotos/pelicula.jpg', grupos: ['modelo-comp'] },

      { id: 'e-turbo', cat: 'energia', nome: 'Carregador Turbo 30W + Cabo reforçado', desc: 'Carrega até 50% em 30 minutos com proteção contra sobrecarga. Garantia de 90 dias.', preco: 89.9, foto: 'fotos/carregador.jpg', grupos: ['conector', 'garantia'], destaque: true },
      { id: 'e-powerbank', cat: 'energia', nome: 'Power Bank 10.000 mAh carga rápida', desc: 'Fino, cabe no bolso e garante até 2 cargas completas fora de casa.', preco: 139.9, foto: 'fotos/powerbank.jpg', grupos: ['cor-aparelho', 'garantia'] },

      { id: 'a-fone', cat: 'audio', nome: 'Fone Bluetooth TWS com cancelamento de ruído', desc: 'Bateria de até 24h com estojo, grave limpo e microfone para chamadas.', preco: 149.9, foto: 'fotos/fone-tws.jpg', grupos: ['cor-aparelho', 'garantia'] },
      { id: 'a-caixa', cat: 'audio', nome: 'Caixa de som Bluetooth à prova d’água', desc: 'Som potente portátil com alça e bateria de 12 horas.', preco: 219.9, foto: 'fotos/caixa-som.jpg', grupos: ['cor-acessorio', 'garantia'] },

      { id: 'as-orcamento', cat: 'assistencia', nome: 'Orçamento de troca de tela ou bateria', desc: 'Atendimento no mesmo dia com peças de primeira linha e garantia de 90 dias.', preco: 0, foto: 'fotos/assistencia.jpg', grupos: ['defeito-txt'] }
    ]
  }
};
