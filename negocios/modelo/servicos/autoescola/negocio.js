/* Demonstração · Autoescola e cursos */
window.NEGOCIO = {
  "id": "autoescola",
  "ramo": "Autoescola e cursos",
  "fluxo": "orcamento",
  "rotuloEquipe": "Instrutores credenciados",
  "rotuloGaleria": "Frota e estrutura",
  "obsPlaceholder": "Ex.: quero tirar categoria AB parcelado, tenho disponibilidade à noite…",
  "visual": {
    "nome": "Direção Certa",
    "segmento": "Autoescola credenciada e habilitação",
    "sigla": "DC",
    "cena": "volante",
    "atendimentoModo": "local",
    "cores": {
      "p": "#e08b16",
      "d": "#38bdf8",
      "escuro": "#111b2b",
      "fundo": "#fbfaf7"
    },
    "fontes": {
      "t": "'Poppins', system-ui, sans-serif",
      "c": "'Nunito', system-ui, sans-serif"
    }
  },
  "textos": {
    "selo": "CREDENCIADA DETRAN · ALTO ÍNDICE DE APROVAÇÃO",
    "titulo": "Sua CNH na mão com aulas calmas e carros novos.",
    "sub": "Primeira habilitação A, B ou AB, adição de categoria e aulas para habilitados. Simule sua matrícula pelo WhatsApp.",
    "botao": "Ver categorias e pacotes"
  },
  "camposSolicitacao": [
    {
      "id": "catCnh",
      "rotulo": "Categoria de interesse",
      "tipo": "select",
      "obrig": true,
      "opcoes": [
        "1ª Habilitação Carro (B)",
        "1ª Habilitação Moto (A)",
        "1ª Habilitação Carro + Moto (AB)",
        "Adição de categoria",
        "Aulas para habilitados (medo de dirigir)",
        "Reciclagem"
      ]
    },
    {
      "id": "turno",
      "rotulo": "Melhor turno para aulas",
      "tipo": "select",
      "obrig": false,
      "opcoes": [
        "Manhã",
        "Tarde",
        "Noite",
        "Sábados"
      ]
    }
  ],
  "dados": {
    "negocio": {
      "whats": "(21) 99999-0009",
      "endereco": "Av. Amaral Peixoto, 310 · Centro",
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
        "Pix com desconto",
        "Cartão em até 12x",
        "Boleto parcelado"
      ],
      "avisoFechada": "Atendimento fechado hoje. Deixe sua simulação!"
    },
    "diferenciais": [
      {
        "icone": "sv-volante",
        "titulo": "Frota nova com ar e direção",
        "texto": "Carros e motos revisados para você aprender com conforto e segurança."
      },
      {
        "icone": "sv-capelo",
        "titulo": "Instrutores pacientes",
        "texto": "Didática calma, ideal também para quem tem medo de dirigir."
      },
      {
        "icone": "sv-escudo",
        "titulo": "Parcelamento facilitado",
        "texto": "Condições claras sem taxas escondidas, no cartão ou Pix."
      }
    ],
    "categorias": [
      {
        "id": "cnh",
        "nome": "Primeira Habilitação",
        "icone": "sv-volante"
      },
      {
        "id": "extras",
        "nome": "Habilitados e cursos",
        "icone": "sv-capelo"
      }
    ],
    "servicos": [
      {
        "id": "cat-b",
        "cat": "cnh",
        "nome": "1ª Habilitação Carro (Categoria B)",
        "desc": "Curso teórico online/presencial + 20 aulas práticas + acompanhamento de prova.",
        "preco": 1690,
        "precoTipo": "apartir",
        "duracao": 0,
        "foto": "fotos/carro.jpg",
        "destaque": true
      },
      {
        "id": "cat-a",
        "cat": "cnh",
        "nome": "1ª Habilitação Moto (Categoria A)",
        "desc": "Pista própria de treinamento, motos leves e acompanhamento completo.",
        "preco": 1390,
        "precoTipo": "apartir",
        "duracao": 0,
        "foto": "fotos/moto.jpg",
        "destaque": true
      },
      {
        "id": "cat-ab",
        "cat": "cnh",
        "nome": "Combo Carro + Moto (Categoria AB)",
        "desc": "A opção com maior economia para já sair habilitado nas duas categorias.",
        "preco": 2490,
        "precoTipo": "apartir",
        "duracao": 0,
        "foto": "fotos/carro.jpg",
        "destaque": true
      },
      {
        "id": "habilitados",
        "cat": "extras",
        "nome": "Pacote Aulas para Habilitados (5 aulas)",
        "desc": "Perca o medo de dirigir no trânsito real, baliza e ladeira com instrutor calmo.",
        "preco": 450,
        "precoTipo": "fixo",
        "duracao": 50,
        "foto": "fotos/carro.jpg"
      }
    ],
    "profissionais": [
      {
        "nome": "Marcos Vinícius",
        "cargo": "Instrutor Prático B",
        "registro": "Credenciado Detran",
        "bio": "Especialista em baliza e aulas para quem tem insegurança no trânsito."
      },
      {
        "nome": "Renata Oliveira",
        "cargo": "Instrutora Teórica e Prática A",
        "registro": "Credenciada Detran",
        "bio": "Didática leve para aprovação já na primeira tentativa."
      }
    ],
    "galeria": [
      {
        "foto": "fotos/carro.jpg",
        "legenda": "Aulas práticas em carros novos e confortáveis"
      },
      {
        "foto": "fotos/moto.jpg",
        "legenda": "Pista dedicada para treinamento Categoria A"
      }
    ],
    "depoimentos": [
      {
        "autor": "Gabriel M.",
        "detalhe": "Aprovado de 1ª",
        "texto": "Passei de primeira em carro e moto! Instrutores super calmos."
      },
      {
        "autor": "Priscila D.",
        "detalhe": "Aulas para habilitados",
        "texto": "Tinha CNH há 6 anos sem dirigir e hoje vou trabalhar de carro tranquila."
      }
    ],
    "faq": [
      {
        "p": "As aulas teóricas podem ser online?",
        "r": "Sim, você pode assistir às aulas teóricas ao vivo pelo celular ou computador."
      },
      {
        "p": "As taxas do Detran estão incluídas?",
        "r": "Detalhamos tudo certinho na simulação no WhatsApp para você saber o valor exato."
      }
    ],
    "cupons": [
      {
        "codigo": "CNH100",
        "tipo": "valor",
        "valor": 100,
        "minimo": 1000,
        "usoUnico": true,
        "ativo": true
      }
    ],
    "equipe": [
      {
        "id": "f1",
        "nome": "Secretaria",
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
    "volante",
    "carro",
    "moto",
    "semaforo",
    "placa",
    "cnh",
    "cone",
    "capacete",
    "estrada",
    "trofeu"
  ],
  "demo": true,
  "senhaDemo": "1234",
  "limiteEquipe": 3
};
