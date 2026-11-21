/*
  Projeto do Firebase que guarda os pedidos de proposta (coleção "propostas").
  Usado pelo formulário (negocios/) e pelo painel (negocios/painel/).

  Copie do console do Firebase: Configurações do projeto > Seus apps > app da Web > Configuração.
  Esses valores NÃO são segredo (todo site com Firebase mostra eles): quem protege os pedidos
  são as regras do Firestore, que só deixam a conta do Paulo ler.

  scriptUrl: endereço do Apps Script "SM Propostas" (avisos e respostas por e-mail, Gemini).
  Também não é segredo: as ações do painel exigem o login do Paulo.
*/
window.SM_FIREBASE = {
  apiKey: "AIzaSyBDInSlOZBNRaHdhHF9TMRb3LZ9h18LSLI",
  authDomain: "sm-negocios.firebaseapp.com",
  projectId: "sm-negocios",
  appId: "1:357560204340:web:c4df9cb95d9bd03ed21e61",
  scriptUrl: "https://script.google.com/macros/s/AKfycbxhqBsXJOyDOP0UOTRdRlkNt-HkHTyOH1Go6EgX3aP1lL5fIIQtTB4NkJsNMwOmyI2Z4w/exec"
};
