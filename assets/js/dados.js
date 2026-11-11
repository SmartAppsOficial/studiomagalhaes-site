/*
  Dados gerais do site do Studio Magalhães.
  Os dados de cada projeto ficam na pasta dele: projetos/<id>/dados.js (veja PONTE.md).
*/
window.SM_DADOS = {
  estudio: {
    nome: "Studio Magalhães",
    email: "contato@studiomagalhaes.com.br",
    // Apoio geral ao estúdio (opção "O estúdio (geral)" da página Apoiar). Vazio = "em breve".
    apoio: {
      qr: "",
      copiaECola: "",
      chavePix: "",
      // Nome que aparece no app do banco de quem paga. Vale para os projetos que não têm um próprio.
      recebedor: "60.689.820 PAULO VITOR SOARES MAGALHAES"
    }
  },

  // Ordem dos projetos no site (o site separa sozinho em Jogos e Apps, lançados primeiro).
  // Projeto novo: crie a pasta projetos/<id>/ (copie outra) e ponha o id aqui.
  projetos: ["zero-to-ceo", "massauros", "astrogoo","ileap-family", "ileap", "desbrava"]
};

window.SM_PROJETOS = {};
window.SM_PROJETO = function (p) { window.SM_PROJETOS[p.id] = p; };
