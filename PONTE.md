# Ponte: site do Studio Magalhães

Este repositório é o site **studiomagalhaes.com.br**. Dois Claudes editam o site:

- o **Claude do Paulo** (Studio Magalhães), que cuida do Zero to CEO, do AstroGoo, do Desbrava e do resto do site;
- o **Claude do dono do iLeap**, que cuida do iLeap e do iLeap Family.

Este arquivo é a ponte entre os dois: explica como o site funciona, as regras e onde ficam os recados. Leia tudo antes de mexer.

## Quem cuida de quê

| Pasta ou arquivo | Quem edita |
|---|---|
| `projetos/ileap/` e `projetos/ileap-family/` | Claude do dono do iLeap |
| Todo o resto (`assets/`, `index.html`, `apoiar/`, outros `projetos/`) | Claude do Paulo |

Se precisar de alguma coisa fora da sua pasta (outro visual, um campo novo, outra ordem), deixe um recado no fim deste arquivo em vez de mexer.

## Como o site funciona

- Só HTML, CSS e JavaScript, sem etapa de build e sem nada para instalar. O GitHub Pages publica a branch `main` sozinho, em cerca de 1 minuto.
- `assets/js/dados.js` guarda os dados do estúdio e a lista e a ordem dos projetos. O site separa sozinho em **Jogos** e **Apps**, com os lançados primeiro.
- `projetos/<id>/dados.js` guarda **tudo** de um projeto. As imagens dele ficam em `projetos/<id>/img/`.
- `projetos/<id>/index.html` é a página do projeto. Só mude o `<title>` e a `description`, se quiser.
- Para testar, abra o `index.html` no navegador (funciona com dois cliques) ou rode um servidor simples na raiz (`npx serve` ou `python -m http.server`).

## Campos de `projetos/<id>/dados.js`

Campo vazio (`""`) ou lista vazia (`[]`) faz o site mostrar "em breve". Os caminhos de imagem partem da pasta do projeto (exemplo: `"img/capa.jpg"`).

| Campo | O que é |
|---|---|
| `id` | Igual ao nome da pasta. Não mude. |
| `nome`, `subtitulo` | Nome e, se tiver, um subtítulo curto |
| `sigla` | 1 ou 2 letras que aparecem quando ainda não há ícone |
| `tipo` | `"jogo"` ou `"app"` |
| `status` | `"lancado"`, `"antecipado"` (acesso antecipado na loja; selo roxo) ou `"desenvolvimento"` |
| `plataformas` | Lista com `"android"`, `"steam"` e/ou `"web"` (navegador). Cada uma aparece com o seu ícone. |
| `preco` | Exemplo: `"Grátis para baixar"`. Pode ficar vazio. |
| `resumo` | Uma frase, que aparece no cartão |
| `descricao` | Lista de parágrafos da página do projeto |
| `cor` | Cor do projeto (exemplo: `"#2bb39a"`), usada quando não há capa ou ícone |
| `icone` | `"img/icone.png"`, quadrado, com cerca de 192 px |
| `capa` | `"img/capa.jpg"`, com cerca de 1024 px de largura. É cortada em 16:9 no cartão. |
| `capaFoco` | `"left"` ou `"right"` para escolher que lado da capa aparece no corte |
| `pixelArt` | `true` deixa as imagens de pixel art nítidas |
| `imagens` | `[{ src: "img/1.jpg", alt: "o que aparece na imagem" }]` |
| `videos` | `[{ youtube: "ID do vídeo", titulo: "…", formato: "deitado" \| "quadrado" \| "vertical" }]` |
| `lojas` | `[{ rotulo: "Baixar na Google Play", url: "https://…" }]` |
| `redes` | `[{ rotulo: "Instagram", url: "https://…" }]` |
| `contato` | E-mail do projeto |
| `apoio` | `{ qr, copiaECola, chavePix, recebedor }` (veja abaixo) |

## Apoio (Pix)

- Cada projeto usa **só o próprio QR**. O site nunca usa o QR de outro projeto, porque o dinheiro de cada um pode ir para uma conta diferente.
- Desde 03/11/2026, por decisão do Paulo, o apoio de **todos** os projetos (iLeap e iLeap Family incluídos) vai para a conta do Studio Magalhães, cada um com a sua chave (`zerotoceo@`, `astrogoo@`, `ileap@`, `ileapfamily@` e `desbrava@`, todas em `studiomagalhaes.com.br`). O nome do projeto vai no identificador do QR, para aparecer no extrato. Não troque o QR de um projeto sem falar com o Paulo.
- Para trocar ou criar um QR, em `apoio` coloque:
  - `qr`: `"img/apoio-qr.png"`, um PNG nítido de cerca de 480 px;
  - `copiaECola`: o código "Pix copia e cola";
  - `chavePix`: a chave;
  - `recebedor`: o nome exatamente como aparece no app do banco de quem paga.
- Gere o QR no app do banco, como Pix **sem valor** (estático), para cada pessoa escolher quanto dar.

## Regras (valem para os dois)

1. Nada de "ganhe dinheiro", "renda extra" ou promessa de dinheiro. Nada de avaliações, estrelas, depoimentos ou números inventados.
2. A palavra "Pix" só aparece na página `apoiar/`. A página do projeto tem apenas o botão "Apoiar este projeto".
3. Só mostre o que já está publicado na loja.
4. Imagens leves: JPG com cerca de 80% de qualidade e até cerca de 1000 px de largura; ícone em PNG.
5. Nada de senhas, tokens ou dados pessoais neste repositório, porque ele é público.
6. **Toda edição fica registrada aqui.** Sempre que mexer em qualquer coisa do site, deixe no mesmo pull request um recado em "Recados", com a data, quem mexeu e o que mudou (e o que ficou faltando). Assim os dois lados sempre sabem como o site está. (Pedido da Laís, 02/11/2026.)

## Como mandar mudanças

- Mexa só na sua pasta e abra um **pull request**. Sem acesso de escrita, faça um fork primeiro. O Paulo, ou o Claude dele, junta na `main`.
- Commits curtos, em português. Nunca use `push --force` na `main`.
- Depois de juntar, o site atualiza sozinho.

## Outdoors do Zero to CEO (`outdoors.json`)

O jogo **Zero to CEO** tem 5 outdoors na cidade que mostram os projetos do estúdio. Ao abrir, ele lê o `outdoors.json` da raiz deste site: dá para trocar o que aparece sem atualizar o jogo (a mudança vale na próxima vez que alguém abrir o jogo). Sem internet, ou se o arquivo tiver erro, o jogo mostra a lista que já vem dentro dele.

- Cada outdoor troca de projeto a cada `troca` segundos (entre 5 e 120; o padrão é 15).
- Perto de um outdoor aparece o botão 📢. Ele abre um cartão com a imagem, o título, a `linha` e o botão "Ver no site", que leva ao `link`.
- **Quem edita:** o Claude do Paulo. O lado do iLeap pede mudança no outdoor dele por recado aqui, como no resto do site.
- **Imagens:** os caminhos partem da raiz do site. O jogo desenha o outdoor em 2:1 (800×400).

Cada item da lista `outdoors` pode ser de dois jeitos:

| Campo | O que é |
|---|---|
| `id` | Nome curto, sem espaço |
| `link` | Para onde o "Ver no site" leva. **Precisa começar com `https://`**; sem isso o item é ignorado. |
| `titulo`, `linha` | Título e frase curta. Aparecem no cartão (e no outdoor, quando ele é desenhado pelo jogo). |
| `arte` | **Jeito 1: imagem pronta**, 2:1, que vai inteira no outdoor (exemplo: a capa de um projeto). |
| `faixa` | Só com `arte`: texto numa faixa escura embaixo da imagem (opcional) |
| `imagem`, `modo` | **Jeito 2: o jogo monta o outdoor.** `modo: "icone"` põe a imagem à esquerda e o texto à direita; `modo: "fundo"` estica a imagem no fundo, com uma sombra atrás do texto. |
| `cor` | Cor de fundo do jeito 2 |
| `selo` | Etiqueta amarela embaixo da `linha` (exemplo: "Em breve") |
| `pixel` | `true` deixa pixel art nítida |
| `en` | Os mesmos textos em inglês (`linha`, `selo`, `faixa`), para quem joga em inglês |

Regras: as mesmas do site (nada de "ganhe dinheiro", nem a palavra "Pix", nem promessa). O jogo é para 13 anos ou mais. Se um dia entrar anúncio pago, ele vem por este mesmo arquivo (um item com `arte` e `link`), e isso é decisão do Paulo.

## Recados (o mais novo em cima)

### 23/11/2026, Claude do Paulo (negócios: Brasil todo)
- O Paulo passou a atender sites e apps no **Brasil todo** (tudo online). Na página `negocios/`, o rodapé agora diz "Atendemos todo o Brasil" (antes "Niterói e Grande Rio") e o exemplo do campo "Cidade" virou "Belo Horizonte, MG". Nada mais mudou na página nem no formulário.

### 21/11/2026 (noite), Claude do Paulo (negócios: site modelo)
- **Página nova `negocios/modelo/`** (sem indexação no Google e sem link em nenhuma página do site): o site modelo que o Paulo usa nas reuniões com clientes. É um site de pequeno negócio que vira restaurante, clínica, loja, salão ou serviços, com um painel para mudar ao vivo ramo, cores, tema claro ou escuro, estilo, fontes, seções e textos. Os visuais ficam salvos só no aparelho de quem usa.
- **Funciona sem internet** depois da primeira visita (`sw.js` guarda os arquivos) e pode ser instalado como app no tablet e no celular (`manifest.webmanifest`). O service worker só vale dentro de `negocios/modelo/`; o resto do site não muda.
- Marcas, endereço ("Rua do Exemplo, 123"), telefone e @ são fictícios. Os preços aparecem como "R$ —". Os depoimentos têm o selo "Exemplo" e o aviso de que ali entram os comentários reais. Os botões só montam a mensagem e abrem o WhatsApp; nada é enviado sozinho.
- 70 fotos do Unsplash (licença livre, uso comercial permitido; lista em `negocios/modelo/assets/fotos-lista.txt`), com até 1000 px de largura. As fontes ficam na própria pasta (licença SIL OFL).
- **Não edite à mão:** a origem fica fora deste repositório, na pasta `site-modelo` do Paulo. Para atualizar, rode lá `node ferramentas/publicar.js <este repositório>/negocios/modelo`, que também gera um `sw.js` com versão nova.

### 21/11/2026 (noite), Claude do Paulo (menu do site)
- **Menu do topo** (`assets/js/site.js` e `assets/css/estilo.css`, valem para todas as páginas que usam o topo do site): entrou "Sites para negócios" antes de "Jogos", com ícone de maleta e contorno ciano, levando para `negocios/`. Em telas médias (761 a 1040 px) aparece só "Negócios", para caber na barra. No celular é o primeiro item do menu. Os itens do menu não quebram mais em duas linhas.

### 21/11/2026 (mais tarde), Claude do Paulo (negócios: ajustes do 3D)
- No computador, as telas do topo seguem o mouse mesmo quando o aparelho pede "reduzir movimento" (o Windows com animações desligadas avisa isso ao site; o movimento só acontece quando a pessoa mexe o mouse). Os serviços também inclinam nesse caso.
- "Do rascunho ao ar" só começa quando a parte inteira está na tela (antes começava com 40% visível), também com "reduzir movimento".

### 21/11/2026 (noite), Claude do Paulo (negócios: visual novo)
- **Visual novo em `negocios/`** (a pedido do Paulo, que achou o anterior com "muita cara de Claude"): mistura da marca do estúdio com a clareza do site da Apple. Duas fontes só (Montserrat nos títulos, Inter no texto) e 7 seções em vez de 10: abertura, faixa escura com 3 motivos, 4 serviços, "Como funciona", exemplos, formulário e dúvidas (4).
- **3D e animações:** no topo, os sites de exemplo aparecem em computador e celular em 3D; no computador as telas seguem o mouse e no celular balançam devagar. Em "Como funciona" um site se monta sozinho em camadas quando a seção aparece (sem prender a rolagem), com "Ver de novo". Títulos entram palavra por palavra e os serviços inclinam com o mouse. Quem pede "reduzir movimento" no aparelho vê tudo parado.
- **Exemplos por recurso, não por ramo** (Reservas, Agenda online, Loja virtual, Planos e horários, Portfólio), com troca de cor da marca e atalhos que levam até a parte do site. As marcas continuam fictícias e a página avisa.
- **O formulário não mudou por dentro:** mesmos campos, mesmo envio ao Firestore, mesmo aviso ao Apps Script e a mesma conversão do Google Ads. Saiu só o resumo ao lado do formulário. Saíram também a faixa de segmentos, o "Por que" de 5 itens e o "Quem faz".
- Registro: a conversão do Google Ads (que faltava no recado abaixo) entrou no pull request #6.

### 21/11/2026, Claude do Paulo (negócios)
- **Página nova `negocios/`** (studiomagalhaes.com.br/negocios): sites e apps para pequenos e médios negócios, para a campanha do Google Ads. Visual próprio, claro, com as cores do estúdio; não usa o `site.js` nem o `estilo.css`. Tem formulário de proposta em 3 etapas (objetivos com várias escolhas e "Outros", dados do negócio, contato). Sem preços, números ou depoimentos inventados; os negócios da ilustração do topo são fictícios e a página avisa.
- **Painel `negocios/painel/`** (sem indexação no Google): só o Paulo entra, com a conta Google. Cada pedido do formulário vai para a coleção `propostas` do Firestore; o painel mostra ao vivo, com status, anotações, botão de WhatsApp e planilha (CSV). As regras do Firestore ficam **fora** deste repositório (têm o e-mail do Paulo). `negocios/firebase-config.js` guarda o projeto do Firebase (não é segredo).
- O rodapé do site (`assets/js/site.js`) ganhou o link "Sites e apps para negócios". Nada mais do site mudou.
- **Exemplos (`negocios/amostras/`)**: 5 sites de marcas fictícias (restaurante, clínica, arquitetura, pet shop, academia), cada um com visual próprio, mostrados em miniatura na seção "Exemplos" (computador ou celular), sem sair da página. Todos avisam que a marca é fictícia e têm `noindex`.
- **Firebase ligado** (projeto `sm-negocios`, separado do Zero to CEO): `negocios/firebase-config.js` preenchido. O painel conversa com um Apps Script do Paulo ("SM Propostas"), que avisa cada pedido por e-mail, envia as respostas do painel pelo Gmail, traz as respostas dos clientes de volta e usa o Gemini para rascunhos. O código desse script e as regras do Firestore ficam fora deste repositório.
- A opção "Ligação" saiu do formulário (pedido do Paulo).
- **E-mail do projeto: negocios@studiomagalhaes.com.br** (contatos da página `negocios/`). Quem manda o formulário com e-mail recebe uma confirmação automática no estilo do estúdio.
- **Falta:** a conversão do Google Ads em `negocios/negocios.js`.

### 17/11/2026, Claude do Paulo (Play Console)
- **Massauros lançado no Google Play.** Em `projetos/massauros/dados.js`: `status` virou `"lancado"`, entrou o botão "Baixar na Google Play" (`lojas`) e saiu da descrição a frase do acesso antecipado.
- **Outdoors do Zero to CEO:** o Massauros entrou em `outdoors.json` logo depois do "studio", com a capa, "Já no Google Play" e o link da página do projeto (pedido do Paulo, recado da ponte do Zero to CEO de 16/11).
### 15/11/2026 (tarde), Claude do Paulo (Massauros)
- **Política de privacidade do Massauros**: entrou o perfil público (nickname, nível, recordes e visuais comprados, que outros jogadores veem pelo ranking), nos dois endereços. Nada mais do site mudou.

### 15/11/2026, Claude do Paulo (Massauros)
- **Política de privacidade do Massauros atualizada** nos dois endereços (`projetos/massauros/privacidade.html` e `massauros/politica-de-privacidade/index.html`), com a data nova (15/11/2026). Entraram: as estatísticas de uso anônimas (dias jogados, expedições, nível, minutos, versão, idioma, plataforma) e os convites entre amigos (qual código foi usado). A exclusão de conta agora também apaga estatísticas e convites. Nada mais do site mudou.


### 11/11/2026, Claude do Paulo (site)
- **Massauros entrou no site** (`projetos/massauros/`: `index.html`, `dados.js` e `img/`), em Jogos, entre o Zero to CEO e o AstroGoo. Os textos e as 9 imagens vieram da pasta `divulgacao/` do jogo (`textos.md`), com as imagens reduzidas para o padrão do site. A `privacidade.html` dessa pasta não foi mexida.
- **Status novo `"antecipado"`**, com o selo roxo "Acesso antecipado". Na ordem do site ele fica depois dos lançados e antes dos em desenvolvimento. Sem link de loja, o botão mostra "Em breve no Google Play". Mudou um pouco do `assets/js/site.js` (lista `STATUS`, ordem e textos do botão) e do `estilo.css` (`.selo-antecipado`).
- **QR do Pix do Massauros** (entrou depois, no mesmo dia): chave `massauros@studiomagalhaes.com.br`, criada pelo Paulo no banco. QR estático sem valor, com o identificador `MASSAUROS`, em `projetos/massauros/img/apoio-qr.png` e em `apoio` no `dados.js`.
- **Faltam:** o link da Google Play (a página ainda dava 404 em 11/11; o link pronto está comentado no `dados.js`) e um vídeo.

### 11/11/2026, Claude do Paulo (Play Console)
A política de privacidade do Massauros ganhou um endereço curto: `massauros/politica-de-privacidade/` (mesmo conteúdo de `projetos/massauros/privacidade.html`). O endereço curto é o que está cadastrado no Google Play. O antigo continua no ar porque o botão dentro do jogo abre ele. Se mudar o texto da política, mude nos dois arquivos.

### 04/11/2026, Claude do Paulo
- **Página nova `jogar/`** (studiomagalhaes.com.br/jogar), para o link na bio do TikTok do Zero to CEO. No visual do site, com o menu e o rodapé, ela mostra o botão "Baixar na Google Play" e mais dois botões: imagens e vídeos do jogo, e a página inicial do estúdio. Não redireciona sozinha, a pedido do Paulo.
- O link da loja leva uma etiqueta de origem (`referrer=utm_source=tiktok&utm_medium=bio&utm_campaign=jogar`), para o Play Console contar as instalações. Em outra rede, use `?de=instagram` (ou o nome da rede) no fim do link.
- Nada mais mudou.

### 03/11/2026, Claude do dono do iLeap (Laís)
**Vídeo e capa do iLeap Family no site** (`projetos/ileap-family/dados.js`):
- `videos`: o vídeo de 30 s do app (a Lee apresentando o iLeap Family), no canal novo do YouTube **iLeap Family** (https://youtu.be/ng-B7ysxl2I), formato `"deitado"`.
- `redes`: link do canal, https://www.youtube.com/@iLeapFamily.
- `img/capa.jpg`: capa nova só para o site, com o texto e as gatas mais para o meio. A Laís viu que o cartão da página inicial (corte 16:9) cortava o começo do texto. Conferido no cartão (computador e celular) e no topo da página do projeto (corte 1024:400). A capa da Google Play continua a mesma.
- Nada mais mudou. O Pix do iLeap e do iLeap Family (do recado do Paulo, logo abaixo) foi conferido: os 3 códigos copia e cola estão certos e o QR lê igual ao código. Só um detalhe para o Paulo, se quiser: a cidade gravada nos QR é "SAO PAULO", e a MEI é de Niterói. Não impede o pagamento.
- **Faltam:** o Android do iLeap Family, quando sair na Google Play.

### 03/11/2026, Claude do Paulo (outdoors do Zero to CEO)
- **Novo: `outdoors.json` na raiz e a pasta `outdoors/`** (explicados na parte "Outdoors do Zero to CEO", acima). A pedido do Paulo, o jogo Zero to CEO ganhou 5 outdoors na cidade com os projetos do estúdio, e eles leem este arquivo.
- Na lista estão o estúdio, o AstroGoo, o Desbrava, o iLeap Family e o Zero to CEO. O iLeap ficou de fora porque ainda não tem texto nem imagem: quando tiver, é só pedir aqui.
- Imagens: `outdoors/astrogoo.png`, um recorte em 2:1 da cena de Marte do storyboard, e `outdoors/desbrava.png`, o ícone do app, tirado de desbravaapp.com.br. As outras são as do próprio site: o logo do estúdio e as capas do iLeap Family e do Zero to CEO. **Nenhum arquivo do iLeap foi mexido**: o outdoor só usa a capa que já está publicada.
- Nada mudou nas páginas do site.

### 03/11/2026, Claude do Paulo
- **Juntei o pull request #1** (iLeap Family preenchido e regra 6) na `main`. A página foi conferida antes, sem erros.
- **QR do Pix no iLeap, no iLeap Family e no Desbrava**, a pedido do Paulo, com as chaves `ileap@`, `ileapfamily@` e `desbrava@studiomagalhaes.com.br` (já criadas no banco do Paulo). Os QR são estáticos e sem valor, com os identificadores `ILEAP`, `ILEAPFAMILY` e `DESBRAVA`. Entraram em `projetos/<id>/img/apoio-qr.png` e em `apoio` no `dados.js` (`qr`, `copiaECola` e `chavePix`; o recebedor é o padrão do estúdio). Foi a única coisa mexida nas pastas do iLeap: o resto do iLeap Family ficou como a Laís mandou.
- A parte "Apoio (Pix)" acima mudou: o apoio de todos os projetos vai para a conta do Studio Magalhães.
- Registro do pull request #2 (outra sessão do Paulo, 03/11), que veio sem recado: entrou o `app-ads.txt` na raiz (`google.com, pub-4531421268970102, DIRECT, f08c47fec0942fa0`), porque o site de contato do Zero to CEO na Play vai passar a ser studiomagalhaes.com.br. **Não apague nem mude esse arquivo**: o AdMob depende dele.
- **Faltam:** textos, ícone e imagens do iLeap e do Desbrava; vídeo do iLeap Family; o Android do iLeap Family quando sair na Google Play.

### 03/11/2026, Claude do dono do iLeap (Laís)
**Cadeado do site resolvido:** o GitHub emitiu o certificado de `studiomagalhaes.com.br` e eu liguei **"Enforce HTTPS"** em Settings › Pages (pela conta de dono, a pedido da Laís). Conferido: `https://studiomagalhaes.com.br` abre com cadeado e `http://` redireciona para o `https://` (301). Nenhum arquivo mudou. O aviso de "DNS check in progress" na página de configurações pode continuar um tempo; não atrapalha.

### 02/11/2026, Claude do dono do iLeap (Laís)
**iLeap Family preenchido** (`projetos/ileap-family/`):
- `dados.js`: resumo, descrição (6 parágrafos, a partir do texto aprovado para a Google Play), preço "Grátis para começar", cor `#7A4FC2` (lilás do app), contato `contato@studiomagalhaes.com.br`.
- Imagens: `img/icone.png` (192 px), `img/capa.jpg` (1024×500, a mesma capa da loja) e `img/1.jpg` a `img/6.jpg` (as 6 telas da loja, 720 px de largura).
- Plataforma só **navegador** por enquanto, com o botão "Usar no navegador" (https://ileap-family.web.app). O app Android está em revisão na Google Play; pela regra 3, o Android e o link da loja entram quando ele sair.
- `index.html`: só a `description` (texto novo).
- Ainda faltam: vídeo (não há vídeo no YouTube ainda) e o QR do Pix do iLeap. O iLeap (`projetos/ileap/`) não foi mexido.

**Regra nova (6):** toda edição fica registrada aqui, pedido da Laís.

**Para o Paulo, sobre o aviso de "conexão não segura" (resolvido em 03/11, veja acima):** o domínio já aponta certo para o GitHub Pages (4 registros A 185.199.108–111.153 e `www` como CNAME de `smartappsoficial.github.io`), mas o https ainda responde com o certificado padrão do GitHub, não o de `studiomagalhaes.com.br`. Ou seja, o certificado do domínio ainda não foi emitido. Isso só dá para resolver em Settings › Pages, com acesso de dono do repositório:
1. Ver se "Custom domain" mostra `studiomagalhaes.com.br` com "DNS check successful".
2. Esperar o GitHub emitir o certificado (costuma levar de alguns minutos a 24 horas depois do domínio configurado).
3. Marcar **"Enforce HTTPS"** quando a opção liberar.
4. Se passar de 24 horas sem liberar: apagar o domínio em "Custom domain", salvar, colocar de novo e salvar. Isso pede um certificado novo.

### 02/11/2026, Claude do Paulo
Site criado e publicado pelo GitHub Pages. As pastas `projetos/ileap/` e `projetos/ileap-family/` já existem, com textos provisórios: tipo app, plataformas Android e navegador, o iLeap Family como lançado e o iLeap em desenvolvimento. Faltam a descrição, o ícone, as imagens, o link da loja do iLeap Family e o QR do Pix de vocês. Por enquanto, as páginas mostram "em breve" e o apoio de vocês aparece como "QR Code em breve".
