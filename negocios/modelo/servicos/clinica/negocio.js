/* Demonstração · Clínica e saúde */
window.NEGOCIO = {
  "id": "clinica",
  "ramo": "Clínica e saúde",
  "fluxo": "agendamento",
  "rotuloEquipe": "Corpo clínico",
  "rotuloGaleria": "Estrutura da clínica",
  "obsPlaceholder": "Ex.: primeira consulta, prefiro período da manhã…",
  "visual": {
    "nome": "Clínica Vida Plena",
    "segmento": "Saúde integrada, odonto e teleconsulta",
    "sigla": "VP",
    "cena": "esteto",
    "atendimentoModo": "hibrido",
    "cores": {
      "p": "#168791",
      "d": "#5eead4",
      "escuro": "#0c1f24",
      "fundo": "#f4fbfb"
    },
    "fontes": {
      "t": "'Montserrat', system-ui, sans-serif",
      "c": "'Inter', system-ui, sans-serif"
    }
  },
  "textos": {
    "selo": "PRESENCIAL E TELECONSULTA",
    "titulo": "Cuidado humano, diagnóstico claro e pontualidade.",
    "sub": "Consultas médicas, odontologia, psicologia e nutrição. Agende presencialmente ou por teleconsulta.",
    "botao": "Ver especialidades"
  },
  "camposSolicitacao": [
    {
      "id": "convenio",
      "rotulo": "Particular ou convênio",
      "tipo": "select",
      "obrig": true,
      "opcoes": [
        "Particular",
        "Amil",
        "Bradesco Saúde",
        "SulAmérica",
        "Unimed",
        "Outro convênio"
      ]
    }
  ],
  "dados": {
    "negocio": {
      "whats": "(21) 99999-0003",
      "endereco": "Rua Gavião Peixoto, 124 · Sala 602",
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
      "intervaloMin": 45,
      "pagamentos": [
        "Pix",
        "Cartão de crédito",
        "Cartão de débito",
        "Convênio"
      ],
      "avisoFechada": "Clínica fechada hoje. Deixe sua solicitação!"
    },
    "diferenciais": [
      {
        "icone": "sv-saude",
        "titulo": "Equipe multidisciplinar",
        "texto": "Clínica geral, odontologia, nutrição e psicologia no mesmo lugar."
      },
      {
        "icone": "sv-video",
        "titulo": "Teleconsulta disponível",
        "texto": "Atendimento online por vídeo para consultas e retornos de onde estiver."
      },
      {
        "icone": "sv-escudo",
        "titulo": "Convênios e particular",
        "texto": "Emitimos recibo para reembolso e aceitamos os principais planos."
      }
    ],
    "categorias": [
      {
        "id": "consultas",
        "nome": "Consultas médicas",
        "icone": "sv-saude"
      },
      {
        "id": "odonto",
        "nome": "Odontologia",
        "icone": "sv-brilho"
      },
      {
        "id": "bemestar",
        "nome": "Nutrição e psicologia",
        "icone": "sv-coracao"
      }
    ],
    "servicos": [
      {
        "id": "clinico",
        "cat": "consultas",
        "nome": "Consulta Clínica Geral + Check-up",
        "desc": "Avaliação completa, solicitação de exames e plano preventivo.",
        "preco": 220,
        "precoTipo": "fixo",
        "duracao": 45,
        "foto": "fotos/consulta.jpg",
        "destaque": true
      },
      {
        "id": "teleconsulta",
        "cat": "consultas",
        "nome": "Teleconsulta online (vídeo)",
        "desc": "Orientação médica, avaliação de exames e receita digital válida em todo Brasil.",
        "preco": 170,
        "precoTipo": "fixo",
        "duracao": 35,
        "foto": "fotos/online.jpg",
        "destaque": true
      },
      {
        "id": "avaliacao-odonto",
        "cat": "odonto",
        "nome": "Avaliação odontológica + Profilaxia",
        "desc": "Limpeza ultrassônica, polimento e plano de tratamento claro.",
        "preco": 190,
        "precoTipo": "fixo",
        "duracao": 50,
        "foto": "fotos/odonto.jpg",
        "destaque": true
      },
      {
        "id": "clareamento",
        "cat": "odonto",
        "nome": "Clareamento dental supervisionado",
        "desc": "Protocolo seguro sem sensibilidade excessiva.",
        "preco": 490,
        "precoTipo": "apartir",
        "duracao": 60,
        "foto": "fotos/odonto.jpg"
      },
      {
        "id": "nutricao",
        "cat": "bemestar",
        "nome": "Consulta de Nutrição + Bioimpedância",
        "desc": "Plano alimentar realista adaptado à sua rotina (presencial ou online).",
        "preco": 210,
        "precoTipo": "fixo",
        "duracao": 50,
        "foto": "fotos/online.jpg"
      },
      {
        "id": "psico",
        "cat": "bemestar",
        "nome": "Sessão de Psicoterapia",
        "desc": "Atendimento sigiloso presencial ou por videochamada.",
        "preco": 160,
        "precoTipo": "fixo",
        "duracao": 50,
        "foto": "fotos/consulta.jpg"
      }
    ],
    "profissionais": [
      {
        "nome": "Dra. Helena Castro",
        "cargo": "Clínica Médica",
        "registro": "CRM-RJ 000000",
        "bio": "Medicina preventiva e acompanhamento de saúde familiar."
      },
      {
        "nome": "Dr. Bruno Nogueira",
        "cargo": "Cirurgião-Dentista",
        "registro": "CRO-RJ 00000",
        "bio": "Odontologia estética, reabilitação e atendimento humanizado."
      },
      {
        "nome": "Dra. Mariana Luz",
        "cargo": "Nutricionista",
        "registro": "CRN-4 00000",
        "bio": "Nutrição clínica, emagrecimento saudável e performance."
      }
    ],
    "galeria": [
      {
        "foto": "fotos/consulta.jpg",
        "legenda": "Consultório iluminado e acolhedor"
      },
      {
        "foto": "fotos/odonto.jpg",
        "legenda": "Atendimento odontológico moderno"
      },
      {
        "foto": "fotos/online.jpg",
        "legenda": "Teleconsulta com receita digital"
      }
    ],
    "depoimentos": [
      {
        "autor": "Cláudia V.",
        "detalhe": "Paciente há 3 anos",
        "texto": "Pontualidade rara hoje em dia e médicos que realmente escutam."
      },
      {
        "autor": "Rodrigo B.",
        "detalhe": "Teleconsulta",
        "texto": "Fiz minha consulta online durante uma viagem e recebi a receita digital na hora."
      }
    ],
    "faq": [
      {
        "p": "Vocês aceitam convênios?",
        "r": "Sim, atendemos planos selecionados e fornecemos nota fiscal para reembolso em todos os convênios."
      },
      {
        "p": "A receita da teleconsulta vale em qualquer farmácia?",
        "r": "Sim, emitida com assinatura digital certificada aceita em todo o Brasil."
      }
    ],
    "cupons": [],
    "equipe": [
      {
        "id": "f1",
        "nome": "Secretária",
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
    "esteto",
    "cruz",
    "dente",
    "coracao",
    "tele",
    "agenda",
    "folha",
    "escudo",
    "prontuario",
    "capsula"
  ],
  "demo": true,
  "senhaDemo": "1234",
  "limiteEquipe": 3
};
