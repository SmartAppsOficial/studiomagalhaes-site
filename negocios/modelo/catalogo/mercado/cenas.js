/* 10 animações 3D exclusivas do ramo: Mercado, mercearia e hortifrúti */
(() => {
  'use strict';
  const K = window.CenaKit;
  const C = K.camada, S = K.svg3d, SM = K.sombra;
  const soltosMerc = () => K.soltosPadrao(K.folha('#4aa146'), K.tomate(), K.limao(), K.estrela());

  window.CENAS = {
    carrinho() {
      return {
        principal: S(SM(156, 16, 368) +
          C(5, 0, `<circle cx="144" cy="340" r="22" fill="#2c3540"/><circle cx="144" cy="340" r="10" fill="#fff"/>
            <circle cx="286" cy="340" r="22" fill="#2c3540"/><circle cx="286" cy="340" r="10" fill="#fff"/>
            <path d="M54 96h38l38 192h182" fill="none" stroke="#cfd8e3" stroke-width="14" stroke-linecap="round" stroke-linejoin="round"/>`) +
          C(9, .25, `<circle cx="164" cy="148" r="32" fill="#e63946"/><circle cx="216" cy="136" r="36" fill="#6cc43f"/><rect x="246" y="102" width="46" height="84" rx="10" style="fill:var(--d)"/><ellipse cx="146" cy="176" rx="28" ry="18" fill="#ffe066"/>`) +
          C(15, .55, `<path d="M98 156h236l-24 114H122z" style="fill:var(--p)" opacity=".92"/>
            <g stroke="#fff" stroke-opacity=".45" stroke-width="5"><path d="M110 192h212M118 230h198M166 156l8 114M224 156v114M282 156l-8 114"/></g>`)),
        soltos: soltosMerc()
      };
    },

    hortifruti() {
      return {
        principal: S(SM(162, 16, 368) +
          C(5, 0, `<path d="M62 204h276l-28 134q-6 18-26 18H116q-20 0-26-18z" fill="#c48543"/><rect x="52" y="192" width="296" height="24" rx="12" fill="#d99a52"/>`) +
          C(10, .3, `<circle cx="132" cy="166" r="42" fill="#6cc43f"/><circle cx="204" cy="146" r="46" fill="#46962e"/><circle cx="268" cy="172" r="38" fill="#f59e0b"/>`) +
          C(15, .6, `<circle cx="152" cy="192" r="28" fill="#e63946"/><circle cx="226" cy="194" r="28" fill="#e63946"/><path d="M244 134c18-16 42-16 54 6-18 16-42 16-54-6z" fill="#ffe066"/>`)),
        soltos: soltosMerc()
      };
    },

    sacola() {
      return {
        principal: S(SM(146, 16, 368) +
          C(5, 0, `<path d="M138 148v-28a62 62 0 0 1 124 0v28" fill="none" style="stroke:var(--d)" stroke-width="14" stroke-linecap="round"/>`) +
          C(10, .3, `<ellipse cx="148" cy="144" rx="34" ry="52" transform="rotate(-14 148 144)" fill="#df9132"/><circle cx="236" cy="134" r="34" fill="#6cc43f"/><rect x="184" y="96" width="44" height="68" rx="10" fill="#fff"/>`) +
          C(15, .6, `<path d="M84 156h232l18 184q2 18-18 18H84q-20 0-18-18z" style="fill:var(--p)"/>
            <circle cx="200" cy="256" r="38" style="fill:var(--d)"/><path d="M186 256c10-18 28-18 32-4-12 16-24 16-32 4z" fill="#fff"/>`)),
        soltos: soltosMerc()
      };
    },

    feira() {
      return {
        principal: S(SM(164, 16, 368) +
          C(6, 0, `<circle cx="128" cy="156" r="38" fill="#6cc43f"/><circle cx="198" cy="140" r="42" fill="#e63946"/><circle cx="268" cy="156" r="38" fill="#f59e0b"/><ellipse cx="164" cy="176" rx="34" ry="20" fill="#ffe066"/>`) +
          C(13, .4, `<rect x="52" y="182" width="296" height="164" rx="16" fill="#b97837"/>
            <rect x="64" y="196" width="272" height="36" rx="8" fill="#d99a52"/><rect x="64" y="246" width="272" height="36" rx="8" fill="#d99a52"/><rect x="64" y="296" width="272" height="36" rx="8" fill="#d99a52"/>
            <rect x="148" y="242" width="104" height="44" rx="10" style="fill:var(--p)"/>`)),
        soltos: soltosMerc()
      };
    },

    frutas() {
      return {
        principal: S(SM(158, 16, 368) +
          C(6, 0, `<circle cx="144" cy="244" r="68" fill="#f59e0b"/><circle cx="262" cy="246" r="64" fill="#e63946"/>`) +
          C(11, .35, `<path d="M116 146c56-40 132-24 164 26-48 24-116 24-164-26z" fill="#ffe066"/><circle cx="200" cy="186" r="44" fill="#8bc34a"/><circle cx="200" cy="186" r="32" fill="#dcedc8"/>`) +
          C(16, .65, `<g fill="#6b238c"><circle cx="182" cy="262" r="18"/><circle cx="210" cy="262" r="18"/><circle cx="196" cy="286" r="18"/><circle cx="196" cy="240" r="18"/></g>`)),
        soltos: soltosMerc()
      };
    },

    balanca() {
      return {
        principal: S(SM(154, 16, 368) +
          C(5, 0, `<rect x="76" y="226" width="248" height="128" rx="22" style="fill:var(--p)"/><rect x="112" y="254" width="176" height="58" rx="12" fill="#102018"/><rect x="132" y="274" width="96" height="18" rx="6" style="fill:var(--d)"/>`) +
          C(10, .3, `<rect x="184" y="182" width="32" height="48" fill="#cfd8e3"/><path d="M74 166h252l-24 24H98z" fill="#e6eef5"/>`) +
          C(15, .6, `<circle cx="152" cy="134" r="34" fill="#e63946"/><circle cx="212" cy="126" r="38" fill="#6cc43f"/><circle cx="258" cy="140" r="30" fill="#f59e0b"/>`)),
        soltos: soltosMerc()
      };
    },

    acougue() {
      return {
        principal: S(SM(164, 16, 368) +
          C(5, 0, `<rect x="44" y="136" width="312" height="202" rx="34" fill="#9c6131"/><rect x="60" y="150" width="280" height="174" rx="24" fill="#b9783e"/>`) +
          C(11, .35, `<path d="M98 206c24-44 128-56 178-16s36 102-36 116-132-8-146-54c-6-18-4-32 4-46z" fill="#c73838"/>
            <path d="M126 210c28-24 96-30 132-6 18 14 14 58-24 68-42 10-96-4-108-34z" fill="#a82626"/>
            <path d="M138 220c24 14 68 18 106 4M154 246c22 10 56 10 86-2" stroke="#f7dede" stroke-width="5" stroke-linecap="round" fill="none" opacity=".75"/>`) +
          C(16, .65, `<path d="M254 274c18-16 42-14 48 4-16 14-36 14-48-4z" fill="#46962e"/>`)),
        soltos: soltosMerc()
      };
    },

    cesta() {
      return {
        principal: S(SM(162, 16, 368) +
          C(5, 0, `<rect x="64" y="182" width="272" height="168" rx="18" fill="#d9a466"/><rect x="54" y="168" width="292" height="28" rx="10" fill="#e5b87c"/>
            <rect x="136" y="240" width="128" height="48" rx="12" style="fill:var(--p)"/>`) +
          C(11, .35, `<rect x="88" y="92" width="66" height="90" rx="12" fill="#fffaf3"/><rect x="164" y="76" width="72" height="106" rx="12" style="fill:var(--d)"/><rect x="244" y="102" width="64" height="80" rx="12" fill="#e63946"/>`) +
          C(16, .65, `<circle cx="122" cy="136" r="14" style="fill:var(--p)"/><circle cx="200" cy="128" r="18" fill="#fff"/>`)),
        soltos: soltosMerc()
      };
    },

    laticinios() {
      return {
        principal: S(SM(154, 16, 368) +
          C(6, 0, `<g transform="translate(88 64)"><path d="M32 16h56v42c0 18 22 26 22 60v168q0 16-18 16H28q-18 0-18-16V118c0-34 22-42 22-60z" fill="#fff"/><rect x="28" y="4" width="64" height="18" rx="6" style="fill:var(--p)"/><rect x="14" y="150" width="92" height="72" style="fill:var(--p)" opacity=".9"/></g>`) +
          C(12, .4, `<g transform="translate(198 202)"><path d="M12 124L74 28l74 96z" fill="#f7cf54"/><circle cx="72" cy="88" r="10" fill="#d99a1e"/><circle cx="102" cy="102" r="8" fill="#d99a1e"/></g>`) +
          C(16, .65, `<ellipse cx="268" cy="186" rx="22" ry="30" fill="#f5e6d3"/><ellipse cx="304" cy="192" rx="22" ry="30" fill="#eed6ba"/>`)),
        soltos: soltosMerc()
      };
    },

    entrega() {
      return {
        principal: S(SM(164, 16, 368) +
          C(5, 0, `<circle cx="114" cy="316" r="34" fill="#2c3540"/><circle cx="114" cy="316" r="16" fill="#fff"/>
            <circle cx="286" cy="316" r="34" fill="#2c3540"/><circle cx="286" cy="316" r="16" fill="#fff"/>`) +
          C(10, .3, `<rect x="64" y="148" width="194" height="156" rx="22" style="fill:var(--p)"/>
            <path d="M258 186h56l32 52v66h-88z" style="fill:var(--d)"/>
            <path d="M270 202h38l22 36h-60z" fill="#e6f5ff"/>`) +
          C(16, .65, `<circle cx="160" cy="224" r="40" fill="#fff"/><path d="M144 224l12 12 24-26" fill="none" style="stroke:var(--p)" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>`)),
        soltos: K.soltosPadrao(K.folha('#4aa146'), K.raio(), K.tomate(), K.estrela())
      };
    }
  };

  window.CENAS_NOMES = {
    carrinho: 'Carrinho de compras cheio',
    hortifruti: 'Cesta de hortifrúti fresca',
    sacola: 'Sacola ecológica de mercado',
    feira: 'Caixa de feira com legumes',
    frutas: 'Frutas frescas em camadas',
    balanca: 'Balança de hortifrúti',
    acougue: 'Tábua de açougue e cortes',
    cesta: 'Cesta básica completa',
    laticinios: 'Leite, queijo e ovos',
    entrega: 'Entrega expressa de mercado'
  };
  window.CENAS_ICONES = {
    carrinho: 'cat-mercado', hortifruti: 'cat-salada', sacola: 'cat-mercado', feira: 'cat-salada', frutas: 'cat-salada',
    balanca: 'cat-mercado', acougue: 'cat-frango', cesta: 'cat-presente', laticinios: 'cat-pao', entrega: 'cat-mercado'
  };
})();
