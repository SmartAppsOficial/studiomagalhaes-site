/* Demonstração · Escritório (advocacia e contabilidade) */
window.NEGOCIO = {
  "id": "escritorio",
  "ramo": "Escritório (advocacia e contabilidade)",
  "fluxo": "agendamento",
  "rotuloEquipe": "Sócios e especialistas",
  "rotuloGaleria": "Nosso escritório",
  "obsPlaceholder": "Conte brevemente o assunto (sigilo garantido)…",
  "visual": {
    "nome": "Vértice Consultoria",
    "segmento": "Advocacia, contabilidade e assessoria empresarial",
    "sigla": "VC",
    "cena": "balanca",
    "atendimentoModo": "hibrido",
    "cores": {
      "p": "#1d3557",
      "d": "#c9a255",
      "escuro": "#0e1726",
      "fundo": "#f6f8fb"
    },
    "fontes": {
      "t": "'Cormorant Garamond', Georgia, serif",
      "c": "'Lato', system-ui, sans-serif"
    }
  },
  "textos": {
    "selo": "ATENDIMENTO PRESENCIAL E ONLINE",
    "titulo": "Segurança jurídica e contábil para suas decisões.",
    "sub": "Consultoria clara, atendimento direto com especialistas e total sigilo. Agende sua reunião presencial ou por vídeo.",
    "botao": "Áreas de atuação"
  },
  "camposSolicitacao": [
    {
      "id": "perfil",
      "rotulo": "Atendimento para",
      "tipo": "select",
      "obrig": true,
      "opcoes": [
        "Pessoa Física",
        "MEI / Autônomo",
        "Empresa (ME / Ltda)"
      ]
    }
  ],
  "dados": {
    "negocio": {
      "whats": "(21) 99999-0006",
      "endereco": "Av. Rio Branco, 156 · Sala 1408",
      "cidade": "Rio de Janeiro / Niterói, RJ",
      "horario": {
        "0": [],
        "1": [
          [
            "09:00",
            "18:00"
          ]
        ],
        "2": [
          [
            "09:00",
            "18:00"
          ]
        ],
        "3": [
          [
            "09:00",
            "18:00"
          ]
        ],
        "4": [
          [
            "09:00",
            "18:00"
          ]
        ],
        "5": [
          [
            "09:00",
            "18:00"
          ]
        ],
        "6": []
      },
      "intervaloMin": 60,
      "pagamentos": [
        "Pix",
        "Cartão de crédito",
        "Boleto bancário",
        "Transferência"
      ],
      "avisoFechada": "Atendimento de segunda a sexta. Deixe seu contato!"
    },
    "diferenciais": [
      {
        "icone": "sv-balanca",
        "titulo": "Linguagem clara",
        "texto": "Explicamos riscos, prazos e caminhos sem juridiquês."
      },
      {
        "icone": "sv-video",
        "titulo": "Online para todo o Brasil",
        "texto": "Reunião por vídeo e assinatura digital de documentos com agilidade."
      },
      {
        "icone": "sv-escudo",
        "titulo": "Sigilo absoluto",
        "texto": "Atendimento reservado para pessoas físicas e empresas."
      }
    ],
    "categorias": [
      {
        "id": "juridico",
        "nome": "Assessoria Jurídica",
        "icone": "sv-balanca"
      },
      {
        "id": "contabil",
        "nome": "Contabilidade & Empresas",
        "icone": "sv-maleta"
      }
    ],
    "servicos": [
      {
        "id": "consulta-jur",
        "cat": "juridico",
        "nome": "Consulta jurídica estratégica",
        "desc": "Análise do caso, documentos e orientação prática dos próximos passos.",
        "preco": 0,
        "precoTipo": "orcamento",
        "duracao": 50,
        "foto": "fotos/reuniao.jpg",
        "destaque": true
      },
      {
        "id": "contratos",
        "cat": "juridico",
        "nome": "Elaboração e revisão de contratos",
        "desc": "Contratos comerciais, prestação de serviços, locação e parcerias.",
        "preco": 0,
        "precoTipo": "orcamento",
        "duracao": 45,
        "foto": "fotos/reuniao.jpg",
        "destaque": true
      },
      {
        "id": "abertura-cnpj",
        "cat": "contabil",
        "nome": "Abertura de empresa / Migração MEI para ME",
        "desc": "Planejamento tributário para pagar o menor imposto dentro da lei.",
        "preco": 0,
        "precoTipo": "orcamento",
        "duracao": 45,
        "foto": "fotos/contabil.jpg",
        "destaque": true
      },
      {
        "id": "contab-mensal",
        "cat": "contabil",
        "nome": "Contabilidade mensal consultiva",
        "desc": "Impostos em dia, folha, pró-labore e suporte direto pelo WhatsApp.",
        "preco": 290,
        "precoTipo": "apartir",
        "duracao": 40,
        "foto": "fotos/contabil.jpg"
      }
    ],
    "profissionais": [
      {
        "nome": "Dr. Henrique Vasconcelos",
        "cargo": "Sócio · Direito Civil e Empresarial",
        "registro": "OAB/RJ 000.000",
        "bio": "Atuação preventiva em contratos, empresas e patrimônio."
      },
      {
        "nome": "Dra. Beatriz Monteiro",
        "cargo": "Contadora Consultiva",
        "registro": "CRC-RJ 000000/O",
        "bio": "Planejamento tributário para MEI, prestadores de serviço e PMEs."
      }
    ],
    "galeria": [
      {
        "foto": "fotos/reuniao.jpg",
        "legenda": "Sala de reuniões privativa"
      },
      {
        "foto": "fotos/contabil.jpg",
        "legenda": "Consultoria financeira e tributária"
      }
    ],
    "depoimentos": [
      {
        "autor": "Eduardo L.",
        "detalhe": "Empresário",
        "texto": "Reestruturaram nossos contratos e reduziram nossos impostos de forma 100% legal."
      },
      {
        "autor": "Patrícia N.",
        "detalhe": "Atendimento online",
        "texto": "Resolvi tudo por videochamada, super claros e objetivos."
      }
    ],
    "faq": [
      {
        "p": "Atendem clientes de outros estados?",
        "r": "Sim! Realizamos reuniões por videochamada e processos eletrônicos em todo o Brasil."
      },
      {
        "p": "Como funciona o orçamento?",
        "r": "Após entender sua necessidade na reunião inicial, enviamos proposta formal e transparente."
      }
    ],
    "cupons": [],
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
    "balanca",
    "martelo",
    "documento",
    "grafico",
    "maleta",
    "escudo",
    "caneta",
    "coluna",
    "relogio",
    "selo"
  ],
  "demo": true,
  "senhaDemo": "1234",
  "limiteEquipe": 3
};
