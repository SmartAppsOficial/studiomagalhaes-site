/* Demonstração · Oficina mecânica e estética automotiva */
window.NEGOCIO = {
  "id": "oficina",
  "ramo": "Oficina mecânica e estética automotiva",
  "fluxo": "orcamento",
  "rotuloEquipe": "Equipe técnica",
  "rotuloGaleria": "Serviços realizados",
  "obsPlaceholder": "Ex.: barulho na suspensão dianteira, revisão de 40 mil km…",
  "visual": {
    "nome": "Torque & Brilho",
    "segmento": "Oficina mecânica e estética automotiva",
    "sigla": "TB",
    "cena": "chave",
    "atendimentoModo": "local",
    "cores": {
      "p": "#d94b2b",
      "d": "#fbbf24",
      "escuro": "#14171f",
      "fundo": "#f7f7f8"
    },
    "fontes": {
      "t": "'Space Grotesk', system-ui, sans-serif",
      "c": "'Inter', system-ui, sans-serif"
    }
  },
  "textos": {
    "selo": "DIAGNÓSTICO TRANSPARENTE · GARANTIA",
    "titulo": "Seu carro bem cuidado, sem surpresa no orçamento.",
    "sub": "Revisão preventiva, scanner eletrônico, freios e vitrificação automotiva. Peça seu orçamento em 1 minuto.",
    "botao": "Ver serviços"
  },
  "camposSolicitacao": [
    {
      "id": "veiculo",
      "rotulo": "Modelo e ano do veículo",
      "tipo": "text",
      "obrig": true,
      "placeholder": "Ex.: Honda Civic 2021 / Onix 2022"
    },
    {
      "id": "km",
      "rotulo": "Quilometragem aproximada",
      "tipo": "text",
      "obrig": false,
      "placeholder": "Ex.: 45.000 km"
    }
  ],
  "dados": {
    "negocio": {
      "whats": "(21) 99999-0004",
      "endereco": "Av. Jansen de Melo, 480 · Centro",
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
        "Cartão de crédito (até 6x)",
        "Cartão de débito",
        "Dinheiro"
      ],
      "avisoFechada": "Oficina fechada hoje. Envie seu pedido de orçamento!"
    },
    "diferenciais": [
      {
        "icone": "sv-chave",
        "titulo": "Orçamento aprovado antes",
        "texto": "Mandamos foto e vídeo das peças no WhatsApp antes de executar qualquer serviço."
      },
      {
        "icone": "sv-escudo",
        "titulo": "Garantia de 90 dias",
        "texto": "Peças originais ou primeira linha com nota fiscal e garantia."
      },
      {
        "icone": "sv-carro",
        "titulo": "Mecânica + Estética",
        "texto": "Resolva revisão, polimento e higienização no mesmo lugar."
      }
    ],
    "categorias": [
      {
        "id": "mecanica",
        "nome": "Mecânica e revisão",
        "icone": "sv-chave"
      },
      {
        "id": "estetica",
        "nome": "Estética automotiva",
        "icone": "sv-carro"
      }
    ],
    "servicos": [
      {
        "id": "revisao",
        "cat": "mecanica",
        "nome": "Revisão completa + Troca de óleo e filtros",
        "desc": "Checklist de 40 itens, óleo sintético especificado e scanner eletrônico.",
        "preco": 390,
        "precoTipo": "apartir",
        "duracao": 120,
        "foto": "fotos/mecanica.jpg",
        "destaque": true
      },
      {
        "id": "diagnostico",
        "cat": "mecanica",
        "nome": "Diagnóstico computadorizado (Scanner OBD)",
        "desc": "Leitura completa de injeção, ABS, airbag e bateria com laudo.",
        "preco": 120,
        "precoTipo": "fixo",
        "duracao": 45,
        "foto": "fotos/mecanica.jpg",
        "destaque": true
      },
      {
        "id": "freios",
        "cat": "mecanica",
        "nome": "Freios e suspensão (sob avaliação)",
        "desc": "Troca de pastilhas, discos, amortecedores e alinhamento.",
        "preco": 0,
        "precoTipo": "orcamento",
        "duracao": 0,
        "foto": "fotos/mecanica.jpg"
      },
      {
        "id": "polimento",
        "cat": "estetica",
        "nome": "Polimento técnico + Vitrificação 9H",
        "desc": "Remoção de riscos leves, brilho espelhado e proteção de até 2 anos.",
        "preco": 690,
        "precoTipo": "apartir",
        "duracao": 360,
        "foto": "fotos/polimento.jpg",
        "destaque": true
      },
      {
        "id": "higienizacao",
        "cat": "estetica",
        "nome": "Higienização interna + Ozônio",
        "desc": "Limpeza profunda de bancos, teto, carpete e eliminação de odores.",
        "preco": 260,
        "precoTipo": "apartir",
        "duracao": 180,
        "foto": "fotos/polimento.jpg"
      }
    ],
    "profissionais": [
      {
        "nome": "Carlos Eduardo",
        "cargo": "Mecânico Chefe",
        "registro": "15 anos · Injeção e câmbio",
        "bio": "Diagnóstico preciso sem troca desnecessária de peças."
      },
      {
        "nome": "Matheus Silva",
        "cargo": "Detailer Automotivo",
        "registro": "Certificado vitrificação",
        "bio": "Polimento técnico e proteção cerâmica de pintura."
      }
    ],
    "galeria": [
      {
        "foto": "fotos/mecanica.jpg",
        "legenda": "Box equipado com scanner e elevadores modernos"
      },
      {
        "foto": "fotos/polimento.jpg",
        "legenda": "Acabamento espelhado após vitrificação"
      }
    ],
    "depoimentos": [
      {
        "autor": "Gustavo H.",
        "detalhe": "Revisão 50 mil km",
        "texto": "Me mandaram vídeo de tudo pelo WhatsApp. Preço justo e carro saiu zero."
      },
      {
        "autor": "Daniela F.",
        "detalhe": "Polimento",
        "texto": "A pintura ficou parecendo saída de concessionária!"
      }
    ],
    "faq": [
      {
        "p": "Preciso deixar o carro o dia todo?",
        "r": "Serviços rápidos como troca de óleo e scanner ficam prontos em até 2 horas com agendamento."
      },
      {
        "p": "Vocês parcelam no cartão?",
        "r": "Sim, parcelamos em até 6x sem juros conforme o valor do serviço."
      }
    ],
    "cupons": [
      {
        "codigo": "CHECKUP10",
        "tipo": "pct",
        "valor": 10,
        "minimo": 150,
        "usoUnico": true,
        "ativo": true
      }
    ],
    "equipe": [
      {
        "id": "f1",
        "nome": "Consultor",
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
    "chave",
    "engrenagem",
    "carro",
    "roda",
    "pistao",
    "polimento",
    "scanner",
    "oleo",
    "bateria",
    "velocimetro"
  ],
  "demo": true,
  "senhaDemo": "1234",
  "limiteEquipe": 3
};
