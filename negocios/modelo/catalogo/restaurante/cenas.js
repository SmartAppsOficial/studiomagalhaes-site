/* 10 animações 3D exclusivas do ramo: Restaurante e marmitaria */
(() => {
  'use strict';
  const K = window.CenaKit;
  const C = K.camada, S = K.svg3d, SM = K.sombra, VP = K.vapor;
  const soltosRest = () => K.soltosPadrao(K.folha('#4aa146'), K.tomate(), K.limao(), K.estrela());

  window.CENAS = {
    marmita() {
      const farofa = [[188, 258], [198, 266], [208, 254], [216, 268], [194, 276], [206, 280]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="3.2" fill="#e5a93c"/>`).join('');
      return {
        principal: S(SM(164, 18, 368) +
          C(4, 0, `<path d="M52 214h296l-24 122q-6 20-28 20H104q-22 0-28-20z" fill="#8b94a0"/><rect x="40" y="176" width="320" height="58" rx="28" fill="#d9dfe6"/><rect x="54" y="186" width="292" height="120" rx="24" fill="#cfd6de"/><rect x="64" y="194" width="272" height="104" rx="18" fill="#f7f4ee"/>`) +
          C(8, .25, `<path d="M72 204h108v46H72q-6 0-6-6v-34q0-6 6-6z" fill="#fffdf7"/><path d="M72 254h104v38H72q-6 0-6-6v-26q0-6 6-6z" fill="#632d18"/><rect x="178" y="250" width="52" height="42" rx="10" fill="#f4cb69"/>${farofa}`) +
          C(12, .45, `<g transform="translate(184 196)"><rect x="4" y="4" width="140" height="54" rx="22" fill="#7c3518"/><g stroke="#2a0d03" stroke-width="4.5" stroke-linecap="round" opacity=".58"><path d="M24 18l30 26M56 14l30 30M88 14l30 30"/></g><ellipse cx="48" cy="26" rx="16" ry="9" fill="none" stroke="#f7e2b8" stroke-width="4"/><ellipse cx="96" cy="34" rx="15" ry="8" fill="none" stroke="#f7e2b8" stroke-width="4"/></g>
            <g transform="translate(232 246)"><circle cx="24" cy="24" r="19" fill="#59ad3d"/><circle cx="48" cy="20" r="18" fill="#46962e"/><circle cx="66" cy="28" r="16" fill="#70c44e"/><circle cx="38" cy="24" r="8" fill="#e63946"/></g>`) +
          C(16, .65, `<g transform="translate(60 56) rotate(-7 140 50)"><rect x="8" y="8" width="268" height="62" rx="22" fill="#edf1f5"/><rect x="18" y="16" width="248" height="46" rx="16" style="fill:var(--p)"/><rect x="108" y="16" width="68" height="46" style="fill:var(--d)"/><circle cx="142" cy="39" r="12" fill="#fff" opacity=".88"/></g>` + VP([148, 204, 262], 164))),
        soltos: soltosRest()
      };
    },

    prato() {
      return {
        principal: S(SM(168, 18, 366) +
          C(4, 0, `<circle cx="200" cy="212" r="156" fill="#f3efe7"/><circle cx="200" cy="212" r="144" fill="none" style="stroke:var(--p)" stroke-width="5" opacity=".28"/><circle cx="200" cy="212" r="122" fill="#fbf9f3"/>`) +
          C(9, .3, `<path d="M98 194c2-54 44-90 92-84 26 3 34 32 22 60s-36 52-74 52c-24 0-42-10-40-28z" fill="#fffdf8"/><ellipse cx="144" cy="256" rx="60" ry="44" fill="#632d18"/>`) +
          C(13, .5, `<g transform="translate(200 176)"><path d="M8 10c24-22 76-18 94 14s10 74-24 92-76 6-84-28-6-60 14-78z" fill="#6b2b12"/><g stroke="#2a0d03" stroke-width="5.5" stroke-linecap="round" opacity=".62"><path d="M16 32l58-16M18 56l66-18M26 80l58-16"/></g></g>
            <g transform="translate(208 108)"><circle cx="22" cy="30" r="24" fill="#59ad3d"/><circle cx="48" cy="22" r="22" fill="#46962e"/><circle cx="38" cy="30" r="11" fill="#e63946"/></g>`) +
          C(17, .75, VP([166, 208, 250], 84))),
        soltos: soltosRest()
      };
    },

    feijoada() {
      return {
        principal: S(SM(156, 16, 368) +
          C(5, 0, `<rect x="44" y="198" width="312" height="24" rx="12" fill="#2b2625"/><path d="M74 202h252v96c0 46-48 64-126 64S74 344 74 298z" fill="#3a3331"/>`) +
          C(11, .35, `<ellipse cx="200" cy="204" rx="126" ry="34" fill="#231410"/><ellipse cx="200" cy="202" rx="112" ry="26" fill="#3a1c15"/>
            <ellipse cx="164" cy="198" rx="22" ry="12" fill="#7c3518"/><ellipse cx="234" cy="204" rx="20" ry="11" fill="#a84324"/>`) +
          C(16, .65, `<circle cx="304" cy="288" r="36" fill="#f59e0b"/><circle cx="304" cy="288" r="28" fill="#fde68a"/><path d="M276 288h56M304 260v56" stroke="#f59e0b" stroke-width="2.5"/>` + VP([152, 200, 248], 138))),
        soltos: soltosRest()
      };
    },

    parmegiana() {
      return {
        principal: S(SM(164, 16, 366) +
          C(5, 0, `<ellipse cx="200" cy="236" rx="158" ry="110" fill="#fffaf3"/><ellipse cx="200" cy="236" rx="142" ry="96" fill="none" style="stroke:var(--p)" stroke-width="4" opacity=".25"/>`) +
          C(10, .3, `<rect x="86" y="176" width="228" height="122" rx="46" fill="#d98932"/><rect x="98" y="186" width="204" height="102" rx="40" fill="#c8321e"/>`) +
          C(15, .6, `<path d="M116 200c36-18 132-18 168 0 18 14 14 58-6 70-36 18-120 18-156 0-20-12-24-56-6-70z" fill="#f7d56a"/>
            <path d="M182 222c12-14 28-14 36-4-10 12-24 14-36 4z" fill="#3f8a33"/>` + VP([156, 200, 244], 122))),
        soltos: soltosRest()
      };
    },

    fitness() {
      return {
        principal: S(SM(156, 16, 366) +
          C(5, 0, `<circle cx="200" cy="212" r="146" fill="#e8f3e8"/><circle cx="200" cy="212" r="128" fill="#ffffff"/>`) +
          C(10, .3, `<path d="M98 206c0-54 44-96 102-96v106z" fill="#6cc43f"/><path d="M200 110c58 0 102 42 102 96H200z" fill="#f5a642"/>
            <path d="M98 206h102v106c-58 0-102-46-102-106z" fill="#fff4d6"/>`) +
          C(15, .6, `<rect x="206" y="216" width="88" height="62" rx="22" fill="#c9813c"/><path d="M222 230l18 32M246 226l18 36M270 230l14 28" stroke="#6b3410" stroke-width="4" stroke-linecap="round"/>
            <circle cx="144" cy="156" r="14" fill="#e63946"/><circle cx="170" cy="174" r="12" fill="#e63946"/>`)),
        soltos: soltosRest()
      };
    },

    massa() {
      return {
        principal: S(SM(156, 16, 366) +
          C(5, 0, `<path d="M58 214h284c-14 88-64 134-142 134S72 302 58 214z" fill="#fffaf3"/><path d="M68 248h264l-10 30H78z" style="fill:var(--p)"/>`) +
          C(10, .3, `<g fill="none" stroke="#f7cf54" stroke-width="12" stroke-linecap="round"><path d="M84 204c36-46 196-46 232 0"/><path d="M100 192c40-54 160-54 200 0"/><path d="M122 180c34-44 122-44 156 0"/></g>`) +
          C(15, .6, `<ellipse cx="200" cy="186" rx="76" ry="30" fill="#c8321e"/><circle cx="164" cy="176" r="18" fill="#6b2b12"/><circle cx="234" cy="180" r="18" fill="#6b2b12"/><circle cx="200" cy="166" r="18" fill="#6b2b12"/>
            <path d="M188 144c12-14 28-14 36-4-10 12-24 14-36 4z" fill="#3f8a33"/>`)),
        soltos: soltosRest()
      };
    },

    strogonoff() {
      return {
        principal: S(SM(156, 16, 366) +
          C(5, 0, `<circle cx="200" cy="212" r="148" fill="#f7f4ee"/><circle cx="200" cy="212" r="126" fill="#fffdf8"/>`) +
          C(10, .3, `<path d="M200 94A118 118 0 0 1 200 330Z" fill="#d97a4a"/><ellipse cx="242" cy="172" rx="18" ry="12" fill="#8c3b1c"/><ellipse cx="262" cy="236" rx="20" ry="12" fill="#8c3b1c"/><ellipse cx="232" cy="264" rx="16" ry="10" fill="#f0d9b8"/>`) +
          C(15, .6, `<path d="M116 226c22-30 64-24 78 6-24 46-66 44-78-6z" fill="#f7cf54"/><g stroke="#d49a2a" stroke-width="4" stroke-linecap="round"><path d="M126 232l44-8M132 246l48-6M140 260l38-8"/></g>`)),
        soltos: soltosRest()
      };
    },

    peixe() {
      return {
        principal: S(SM(160, 16, 366) +
          C(5, 0, `<ellipse cx="200" cy="226" rx="158" ry="108" fill="#fffaf3"/>`) +
          C(11, .35, `<path d="M84 226c48-56 172-56 232 0-60 56-184 56-232 0z" fill="#e89a48"/>
            <g stroke="#7c3e10" stroke-width="5" stroke-linecap="round" opacity=".55"><path d="M138 196l24 60M184 190l24 72M232 196l22 60"/></g>`) +
          C(16, .65, `<circle cx="274" cy="262" r="28" fill="#8bc34a"/><circle cx="274" cy="262" r="22" fill="#e6f5c9"/><circle cx="122" cy="186" r="16" fill="#46962e"/><circle cx="148" cy="176" r="14" fill="#e63946"/>`)),
        soltos: soltosRest()
      };
    },

    salada() {
      return {
        principal: S(SM(154, 16, 366) +
          C(6, 0, `<path d="M62 214h276c-14 86-64 134-138 134S76 300 62 214z" style="fill:var(--p)"/>`) +
          C(11, .35, `<circle cx="124" cy="196" r="44" fill="#6cc43f"/><circle cx="186" cy="174" r="50" fill="#46962e"/><circle cx="258" cy="192" r="46" fill="#70c44e"/>`) +
          C(16, .65, `<circle cx="148" cy="182" r="18" fill="#e63946"/><circle cx="242" cy="178" r="18" fill="#e63946"/><ellipse cx="200" cy="186" rx="28" ry="18" fill="#ffe694"/><circle cx="200" cy="186" r="10" fill="#8c5424"/>`)),
        soltos: soltosRest()
      };
    },

    pf() {
      return {
        principal: S(SM(164, 16, 366) +
          C(5, 0, `<circle cx="200" cy="212" r="152" fill="#f3efe7"/><circle cx="200" cy="212" r="130" fill="#ffffff"/>`) +
          C(10, .3, `<circle cx="144" cy="172" r="46" fill="#fffdf5"/><circle cx="144" cy="252" r="44" fill="#5e2a16"/><rect x="200" y="156" width="96" height="96" rx="28" fill="#7c3518"/>`) +
          C(15, .6, `<ellipse cx="246" cy="198" rx="34" ry="26" fill="#fffdf8"/><circle cx="246" cy="198" r="14" fill="#f5b82e"/>
            <g fill="#f7c948"><rect x="196" y="264" width="46" height="12" rx="4" transform="rotate(-12 196 264)"/><rect x="218" y="278" width="46" height="12" rx="4" transform="rotate(8 218 278)"/></g>`)),
        soltos: soltosRest()
      };
    }
  };

  window.CENAS_NOMES = {
    marmita: 'Marmita montada 3D',
    prato: 'Prato executivo de picanha',
    feijoada: 'Panela de feijoada',
    parmegiana: 'Filé à parmegiana',
    fitness: 'Marmita fitness saudável',
    massa: 'Macarronada ao molho',
    strogonoff: 'Strogonoff com batata palha',
    peixe: 'Peixe grelhado com limão',
    salada: 'Salada gourmet no bowl',
    pf: 'Prato feito clássico'
  };
  window.CENAS_ICONES = {
    marmita: 'cat-salada', prato: 'cat-prato', feijoada: 'cat-prato', parmegiana: 'cat-prato', fitness: 'cat-salada',
    massa: 'cat-prato', strogonoff: 'cat-prato', peixe: 'cat-prato', salada: 'cat-salada', pf: 'cat-prato'
  };
})();
