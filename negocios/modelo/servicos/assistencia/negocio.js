/* Demonstração · Assistência técnica e manutenção */
window.NEGOCIO = {
  "id": "assistencia",
  "ramo": "Assistência técnica e manutenção",
  "fluxo": "orcamento",
  "rotuloEquipe": "Equipe técnica",
  "rotuloGaleria": "Bancada e serviços",
  "obsPlaceholder": "Ex.: tela trincada mas touch funciona / ar-condicionado não está gelando…",
  "visual": {
    "nome": "ConsertaJá Tech",
    "segmento": "Celulares, notebooks e climatização",
    "sigla": "CJ",
    "cena": "celular",
    "atendimentoModo": "local_domicilio",
    "cores": {
      "p": "#2563eb",
      "d": "#38bdf8",
      "escuro": "#0d1729",
      "fundo": "#f4f8ff"
    },
    "fontes": {
      "t": "'Exo 2', system-ui, sans-serif",
      "c": "'Inter', system-ui, sans-serif"
    }
  },
  "textos": {
    "selo": "ORÇAMENTO RÁPIDO · GARANTIA 90 DIAS",
    "titulo": "Seu aparelho ou ar-condicionado funcionando hoje.",
    "sub": "Reparo expresso de celulares e notebooks no laboratório, ou visita técnica para ar-condicionado na sua casa.",
    "botao": "Ver serviços"
  },
  "camposSolicitacao": [
    {
      "id": "aparelho",
      "rotulo": "Marca e modelo do aparelho",
      "tipo": "text",
      "obrig": true,
      "placeholder": "Ex.: iPhone 14 / Notebook Dell / Split 12.000 BTUs"
    },
    {
      "id": "defeito",
      "rotulo": "Qual o problema?",
      "tipo": "text",
      "obrig": true,
      "placeholder": "Ex.: bateria descarregando, tela quebrada, limpeza de ar"
    }
  ],
  "dados": {
    "negocio": {
      "whats": "(21) 99999-0008",
      "endereco": "Rua da Conceição, 118 · Centro",
      "cidade": "Niterói, RJ",
      "bairros": [
        "Centro",
        "Icaraí",
        "Ingá",
        "Santa Rosa",
        "São Francisco",
        "Fonseca"
      ],
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
        "Cartão de crédito (até 6x)",
        "Cartão de débito",
        "Dinheiro"
      ],
      "avisoFechada": "Atendimento fechado hoje. Deixe seu orçamento!"
    },
    "diferenciais": [
      {
        "icone": "sv-chip",
        "titulo": "Orçamento sem compromisso",
        "texto": "Diagnóstico rápido pelo WhatsApp ou no balcão."
      },
      {
        "icone": "sv-escudo",
        "titulo": "Garantia de 90 dias",
        "texto": "Peças de primeira linha e garantia documentada em todo reparo."
      },
      {
        "icone": "entrega",
        "titulo": "Balcão ou visita técnica",
        "texto": "Atendemos celulares/PCs no laboratório e ar-condicionado a domicílio."
      }
    ],
    "categorias": [
      {
        "id": "cel-pc",
        "nome": "Celulares e notebooks",
        "icone": "sv-chip"
      },
      {
        "id": "clima",
        "nome": "Ar-condicionado",
        "icone": "sv-brilho"
      }
    ],
    "servicos": [
      {
        "id": "tela-cel",
        "cat": "cel-pc",
        "nome": "Troca de tela e bateria (iPhone / Android)",
        "desc": "Troca expressa na hora mantendo vedação e testes completos.",
        "preco": 180,
        "precoTipo": "apartir",
        "duracao": 60,
        "foto": "fotos/eletronicos.jpg",
        "destaque": true
      },
      {
        "id": "format-ssd",
        "cat": "cel-pc",
        "nome": "Upgrade SSD + Limpeza interna de notebook",
        "desc": "Deixa o computador até 5x mais rápido, com troca de pasta térmica.",
        "preco": 190,
        "precoTipo": "apartir",
        "duracao": 90,
        "foto": "fotos/eletronicos.jpg",
        "destaque": true
      },
      {
        "id": "limpeza-ar",
        "cat": "clima",
        "nome": "Higienização completa de Ar-Condicionado Split",
        "desc": "Limpeza profunda com bolsa coletora (sem sujeira na parede) e bactericida.",
        "preco": 160,
        "precoTipo": "fixo",
        "duracao": 60,
        "foto": "fotos/arcond.jpg",
        "destaque": true
      },
      {
        "id": "instalacao-ar",
        "cat": "clima",
        "nome": "Instalação ou carga de gás (visita técnica)",
        "desc": "Instalação no padrão do fabricante com bomba de vácuo e garantia.",
        "preco": 0,
        "precoTipo": "orcamento",
        "duracao": 120,
        "foto": "fotos/arcond.jpg"
      }
    ],
    "profissionais": [
      {
        "nome": "Leandro Souza",
        "cargo": "Técnico em Eletrônica",
        "registro": "Apple & Notebooks",
        "bio": "Reparo em placas, troca de telas e otimização de notebooks."
      },
      {
        "nome": "Fábio Martins",
        "cargo": "Técnico em Climatização",
        "registro": "Refrigeração",
        "bio": "Instalação, limpeza técnica e manutenção de aparelhos Split."
      }
    ],
    "galeria": [
      {
        "foto": "fotos/eletronicos.jpg",
        "legenda": "Bancada antiestática para celulares e notebooks"
      },
      {
        "foto": "fotos/arcond.jpg",
        "legenda": "Manutenção limpa de ar-condicionado residencial"
      }
    ],
    "depoimentos": [
      {
        "autor": "Marcos P.",
        "detalhe": "Troca de bateria",
        "texto": "Trocaram a bateria do meu iPhone em 40 minutos na minha frente. Nota 10!"
      },
      {
        "autor": "Sílvia R.",
        "detalhe": "Limpeza de Split",
        "texto": "Não sujaram nada na sala e o ar voltou a gelar como novo."
      }
    ],
    "faq": [
      {
        "p": "Perco meus dados ao trocar tela ou bateria?",
        "r": "Não! Nenhuma troca física apaga seus arquivos ou fotos."
      },
      {
        "p": "A limpeza do ar-condicionado faz sujeira?",
        "r": "Não, usamos bolsa coletora própria que recolhe 100% da água."
      }
    ],
    "cupons": [
      {
        "codigo": "REPARO10",
        "tipo": "pct",
        "valor": 10,
        "minimo": 120,
        "usoUnico": true,
        "ativo": true
      }
    ],
    "equipe": [
      {
        "id": "f1",
        "nome": "Balcão",
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
    "celular",
    "notebook",
    "arcond",
    "placa",
    "ferramentas",
    "floco",
    "raio",
    "bateria",
    "tela",
    "escudo"
  ],
  "demo": true,
  "senhaDemo": "1234",
  "limiteEquipe": 3
};
