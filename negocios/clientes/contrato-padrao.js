// Contrato padrão do Studio Magalhães (Catálogo digital e Site premium).
// Cada cláusula tem: id, título, quando entra (conforme produto e opções) e o texto,
// montado com os dados do contrato (d). O Paulo pode desligar, editar ou somar cláusulas.
// Os dados do contratado (MEI) não ficam aqui: são preenchidos uma vez em "Meus dados"
// e guardados só na conta do Paulo (Firestore config/contrato).
// Modelo feito com cuidado, mas não substitui a revisão de um advogado.
const v = (x, falta) => (String(x ?? "").trim() || falta);
const num = (x) => { const n = parseFloat(String(x ?? "").replace(/\./g, "").replace(",", ".")); return isNaN(n) ? 0 : n; };
const real = (n) => "R$ " + n.toFixed(2).replace(".", ",").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const dinheiro = (x) => (String(x ?? "").trim() ? real(num(x)) : "R$ [VALOR]");
const plano = (d) => (d.produto === "catalogo" ? "Catálogo digital" : "Site premium");
const usaEntregadores = (d) => d.entregaModo === "entregadores" || d.entregaModo === "ambos";
const usaCorreios = (d) => d.entregaModo === "correios" || d.entregaModo === "ambos";

/** Mensalidade total = plano + adicionais. */
export function totalMensal(d) {
  let t = num(d.valorMensal);
  if (d.pagamentoOnline) t += num(d.valorPagOnline);
  if (d.dominioProprio) t += num(d.valorDominio);
  if (d.chatIA) t += num(d.valorChat);
  t += (parseInt(d.funcExtras, 10) || 0) * num(d.valorExtra);
  if (usaEntregadores(d)) t += (parseInt(d.entExtras, 10) || 0) * num(d.valorExtra);
  return Math.round(t * 100) / 100;
}

export const CAMPOS_PADRAO = {
  produto: "catalogo",
  loja: "", siteEndereco: "",
  valorCriacao: "490,00", valorMensal: "49,90", diaVencimento: "10", formaPagamento: "Pix",
  inicio: "", prazoEntrega: "15", atualizacoesMes: "0", valorAvulsa: "89,90",
  produtosIniciais: "20", permanencia: "6", multaPermanencia: "20",
  funcIncluidos: "3", entIncluidos: "3", funcExtras: "0", entExtras: "0", valorExtra: "10,00",
  entregaModo: "entregadores",
  pagamentoOnline: false, valorPagOnline: "25,00", provedorPagamento: "Mercado Pago ou InfinitePay",
  dominioProprio: false, dominio: "", valorDominio: "20,00",
  chatIA: false, valorChat: "100,00", limiteChat: "",
  testeGratis: false, diasTeste: "21",
  carencia: "5", avisoPrevio: "30", notaFiscal: true,
  testemunhas: false
};

export const CLAUSULAS = [
  {
    id: "objeto", titulo: "Objeto", fixa: true,
    texto: (d) => [
      `O presente contrato tem por objeto a prestação, pela CONTRATADA à CONTRATANTE, do serviço "${plano(d)}" para o negócio ${v(d.loja, "[NOME DO NEGÓCIO]")}, que compreende:`,
      d.produto === "catalogo"
        ? [
          `1. a disponibilização de um site do tipo catálogo, a partir de modelo próprio da CONTRATADA para o ramo da CONTRATANTE, com o nome, o logotipo, as cores e as fontes da CONTRATANTE, catálogo de produtos com categorias e carrinho que monta o pedido e o envia para o WhatsApp da CONTRATANTE;`,
          `2. o cadastro inicial, pela CONTRATADA, de até ${v(d.produtosIniciais, "[QUANTIDADE]")} produtos, com as fotos, descrições e preços fornecidos pela CONTRATANTE;`,
          `3. o acesso a uma área administrativa com senha, na qual a CONTRATANTE gerencia produtos, fotos, preços, categorias, funcionamento da loja e pedidos;`,
          `4. acesso individual à área administrativa para o dono e até ${v(d.funcIncluidos, "3")} funcionários${usaEntregadores(d) ? ` e até ${v(d.entIncluidos, "3")} entregadores` : ""}, com as permissões que o dono escolher;`,
          `5. a hospedagem do site e sua manutenção técnica enquanto este contrato estiver em vigor.`
        ].join("\n")
        : `1. a criação de um site personalizado, conforme o que for combinado entre as partes por escrito (proposta, mensagem ou e-mail), que passa a fazer parte deste contrato;\n2. o acesso a uma área administrativa com senha, quando prevista na proposta;\n3. a hospedagem do site e sua manutenção técnica enquanto este contrato estiver em vigor.`,
      `Parágrafo único. Tudo o que não estiver descrito neste contrato ou na proposta aceita pela CONTRATANTE será tratado como serviço à parte, com orçamento prévio.`
    ].join("\n")
  },
  {
    id: "naoIncluso", titulo: "O que não está incluído", fixa: true,
    texto: () => `A CONTRATADA fornece o site e o sistema descritos neste contrato. Não fazem parte deste contrato, salvo ajuste por escrito:\n1. entregadores, atendimento aos clientes, operação da loja, estoque, embalagem, postagem, emissão de notas fiscais das vendas e recebimento de pagamentos, que são de responsabilidade exclusiva da CONTRATANTE;\n2. produção de fotos, vídeos, textos publicitários ou logotipo;\n3. anúncios pagos, gestão de redes sociais ou qualquer promessa de quantidade de visitas, pedidos ou vendas;\n4. integração com sistemas de terceiros não previstos neste contrato (aplicativos de entrega, emissores fiscais, maquininhas, marketplaces).\nParágrafo único. A CONTRATADA não garante resultado financeiro, número de pedidos ou faturamento, que dependem do negócio da CONTRATANTE.`
  },
  {
    id: "teste", titulo: "Período de teste", quando: (d) => d.testeGratis,
    texto: (d) => `A CONTRATANTE terá ${v(d.diasTeste, "[DIAS]")} dias corridos de teste gratuito, contados da entrega do site. Se não quiser continuar, basta avisar a CONTRATADA por escrito (WhatsApp ou e-mail) antes do fim do teste: nada será cobrado e o site será retirado do ar, permanecendo com a CONTRATADA. Se não houver aviso, a contratação segue nos termos deste contrato a partir do dia seguinte ao fim do teste.`
  },
  {
    id: "entrega", titulo: "Prazo de entrega e materiais", fixa: true,
    texto: (d) => `A CONTRATADA entregará o site em até ${v(d.prazoEntrega, "[PRAZO]")} dias úteis contados do recebimento de todo o material necessário (logotipo, fotos, textos, lista de produtos e preços, dados de contato e funcionamento).\nParágrafo primeiro. O atraso no envio do material ou nas respostas da CONTRATANTE suspende a contagem do prazo, sem qualquer responsabilidade para a CONTRATADA.\nParágrafo segundo. A CONTRATANTE terá 5 (cinco) dias úteis após a entrega para pedir ajustes no que foi combinado. Passado esse prazo sem manifestação, o site será considerado aprovado.`
  },
  {
    id: "valores", titulo: "Valores", fixa: true,
    texto: (d) => {
      const l = [];
      let n = 1;
      if (d.produto === "premium") l.push(`${n++}. Pela criação do site, a CONTRATANTE pagará ${dinheiro(d.valorCriacao)}, em parcela única, ${d.testeGratis ? "ao fim do período de teste, se decidir continuar" : "na entrega do site"}, salvo outra forma combinada por escrito.`);
      else l.push(`${n++}. O serviço "Catálogo digital" não tem taxa de criação.`);
      l.push(`${n++}. Pela hospedagem, manutenção e uso do sistema (plano "${plano(d)}"), a mensalidade é de ${dinheiro(d.valorMensal)}.`);
      const extras = [];
      if (d.pagamentoOnline) extras.push(`pagamento online no site: ${dinheiro(d.valorPagOnline)} por mês`);
      if (d.dominioProprio) extras.push(`domínio próprio (${v(d.dominio, "[DOMÍNIO]")}): ${dinheiro(d.valorDominio)} por mês, já incluída a renovação anual do domínio enquanto este contrato estiver em vigor`);
      const fx = parseInt(d.funcExtras, 10) || 0, ex = usaEntregadores(d) ? parseInt(d.entExtras, 10) || 0 : 0;
      if (fx) extras.push(`${fx} funcionário(s) além dos incluídos: ${dinheiro(d.valorExtra)} por mês cada`);
      if (ex) extras.push(`${ex} entregador(es) além dos incluídos: ${dinheiro(d.valorExtra)} por mês cada`);
      if (d.chatIA) extras.push(`atendimento com inteligência artificial (chat): ${dinheiro(d.valorChat)} por mês${d.limiteChat ? `, com limite de ${d.limiteChat} conversas por mês; acima disso, a CONTRATADA apresentará o valor da faixa seguinte antes de cobrar` : ""}`);
      if (extras.length) l.push(`${n++}. Somam-se à mensalidade os seguintes adicionais contratados:\n${extras.map((e, i) => `   ${String.fromCharCode(97 + i)}) ${e};`).join("\n")}`);
      l.push(`${n++}. A mensalidade total, com os adicionais, é de ${real(totalMensal(d))}, com vencimento todo dia ${v(d.diaVencimento, "[DIA]")}.`);
      l.push(`${n++}. Cada funcionário ou entregador além dos incluídos no plano, e cada adicional contratado depois, soma o valor correspondente à mensalidade a partir do mês seguinte ao pedido.`);
      l.push(`Parágrafo único. A primeira mensalidade vence ${d.testeGratis ? "no primeiro vencimento após o fim do período de teste" : "no primeiro vencimento após a entrega do site"}${d.inicio ? `, prevista para ${d.inicio}` : ""}.`);
      return l.join("\n");
    }
  },
  {
    id: "cobranca", titulo: "Cobrança, atraso e suspensão", fixa: true,
    texto: (d) => `A cobrança será feita pela plataforma de pagamentos Asaas, por Pix ou cartão de crédito (recorrente ou avulso), conforme a escolha da CONTRATANTE${d.formaPagamento ? ` (escolha atual: ${d.formaPagamento})` : ""}.\nParágrafo primeiro. Em caso de atraso, incidirão multa de 2% (dois por cento) sobre o valor em atraso, juros de 1% (um por cento) ao mês e correção monetária pelo IPCA.\nParágrafo segundo. Após o vencimento, haverá uma carência de ${v(d.carencia, "5")} dias, durante a qual a CONTRATANTE será avisada na área administrativa. Terminada a carência sem pagamento, o site e a área administrativa serão suspensos automaticamente: os clientes da CONTRATANTE verão apenas um aviso neutro de que o site está temporariamente indisponível, sem menção a débito, e o dono verá a tela de pagamento.\nParágrafo terceiro. O serviço é liberado automaticamente assim que o pagamento for confirmado pela plataforma.\nParágrafo quarto. A suspensão por atraso não interrompe a contagem das mensalidades nem da permanência mínima.`
  },
  {
    id: "notaFiscal", titulo: "Nota fiscal", quando: (d) => d.notaFiscal,
    texto: () => `A CONTRATADA emitirá a nota fiscal de serviço (NFS-e) dos valores recebidos, nos termos da legislação aplicável ao microempreendedor individual, enviando-a ao e-mail da CONTRATANTE.`
  },
  {
    id: "reajuste", titulo: "Reajuste", fixa: true,
    texto: () => `Os valores deste contrato serão reajustados a cada 12 (doze) meses, contados do início da cobrança, pela variação acumulada do IPCA (IBGE) no período. Se a variação for negativa, os valores permanecem os mesmos.`
  },
  {
    id: "atualizacoes", titulo: "Atualizações e alterações", fixa: true,
    texto: (d) => {
      const n = parseInt(d.atualizacoesMes, 10) || 0;
      const base = n
        ? `A mensalidade inclui ${n} (${n === 2 ? "duas" : n}) atualizações por mês, que não se acumulam para os meses seguintes.`
        : `A mensalidade não inclui atualizações. ${d.produto === "catalogo" ? "Produtos, fotos, preços, categorias, funcionamento e equipe são alterados pela própria CONTRATANTE, na área administrativa. " : ""}Mudanças feitas pela CONTRATADA (por exemplo, cores, logotipo, fontes, nome ou textos de apresentação) são cobradas à parte, a partir de ${dinheiro(d.valorAvulsa)} por atualização.`;
      return `${base}\nParágrafo primeiro. Cada pedido de alteração conta como uma atualização. Várias mudanças simples num mesmo pedido contam como uma só; se o pedido der mais trabalho, a CONTRATADA apresentará um valor maior antes de fazer, e só fará com a concordância da CONTRATANTE.\nParágrafo segundo. Pedidos feitos em dias diferentes contam como atualizações diferentes. Se a CONTRATADA ainda não tiver começado o pedido anterior, poderá juntar o novo pedido ao anterior, sem cobrança a mais, quando as mudanças forem simples.\nParágrafo terceiro. O prazo de cada atualização é de 7 (sete) a 14 (quatorze) dias.`;
    }
  },
  {
    id: "erros", titulo: "Correção de erros", fixa: true,
    texto: () => `A correção de erros (falhas no funcionamento do que foi entregue) e o atendimento de emergências (site fora do ar por problema técnico da CONTRATADA) estão sempre incluídos, sem custo, e não contam como atualização.\nParágrafo único. Não é erro: mudança de gosto, informação errada enviada ou cadastrada pela CONTRATANTE, novo recurso ou problema causado por terceiros (por exemplo, WhatsApp, provedores de internet, do domínio ou de pagamento).`
  },
  {
    id: "permanencia", titulo: "Permanência mínima", quando: (d) => (parseInt(d.permanencia, 10) || 0) > 0,
    texto: (d) => `A CONTRATANTE se compromete a manter este contrato por, no mínimo, ${v(d.permanencia, "[MESES]")} meses, contados da primeira mensalidade${d.produto === "catalogo" ? ", já que o serviço não tem taxa de criação e o trabalho inicial (configuração, visual e cadastro de produtos) é pago ao longo das mensalidades" : ""}.\nParágrafo único. Se a CONTRATANTE encerrar o contrato antes desse prazo, sem culpa da CONTRATADA, pagará multa de ${v(d.multaPermanencia, "[PERCENTUAL]")}% (por cento) das mensalidades que faltarem para completar a permanência mínima. A multa não se aplica se o encerramento for por falha grave da CONTRATADA não corrigida no prazo da cláusula de encerramento.`
  },
  {
    id: "equipe", titulo: "Acessos da equipe", quando: (d) => d.produto === "catalogo",
    texto: (d) => `O dono indicado pela CONTRATANTE administra os acessos da equipe: cria, altera e remove o acesso de funcionários${usaEntregadores(d) ? " e entregadores" : ""} e escolhe o que cada um pode ver e fazer.\nParágrafo primeiro. O plano inclui até ${v(d.funcIncluidos, "3")} funcionários${usaEntregadores(d) ? ` e até ${v(d.entIncluidos, "3")} entregadores` : ""} com acesso ativo ao mesmo tempo. Cada acesso a mais custa ${dinheiro(d.valorExtra)} por mês.\nParágrafo segundo. A CONTRATANTE responde pelos atos praticados com os acessos que criar e deve remover imediatamente o acesso de quem deixar de trabalhar com ela.`
  },
  {
    id: "pagamentoOnline", titulo: "Pagamento online no site", quando: (d) => d.pagamentoOnline,
    texto: (d) => `Com o adicional de pagamento online, os clientes da CONTRATANTE poderão pagar pelo site por meio da conta da própria CONTRATANTE na plataforma de pagamento escolhida (${v(d.provedorPagamento, "Mercado Pago ou InfinitePay")}), conectada ao site com autorização dela.\nParágrafo primeiro. O dinheiro das vendas vai direto para a conta da CONTRATANTE. A CONTRATADA não recebe, não guarda e não intermedia esses valores, e não tem acesso a dados de cartão dos clientes.\nParágrafo segundo. As tarifas, prazos de recebimento, estornos, chargebacks e regras da plataforma de pagamento são de responsabilidade da CONTRATANTE, na relação dela com essa empresa. A CONTRATADA não responde por recusas, bloqueios ou mudanças feitas pela plataforma.\nParágrafo terceiro. A CONTRATANTE pode desconectar a conta a qualquer momento, encerrando o adicional a partir do mês seguinte.`
  },
  {
    id: "correios", titulo: "Envio pelos Correios", quando: (d) => usaCorreios(d),
    texto: () => `Quando o site calcular frete por CEP (Correios ou transportadoras), o valor exibido é uma estimativa obtida de serviços de terceiros e pode variar no momento da postagem.\nParágrafo único. A embalagem, a postagem, a etiqueta, o envio do código de rastreio e a relação com os Correios ou transportadoras são de responsabilidade da CONTRATANTE, assim como eventuais diferenças de frete, extravios e devoluções.`
  },
  {
    id: "deveresCliente", titulo: "Responsabilidades da CONTRATANTE", fixa: true,
    texto: () => `Cabe à CONTRATANTE:\n1. fornecer informações verdadeiras e manter atualizados no site os preços, produtos, disponibilidade, horários, áreas, taxas e formas de entrega;\n2. ter direito de uso sobre logotipos, fotos, textos e marcas que enviar, inclusive fotos feitas por terceiros, respondendo sozinha por qualquer reclamação sobre esse material;\n3. cumprir as leis que valem para o seu negócio, inclusive o Código de Defesa do Consumidor nas vendas aos seus clientes, as regras sanitárias e as obrigações fiscais;\n4. atender os pedidos e os clientes, combinar e receber os pagamentos e fazer as entregas;\n5. guardar em sigilo as senhas e PINs da área administrativa, respondendo pelo que for feito com eles, e avisar a CONTRATADA se suspeitar de uso indevido;\n6. pagar os valores nos vencimentos.`
  },
  {
    id: "deveresStudio", titulo: "Responsabilidades da CONTRATADA", fixa: true,
    texto: () => `Cabe à CONTRATADA:\n1. entregar e manter o site funcionando conforme este contrato, com cuidado técnico e medidas de segurança adequadas;\n2. atender a CONTRATANTE por WhatsApp ou e-mail em dias úteis, em horário comercial, e com prioridade nos casos de site fora do ar;\n3. corrigir os erros, conforme a cláusula de correção de erros;\n4. manter sigilo sobre as informações da CONTRATANTE, conforme a cláusula de confidencialidade.`
  },
  {
    id: "pedidos", titulo: "Pedidos dos clientes da CONTRATANTE", fixa: true,
    texto: (d) => `O site monta o pedido do cliente e o encaminha para o WhatsApp da CONTRATANTE${d.pagamentoOnline ? " e, quando houver pagamento online, para a conta da CONTRATANTE na plataforma de pagamento" : ""}. A CONTRATADA não participa da venda.\nParágrafo único. Os números exibidos na área administrativa (quantidade e valor de pedidos) referem-se aos pedidos enviados pelos clientes e não representam valores efetivamente recebidos pela CONTRATANTE.`
  },
  {
    id: "disponibilidade", titulo: "Funcionamento e serviços de terceiros", fixa: true,
    texto: () => `O site depende de serviços de terceiros (hospedagem, registro de domínio, internet, WhatsApp, plataformas de pagamento e de frete, navegadores e aparelhos dos usuários). A CONTRATADA fará o possível para manter o site disponível, mas não pode garantir funcionamento ininterrupto, e não responde por falhas, mudanças ou interrupções causadas por esses terceiros ou por caso fortuito e força maior.\nParágrafo único. Paradas programadas para manutenção serão feitas, sempre que possível, em horário de menor movimento e com aviso prévio.`
  },
  {
    id: "limite", titulo: "Limite de responsabilidade", fixa: true,
    texto: () => `A responsabilidade da CONTRATADA por qualquer dano ligado a este contrato fica limitada ao valor total pago pela CONTRATANTE nos 12 (doze) meses anteriores ao fato, e não inclui lucros cessantes, perda de vendas ou danos indiretos, salvo em caso de dolo ou culpa grave.\nParágrafo único. Esta limitação vale na medida em que a lei permitir; se a CONTRATANTE for considerada consumidora, prevalecem as regras do Código de Defesa do Consumidor.`
  },
  {
    id: "propriedade", titulo: "Propriedade intelectual", fixa: true,
    texto: (d) => `O código, o sistema, os modelos, os componentes visuais e as animações desenvolvidos pela CONTRATADA continuam sendo de propriedade da CONTRATADA, que concede à CONTRATANTE o direito de uso do site enquanto este contrato estiver em vigor e em dia.\nParágrafo primeiro. O conteúdo enviado pela CONTRATANTE (logotipo, marca, fotos, textos, produtos e preços) continua sendo da CONTRATANTE.\n${d.produto === "catalogo" ? "Parágrafo segundo. O Catálogo digital é um modelo usado por vários clientes. A personalização (nome, logotipo, cores, conteúdo) é exclusiva da CONTRATANTE, mas a estrutura do modelo não é." : "Parágrafo segundo. A transferência do código do site personalizado, se a CONTRATANTE quiser, depende de acordo e orçamento à parte."}`
  },
  {
    id: "dominio", titulo: "Endereço do site e domínio", fixa: true,
    texto: (d) => d.dominioProprio
      ? `O domínio ${v(d.dominio, "[DOMÍNIO]")} será registrado em nome da CONTRATANTE (CPF ou CNPJ), com a CONTRATADA como responsável técnica enquanto este contrato estiver em vigor. Ao fim do contrato, a CONTRATADA entregará à CONTRATANTE o controle do domínio, desde que não haja valores em aberto.`
      : `O site ficará num endereço da CONTRATADA (por exemplo, ${v(d.siteEndereco, "nomedaloja.sitesm.com.br")}), que pertence à CONTRATADA e deixa de funcionar ao fim do contrato. Se a CONTRATANTE quiser domínio próprio, poderá contratá-lo a qualquer momento.`
  },
  {
    id: "portfolio", titulo: "Uso no portfólio", fixa: true,
    texto: () => `A CONTRATANTE autoriza o STUDIO MAGALHÃES a divulgar o site desenvolvido como parte de seu portfólio, durante a vigência deste contrato e após o seu término, incluindo imagens de tela, vídeos de navegação, link para o site, nome e marca da CONTRATANTE e descrição do trabalho, no site studiomagalhaes.com.br/negocios (inclusive como amostra navegável), em redes sociais e em propostas comerciais. A divulgação não incluirá dados pessoais de clientes da CONTRATANTE nem informações que ela indique como confidenciais, e eventual amostra navegável não processará pedidos reais.`
  },
  {
    id: "lgpd", titulo: "Proteção de dados (LGPD)", fixa: true,
    texto: () => `Em relação aos dados pessoais dos clientes da CONTRATANTE que passarem pelo site (como nome, telefone e endereço de entrega), a CONTRATANTE é a controladora e a CONTRATADA é a operadora, nos termos da Lei 13.709/2018 (LGPD).\nParágrafo primeiro. A CONTRATADA tratará esses dados apenas para prestar o serviço deste contrato, seguindo as instruções da CONTRATANTE, com medidas de segurança adequadas, e avisará a CONTRATANTE sobre qualquer incidente de segurança que possa afetá-los.\nParágrafo segundo. A CONTRATANTE é responsável por informar seus clientes sobre o uso dos dados e por atender aos pedidos deles.\nParágrafo terceiro. Ao fim do contrato, a CONTRATADA devolverá à CONTRATANTE, se pedido, uma cópia dos dados em planilha e depois os apagará, salvo o que a lei obrigar a guardar.`
  },
  {
    id: "chat", titulo: "Atendimento com inteligência artificial", quando: (d) => d.chatIA,
    texto: () => `O chat com inteligência artificial responde com base nas informações cadastradas pela CONTRATANTE e pode cometer erros. A CONTRATANTE deve manter essas informações corretas e conferir os pedidos e combinados importantes diretamente com o cliente.\nParágrafo único. A CONTRATADA não responde por respostas geradas a partir de informações incompletas ou desatualizadas, nem por mudanças nos serviços de inteligência artificial de terceiros.`
  },
  {
    id: "sigilo", titulo: "Confidencialidade", fixa: true,
    texto: () => `As partes manterão em sigilo as informações uma da outra a que tiverem acesso por causa deste contrato (dados de clientes, vendas, senhas e estratégias), durante a vigência e por 2 (dois) anos após o seu fim, salvo obrigação legal ou ordem judicial.`
  },
  {
    id: "vigencia", titulo: "Vigência e encerramento", fixa: true,
    texto: (d) => `Este contrato vale por prazo indeterminado a partir da assinatura${(parseInt(d.permanencia, 10) || 0) > 0 ? ", respeitada a permanência mínima" : ""}.\nParágrafo primeiro. Qualquer das partes pode encerrá-lo avisando a outra por escrito com ${v(d.avisoPrevio, "[DIAS]")} dias de antecedência.\nParágrafo segundo. Qualquer das partes pode encerrá-lo de imediato se a outra descumprir este contrato e não corrigir o problema em até 10 (dez) dias após ser avisada por escrito.\nParágrafo terceiro. No encerramento: os valores em aberto continuam devidos; o site e a área administrativa saem do ar; a CONTRATADA entrega, se pedido em até 30 (trinta) dias, uma cópia em planilha dos produtos e pedidos cadastrados; e vale o que está na cláusula do domínio.`
  },
  {
    id: "comunicacao", titulo: "Comunicação entre as partes", fixa: true,
    texto: () => `As mensagens por WhatsApp e e-mail para os contatos indicados neste contrato valem como comunicação oficial entre as partes, inclusive para avisos, pedidos de alteração e aprovações. Cada parte deve avisar a outra se mudar de contato.`
  },
  {
    id: "assinatura", titulo: "Assinatura eletrônica", fixa: true,
    texto: () => `As partes reconhecem como válida a assinatura deste contrato por meio eletrônico, inclusive pela plataforma gov.br, nos termos da Medida Provisória 2.200-2/2001 e da Lei 14.063/2020, com a mesma validade de um contrato assinado em papel.\nParágrafo único. Assinado eletronicamente com integridade conferida pelo provedor de assinatura, este contrato dispensa a assinatura de testemunhas para valer como título executivo, conforme o Código de Processo Civil, na redação dada pela Lei 14.620/2023.`
  },
  {
    id: "gerais", titulo: "Disposições gerais", fixa: true,
    texto: () => `1. A tolerância de uma parte com o descumprimento da outra não significa renúncia nem alteração deste contrato.\n2. Se alguma cláusula for considerada inválida, as demais continuam valendo.\n3. Alterações neste contrato só valem se combinadas por escrito.\n4. Este contrato não cria vínculo de emprego, sociedade ou representação entre as partes.`
  },
  {
    id: "foro", titulo: "Foro", fixa: true,
    texto: (d) => `Fica eleito o foro da comarca de ${v(d.cidadeForo, "Niterói/RJ")} para resolver qualquer questão sobre este contrato. Se a CONTRATANTE for considerada consumidora, ela poderá optar pelo foro do seu domicílio.`
  }
];
