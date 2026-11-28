/* Demonstração · Arquitetura, engenharia e reformas */
window.NEGOCIO = {
  "id": "arquitetura",
  "ramo": "Arquitetura, engenharia e reformas",
  "fluxo": "orcamento",
  "rotuloEquipe": "Arquitetos e engenheiros",
  "rotuloGaleria": "Portfólio de projetos",
  "obsPlaceholder": "Ex.: reforma completa de apartamento 85m², quero integrar sala e cozinha…",
  "visual": {
    "nome": "Traço Vivo",
    "segmento": "Arquitetura, interiores e gestão de obras",
    "sigla": "TV",
    "cena": "casa",
    "atendimentoModo": "hibrido",
    "cores": {
      "p": "#8c6849",
      "d": "#e9c46a",
      "escuro": "#1e1915",
      "fundo": "#faf8f5"
    },
    "fontes": {
      "t": "'DM Serif Display', Georgia, serif",
      "c": "'DM Sans', system-ui, sans-serif"
    }
  },
  "textos": {
    "selo": "PROJETOS 3D · REFORMAS SEM DOR DE CABEÇA",
    "titulo": "Espaços autorais pensados para viver bem.",
    "sub": "Projetos residenciais, comerciais e consultoria de interiores com imagens 3D realistas e acompanhamento de obra.",
    "botao": "Ver serviços e portfólio"
  },
  "camposSolicitacao": [
    {
      "id": "tipoObra",
      "rotulo": "Tipo de imóvel / projeto",
      "tipo": "select",
      "obrig": true,
      "opcoes": [
        "Apartamento residencial",
        "Casa / construção",
        "Loja ou escritório comercial",
        "Consultoria de um ambiente"
      ]
    },
    {
      "id": "area",
      "rotulo": "Área aproximada (m²)",
      "tipo": "text",
      "obrig": false,
      "placeholder": "Ex.: 75 m²"
    }
  ],
  "dados": {
    "negocio": {
      "whats": "(21) 99999-0007",
      "endereco": "Rua Nóbrega, 92 · Jardim Icaraí",
      "cidade": "Niterói, RJ",
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
        "Transferência",
        "Cartão de crédito (parcelado)"
      ],
      "avisoFechada": "Escritório fechado hoje. Envie seu pedido de orçamento!"
    },
    "diferenciais": [
      {
        "icone": "sv-planta",
        "titulo": "Projeto 3D realista",
        "texto": "Veja exatamente como cada ambiente vai ficar antes de quebrar uma parede."
      },
      {
        "icone": "sv-regua",
        "titulo": "Detalhamento completo",
        "texto": "Marcenaria, iluminação, elétrica e lista de materiais para evitar desperdício."
      },
      {
        "icone": "sv-escudo",
        "titulo": "Presencial ou online",
        "texto": "Projetamos imóveis no RJ presencialmente e para todo o Brasil online."
      }
    ],
    "categorias": [
      {
        "id": "projetos",
        "nome": "Projetos completos",
        "icone": "sv-planta"
      },
      {
        "id": "consultoria",
        "nome": "Consultoria e obras",
        "icone": "sv-regua"
      }
    ],
    "servicos": [
      {
        "id": "interiores",
        "cat": "projetos",
        "nome": "Projeto de Interiores completo (3D + Executivo)",
        "desc": "Layout, imagens 3D realistas, marcenaria, gesso, iluminação e revestimentos.",
        "preco": 0,
        "precoTipo": "orcamento",
        "duracao": 0,
        "foto": "fotos/interiores.jpg",
        "destaque": true
      },
      {
        "id": "comercial",
        "cat": "projetos",
        "nome": "Arquitetura comercial (lojas e clínicas)",
        "desc": "Espaço pensado para encantar clientes, vender mais e atender normas técnicas.",
        "preco": 0,
        "precoTipo": "orcamento",
        "duracao": 0,
        "foto": "fotos/interiores.jpg",
        "destaque": true
      },
      {
        "id": "consultoria-amb",
        "cat": "consultoria",
        "nome": "Consultoria rápida de ambiente (online/presencial)",
        "desc": "Renove sala, quarto ou escritório sem quebra-quebra com paleta, móveis e compras.",
        "preco": 590,
        "precoTipo": "apartir",
        "duracao": 90,
        "foto": "fotos/projeto.jpg",
        "destaque": true
      },
      {
        "id": "acompanhamento",
        "cat": "consultoria",
        "nome": "Acompanhamento técnico de reforma + RRT",
        "desc": "Visitas em obra, conferência com pedreiros/marceneiros e emissão de RRT.",
        "preco": 0,
        "precoTipo": "orcamento",
        "duracao": 0,
        "foto": "fotos/projeto.jpg"
      }
    ],
    "profissionais": [
      {
        "nome": "Arq. Sofia Rezende",
        "cargo": "Arquiteta Titular",
        "registro": "CAU A000000-0",
        "bio": "Interiores contemporâneos, iluminação acolhedora e funcionalidade."
      },
      {
        "nome": "Eng. Pedro Alencar",
        "cargo": "Engenheiro Civil",
        "registro": "CREA-RJ 000000",
        "bio": "Gestão de reformas, compatibilização e controle de cronograma."
      }
    ],
    "galeria": [
      {
        "foto": "fotos/interiores.jpg",
        "legenda": "Living integrado com marcenaria ripada e travertino"
      },
      {
        "foto": "fotos/projeto.jpg",
        "legenda": "Curadoria de materiais e detalhamento executivo"
      }
    ],
    "depoimentos": [
      {
        "autor": "Renato e Júlia",
        "detalhe": "Reforma 90m²",
        "texto": "O resultado ficou idêntico ao 3D e economizamos muito evitando retrabalho na obra."
      },
      {
        "autor": "Dra. Luíza M.",
        "detalhe": "Clínica",
        "texto": "Todos os pacientes elogiam a recepção. Projeto impecável!"
      }
    ],
    "faq": [
      {
        "p": "Vocês fazem apenas 1 cômodo?",
        "r": "Sim! Nossa Consultoria de Ambiente é ideal para transformar sala, quarto ou home office."
      },
      {
        "p": "Quanto tempo leva um projeto?",
        "r": "Em média de 20 a 45 dias, conforme a metragem e complexidade."
      }
    ],
    "cupons": [],
    "equipe": [
      {
        "id": "f1",
        "nome": "Atendimento",
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
    "casa",
    "planta",
    "esquadro",
    "predio",
    "cubo",
    "paleta",
    "capacete",
    "luminaria",
    "sofa",
    "chave"
  ],
  "demo": true,
  "senhaDemo": "1234",
  "limiteEquipe": 3
};
