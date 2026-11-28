/* Demonstração · Academia, estúdio e personal */
window.NEGOCIO = {
  "id": "academia",
  "ramo": "Academia, estúdio e personal",
  "fluxo": "agendamento",
  "rotuloEquipe": "Treinadores",
  "rotuloGaleria": "Nosso espaço",
  "obsPlaceholder": "Ex.: objetivo hipertrofia, iniciante, prefiro treinar à noite…",
  "visual": {
    "nome": "Pulso Studio",
    "segmento": "Academia boutique, funcional e personal",
    "sigla": "PS",
    "cena": "haltere",
    "atendimentoModo": "hibrido",
    "cores": {
      "p": "#1f9d55",
      "d": "#facc15",
      "escuro": "#0f1712",
      "fundo": "#f4faf6"
    },
    "fontes": {
      "t": "'Outfit', system-ui, sans-serif",
      "c": "'Plus Jakarta Sans', system-ui, sans-serif"
    }
  },
  "textos": {
    "selo": "AULA EXPERIMENTAL GRÁTIS",
    "titulo": "Treino inteligente, resultado real no seu ritmo.",
    "sub": "Musculação acompanhada, funcional em grupos reduzidos e personal presencial ou online.",
    "botao": "Ver planos e aulas"
  },
  "camposSolicitacao": [
    {
      "id": "objetivo",
      "rotulo": "Seu objetivo principal",
      "tipo": "select",
      "obrig": true,
      "opcoes": [
        "Emagrecimento e condicionamento",
        "Ganho de massa muscular",
        "Saúde e disposição",
        "Retorno após sedentarismo"
      ]
    }
  ],
  "dados": {
    "negocio": {
      "whats": "(21) 99999-0005",
      "endereco": "Rua Lopes Trovão, 185 · Icaraí",
      "cidade": "Niterói, RJ",
      "horario": {
        "0": [
          [
            "08:00",
            "14:00"
          ]
        ],
        "1": [
          [
            "06:00",
            "22:00"
          ]
        ],
        "2": [
          [
            "06:00",
            "22:00"
          ]
        ],
        "3": [
          [
            "06:00",
            "22:00"
          ]
        ],
        "4": [
          [
            "06:00",
            "22:00"
          ]
        ],
        "5": [
          [
            "06:00",
            "22:00"
          ]
        ],
        "6": [
          [
            "08:00",
            "17:00"
          ]
        ]
      },
      "intervaloMin": 60,
      "pagamentos": [
        "Pix",
        "Cartão recorrente",
        "Cartão de débito",
        "Wellhub / TotalPass"
      ],
      "avisoFechada": "Academia fechada no momento."
    },
    "diferenciais": [
      {
        "icone": "sv-haltere",
        "titulo": "Acompanhamento de verdade",
        "texto": "Professores presentes no salão ajustando postura e progressão de carga."
      },
      {
        "icone": "sv-agenda",
        "titulo": "Sem superlotação",
        "texto": "Equipamentos modernos e turmas de funcional com vagas limitadas."
      },
      {
        "icone": "sv-video",
        "titulo": "Consultoria online",
        "texto": "Planilha de treino no app para quem treina em casa ou viajando."
      }
    ],
    "categorias": [
      {
        "id": "experimental",
        "nome": "Comece aqui",
        "icone": "sv-estrela"
      },
      {
        "id": "planos",
        "nome": "Planos mensais",
        "icone": "sv-haltere"
      },
      {
        "id": "personal",
        "nome": "Personal & consultoria",
        "icone": "sv-coracao"
      }
    ],
    "servicos": [
      {
        "id": "aula-gratis",
        "cat": "experimental",
        "nome": "Aula experimental gratuita + Avaliação",
        "desc": "Conheça o espaço, faça um treino guiado e receba sua avaliação física.",
        "preco": 0,
        "precoTipo": "orcamento",
        "duracao": 60,
        "foto": "fotos/treino.jpg",
        "destaque": true
      },
      {
        "id": "plano-livre",
        "cat": "planos",
        "nome": "Plano Livre · Musculação + Funcional",
        "desc": "Acesso total todos os dias + troca de treino mensal incluída.",
        "preco": 149.9,
        "precoTipo": "fixo",
        "duracao": 60,
        "foto": "fotos/treino.jpg",
        "destaque": true
      },
      {
        "id": "plano-funcional",
        "cat": "planos",
        "nome": "Funcional 3x na semana",
        "desc": "Turmas reduzidas com alta energia e foco em condicionamento.",
        "preco": 129.9,
        "precoTipo": "fixo",
        "duracao": 50,
        "foto": "fotos/personal.jpg"
      },
      {
        "id": "personal-pack",
        "cat": "personal",
        "nome": "Personal Trainer (pacote 8 aulas)",
        "desc": "Atendimento individual 100% focado no seu objetivo e horário.",
        "preco": 640,
        "precoTipo": "apartir",
        "duracao": 60,
        "foto": "fotos/personal.jpg",
        "destaque": true
      },
      {
        "id": "consultoria-on",
        "cat": "personal",
        "nome": "Consultoria de treino online",
        "desc": "Treino personalizado por vídeo + ajustes quinzenais pelo WhatsApp.",
        "preco": 120,
        "precoTipo": "fixo",
        "duracao": 30,
        "foto": "fotos/personal.jpg"
      }
    ],
    "profissionais": [
      {
        "nome": "Rodrigo Farias",
        "cargo": "Educador Físico",
        "registro": "CREF 000000-G/RJ",
        "bio": "Especialista em hipertrofia e treinamento de força."
      },
      {
        "nome": "Amanda Costa",
        "cargo": "Personal & Funcional",
        "registro": "CREF 000001-G/RJ",
        "bio": "Condicionamento físico, mobilidade e treino para iniciantes."
      }
    ],
    "galeria": [
      {
        "foto": "fotos/treino.jpg",
        "legenda": "Área de musculação com equipamentos novos"
      },
      {
        "foto": "fotos/personal.jpg",
        "legenda": "Treino funcional acompanhado de perto"
      }
    ],
    "depoimentos": [
      {
        "autor": "Vinícius A.",
        "detalhe": "Aluno há 1 ano",
        "texto": "Nunca tive constância em academia até treinar aqui. Professores super atentos."
      },
      {
        "autor": "Tainá G.",
        "detalhe": "Funcional",
        "texto": "Turmas pequenas, espaço limpo e clima muito bom!"
      }
    ],
    "faq": [
      {
        "p": "A aula experimental tem algum custo?",
        "r": "Não! É 100% gratuita para você conhecer o espaço sem compromisso."
      },
      {
        "p": "Vocês aceitam Wellhub (Gympass) ou TotalPass?",
        "r": "Sim, aceitamos os planos compatíveis na recepção."
      }
    ],
    "cupons": [
      {
        "codigo": "MATRICULA0",
        "tipo": "pct",
        "valor": 10,
        "minimo": 100,
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
    "haltere",
    "kettlebell",
    "anilha",
    "cronometro",
    "raio",
    "coracao",
    "trofeu",
    "corda",
    "garrafa",
    "medalha"
  ],
  "demo": true,
  "senhaDemo": "1234",
  "limiteEquipe": 3
};
