/* Demonstração · Fotografia e eventos */
window.NEGOCIO = {
  "id": "fotografia",
  "ramo": "Fotografia e eventos",
  "fluxo": "orcamento",
  "rotuloEquipe": "Equipe criativa",
  "rotuloGaleria": "Portfólio selecionado",
  "obsPlaceholder": "Ex.: casamento ao ar livre no pôr do sol para 120 convidados…",
  "visual": {
    "nome": "Lente Clara",
    "segmento": "Fotografia autoral, ensaios e eventos",
    "sigla": "LC",
    "cena": "camera",
    "atendimentoModo": "local_domicilio",
    "cores": {
      "p": "#a65c87",
      "d": "#fbbf24",
      "escuro": "#18121b",
      "fundo": "#fbf9fc"
    },
    "fontes": {
      "t": "'Bodoni Moda', Georgia, serif",
      "c": "'Montserrat', system-ui, sans-serif"
    }
  },
  "textos": {
    "selo": "ENSAIOS · CASAMENTOS · MARCAS",
    "titulo": "Memórias reais registradas com luz e sensibilidade.",
    "sub": "Ensaios em estúdio ou externos, cobertura completa de casamentos e fotos profissionais para empresas.",
    "botao": "Ver pacotes e portfólio"
  },
  "camposSolicitacao": [
    {
      "id": "dataEvento",
      "rotulo": "Data prevista do ensaio ou evento",
      "tipo": "date",
      "obrig": false
    },
    {
      "id": "localEvento",
      "rotulo": "Local / Cidade",
      "tipo": "text",
      "obrig": true,
      "placeholder": "Ex.: Estúdio, Praia de Itacoatiara, Casa de Festas…"
    }
  ],
  "dados": {
    "negocio": {
      "whats": "(21) 99999-0010",
      "endereco": "Rua Tiradentes, 64 · Ingá",
      "cidade": "Niterói e Rio de Janeiro, RJ",
      "bairros": [
        "Niterói",
        "Rio de Janeiro",
        "Região dos Lagos",
        "Região Serrana"
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
        "Sinal 30% na reserva"
      ],
      "avisoFechada": "Em cobertura externa hoje. Envie sua data para reservar!"
    },
    "diferenciais": [
      {
        "icone": "sv-camera",
        "titulo": "Entrega rápida em alta",
        "texto": "Galeria online privada em alta resolução e prévia em até 48h."
      },
      {
        "icone": "sv-brilho",
        "titulo": "Direção natural",
        "texto": "Guiamos poses leves para você ficar à vontade mesmo se for tímido."
      },
      {
        "icone": "sv-estrela",
        "titulo": "Backup duplo seguro",
        "texto": "Câmeras profissionais com gravação simultânea em dois cartões."
      }
    ],
    "categorias": [
      {
        "id": "ensaios",
        "nome": "Ensaios fotográficos",
        "icone": "sv-camera"
      },
      {
        "id": "eventos",
        "nome": "Casamentos e eventos",
        "icone": "sv-estrela"
      }
    ],
    "servicos": [
      {
        "id": "ensaio-ext",
        "cat": "ensaios",
        "nome": "Ensaio Externo ou Estúdio (30 fotos tratadas)",
        "desc": "1h30 de sessão com direção natural + galeria digital em alta resolução.",
        "preco": 450,
        "precoTipo": "fixo",
        "duracao": 90,
        "foto": "fotos/estudio.jpg",
        "destaque": true
      },
      {
        "id": "corporativo",
        "cat": "ensaios",
        "nome": "Retrato Corporativo / Marca Pessoal",
        "desc": "Ideal para médicos, advogados, empreendedores e redes sociais.",
        "preco": 380,
        "precoTipo": "fixo",
        "duracao": 60,
        "foto": "fotos/estudio.jpg",
        "destaque": true
      },
      {
        "id": "casamento",
        "cat": "eventos",
        "nome": "Cobertura Completa de Casamento (Foto + Filme)",
        "desc": "Making of, cerimônia e festa com 2 fotógrafos, álbum fine art opcional.",
        "preco": 0,
        "precoTipo": "orcamento",
        "duracao": 0,
        "foto": "fotos/evento.jpg",
        "destaque": true
      },
      {
        "id": "aniversario",
        "cat": "eventos",
        "nome": "Cobertura de Aniversário / Evento (4 horas)",
        "desc": "Todas as fotos selecionadas e tratadas entregues em galeria online.",
        "preco": 950,
        "precoTipo": "apartir",
        "duracao": 240,
        "foto": "fotos/evento.jpg"
      }
    ],
    "profissionais": [
      {
        "nome": "Clara Menezes",
        "cargo": "Fotógrafa Principal",
        "registro": "Retratos & Casamentos",
        "bio": "Olhar documental e luz natural para registros verdadeiros."
      },
      {
        "nome": "Igor Teixeira",
        "cargo": "Filmmaker & Editor",
        "registro": "4K & Drone",
        "bio": "Filmes emocionantes de eventos e vídeos para marcas."
      }
    ],
    "galeria": [
      {
        "foto": "fotos/evento.jpg",
        "legenda": "Ensaio pré-wedding ao pôr do sol"
      },
      {
        "foto": "fotos/estudio.jpg",
        "legenda": "Produção em estúdio com luz controlada"
      }
    ],
    "depoimentos": [
      {
        "autor": "Lívia e Pedro",
        "detalhe": "Casamento",
        "texto": "Chorei vendo as fotos! Captaram cada emoção sem a gente nem perceber a câmera."
      },
      {
        "autor": "Dra. Carla S.",
        "detalhe": "Retrato corporativo",
        "texto": "Fiquei super à vontade e as fotos elevaram totalmente meu Instagram profissional."
      }
    ],
    "faq": [
      {
        "p": "Como reservo minha data?",
        "r": "Verificamos disponibilidade pelo WhatsApp e confirmamos a data com sinal de 30%."
      },
      {
        "p": "Em quanto tempo recebo as fotos?",
        "r": "Prévia em até 48h e galeria completa tratada em 7 a 15 dias."
      }
    ],
    "cupons": [
      {
        "codigo": "ENSAIO10",
        "tipo": "pct",
        "valor": 10,
        "minimo": 300,
        "usoUnico": true,
        "ativo": true
      }
    ],
    "equipe": [
      {
        "id": "f1",
        "nome": "Produção",
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
    "camera",
    "lente",
    "flash",
    "polaroid",
    "claquete",
    "aliancas",
    "tripe",
    "drone",
    "quadro",
    "estrela"
  ],
  "demo": true,
  "senhaDemo": "1234",
  "limiteEquipe": 3
};
