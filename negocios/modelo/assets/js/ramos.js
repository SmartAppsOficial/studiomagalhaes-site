/* Conteúdo de exemplo de cada ramo.
   Tudo aqui é texto de demonstração: nomes, endereços e depoimentos são fictícios
   e aparecem no site marcados como exemplo. Preços não são inventados (ficam "R$ —"). */
window.RAMOS = {

  restaurante: {
    rotulo: 'Restaurante', icone: 'talher',
    nomePadrao: 'Casa Quintal', segmento: 'Cozinha caseira',
    sugestao: { cor1: '#b5482a', cor2: '#e9b949', fonte: 'acolhedora', estilo: 'arredondado', tema: 'claro' },
    secoesPadrao: { destaques: true, catalogo: true, passos: true, sobre: true, galeria: true, agenda: true, depoimentos: true, faq: true, contato: true },
    rotulos: { destaques: 'Diferenciais', catalogo: 'Cardápio', passos: 'Como pedir', sobre: 'Sobre', galeria: 'Ambiente', agenda: 'Reservas', depoimentos: 'Depoimentos', faq: 'Dúvidas', contato: 'Contato' },
    pedido: true, filtros: true,
    msgGeral: 'Vi o site e gostaria de fazer um pedido.',
    textos: {
      hero: {
        selo: 'Cozinha caseira · almoço e jantar',
        titulo: 'Comida feita na hora, com gosto de casa.',
        sub: 'Pratos do dia, massas e sobremesas da casa. Peça pelo WhatsApp, retire no balcão ou venha comer com a gente.',
        cta1: 'Pedir no WhatsApp', cta2: 'Ver cardápio',
        chips: ['Feito na hora', 'Entrega no bairro', 'Reserva para grupos'],
        cartaoTitulo: 'Prato do dia', cartaoTexto: 'Muda todo dia. Pergunte no WhatsApp.',
        adesivo: 'Feito na hora!'
      },
      destaques: [
        { icone: 'talher', titulo: 'Receitas da casa', texto: 'Tempero caseiro, preparado sem pressa e sem atalho.' },
        { icone: 'entrega', titulo: 'Entrega e retirada', texto: 'Peça pelo WhatsApp e escolha como quer receber.' },
        { icone: 'grupo', titulo: 'Mesa para grupos', texto: 'Aniversários e encontros com reserva antecipada.' },
        { icone: 'folha', titulo: 'Ingredientes frescos', texto: 'Compras da semana, escolhidas para cada receita.' }
      ],
      catalogo: {
        eyebrow: 'Cardápio', titulo: 'Escolha, adicione e mande o pedido.',
        sub: 'Monte o pedido aqui e ele chega pronto no WhatsApp. Pratos e preços abaixo são de exemplo.',
        botao: 'Adicionar'
      },
      itens: [
        { nome: 'Bife acebolado com salada', desc: 'Arroz, feijão, salada da casa e ovo.', cat: 'Pratos', preco: 'R$ —' },
        { nome: 'Peixe grelhado', desc: 'Com arroz, salada verde e limão.', cat: 'Pratos', preco: 'R$ —' },
        { nome: 'Hambúrguer da casa', desc: 'Pão macio, queijo, salada e batata frita.', cat: 'Massas e lanches', preco: 'R$ —' },
        { nome: 'Talharim ao pesto', desc: 'Massa fresca com manjericão e parmesão.', cat: 'Massas e lanches', preco: 'R$ —' },
        { nome: 'Brownie com sorvete', desc: 'Servido quente, com calda de chocolate.', cat: 'Sobremesas', preco: 'R$ —' },
        { nome: 'Crepe de morango', desc: 'Com chantilly e morangos frescos.', cat: 'Sobremesas', preco: 'R$ —' }
      ],
      passos: {
        eyebrow: 'Como pedir', titulo: 'Do cardápio à sua mesa em três passos.',
        lista: [
          { titulo: 'Escolha no cardápio', texto: 'Adicione os pratos à sacola, com quantas porções quiser.' },
          { titulo: 'Envie pelo WhatsApp', texto: 'O pedido chega pronto para a gente, sem precisar digitar nada.' },
          { titulo: 'Receba ou retire', texto: 'Combine a entrega no bairro ou passe aqui para buscar.' }
        ]
      },
      sobre: {
        eyebrow: 'Nossa história', titulo: 'Uma cozinha de bairro, do jeito que a gente gosta de comer.',
        texto: 'Começamos servindo almoço para os vizinhos e fomos crescendo no boca a boca. Até hoje, cada prato sai da cozinha como sairia da nossa casa.',
        texto2: 'Aqui entra a história do restaurante: quem cozinha, de onde vêm as receitas e o que torna o lugar especial.',
        pontos: ['Cozinha à vista dos clientes', 'Opção vegetariana todos os dias', 'Ambiente para família e crianças']
      },
      galeria: { eyebrow: 'Ambiente', titulo: 'Um pouco do nosso dia a dia.' },
      agenda: {
        eyebrow: 'Reservas', titulo: 'Reserve sua mesa.',
        sub: 'Escolha o dia, o horário e quantas pessoas. A confirmação chega pelo WhatsApp.',
        botao: 'Enviar reserva pelo WhatsApp',
        obs: 'Aniversário, cadeirinha para criança…',
        vantagens: ['Confirmação pelo WhatsApp', 'Mesas para grupos sob consulta', 'Avise se for comemoração']
      },
      depoimentos: {
        eyebrow: 'Quem já veio', titulo: 'O que dizem por aqui.',
        lista: [
          { texto: 'A comida tem aquele gosto de almoço de domingo. Virou nosso lugar de sempre.', autor: 'Nome do cliente' },
          { texto: 'Pedi pelo WhatsApp e chegou quentinho e bem embalado.', autor: 'Nome do cliente' },
          { texto: 'Atendimento atencioso e uma sobremesa que vale a visita.', autor: 'Nome do cliente' }
        ]
      },
      faq: {
        eyebrow: 'Dúvidas', titulo: 'Perguntas frequentes.',
        lista: [
          { p: 'Vocês fazem entrega?', r: 'Sim, entregamos no bairro e arredores. Mande seu endereço pelo WhatsApp para confirmar.' },
          { p: 'Precisa reservar mesa?', r: 'Para grupos e fins de semana, recomendamos reservar pelo site ou pelo WhatsApp.' },
          { p: 'Tem opção vegetariana?', r: 'Sim, todos os dias há pelo menos um prato vegetariano no cardápio.' },
          { p: 'Quais as formas de pagamento?', r: 'Pix, cartões de débito e crédito e dinheiro.' }
        ]
      },
      contato: {
        eyebrow: 'Visite a gente', titulo: 'Estamos te esperando.',
        endereco: 'Rua do Exemplo, 123 · Centro', cidade: 'Sua cidade · UF',
        telefone: '(00) 00000-0000',
        horario: [['Terça a sexta', '11h às 15h · 18h às 23h'], ['Sábado e domingo', '11h às 23h'], ['Segunda', 'Fechado']]
      },
      rodape: { frase: 'Cozinha caseira, feita na hora.' }
    },
    agenda: { campos: ['pessoas', 'dia', 'horario', 'nome', 'obs'], horarios: ['12:00', '13:00', '19:00', '20:00', '21:00'], acao: 'reservar uma mesa' }
  },

  clinica: {
    rotulo: 'Clínica', icone: 'coracao',
    nomePadrao: 'Clínica Ipê', segmento: 'Saúde integrada',
    sugestao: { cor1: '#1f6f78', cor2: '#9ad8c8', fonte: 'moderna', estilo: 'minimalista', tema: 'claro' },
    secoesPadrao: { destaques: true, catalogo: true, passos: true, sobre: true, galeria: true, agenda: true, depoimentos: true, faq: true, contato: true },
    rotulos: { destaques: 'Diferenciais', catalogo: 'Especialidades', passos: 'Como funciona', sobre: 'A clínica', galeria: 'Estrutura', agenda: 'Agendar', depoimentos: 'Depoimentos', faq: 'Dúvidas', contato: 'Contato' },
    pedido: false, filtros: false,
    msgGeral: 'Vi o site e gostaria de agendar uma consulta.',
    textos: {
      hero: {
        selo: 'Clínica de saúde integrada',
        titulo: 'Cuidado de perto, do primeiro atendimento ao acompanhamento.',
        sub: 'Clínica geral, odontologia, fisioterapia, nutrição e psicologia no mesmo lugar. Agende pelo site e confirme pelo WhatsApp.',
        cta1: 'Agendar pelo WhatsApp', cta2: 'Ver especialidades',
        chips: ['Atendimento com hora marcada', 'Várias especialidades', 'Acessível para cadeirantes'],
        cartaoTitulo: 'Agenda da semana', cartaoTexto: 'Veja os horários livres',
        adesivo: 'Agende online'
      },
      destaques: [
        { icone: 'coracao', titulo: 'Atendimento humano', texto: 'Tempo para ouvir e explicar cada etapa do cuidado.' },
        { icone: 'calendario', titulo: 'Hora marcada', texto: 'Agendamento simples, com lembrete pelo WhatsApp.' },
        { icone: 'escudo', titulo: 'Ambiente seguro', texto: 'Protocolos de higiene e equipamentos revisados.' },
        { icone: 'grupo', titulo: 'Para toda a família', texto: 'Atendimento de crianças a idosos.' }
      ],
      catalogo: {
        eyebrow: 'Especialidades', titulo: 'Tudo o que você precisa em um só endereço.',
        sub: 'Escolha a especialidade e agende o melhor horário para você.',
        botao: 'Agendar'
      },
      itens: [
        { nome: 'Clínica geral', desc: 'Consultas, check-ups e encaminhamentos.', cat: 'Consultas', preco: 'R$ —' },
        { nome: 'Odontologia', desc: 'Limpeza, restaurações e avaliação completa.', cat: 'Consultas', preco: 'R$ —' },
        { nome: 'Fisioterapia', desc: 'Reabilitação, postura e alívio de dores.', cat: 'Terapias', preco: 'R$ —' },
        { nome: 'Nutrição', desc: 'Plano alimentar feito para a sua rotina.', cat: 'Terapias', preco: 'R$ —' },
        { nome: 'Psicologia', desc: 'Atendimento individual, presencial ou online.', cat: 'Terapias', preco: 'R$ —' },
        { nome: 'Check-up preventivo', desc: 'Exames de rotina e orientação para a saúde em dia.', cat: 'Consultas', preco: 'R$ —' }
      ],
      passos: {
        eyebrow: 'Como funciona', titulo: 'Seu atendimento em três passos.',
        lista: [
          { titulo: 'Escolha a especialidade', texto: 'Veja o que cada área oferece e escolha a sua.' },
          { titulo: 'Agende o horário', texto: 'Mande o pedido pelo site. A confirmação chega no WhatsApp.' },
          { titulo: 'Seja atendido', texto: 'Chegue alguns minutos antes. A equipe já estará esperando você.' }
        ]
      },
      sobre: {
        eyebrow: 'A clínica', titulo: 'Um espaço pensado para você se sentir à vontade.',
        texto: 'Reunimos profissionais de diferentes áreas para acompanhar cada paciente de forma completa, conversando entre si sobre o melhor cuidado.',
        texto2: 'Aqui entra a apresentação da clínica: equipe, formação, registro nos conselhos e o jeito de atender.',
        pontos: ['Profissionais com registro no conselho', 'Prontuário organizado e sigiloso', 'Recepção acolhedora e acessível']
      },
      galeria: { eyebrow: 'Estrutura', titulo: 'Conheça nosso espaço.' },
      agenda: {
        eyebrow: 'Agendamento', titulo: 'Agende sua consulta.',
        sub: 'Escolha a especialidade, o dia e o horário. Confirmamos pelo WhatsApp.',
        botao: 'Pedir agendamento',
        obs: 'Convênio, primeira consulta, retorno…',
        vantagens: ['Confirmação pelo WhatsApp', 'Lembrete um dia antes', 'Remarcação sem complicação']
      },
      depoimentos: {
        eyebrow: 'Pacientes', titulo: 'Quem é atendido aqui.',
        lista: [
          { texto: 'Fui muito bem recebida e saí com todas as dúvidas respondidas.', autor: 'Nome do paciente' },
          { texto: 'Agendar pelo site foi rápido, e o lembrete no WhatsApp ajudou muito.', autor: 'Nome do paciente' },
          { texto: 'Levo a família inteira. Todos os profissionais são atenciosos.', autor: 'Nome do paciente' }
        ]
      },
      faq: {
        eyebrow: 'Dúvidas', titulo: 'Perguntas frequentes.',
        lista: [
          { p: 'Vocês atendem convênio?', r: 'Atendemos particular e alguns convênios. Consulte a lista pelo WhatsApp.' },
          { p: 'Como remarcar uma consulta?', r: 'Pelo WhatsApp, com pelo menos um dia de antecedência.' },
          { p: 'Preciso levar algum documento?', r: 'Documento com foto e, se tiver, exames anteriores e a carteirinha do convênio.' },
          { p: 'A clínica tem acessibilidade?', r: 'Sim, com rampa de acesso e banheiro adaptado.' }
        ]
      },
      contato: {
        eyebrow: 'Onde estamos', titulo: 'Venha nos visitar.',
        endereco: 'Rua do Exemplo, 123 · Sala 4', cidade: 'Sua cidade · UF',
        telefone: '(00) 00000-0000',
        horario: [['Segunda a sexta', '8h às 19h'], ['Sábado', '8h às 12h'], ['Domingo', 'Fechado']]
      },
      rodape: { frase: 'Saúde integrada, com hora marcada.' }
    },
    agenda: { campos: ['servico', 'dia', 'horario', 'nome', 'obs'], horarios: ['08:00', '09:30', '11:00', '14:00', '15:30', '17:00'], acao: 'agendar uma consulta', rotuloServico: 'Especialidade' }
  },

  loja: {
    rotulo: 'Loja', icone: 'cabide',
    nomePadrao: 'Linha & Trama', segmento: 'Moda e acessórios',
    sugestao: { cor1: '#2b2522', cor2: '#c9a46a', fonte: 'elegante', estilo: 'reto', tema: 'claro' },
    secoesPadrao: { destaques: true, catalogo: true, passos: true, sobre: true, galeria: true, agenda: false, depoimentos: true, faq: true, contato: true },
    rotulos: { destaques: 'Diferenciais', catalogo: 'Produtos', passos: 'Como comprar', sobre: 'A loja', galeria: 'Na loja', agenda: 'Atendimento', depoimentos: 'Depoimentos', faq: 'Dúvidas', contato: 'Contato' },
    pedido: true, filtros: true,
    msgGeral: 'Vi o site e gostaria de saber mais sobre os produtos.',
    textos: {
      hero: {
        selo: 'Nova coleção na loja',
        titulo: 'Peças escolhidas a dedo, para usar todo dia.',
        sub: 'Roupas, bolsas e presentes com curadoria da casa. Veja as novidades, separe o que gostou e finalize pelo WhatsApp.',
        cta1: 'Comprar pelo WhatsApp', cta2: 'Ver produtos',
        chips: ['Troca facilitada', 'Envio para a região', 'Embalagem para presente'],
        cartaoTitulo: 'Novidades toda semana', cartaoTexto: 'Siga a loja para ver primeiro',
        adesivo: 'Novidades'
      },
      destaques: [
        { icone: 'cabide', titulo: 'Curadoria da casa', texto: 'Peças selecionadas pensando em conforto e estilo.' },
        { icone: 'troca', titulo: 'Troca facilitada', texto: 'Não serviu? A gente resolve com você.' },
        { icone: 'entrega', titulo: 'Envio para a região', texto: 'Combine a entrega ou retire na loja.' },
        { icone: 'presente', titulo: 'Embala para presente', texto: 'Com cartão escrito à mão, se quiser.' }
      ],
      catalogo: {
        eyebrow: 'Produtos', titulo: 'Destaques da loja.',
        sub: 'Separe as peças na sacola e envie o pedido pelo WhatsApp. Itens e preços são de exemplo.',
        botao: 'Adicionar'
      },
      itens: [
        { nome: 'Cardigã de tricô', desc: 'Macio, com botões, em tons neutros.', cat: 'Roupas', preco: 'R$ —' },
        { nome: 'Bolsa de couro', desc: 'Estruturada, com alça de mão e transversal.', cat: 'Bolsas', preco: 'R$ —' },
        { nome: 'Blusa listrada', desc: 'Algodão leve, corte reto.', cat: 'Roupas', preco: 'R$ —' },
        { nome: 'Bolsa carteiro', desc: 'Espaçosa, com fecho de fivela.', cat: 'Bolsas', preco: 'R$ —' },
        { nome: 'Camisetas básicas', desc: 'Várias cores, do P ao GG.', cat: 'Roupas', preco: 'R$ —' },
        { nome: 'Embalagem para presente', desc: 'Papel kraft, laço e cartão.', cat: 'Presentes', preco: 'R$ —' }
      ],
      passos: {
        eyebrow: 'Como comprar', titulo: 'Comprar é simples assim.',
        lista: [
          { titulo: 'Separe as peças', texto: 'Adicione à sacola o que gostou, no tamanho e na cor que quiser.' },
          { titulo: 'Envie pelo WhatsApp', texto: 'O pedido chega pronto. A gente confirma tamanho e disponibilidade.' },
          { titulo: 'Receba ou retire', texto: 'Entrega na região ou retirada na loja, como preferir.' }
        ]
      },
      sobre: {
        eyebrow: 'A loja', titulo: 'Uma loja de bairro com olhar de ateliê.',
        texto: 'Cada peça passa pelas nossas mãos antes de chegar à arara. Gostamos de conhecer quem compra e de ajudar a montar o look.',
        texto2: 'Aqui entra a história da loja, quem está por trás dela e o estilo das peças.',
        pontos: ['Atendimento personalizado', 'Provador com hora marcada', 'Peças de marcas locais']
      },
      galeria: { eyebrow: 'Na loja', titulo: 'Passe aqui para conhecer.' },
      agenda: {
        eyebrow: 'Atendimento', titulo: 'Agende um horário na loja.',
        sub: 'Separamos as peças no seu tamanho antes de você chegar.',
        botao: 'Agendar pelo WhatsApp',
        obs: 'Tamanho, ocasião, peças que viu no site…',
        vantagens: ['Peças separadas antes da visita', 'Provador reservado', 'Confirmação pelo WhatsApp']
      },
      depoimentos: {
        eyebrow: 'Clientes', titulo: 'Quem já comprou aqui.',
        lista: [
          { texto: 'Atendimento incrível. Me ajudaram a montar o look para o casamento.', autor: 'Nome do cliente' },
          { texto: 'Comprei pelo WhatsApp e recebi em casa, tudo bem embalado.', autor: 'Nome do cliente' },
          { texto: 'As peças têm um caimento ótimo e a troca foi tranquila.', autor: 'Nome do cliente' }
        ]
      },
      faq: {
        eyebrow: 'Dúvidas', titulo: 'Perguntas frequentes.',
        lista: [
          { p: 'Como funciona a troca?', r: 'Combine a troca pelo WhatsApp ou direto na loja, com a etiqueta na peça.' },
          { p: 'Vocês entregam?', r: 'Sim, entregamos na região. Consulte o seu endereço pelo WhatsApp.' },
          { p: 'Tem provador?', r: 'Sim! Agende um horário e separamos as peças no seu tamanho.' },
          { p: 'Quais as formas de pagamento?', r: 'Pix, cartões de débito e crédito e dinheiro.' }
        ]
      },
      contato: {
        eyebrow: 'Visite a loja', titulo: 'Passe para tomar um café.',
        endereco: 'Rua do Exemplo, 123 · Loja 2', cidade: 'Sua cidade · UF',
        telefone: '(00) 00000-0000',
        horario: [['Segunda a sexta', '10h às 19h'], ['Sábado', '10h às 16h'], ['Domingo', 'Fechado']]
      },
      rodape: { frase: 'Moda e acessórios com curadoria.' }
    },
    agenda: { campos: ['dia', 'horario', 'nome', 'obs'], horarios: ['10:00', '11:30', '14:00', '16:00', '18:00'], acao: 'agendar um horário de atendimento na loja' }
  },

  salao: {
    rotulo: 'Salão', icone: 'tesoura',
    nomePadrao: 'Studio Lume', segmento: 'Beleza e bem-estar',
    sugestao: { cor1: '#8e3b5a', cor2: '#f2c1b0', fonte: 'elegante', estilo: 'arredondado', tema: 'claro' },
    secoesPadrao: { destaques: true, catalogo: true, passos: true, sobre: true, galeria: true, agenda: true, depoimentos: true, faq: true, contato: true },
    rotulos: { destaques: 'Diferenciais', catalogo: 'Serviços', passos: 'Como agendar', sobre: 'O salão', galeria: 'Espaço', agenda: 'Agendar', depoimentos: 'Depoimentos', faq: 'Dúvidas', contato: 'Contato' },
    pedido: false, filtros: true,
    msgGeral: 'Vi o site e gostaria de agendar um horário.',
    textos: {
      hero: {
        selo: 'Cabelo, unhas e estética',
        titulo: 'Seu momento de cuidado, com hora marcada.',
        sub: 'Corte, unhas, sobrancelhas, maquiagem e limpeza de pele num espaço tranquilo. Escolha o serviço e agende em poucos toques.',
        cta1: 'Agendar pelo WhatsApp', cta2: 'Ver serviços',
        chips: ['Hora marcada', 'Produtos profissionais', 'Ambiente climatizado'],
        cartaoTitulo: 'Horários livres hoje', cartaoTexto: 'Consulte pelo WhatsApp',
        adesivo: 'Agende já'
      },
      destaques: [
        { icone: 'tesoura', titulo: 'Equipe atualizada', texto: 'Profissionais que escutam o que você quer.' },
        { icone: 'brilho', titulo: 'Produtos de qualidade', texto: 'Marcas profissionais em todos os procedimentos.' },
        { icone: 'calendario', titulo: 'Hora marcada', texto: 'Você chega e é atendida no seu horário.' },
        { icone: 'cafe', titulo: 'Ambiente acolhedor', texto: 'Café, música boa e um tempo só seu.' }
      ],
      catalogo: {
        eyebrow: 'Serviços', titulo: 'Escolha o seu cuidado.',
        sub: 'Veja os serviços e agende direto pelo site.',
        botao: 'Agendar'
      },
      itens: [
        { nome: 'Corte e finalização', desc: 'Corte personalizado, lavagem e escova.', cat: 'Cabelo', preco: 'R$ —' },
        { nome: 'Manicure e pedicure', desc: 'Cutilagem e esmaltação comum ou em gel.', cat: 'Unhas', preco: 'R$ —' },
        { nome: 'Maquiagem', desc: 'Para festas, eventos e ensaios.', cat: 'Rosto', preco: 'R$ —' },
        { nome: 'Design de sobrancelhas', desc: 'Desenho com linha ou pinça, de acordo com o rosto.', cat: 'Rosto', preco: 'R$ —' },
        { nome: 'Limpeza de pele', desc: 'Higienização profunda e hidratação.', cat: 'Rosto', preco: 'R$ —' },
        { nome: 'Corte masculino e barba', desc: 'Máquina, tesoura e barba na navalha.', cat: 'Cabelo', preco: 'R$ —' }
      ],
      passos: {
        eyebrow: 'Como agendar', titulo: 'Agende sem ligar e sem esperar.',
        lista: [
          { titulo: 'Escolha o serviço', texto: 'Veja o que o salão oferece e escolha o seu cuidado.' },
          { titulo: 'Escolha dia e horário', texto: 'Escolha o horário que encaixa na sua rotina.' },
          { titulo: 'Confirme pelo WhatsApp', texto: 'A gente confirma e manda um lembrete antes.' }
        ]
      },
      sobre: {
        eyebrow: 'O salão', titulo: 'Um espaço feito para você desacelerar.',
        texto: 'Criamos o salão para ser um lugar tranquilo, onde cada atendimento começa com uma boa conversa sobre o que você quer.',
        texto2: 'Aqui entra a história do salão, a equipe e a especialidade de cada profissional.',
        pontos: ['Materiais esterilizados', 'Atendimento com hora marcada', 'Espaço climatizado']
      },
      galeria: { eyebrow: 'Nosso espaço', titulo: 'Venha conhecer o salão.' },
      agenda: {
        eyebrow: 'Agendamento', titulo: 'Agende seu horário.',
        sub: 'Escolha o serviço, o dia e o horário. Confirmamos pelo WhatsApp.',
        botao: 'Agendar pelo WhatsApp',
        obs: 'Profissional de preferência, referência de corte…',
        vantagens: ['Confirmação pelo WhatsApp', 'Lembrete antes do horário', 'Remarcação simples']
      },
      depoimentos: {
        eyebrow: 'Clientes', titulo: 'Quem já passou por aqui.',
        lista: [
          { texto: 'Saí do salão me sentindo outra pessoa. Atendimento impecável.', autor: 'Nome da cliente' },
          { texto: 'Amo poder agendar pelo celular sem precisar ligar.', autor: 'Nome da cliente' },
          { texto: 'Ambiente lindo e uma equipe muito cuidadosa.', autor: 'Nome da cliente' }
        ]
      },
      faq: {
        eyebrow: 'Dúvidas', titulo: 'Perguntas frequentes.',
        lista: [
          { p: 'Preciso agendar?', r: 'Recomendamos agendar para garantir o horário, mas fazemos encaixes quando possível.' },
          { p: 'Atendem noivas e festas?', r: 'Sim! Fale com a gente pelo WhatsApp para combinar tudo.' },
          { p: 'Como remarcar?', r: 'Pelo WhatsApp, com antecedência, para liberar o horário.' },
          { p: 'Quais as formas de pagamento?', r: 'Pix, cartões de débito e crédito e dinheiro.' }
        ]
      },
      contato: {
        eyebrow: 'Onde estamos', titulo: 'Venha nos visitar.',
        endereco: 'Rua do Exemplo, 123 · 1º andar', cidade: 'Sua cidade · UF',
        telefone: '(00) 00000-0000',
        horario: [['Terça a sexta', '9h às 19h'], ['Sábado', '8h às 17h'], ['Domingo e segunda', 'Fechado']]
      },
      rodape: { frase: 'Beleza e bem-estar com hora marcada.' }
    },
    agenda: { campos: ['servico', 'dia', 'horario', 'nome', 'obs'], horarios: ['09:00', '10:30', '13:00', '14:30', '16:00', '17:30'], acao: 'agendar um horário', rotuloServico: 'Serviço' }
  },

  servicos: {
    rotulo: 'Serviços', icone: 'ferramenta',
    nomePadrao: 'Casa em Ordem', segmento: 'Reparos e manutenção',
    sugestao: { cor1: '#1d4ed8', cor2: '#fbbf24', fonte: 'marcante', estilo: 'vibrante', tema: 'claro' },
    secoesPadrao: { destaques: true, catalogo: true, passos: true, sobre: true, galeria: true, agenda: true, depoimentos: true, faq: true, contato: true },
    rotulos: { destaques: 'Diferenciais', catalogo: 'Serviços', passos: 'Como funciona', sobre: 'Quem somos', galeria: 'Trabalho', agenda: 'Orçamento', depoimentos: 'Depoimentos', faq: 'Dúvidas', contato: 'Contato' },
    pedido: false, filtros: false,
    msgGeral: 'Vi o site e gostaria de pedir um orçamento.',
    textos: {
      hero: {
        selo: 'Reparos e manutenção residencial',
        titulo: 'O conserto que você vem adiando, resolvido sem dor de cabeça.',
        sub: 'Elétrica, hidráulica, pintura, ar-condicionado e montagem de móveis. Conte o que precisa e receba o orçamento pelo WhatsApp.',
        cta1: 'Pedir orçamento', cta2: 'Ver serviços',
        chips: ['Orçamento sem compromisso', 'Atendimento na sua casa', 'Equipe identificada'],
        cartaoTitulo: 'Orçamento pelo WhatsApp', cartaoTexto: 'Mande uma foto do problema',
        adesivo: 'Sem compromisso'
      },
      destaques: [
        { icone: 'ferramenta', titulo: 'Gente qualificada', texto: 'Cada serviço feito por quem entende do assunto.' },
        { icone: 'relogio', titulo: 'Pontualidade', texto: 'Chegamos no horário combinado com você.' },
        { icone: 'casa', titulo: 'Limpeza ao terminar', texto: 'Deixamos o ambiente como encontramos.' },
        { icone: 'doc', titulo: 'Orçamento claro', texto: 'Você sabe o que vai ser feito antes de começar.' }
      ],
      catalogo: {
        eyebrow: 'Serviços', titulo: 'Do chuveiro queimado à parede nova.',
        sub: 'Escolha o serviço e peça um orçamento pelo WhatsApp.',
        botao: 'Pedir orçamento'
      },
      itens: [
        { nome: 'Elétrica', desc: 'Tomadas, disjuntores, chuveiro e iluminação.', cat: 'Casa', preco: 'R$ —' },
        { nome: 'Hidráulica', desc: 'Vazamentos, torneiras, descargas e desentupimento.', cat: 'Casa', preco: 'R$ —' },
        { nome: 'Pintura', desc: 'Paredes, tetos, portas e pequenos reparos.', cat: 'Casa', preco: 'R$ —' },
        { nome: 'Ar-condicionado', desc: 'Instalação, limpeza e manutenção.', cat: 'Casa', preco: 'R$ —' },
        { nome: 'Marcenaria e reparos', desc: 'Portas, armários e ajustes em madeira.', cat: 'Casa', preco: 'R$ —' },
        { nome: 'Montagem de móveis', desc: 'Montagem, desmontagem e instalação de suportes.', cat: 'Casa', preco: 'R$ —' }
      ],
      passos: {
        eyebrow: 'Como funciona', titulo: 'Orçamento rápido, serviço bem feito.',
        lista: [
          { titulo: 'Conte o que precisa', texto: 'Mande uma mensagem, se puder com fotos do problema.' },
          { titulo: 'Receba o orçamento', texto: 'Explicamos o que será feito e combinamos o dia.' },
          { titulo: 'Serviço resolvido', texto: 'Executamos, testamos e deixamos tudo limpo.' }
        ]
      },
      sobre: {
        eyebrow: 'Quem somos', titulo: 'Gente de confiança para cuidar da sua casa.',
        texto: 'Somos uma equipe pequena que gosta de trabalho bem feito. Explicamos cada etapa e só começamos com o seu ok.',
        texto2: 'Aqui entra a apresentação do prestador: experiência, região atendida e certificações.',
        pontos: ['Atendimento em casas e comércios', 'Material de qualidade', 'Orçamento detalhado antes de começar']
      },
      galeria: { eyebrow: 'Nosso trabalho', titulo: 'Ferramenta certa e capricho.' },
      agenda: {
        eyebrow: 'Orçamento', titulo: 'Peça seu orçamento.',
        sub: 'Conte o que precisa e escolha o melhor período para a visita.',
        botao: 'Enviar pedido de orçamento',
        obs: 'Descreva o problema. Se puder, mande fotos depois pelo WhatsApp.',
        vantagens: ['Orçamento sem compromisso', 'Visita no período que você escolher', 'Fotos ajudam a agilizar']
      },
      depoimentos: {
        eyebrow: 'Clientes', titulo: 'Quem já chamou a gente.',
        lista: [
          { texto: 'Resolveram um vazamento que ninguém achava. Trabalho limpo e caprichado.', autor: 'Nome do cliente' },
          { texto: 'Chegaram no horário e explicaram tudo antes de começar.', autor: 'Nome do cliente' },
          { texto: 'Montaram todos os móveis da mudança sem deixar bagunça.', autor: 'Nome do cliente' }
        ]
      },
      faq: {
        eyebrow: 'Dúvidas', titulo: 'Perguntas frequentes.',
        lista: [
          { p: 'Como funciona o orçamento?', r: 'Em muitos casos dá para orçar por fotos. Quando não dá, combinamos uma visita.' },
          { p: 'Atendem em quais bairros?', r: 'Atendemos a cidade e a região. Pergunte pelo seu bairro no WhatsApp.' },
          { p: 'Vocês levam o material?', r: 'Podemos levar o material ou usar o que você já comprou.' },
          { p: 'Quais as formas de pagamento?', r: 'Pix, cartões de débito e crédito e dinheiro.' }
        ]
      },
      contato: {
        eyebrow: 'Fale com a gente', titulo: 'Conte o que precisa.',
        endereco: 'Rua do Exemplo, 123 · Oficina', cidade: 'Sua cidade · UF',
        telefone: '(00) 00000-0000',
        horario: [['Segunda a sexta', '8h às 18h'], ['Sábado', '8h às 13h'], ['Urgências', 'Consulte pelo WhatsApp']]
      },
      rodape: { frase: 'Reparos e manutenção com capricho.' }
    },
    agenda: { campos: ['servico', 'dia', 'periodo', 'nome', 'bairro', 'obs'], horarios: [], acao: 'pedir um orçamento', rotuloServico: 'Serviço' }
  }
};
