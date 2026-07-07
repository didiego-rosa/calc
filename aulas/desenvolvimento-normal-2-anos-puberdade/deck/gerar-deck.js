// ============================================================================
// Deck: Desenvolvimento normal — dos 2 anos ao início da puberdade
// Camada 3 sobre a spec 02-arquitetura-slides.md, tokens Psiquiatria Prática.
// Gera: Desenvolvimento-normal-2a-puberdade_PsiquiatriaPratica.pptx
// ============================================================================
const pptxgen = require("pptxgenjs");

const PP = {
  roxoProfundo: "56365F", roxoMedio: "8A6594", lavanda: "DDC9E3",
  lavandaClara: "EDE2F0", offWhite: "F6EFF2", branco: "FFFFFF",
  coral: "E96030", coralTexto: "B84A1F", dourado: "ECB841",
};

const pres = global.__PRES__ || new pptxgen();
pres.defineLayout({ name: "WIDE", width: 13.33, height: 7.5 });
pres.layout = "WIDE";
const ST = pres.ShapeType;
const W = 13.33, H = 7.5;
const SERIF = "Georgia", SANS = "Calibri";

let nSlide = global.__SLIDE_OFFSET__ || 0;

// Remissão ao apêndice (só no deck oficial unificado)
function satRef(s, letra, dark = false) {
  if (!global.__COMBINED__) return;
  s.addText(`aprofundamento: apêndice ${letra}`, {
    x: W - 3.6, y: H - 0.44, w: 2.8, h: 0.32, fontFace: SANS, fontSize: 10,
    italic: true, color: dark ? PP.lavanda : PP.roxoMedio, align: "right",
  });
}

// ---------------------------------------------------------------- helpers ---
function novo({ dark = false, ato = null } = {}) {
  nSlide++;
  const s = pres.addSlide();
  s.background = { color: dark ? PP.roxoProfundo : PP.offWhite };
  if (ato) {
    s.addText(ato, {
      shape: ST.roundRect, rectRadius: 0.08, x: W - 3.05, y: 0.28, w: 2.5, h: 0.34,
      fill: { color: PP.dourado }, color: PP.roxoProfundo, fontFace: SANS,
      fontSize: 11, bold: true, align: "center", valign: "middle",
    });
  }
  s.addText(String(nSlide), {
    x: W - 0.7, y: H - 0.42, w: 0.45, h: 0.3, fontFace: SANS, fontSize: 10,
    color: dark ? PP.lavanda : PP.roxoMedio, align: "right",
  });
  return s;
}

function titulo(s, txt, { dark = false, size = null, y = 0.42, w = 9.55 } = {}) {
  const fs = size || (txt.length > 118 ? 19 : txt.length > 85 ? 21 : 23);
  s.addText(txt, {
    x: 0.6, y, w, h: 1.55, fontFace: SERIF, fontSize: fs, bold: true,
    color: dark ? PP.offWhite : PP.roxoProfundo, valign: "top", lineSpacingMultiple: 1.04,
  });
}

function filete(s, { y = 2.0, dark = false } = {}) {
  s.addShape(ST.rect, { x: 0.62, y, w: 1.5, h: 0.045, fill: { color: dark ? PP.dourado : PP.coral } });
}

function fonteRodape(s, txt, dark = false) {
  s.addText(txt, {
    x: 0.6, y: H - 0.46, w: 9.5, h: 0.34, fontFace: SANS, fontSize: 11,
    color: dark ? PP.lavanda : PP.roxoMedio, italic: true,
  });
}

function card(s, x, y, w, h, { fill = PP.branco, borda = null, bw = 1 } = {}) {
  s.addShape(ST.roundRect, {
    x, y, w, h, rectRadius: 0.07, fill: { color: fill },
    line: borda ? { color: borda, width: bw } : { color: fill, width: 0 },
  });
}

function txt(s, t, o) {
  s.addText(t, Object.assign({ fontFace: SANS, fontSize: 14, color: PP.roxoProfundo, valign: "top" }, o));
}

// Painel do volante: 4 etapas; stage = índice da etapa ATUAL (0..3); 4 = completo
function volante(s, stage, { dark = false, y = 6.28 } = {}) {
  const labels = ["PAIS", "LINGUAGEM", "FREIO INTERNO", "GRUPO"];
  const x0 = 2.0, wSeg = 2.35, gap = 0.32;
  s.addText("PAINEL DO VOLANTE", {
    x: x0, y: y - 0.32, w: 4, h: 0.28, fontFace: SANS, fontSize: 10, charSpacing: 2,
    color: dark ? PP.lavanda : PP.roxoMedio, bold: true,
  });
  labels.forEach((lb, i) => {
    const x = x0 + i * (wSeg + gap);
    let fill, colr;
    if (stage >= 4 || i < stage) { fill = PP.dourado; colr = PP.roxoProfundo; }
    else if (i === stage) { fill = PP.coral; colr = PP.branco; }
    else { fill = dark ? PP.roxoMedio : PP.lavanda; colr = dark ? PP.offWhite : PP.roxoProfundo; }
    s.addText(lb, {
      shape: ST.roundRect, rectRadius: 0.06, x, y, w: wSeg, h: 0.46,
      fill: { color: fill }, color: colr, fontFace: SANS, fontSize: 11.5, bold: true,
      align: "center", valign: "middle",
    });
    if (i < 3) s.addShape(ST.line, {
      x: x + wSeg + 0.04, y: y + 0.23, w: gap - 0.08, h: 0,
      line: { color: dark ? PP.lavanda : PP.roxoMedio, width: 1.5, endArrowType: "triangle" },
    });
  });
}

// Timeline dos 4 atos (S2, S3, S58)
function timeline(s, { y = 4.35, diagnosticos = false, sismo = false } = {}) {
  const xs = [2.3, 5.0, 7.7, 10.4];
  const ages = ["2-3", "3-5", "5-7", "7 → puberdade"];
  const atos = ["o corpo que\nganha símbolo", "a mente que descobre\noutras mentes", "a grande\nvirada", "o eu\ncomparado"];
  s.addShape(ST.line, { x: 1.4, y, w: sismo ? 9.6 : 10.5, h: 0, line: { color: PP.roxoMedio, width: 2.5 } });
  if (sismo) {
    // corte sísmico no fim da linha
    const zx = 11.1;
    [[0, .25], [.14, -.5], [.28, .5], [.42, -.25]].forEach((p, i, arr) => {
      if (i < arr.length - 1) s.addShape(ST.line, {
        x: zx + p[0], y: y + Math.min(p[1], arr[i + 1][1]) * 0.4,
        w: 0.14, h: Math.abs(arr[i + 1][1] - p[1]) * 0.4,
        line: { color: PP.coral, width: 3 },
        flipV: arr[i + 1][1] < p[1],
      });
    });
    txt(s, "PUBERDADE", { x: 10.7, y: y + 0.42, w: 2.2, h: 0.3, fontSize: 11, bold: true, color: PP.coralTexto });
  }
  xs.forEach((x, i) => {
    s.addShape(ST.ellipse, { x: x - 0.14, y: y - 0.14, w: 0.28, h: 0.28, fill: { color: PP.dourado }, line: { color: PP.roxoProfundo, width: 1 } });
    txt(s, ages[i], { x: x - 1.0, y: y + 0.22, w: 2.0, h: 0.3, align: "center", bold: true, fontSize: 13, color: PP.roxoProfundo });
    txt(s, atos[i], { x: x - 1.15, y: y + 0.55, w: 2.3, h: 0.75, align: "center", fontSize: 11, color: PP.roxoMedio });
  });
  if (diagnosticos) {
    txt(s, "posição no mapa = etapa da transferência que costuma falhar, NÃO idade de início", { x: 1.4, y: y + 1.0, w: 10.5, h: 0.35, fontSize: 12, italic: true, color: PP.coralTexto });
    const diags = [
      ["TEA", "a janela do apontar"],
      ["TOD · sinais TDAH", "resistir funciona"],
      ["TDAH visível", "demanda cruza o freio"],
      ["Ansiedade · Depressão", "o grupo devolve"],
    ];
    xs.forEach((x, i) => {
      card(s, x - 1.25, y - 1.95, 2.5, 1.35, { fill: PP.branco, borda: PP.roxoMedio, bw: 0.75 });
      s.addShape(ST.rect, { x: x - 1.25, y: y - 1.95, w: 2.5, h: 0.07, fill: { color: PP.coral } });
      txt(s, diags[i][0], { x: x - 1.2, y: y - 1.8, w: 2.4, h: 0.55, align: "center", bold: true, fontSize: 13.5, color: PP.coralTexto });
      txt(s, diags[i][1], { x: x - 1.2, y: y - 1.33, w: 2.4, h: 0.6, align: "center", fontSize: 11.5, color: PP.roxoProfundo });
      s.addShape(ST.line, { x, y: y - 0.6, w: 0, h: 0.42, line: { color: PP.roxoMedio, width: 1, dashType: "dash" } });
    });
  }
}

// Cena Alice (vinheta clínica)
function cenaAlice(s, idade, tituloTxt, legenda, notas, ato) {
  s.addShape(ST.rect, { x: 0, y: 2.15, w: W, h: 4.35, fill: { color: PP.lavandaClara } });
  s.addShape(ST.rect, { x: 0, y: 2.15, w: 0.14, h: 4.35, fill: { color: PP.coral } });
  s.addText(`CENA · ALICE, ${idade}`, {
    shape: ST.roundRect, rectRadius: 0.08, x: 0.6, y: 0.32, w: 3.1, h: 0.4,
    fill: { color: PP.dourado }, color: PP.roxoProfundo, fontFace: SANS, fontSize: 12.5, bold: true, align: "center", valign: "middle",
  });
  titulo(s, tituloTxt, { y: 0.95, size: 24 });
  txt(s, legenda, { x: 0.85, y: 2.6, w: 11.6, h: 3.4, fontFace: SERIF, fontSize: 17, italic: true, lineSpacingMultiple: 1.25, color: PP.roxoProfundo });
  txt(s, "narrada ao vivo · Alice é normal do início ao fim", { x: 0.85, y: 6.05, w: 9, h: 0.35, fontSize: 12, color: PP.roxoMedio, italic: true });
  s.addNotes(notas);
}

// Moldura de vídeo (antes/depois) e slide de vídeo
function molduraAntes(s, pergunta, vid, aposta, notas) {
  s.addShape(ST.roundRect, { x: 0.6, y: 1.55, w: 12.1, h: 3.1, rectRadius: 0.08, fill: { color: PP.lavanda } });
  txt(s, pergunta, { x: 1.0, y: 1.95, w: 11.3, h: 2.4, fontFace: SERIF, fontSize: 25, bold: true, color: PP.roxoProfundo, lineSpacingMultiple: 1.1 });
  s.addText(`VÍDEO ${vid}`, {
    shape: ST.roundRect, rectRadius: 0.08, x: 0.6, y: 5.0, w: 3.3, h: 0.44,
    fill: { color: PP.roxoProfundo }, color: PP.offWhite, fontFace: SANS, fontSize: 11.5, bold: true, align: "center", valign: "middle",
  });
  if (aposta) {
    s.addText("APOSTA DA PLATEIA", {
      shape: ST.roundRect, rectRadius: 0.08, x: 4.05, y: 5.0, w: 2.5, h: 0.44,
      fill: { color: PP.coral }, color: PP.branco, fontFace: SANS, fontSize: 11.5, bold: true, align: "center", valign: "middle",
    });
    txt(s, aposta, { x: 6.75, y: 5.05, w: 6.0, h: 0.9, fontSize: 13.5, color: PP.roxoProfundo });
  }
  if (notas) s.addNotes(notas);
}

function slideVideo(s, vid, desc, tecnica) {
  s.addShape(ST.ellipse, { x: 5.62, y: 2.15, w: 2.1, h: 2.1, fill: { color: PP.coral } });
  s.addShape(ST.triangle, { x: 6.35, y: 2.72, w: 0.85, h: 0.95, rotate: 90, fill: { color: PP.offWhite } });
  s.addText(`VÍDEO ${vid}`, { x: 0, y: 4.55, w: W, h: 0.5, align: "center", fontFace: SANS, fontSize: 17, bold: true, color: PP.dourado });
  s.addText(desc, { x: 2.2, y: 5.1, w: 8.93, h: 0.9, align: "center", fontFace: SANS, fontSize: 14.5, color: PP.offWhite, lineSpacingMultiple: 1.15 });
  if (tecnica) s.addText(tecnica, { x: 2.2, y: 6.0, w: 8.93, h: 0.6, align: "center", fontFace: SANS, fontSize: 12.5, italic: true, color: PP.lavanda });
  s.addText("acervo público · nunca paciente próprio", { x: 0, y: H - 0.5, w: W - 0.8, h: 0.3, align: "right", fontFace: SANS, fontSize: 10.5, color: PP.lavanda });
}

// Divisor de fecho de ato (pergunta de tração)
function fechoAto(s, pergunta, stage, notas) {
  s.addShape(ST.rect, { x: 0.62, y: 1.3, w: 1.7, h: 0.05, fill: { color: PP.dourado } });
  s.addText(pergunta, { x: 0.62, y: 1.7, w: 12.0, h: 3.4, fontFace: SERIF, fontSize: 30, bold: true, color: PP.offWhite, lineSpacingMultiple: 1.12 });
  volante(s, stage, { dark: true, y: 5.9 });
  if (notas) s.addNotes(notas);
}

// Contracena de vigilância
function vigilancia(s, tituloTxt, notas) {
  s.addText("O QUE DEVERIA TE TIRAR O SONO", {
    shape: ST.roundRect, rectRadius: 0.08, x: 0.6, y: 0.34, w: 4.3, h: 0.4,
    fill: { color: PP.coral }, color: PP.branco, fontFace: SANS, fontSize: 12.5, bold: true, align: "center", valign: "middle",
  });
  titulo(s, tituloTxt, { y: 0.95, size: 23 });
  if (notas) s.addNotes(notas);
}

// ============================================================================
// BLOCO 0 — ABERTURA
// ============================================================================
let s;

// S1 · Capa (escura, com o volante)
s = novo({ dark: true });
s.addShape(ST.ellipse, { x: 10.1, y: 0.9, w: 2.3, h: 2.3, fill: { color: "56365F" }, line: { color: PP.dourado, width: 10 } });
s.addShape(ST.ellipse, { x: 11.05, y: 1.85, w: 0.4, h: 0.4, fill: { color: PP.coral } });
s.addShape(ST.line, { x: 11.25, y: 1.15, w: 0, h: 0.75, line: { color: PP.dourado, width: 4 } });
s.addShape(ST.line, { x: 10.35, y: 2.45, w: 0.75, h: 0.35, line: { color: PP.dourado, width: 4 }, flipV: true });
s.addShape(ST.line, { x: 11.4, y: 2.45, w: 0.75, h: 0.35, line: { color: PP.dourado, width: 4 } });
s.addText("Desenvolvimento normal", { x: 0.7, y: 2.2, w: 9.4, h: 1.0, fontFace: SERIF, fontSize: 40, bold: true, color: PP.offWhite });
s.addText("dos 2 anos ao início da puberdade", { x: 0.7, y: 3.15, w: 9.4, h: 0.7, fontFace: SERIF, fontSize: 26, color: PP.lavanda });
s.addShape(ST.rect, { x: 0.72, y: 4.05, w: 1.7, h: 0.05, fill: { color: PP.dourado } });
s.addText("a história da transferência do volante", { x: 0.7, y: 4.25, w: 9.4, h: 0.6, fontFace: SERIF, fontSize: 20, italic: true, color: PP.dourado });
s.addText("Dr. Diego Alves Rosa · psiquiatria da infância e adolescência\nPsiquiatria Prática · curso de residentes", { x: 0.7, y: 5.9, w: 9, h: 0.9, fontFace: SANS, fontSize: 15, color: PP.offWhite, lineSpacingMultiple: 1.3 });
s.addNotes("Abertura. Apresentar-se em 30s e ir direto para a tese do S2. Não ler o subtítulo: deixar que ele trabalhe sozinho.");

// S2 · Tese
s = novo({ ato: "ABERTURA" });
titulo(s, "Aos 2 anos, quem regula a criança é o mundo em volta; no fim desta história, o volante está quase todo por dentro, e em parte com os amigos.");
filete(s, { y: 2.35 });
timeline(s, { y: 3.85 });
volante(s, 0, { y: 6.45 });
s.addNotes("Apresentar a metáfora do volante e o teste que a prova: a MESMA birra no chão do mercado é fisiologia aos 2 e sintoma aos 9. O comportamento não mudou; o dono do volante mudou. Prometer que essa régua sustenta a aula inteira.");

// S3 · Gancho clínico (mapa dos diagnósticos)
s = novo({ ato: "ABERTURA" });
titulo(s, "Quase todo diagnóstico da psiquiatria infantil é falha, atraso ou desvio nessa transferência.");
filete(s);
timeline(s, { y: 4.75, diagnosticos: true });
s.addNotes("Não explicar os cartões ainda: 'no fim da aula, este mapa vai parecer óbvio'. Este slide volta idêntico no fim (S58): é uma promessa que a aula prova.");

// S4 · Contrato + Alice
s = novo({ ato: "ABERTURA" });
titulo(s, "Esta aula termina num evento, não numa idade: quando o corpo de Alice começar a mudar, outro professor assume.");
filete(s);
const idades = ["2", "4", "6", "9", "11"];
idades.forEach((id, i) => {
  const x = 1.3 + i * 2.25;
  s.addShape(ST.ellipse, { x, y: 2.9, w: 1.15, h: 1.15, fill: { color: i === 4 ? PP.coral : PP.lavanda }, line: { color: PP.roxoMedio, width: 1 } });
  txt(s, id, { x, y: 3.13, w: 1.15, h: 0.7, align: "center", fontFace: SERIF, fontSize: 26, bold: true, color: i === 4 ? PP.branco : PP.roxoProfundo });
  txt(s, i === 4 ? "quase 11\nanos" : id + " anos", { x: x - 0.3, y: 4.15, w: 1.75, h: 0.6, align: "center", fontSize: 12, color: PP.roxoMedio });
});
card(s, 1.0, 5.0, 11.3, 1.05, { fill: PP.branco, borda: PP.roxoMedio, bw: 0.75 });
txt(s, [
  { text: "Alice", options: { bold: true, color: PP.coralTexto } },
  { text: " atravessa a aula inteira em cenas de consultório. Ela é rigorosamente normal do primeiro ao último slide: é a régua, não o caso. Ninguém diagnostica a Alice.", options: {} },
], { x: 1.3, y: 5.2, w: 10.7, h: 0.75, fontSize: 15 });
s.addNotes("Script: 'Eu quero apresentar uma pessoa. Alice tem 2 anos hoje e vai fazer uns 11 até o fim da aula...'. Anunciar a fronteira puberal: a aula termina quando o corpo dela decidir, não o calendário.");

// ============================================================================
// ATO 1 (2-3) — O CORPO QUE GANHA SÍMBOLO
// ============================================================================
const A1 = "ATO 1 · 2-3 ANOS";

// S5 · Cena Alice 1
s = novo({ ato: A1 });
cenaAlice(s, "2 ANOS", "Alice, 2 anos e 2 meses, dá sopa à boneca com um bloco de madeira, e a sopa existe.",
  "Pergunto a idade e quem responde é a mãe; pergunto se dormiu bem e quem responde é a mãe. Alice, quando quer água, puxa a mãe pelo dedo até a garrafa. Em dois minutos está no tapete: bloco no copinho, colher na boca da boneca. “sopa”.",
  "Régua escondida: a mãe responde POR Alice (não anunciar). Fechar: a sopa não existe, Alice sabe que não existe, e mesmo assim a sopa funciona. É a coisa mais importante que ela fez este ano.");

// S6 · Função semiótica
s = novo({ ato: A1 });
titulo(s, "Entre 18 e 24 meses nasce a função semiótica: uma coisa passa a poder representar outra.");
filete(s);
const degraus = [
  ["Brincar construtivo", "~2 anos"], ["Faz de conta substitutivo", "2-3 anos\n(a cenoura vira violino)"],
  ["Brincar sociodramático", "aos 4, quase todas\n(papéis: médico, mamãe)"], ["Jogo de regras", "5-6 anos\n(anuncia o próximo estágio)"],
];
degraus.forEach((d, i) => {
  const x = 0.9 + i * 3.0, y = 5.15 - i * 0.72;
  card(s, x, y, 2.8, 1.05, { fill: i === 3 ? PP.lavanda : PP.branco, borda: PP.roxoMedio, bw: 0.75 });
  txt(s, d[0], { x: x + 0.15, y: y + 0.12, w: 2.5, h: 0.45, bold: true, fontSize: 13.5 });
  txt(s, d[1], { x: x + 0.15, y: y + 0.5, w: 2.5, h: 0.55, fontSize: 11.5, color: PP.roxoMedio });
});
fonteRodape(s, "Bee & Boyd, cap. 7, p. 180-181 · uso de objetos substitutos aos 2-3 anos é achado universal");
s.addNotes("Representar é a PRIMEIRA peça da autorregulação: só se regula o que se representa. A escada do brincar é a régua clínica gratuita de qualquer consulta.");

// S7 · Explosão lexical
s = novo({ ato: A1 });
titulo(s, "A linguagem explode: de ~600 palavras aos 2 anos e meio para ~15.000 na entrada da escola.");
filete(s);
s.addText("600", { x: 1.2, y: 2.8, w: 3.2, h: 1.3, fontFace: SERIF, fontSize: 60, bold: true, color: PP.roxoMedio, align: "center" });
txt(s, "palavras\naos 2 anos e meio", { x: 1.2, y: 4.15, w: 3.2, h: 0.7, align: "center", fontSize: 14, color: PP.roxoMedio });
s.addShape(ST.line, { x: 4.9, y: 3.6, w: 2.3, h: 0, line: { color: PP.roxoMedio, width: 2.5, endArrowType: "triangle" } });
txt(s, "~10 palavras novas POR DIA (fast mapping)", { x: 4.35, y: 3.85, w: 3.5, h: 0.6, align: "center", fontSize: 12.5, color: PP.roxoMedio, italic: true });
s.addText("15.000", { x: 7.8, y: 2.55, w: 4.4, h: 1.6, fontFace: SERIF, fontSize: 84, bold: true, color: PP.coral, align: "center" });
txt(s, "palavras aos 5-6 anos", { x: 7.8, y: 4.2, w: 4.4, h: 0.5, align: "center", fontSize: 15, bold: true });
card(s, 1.0, 5.15, 11.3, 0.95, { fill: PP.lavanda });
txt(s, "E ela chega EXTERNA: serve para pedir e nomear para o outro. Ainda não serve para se instruir. (Guardem isso.)", { x: 1.3, y: 5.4, w: 10.8, h: 0.6, fontSize: 15, bold: true });
fonteRodape(s, "Bee & Boyd, cap. 7, p. 188-189 (Bates 1994; Anglin 1995; Pinker 1994)");
s.addNotes("Superregularização ('fazi', 'sabo') é sinal de saúde: a criança extraiu a regra e aplicou demais. Erro que denuncia inteligência do sistema. Ressalva de fala: 600 e 15.000 são MÉDIAS com variação individual enorme; não usar como marco de alarme isolado.");

// S8-S10 · V1 espelho
s = novo({ ato: A1 });
molduraAntes(s, "O que essa criança vê no espelho, e o que isso muda?", "V1 · TESTE DO ESPELHO", null,
  "Instrução de olhar: reparar na mão indo à própria testa (e não ao espelho). Honestidade: o rouge test vem do capítulo de lactância do mesmo livro; trago porque a aula precisa dele.");
s = novo({ dark: true, ato: A1 });
slideVideo(s, "V1", "Rouge test: mancha na testa, criança diante do espelho. Antes dos ~18 meses, toca o espelho; depois, toca a própria testa.", null);
s = novo({ ato: A1 });
titulo(s, "Por volta dos 18-24 meses a criança se reconhece: nasce um eu que pode ser representado, e portanto, um dia, regulado.");
filete(s);
card(s, 1.0, 3.0, 11.3, 1.6, { fill: PP.branco, borda: PP.roxoMedio, bw: 0.75 });
txt(s, [
  { text: "símbolo + eu representado", options: { bold: true, color: PP.coralTexto } },
  { text: " = as duas peças que a transferência do volante vai usar pelo resto da aula.", options: {} },
], { x: 1.35, y: 3.5, w: 10.6, h: 0.8, fontSize: 17 });
s.addNotes("Ponte do ato: sem um eu representado, não há o que autorregular.");

// S11 · Birra fisiologia
s = novo({ ato: A1 });
titulo(s, "A birra dos 2 anos é fisiologia da regulação externa: o alarme emocional está pronto, o freio ainda mora no adulto.");
filete(s);
const boxesBirra = [
  ["ALARME", "sistema límbico\nfuncionante", PP.dourado],
  ["FREIO", "pré-frontal\nem obra", PP.lavanda],
  ["FREIO EXTERNO", "o adulto\n(co-regulação)", PP.branco],
];
boxesBirra.forEach((b, i) => {
  const x = 1.1 + i * 3.85;
  card(s, x, 2.75, 3.3, 1.9, { fill: b[2], borda: i === 2 ? PP.coral : PP.roxoMedio, bw: i === 2 ? 2 : 0.75 });
  txt(s, b[0], { x: x + 0.2, y: 2.95, w: 2.9, h: 0.45, bold: true, fontSize: 16, color: i === 2 ? PP.coralTexto : PP.roxoProfundo });
  txt(s, b[1], { x: x + 0.2, y: 3.45, w: 2.9, h: 1.0, fontSize: 14, color: PP.roxoProfundo });
});
card(s, 1.1, 5.0, 11.05, 1.05, { fill: PP.lavandaClara });
txt(s, "Contrapeso: aos 2 anos, OBEDECER é a regra, não a exceção (Gralinski & Kopp). E a agressão do pico 2-4 é instrumental: quer o objeto, não ferir.", { x: 1.4, y: 5.22, w: 10.4, h: 0.7, fontSize: 14.5 });
fonteRodape(s, "Bee & Boyd, cap. 8, p. 214 e p. 226");
satRef(s, "A");
s.addNotes("A birra é o custo operacional da regulação externa, não um sintoma. Regulação aos 2 prediz agressão aos 4 (Rubin 2003, p. 206).");

// S12-S14 · V2 birra (T3)
s = novo({ ato: A1 });
molduraAntes(s, "Nesta cena, repare no que acontece imediatamente ANTES e imediatamente DEPOIS do grito.", "V2 · CENA NATURAL", null,
  "Anunciar a técnica: vou exibir, congelar, perguntar e reexibir. É treino de análise funcional ao vivo.");
s = novo({ dark: true, ato: A1 });
slideVideo(s, "V2", "Birra real em local público, com antecedente visível.", "exibir → congelar 3x (gatilho · pico · resolução) → perguntar → reexibir inteiro");
s = novo({ ato: A1 });
titulo(s, "Toda birra tem gramática (gatilho, escalada, função), e ler essa gramática é o primeiro passo da análise funcional.");
filete(s);
["A · ANTECEDENTE", "B · COMPORTAMENTO", "C · CONSEQUÊNCIA"].forEach((t, i) => {
  const x = 1.1 + i * 3.85;
  card(s, x, 2.9, 3.3, 2.2, { fill: PP.branco, borda: PP.roxoMedio, bw: 0.75 });
  s.addShape(ST.rect, { x, y: 2.9, w: 3.3, h: 0.08, fill: { color: PP.coral } });
  txt(s, t, { x: x + 0.2, y: 3.1, w: 2.9, h: 0.5, bold: true, fontSize: 15, color: PP.coralTexto });
  txt(s, ["o que aconteceu\nimediatamente antes?", "o que o corpo\ndela fez?", "o que ela obteve\n(ou evitou)?"][i], { x: x + 0.2, y: 3.65, w: 2.9, h: 1.2, fontSize: 14 });
});
satRef(s, "A");
s.addNotes("A pergunta 'o que ela obteve?' prepara a contracena do Ato 2. Plantar sem colher ainda. Ressalva de fala: UM episódio gera hipótese; análise funcional de verdade exige padrão em várias ocorrências (apêndice A).");

// S15-S17 · V3 DNPM
s = novo({ ato: A1 });
molduraAntes(s, "Agora, 20 segundos de uma criança de 2 anos absolutamente comum: o que já está lá?", "V3 · DNPM NORMAL", null, null);
s = novo({ dark: true, ato: A1 });
slideVideo(s, "V3", "Criança de 2-3 anos: faz de conta substitutivo + fala telegráfica. 15-30 segundos.", null);
s = novo({ ato: A1 });
titulo(s, "Faz de conta, palavras novas todo dia e birra à tarde: esse pacote inteiro é o normal dos 2 aos 3.");
filete(s);
["função semiótica em uso", "explosão lexical em curso", "regulação ainda externa (e barulhenta)"].forEach((t, i) => {
  s.addShape(ST.ellipse, { x: 1.3, y: 2.9 + i * 0.95, w: 0.32, h: 0.32, fill: { color: PP.dourado } });
  txt(s, t, { x: 1.85, y: 2.86 + i * 0.95, w: 10, h: 0.5, fontSize: 18 });
});
s.addNotes("Checklist do que apareceu no clipe. Rápido: 60-90 segundos de fala.");

// S18 · Contracena TEA
s = novo({ ato: A1 });
vigilancia(s, "O que deveria te tirar o sono aos 2 anos não é a birra: é o apontar que só pede e nunca mostra.",
  "Vigilância, não diagnóstico. Janela do segundo ano, nunca idade rígida. Encaminhar sem esperar 'amadurecer': a janela de intervenção vale mais que a certeza. Ponte com o livro: linguagem e teoria da mente andam juntas (p. 185).");
card(s, 0.9, 2.7, 5.5, 3.0, { fill: PP.branco, borda: PP.roxoMedio, bw: 0.75 });
txt(s, "APONTAR PARA PEDIR", { x: 1.2, y: 2.95, w: 4.9, h: 0.45, bold: true, fontSize: 16 });
txt(s, "“quero aquilo”\no outro como ferramenta\n\nPRESERVADO no TEA", { x: 1.2, y: 3.5, w: 4.9, h: 1.9, fontSize: 15, lineSpacingMultiple: 1.15 });
card(s, 6.9, 2.7, 5.5, 3.0, { fill: PP.branco, borda: PP.coral, bw: 2 });
txt(s, "APONTAR PARA MOSTRAR", { x: 7.2, y: 2.95, w: 4.9, h: 0.45, bold: true, fontSize: 16, color: PP.coralTexto });
txt(s, "“olha aquilo!”\no outro como MENTE com quem se divide\n\nDEFICIENTE no TEA", { x: 7.2, y: 3.5, w: 4.9, h: 1.9, fontSize: 15, lineSpacingMultiple: 1.15 });
txt(s, "+ não responder ao nome (audição normal) · não seguir o apontar do outro · sem faz de conta · linguagem SEM gesto compensatório", { x: 0.9, y: 5.95, w: 11.6, h: 0.6, fontSize: 13.5, color: PP.roxoProfundo, italic: true });
fonteRodape(s, "atenção compartilhada · M-CHAT-R (Modified Checklist for Autism in Toddlers, rastreio 16-30 meses)");

// S19 · Fecho Ato 1
s = novo({ dark: true, ato: A1 });
fechoAto(s, "Alice agora representa o mundo. Mas ela sabe que existe um mundo dentro da SUA cabeça?", 1,
  "Pausa de 3 segundos antes de avançar. O Ato 2 responde. Painel: quase tudo com os pais; a linguagem acabou de pegar na ponta do volante.");

// ============================================================================
// ATO 2 (3-5) — A MENTE QUE DESCOBRE OUTRAS MENTES
// ============================================================================
const A2 = "ATO 2 · 3-5 ANOS";

// S20 · Cena Alice 2
s = novo({ ato: A2 });
cenaAlice(s, "4 ANOS", "Alice, 4 anos, esconde o desenho rasgado e culpa o gato: a primeira mentira é uma conquista.",
  "Alice rasgou sem querer o desenho da irmã. Quando a mãe pergunta, ela olha para o gato: “foi ele”. No consultório, a mãe me pergunta se deve se preocupar com o caráter da filha.",
  "Régua escondida: a mãe agora CONSULTA (ainda dirige, mas pergunta o caminho). Resposta: do ponto de vista do neurodesenvolvimento, é quase motivo de brinde: para mentir, Alice calculou o que a mãe sabe e o que pode ser levada a acreditar.");

// S21 · Teoria da mente
s = novo({ ato: A2 });
titulo(s, "Para mentir, Alice precisou descobrir que as pessoas agem pelo que ACREDITAM, não pelo que é verdade.");
filete(s);
s.addShape(ST.roundRect, { x: 1.0, y: 2.8, w: 11.3, h: 2.3, rectRadius: 0.08, fill: { color: PP.lavanda } });
txt(s, "TEORIA DA MENTE", { x: 1.35, y: 3.05, w: 10.6, h: 0.4, bold: true, fontSize: 14, charSpacing: 2, color: PP.roxoMedio });
txt(s, "o conjunto de ideias com que explicamos as crenças, desejos e comportamentos dos outros. O marco duro é a CRENÇA FALSA: entender que o outro pode agir por uma representação errada do mundo.", { x: 1.35, y: 3.5, w: 10.6, h: 1.4, fontFace: SERIF, fontSize: 18, lineSpacingMultiple: 1.2 });
fonteRodape(s, "Bee & Boyd, cap. 7, p. 184-185");
s.addNotes("Reenquadrar: a mentira dos 4 anos é marco de desenvolvimento, não de caráter. Escada fina no doc de apoio (18m intenções → 3a desejo → 4-5 crença falsa → 5-7 reciprocidade → 6a inferência).");

// S22-S24 · V4 falsa crença
s = novo({ ato: A2 });
molduraAntes(s, "Onde Sally vai procurar a bolinha quando voltar?", "V4 · FALSA CRENÇA", "Votem: com que idade a MAIORIA das crianças passa a acertar? 2, 3, 4 ou 6?",
  "Colher palpites em voz alta antes do play; quem apostou assiste diferente.");
satRef(s, "C");
s = novo({ dark: true, ato: A2 });
slideVideo(s, "V4", "Sally-Anne (ou caixa de doces): criança de 3 erra, criança de 4-5 acerta.", "pausar antes da resposta da criança de 3: “o que ela vai dizer?”");
s = novo({ ato: A2 });
titulo(s, "Aos 3 a maioria erra, aos 5 a maioria acerta, e o padrão se repete em toda cultura testada.");
filete(s);
s.addShape(ST.rect, { x: 2.6, y: 4.3, w: 1.7, h: 1.1, fill: { color: PP.lavanda } });
txt(s, "3 anos:\na maioria erra", { x: 2.45, y: 5.5, w: 2.0, h: 0.7, align: "center", fontSize: 12.5, bold: true });
s.addShape(ST.rect, { x: 4.4, y: 4.05, w: 1.7, h: 1.35, fill: { color: PP.dourado } });
txt(s, "4 anos:\nmeio a meio", { x: 4.25, y: 5.5, w: 2.0, h: 0.7, align: "center", fontSize: 12.5, bold: true, color: PP.roxoMedio });
s.addShape(ST.rect, { x: 6.2, y: 2.7, w: 1.7, h: 2.7, fill: { color: PP.coral } });
s.addShape(ST.line, { x: 2.1, y: 5.4, w: 6.3, h: 0, line: { color: PP.roxoMedio, width: 1.5 } });
txt(s, "5 anos:\na maioria acerta", { x: 6.05, y: 5.5, w: 2.0, h: 0.7, align: "center", fontSize: 12.5, bold: true, color: PP.coralTexto });
card(s, 8.9, 3.2, 3.5, 1.9, { fill: PP.branco, borda: PP.roxoMedio, bw: 0.75 });
txt(s, "Inclusive entre os Baka, caçadores-coletores de Camarões: isso não é escolarização, é maturação.", { x: 9.15, y: 3.45, w: 3.0, h: 1.5, fontSize: 13.5 });
fonteRodape(s, "Bee & Boyd, cap. 7, p. 185 (Flavell) e p. 186 (Avis & Harris, 1991)");
satRef(s, "C");
s.addNotes("Preditores: faz de conta compartilhado, memória de trabalho e LINGUAGEM (limiar linguístico para passar em crença falsa). Velocidade de aquisição prediz habilidade social futura. Nuance no apêndice C: a transição é gradual (Wellman), sem idade-muro; criança de 4 que erra não está atrasada por isso.");

// S25 · Fala privada
s = novo({ ato: A2 });
titulo(s, "A fala privada é o volante em trânsito: a instrução do adulto vira voz alta da criança, e depois vira pensamento.");
filete(s);
const etapasFP = [["FALA DO ADULTO", "“cuidado no degrau”"], ["FALA PRIVADA", "~3 anos: ela diz “cuidado”\npara si mesma, em voz alta"], ["PENSAMENTO VERBAL", "6-7 anos: a voz\ncompletamente internalizada"]];
etapasFP.forEach((e, i) => {
  const x = 0.9 + i * 4.1;
  card(s, x, 2.9, 3.5, 1.9, { fill: i === 1 ? PP.lavanda : PP.branco, borda: PP.roxoMedio, bw: 0.75 });
  txt(s, e[0], { x: x + 0.2, y: 3.1, w: 3.1, h: 0.45, bold: true, fontSize: 14.5, color: i === 1 ? PP.coralTexto : PP.roxoProfundo });
  txt(s, e[1], { x: x + 0.2, y: 3.6, w: 3.1, h: 1.1, fontSize: 13.5 });
  if (i < 2) s.addShape(ST.line, { x: x + 3.55, y: 3.85, w: 0.5, h: 0, line: { color: PP.coral, width: 3, endArrowType: "triangle" } });
});
card(s, 0.9, 5.1, 11.6, 0.9, { fill: PP.lavandaClara });
txt(s, "Vygotsky contra Piaget: a fala privada não desaparece, ela vai para DENTRO. E a pesquisa moderna deu razão a Vygotsky.", { x: 1.2, y: 5.32, w: 11, h: 0.6, fontSize: 14.5, italic: true });
fonteRodape(s, "Bee & Boyd, cap. 7, p. 187-188");
s.addNotes("Slide mais importante do ato para a TESE: é a mecânica literal da transferência. Fala privada aumenta quando a tarefa dificulta e ajuda a resolver problemas.");

// S26 · Iniciativa vs culpa
s = novo({ ato: A2 });
titulo(s, "O trabalho dos 3 aos 5 é ter iniciativa; a culpa que nasce junto é o primeiro freio interno.");
filete(s);
card(s, 0.9, 2.7, 5.6, 3.2, { fill: PP.branco, borda: PP.roxoMedio, bw: 0.75 });
txt(s, "INICIATIVA", { x: 1.2, y: 2.95, w: 5, h: 0.45, bold: true, fontSize: 16 });
txt(s, "planejar, propor, testar, transgredir: o motor da idade (Erikson). A tarefa dos pais é equilibrar autonomia e proteção.", { x: 1.2, y: 3.45, w: 5.0, h: 2.2, fontSize: 15, lineSpacingMultiple: 1.15 });
card(s, 6.85, 2.7, 5.6, 3.2, { fill: PP.lavanda });
txt(s, "CULPA · VERGONHA · ORGULHO", { x: 7.15, y: 2.95, w: 5, h: 0.45, bold: true, fontSize: 16 });
txt(s, "as emoções morais chegam como primeiro freio interno, de natureza afetiva. Nascem DENTRO de relações calorosas; sem confiança, saem fracas demais para regular.", { x: 7.15, y: 3.45, w: 5.0, h: 2.2, fontSize: 15, lineSpacingMultiple: 1.15 });
fonteRodape(s, "Bee & Boyd, cap. 8, p. 202 e p. 207-208 (Koenig 2004)");
s.addNotes("Antes do freio executivo (Ato 3), existe um freio afetivo. Empatia de Hoffman se perguntarem: global → egocêntrica → pelos sentimentos → pela condição de vida.");

// S27-S29 · V5 fala privada
s = novo({ ato: A2 });
molduraAntes(s, "Repare no que essa criança de 4 anos faz com a boca enquanto monta o quebra-cabeça.", "V5 · DNPM NORMAL", null, null);
s = novo({ dark: true, ato: A2 });
slideVideo(s, "V5", "Criança de ~4 anos sozinha em tarefa, instruindo-se em voz alta. 15-30 segundos.", null);
s = novo({ ato: A2 });
titulo(s, "Ela está se dirigindo com a própria voz; em dois anos, essa voz vai para dentro.");
filete(s);
card(s, 1.0, 3.0, 11.3, 1.5, { fill: PP.branco, borda: PP.roxoMedio, bw: 0.75 });
txt(s, [
  { text: "O que vocês acabaram de ver tem endereço na tese: ", options: {} },
  { text: "é o volante em trânsito, audível.", options: { bold: true, color: PP.coralTexto } },
], { x: 1.35, y: 3.45, w: 10.6, h: 0.8, fontSize: 17 });
s.addNotes("Síntese curta. Não repetir o S25: apontar e seguir.");

// S30 · Contracena TOD
s = novo({ ato: A2 });
vigilancia(s, "Quando resistir FUNCIONA, a oposição vira comportamento aprendido: é assim que se arma o risco de transtorno opositivo-desafiador (TOD).",
  "Gênese funcional: oposição é comportamento operante, sem intenção consciente e sem vilão. Quando resistir desliga a ordem (reforço negativo) ou captura o adulto (reforço positivo), a oposição é selecionada. Ressalva obrigatória: fator de risco e de manutenção, NÃO causa suficiente (temperamento e carga familiar entram na equação; apêndice A). Pergunta clínica: 'o que a oposição PRODUZ nesta casa?'. Contraste: o desafio aberto normalmente DECLINA dos 2 aos 6.");
const ciclo = ["ORDEM", "OPOSIÇÃO", "ADULTO RECUA", "OPOSIÇÃO REFORÇADA"];
ciclo.forEach((c, i) => {
  const pos = [[2.0, 2.8], [7.6, 2.8], [7.6, 4.6], [2.0, 4.6]][i];
  card(s, pos[0], pos[1], 3.7, 1.1, { fill: i === 3 ? PP.lavanda : PP.branco, borda: i === 3 ? PP.coral : PP.roxoMedio, bw: i === 3 ? 2 : 0.75 });
  txt(s, c, { x: pos[0] + 0.15, y: pos[1] + 0.3, w: 3.4, h: 0.6, align: "center", bold: true, fontSize: 15, color: i === 3 ? PP.coralTexto : PP.roxoProfundo });
});
s.addShape(ST.line, { x: 5.75, y: 3.35, w: 1.8, h: 0, line: { color: PP.roxoMedio, width: 2, endArrowType: "triangle" } });
s.addShape(ST.line, { x: 9.45, y: 3.95, w: 0, h: 0.6, line: { color: PP.roxoMedio, width: 2, endArrowType: "triangle" } });
s.addShape(ST.line, { x: 5.75, y: 5.15, w: 1.8, h: 0, line: { color: PP.roxoMedio, width: 2, beginArrowType: "triangle" } });
s.addShape(ST.line, { x: 3.85, y: 3.95, w: 0, h: 0.6, line: { color: PP.roxoMedio, width: 2, beginArrowType: "triangle" } });
txt(s, "o ciclo roda em loop, e cada volta o fortalece", { x: 4.3, y: 6.0, w: 5.6, h: 0.4, align: "center", fontSize: 13, italic: true, color: PP.roxoMedio });
fonteRodape(s, "Bee & Boyd, cap. 8, p. 214 (Patterson 1980) e p. 226 (ceder à birra reforça o padrão)");
satRef(s, "A");

// S31 · Contracena TDAH pré-escolar
s = novo({ ato: A2 });
vigilancia(s, "O pré-escolar que deveria te tirar o sono não é o levado: é o que mantém a mesma intensidade em qualquer contexto.",
  "Sinais honestos: intensidade INVARIANTE a contexto; birras que não declinam com a idade; regulação sempre terceirizada; expulsões de escolinha. Dado: regulação aos 2 prediz agressão aos 4 (Rubin 2003, p. 206). Guardar o porquê da entrada escolar para o Ato 3.");
card(s, 0.9, 2.7, 5.5, 3.1, { fill: PP.branco, borda: PP.roxoMedio, bw: 0.75 });
txt(s, "AGITADO E NORMAL", { x: 1.2, y: 2.95, w: 4.9, h: 0.45, bold: true, fontSize: 15.5 });
txt(s, "intensidade que RESPONDE a contexto: pior no fim do dia, melhor no interesse, regulável pelo adulto. Birras em declínio ano a ano.", { x: 1.2, y: 3.45, w: 4.9, h: 2.1, fontSize: 14.5, lineSpacingMultiple: 1.15 });
card(s, 6.9, 2.7, 5.5, 3.1, { fill: PP.branco, borda: PP.coral, bw: 2 });
txt(s, "SINAL DE ALERTA", { x: 7.2, y: 2.95, w: 4.9, h: 0.45, bold: true, fontSize: 15.5, color: PP.coralTexto });
txt(s, "a MESMA intensidade em casa, escola, consultório e festa. Birras que não declinam. Co-regulação que nunca é dispensada.", { x: 7.2, y: 3.45, w: 4.9, h: 2.1, fontSize: 14.5, lineSpacingMultiple: 1.15 });
fonteRodape(s, "Bee & Boyd, cap. 8, p. 206-207");
satRef(s, "B");

// S32 · Fecho Ato 2
s = novo({ dark: true, ato: A2 });
fechoAto(s, "Essa mente que descobriu outras mentes vai ser trancada numa sala com 25 iguais e um adulto só. O que acontece?", 2,
  "Painel: a linguagem já dirige em voz alta; o freio interno em instalação. O Ato 3 é a resposta.");

// ============================================================================
// ATO 3 (5-7) — A GRANDE VIRADA
// ============================================================================
const A3 = "ATO 3 · 5-7 ANOS";

// S33 · Cena Alice 3
s = novo({ ato: A3 });
cenaAlice(s, "6 ANOS", "Alice, 6 anos, segura o choro na escola inteira e desaba no banco de trás do carro da mãe.",
  "A professora diz que Alice é um doce: espera a vez, guarda o material, não chora. A mãe estranha: no carro, na saída, Alice desmonta. Chora do nada, briga com a irmã, “vira outra”. “O que a escola tem que eu não tenho?”",
  "Régua escondida: a mãe virou GARAGEM (o dia inteiro fora do volante, e ainda a peça mais importante do carro: onde o freio esfria). Resposta: a escola tem plateia e regra; o carro tem a mãe. O freio novo funciona a tarde inteira, mas esquenta. É o preço de um freio recém-instalado.");

// S34 · Cérebro troca de marcha
s = novo({ ato: A3 });
titulo(s, "Entre os 5 e os 7 o cérebro troca de marcha: surto frontal, atenção que obedece e processamento mais rápido.");
filete(s);
const gauges = [
  ["SURTO CEREBRAL 6-8", "novas sinapses,\ncórtex mais espesso", 0.55],
  ["ATENÇÃO SELETIVA", "mielinização formação\nreticular ↔ lobo frontal", 0.7],
  ["VELOCIDADE", "tempo de reação cai com a\nidade (Kail), em qualquer cultura", 0.85],
];
gauges.forEach((g, i) => {
  const x = 1.0 + i * 4.0;
  card(s, x, 2.7, 3.5, 2.9, { fill: PP.branco, borda: PP.roxoMedio, bw: 0.75 });
  txt(s, g[0], { x: x + 0.2, y: 2.9, w: 3.1, h: 0.5, bold: true, fontSize: 14.5 });
  txt(s, g[1], { x: x + 0.2, y: 3.4, w: 3.1, h: 0.9, fontSize: 13 });
  s.addShape(ST.rect, { x: x + 0.25, y: 4.9, w: 3.0, h: 0.32, fill: { color: PP.lavandaClara } });
  s.addShape(ST.rect, { x: x + 0.25, y: 4.9, w: 3.0 * g[2], h: 0.32, fill: { color: i === 2 ? PP.coral : PP.dourado } });
});
fonteRodape(s, "Bee & Boyd, cap. 9, p. 234-235 e p. 242 · o rótulo “shift 5-7” é da literatura clássica (White)");
s.addNotes("Honestidade: o livro descreve a convergência sem usar o nome 'shift 5-7'. Automaticidade: recuperar sem gastar memória de curto prazo; é o que a alfabetização e a tabuada exploram.");

// S35-S37 · V6 conservação
s = novo({ ato: A3 });
molduraAntes(s, "A mesma água, a mesma pergunta, duas crianças: o que muda entre os 5 e os 7?", "V6 · CONSERVAÇÃO", "Votem: o que a de 5 vai responder, e com que grau de convicção?",
  "A plateia costuma subestimar a CONVICÇÃO do erro pré-operatório; deixar virar surpresa.");
s = novo({ dark: true, ato: A3 });
slideVideo(s, "V6", "Conservação de líquido: criança de ~5 erra com convicção; criança de ~7 acerta e justifica.", "pausar entre as duas: “o que mudou entre elas não foi treino”");
s = novo({ ato: A3 });
titulo(s, "Não foi a resposta que mudou, foi a lógica: reversibilidade e descentração inauguram o operatório concreto.");
filete(s);
["IDENTIDADE\nnada entrou, nada saiu", "COMPENSAÇÃO\nmais alto, porém mais fino", "REVERSIBILIDADE\ndá para despejar de volta"].forEach((t, i) => {
  const x = 0.9 + i * 3.4;
  s.addText(t, {
    shape: ST.roundRect, rectRadius: 0.07, x, y: 2.7, w: 3.1, h: 1.1,
    fill: { color: PP.lavanda }, color: PP.roxoProfundo, fontFace: SANS, fontSize: 13.5, align: "center", valign: "middle", bold: false,
  });
});
txt(s, "descentração = considerar mais de uma dimensão ao mesmo tempo; a compensação é ela em ação", { x: 0.9, y: 3.92, w: 11.5, h: 0.35, fontSize: 12, italic: true, color: PP.roxoMedio });
card(s, 0.9, 4.35, 11.5, 1.5, { fill: PP.branco, borda: PP.roxoMedio, bw: 0.75 });
txt(s, "E chega em ondas (décalage): massa ~7 · peso ~8 · volume só ~11. No longitudinal de Tomlinson-Keasey, o salto acontece perto dos 7, onde Piaget o colocou.", { x: 1.2, y: 4.7, w: 11, h: 0.95, fontSize: 15 });
fonteRodape(s, "Bee & Boyd, cap. 7, p. 182-183; cap. 9, p. 240-241");
s.addNotes("Se perguntarem 'Piaget não foi superado?': os fenômenos replicam; a explicação mudou (Siegler: regras adquiridas por experiência + processamento). Mapa sim, mecanismo não. Nota de fonte: massa 7 / peso 8 / volume 11 é a sequência do Bee & Boyd p. 241 (Tomlinson-Keasey); parte da literatura situa peso perto dos 9.");

// S38 · Escola sem co-regulação
s = novo({ ato: A3 });
titulo(s, "A escola é o primeiro ambiente que exige autorregulação sem oferecer co-regulação.");
filete(s);
card(s, 1.4, 2.7, 4.6, 3.0, { fill: PP.lavandaClara });
s.addText("1:1", { x: 1.7, y: 3.0, w: 4.0, h: 1.2, fontFace: SERIF, fontSize: 54, bold: true, color: PP.roxoMedio, align: "center" });
txt(s, "CASA\nregulação sob demanda,\nindividualizada, disponível", { x: 1.7, y: 4.3, w: 4.0, h: 1.2, align: "center", fontSize: 14 });
card(s, 7.2, 2.7, 4.6, 3.0, { fill: PP.branco, borda: PP.coral, bw: 2 });
s.addText("1:25", { x: 7.5, y: 3.0, w: 4.0, h: 1.2, fontFace: SERIF, fontSize: 54, bold: true, color: PP.coral, align: "center" });
txt(s, "SALA DE AULA\nesperar a vez, ficar sentado,\natenção sustentada em tarefa chata", { x: 7.5, y: 4.3, w: 4.0, h: 1.2, align: "center", fontSize: 14 });
fonteRodape(s, "Bee & Boyd, cap. 10, p. 271: autorregular = conformar-se ao padrão SEM supervisão direta, esperado aos 6-12");
s.addNotes("É o primeiro estresse-teste padronizado do freio interno. Preparação direta do próximo slide.");

// S39 · PONTO DRAMÁTICO
s = novo({ ato: A3 });
titulo(s, "O TDAH não aparece aos 6 anos: ele fica visível quando a curva da demanda cruza a curva do freio.");
filete(s);
// eixo
s.addShape(ST.line, { x: 1.6, y: 5.9, w: 9.8, h: 0, line: { color: PP.roxoMedio, width: 1.5 } });
s.addShape(ST.line, { x: 1.6, y: 2.6, w: 0, h: 3.3, line: { color: PP.roxoMedio, width: 1.5 } });
// curva freio típico (contínua, dourada)
s.addShape(ST.line, { x: 1.6, y: 5.75, w: 3.4, h: -1.0, line: { color: PP.dourado, width: 4 } });
s.addShape(ST.line, { x: 5.0, y: 4.75, w: 3.2, h: -0.9, line: { color: PP.dourado, width: 4 } });
s.addShape(ST.line, { x: 8.2, y: 3.85, w: 3.1, h: -0.65, line: { color: PP.dourado, width: 4 } });
txt(s, "freio típico (maturação contínua)", { x: 8.75, y: 3.9, w: 3.6, h: 0.4, fontSize: 12, color: PP.roxoProfundo, bold: true });
// curva freio TDAH (mais baixa, tracejada)
s.addShape(ST.line, { x: 1.6, y: 5.85, w: 4.4, h: -0.75, line: { color: PP.roxoMedio, width: 3.5, dashType: "dash" } });
s.addShape(ST.line, { x: 6.0, y: 5.1, w: 5.3, h: -0.7, line: { color: PP.roxoMedio, width: 3.5, dashType: "dash" } });
txt(s, "freio TDAH: já era mais baixo antes;\na escola só revelou", { x: 8.75, y: 5.35, w: 3.6, h: 0.6, fontSize: 11.5, color: PP.roxoMedio, bold: true });
// demanda (escada: degrau menor na pré-escola, maior na entrada escolar)
s.addShape(ST.line, { x: 1.6, y: 5.3, w: 1.7, h: 0, line: { color: PP.coral, width: 4 } });
s.addShape(ST.line, { x: 3.3, y: 5.0, w: 0, h: 0.3, line: { color: PP.coral, width: 4 } });
s.addShape(ST.line, { x: 3.3, y: 5.0, w: 2.2, h: 0, line: { color: PP.coral, width: 4 } });
s.addShape(ST.line, { x: 5.5, y: 3.3, w: 0, h: 1.7, line: { color: PP.coral, width: 4 } });
s.addShape(ST.line, { x: 5.5, y: 3.3, w: 5.8, h: -0.3, line: { color: PP.coral, width: 4 } });
txt(s, "demanda por autorregulação (escada)", { x: 5.75, y: 2.62, w: 4.4, h: 0.4, fontSize: 12.5, color: PP.coralTexto, bold: true });
txt(s, "pré-escola", { x: 3.35, y: 5.08, w: 1.8, h: 0.3, fontSize: 10.5, color: PP.coralTexto });
txt(s, "ENTRADA NA ESCOLA", { x: 4.55, y: 6.0, w: 2.4, h: 0.35, fontSize: 11.5, bold: true, color: PP.coralTexto, align: "center" });
s.addShape(ST.rect, { x: 5.5, y: 3.15, w: 3.0, h: 1.35, fill: { color: PP.coral, transparency: 82 } });
txt(s, "a área entre as curvas\né onde vira queixa", { x: 5.7, y: 3.35, w: 2.7, h: 0.8, fontSize: 12, italic: true, color: PP.roxoProfundo });
fonteRodape(s, "Bee & Boyd, cap. 9, p. 255-257 · em muitas tarefas de atenção, não diferem dos pares");
satRef(s, "B");
s.addNotes("[APOSTA] ANTES de mostrar: 'por que a fila do TDAH no ambulatório começa aos 6, e não aos 4?'. Colher palpites, revelar. Frase para levar: a demanda subiu antes de o freio ficar pronto. O freio já era imaturo aos 4; aos 4 ninguém precisava dele. Duas ressalvas de fala (detalhadas no apêndice B): o vão explica QUANDO chega à consulta, não O QUE o TDAH é; e o mesmo vão produz falsos positivos (efeito de idade relativa).");

// S40-S42 · V7 marshmallow
s = novo({ ato: A3 });
molduraAntes(s, "O que uma criança de 4 anos sozinha com um doce diz sobre o resto da vida dela?", "V7 · DELAY OF GRATIFICATION", null,
  "Deixar a plateia romantizar antes da ressalva do S42.");
s = novo({ dark: true, ato: A3 });
slideVideo(s, "V7", "Paradigma de Mischel: as estratégias de espera visíveis (tampar os olhos, cantar, cheirar o doce).", null);
s = novo({ ato: A3 });
titulo(s, "Menos do que se sonhou: com controles adequados o efeito encolhe; esperar é termômetro do freio, não oráculo do destino.");
filete(s);
s.addShape(ST.rect, { x: 2.7, y: 2.7, w: 2.1, h: 2.8, fill: { color: PP.lavanda } });
txt(s, "efeito\noriginal", { x: 2.5, y: 5.6, w: 2.5, h: 0.7, align: "center", fontSize: 13.5, bold: true });
s.addShape(ST.rect, { x: 7.3, y: 4.5, w: 2.1, h: 1.0, fill: { color: PP.coral } });
txt(s, "com controles de família\ne cognição (Watts 2018)", { x: 6.7, y: 5.6, w: 3.3, h: 0.7, align: "center", fontSize: 13.5, bold: true, color: PP.coralTexto });
fonteRodape(s, "Watts, Duncan & Quan (2018), Psychological Science · replicação com amostra maior e diversa");
s.addNotes("O que continua valendo: a melhor IMAGEM do freio imaturo em ação (as estratégias de distração SÃO autorregulação nascente). O que morreu: o oráculo. Precisão para a fala: com controles completos de família e cognição precoce, a maior parte do efeito desaparece (não significativo em vários modelos de Watts 2018); evitar fração fixa.");

// S43-S45 · V8 autocorreção
s = novo({ ato: A3 });
molduraAntes(s, "Uma criança de 7 anos fazendo lição: conte quantas vezes ela se corrige sozinha, sem som.", "V8 · DNPM NORMAL", null, null);
s = novo({ dark: true, ato: A3 });
slideVideo(s, "V8", "Criança de 6-7 anos escrevendo, apagando e corrigindo sozinha, em silêncio. 15-30 segundos.", null);
s = novo({ ato: A3 });
titulo(s, "A autocorreção silenciosa é a fala privada já internalizada: o volante passou para dentro.");
filete(s);
const etapas2 = ["FALA DO ADULTO", "FALA PRIVADA (3a)", "PENSAMENTO VERBAL (6-7a)"];
etapas2.forEach((e, i) => {
  s.addText(e, {
    shape: ST.roundRect, rectRadius: 0.07, x: 0.9 + i * 4.1, y: 3.3, w: 3.5, h: 0.85,
    fill: { color: i === 2 ? PP.coral : PP.dourado }, color: i === 2 ? PP.branco : PP.roxoProfundo,
    fontFace: SANS, fontSize: 14, bold: true, align: "center", valign: "middle",
  });
  if (i < 2) s.addShape(ST.line, { x: 0.9 + i * 4.1 + 3.55, y: 3.72, w: 0.5, h: 0, line: { color: PP.roxoMedio, width: 3, endArrowType: "triangle" } });
});
txt(s, "a seta do Ato 2, agora completa (estágio de crescimento interno, Vygotsky)", { x: 0.9, y: 4.5, w: 11.5, h: 0.5, align: "center", fontSize: 14, italic: true, color: PP.roxoMedio });
fonteRodape(s, "Bee & Boyd, cap. 7, p. 188");
s.addNotes("Fechamento do arco da fala privada. Curto.");

// S46 · Fecho Ato 3
s = novo({ dark: true, ato: A3 });
fechoAto(s, "Autorregulada na sala, Alice levanta os olhos do caderno e olha para os lados. O que ela vê?", 3,
  "Painel: freio interno instalado e quente; os pais já dirigem bem menos. O Ato 4 responde.");

// ============================================================================
// ATO 4 (7-puberdade) — O EU COMPARADO
// ============================================================================
const A4 = "ATO 4 · 7 ANOS → PUBERDADE";

// S47 · Cena Alice 4
s = novo({ ato: A4 });
cenaAlice(s, "9 ANOS", "Alice, 9 anos, avisa: “eu sou a tímida da sala, e a Júlia é melhor que eu em matemática”.",
  "Consulta de rotina. A mãe agora senta mais atrás e quase não fala. Pergunto da escola e é Alice quem responde, com um relatório: “sou a tímida da sala. A Júlia é melhor em matemática, mas eu desenho melhor. A Bia contou meu segredo, então agora é só amiga”.",
  "Régua escondida: a mãe virou PLATEIA. Notar o que chegou: traço psicológico, ranking por domínio, contrato de confiança rompido com cláusula rebaixada. Nenhum adulto ensinou isso. E notem quem NÃO precisou falar nada na consulta.");

// S48 · Autoconceito
s = novo({ ato: A4 });
titulo(s, "O autoconceito virou psicológico e comparativo: a criança se descreve por dentro, e sempre em ranking.");
filete(s);
card(s, 0.9, 2.6, 5.6, 2.6, { fill: PP.lavandaClara });
txt(s, "9 ANOS (superfície)", { x: 1.2, y: 2.8, w: 5, h: 0.4, bold: true, fontSize: 14, color: PP.roxoMedio });
txt(s, "“tenho cabelo castanho, moro na rua tal, jogo futebol”", { x: 1.2, y: 3.3, w: 5.0, h: 1.6, fontFace: SERIF, fontSize: 16, italic: true, lineSpacingMultiple: 1.2 });
card(s, 6.85, 2.6, 5.6, 2.6, { fill: PP.branco, borda: PP.coral, bw: 2 });
txt(s, "11 ANOS (psicológico e comparativo)", { x: 7.15, y: 2.8, w: 5, h: 0.4, bold: true, fontSize: 14, color: PP.coralTexto });
txt(s, "“sou verdadeira, perco a paciência, não sou muito querida por algumas meninas”", { x: 7.15, y: 3.3, w: 5.0, h: 1.6, fontFace: SERIF, fontSize: 16, italic: true, lineSpacingMultiple: 1.2 });
card(s, 0.9, 5.45, 11.55, 0.85, { fill: PP.lavanda });
txt(s, "Autoestima global só emerge ~7-8 anos, de 2 fontes: discrepância ideal-real NO QUE ELA VALORIZA + suporte percebido (Harter).", { x: 1.2, y: 5.65, w: 11, h: 0.55, fontSize: 14, bold: true });
fonteRodape(s, "Bee & Boyd, cap. 10, p. 265-267 (Montemayor & Eisen 1977, “Who am I?”)");
s.addNotes("Ser ruim no futebol só derruba quem valoriza futebol. Estabilidade: r≈0,60 em meses, ≈0,40 em anos. Comparação social não é vaidade: é o instrumento de calibração do eu nessa idade.");

// S49 · Amizade
s = novo({ ato: A4 });
titulo(s, "A amizade vira contrato de confiança recíproca: amigo é quem guarda segredo, não quem mora perto.");
filete(s);
s.addText("50-75%", { x: 0.9, y: 2.9, w: 4.4, h: 1.4, fontFace: SERIF, fontSize: 64, bold: true, color: PP.coral, align: "center" });
txt(s, "dos escolares têm melhor amigo estável,\ne isso protege inclusive a criança tímida", { x: 0.7, y: 4.3, w: 4.8, h: 0.8, align: "center", fontSize: 14 });
card(s, 6.2, 2.8, 6.2, 2.5, { fill: PP.branco, borda: PP.roxoMedio, bw: 0.75 });
txt(s, "ATÉ ~9a: amigo = quem brinca perto\nDOS ~10a: amigo = confiança recíproca, lealdade, apoio\n\nCom amigos há MAIS conflito, e mais empenho em resolver: a amizade é a academia do manejo de conflito.", { x: 6.5, y: 3.05, w: 5.6, h: 2.1, fontSize: 14, lineSpacingMultiple: 1.15 });
fonteRodape(s, "Bee & Boyd, cap. 10, p. 272-273 (Selman; Chen 1997; Hartup 1996)");
s.addNotes("Pré-requisito veio do Ato 2: reciprocidade 'você sabe que eu sei' (5-7a). Rose & Asher: quem põe a relação acima do próprio status tem mais amigos.");

// S50 · Moral
s = novo({ ato: A4 });
titulo(s, "A moral sai da heteronomia: entre os 7 e os 10, a regra deixa de ser sagrada e a intenção passa a contar.");
filete(s);
card(s, 0.9, 2.7, 5.6, 2.9, { fill: PP.lavandaClara });
txt(s, "REALISMO MORAL (até ~8)", { x: 1.2, y: 2.95, w: 5, h: 0.4, bold: true, fontSize: 14.5, color: PP.roxoMedio });
txt(s, "regras imutáveis, ditadas por autoridade; justiça imanente (o riacho pune); vale o TAMANHO do estrago", { x: 1.2, y: 3.45, w: 5.0, h: 1.9, fontSize: 14.5, lineSpacingMultiple: 1.15 });
card(s, 6.85, 2.7, 5.6, 2.9, { fill: PP.branco, borda: PP.coral, bw: 2 });
txt(s, "RELATIVISMO MORAL (após ~8)", { x: 7.15, y: 2.95, w: 5, h: 0.4, bold: true, fontSize: 14.5, color: PP.coralTexto });
txt(s, "regras são combináveis se todos concordarem; a INTENÇÃO pesa mais que a consequência (sair sem pagar por engano ≠ roubar)", { x: 7.15, y: 3.45, w: 5.0, h: 1.9, fontSize: 14.5, lineSpacingMultiple: 1.15 });
fonteRodape(s, "Bee & Boyd, cap. 10, p. 269-270 (Piaget, 1932)");
s.addNotes("Amarrar à tese: a regra deixou de morar no adulto (heteronomia = regulação externa) e passou a morar no ACORDO entre pares. Mais um pedaço do volante mudando de mão.");

// S51 · Grupo no volante
s = novo({ ato: A4 });
titulo(s, "O grupo de pares assume parte do volante: aceitação e rejeição regulam com força de lei.");
filete(s);
["POPULAR", "REJEITADA", "NEGLIGENCIADA"].forEach((t, i) => {
  s.addText(t, {
    shape: ST.roundRect, rectRadius: 0.07, x: 0.9 + i * 3.1, y: 2.75, w: 2.8, h: 0.75,
    fill: { color: i === 0 ? PP.dourado : PP.lavanda }, color: PP.roxoProfundo,
    fontFace: SANS, fontSize: 14, bold: true, align: "center", valign: "middle",
  });
});
txt(s, "negligenciada = ignorada PELOS PARES, sem rejeição ativa (não confundir com negligência parental). A moeda da aceitação é o que os atos anteriores construíram: regular a expressão emocional + ler mentes.", { x: 0.9, y: 3.7, w: 11.5, h: 0.65, fontSize: 13.5, italic: true });
card(s, 0.9, 4.5, 11.5, 1.35, { fill: PP.branco, borda: PP.coral, bw: 2 });
txt(s, [
  { text: "Neuroimagem: a exclusão social ativa a mesma área cerebral da dor física (Eisenberger, 2003). ", options: { bold: true } },
  { text: "O grupo pune com dor de verdade.", options: { color: PP.coralTexto, bold: true } },
], { x: 1.2, y: 4.85, w: 11, h: 0.7, fontSize: 15.5 });
fonteRodape(s, "Bee & Boyd, cap. 10, p. 274-278 · segregação por gênero como marca universal do período");
s.addNotes("Status sociométrico: comportamento social pesa mais que aparência (Rodkin 2013). Ressalva de fala sobre Eisenberger: achado clássico e útil como ILUSTRAÇÃO, mas a leitura 'mesma área = mesmo mecanismo' foi questionada por análises multivariadas posteriores; não usar como prova de identidade neural.");

// S52-S54 · V9 recreio
s = novo({ ato: A4 });
molduraAntes(s, "Nesta cena de recreio, responda: quem está com o volante?", "V9 · DNPM NORMAL", null, null);
s = novo({ dark: true, ato: A4 });
slideVideo(s, "V9", "Grupo de crianças de 9-10 anos negociando regras de um jogo, sem adulto. 15-30 segundos.", "congelar 1x: “quem está com o volante?”");
s = novo({ ato: A4 });
titulo(s, "Ninguém ali obedece a um adulto: regras negociadas, papéis distribuídos, sanções aplicadas. O grupo dirige.");
filete(s);
["NEGOCIAÇÃO\nda regra", "DISTRIBUIÇÃO\nde papéis", "SANÇÃO\naplicada pelo grupo"].forEach((t, i) => {
  s.addText(t, {
    shape: ST.roundRect, rectRadius: 0.07, x: 1.2 + i * 3.8, y: 3.1, w: 3.3, h: 1.2,
    fill: { color: PP.lavanda }, color: PP.roxoProfundo, fontFace: SANS, fontSize: 14.5, align: "center", valign: "middle",
  });
});
s.addNotes("Jogo de regras: o mesmo brincar que no Ato 1 anunciava o operatório concreto agora é instituição social autônoma.");

// S55 · Contracena 7+
s = novo({ ato: A4 });
vigilancia(s, "O que deveria te tirar o sono agora: a criança que o grupo devolve, e a que some sem fazer barulho.",
  "Ensinar a perguntar sobre RECREIO e AMIZADES como quem ausculta o coração: é o exame físico do eu comparado. Internalização com cara escolar: queda de rendimento, dor de barriga de domingo, sumiço do recreio, 'ninguém gosta de mim' persistente.");
const perfis = [
  ["AGRESSIVA + REJEITADA", "a pior trajetória: maior chance de agressão estável até a vida adulta"],
  ["RETRAÍDA / REJEITADA", "sabe que é malquista, desiste, se isola; solidão e depressão"],
  ["VÍTIMA HABITUAL", "ansiosa, passiva, baixa autoestima, poucos amigos"],
];
perfis.forEach((p, i) => {
  const x = 0.9 + i * 4.0;
  card(s, x, 2.75, 3.6, 2.7, { fill: PP.branco, borda: PP.coral, bw: 1.5 });
  txt(s, p[0], { x: x + 0.2, y: 3.0, w: 3.2, h: 0.75, bold: true, fontSize: 14, color: PP.coralTexto });
  txt(s, p[1], { x: x + 0.2, y: 3.8, w: 3.2, h: 1.5, fontSize: 13.5, lineSpacingMultiple: 1.12 });
});
fonteRodape(s, "Bee & Boyd, cap. 10, p. 276-278");

// S56 · Corpo pré-púbere
s = novo({ ato: A4 });
titulo(s, "Antes de a estrada mudar, o carro treme: o pré-púbere sente o corpo começar a mudar, e compara isso também.");
filete(s);
s.addText("94%", { x: 1.6, y: 2.8, w: 3.6, h: 1.3, fontFace: SERIF, fontSize: 66, bold: true, color: PP.coral, align: "center" });
txt(s, "da altura adulta:\nmeninas aos 12", { x: 1.6, y: 4.15, w: 3.6, h: 0.7, align: "center", fontSize: 14.5, bold: true });
s.addText("84%", { x: 7.9, y: 2.8, w: 3.6, h: 1.3, fontFace: SERIF, fontSize: 66, bold: true, color: PP.roxoMedio, align: "center" });
txt(s, "da altura adulta:\nmeninos aos 12", { x: 7.9, y: 4.15, w: 3.6, h: 0.7, align: "center", fontSize: 14.5, bold: true });
card(s, 1.0, 5.15, 11.3, 0.95, { fill: PP.lavandaClara });
txt(s, "Mudar ANTES ou DEPOIS da turma entra na mesma máquina de comparação do eu. O detalhe do timing puberal fica para a próxima aula.", { x: 1.3, y: 5.38, w: 10.8, h: 0.6, fontSize: 14.5 });
fonteRodape(s, "Bee & Boyd, cap. 9, p. 234 (Tanner, 1990)");
s.addNotes("Aqui só se anuncia o tremor. Não entrar em estadiamento.");

// S57 · Cena Alice 5 + CLIFFHANGER (escuro)
s = novo({ dark: true, ato: A4 });
s.addText("CENA · ALICE, QUASE 11", {
  shape: ST.roundRect, rectRadius: 0.08, x: 0.6, y: 0.32, w: 3.4, h: 0.4,
  fill: { color: PP.dourado }, color: PP.roxoProfundo, fontFace: SANS, fontSize: 12.5, bold: true, align: "center", valign: "middle",
});
titulo(s, "Alice, quase 11, pede que a mãe espere lá fora. E a puberdade, que sacode o carro inteiro, é onde a próxima aula começa.", { dark: true, y: 0.95 });
s.addText("“A consulta que começou nove anos atrás com a mãe respondendo até a idade dela termina sem a mãe na sala. O volante está com Alice. E é exatamente agora que a puberdade liga o terremoto.”", {
  x: 0.9, y: 2.9, w: 11.5, h: 1.9, fontFace: SERIF, fontSize: 19, italic: true, color: PP.lavanda, lineSpacingMultiple: 1.25,
});
timeline(s, { y: 5.75, sismo: true });
s.addNotes("Cena 5 narrada: a porta fecha, Alice conta que o corpo começou a mudar e ainda não contou a ninguém da turma. Passagem de bastão nominal ao professor de adolescência.");

// ============================================================================
// FECHO
// ============================================================================

// S58 · Síntese (espelho do S3)
s = novo({ ato: "FECHO" });
titulo(s, "A história em uma tela: ambiente → linguagem → outras mentes → freio interno → grupo. O volante nunca parou de mudar de mão.");
filete(s);
timeline(s, { y: 4.65, diagnosticos: true });
volante(s, 4, { y: 6.55 });
s.addNotes("Este é o MESMO mapa do início: o slide que abriu como promessa fecha como prova. REVELAÇÃO da régua escondida: 'repararam no que a mãe da Alice fez ao longo da aula? Respondeu por ela, depois perguntou, depois virou garagem, depois plateia, e hoje ficou na sala de espera. Vocês assistiram à transferência do volante em cinco consultas.'");

// S59 · Take-home
s = novo({ ato: "FECHO" });
titulo(s, "Diante de qualquer criança, a primeira pergunta é: de quem é o volante nessa idade, e como vai a transferência?");
filete(s);
const rows = [
  [{ text: "IDADE", options: { bold: true, color: PP.offWhite, fill: { color: PP.roxoProfundo } } },
   { text: "O NORMAL QUE TRANQUILIZA", options: { bold: true, color: PP.offWhite, fill: { color: PP.roxoProfundo } } },
   { text: "O QUE DEVERIA TIRAR O SONO", options: { bold: true, color: PP.offWhite, fill: { color: PP.roxoProfundo } } }],
  ["2-3", "birra, “não”, faz de conta, explosão de palavras", "apontar que só pede e nunca mostra; sem faz de conta; não responde ao nome"],
  ["3-5", "mentira instrumental, fala sozinho, iniciativa com culpa", "oposição que cresce porque funciona; intensidade igual em todo contexto"],
  ["5-7", "cansaço regulatório (desabar em casa); erro de conservação aos 5", "freio abaixo da demanda em TODA tarefa chata, em casa E na escola"],
  ["7 → pub.", "comparação, panelinhas, melhor amigo, moral de combinado", "a criança que o grupo devolve; a que some em silêncio; a vítima habitual"],
];
s.addTable(rows.map((r, ri) => r.map((c, ci) => {
  if (typeof c === "string") return { text: c, options: { fill: { color: ri % 2 === 1 ? PP.branco : PP.lavandaClara }, color: PP.roxoProfundo, bold: ci === 0 } };
  return c;
})), {
  x: 0.6, y: 2.35, w: 12.1, fontFace: SANS, fontSize: 12.5, valign: "middle",
  border: { type: "solid", color: PP.roxoMedio, pt: 0.5 }, rowH: 0.72, colW: [1.35, 5.35, 5.4],
});
satRef(s, "D");
s.addNotes("Ler as 4 linhas em 90 segundos. É o handout mental que eles levam.");

// S60 · Referências
s = novo({ ato: "FECHO" });
titulo(s, "Fontes e material de apoio");
filete(s);
txt(s, "FONTE PRIMÁRIA", { x: 0.7, y: 2.3, w: 5, h: 0.4, bold: true, fontSize: 13, charSpacing: 2, color: PP.roxoMedio });
txt(s, "Bee, H. & Boyd, D. Lifespan Development.\nCaps. 7-10 (pp. 173-286): primeira infância e infância intermediária, desenvolvimento físico, cognitivo, social e de personalidade.", { x: 0.7, y: 2.75, w: 11.8, h: 1.1, fontSize: 15, lineSpacingMultiple: 1.15 });
txt(s, "COMPLEMENTOS PONTUAIS", { x: 0.7, y: 4.05, w: 5, h: 0.4, bold: true, fontSize: 13, charSpacing: 2, color: PP.roxoMedio });
txt(s, "Watts, Duncan & Quan (2018), Psychological Science · replicação do delay of gratification\nBaron-Cohen, Leslie & Frith (1985) · falsa crença (Sally-Anne)\nAmsterdam (1972) · autorreconhecimento no espelho\nWhite (1965) · o “5-to-7 shift”\nM-CHAT-R/F · atenção compartilhada no rastreio do segundo ano", { x: 0.7, y: 4.5, w: 11.8, h: 1.7, fontSize: 14, lineSpacingMultiple: 1.25 });
card(s, 0.7, 6.15, 11.9, 0.95, { fill: PP.lavanda });
txt(s, "Documento de apoio completo (páginas, scripts e ressalvas) na plataforma. Aprofundamento no apêndice: A anatomia da birra · B as duas curvas do TDAH · C falsa crença · D perguntas frequentes.", { x: 1.0, y: 6.3, w: 11.3, h: 0.7, fontSize: 13 });
satRef(s, "D");
s.addNotes("Fim. Agradecer e apontar o documento de apoio. Perguntas da plateia: saltar para o apêndice D (respostas prontas) quando houver slide correspondente.");

// ---------------------------------------------------------------------------
global.__SLIDE_OFFSET__ = nSlide;
if (require.main === module) {
  pres.writeFile({ fileName: __dirname + "/Desenvolvimento-normal-2a-puberdade_PsiquiatriaPratica.pptx" })
    .then(() => console.log("OK: deck gerado com", nSlide, "slides"));
}
