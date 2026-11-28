/* Demonstração · Salão de beleza e estética */
window.NEGOCIO = {
  "id": "salao",
  "ramo": "Salão de beleza e estética",
  "fluxo": "agendamento",
  "rotuloEquipe": "Nossas especialistas",
  "rotuloGaleria": "Resultados e espaço",
  "obsPlaceholder": "Ex.: cabelo comprido, tenho alergia a algum produto…",
  "visual": {
    "nome": "Atelier Lumière",
    "segmento": "Salão de beleza, unhas e estética",
    "sigla": "AL",
    "cena": "secador",
    "atendimentoModo": "local",
    "cores": {
      "p": "#c45b82",
      "d": "#f3b7c8",
      "escuro": "#26141c",
      "fundo": "#fdf8fa"
    },
    "fontes": {
      "t": "'Playfair Display', Georgia, serif",
      "c": "'Source Sans 3', system-ui, sans-serif"
    }
  },
  "textos": {
    "selo": "BELEZA & AUTOCUIDADO",
    "titulo": "Realce sua beleza com calma e sofisticação.",
    "sub": "Cabelos, coloração, unhas e estética facial com especialistas. Agende seu horário pelo WhatsApp.",
    "botao": "Ver serviços"
  },
  "camposSolicitacao": [],
  "dados": {
    "negocio": {
      "whats": "(21) 99999-0002",
      "endereco": "Av. Roberto Silveira, 340 · Icaraí",
      "cidade": "Niterói, RJ",
      "horario": {
        "0": [],
        "1": [
          [
            "09:00",
            "19:00"
          ]
        ],
        "2": [
          [
            "09:00",
            "19:00"
          ]
        ],
        "3": [
          [
            "09:00",
            "19:00"
          ]
        ],
        "4": [
          [
            "09:00",
            "19:00"
          ]
        ],
        "5": [
          [
            "09:00",
            "20:00"
          ]
        ],
        "6": [
          [
            "09:00",
            "18:00"
          ]
        ]
      },
      "intervaloMin": 60,
      "pagamentos": [
        "Pix",
        "Cartão de crédito",
        "Cartão de débito",
        "Dinheiro"
      ],
      "avisoFechada": "Atendimento pausado hoje."
    },
    "diferenciais": [
      {
        "icone": "sv-brilho",
        "titulo": "Produtos de alta linha",
        "texto": "Trabalhamos apenas com marcas profissionais dermatologicamente testadas."
      },
      {
        "icone": "sv-agenda",
        "titulo": "Agendamento prático",
        "texto": "Escolha o procedimento e sua profissional preferida em 1 minuto."
      },
      {
        "icone": "sv-coracao",
        "titulo": "Espaço acolhedor",
        "texto": "Ambiente climatizado, café especial e atendimento sem pressa."
      }
    ],
    "categorias": [
      {
        "id": "cabelos",
        "nome": "Cabelos",
        "icone": "sv-tesoura"
      },
      {
        "id": "estetica",
        "nome": "Estética e sobrancelha",
        "icone": "sv-brilho"
      },
      {
        "id": "unhas",
        "nome": "Unhas",
        "icone": "sv-estrela"
      }
    ],
    "servicos": [
      {
        "id": "escova-hidr",
        "cat": "cabelos",
        "nome": "Escova + Hidratação nutritiva",
        "desc": "Lavagem relaxante, máscara reconstrutora e escova modelada.",
        "preco": 110,
        "precoTipo": "apartir",
        "duracao": 60,
        "foto": "fotos/cabelo.jpg",
        "destaque": true
      },
      {
        "id": "mechas",
        "cat": "cabelos",
        "nome": "Mechas iluminadas + Tonalização",
        "desc": "Avaliação de mecha, iluminação personalizada e tratamento pós-química.",
        "preco": 380,
        "precoTipo": "apartir",
        "duracao": 180,
        "foto": "fotos/cabelo.jpg",
        "destaque": true
      },
      {
        "id": "limpeza-pele",
        "cat": "estetica",
        "nome": "Limpeza de pele profunda",
        "desc": "Higienização, extração suave, máscara calmante e LED terapia.",
        "preco": 150,
        "precoTipo": "fixo",
        "duracao": 75,
        "foto": "fotos/estetica.jpg",
        "destaque": true
      },
      {
        "id": "sobrancelha",
        "cat": "estetica",
        "nome": "Design de sobrancelhas + Henna",
        "desc": "Mapeamento facial para simetria natural e acabamento impecável.",
        "preco": 65,
        "precoTipo": "fixo",
        "duracao": 40,
        "foto": "fotos/estetica.jpg"
      },
      {
        "id": "manicure",
        "cat": "unhas",
        "nome": "Manicure e pedicure completa",
        "desc": "Cutilagem cuidadosa, esmaltação em gel ou tradicional e hidratação.",
        "preco": 85,
        "precoTipo": "fixo",
        "duracao": 70,
        "foto": "fotos/unhas.jpg"
      }
    ],
    "profissionais": [
      {
        "nome": "Camila Duarte",
        "cargo": "Hair Stylist",
        "registro": "Colorimetria",
        "bio": "Especialista em loiros saudáveis e cortes em camadas."
      },
      {
        "nome": "Juliana Moura",
        "cargo": "Esteticista",
        "registro": "Estética facial",
        "bio": "Protocolos personalizados de limpeza de pele e revitalização."
      },
      {
        "nome": "Patrícia Lima",
        "cargo": "Nail Designer",
        "registro": "Alongamento e gel",
        "bio": "Unhas naturais, blindagem e esmaltação duradoura."
      }
    ],
    "galeria": [
      {
        "foto": "fotos/cabelo.jpg",
        "legenda": "Iluminado natural com brilho espelhado"
      },
      {
        "foto": "fotos/estetica.jpg",
        "legenda": "Sala privativa de estética facial"
      },
      {
        "foto": "fotos/unhas.jpg",
        "legenda": "Cuidado completo de mãos e unhas"
      }
    ],
    "depoimentos": [
      {
        "autor": "Beatriz M.",
        "detalhe": "Mechas e corte",
        "texto": "Saí encantada! Meu cabelo ficou super macio e exatamente no tom que pedi."
      },
      {
        "autor": "Renata C.",
        "detalhe": "Limpeza de pele",
        "texto": "Ambiente limpo, cheiroso e atendimento impecável do início ao fim."
      },
      {
        "autor": "Larissa P.",
        "detalhe": "Cliente fiel",
        "texto": "Amo poder agendar pelo site sem precisar ficar esperando resposta."
      }
    ],
    "faq": [
      {
        "p": "Por que alguns serviços dizem \"a partir de\"?",
        "r": "Em cabelos longos ou volumosos, o valor final varia conforme a quantidade de produto — confirmamos antes de começar."
      },
      {
        "p": "Vocês atendem noivas e madrinhas?",
        "r": "Sim! Fazemos pacotes fechados sob medida para dias de festa."
      }
    ],
    "cupons": [
      {
        "codigo": "BEMVINDA10",
        "tipo": "pct",
        "valor": 10,
        "minimo": 80,
        "usoUnico": true,
        "ativo": true
      }
    ],
    "equipe": [
      {
        "id": "f1",
        "nome": "Recepção",
        "pin": "1111",
        "ativo": true,
        "permissoes": {
          "agenda": true,
          "situacao": true
        }
      }
    ]
  },
  "cenas": [
    "secador",
    "tesoura",
    "esmalte",
    "pincel",
    "serum",
    "espelho",
    "flor",
    "escova",
    "diamante",
    "coroa"
  ],
  "demo": true,
  "senhaDemo": "1234",
  "limiteEquipe": 3
};
