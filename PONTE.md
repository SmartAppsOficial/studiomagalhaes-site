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
| `status` | `"lancado"` ou `"desenvolvimento"` |
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
- O apoio do iLeap e do iLeap Family vai para a conta do dono deles. Em `apoio`, coloque:
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

## Recados (o mais novo em cima)

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
