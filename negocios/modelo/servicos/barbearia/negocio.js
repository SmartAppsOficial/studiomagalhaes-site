/* Demonstração · Barbearia */
window.NEGOCIO = {
  "id": "barbearia",
  "ramo": "Barbearia",
  "fluxo": "agendamento",
  "rotuloEquipe": "Nossos barbeiros",
  "rotuloGaleria": "Cortes e espaço",
  "obsPlaceholder": "Ex.: degradê baixo na navalha, prefiro toalha quente…",
  "visual": {
    "nome": "Navalha & Brasa",
    "segmento": "Barbearia clássica e moderna",
    "sigla": "NB",
    "cena": "barberpole",
    "atendimentoModo": "local",
    "cores": {
      "p": "#b87a3b",
      "d": "#f2c46d",
      "escuro": "#18120e",
      "fundo": "#faf7f2"
    },
    "fontes": {
      "t": "'Bricolage Grotesque', system-ui, sans-serif",
      "c": "'DM Sans', system-ui, sans-serif"
    }
  },
  "textos": {
    "selo": "HORA MARCADA · TOALHA QUENTE",
    "titulo": "Corte preciso e barba no capricho.",
    "sub": "Escolha seu barbeiro, selecione o serviço e agende em segundos pelo WhatsApp — sem fila.",
    "botao": "Ver serviços"
  },
  "camposSolicitacao": [],
  "dados": {
    "negocio": {
      "whats": "(21) 99999-0001",
      "endereco": "Rua Moreira César, 210 · Icaraí",
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
        "Dinheiro"
      ],
      "avisoFechada": "Folga hoje. Agende para o próximo horário!"
    },
    "diferenciais": [
      {
        "icone": "relogio",
        "titulo": "Sem espera",
        "texto": "Horário marcado direto pelo site com confirmação no WhatsApp."
      },
      {
        "icone": "sv-tesoura",
        "titulo": "Acabamento premium",
        "texto": "Toalha quente, espuma artesanal e produtos profissionais."
      },
      {
        "icone": "sv-estrela",
        "titulo": "Clube mensal",
        "texto": "Planos de corte e barba ilimitados com economia todo mês."
      }
    ],
    "categorias": [
      {
        "id": "cortes",
        "nome": "Cortes",
        "icone": "sv-tesoura"
      },
      {
        "id": "barba",
        "nome": "Barba e combos",
        "icone": "sv-barba"
      },
      {
        "id": "planos",
        "nome": "Planos mensais",
        "icone": "sv-estrela"
      }
    ],
    "servicos": [
      {
        "id": "corte-social",
        "cat": "cortes",
        "nome": "Corte degradê ou social",
        "desc": "Lavagem, corte na tesoura e máquina + finalização com pomada.",
        "preco": 55,
        "precoTipo": "fixo",
        "duracao": 45,
        "foto": "fotos/corte.jpg",
        "destaque": true
      },
      {
        "id": "corte-infantil",
        "cat": "cortes",
        "nome": "Corte infantil",
        "desc": "Atendimento paciente e acabamento cuidadoso para crianças.",
        "preco": 45,
        "precoTipo": "fixo",
        "duracao": 35,
        "foto": "fotos/corte.jpg"
      },
      {
        "id": "barba-toalha",
        "cat": "barba",
        "nome": "Barba terapia com toalha quente",
        "desc": "Alinhamento na navalha, esfoliação leve, toalha quente e óleo.",
        "preco": 45,
        "precoTipo": "fixo",
        "duracao": 35,
        "foto": "fotos/barba.jpg",
        "destaque": true
      },
      {
        "id": "combo-completo",
        "cat": "barba",
        "nome": "Combo Corte + Barba + Sobrancelha",
        "desc": "O pacote completo com lavagem e acabamento na navalha.",
        "preco": 90,
        "precoTipo": "fixo",
        "duracao": 75,
        "foto": "fotos/barba.jpg",
        "destaque": true,
        "inclusos": [
          "Corte completo",
          "Barba com toalha quente",
          "Design de sobrancelha",
          "Bebida cortesia"
        ]
      },
      {
        "id": "clube-corte",
        "cat": "planos",
        "nome": "Clube Corte Ilimitado (mensal)",
        "desc": "Corte quantas vezes quiser no mês de segunda a quinta.",
        "preco": 119.9,
        "precoTipo": "fixo",
        "duracao": 45,
        "foto": "fotos/corte.jpg"
      },
      {
        "id": "clube-full",
        "cat": "planos",
        "nome": "Clube Corte + Barba (mensal)",
        "desc": "Visual sempre alinhado todas as semanas do mês.",
        "preco": 189.9,
        "precoTipo": "fixo",
        "duracao": 70,
        "foto": "fotos/barba.jpg"
      }
    ],
    "profissionais": [
      {
        "nome": "Rafael Mendes",
        "cargo": "Master Barber",
        "registro": "10 anos de experiência",
        "bio": "Especialista em degradê navalhado e barbas clássicas."
      },
      {
        "nome": "Lucas Ferreira",
        "cargo": "Barbeiro Sênior",
        "registro": "Visagismo",
        "bio": "Cortes na tesoura, penteados modernos e acabamento preciso."
      },
      {
        "nome": "Thiago Alves",
        "cargo": "Barbeiro",
        "registro": "Barba terapia",
        "bio": "Especialista em barba desenhada e atendimento rápido."
      }
    ],
    "galeria": [
      {
        "foto": "fotos/corte.jpg",
        "legenda": "Fade navalhado com acabamento natural"
      },
      {
        "foto": "fotos/barba.jpg",
        "legenda": "Barba terapia com toalha quente"
      }
    ],
    "depoimentos": [
      {
        "autor": "Marcelo R.",
        "detalhe": "Cliente há 2 anos",
        "texto": "Melhor degradê de Icaraí. Agendo pelo celular e nunca fico esperando."
      },
      {
        "autor": "André S.",
        "detalhe": "Plano mensal",
        "texto": "Ambiente top, café gelado e barbeiros muito detalhistas."
      },
      {
        "autor": "Felipe T.",
        "detalhe": "Primeira visita",
        "texto": "Usei o cupom de primeira visita e virei cliente fixo."
      }
    ],
    "faq": [
      {
        "p": "Precisa agendar antes?",
        "r": "Recomendamos agendar aqui pelo site para garantir seu horário sem fila."
      },
      {
        "p": "Como funciona o Clube mensal?",
        "r": "Você paga um valor fixo mensal e pode cortar ou fazer a barba quantas vezes precisar."
      },
      {
        "p": "Posso cancelar ou remarcar?",
        "r": "Sim, basta avisar pelo WhatsApp com pelo menos 2 horas de antecedência."
      }
    ],
    "cupons": [
      {
        "codigo": "PRIMEIRAVISITA",
        "tipo": "pct",
        "valor": 15,
        "minimo": 45,
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
    "barberpole",
    "tesoura",
    "navalha",
    "maquina",
    "barba",
    "pente",
    "oleo",
    "cadeira",
    "toalha",
    "selo"
  ],
  "demo": true,
  "senhaDemo": "1234",
  "limiteEquipe": 3
};
