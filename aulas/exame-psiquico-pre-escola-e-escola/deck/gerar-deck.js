// ============================================================================
// Deck: O exame psíquico da criança (0 a 5 e 6 a 12 anos)
// Camada 3 sobre a spec 02-arquitetura-slides.md (v5).
// Fonte única de conteúdo: livro-do-professor-COMPLETO.md (fonte máxima).
// Identidade Psiquiatria Prática (tokens da aula de desenvolvimento normal).
// Gera: AULA-OFICIAL_Exame-psiquico-crianca-0a5-6a12_PsiquiatriaPratica.pptx
// Regras: assertion-evidence; sem travessão; sem selo de remissão;
// notas de apresentador em todos os slides; par de registro por domínio.
// ============================================================================
const pptxgen = require("pptxgenjs");

const PP = {
  roxoProfundo: "56365F", roxoMedio: "8A6594", lavanda: "DDC9E3",
  lavandaClara: "EDE2F0", offWhite: "F6EFF2", branco: "FFFFFF",
  coral: "E96030", coralTexto: "B84A1F", dourado: "ECB841",
};

const pres = new pptxgen();
pres.defineLayout({ name: "WIDE", width: 13.33, height: 7.5 });
pres.layout = "WIDE";
const ST = pres.ShapeType;
const W = 13.33, H = 7.5;
const SERIF = "Georgia", SANS = "Calibri";

let nSlide = 0;

// ---------------------------------------------------------------- helpers ---
function novo({ dark = false, bloco = null } = {}) {
  nSlide++;
  const s = pres.addSlide();
  s.background = { color: dark ? PP.roxoProfundo : PP.offWhite };
  if (bloco) {
    s.addText(bloco, {
      shape: ST.roundRect, rectRadius: 0.08, x: W - 3.75, y: 0.28, w: 3.2, h: 0.34,
      fill: { color: PP.dourado }, color: PP.roxoProfundo, fontFace: SANS,
      fontSize: 10.5, bold: true, align: "center", valign: "middle",
    });
  }
  s.addText(String(nSlide), {
    x: W - 0.7, y: H - 0.42, w: 0.45, h: 0.3, fontFace: SANS, fontSize: 10,
    color: dark ? PP.lavanda : PP.roxoMedio, align: "right",
  });
  return s;
}

function titulo(s, txt2, { dark = false, size = null, y = 0.42, w = 8.9 } = {}) {
  const fs = size || (txt2.length > 118 ? 19 : txt2.length > 85 ? 21 : 23);
  s.addText(txt2, {
    x: 0.6, y, w, h: 1.55, fontFace: SERIF, fontSize: fs, bold: true,
    color: dark ? PP.offWhite : PP.roxoProfundo, valign: "top", lineSpacingMultiple: 1.04,
  });
}

function filete(s, { y = 2.0, dark = false } = {}) {
  s.addShape(ST.rect, { x: 0.62, y, w: 1.5, h: 0.045, fill: { color: dark ? PP.dourado : PP.coral } });
}

function fonteRodape(s, txt2, dark = false) {
  s.addText(txt2, {
    x: 0.6, y: H - 0.46, w: 10.5, h: 0.34, fontFace: SANS, fontSize: 11,
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

// Lista com marcador dourado
function bullets(s, items, { x = 1.1, y = 2.4, w = 11.2, gap = 0.78, fontSize = 15 } = {}) {
  items.forEach((t, i) => {
    s.addShape(ST.ellipse, { x, y: y + i * gap + 0.07, w: 0.22, h: 0.22, fill: { color: PP.dourado } });
    txt(s, t, { x: x + 0.45, y: y + i * gap, w: w - 0.45, h: gap, fontSize, lineSpacingMultiple: 1.08 });
  });
}

// Par de registro do livro: ruim / certo
function parRegistro(s, ruim, certo, { y = 5.15, h = 1.6 } = {}) {
  s.addText("PAR DE REGISTRO", {
    x: 0.62, y: y - 0.33, w: 3.5, h: 0.28, fontFace: SANS, fontSize: 10, charSpacing: 2,
    bold: true, color: PP.roxoMedio,
  });
  card(s, 0.6, y, 4.5, h, { fill: PP.lavandaClara, borda: PP.roxoMedio, bw: 0.75 });
  txt(s, "RUIM", { x: 0.85, y: y + 0.12, w: 2, h: 0.3, bold: true, fontSize: 11, color: PP.coralTexto });
  txt(s, "“" + ruim + "”", { x: 0.85, y: y + 0.44, w: 4.0, h: h - 0.55, fontSize: 12.5, italic: true, lineSpacingMultiple: 1.08 });
  card(s, 5.3, y, 7.4, h, { fill: PP.branco, borda: PP.coral, bw: 1.5 });
  txt(s, "CERTO", { x: 5.55, y: y + 0.12, w: 2, h: 0.3, bold: true, fontSize: 11, color: PP.coralTexto });
  txt(s, "“" + certo + "”", { x: 5.55, y: y + 0.44, w: 6.9, h: h - 0.55, fontSize: 12.5, lineSpacingMultiple: 1.08 });
}

// Divisor de bloco (escuro)
function divisor(s, kicker, tituloTxt, sub, notas) {
  s.addText(kicker, {
    shape: ST.roundRect, rectRadius: 0.08, x: 0.62, y: 1.15, w: 5.2, h: 0.44,
    fill: { color: PP.dourado }, color: PP.roxoProfundo, fontFace: SANS, fontSize: 13, bold: true, align: "center", valign: "middle",
  });
  s.addText(tituloTxt, { x: 0.62, y: 1.95, w: 12.0, h: 2.9, fontFace: SERIF, fontSize: 29, bold: true, color: PP.offWhite, lineSpacingMultiple: 1.12 });
  if (sub) s.addText(sub, { x: 0.62, y: 5.15, w: 11.8, h: 1.3, fontFace: SANS, fontSize: 15, color: PP.lavanda, lineSpacingMultiple: 1.2 });
  if (notas) s.addNotes(notas);
}

// Cena de Bento (vinheta clínica)
function cenaBento(s, chip, tituloTxt, legenda, notas) {
  s.addShape(ST.rect, { x: 0, y: 2.15, w: W, h: 4.35, fill: { color: PP.lavandaClara } });
  s.addShape(ST.rect, { x: 0, y: 2.15, w: 0.14, h: 4.35, fill: { color: PP.coral } });
  s.addText(chip, {
    shape: ST.roundRect, rectRadius: 0.08, x: 0.6, y: 0.32, w: 3.4, h: 0.4,
    fill: { color: PP.dourado }, color: PP.roxoProfundo, fontFace: SANS, fontSize: 12.5, bold: true, align: "center", valign: "middle",
  });
  titulo(s, tituloTxt, { y: 0.95, size: 22, w: 12.1 });
  txt(s, legenda, { x: 0.85, y: 2.55, w: 11.6, h: 3.5, fontFace: SERIF, fontSize: 16.5, italic: true, lineSpacingMultiple: 1.22, color: PP.roxoProfundo });
  txt(s, "cena narrada ao vivo · script nas notas", { x: 0.85, y: 6.1, w: 9, h: 0.35, fontSize: 12, color: PP.roxoMedio, italic: true });
  s.addNotes(notas);
}

// Moldura de vídeo (antes) e slide de vídeo
function molduraAntes(s, pergunta, vid, notas) {
  s.addShape(ST.roundRect, { x: 0.6, y: 1.55, w: 12.1, h: 3.1, rectRadius: 0.08, fill: { color: PP.lavanda } });
  txt(s, pergunta, { x: 1.0, y: 1.95, w: 11.3, h: 2.4, fontFace: SERIF, fontSize: 25, bold: true, color: PP.roxoProfundo, lineSpacingMultiple: 1.1 });
  s.addText("VÍDEO " + vid, {
    shape: ST.roundRect, rectRadius: 0.08, x: 0.6, y: 5.0, w: 3.3, h: 0.44,
    fill: { color: PP.roxoProfundo }, color: PP.offWhite, fontFace: SANS, fontSize: 11.5, bold: true, align: "center", valign: "middle",
  });
  if (notas) s.addNotes(notas);
}

function slideVideo(s, vid, desc, tecnica) {
  s.addShape(ST.ellipse, { x: 5.62, y: 2.15, w: 2.1, h: 2.1, fill: { color: PP.coral } });
  s.addShape(ST.triangle, { x: 6.35, y: 2.72, w: 0.85, h: 0.95, rotate: 90, fill: { color: PP.offWhite } });
  s.addText("VÍDEO " + vid, { x: 0, y: 4.55, w: W, h: 0.5, align: "center", fontFace: SANS, fontSize: 17, bold: true, color: PP.dourado });
  s.addText(desc, { x: 2.2, y: 5.1, w: 8.93, h: 0.9, align: "center", fontFace: SANS, fontSize: 14.5, color: PP.offWhite, lineSpacingMultiple: 1.15 });
  if (tecnica) s.addText(tecnica, { x: 2.2, y: 6.0, w: 8.93, h: 0.6, align: "center", fontFace: SANS, fontSize: 12.5, italic: true, color: PP.lavanda });
  s.addText("acervo público · nunca paciente próprio", { x: 0, y: H - 0.5, w: W - 0.8, h: 0.3, align: "right", fontFace: SANS, fontSize: 10.5, color: PP.lavanda });
}

// Chip do tropeço (o erro de transporte do domínio)
function tropeco(s, texto, { y = 4.1, w = 12.1 } = {}) {
  card(s, 0.6, y, w, 0.85, { fill: PP.lavandaClara });
  s.addShape(ST.rect, { x: 0.6, y, w: 0.09, h: 0.85, fill: { color: PP.coral } });
  txt(s, [
    { text: "TROPEÇO  ", options: { bold: true, color: PP.coralTexto, fontSize: 12 } },
    { text: texto, options: { fontSize: 13.5 } },
  ], { x: 0.9, y: y + 0.16, w: w - 0.6, h: 0.62, lineSpacingMultiple: 1.05 });
}

const LIVRO = "Livro do professor · ";
let s;

// ============================================================================
// MOLDURA (Parte I) · S1 a S7
// ============================================================================

// S1 · Capa
s = novo({ dark: true });
s.addShape(ST.ellipse, { x: 10.3, y: 1.0, w: 2.1, h: 2.1, fill: { color: PP.roxoProfundo }, line: { color: PP.dourado, width: 9 } });
s.addShape(ST.ellipse, { x: 10.95, y: 1.6, w: 0.42, h: 0.42, fill: { color: PP.coral } });
s.addShape(ST.line, { x: 10.62, y: 2.25, w: 1.45, h: 0.5, line: { color: PP.dourado, width: 4 }, flipV: true });
s.addText("O exame psíquico da criança", { x: 0.7, y: 2.0, w: 9.6, h: 1.0, fontFace: SERIF, fontSize: 38, bold: true, color: PP.offWhite });
s.addText("na pré-escola e na escola · 0 a 5 e 6 a 12 anos", { x: 0.7, y: 2.95, w: 9.4, h: 0.7, fontFace: SERIF, fontSize: 25, color: PP.lavanda });
s.addShape(ST.rect, { x: 0.72, y: 3.9, w: 1.7, h: 0.05, fill: { color: PP.dourado } });
s.addText("o mesmo mapa, em outra língua", { x: 0.7, y: 4.1, w: 9.4, h: 0.6, fontFace: SERIF, fontSize: 20, italic: true, color: PP.dourado });
s.addText("Dr. Diego Alves Rosa · psiquiatria da infância e adolescência\nPsiquiatria Prática · curso de residentes", { x: 0.7, y: 5.9, w: 9, h: 0.9, fontFace: SANS, fontSize: 15, color: PP.offWhite, lineSpacingMultiple: 1.3 });
s.addNotes("Abertura em 30 segundos e direto para o S2. O subtítulo é a tese; deixar que trabalhe sozinho.");

// S2 · O problema é o transporte
s = novo({ bloco: "MOLDURA" });
titulo(s, "Vocês já sabem examinar o adulto; o que falha diante da criança não é o conhecimento, é o transporte.");
filete(s, { y: 2.15 });
bullets(s, [
  "Três hábitos que funcionam perfeitamente no adulto falham inteiros na criança. Não são erros de conhecimento, são erros de transporte.",
  "O residente sabe a semiologia; aplica ao paciente errado, do jeito errado, porque ninguém mostrou que o instrumento muda aos quatro anos.",
  "A tarefa desta primeira parte: desinstalar os três hábitos e instalar três traduções. Sem elas, o laudo descreve uma criança que não existe.",
], { y: 2.55, gap: 1.0 });
card(s, 0.6, 5.75, 12.1, 0.95, { fill: PP.lavanda });
txt(s, "As três traduções: o brincar no lugar do discurso, a díade no lugar do indivíduo, a idade no lugar da norma.", { x: 0.95, y: 5.98, w: 11.5, h: 0.6, fontSize: 15.5, bold: true });
fonteRodape(s, LIVRO + "Parte I, abertura");
s.addNotes("Enunciar desde já: não são três tópicos, são três faces de um único deslocamento, a passagem de um exame que pergunta e escuta para um exame que propõe e observa. Depois que as traduções assentam, os domínios quase se ensinam sozinhos.");

// S3 · Tradução 1
s = novo({ bloco: "MOLDURA" });
titulo(s, "Primeira tradução: o brincar é o discurso da criança, e se lê em dois eixos separados, forma e conteúdo.");
filete(s, { y: 2.1 });
card(s, 0.6, 2.45, 5.9, 2.9, { fill: PP.branco, borda: PP.roxoMedio, bw: 0.75 });
txt(s, "FORMA DO BRINCAR", { x: 0.9, y: 2.65, w: 5.3, h: 0.4, bold: true, fontSize: 15 });
txt(s, "a organização: o nível (sensório-motor, funcional, simbólico), a sequência, a sustentação do enredo, a flexibilidade.\n\nÉ o análogo do curso e da estrutura do pensamento.", { x: 0.9, y: 3.1, w: 5.3, h: 2.1, fontSize: 13.5, lineSpacingMultiple: 1.12 });
card(s, 6.8, 2.45, 5.9, 2.9, { fill: PP.branco, borda: PP.roxoMedio, bw: 0.75 });
txt(s, "CONTEÚDO DO BRINCAR", { x: 7.1, y: 2.65, w: 5.3, h: 0.4, bold: true, fontSize: 15 });
txt(s, "o que a criança põe na cena: os temas que retornam, a agressão, o cuidado, o perigo, a reparação.\n\nÉ o análogo do conteúdo do pensamento.", { x: 7.1, y: 3.1, w: 5.3, h: 2.1, fontSize: 13.5, lineSpacingMultiple: 1.12 });
tropeco(s, "tratar o brincar como rapport e esperar “o exame de verdade”. No adulto você escuta o relato; na criança você lê o brincar, e ler exige a mesma disciplina que escutar.", { y: 5.55 });
fonteRodape(s, LIVRO + "Parte I, Tradução 1");
s.addNotes("A pergunta ao pré-escolar colhe, na melhor das hipóteses, a palavra que ele aprendeu a dar quando o adulto faz cara de preocupado. Forçar a separação forma/conteúdo desde o primeiro exemplo: são eixos independentes. Há brincar bem organizado e tematicamente aterrível, e brincar formalmente pobre e afetivamente sereno; o significado clínico dos dois é oposto. Exercício de sala: pedir que descrevam qualquer brincar em dois tempos, primeiro só a organização, depois só o tema.");

// S4 · Tradução 2
s = novo({ bloco: "MOLDURA" });
titulo(s, "Segunda tradução: não existe criança examinável isolada; o que existe, e o que se examina, é o par.");
filete(s, { y: 2.05 });
const planos = [
  ["SINTONIA", "os estados dos dois se acompanham; o mais visível e o menos discriminante"],
  ["CONTINGÊNCIA", "a resposta ao sinal específico da criança, na hora, com o ajuste certo"],
  ["CORREGULAÇÃO", "quando a criança perde o controle, o cuidador entra como regulador externo e o estado se reorganiza"],
  ["REPARAÇÃO", "o desencontro notado e refeito: o dado mais discriminante de todos"],
];
planos.forEach((p, i) => {
  const x = 0.6 + i * 3.11;
  card(s, x, 2.4, 2.91, 2.55, { fill: i === 3 ? PP.lavanda : PP.branco, borda: i === 3 ? PP.coral : PP.roxoMedio, bw: i === 3 ? 1.75 : 0.75 });
  txt(s, p[0], { x: x + 0.18, y: 2.6, w: 2.6, h: 0.4, bold: true, fontSize: 13.5, color: i === 3 ? PP.coralTexto : PP.roxoProfundo });
  txt(s, p[1], { x: x + 0.18, y: 3.05, w: 2.6, h: 1.8, fontSize: 12, lineSpacingMultiple: 1.1 });
});
card(s, 0.6, 5.25, 12.1, 0.95, { fill: PP.lavandaClara });
txt(s, "Se o tempo só der para uma coisa, observe a reparação: a díade que se desencontra e não repara mostra mais que uma hora de sintonia aparente.", { x: 0.95, y: 5.47, w: 11.5, h: 0.65, fontSize: 14.5, bold: true });
fonteRodape(s, LIVRO + "Parte I, Tradução 2");
s.addNotes("A afetividade precoce não reside dentro da criança: constitui-se no espaço entre ela e quem cuida. Examinar a criança isolada é examinar uma abstração. Tropeço: querer tirar o cuidador da sala para examinar a criança “limpa”, destruindo o instrumento. Exemplo de sala: duas crianças igualmente retraídas, um cuidador que acompanha e comenta, outro no celular; a criança é “a mesma” na descrição isolada e a díade conta duas histórias opostas.");

// S5 · Tradução 3
s = novo({ bloco: "MOLDURA" });
titulo(s, "Terceira tradução: a régua anda com a idade, e o desvio pesa pela qualidade, não só pela quantidade.");
filete(s, { y: 2.05 });
bullets(s, [
  "Falar de si na terceira pessoa é típico aos dois anos e sinal aos seis; a ecolalia é etapa normal até perto dos três; o amigo imaginário é saúde aos quatro.",
  "DISSOCIAÇÃO entre linhas: uma linha descolada das outras (linguagem no tempo, apontar que nunca mostra) diz mais que qualquer atraso global.",
  "REGRESSÃO: perder o que já se tinha nunca é banal; não se acomoda, investiga-se.",
  "INFLEXIBILIDADE: o comportamento que seria normativo vira achado quando é o único disponível, invariável, imune ao contexto.",
], { y: 2.45, gap: 0.92, fontSize: 14.5 });
tropeco(s, "o mais caro dos três: quem não sabe onde está a norma da idade tanto inventa doença onde há desenvolvimento quanto ignora doença achando que é desenvolvimento.", { y: 6.15 });
fonteRodape(s, LIVRO + "Parte I, Tradução 3");
s.addNotes("Ler um comportamento sem saber onde ele deveria estar naquela idade é ler sem gabarito. Todo domínio da aula vai abrir pela norma da idade antes de listar alteração; construir no residente o reflexo das duas perguntas: esperado para que idade? E que tipo de desvio é este: quantitativo, dissociação, regressão ou inflexibilidade?");

// S6 · O gesto
s = novo({ bloco: "MOLDURA" });
titulo(s, "O exame do adulto pergunta e escuta; o da criança propõe e observa, e o examinador vira instrumento de medida.");
filete(s, { y: 2.1 });
bullets(s, [
  "Observar não é acesso mais direto ao interior: é acesso mediado por inferência, mais falível. “Descrever antes de interpretar” é a resposta técnica a essa falibilidade.",
  "A ressonância que a criança desperta em você é dado do exame: o embotamento muitas vezes se anuncia primeiro no vazio que o examinador sente.",
  "A frustração pequena e deliberada é um dos instrumentos mais úteis: nela o arco da ação e a regulação emocional ficam legíveis ao mesmo tempo.",
], { y: 2.5, gap: 1.0, fontSize: 14.5 });
card(s, 0.6, 5.7, 12.1, 1.0, { fill: PP.lavanda });
txt(s, "Na criança, o exame psíquico é o que se observa, não o que se ouve. E observar é interpretar sob disciplina, nunca colher um dado pronto.", { x: 0.95, y: 5.93, w: 11.5, h: 0.65, fontSize: 15.5, bold: true });
fonteRodape(s, LIVRO + "Parte I, o que a moldura muda no gesto");
s.addNotes("Fecho da Parte I: verificar o deslocamento propondo um caso, nunca perguntando se entenderam. Descrever uma cena curta (criança, cuidador, brinquedo, separação, frustração pequena) e pedir que digam o que OBSERVARIAM. Se a primeira reação for formular perguntas para a criança, a moldura não assentou.");

// S7 · Contrato + Bento
s = novo({ bloco: "MOLDURA" });
titulo(s, "Vamos examinar o mesmo menino duas vezes, aos 4 e aos 9 anos, e escrever os dois prontuários juntos.");
filete(s, { y: 2.05 });
[["4", "anos e 2 meses", "a consulta em que o paciente não fala"], ["9", "anos e 7 meses", "a consulta em que o paciente começa a responder"]].forEach((b, i) => {
  const x = 1.4 + i * 5.9;
  s.addShape(ST.ellipse, { x, y: 2.5, w: 1.3, h: 1.3, fill: { color: i ? PP.coral : PP.lavanda }, line: { color: PP.roxoMedio, width: 1 } });
  txt(s, b[0], { x, y: 2.72, w: 1.3, h: 0.8, align: "center", fontFace: SERIF, fontSize: 30, bold: true, color: i ? PP.branco : PP.roxoProfundo });
  txt(s, b[1], { x: x + 1.45, y: 2.68, w: 3.3, h: 0.5, bold: true, fontSize: 16 });
  txt(s, b[2], { x: x + 1.45, y: 3.15, w: 4.0, h: 0.7, fontSize: 13, color: PP.roxoMedio });
});
card(s, 0.6, 4.35, 12.1, 1.8, { fill: PP.branco, borda: PP.roxoMedio, bw: 0.75 });
txt(s, [
  { text: "Bento", options: { bold: true, color: PP.coralTexto } },
  { text: " atravessa a aula em cenas de consultório. O produto de cada metade é um prontuário escrito por extenso, nos dois formatos que a aula ensina: o narrativo (o como) e a súmula (o quê). A aula termina na fronteira puberal: o adolescente é a próxima aula.", options: {} },
], { x: 0.95, y: 4.6, w: 11.4, h: 1.4, fontSize: 15, lineSpacingMultiple: 1.18 });
fonteRodape(s, LIVRO + "Parte IV (o dispositivo) e Parte V (os dois formatos)");
s.addNotes("Usar a mesma criança nos dois exames é o argumento final do livro tornado visível: a régua da idade se move, os domínios trocam de peso, o que era norma vira achado e o que era achado vira história. Não anunciar ainda o que o exame dos 9 anos encontra.");

// ============================================================================
// BLOCO 1 · Entrada, movimento e regulação · S8 a S19
// ============================================================================
const B1 = "BLOCO 1 · ENTRADA E REGULAÇÃO";

// S8 · Divisor
s = novo({ dark: true });
divisor(s, "BLOCO 1 · ENTRADA, MOVIMENTO E REGULAÇÃO",
  "A ordem dos domínios é a ordem em que os dados chegam: a criança entrega meio exame antes do primeiro brinquedo.",
  "Aparência · atitude e reação à situação · psicomotricidade · autorregulação e atenção.\nCada domínio abre pela norma da idade, desce à camada 0 a 5 e fecha pelo que muda dos 6 aos 12.",
  "A ordem aqui não é a da súmula adulta: é o peso de ensino e a ordem em que os dados de fato chegam. No pré-escolar, o que se vê antes de qualquer pergunta já entregou meio exame.");

// S9 · D1 aparência: dupla leitura
s = novo({ bloco: B1 });
titulo(s, "A aparência do pré-escolar fala de dois ao mesmo tempo: da criança e do sistema que cuida dela.");
filete(s, { y: 2.0 });
card(s, 0.6, 2.35, 5.9, 2.5, { fill: PP.branco, borda: PP.roxoMedio, bw: 0.75 });
txt(s, "LEITURA SOBRE A CRIANÇA", { x: 0.9, y: 2.55, w: 5.3, h: 0.4, bold: true, fontSize: 14 });
txt(s, "estado nutricional, idade aparente contra a cronológica, traços dismórficos que compõem padrão, perímetro cefálico.", { x: 0.9, y: 3.0, w: 5.3, h: 1.7, fontSize: 13.5, lineSpacingMultiple: 1.15 });
card(s, 6.8, 2.35, 5.9, 2.5, { fill: PP.branco, borda: PP.roxoMedio, bw: 0.75 });
txt(s, "LEITURA SOBRE O CUIDADO", { x: 7.1, y: 2.55, w: 5.3, h: 0.4, bold: true, fontSize: 14 });
txt(s, "higiene, roupa adequada ao clima e ao tamanho, pele, lesões e sua topografia. E nos dois polos: o descuido e o impecável demais, que impede a criança de ser criança.", { x: 7.1, y: 3.0, w: 5.3, h: 1.7, fontSize: 13.5, lineSpacingMultiple: 1.15 });
tropeco(s, "ler a aparência como se medisse a criança: no pré-escolar ela mede sobretudo o sistema de cuidado, muitas vezes um sistema esgotado pela pobreza. Descuido não é diagnóstico da criança; é uma pergunta sobre o ambiente.", { y: 5.15 });
txt(s, "Camada 6 a 12: a criança passa a participar da própria aparência, e o desalinho pode agora falar dela (embotamento, retraimento, preocupação excessiva).", { x: 0.62, y: 6.25, w: 12.0, h: 0.6, fontSize: 13, italic: true, color: PP.roxoMedio });
fonteRodape(s, LIVRO + "Parte II, Domínio 1");
s.addNotes("O esperado primeiro: criança vestida e arrumada por outrem, eutrófica, com as marcas normais de quem cai brincando nas proeminências ósseas. Esse é o pano de fundo contra o qual tudo se lê. O erro de transporte aqui é dos mais silenciosos e injustos: julgamento de classe travestido de achado clínico.");

// S10 · D1 lesões
s = novo({ bloco: B1 });
titulo(s, "Lesão se descreve por cor, forma, tamanho e lugar; a conclusão forense não pertence a este campo.");
filete(s, { y: 2.0 });
card(s, 0.6, 2.35, 5.9, 2.3, { fill: PP.branco, borda: PP.roxoMedio, bw: 0.75 });
txt(s, "MARCA NORMATIVA", { x: 0.9, y: 2.55, w: 5.3, h: 0.4, bold: true, fontSize: 14 });
txt(s, "proeminências ósseas expostas às quedas naturais: canelas, joelhos, testa.", { x: 0.9, y: 3.0, w: 5.3, h: 1.5, fontSize: 13.5, lineSpacingMultiple: 1.15 });
card(s, 6.8, 2.35, 5.9, 2.3, { fill: PP.branco, borda: PP.coral, bw: 1.5 });
txt(s, "MARCA QUE LEVANTA SUSPEITA", { x: 7.1, y: 2.55, w: 5.3, h: 0.4, bold: true, fontSize: 14, color: PP.coralTexto });
txt(s, "localização atípica (dorso, face interna das coxas, pavilhão auricular, região genital), padrão que reproduz objeto, incompatibilidade com a história.", { x: 7.1, y: 3.0, w: 5.3, h: 1.5, fontSize: 13.5, lineSpacingMultiple: 1.15 });
parRegistro(s, "Criança descuidada, com sinais de negligência.",
  "Cabelo sem pentear, unhas com sujidade incrustada, casaco dois números menor para o frio de hoje; equimose arroxeada de 2 cm na canela direita, compatível com queda.", { y: 5.05, h: 1.7 });
fonteRodape(s, LIVRO + "Parte II, Domínio 1");
s.addNotes("A regra da descrição topográfica neutra é proteção, da criança e do médico: “equimose arredondada de 2 cm na face interna do braço esquerdo” é defensável e aciona o cuidado devido; “sinais de agressão” salta a inferência e fragiliza-se juridicamente. A suspeita deflagra percurso próprio que não pertence a este domínio.");

// S11 · D2 atitude: enquadre e imobilidade
s = novo({ bloco: B1 });
titulo(s, "A criança não compartilha o enquadre: examina-se a reação à situação nova, e os olhos decidem o que a imobilidade é.");
filete(s, { y: 2.1 });
const entradas = [
  ["EXPLORA", "entra e inspeciona com segurança: curiosidade de base segura", PP.branco, false],
  ["INIBIDA", "imóvel mas ATIVA: o olhar varre, estuda o terreno, degela sozinha em minutos", PP.branco, false],
  ["CONGELADA", "imóvel e SUSPENSA: olhar fixo, vazio ou hipervigilante; não degela com o tempo; imobilidade do medo", PP.lavanda, true],
];
entradas.forEach((p, i) => {
  const x = 0.6 + i * 4.13;
  card(s, x, 2.45, 3.93, 2.5, { fill: p[2], borda: p[3] ? PP.coral : PP.roxoMedio, bw: p[3] ? 1.75 : 0.75 });
  txt(s, p[0], { x: x + 0.2, y: 2.65, w: 3.5, h: 0.4, bold: true, fontSize: 14.5, color: p[3] ? PP.coralTexto : PP.roxoProfundo });
  txt(s, p[1], { x: x + 0.2, y: 3.1, w: 3.55, h: 1.7, fontSize: 13, lineSpacingMultiple: 1.12 });
});
card(s, 0.6, 5.25, 12.1, 1.0, { fill: PP.lavandaClara });
txt(s, "A régua absolve muito: ansiedade perante o estranho é esperada, inibição inicial é temperamento, protesto nas transições pertence à idade. O achado começa onde intensidade, duração ou padrão destoam.", { x: 0.95, y: 5.45, w: 11.5, h: 0.7, fontSize: 13.5 });
fonteRodape(s, LIVRO + "Parte II, Domínio 2");
s.addNotes("A criança congelada pede a pergunta sobre o que ela aprendeu a temer. Terceiro padrão de olhar: o monitoramento ansioso contínuo (checa o cuidador antes de existir, pedindo licença) contra o referenciamento saudável, episódico e ligado ao ambíguo. Camada 6 a 12: a criança já compartilha parte do enquadre; aparecem vergonha, desafio, colaboração ansiosa; e o que muda quando o cuidador sai da sala é, por si, um dado.");

// S12 · D2: indiscriminação + par
s = novo({ bloco: B1 });
titulo(s, "Estranhe a criança que não estranha: a intimidade instantânea com o desconhecido é achado, não facilidade.");
filete(s, { y: 2.0 });
bullets(s, [
  "Buscar refúgio no cuidador ao ser abordada é a ansiedade esperada; sentar no colo do médico desconhecido em dois minutos é sociabilidade indiscriminada, e aponta para vínculo perturbado por privação ou rupturas.",
  "Transições: a passagem fluida mostra flexibilidade; a recusa obstinada, rigidez situacional; o colapso diante de alteração mínima, a reação catastrófica dos transtornos do neurodesenvolvimento.",
], { y: 2.4, gap: 1.15, fontSize: 14 });
parRegistro(s, "Não colaborativa, opositora.",
  "Permaneceu atrás das pernas do pai nos primeiros dez minutos, observando os brinquedos à distância; aproximou-se por iniciativa própria após oferta indireta e passou a explorar a sala.", { y: 5.0, h: 1.75 });
fonteRodape(s, LIVRO + "Parte II, Domínio 2");
s.addNotes("Inversão de sinal que o treino adulto erra: no adulto, cooperação e simpatia são boas notícias; na criança pequena, a sociabilidade indiscriminada não é saúde. E a reação à situação não é preâmbulo a tolerar até a criança “colaborar”: o modo como ela se acalma, ou não se acalma, e com que ajuda, já é o exame começando.");

// S13 · D3: direção vs quantidade
s = novo({ bloco: B1 });
titulo(s, "O pré-escolar é normativamente hipercinético: examina-se a direção do movimento, não a quantidade.");
filete(s, { y: 2.0 });
card(s, 0.6, 2.35, 5.9, 2.2, { fill: PP.branco, borda: PP.roxoMedio, bw: 0.75 });
txt(s, "ENERGIA DIRIGIDA", { x: 0.9, y: 2.55, w: 5.3, h: 0.4, bold: true, fontSize: 14 });
txt(s, "corre, explora, manipula, mas a atividade tem direção e propósito; refreia-se quando engajada.", { x: 0.9, y: 3.0, w: 5.3, h: 1.4, fontSize: 13.5, lineSpacingMultiple: 1.15 });
card(s, 6.8, 2.35, 5.9, 2.2, { fill: PP.branco, borda: PP.coral, bw: 1.5 });
txt(s, "AGITAÇÃO DESORGANIZADA", { x: 7.1, y: 2.55, w: 5.3, h: 0.4, bold: true, fontSize: 14, color: PP.coralTexto });
txt(s, "movimento sem alvo, que não constrói nada, não se deixa engajar, não se refreia.", { x: 7.1, y: 3.0, w: 5.3, h: 1.4, fontSize: 13.5, lineSpacingMultiple: 1.15 });
parRegistro(s, "Hiperativo.",
  "Atividade elevada e dirigida: explorou a sala com propósito reconhecível, sentou e sustentou a tarefa quando engajado; sem movimentos repetitivos ou tiques.", { y: 4.95, h: 1.55 });
fonteRodape(s, LIVRO + "Parte II, Domínio 3");
s.addNotes("Tropeço mais caro do domínio, e um dos mais caros do livro: chamar de hiperatividade (e encaminhar como TDAH ou autismo) o nível de atividade normativo do pré-escolar, ou estereotipia isolada do desenvolvimento. Crianças têm estereotipias, e isso, sozinho, não é transtorno algum. Este é o ponto da aula em que mais se protege criança de diagnóstico apressado; gastar tempo aqui. Observar também coordenação global e fina; e não ter preguiça da fronteira neurológica.");

// S14 · D3: tique vs estereotipia
s = novo({ bloco: B1 });
titulo(s, "Tique e estereotipia se separam na sala: pelo ritmo, pelo contexto e pelo que acontece quando algo captura a criança.");
filete(s, { y: 2.1 });
const rows14 = [
  [{ text: "", options: { fill: { color: PP.roxoProfundo } } },
   { text: "TIQUE", options: { bold: true, color: PP.offWhite, fill: { color: PP.roxoProfundo } } },
   { text: "ESTEREOTIPIA", options: { bold: true, color: PP.offWhite, fill: { color: PP.roxoProfundo } } }],
  ["forma", "breve, abrupto, não rítmico; atravessa o comportamento em curso", "rítmica, mais longa, de padrão fixo"],
  ["contexto", "intensifica com ansiedade e tensão", "aparece na excitação ou na absorção (sacode as mãos quando empolgada)"],
  ["supressão", "parcialmente supressível por esforço, ao custo de desconforto; urgência premonitória no escolar", "não se suprime por esforço; interrompe-se por distração externa"],
];
s.addTable(rows14.map((r, ri) => r.map((c, ci) => {
  if (typeof c === "string") return { text: c, options: { fill: { color: ri % 2 ? PP.branco : PP.lavandaClara }, color: PP.roxoProfundo, bold: ci === 0 } };
  return c;
})), { x: 0.6, y: 2.45, w: 12.1, fontFace: SANS, fontSize: 12.5, valign: "middle", border: { type: "solid", color: PP.roxoMedio, pt: 0.5 }, rowH: 0.68, colW: [1.6, 5.2, 5.3] });
txt(s, "Camada 6 a 12: o nível normativo já baixou; a hipercinesia vira achado que não era, e a lentificação psicomotora vira marcador legível (depressão, trauma crônico, medicação).", { x: 0.62, y: 5.75, w: 12.0, h: 0.75, fontSize: 13, italic: true, color: PP.roxoMedio });
fonteRodape(s, LIVRO + "Parte II, Domínio 3");
s.addNotes("Cena única para o contraste: a criança que sacode as mãos nos picos de empolgação, padrão idêntico, e para quando chamada (estereotipia); e a que pisca e repuxa o rosto em salvas, piora quando a mãe menciona a escola, e descreve “uma coceira por dentro antes” (tique). Errar essa distinção é errar a porta de entrada. A estereotipia como protomovimento: resíduo ou rascunho de um sentido; isolada, não é diagnóstico.");

// S15 · D4: regulação
s = novo({ bloco: B1 });
titulo(s, "A regulação é o alicerce: quem não alcança o alerta tranquilo não brinca, não se vincula e não atende.");
filete(s, { y: 2.0 });
bullets(s, [
  "O que se examina: alcançar e sustentar o alerta tranquilo, a amplitude das flutuações e a capacidade de autoconsolo (quanto reorganiza sozinha, quanto depende do outro).",
  "Reatividade sensorial, fácil de confundir com birra: hiper-responsividade (tapa os ouvidos, aversão a texturas), hipo-responsividade (não se volta ao nome, sinal de peso quando repetido), busca sensorial (cheira, gira, colide).",
  "O esperado do pré-escolar: regulação em construção; labilidade, transições abruptas e necessidade de apoio externo são esperadas em algum grau.",
], { y: 2.4, gap: 1.08, fontSize: 14 });
fonteRodape(s, LIVRO + "Parte II, Domínio 4");
s.addNotes("Ensinar cedo: a criança que não regula não faz mais nada bem, e o exame inteiro se lê à luz disso. O olhar como instrumento: no pré-escolar, para onde o olhar se dirige é, em boa aproximação, para onde a atenção se dirige; distinguir do uso comunicativo do olhar, que pertence à díade.");

// S16 · D4: atenção + viés de amostra
s = novo({ bloco: B1 });
titulo(s, "A atenção do pré-escolar se mede no brincar de interesse dela, e a consulta é uma amostra enviesada.");
filete(s, { y: 2.0 });
bullets(s, [
  "Sem dígitos, sem tarefa formal: sustentação medida pela duração no brincar de interesse, distratibilidade pelos estímulos mínimos que desviam, tolerância à frustração pela resposta ao obstáculo.",
  "O consultório pode MASCARAR a desregulação (esforço máximo por uma hora, colapso no carro) ou FABRICÁ-LA (a criança exausta das 18h). A discrepância entre fontes não se resolve escolhendo uma versão: registra-se como dado.",
], { y: 2.4, gap: 1.15, fontSize: 14 });
parRegistro(s, "Desatento, não para em nada.",
  "Trocou de brinquedo a cada 2 a 3 minutos, inclusive nos de interesse; ao obstáculo, largou a peça e não retornou; acalmou-se em cerca de cinco minutos com apoio verbal da mãe.", { y: 4.95, h: 1.7 });
fonteRodape(s, LIVRO + "Parte II, Domínio 4");
s.addNotes("Tropeço: ler a distratibilidade normativa como déficit. A criança pequena atende ao que interessa e se dispersa do resto; o achado é não sustentar nem no que interessa. O horário da consulta entra no registro: o que se mediu às 18h mediu também o dia inteiro que veio antes. Camada 6 a 12: a atenção torna-se estruturável; instrução de múltiplos passos, dígitos com norma por idade, orientação pelas âncoras da idade.");

// S17-S19 · V1
s = novo({ bloco: B1 });
molduraAntes(s, "Nesta cena, repare no que acontece imediatamente antes do grito e no que o adulto faz com o corpo.", "V1 · BIRRA E CORREGULAÇÃO",
  "Anunciar a técnica: exibir, congelar, perguntar, reexibir. Clipe de acervo público, 60 a 90 segundos.");
s = novo({ dark: true, bloco: B1 });
slideVideo(s, "V1", "Birra de criança de 2 a 3 anos em local público, com o adulto entrando em corregulação.", "exibir → congelar 3x (gatilho · pico · retorno) → perguntar → reexibir");
s.addNotes("Congelar em três pontos: o gatilho, o pico, o retorno com corregulação. Perguntar à turma o que registrariam em cada ponto.");
s = novo({ bloco: B1 });
titulo(s, "Você acabou de examinar regulação, afeto e díade sem fazer uma pergunta: gatilho, pico, corregulação e retorno.");
filete(s, { y: 2.1 });
["GATILHO: o que aconteceu imediatamente antes", "PICO: intensidade e o que o corpo fez", "RETORNO: quanto tempo, com quanta ajuda, e o que o cuidador ofereceu"].forEach((t, i) => {
  const x = 0.6 + i * 4.13;
  card(s, x, 2.5, 3.93, 1.6, { fill: PP.branco, borda: PP.roxoMedio, bw: 0.75 });
  txt(s, t, { x: x + 0.2, y: 2.72, w: 3.55, h: 1.2, fontSize: 13.5, lineSpacingMultiple: 1.12 });
});
card(s, 0.6, 4.5, 12.1, 1.15, { fill: PP.lavanda });
txt(s, "A curva de retorno é o dado; o choro em si não é. É aqui que a conação e a regulação se encontram e ficam legíveis ao mesmo tempo.", { x: 0.95, y: 4.78, w: 11.5, h: 0.7, fontSize: 15, bold: true });
fonteRodape(s, LIVRO + "Parte I (a frustração como instrumento) e Domínios 4 e 5");
s.addNotes("Fechar o bloco: a linha de prontuário que o clipe gera. Ponte de tração para o Bloco 2: a mesma curva, olhada agora pelo ângulo do afeto e do consolo.");

// ============================================================================
// BLOCO 2 · Afeto e vínculo · S20 a S31
// ============================================================================
const B2 = "BLOCO 2 · AFETO E VÍNCULO";

// S20 · Divisor
s = novo({ dark: true });
divisor(s, "BLOCO 2 · AFETO E VÍNCULO",
  "O coração do exame: o afeto se lê no corpo que o Bloco 1 ensinou a observar, e o vínculo, no espaço entre os dois.",
  "Afeto, humor e regulação emocional · interação diádica e vínculo.\nA segunda tradução deixa de ser moldura e vira método.",
  "O afeto se modula sobre a regulação que o Bloco 1 examinou; por isso a ordem.");

// S21 · D5: a porta fechada
s = novo({ bloco: B2 });
titulo(s, "No pré-escolar o humor não se pergunta: infere-se do padrão do afeto, do relato do cuidador e do sono, apetite e energia.");
filete(s, { y: 2.1 });
bullets(s, [
  "No adulto o domínio tem duas portas: o humor pelo relato, o afeto pela observação. Na criança pequena uma porta está fechada: “você está triste?” colhe a vontade de agradar e o vocabulário emocional, não o humor.",
  "O afeto observável (face, tônus, voz, postura) é a única janela fiável; o humor é inferido do padrão ao longo do tempo e das funções que arrasta: sono, apetite, energia.",
  "A ressonância vira método: ofereça um estímulo emocional deliberado dentro do brincar e observe a reciprocidade. A criança diante da qual nada vibra, nem nela nem em você, mostra o dado mais precoce do embotamento.",
], { y: 2.5, gap: 1.15, fontSize: 14 });
fonteRodape(s, LIVRO + "Parte II, Domínio 5");
s.addNotes("O esperado: o pré-escolar é normativamente lábil, transita do choro ao riso em minutos; isso é regulação em construção. O que nunca é normativo, em idade nenhuma: o afeto embotado, a gama restrita, a face que não varia. No pré-escolar, embotamento é alerta de primeira grandeza (negligência relacional grave, violência, trauma precoce), nunca “criança quieta”.");

// S22 · D5: quatro dimensões
s = novo({ bloco: B2 });
titulo(s, "O afeto se registra em quatro dimensões, e a cor dele separa a criança enlutada da criança apagada.");
filete(s, { y: 2.05 });
const dims = [
  ["QUALIDADE", "a tonalidade: hipertímico, hipotímico, eutímico (evitar “distímico” como descritor)"],
  ["AMPLITUDE", "a gama: ampla e proporcional; restrita; ausência de variação é o embotamento"],
  ["MOBILIDADE", "a modulação: labilidade (lida contra a idade), rigidez, incontinência no extremo"],
  ["CONGRUÊNCIA", "o acordo com o contexto: sorrir contando que apanha é dos achados mais informativos"],
];
dims.forEach((p, i) => {
  const x = 0.6 + (i % 2) * 6.2, y = 2.4 + Math.floor(i / 2) * 1.42;
  card(s, x, y, 5.95, 1.28, { fill: PP.branco, borda: PP.roxoMedio, bw: 0.75 });
  txt(s, p[0], { x: x + 0.2, y: y + 0.12, w: 2.2, h: 0.4, bold: true, fontSize: 13 });
  txt(s, p[1], { x: x + 0.2, y: y + 0.46, w: 5.5, h: 0.75, fontSize: 12, lineSpacingMultiple: 1.05 });
});
card(s, 0.6, 5.45, 12.1, 1.05, { fill: PP.lavandaClara });
txt(s, "Dentro da rigidez, a distinção fina: a criança fixada na tristeza cuja dor ainda tem cor e alcança quem olha (textura do luto), e a fixada num estado sem cor, opaca, diante da qual nada vibra. A cor do afeto distingue a enlutada da deprimida.", { x: 0.95, y: 5.63, w: 11.5, h: 0.8, fontSize: 13 });
fonteRodape(s, LIVRO + "Parte II, Domínio 5");
s.addNotes("Dissociação ideoafetiva: quando a incongruência se dá entre a expressão não verbal e o relato; colhe-se sem nenhuma palavra da criança, examinável desde muito cedo. Tropeço da amostragem: “afeto preservado” sustentado por um sorriso. O afeto é curva, não foto; e o momento da consulta em que foi colhido faz parte do achado (a criança de aquecimento lento, a que entra expansiva e se esgota).");

// S23 · D5: consolabilidade
s = novo({ bloco: B2 });
titulo(s, "O choro não é o dado; o dado é a curva de retorno, e dentro dela a consolabilidade.");
filete(s, { y: 2.0 });
const consolos = [
  ["ACEITA E REORGANIZA", "o colo funciona: corregulação em ordem", PP.branco, false],
  ["RECUSA E REORGANIZA SOZINHA", "o autoconsolo funciona, o uso do outro não; isso já diz algo do vínculo", PP.branco, false],
  ["ACEITA E NÃO REORGANIZA", "no braço do cuidador e o choro segue intacto: o colapso da corregulação onde ela deveria funcionar", PP.lavanda, true],
];
consolos.forEach((p, i) => {
  const x = 0.6 + i * 4.13;
  card(s, x, 2.4, 3.93, 2.3, { fill: p[2], borda: p[3] ? PP.coral : PP.roxoMedio, bw: p[3] ? 1.75 : 0.75 });
  txt(s, p[0], { x: x + 0.2, y: 2.6, w: 3.55, h: 0.75, bold: true, fontSize: 12.5, color: p[3] ? PP.coralTexto : PP.roxoProfundo });
  txt(s, p[1], { x: x + 0.2, y: 3.35, w: 3.55, h: 1.25, fontSize: 12.5, lineSpacingMultiple: 1.1 });
});
parRegistro(s, "Afeto preservado.",
  "Afeto amplo e móvel ao longo da consulta: alegria no brincar, aborrecimento proporcional à frustração com retorno ao basal em minutos; ressonante ao estímulo lúdico oferecido.", { y: 5.05, h: 1.6 });
fonteRodape(s, LIVRO + "Parte II, Domínio 5");
s.addNotes("Curva da frustração: latência até a desorganização, intensidade do pico e, o mais informativo, a curva de retorno (quanto tempo, com quanta ajuda). A inconsolabilidade no próprio colo é dos achados mais graves do domínio.");

// S24 · D5: camada 6-12
s = novo({ bloco: B2 });
titulo(s, "No escolar o relato se entreabre, e a distância entre o que a criança diz e o que mostra é achado, não problema.");
filete(s, { y: 2.1 });
bullets(s, [
  "O relato entra sob disciplina que o adulto não exige: sempre cruzado com o observado. A criança cabisbaixa, de voz murcha, que diz “tá tudo bem” entrega na dissociação um dado mais rico que qualquer resposta.",
  "A hipotimia do escolar frequentemente veste irritabilidade: a criança rabugenta trazida “pelo comportamento” pode ser a roupagem infantil do humor deprimido.",
  "A anedonia torna-se observável: o brincar que perdeu a graça, o interesse abandonado, o videogame de lado.",
  "Nascem afetos novos: vergonha e culpa exigem um eu que se vê pelos olhos dos outros; o excesso deles é achado desta faixa, impossível antes dela.",
], { y: 2.5, gap: 0.98, fontSize: 14 });
fonteRodape(s, LIVRO + "Parte II, Domínio 5, camada 6 a 12");
s.addNotes("Regra de ouro do domínio: no pré-escolar o humor se observa e se infere, não se pergunta; no escolar a pergunta entra, mas nunca sozinha. O residente que só procura tristeza perde a depressão irritável.");

// S25 · D6: pêndulo
s = novo({ bloco: B2 });
titulo(s, "A díade se observa a consulta inteira: o pêndulo entre explorar e retornar é a base segura visível.");
filete(s, { y: 2.0 });
bullets(s, [
  "O protesto à separação é sinal de vínculo funcionando, não de problema. O que se examina é o padrão em volta dela, sobretudo a reaproximação.",
  "O vaivém é a norma: afasta-se para explorar e volta (com o corpo ou só com o olhar) para checar e reabastecer. O pêndulo parado em qualquer extremo é o achado.",
  "A criança “fácil demais”, que nunca protesta, nunca busca, resolve tudo sozinha: a autossuficiência total pode ser aprendida onde convocar não funcionava, e merece a mesma atenção que a dependência total.",
], { y: 2.4, gap: 1.12, fontSize: 14 });
card(s, 0.6, 5.85, 12.1, 0.85, { fill: PP.lavanda });
txt(s, "O residente treinado no adulto lê independência como saúde; no pré-escolar, a independência total é tão informativa quanto a dependência total.", { x: 0.95, y: 6.05, w: 11.5, h: 0.6, fontSize: 14, bold: true });
fonteRodape(s, LIVRO + "Parte II, Domínio 6");
s.addNotes("Este domínio é a segunda tradução tornada exame, e não é “mais um campo”: é uma lente que atravessa os outros. Retomar os quatro planos com endereço na consulta: sintonia no brincar conjunto, contingência na resposta ao sinal miúdo, corregulação na frustração, reparação no desencontro.");

// S26 · D6: padrões sob estresse
s = novo({ bloco: B2 });
titulo(s, "Sob estresse aparece o padrão de uso do cuidador; descreve-se o comportamento, não se sela o rótulo.");
filete(s, { y: 2.05 });
const padroes = [
  ["busca, aceita o consolo e se reorganiza a partir dele", "uso do cuidador como base segura"],
  ["mesmo angustiada, não busca; segue de costas, consola-se sozinha num canto", "evitação a descrever"],
  ["busca e rejeita ao mesmo tempo: chora pelo colo e bate em quem a pega", "ambivalência resistente"],
  ["condutas contraditórias na presença do cuidador: aproxima-se de costas, congela a meio caminho", "o padrão mais grave: correlaciona-se com maus-tratos e trauma relacional"],
];
padroes.forEach((p, i) => {
  const y = 2.4 + i * 0.92;
  card(s, 0.6, y, 12.1, 0.8, { fill: i === 3 ? PP.lavanda : PP.branco, borda: i === 3 ? PP.coral : PP.roxoMedio, bw: i === 3 ? 1.5 : 0.75 });
  txt(s, p[0], { x: 0.85, y: y + 0.13, w: 7.6, h: 0.6, fontSize: 12.5, lineSpacingMultiple: 1.02 });
  txt(s, p[1], { x: 8.6, y: y + 0.13, w: 3.9, h: 0.6, fontSize: 12, bold: true, color: i === 3 ? PP.coralTexto : PP.roxoMedio, lineSpacingMultiple: 1.02 });
});
card(s, 0.6, 6.15, 12.1, 0.8, { fill: PP.lavandaClara });
txt(s, "“Apego desorganizado” pertence a protocolo padronizado; a consulta autoriza escrever o observado: “diante do retorno da mãe, aproximou-se de costas e congelou a meio caminho”.", { x: 0.95, y: 6.3, w: 11.5, h: 0.6, fontSize: 12.5, italic: true });
fonteRodape(s, LIVRO + "Parte II, Domínio 6");
s.addNotes("A consulta oferece as provas naturalmente: o telefone que chama o cuidador, a frustração, o machucado. O observado bem descrito sustenta toda a preocupação clínica sem tomar emprestada uma taxonomia que o setting não valida. E o cuidador é instrumento a usar: pedir que chame, que entre no brincar, que console; a diferença entre a díade espontânea e a convocada é informação.");

// S27 · D6: apontar
s = novo({ bloco: B2 });
titulo(s, "O apontar informa pela função: pedir usa o outro como meio; mostrar convida o outro a compartilhar.");
filete(s, { y: 2.0 });
card(s, 0.6, 2.4, 5.9, 2.5, { fill: PP.branco, borda: PP.roxoMedio, bw: 0.75 });
txt(s, "APONTAR QUE PEDE", { x: 0.9, y: 2.6, w: 5.3, h: 0.4, bold: true, fontSize: 14.5 });
txt(s, "o dedo esticado para o biscoito fora de alcance: um pedido, o outro como ferramenta.", { x: 0.9, y: 3.05, w: 5.3, h: 1.7, fontSize: 13.5, lineSpacingMultiple: 1.15 });
card(s, 6.8, 2.4, 5.9, 2.5, { fill: PP.branco, borda: PP.coral, bw: 1.5 });
txt(s, "APONTAR QUE MOSTRA", { x: 7.1, y: 2.6, w: 5.3, h: 0.4, bold: true, fontSize: 14.5, color: PP.coralTexto });
txt(s, "o dedo para o avião no céu, seguido do olhar que volta ao rosto do adulto: um convite a compartilhar. É este que falha, e o pedir preservado ao lado do mostrar ausente constitui o sinal.", { x: 7.1, y: 3.05, w: 5.3, h: 1.7, fontSize: 13.5, lineSpacingMultiple: 1.15 });
card(s, 0.6, 5.2, 12.1, 1.05, { fill: PP.lavandaClara });
txt(s, "Referenciamento social: diante do ambíguo, a criança consulta o rosto de quem a orienta. A ausência dessa triangulação é achado de peso. Ensine o contraste funcional, não uma idade de corte.", { x: 0.95, y: 5.42, w: 11.5, h: 0.7, fontSize: 13.5 });
fonteRodape(s, LIVRO + "Parte II, Domínio 6");
s.addNotes("Exemplo de sala que instala o conceito: a criança que leva a mão do adulto até o pote de biscoito (gesto instrumental eficiente) e que, na mesma consulta, vê algo extraordinário pela janela e não se volta para ninguém. Nada falta ao gesto como ferramenta; falta o gesto como ponte. É dissociação no sentido da Parte I: uma linha descolada das outras. Vigilância e encaminhamento, não diagnóstico; e atraso de fala também motiva avaliação.");

// S28-S30 · V3
s = novo({ bloco: B2 });
molduraAntes(s, "Nesta cena, conte quantas vezes a criança volta os olhos para o rosto do adulto.", "V3 · ATENÇÃO COMPARTILHADA",
  "Clipe de acervo público, 20 a 40 segundos: apontar protodeclarativo com checagem do rosto; se possível, contraste com o apontar para pedir.");
s = novo({ dark: true, bloco: B2 });
slideVideo(s, "V3", "Atenção compartilhada em criança de 12 a 24 meses: apontar que mostra, com checagem do rosto do adulto.", null);
s.addNotes("Se o clipe tiver os dois apontares, congelar em cada um e pedir a distinção à turma.");
s = novo({ bloco: B2 });
titulo(s, "O triângulo olho, objeto, olho é o dado: quem mostra divide um mundo; quem só pede usa uma ferramenta.");
filete(s, { y: 2.1 });
card(s, 0.6, 2.5, 12.1, 1.5, { fill: PP.branco, borda: PP.roxoMedio, bw: 0.75 });
txt(s, "Linha de registro: “apontar imperativo e declarativo presentes; mostrou o brinquedo buscando meu rosto em seguida” ou “aponta para pedir com eficiência; não foi observado apontar para mostrar nem busca do rosto diante do novo”.", { x: 0.95, y: 2.75, w: 11.4, h: 1.1, fontSize: 14, lineSpacingMultiple: 1.15 });
fonteRodape(s, LIVRO + "Parte II, Domínio 6");
s.addNotes("Fechar com a frase que hierarquiza sem tranquilizar: mais grave que a fala que atrasa é o apontar que nunca mostra. Encaminhar sem esperar amadurecer.");

// S31 · D6: camada 6-12, pares
s = novo({ bloco: B2 });
titulo(s, "No escolar o palco muda para os pares, e o critério fino é a reciprocidade das amizades.");
filete(s, { y: 2.0 });
bullets(s, [
  "As perguntas mudam de endereço: forma amizades? mantém? que posição no grupo (integrada, isolada, rejeitada, vitimizada, provocadora)? como se comporta na sala e no recreio, e qual a diferença?",
  "Não basta nomear amigos: importa se os nomeados a nomeariam de volta. A criança que lista meia turma e não é convidada para nenhum aniversário mostra na assimetria um dado que “você tem amigos?” jamais colheria.",
  "O vínculo com o cuidador muda de forma: a quem recorre sob estresse, o que muda quando o cuidador sai da sala.",
], { y: 2.35, gap: 1.02, fontSize: 13.5 });
parRegistro(s, "Boa relação com a mãe.",
  "Checou o rosto da mãe diante do brinquedo novo e retomou o brincar; ao chamado sem resposta, insistiu e o contato foi refeito; consolou-se no colo em cerca de três minutos.", { y: 5.45, h: 1.5 });
fonteRodape(s, LIVRO + "Parte II, Domínio 6, camada 6 a 12");
s.addNotes("Uma amizade recíproca sustentada vale mais, clinicamente, que dez nomeações vazias; e a discrepância entre o relato da criança e o das fontes é, aqui como no afeto, um achado em si. Cada dado com sua fonte: a criança conta das amizades, a escola informa a posição no grupo, os pais relatam os convites.");

// ============================================================================
// BLOCO 3 · O pensar e o simbolizar · S32 a S45
// ============================================================================
const B3 = "BLOCO 3 · O PENSAR E O SIMBOLIZAR";

// S32 · Divisor
s = novo({ dark: true });
divisor(s, "BLOCO 3 · O PENSAR E O SIMBOLIZAR",
  "Três janelas para o mesmo objeto: o pensamento se encena no brincar, se diz na linguagem e se estrutura na cognição.",
  "O brincar como exame do pensamento · fala, linguagem e comunicação · cognição.\nUma criança desregulada ou insegura não brinca nem fala no seu nível verdadeiro: estes domínios só valem lidos depois dos anteriores.",
  "É o centro intelectual do exame. A ordem tem razão de contaminação: o que se colhe aqui depende do que os blocos anteriores estabeleceram.");

// S33 · D7: forma
s = novo({ bloco: B3 });
titulo(s, "A trajetória do brincar é a régua: sensório-motor, funcional, simbólico; aos quatro anos espera-se enredo.");
filete(s, { y: 2.05 });
const degraus = [
  ["SENSÓRIO-MOTOR", "1º ano e pouco além: o objeto se bate, se morde, se atira"],
  ["FUNCIONAL", "na sequência: o objeto usado pelo que serve; o carrinho anda"],
  ["SIMBÓLICO", "desponta no 2º ano e floresce: o bloco vira telefone; ganha enredo, papéis, narrativa"],
];
degraus.forEach((d, i) => {
  const x = 0.9 + i * 4.0, y = 4.3 - i * 0.75;
  card(s, x, y, 3.7, 1.35, { fill: i === 2 ? PP.lavanda : PP.branco, borda: PP.roxoMedio, bw: 0.75 });
  txt(s, d[0], { x: x + 0.18, y: y + 0.12, w: 3.35, h: 0.4, bold: true, fontSize: 13 });
  txt(s, d[1], { x: x + 0.18, y: y + 0.5, w: 3.35, h: 0.8, fontSize: 11.5, lineSpacingMultiple: 1.05 });
});
card(s, 0.6, 5.4, 12.1, 1.15, { fill: PP.lavandaClara });
txt(s, "Forma: nível (estável ou oscila), sequência, flexibilidade (aceita a proposta e a transforma, ou persevera), riqueza de fantasia. E a inibição lúdica: numa idade em que brincar é o modo natural de estar, a criança que não pode brincar mostra o tamanho do que a ocupa por dentro.", { x: 0.95, y: 5.58, w: 11.5, h: 0.9, fontSize: 13 });
fonteRodape(s, LIVRO + "Parte II, Domínio 7");
s.addNotes("Uma criança de quatro anos cujo brincar é exclusivamente sensório-motor apresenta, nessa forma, um achado do peso que teria a concretude extrema no discurso de um adulto. O que muda é o idioma; a gramática do exame é a mesma.");

// S34-S36 · V2
s = novo({ bloco: B3 });
molduraAntes(s, "Repare no que o objeto vira nas mãos da criança.", "V2 · BRINCAR SIMBÓLICO",
  "Clipe de acervo público, 20 a 40 segundos: um objeto usado como outro, de preferência com fala dirigida ao brinquedo.");
s = novo({ dark: true, bloco: B3 });
slideVideo(s, "V2", "Brincar simbólico espontâneo em criança de 2 a 4 anos.", null);
s.addNotes("Curto: o clipe prova o degrau simbólico da escada do slide anterior.");
s = novo({ bloco: B3 });
titulo(s, "Quando o bloco vira telefone, a função simbólica está no lugar: este é o curso e a forma do pré-escolar.");
filete(s, { y: 2.1 });
card(s, 0.6, 2.5, 12.1, 1.3, { fill: PP.branco, borda: PP.roxoMedio, bw: 0.75 });
txt(s, "Linha de registro: “brincar simbólico com papéis e ações encadeadas; aceitou proposta e a transformou com invenção própria”.", { x: 0.95, y: 2.85, w: 11.4, h: 0.8, fontSize: 14.5 });
fonteRodape(s, LIVRO + "Parte II, Domínio 7");
s.addNotes("Ponte: a forma está vista; falta o conteúdo, e é nele que mora o achado mais grave do domínio.");

// S37 · D7: conteúdo
s = novo({ bloco: B3 });
titulo(s, "Agressão no brincar é matéria-prima normal; o sinal é a destruição sem enredo e a cena que se repete sem desfecho.");
filete(s, { y: 2.1 });
card(s, 0.6, 2.45, 5.9, 2.15, { fill: PP.branco, borda: PP.roxoMedio, bw: 0.75 });
txt(s, "AGRESSÃO MODULADA", { x: 0.9, y: 2.65, w: 5.3, h: 0.4, bold: true, fontSize: 14 });
txt(s, "a luta de bonecos com enredo, lados e algum desfecho onde a história respira: trabalho psíquico normal.", { x: 0.9, y: 3.1, w: 5.3, h: 1.4, fontSize: 13, lineSpacingMultiple: 1.12 });
card(s, 6.8, 2.45, 5.9, 2.15, { fill: PP.branco, borda: PP.coral, bw: 1.5 });
txt(s, "AGRESSÃO NÃO MODULADA", { x: 7.1, y: 2.65, w: 5.3, h: 0.4, bold: true, fontSize: 14, color: PP.coralTexto });
txt(s, "o esmagamento compulsivo sem narrativa, a destruição que não constrói cena, o aniquilamento repetido: um sinal.", { x: 7.1, y: 3.1, w: 5.3, h: 1.4, fontSize: 13, lineSpacingMultiple: 1.12 });
card(s, 0.6, 4.85, 12.1, 1.55, { fill: PP.lavanda });
txt(s, [
  { text: "Brincar pós-traumático: ", options: { bold: true, color: PP.coralTexto } },
  { text: "a repetição compulsiva de um fragmento de cena, idêntica, vez após vez, sem variação, sem desfecho e sem alívio. O brincar comum descarrega e transforma; este acumula. Registra-se a cena, a identidade das repetições, a ausência de desfecho e o afeto durante.", options: {} },
], { x: 0.95, y: 5.08, w: 11.5, h: 1.2, fontSize: 13.5, lineSpacingMultiple: 1.12 });
fonteRodape(s, LIVRO + "Parte II, Domínio 7");
s.addNotes("O que pesa não é a presença do tema (agressão, perigo, abandono, cuidado), é a possibilidade ou não de elaboração: o enredo que evolui contra a cena que se repete. Exigir do examinador a mesma serenidade que os conteúdos sombrios do adulto exigem.");

// S38 · D7: conduta + par
s = novo({ bloco: B3 });
titulo(s, "Dentro do brincar fala-se pela cena, não sobre a cena: a pergunta certa é do boneco.");
filete(s, { y: 2.0 });
bullets(s, [
  "Interrogar a criança que brinca derruba o palco: a cada pergunta de adulto ela sai do brincar e entra na entrevista, o dispositivo que não funciona nessa idade. Entre como personagem convidado e proponha de dentro.",
  "Uso do outro no brincar: a criança inclui, cede turnos, sustenta papéis? Ou o brincar é hermético, sem porta de entrada?",
  "Interesse restrito: o brincar pode ser rico e aprisionado num único tema que não cede. A riqueza dentro do tema não desfaz a rigidez do tema.",
], { y: 2.4, gap: 1.05, fontSize: 14 });
parRegistro(s, "Brincou pouco, brincar estranho.",
  "Brincar simbólico com papéis e três ações encadeadas; repetiu a cena da colisão de forma idêntica quatro vezes, sem desfecho e com face tensa durante.", { y: 5.3, h: 1.55 });
fonteRodape(s, LIVRO + "Parte II, Domínio 7");
s.addNotes("O kit importa: brinquedos que pedem projeção (miniaturas de gente, bonecos neutros, animais, blocos, casa, carrinhos simples). O eletrônico de luzes e sons brinca pela criança e devolve roteiro pronto: diante dele toda criança parece igual e o exame morre.");

// S39 · D7: camada 6-12
s = novo({ bloco: B3 });
titulo(s, "No escolar o jogo de regras assume o posto: a relação com a regra e com a derrota é o dado novo.");
filete(s, { y: 2.0 });
bullets(s, [
  "A criança compreende a regra, aceita, negocia? Ou trapaceia sem registro de transgressão, ou desmorona quando a regra a contraria?",
  "A derrota é a frustração em versão socializada, com plateia e adversário: a curva de retorno diante de perder diz do escolar o que a peça que não encaixa dizia do pré-escolar.",
  "O desenho vira via paralela (a narrativa gráfica que a criança constrói e comenta) e a conversa assume progressivamente o posto.",
], { y: 2.4, gap: 1.05, fontSize: 14 });
card(s, 0.6, 5.7, 12.1, 0.9, { fill: PP.lavandaClara });
txt(s, "O brincar não desaparece do exame; passa o bastão em câmera lenta, e a idade escolar é o trecho em que os dois correm juntos.", { x: 0.95, y: 5.92, w: 11.5, h: 0.6, fontSize: 14, italic: true });
fonteRodape(s, LIVRO + "Parte II, Domínio 7, camada 6 a 12");
s.addNotes("Erro a prevenir: concluir que o domínio recua porque o brincar recua. Ele muda de forma, e cada forma nova é uma janela nova.");

// S40 · D8: duas perguntas
s = novo({ bloco: B3 });
titulo(s, "Linguagem pede duas perguntas ao mesmo tempo: ela está onde deveria, e o que o uso dela mostra do psiquismo?");
filete(s, { y: 2.1 });
bullets(s, [
  "A pergunta desenvolvimental e a pergunta semiológica: confundi-las produz erro nos dois sentidos, patologizar o atraso simples e perder a alteração no uso.",
  "O esperado com folga: primeiras palavras perto do fim do 1º ano, combinações no 2º, frases no 3º; a compreensão sempre à frente da expressão.",
  "Dois fenômenos normativos a defender da patologização: a ecolalia imediata até por volta dos três anos (a criança repete para aprender) e o vocabulário em construção.",
], { y: 2.5, gap: 1.08, fontSize: 14 });
fonteRodape(s, LIVRO + "Parte II, Domínio 8");
s.addNotes("Eixos observáveis do pré-escolar: comunicação pré-verbal que sustenta ou não a fala (gesto, apontar, olhar, alternância de turnos que existe antes de qualquer palavra), prosódia (a monotonia ou a entonação cantada e descolada do conteúdo é achado fino), inteligibilidade e estrutura para a idade.");

// S41 · D8: receptiva + ecolalia
s = novo({ bloco: B3 });
titulo(s, "A compreensão se testa retirando as pistas: peça sem apontar e veja o que a linguagem sozinha sustenta.");
filete(s, { y: 2.05 });
bullets(s, [
  "A criança “que não obedece, que ignora, que é teimosa” pode ser a que não compreende: navega o mundo pelas pistas e não pelas palavras. Retirar as pistas é o exame.",
  "A ecolalia se pesa pela intenção: quem recruta o script do desenho PARA PEDIR comunica com o material que tem; quem roda o script para ninguém, em circuito autoestimulatório, mostra outra coisa. A mesma ecolalia, duas funções, dois pesos.",
], { y: 2.45, gap: 1.25, fontSize: 14.5 });
card(s, 0.6, 5.15, 12.1, 1.1, { fill: PP.lavandaClara });
txt(s, "Linha de registro: “compreendeu pedidos sem apoio gestual até dois passos; usou frases prontas de desenho com direção comunicativa (para pedir)”.", { x: 0.95, y: 5.4, w: 11.5, h: 0.7, fontSize: 13.5 });
fonteRodape(s, LIVRO + "Parte II, Domínio 8");
s.addNotes("A compreensão não faz barulho, e por isso o residente a esquece. Pedir sem apontar, sem olhar para o objeto, sem o contexto entregar a resposta.");

// S42 · D8: pragmática
s = novo({ bloco: B3 });
titulo(s, "A pragmática pesa mais que a estrutura: a criança que fala muito e comunica pouco é o achado central do domínio.");
filete(s, { y: 2.1 });
card(s, 0.6, 2.45, 12.1, 1.7, { fill: PP.branco, borda: PP.roxoMedio, bw: 0.75 });
txt(s, "A hierarquia que corrige o inventário: primeiro a FUNÇÃO (a linguagem serve para compartilhar com alguém?), depois a COMPREENSÃO (o que ela entende sem pistas?), e só então a ESTRUTURA (vocabulário, sintaxe, articulação).", { x: 0.95, y: 2.7, w: 11.4, h: 1.3, fontSize: 14.5, lineSpacingMultiple: 1.15 });
tropeco(s, "dar nota alta ao vocabulário e perder a pragmática deserta: o discurso unidirecional que não registra o interlocutor, o mal-entendido que nunca se repara. A estrutura preservada sem função é o pior sinal do domínio.", { y: 4.3 });
parRegistro(s, "Fala bem para a idade.",
  "Frases completas e vocabulário amplo; discurso unidirecional sobre o tema de interesse, sem ajuste ao interlocutor; não acompanhou duas tentativas de mudança de assunto.", { y: 5.55, h: 1.4 });
fonteRodape(s, LIVRO + "Parte II, Domínio 8");
s.addNotes("A criança de fala atrasada que compensa com gesto, olhar e turno conversa inteira sem palavras: função preservada é o melhor sinal do domínio. O inventário de vocabulário inverte a preocupação: alarma-se com a segunda e libera a primeira.");

// S43 · D8: mutismo + narrativa
s = novo({ bloco: B3 });
titulo(s, "O mutismo seletivo é discrepância contextual, não timidez nem déficit; e diante dele não se pressiona a fala.");
filete(s, { y: 2.1 });
bullets(s, [
  "Fluente em casa, muda na escola e no consultório: a linguagem existe, o contexto a bloqueia. A fala em casa prova o instrumento intacto; a topografia do silêncio é o dado.",
  "A pressão pela fala consolida o que se quer desfazer e suja o exame: a criança muda continua oferecendo psicomotricidade, afeto, brincar, díade. O silêncio não é exame que falhou; é dado que chegou.",
  "Camada 6 a 12: peça uma narrativa (o filme, o episódio, o dia) e examine a contação: começo, meio e fim, encadeamento, referências que se sustentam. Numa tarefa de três minutos, o curso, a coesão e a pragmática de uma vez.",
], { y: 2.5, gap: 1.15, fontSize: 14 });
fonteRodape(s, LIVRO + "Parte II, Domínio 8, camada 6 a 12");
s.addNotes("No escolar entram os eixos adultos (quantidade, velocidade, latência, volume, prosódia) e o curso do pensamento torna-se acessível pelo discurso, com a régua da idade na mão. A narrativa é para o escolar o que o brincar simbólico é para o pré-escolar: a estrutura do pensamento posta para fora.");

// S44 · D9: por faixa
s = novo({ bloco: B3 });
titulo(s, "No pré-escolar a cognição se lê no brincar; no escolar começa a se deixar testar, com instrumento calibrado pela idade.");
filete(s, { y: 2.1 });
card(s, 0.6, 2.45, 5.9, 3.4, { fill: PP.branco, borda: PP.roxoMedio, bw: 0.75 });
txt(s, "0 A 5 · NADA DE TAREFA FORMAL", { x: 0.9, y: 2.65, w: 5.3, h: 0.4, bold: true, fontSize: 13.5 });
txt(s, "causa e efeito (repete o gesto que funcionou), resolução de problemas (varia a estratégia ou repete a ação fracassada), função simbólica, compreensão de instruções sem pistas.", { x: 0.9, y: 3.1, w: 5.3, h: 2.5, fontSize: 13, lineSpacingMultiple: 1.15 });
card(s, 6.8, 2.45, 5.9, 3.4, { fill: PP.branco, borda: PP.roxoMedio, bw: 0.75 });
txt(s, "6 A 12 · TESTÁVEL, COM CALIBRAÇÃO", { x: 7.1, y: 2.65, w: 5.3, h: 0.4, bold: true, fontSize: 13.5 });
txt(s, "orientação pelas âncoras da idade (escola, série, professora, turno), memória de trabalho pela instrução de múltiplos passos, dígitos com norma conferida em manual, nunca de memória.", { x: 7.1, y: 3.1, w: 5.3, h: 2.5, fontSize: 13, lineSpacingMultiple: 1.15 });
fonteRodape(s, LIVRO + "Parte II, Domínio 9");
s.addNotes("A régua adulta aplicada a criança de oito anos fabrica déficit onde há desenvolvimento. A criança com déficit atencional executa o primeiro passo da instrução tripla e perde o resto: instrumento ecológico e barato.");

// S45 · D9: falso concretismo
s = novo({ bloco: B3 });
titulo(s, "Concretismo aos nove anos não é sinal, é a idade: o achado fabricado pelo instrumento errado é o mais evitável dos erros.");
filete(s, { y: 2.1 });
bullets(s, [
  "O escolar pensa concretamente: opera sobre o real, o presente, o manipulável. O provérbio ao pé da letra, a semelhança pelo uso (“as duas se comem”) é a idade pensando como a idade pensa.",
  "Provérbios e semelhanças abstratas antes da adolescência não medem patologia: medem a idade. Antes de registrar déficit, a pergunta obrigatória: o instrumento mede algo que a idade já deveria ter?",
  "Cognição se conclui por eliminação: o desempenho é rebaixado pela desregulação, pela ansiedade, pela desatenção, pelo não compreender. Só o exame dos outros domínios diz qual falhou.",
], { y: 2.35, gap: 0.98, fontSize: 13.5 });
parRegistro(s, "Concretismo.",
  "Semelhanças respondidas pelo uso, compatível com a idade; instrução de três passos executada até o segundo; resolução de problemas por tentativa e erro com mudança de estratégia.", { y: 5.4, h: 1.5 });
fonteRodape(s, LIVRO + "Parte II, Domínio 9");
s.addNotes("Encenar o erro em cadeia: provérbio na criança de nove anos, interpretação literal, “concretismo” no exame, e as associações que a palavra puxa no adulto. Está errado desde o instrumento. E o pensamento mágico decai ao longo da idade escolar sem data marcada: o amigo imaginário no começo da faixa continua sendo desenvolvimento.");

// ============================================================================
// BLOCO 4 · Teste, juízo e o que se apura por último · S46 a S54
// ============================================================================
const B4 = "BLOCO 4 · TESTE, JUÍZO E RISCO";

// S46 · Divisor
s = novo({ dark: true });
divisor(s, "BLOCO 4 · O TESTE, O JUÍZO E O QUE SE APURA POR ÚLTIMO",
  "Os domínios que no adulto dependem do relato são os que mais recuam na criança; e o risco ganha capítulo próprio.",
  "Sensopercepção · consciência do eu · juízo, insight e risco · os domínios de completude.\nPrimeiro o que se observa, depois o que se pergunta, e a pergunta sempre calibrada pela idade.",
  "O risco não existe como capítulo próprio no exame adulto; aqui precisa existir, e o porquê aparece no domínio 12.");

// S47 · D10: a norma generosa
s = novo({ bloco: B4 });
titulo(s, "A fronteira entre o percebido e o imaginado é porosa por construção: monstro, amigo imaginário e figuras do sono são norma.");
filete(s, { y: 2.1 });
bullets(s, [
  "O monstro embaixo da cama é visto com a convicção de uma mente que ainda não selou a fronteira entre o dentro e o fora; não é convicção alucinatória.",
  "O amigo imaginário conversa e responde: função simbólica em exercício; perguntada com calma, a criança frequentemente diz que é “de brincadeira”.",
  "As figuras do adormecer e do despertar são fenômenos do sono, em qualquer idade. E mesmo no escolar, experiências simples e transitórias (o nome chamado, o vulto) são relativamente comuns e de baixo valor preditivo isoladas.",
], { y: 2.5, gap: 1.1, fontSize: 14 });
card(s, 0.6, 5.8, 12.1, 0.9, { fill: PP.lavanda });
txt(s, "A frase que calibra o domínio: na infância, a experiência perceptiva atípica isolada é um achado a registrar e acompanhar, quase nunca um diagnóstico a fazer.", { x: 0.95, y: 6.0, w: 11.5, h: 0.65, fontSize: 14, bold: true });
fonteRodape(s, LIVRO + "Parte II, Domínio 10");
s.addNotes("O domínio onde mais se erra para os dois lados: alucinação registrada onde há imaginação, e o sinal raro e grave ignorado porque “criança inventa coisa”.");

// S48 · D10: método
s = novo({ bloco: B4 });
titulo(s, "A pergunta que planta colhe alucinação falsa: registre a atitude observada e pergunte aberto, tarde e sem sugestão.");
filete(s, { y: 2.1 });
card(s, 0.6, 2.45, 5.9, 2.6, { fill: PP.branco, borda: PP.roxoMedio, bw: 0.75 });
txt(s, "TRILHO 1 · O OBSERVADO", { x: 0.9, y: 2.65, w: 5.3, h: 0.4, bold: true, fontSize: 13.5 });
txt(s, "atitude alucinatória: parar e olhar fixo o ponto vazio, voltar-se ao som que não houve, sussurrar para o nada. Registra-se com hora e contexto, mesmo que a criança negue; descrito como observado, não promovido a alucinação.", { x: 0.9, y: 3.1, w: 5.3, h: 1.8, fontSize: 12.5, lineSpacingMultiple: 1.12 });
card(s, 6.8, 2.45, 5.9, 2.6, { fill: PP.branco, borda: PP.roxoMedio, bw: 0.75 });
txt(s, "TRILHO 2 · A PERGUNTA (escolar)", { x: 7.1, y: 2.65, w: 5.3, h: 0.4, bold: true, fontSize: 13.5 });
txt(s, "aberta, tardia, sem sugestão: “tem alguma coisa que seus ouvidos ou seus olhos fazem que te incomoda?”. A criança escolar é melhor fonte que os pais para as próprias experiências perceptivas.", { x: 7.1, y: 3.1, w: 5.3, h: 1.8, fontSize: 12.5, lineSpacingMultiple: 1.12 });
parRegistro(s, "Alucinações visuais (refere ver monstros).",
  "Relata monstro embaixo da cama à noite, com medo proporcional e crítica parcial (“de dia ele não existe”); sem atitude alucinatória observada na consulta.", { y: 5.45, h: 1.5 });
fonteRodape(s, LIVRO + "Parte II, Domínio 10");
s.addNotes("O que desloca do benigno para a preocupação é o séquito: sofrimento, comando (sobretudo contra a criança ou alguém), convicção inabalável em idade que já deveria relativizar, multimodalidade, deterioração do funcionamento. Pesa-se pelo contexto e pelo cortejo, nunca sozinha. E o custo do erro: “alucinação” num prontuário infantil é palavra que ninguém mais apaga.");

// S49 · D11: trajetória
s = novo({ bloco: B4 });
titulo(s, "O eu se examina pela trajetória: primeiro nominal e corporal, depois interior, depois capaz de integrar contradições.");
filete(s, { y: 2.1 });
const eu = [
  ["PRÉ-ESCOLAR", "usa o nome e depois os pronomes (o “eu” no 3º ano); descreve-se pelo físico e pelo que faz; inclui-se no desenho da família"],
  ["7 A 9 ANOS", "o eu ganha interior: traços psicológicos (“sou tímido”), a comparação com os pares como régua de si"],
  ["10 A 12 ANOS", "integra contradições (“quieto na escola, em casa não”); autoestima que já não depende do último evento; vergonha e culpa encontram o dono"],
];
eu.forEach((p, i) => {
  const y = 2.45 + i * 1.15;
  card(s, 0.6, y, 12.1, 1.0, { fill: PP.branco, borda: PP.roxoMedio, bw: 0.75 });
  txt(s, p[0], { x: 0.85, y: y + 0.14, w: 2.3, h: 0.7, bold: true, fontSize: 12.5, color: PP.coralTexto });
  txt(s, p[1], { x: 3.2, y: y + 0.14, w: 9.3, h: 0.75, fontSize: 12.5, lineSpacingMultiple: 1.08 });
});
card(s, 0.6, 6.0, 12.1, 0.75, { fill: PP.lavandaClara });
txt(s, "Alterações do desenvolvimento: pronomes que não chegam, inversão pronominal persistente, não se reconhecer agente. A criança que sistematicamente se desenha fora da família oferece um dado que nenhuma pergunta colheria.", { x: 0.95, y: 6.12, w: 11.5, h: 0.6, fontSize: 12 });
fonteRodape(s, LIVRO + "Parte II, Domínio 11");
s.addNotes("O pulo “criança não tem eu formado” é duplamente errado: o eu está em formação e é exatamente a formação que se examina. A pergunta do domínio: o eu desta criança está onde a idade o colocaria? Terceira pessoa típica aos dois, achado se persiste anos além.");

// S50 · D11: espécime
s = novo({ bloco: B4 });
titulo(s, "A fala da criança sobre si é espécime: colhe-se intacta, entre aspas; a paráfrase joga fora o que importava.");
filete(s, { y: 2.1 });
bullets(s, [
  "Autodesvalorização global: não o “fui mal na prova”, mas “eu sou burro”, “ninguém gosta de mim”: a atribuição que saltou do evento para a identidade.",
  "Desamparo aprendido: “não adianta tentar”, dito com a tranquilidade de quem constata.",
  "São achados de exame, não desabafos a consolar e esquecer. E o mais barato de colher: basta não interromper.",
], { y: 2.5, gap: 0.95, fontSize: 14.5 });
parRegistro(s, "Baixa autoestima.",
  "Sobre si, espontaneamente: “eu sou burro, todo mundo termina e eu não”; localiza o problema em si mesmo.", { y: 5.3, h: 1.5 });
fonteRodape(s, LIVRO + "Parte II, Domínio 11");
s.addNotes("“Eu sou burro, todo mundo sabe” registrado textual vale um parágrafo; parafraseado (“apresenta baixa autoestima”) vale quase nada, porque a paráfrase joga fora a globalidade, o “todo mundo”, a naturalidade da sentença. Neste domínio, as aspas são o instrumento.");

// S51 · D12: juízo e insight
s = novo({ bloco: B4 });
titulo(s, "O juízo se mostra no entrar e sair do faz de conta; o insight da infância é o desconforto e a noção do motivo.");
filete(s, { y: 2.1 });
bullets(s, [
  "Teste de realidade pela via indireta: a criança que entra e sai do faz de conta sabe, ao sair, que era faz de conta.",
  "O delírio merece uma linha: raro e rudimentar na criança, não sistematizado; quando um juízo francamente falso e inabalável aparece, a primeira investigação é orgânica.",
  "Insight sem pergunta madura: o desconforto (a criança que sofre e estranha a própria experiência) e a noção do motivo: “você sabe por que veio aqui hoje?”. O leque de respostas gradua o domínio.",
  "No escolar, soma-se a atribuição: o problema é dela, dos outros, de ninguém. Essa localização pesa para o tratamento que virá.",
], { y: 2.5, gap: 1.0, fontSize: 14 });
fonteRodape(s, LIVRO + "Parte II, Domínio 12");
s.addNotes("“Porque eu bato nos meus amigos”, “porque minha mãe quis”, “não sei”: o leque gradua melhor que qualquer formulação abstrata.");

// S52 · D12: risco, a pergunta
s = novo({ bloco: B4 });
titulo(s, "Risco se pergunta a sós, direto e sem eufemismo: perguntar não semeia a ideia; o silêncio deixa a criança sozinha.");
filete(s, { y: 2.1 });
bullets(s, [
  "A partir da idade escolar, a própria criança é frequentemente a ÚNICA fonte da ideação: os pais, via de regra, não sabem. Isso, sozinho, justifica o momento a sós.",
  "O momento a sós se propõe como rotina, não como suspeita, com enquadre honesto sobre o que pode e o que não pode ficar só entre os dois.",
  "Pergunta-se diretamente, com palavras simples. A evidência é tranquilizadora e deve ser dita com todas as letras: perguntar sobre ideação de morte não planta a ideia.",
], { y: 2.5, gap: 1.1, fontSize: 14 });
card(s, 0.6, 5.85, 12.1, 0.85, { fill: PP.lavanda });
txt(s, "A criança que já pensava nisso frequentemente sente alívio com a pergunta: alguém abriu a porta que ela não sabia abrir.", { x: 0.95, y: 6.05, w: 11.5, h: 0.6, fontSize: 14, bold: true });
fonteRodape(s, LIVRO + "Parte II, Domínio 12");
s.addNotes("Desmontar os dois medos do residente: plantar a ideia (empiricamente falso) e não saber o que fazer com a resposta (problema de fluxo, não de exame; a conduta é outra aula). O exame tem uma obrigação: perguntar e registrar.");

// S53 · D12: risco, o registro
s = novo({ bloco: B4 });
titulo(s, "Risco se documenta na presença e na ausência: ideia, plano, intenção, meios, tentativas, preparativos, ou a negativa minuciosa.");
filete(s, { y: 2.1 });
bullets(s, [
  "O exame que não menciona risco não o descartou: apenas não o examinou. Em criança com sofrimento relevante, é prontuário incompleto.",
  "Quando presente: ideia passiva ou ativa, plano, intenção, acesso aos meios, tentativas prévias (o preditor estável mais forte) e preparativos (o preditor agudo mais grave).",
  "Autolesão sem intenção de morte distingue-se da tentativa: funções diferentes, condutas diferentes; “o que você sente antes? e depois?” é parte do exame. Heteroagressividade pela mesma disciplina.",
], { y: 2.4, gap: 1.0, fontSize: 13.5 });
parRegistro(s, "Sem alterações.",
  "Perguntado diretamente a sós: nega pensamentos de morte ou de se machucar, hoje e antes; sem tentativas prévias segundo ele e a mãe; pele exposta sem lesões.", { y: 5.45, h: 1.45 });
fonteRodape(s, LIVRO + "Parte II, Domínio 12");
s.addNotes("Dar as duas frases prontas, a do negativo e a do positivo minucioso: o campo de risco é o único em que a frase pronta não é preguiça; é a garantia de que nada foi esquecido às vinte horas de uma sexta-feira.");

// S54 · D13: completude
s = novo({ bloco: B4 });
titulo(s, "Quatro campos fecham a súmula em poucas linhas: vígil, orientado contra quê, memória ecológica e a autonomia da idade.");
filete(s, { y: 2.1 });
const compl = [
  ["NÍVEL DE CONSCIÊNCIA", "vígil e alerta é o esperado; qualquer coisa diferente é bandeira orgânica: não espera, investiga-se"],
  ["ORIENTAÇÃO", "pelas âncoras da idade, e o registro diz contra o quê: “orientada quanto a escola, série e período”"],
  ["MEMÓRIA", "ecológica: a instrução de passos, a narrativa do fim de semana, o nome do dinossauro batizado na consulta"],
  ["PRAGMATISMO E INTELIGÊNCIA", "esta criança faz o que a idade dela faz? perda de autonomia conquistada é regressão; inteligência entra como impressão de compatibilidade, nunca medida"],
];
compl.forEach((p, i) => {
  const y = 2.4 + i * 0.85;
  card(s, 0.6, y, 12.1, 0.72, { fill: PP.branco, borda: PP.roxoMedio, bw: 0.75 });
  txt(s, p[0], { x: 0.85, y: y + 0.09, w: 3.3, h: 0.58, bold: true, fontSize: 11.5, color: PP.coralTexto });
  txt(s, p[1], { x: 4.25, y: y + 0.09, w: 8.3, h: 0.58, fontSize: 11.5, lineSpacingMultiple: 1.03 });
});
parRegistro(s, "Orientado.",
  "Orientado quanto a escola, série, professora e turno; errou o dia do mês, sem valor na idade.", { y: 6.1, h: 0.9 });
fonteRodape(s, LIVRO + "Parte II, Domínio 13");
s.addNotes("Fecho da Parte II: dos treze domínios, quantos dependeram de perguntar algo à criança? No pré-escolar, quase nenhum. E os que dependem da pergunta no escolar dependem todos da mesma disciplina: pergunta calibrada pela idade, relato cruzado com o observado, fonte registrada. A moldura da inteligência: janelas de desenvolvimento e privação que a estimulação tardia recupera às vezes por inteiro, às vezes em parte; ler o desempenho baixo perguntando primeiro pela história.");

// ============================================================================
// SÍNTESE (Parte III) · S55 a S59
// ============================================================================
const SIN = "SÍNTESE";

// S55 · Divisor
s = novo({ dark: true });
divisor(s, "PARTE III · A INTEGRAÇÃO",
  "Colher domínios não é o difícil; o difícil é amarrá-los num retrato: a síntese interpreta, obrigatoriamente e com lastro.",
  "A regra “descrever antes de interpretar” não proíbe a interpretação; ela a agenda.\nO corpo é o antes; a síntese é o depois. Interpretar sem lastro é chutar com vocabulário técnico.",
  "É a parte mais curta do livro e a que separa o prontuário que descreve uma criança do que empilha campos. Sintetizar se aprende escrevendo sob crítica, e a crítica é o professor.");

// S56 · As duas falhas
s = novo({ bloco: SIN });
titulo(s, "A síntese não é resumo nem diagnóstico: as duas falhas simétricas que matam o retrato.");
filete(s, { y: 2.0 });
card(s, 0.6, 2.35, 5.9, 2.7, { fill: PP.branco, borda: PP.roxoMedio, bw: 0.75 });
txt(s, "SÍNTESE-RESUMO", { x: 0.9, y: 2.55, w: 5.3, h: 0.4, bold: true, fontSize: 14 });
txt(s, "repete os domínios em sequência; justapõe, não integra.\n\nO sinal: pode-se embaralhar a ordem das frases sem perder nada.", { x: 0.9, y: 3.0, w: 5.3, h: 1.9, fontSize: 13.5, lineSpacingMultiple: 1.15 });
card(s, 6.8, 2.35, 5.9, 2.7, { fill: PP.branco, borda: PP.roxoMedio, bw: 0.75 });
txt(s, "SÍNTESE-DIAGNÓSTICO", { x: 7.1, y: 2.55, w: 5.3, h: 0.4, bold: true, fontSize: 14 });
txt(s, "salta para o rótulo e abandona o observado.\n\nO sinal: as frases já não citam nada que se viu; citam categorias.", { x: 7.1, y: 3.0, w: 5.3, h: 1.9, fontSize: 13.5, lineSpacingMultiple: 1.15 });
card(s, 0.6, 5.35, 12.1, 1.15, { fill: PP.lavanda });
txt(s, "Teste de fronteira: a síntese deve continuar verdadeira mesmo que a hipótese diagnóstica mude na consulta seguinte, porque descreve o que se viu, não o que se concluiu.", { x: 0.95, y: 5.6, w: 11.5, h: 0.75, fontSize: 14.5, bold: true });
fonteRodape(s, LIVRO + "Parte III");
s.addNotes("A síntese fecha o exame; a hipótese fecha a avaliação. A síntese alimenta a hipótese, mas termina antes: aponta direção sem cravar rótulo.");

// S57 · Achado organizador
s = novo({ bloco: SIN });
titulo(s, "O retrato se organiza em torno de um achado organizador, eleito por severidade, generalização, natureza e convergência.");
filete(s, { y: 2.1 });
bullets(s, [
  "Achado organizador: aquele em torno do qual os demais se arrumam e fazem sentido juntos. O mesmo conjunto pode ser hierarquizado de formas diferentes: a síntese é uma leitura DEFENDIDA, não a única possível.",
  "Os critérios: severidade; generalização entre contextos; natureza do desvio (dissociação, regressão e inflexibilidade elegem organizadores acima de qualquer atraso quantitativo); convergência de fontes.",
  "Fora da síntese fica o ruído normativo: o que é da idade não entra no retrato como achado, e a coragem de deixar fora é metade da elegância.",
], { y: 2.5, gap: 1.12, fontSize: 14 });
fonteRodape(s, LIVRO + "Parte III");
s.addNotes("Abaixo do organizador, os secundários: reais, registrados, lidos à luz dele. Exemplos de ruído normativo que sai: a ansiedade de separação esperada, o nível de atividade da idade, a ecolalia dos dois anos.");

// S58 · O fio e o compromisso
s = novo({ bloco: SIN });
titulo(s, "Cada solda entre domínios carrega um compromisso calibrado: descreve, sugere, é compatível com, levanta a hipótese de.");
filete(s, { y: 2.1 });
const grad = [
  ["DESCREVE", "compromisso zero: enuncia o observado"],
  ["SUGERE", "aponta uma leitura"],
  ["É COMPATÍVEL COM", "admite uma categoria sem fechá-la"],
  ["LEVANTA A HIPÓTESE DE", "convoca a investigação"],
];
grad.forEach((p, i) => {
  const x = 0.6 + i * 3.11;
  card(s, x, 2.5, 2.91, 1.75, { fill: PP.branco, borda: PP.roxoMedio, bw: 0.75 });
  s.addShape(ST.rect, { x, y: 2.5, w: 2.91, h: 0.07 + i * 0.035, fill: { color: PP.coral } });
  txt(s, p[0], { x: x + 0.15, y: 2.72, w: 2.65, h: 0.65, bold: true, fontSize: 12 });
  txt(s, p[1], { x: x + 0.15, y: 3.35, w: 2.65, h: 0.8, fontSize: 11.5, lineSpacingMultiple: 1.08 });
});
card(s, 0.6, 4.6, 12.1, 1.05, { fill: PP.lavandaClara });
txt(s, "A escrita é um fio: parte do organizador, e os demais achados entram conectados a ele. Cada “somada a”, cada “à luz de” é uma solda; a síntese boa tem mais soldas que vírgulas.", { x: 0.95, y: 4.82, w: 11.5, h: 0.7, fontSize: 14 });
txt(s, "No pré-escolar a síntese é estruturalmente relacional: um pré-escolar sintetizado sem uma linha sobre o par foi sintetizado pela metade.", { x: 0.62, y: 5.9, w: 12.0, h: 0.6, fontSize: 13, italic: true, color: PP.roxoMedio });
fonteRodape(s, LIVRO + "Parte III");
s.addNotes("O erro não é usar o gradiente, é usá-lo desafinado: o “é compatível com” sustentado por um único observável, ou o “descreve-se” tímido diante de um padrão robusto. Dizer exatamente o quanto se sabe, nem mais, nem menos.");

// S59 · Síntese do normal + seis passos
s = novo({ bloco: SIN });
titulo(s, "A rubrica “sem alterações” não descreve criança nenhuma; a síntese do normal é a prova final da disciplina.");
filete(s, { y: 2.05 });
card(s, 0.6, 2.4, 12.1, 1.65, { fill: PP.branco, borda: PP.coral, bw: 1.25 });
txt(s, "“Explorou a sala com iniciativa e checou a mãe ao encontrar o brinquedo novo; sustentou faz de conta com enredo e me incluiu nele; frustrou-se ao guardar os brinquedos e reorganizou-se em minutos com apoio verbal. Exame compatível com o esperado para a idade, sem achados que demandem seguimento.”", { x: 0.95, y: 2.6, w: 11.4, h: 1.35, fontSize: 13, italic: true, lineSpacingMultiple: 1.15 });
txt(s, "OS SEIS PASSOS DA SÍNTESE", { x: 0.62, y: 4.25, w: 6, h: 0.3, bold: true, fontSize: 11, charSpacing: 2, color: PP.roxoMedio });
const passos = [
  "1 · risque o ruído normativo", "2 · eleja o organizador (e defenda-o)", "3 · subordine os secundários, conectados",
  "4 · calibre o compromisso de cada solda", "5 · escreva a ressalva e encomende a próxima consulta", "6 · cada frase aponta para algo registrado?",
];
passos.forEach((p, i) => {
  const x = 0.6 + (i % 3) * 4.13, y = 4.6 + Math.floor(i / 3) * 0.95;
  card(s, x, y, 3.93, 0.82, { fill: PP.lavandaClara });
  txt(s, p, { x: x + 0.18, y: y + 0.14, w: 3.6, h: 0.6, fontSize: 11.5, lineSpacingMultiple: 1.03 });
});
fonteRodape(s, LIVRO + "Parte III");
s.addNotes("A incerteza escrita fortalece: a ressalva de amostra (“exame colhido às 18h, criança sem sesta; reavaliar”), o domínio não avaliável dito com o porquê, as fontes que divergem registradas como dado. O exame é um filme do qual cada consulta é um fotograma, e a síntese que sabe disso escreve o fotograma e encomenda o seguinte. O “compatível com o esperado” do exemplo está lastreado, não carimbado.");

// ============================================================================
// OS DOIS EXAMES DE BENTO (Parte IV) · S60 a S67
// ============================================================================
const BEN = "BENTO";

// S60 · Divisor
s = novo({ dark: true });
divisor(s, "PARTE IV · OS DOIS EXAMES DE BENTO",
  "O mesmo menino aos 4 e aos 9: a régua anda, os domínios trocam de peso e o exame diz, nas duas vezes, o quanto sabe.",
  "Cada exame em quatro tempos: a cena, o exame narrativo por extenso, a súmula e a anotação de por que a síntese ficou assim.",
  "É o clímax didático: a teoria inteira virando texto de prontuário. A anotação é onde os seis passos aparecem trabalhando.");

// S61 · Cena A
s = novo({});
cenaBento(s, "CASO A · BENTO, 4 ANOS",
  "Bento, 4 anos e 2 meses, entra na frente da mãe, varre a sala com o olhar e vai direto aos carrinhos.",
  "Trazido pela mãe por “agitação e birras que não melhoram”. Consulta às 9h30, dormiu bem. Ao longo de cinquenta minutos: brinca, muda de brinquedo com frequência, monta duas cenas curtas de faz de conta, inclui o examinador numa delas, frustra-se duas vezes (a peça que não encaixa; o fim da consulta), chora na segunda, aceita o colo da mãe e se reorganiza nele.",
  "Script da cena: a mãe responde aos chamados dele, comenta o brincar, guarda o celular sem ser pedida. Perguntar à turma, antes do prontuário: o que vocês já colheram só nesta cena? Entrada, exploração, díade, frustração e consolo já estão na mesa.");

// S62 · Narrativo A
s = novo({ bloco: BEN });
titulo(s, "O exame narrativo mostra o como: prosa em primeira pessoa, com as condições da amostra na porta.");
filete(s, { y: 2.0 });
card(s, 0.6, 2.3, 12.1, 3.55, { fill: PP.branco, borda: PP.roxoMedio, bw: 0.75 });
txt(s, "“Recebi Bento e a mãe às 9h30; a mãe informa noite de sono habitual. (...) Moveu-se muito durante toda a consulta, quase sempre com direção, embora raramente permanecesse mais de três ou quatro minutos numa mesma atividade, inclusive nas que visivelmente o interessavam. (...) O brincar alcançou o simbólico: montou uma cena de posto de gasolina com papéis, e me incluiu na cena. As cenas, porém, foram curtas: desfaziam-se por migração do interesse. (...) Ao anúncio do fim da consulta, chorou com força; buscou o colo da mãe por iniciativa própria e reorganizou-se nele em cerca de três minutos. O colo funcionou. (...) Num pedido de três passos, executou os dois primeiros e perdeu o terceiro.”", { x: 0.95, y: 2.52, w: 11.4, h: 3.2, fontSize: 12.5, italic: true, lineSpacingMultiple: 1.16 });
card(s, 0.6, 6.0, 12.1, 0.8, { fill: PP.lavanda });
txt(s, "Leitura em voz alta, apontando cada tradução usada. Texto integral nas notas deste slide.", { x: 0.95, y: 6.2, w: 11.5, h: 0.55, fontSize: 13, bold: true });
fonteRodape(s, LIVRO + "Parte IV, Caso A");
s.addNotes("TEXTO INTEGRAL (ler no roteiro ou aqui): Recebi Bento e a mãe às 9h30; a mãe informa noite de sono habitual. Bento entrou à frente dela e deteve-se brevemente à entrada, varrendo a sala com o olhar numa pausa de estudo, com olhar ativo sobre os brinquedos. Dirigiu-se então aos carrinhos por iniciativa própria, sem checar a mãe para isso. Menino eutrófico, aparentando a idade que tem, roupa limpa e adequada ao calor da manhã, sem lesões visíveis nas áreas expostas. Moveu-se muito durante toda a consulta, quase sempre com direção: da caixa aos carrinhos, dos carrinhos aos blocos, com propósito reconhecível em cada deslocamento, embora raramente permanecesse mais de três ou quatro minutos numa mesma atividade, inclusive nas que visivelmente o interessavam. Coordenação global e fina sem particularidades. Não observei movimentos repetitivos em nenhum momento, nem nos picos de empolgação. O brincar alcançou o simbólico: montou uma cena de posto de gasolina com blocos e carrinhos, com papéis (“você é o moço do posto”) e duas ou três ações encadeadas, e me incluiu na cena, cedendo e tomando turnos. As cenas, porém, foram curtas: desfaziam-se não por conflito, mas por migração do interesse, e ele não retornou a nenhuma delas. Quando propus, de dentro da cena, que o carro quebrado fosse ao mecânico, aceitou e transformou a proposta (“não, ele vai voar pro mecânico”), flexível e com invenção própria. Os temas foram neutros e variados; nada se repetiu, nada estagnou. O afeto foi amplo e vivo a consulta inteira: alegria franca no brincar, entusiasmo que me alcançava, e a graça que ofereci dentro da cena foi recebida e devolvida ampliada; aborrecimento claro e proporcional nas duas frustrações. Na primeira, uma peça que não encaixou, protestou vocalmente, largou a peça e voltou a ela sozinho depois de um minuto, tentando de outro jeito, sem se desorganizar. Na segunda, ao anúncio do fim da consulta, chorou com força; buscou o colo da mãe por iniciativa própria e reorganizou-se nele em cerca de três minutos. O colo funcionou. Durante toda a consulta, Bento checou a mãe nos momentos esperados e ela respondeu ao que ele trazia, comentando o brincar dele com ajuste fino. Num momento em que ela se distraiu e ele a chamou sem resposta, ele insistiu, ela se voltou e retomou: o desencontro foi notado e refeito por iniciativa dos dois. A fala é inteligível, com frases completas para a idade e prosódia rica; encenou vozes diferentes para os personagens. Compreendeu pedidos sem apoio gestual, incluindo um de dois passos; num pedido de três passos, executou os dois primeiros e perdeu o terceiro. Usou o apontar tanto para pedir quanto para me mostrar. Vígil e em alerta tranquilo do início ao fim. Impressão: um pré-escolar de recursos íntegros, com simbólico de enredo e flexibilidade, díade responsiva com reparação espontânea, afeto amplo e congruente, consolabilidade plena e comunicação com função preservada, em torno de um único eixo que destoa: a sustentação. Perfil de sustentação curta para a idade, hoje sem prejuízo visível e amortecido por tudo que está preservado: uma variação a observar, mais do que um desvio estabelecido. As birras que motivaram a consulta apareceram aqui como frustração proporcional, com curva de retorno eficaz mediada pela mãe. Exame colhido em manhã favorável; a sustentação curta deve ser reavaliada em outras amostras e cruzada com o relato da escola, que é o que a próxima consulta precisa trazer.");

// S63 · Súmula A + anotação
s = novo({ bloco: BEN });
titulo(s, "A súmula e a anotação: a sustentação curta virou organizadora porque três domínios independentes convergiram nela.");
filete(s, { y: 2.1 });
const sumA = [
  ["Atenção", "sustentada por 3 a 4 min, inclusive no interesse; consolabilidade plena"],
  ["Brincar", "simbólico com papéis e turnos, flexível; cenas curtas desfeitas por migração"],
  ["Linguagem", "compreensão sem pistas até dois passos; perdeu o terceiro de três"],
  ["Díade", "contingência, corregulação eficaz, reparação espontânea"],
  ["Impressão", "recursos íntegros em torno de sustentação curta; variação a observar; reavaliar com relato escolar"],
];
sumA.forEach((p, i) => {
  const y = 2.45 + i * 0.7;
  card(s, 0.6, y, 12.1, 0.6, { fill: i === 4 ? PP.lavanda : PP.branco, borda: PP.roxoMedio, bw: 0.75 });
  txt(s, p[0], { x: 0.85, y: y + 0.1, w: 1.9, h: 0.42, bold: true, fontSize: 11.5, color: PP.coralTexto });
  txt(s, p[1], { x: 2.85, y: y + 0.1, w: 9.7, h: 0.44, fontSize: 11.5, lineSpacingMultiple: 1.0 });
});
card(s, 0.6, 6.1, 12.1, 0.75, { fill: PP.lavandaClara });
txt(s, "A anotação: o ruído normativo saiu (atividade dirigida, birra com retorno eficaz); a convergência entre atenção, brincar e memória de trabalho elegeu o organizador; o compromisso ficou no mínimo honesto; nenhuma sigla.", { x: 0.95, y: 6.22, w: 11.5, h: 0.6, fontSize: 11.5 });
fonteRodape(s, LIVRO + "Parte IV, Caso A (súmula completa nas notas e no roteiro)");
s.addNotes("Súmula completa no livro. Pontos da anotação a falar: a síntese RESPONDE à queixa da mãe (as birras renomeadas como o que o exame mostrou que são) em vez de adotá-la; os recursos íntegros não foram listados, foram postos em função (amortecedores); e o passo seis passa: cada frase da impressão aponta para um observável do corpo. Reparar no que a síntese não tem: nenhuma frase da rubrica adulta, e nenhuma falta faz.");

// S64 · Tração
s = novo({ dark: true, bloco: BEN });
s.addShape(ST.rect, { x: 0.62, y: 1.3, w: 1.7, h: 0.05, fill: { color: PP.dourado } });
s.addText("Bento cresceu, entrou na escola, e cinco anos depois a mãe volta: as notas caem, a escola reclama, e ele anda dizendo que é burro.", { x: 0.62, y: 1.7, w: 12.0, h: 3.0, fontFace: SERIF, fontSize: 28, bold: true, color: PP.offWhite, lineSpacingMultiple: 1.12 });
s.addText("Quando o paciente começa a falar, o que muda no exame? Quase tudo, e quase nada.", { x: 0.62, y: 5.0, w: 11.8, h: 0.8, fontFace: SANS, fontSize: 16, italic: true, color: PP.lavanda });
s.addNotes("Pausa de tração. Não antecipar os achados: deixar a consulta dos 9 anos acontecer no slide seguinte.");

// S65 · Cena B
s = novo({});
cenaBento(s, "CASO B · BENTO, 9 ANOS",
  "Bento, 9 anos e 7 meses, senta antes de ser convidado e rói as unhas até o leito; a consulta é às 16h de um dia de aula.",
  "Retorna cinco anos e meio depois: notas caindo desde o ano passado, reclamações da escola (“não para, não termina nada”), brigas com colegas, e “ele anda dizendo que é burro”. Entra atrás da mãe, cumprimenta baixo, senta e mexe nas mãos. Colabora toda a consulta. Vinte minutos a sós com ele, com enquadre combinado. A mãe complementa ao final; relatório da escola disponível.",
  "Notar com a turma o que a cena já entrega: a entrada atrás da mãe (aos 4 entrou na frente), o horário (16h, dia de aula, entra na leitura), as unhas roídas, a inquietação periférica. O prontuário longitudinal vai usar o exame dos 4 anos.");

// S66 · Narrativo B
s = novo({ bloco: BEN });
titulo(s, "A sós, com enquadre combinado, Bento entrega o que nenhum adulto sabia; o exame registra textual e minucioso.");
filete(s, { y: 2.0 });
card(s, 0.6, 2.3, 12.1, 3.55, { fill: PP.branco, borda: PP.roxoMedio, bw: 0.75 });
txt(s, "“A sós, com o enquadre combinado (o que conversamos é dele, exceto o que envolver segurança), Bento falou da escola com as palavras que registro textuais: ‘eu sou burro mesmo, todo mundo termina e eu não’, e adiante, ‘eu estrago tudo, até no futebol eu estragava’. Perguntei diretamente sobre pensamentos de morte. Respondeu, após pausa: ‘às vezes eu penso que era melhor eu sumir, aí ninguém ia ficar bravo comigo’. Explorei com calma: o pensamento vem ‘quando a professora briga’ ou depois das notas, não todo dia; nunca pensou em um jeito; nega intenção, nega qualquer tentativa ou preparo, nega autolesão; pele sem lesões. Perguntado se algum adulto sabe desses pensamentos, disse que não, ‘só você agora’. Combinamos juntos como isso seria dito à mãe.”", { x: 0.95, y: 2.52, w: 11.4, h: 3.2, fontSize: 12.5, italic: true, lineSpacingMultiple: 1.16 });
card(s, 0.6, 6.0, 12.1, 0.8, { fill: PP.lavanda });
txt(s, "O afeto apagava quando a escola entrava e acendia no videogame; “não sei... normal” com a expressão dizendo menos que isso. Texto integral nas notas.", { x: 0.95, y: 6.2, w: 11.5, h: 0.55, fontSize: 13, bold: true });
fonteRodape(s, LIVRO + "Parte IV, Caso B");
s.addNotes("TEXTO INTEGRAL (resumido nos pontos que faltam ao slide): Recebi Bento e a mãe às 16h de um dia de aula; ele veio direto da escola, e o horário entra na leitura do que segue. Entrou atrás da mãe, cumprimentou-me em voz baixa e sem sustentar o olhar, e sentou-se antes de ser convidado, como quem conhece o roteiro de consultórios. Menino em bom estado geral, uniforme escolar amarrotado do dia, unhas roídas até o leito. Permaneceu sentado a consulta inteira, mas não parado: remexeu as mãos, balançou a perna, numa inquietação periférica contínua que aumentava visivelmente quando o assunto era a escola e diminuía quando falamos de videogame. Colaborou do início ao fim, com uma disposição que tinha algo de resignado, exceto nos cinco minutos em que me contou do jogo que joga: ali a voz subiu, o corpo acordou e o relato ganhou cor. A narrativa pedida teve começo, meio e fim, com referências que se sustentavam e autorresgate dos desvios. Numa instrução casual de três passos ao fim da consulta, executou o primeiro, parou e perguntou “o que era mesmo?”. Orientado para escola, série, professora e turno; errou o dia do mês, sem valor na idade. O afeto foi eutímico e reativo na maior parte, com dois desvios consistentes: a cor apagava quando a escola entrava, e acendia no videogame. Diante da pergunta direta sobre tristeza, disse “não sei... normal”, com a expressão dizendo menos que isso; registro a distância entre o relatado e o observado. A mãe relata irritabilidade crescente há meses e abandono progressivo do futebol, que ele confirmou a sós com um dado a mais: “os meninos não me chamam”. Sobre os colegas: nomeou “um monte” de amigos em aberto; chamaria dois para um aniversário; “esse ano ninguém ainda” o chamou. O relatório da escola descreve isolamento no recreio e conflitos quando contrariado. A assimetria entre a lista aberta e os convites reais entra no exame como dado. Sem atitude alucinatória; à pergunta aberta e tardia, negou com naturalidade. Vígil, alerta e estável. Impressão: um circuito que os domínios mostram cada um por um ângulo: a sustentação que já era curta aos quatro aparece agora como inquietação contínua, instrução que se perde e tarefas que não terminam, com prejuízo que aos quatro não havia; sobre esse chão de fracasso repetido ergueu-se uma autodesvalorização global, acompanhada de sinais afetivos consistentes entre fontes; soma-se ideação de morte passiva, sem plano, intenção, tentativa ou autolesão, reativa aos momentos de fracasso e desconhecida dos adultos até hoje. A leitura que o conjunto sugere: um perfil atencional de longa data cujo custo acumulado é compatível com sintomas depressivos em instalação, com o autoconceito como dobradiça. O relato preservado do videogame, a narrativa coesa e a busca ativa de ajuda pesam como recursos. Exame colhido às 16h após dia inteiro de aula; ler a inquietação e o rendimento com essa ressalva. A próxima consulta precisa: reavaliar a ideação (agora com a mãe ciente, conforme combinado com Bento), aprofundar a linha do humor com a escola como terceira fonte, e revisitar a discrepância entre relato e observado no afeto.");

// S67 · Súmula B + anotação
s = novo({ bloco: BEN });
titulo(s, "A súmula e a anotação: o organizador aqui é um circuito, e nenhum elo depende de uma fonte só.");
filete(s, { y: 2.1 });
const circ = ["SUSTENTAÇÃO", "FRACASSO", "AUTOCONCEITO", "HUMOR", "IDEAÇÃO"];
circ.forEach((c, i) => {
  const x = 0.6 + i * 2.52;
  card(s, x, 2.5, 2.32, 0.85, { fill: i >= 3 ? PP.lavanda : PP.branco, borda: i >= 3 ? PP.coral : PP.roxoMedio, bw: i >= 3 ? 1.5 : 0.75 });
  txt(s, c, { x, y: 2.75, w: 2.32, h: 0.4, align: "center", bold: true, fontSize: 11.5, color: i >= 3 ? PP.coralTexto : PP.roxoProfundo });
  if (i < 4) s.addShape(ST.line, { x: x + 2.34, y: 2.92, w: 0.17, h: 0, line: { color: PP.roxoMedio, width: 2, endArrowType: "triangle" } });
});
bullets(s, [
  "Quando os achados se ordenam causalmente entre si, a hierarquia da síntese pode adotar essa ordem: o retrato ganha direção.",
  "O risco com tratamento de regra dura: minucioso no positivo (passiva, reativa, sem plano, intenção, meios, tentativa), a novidade nomeada (“desconhecida dos adultos”), a ponte de conduta combinada COM a criança.",
  "O compromisso subiu um degrau (“compatível com sintomas depressivos em instalação”) porque a convergência de fontes autoriza mais; e ainda assim nenhuma sigla fechou, porque síntese não é hipótese.",
], { y: 3.75, gap: 0.95, fontSize: 13 });
card(s, 0.6, 6.35, 12.1, 0.6, { fill: PP.lavandaClara });
txt(s, "Os dois exames lado a lado são o livro em miniatura: a mesma criança, a régua que andou, os domínios que trocaram de peso.", { x: 0.95, y: 6.46, w: 11.5, h: 0.45, fontSize: 12, italic: true });
fonteRodape(s, LIVRO + "Parte IV, Caso B (súmula completa nas notas e no roteiro)");
s.addNotes("Falar da fala textual como espécime (“sou burro mesmo, todo mundo termina e eu não” carrega a globalidade e a comparação com pares que nenhuma paráfrase carregaria), do falso concretismo evitado por escrito (a súmula registra que as respostas concretas NÃO são achado), e da linha dos quatro anos entrando de propósito: o prontuário longitudinal é o luxo da psiquiatria infantil, e se escreve bem hoje para o colega que lerá daqui a cinco anos.");

// ============================================================================
// O REGISTRO (Parte V) · S68 a S70
// ============================================================================
const REG = "REGISTRO";

// S68 · Dois formatos
s = novo({ bloco: REG });
titulo(s, "A mesma observação tem duas saídas: a súmula diz o quê com parâmetro; o narrativo mostra o como com a cena.");
filete(s, { y: 2.1 });
card(s, 0.6, 2.45, 5.9, 2.6, { fill: PP.branco, borda: PP.roxoMedio, bw: 0.75 });
txt(s, "SÚMULA (lista, 3ª pessoa)", { x: 0.9, y: 2.65, w: 5.3, h: 0.4, bold: true, fontSize: 13.5 });
txt(s, "serve à completude (o buraco fica visível), à leitura rápida (o plantão acha o risco em cinco segundos) e à comparabilidade entre consultas.\n\n“Atenção: sustentada por 3 a 4 minutos em atividade de interesse; abandona ao primeiro obstáculo sem retornar.”", { x: 0.9, y: 3.08, w: 5.3, h: 1.9, fontSize: 11.5, lineSpacingMultiple: 1.1 });
card(s, 6.8, 2.45, 5.9, 2.6, { fill: PP.branco, borda: PP.roxoMedio, bw: 0.75 });
txt(s, "NARRATIVO (prosa, 1ª pessoa)", { x: 7.1, y: 2.65, w: 5.3, h: 0.4, bold: true, fontSize: 13.5 });
txt(s, "mostra a criança, sustenta a síntese e carrega o valor longitudinal e médico-legal.\n\n“Sustentou cada brincadeira por três, quatro minutos, mesmo as que o entusiasmavam; diante da primeira peça que não encaixou, largou a torre e mudou de canto, e não voltou a ela.”", { x: 7.1, y: 3.08, w: 5.3, h: 1.9, fontSize: 11.5, lineSpacingMultiple: 1.1 });
card(s, 0.6, 5.35, 12.1, 1.0, { fill: PP.lavanda });
txt(s, "Nenhum dos dois é “mais completo”: são lentes. A escolha é a pergunta “quem vai ler isto, e para quê?” respondida antes de escrever.", { x: 0.95, y: 5.58, w: 11.5, h: 0.65, fontSize: 14, bold: true });
fonteRodape(s, LIVRO + "Parte V");
s.addNotes("Na prática convivem: a consulta de seguimento vive de súmula com impressão breve; a avaliação inicial, o caso complexo e o achado novo pedem o narrativo, que pode vir com a súmula como índice (como os Bentos mostraram).");

// S69 · Cinco regras
s = novo({ bloco: REG });
titulo(s, "Cinco disciplinas atravessam os dois formatos: fonte, aspas, contra-quê, risco nos dois sentidos, condições da amostra.");
filete(s, { y: 2.1 });
const regras = [
  ["A FONTE EM CADA DADO", "observou-se; a criança disse; segundo a mãe; conforme o relatório. A divergência entre fontes registra-se como achado."],
  ["A FALA TEXTUAL ENTRE ASPAS", "a fala espontânea da criança sobre si é espécime: colhe-se intacta."],
  ["O CONTRA-QUÊ DE CADA CAMPO", "“orientada quanto a escola, série e turno”, nunca “orientada” solta. Achado sem parâmetro não se compara com o de amanhã."],
  ["O RISCO NOS DOIS SENTIDOS", "presença minuciosa, ausência explícita. Campo vazio não é risco descartado."],
  ["AS CONDIÇÕES DA AMOSTRA", "a hora, o sono, o dia de escola, quem estava na sala. O fotograma sem legenda mente por omissão."],
];
regras.forEach((p, i) => {
  const y = 2.45 + i * 0.86;
  card(s, 0.6, y, 12.1, 0.74, { fill: PP.branco, borda: PP.roxoMedio, bw: 0.75 });
  txt(s, p[0], { x: 0.85, y: y + 0.1, w: 3.6, h: 0.56, bold: true, fontSize: 11, color: PP.coralTexto });
  txt(s, p[1], { x: 4.55, y: y + 0.1, w: 8.0, h: 0.58, fontSize: 11.5, lineSpacingMultiple: 1.02 });
});
fonteRodape(s, LIVRO + "Parte V");
s.addNotes("A regra que amarra o ensino inteiro: nenhum ensino termina em “o que perguntar” sem terminar em “o que escrever”. O teste final de cada slide desta aula foi: ele termina numa frase que o residente escreveria?");

// S70 · Checklist
s = novo({ bloco: REG });
titulo(s, "Onze perguntas fecham o exame: o checklist que transforma o residente no seu próprio primeiro crítico.");
filete(s, { y: 2.05 });
const chk = [
  "1 · cada achado passou pela norma da idade e pela pergunta “que tipo de desvio”?",
  "2 · o que é da idade ficou fora da impressão?",
  "3 · cada dado tem fonte, e as divergências viraram dado?",
  "4 · a fala da criança sobre si está textual, entre aspas?",
  "5 · cada campo tem seu contra-quê e seu parâmetro?",
  "6 · o risco está documentado, na presença ou na ausência?",
  "7 · as condições da amostra estão na introdução?",
  "8 · a díade foi lida (e, no escolar, os pares e a escola)?",
  "9 · a impressão tem organizador defensável, ou é lista que se embaralha?",
  "10 · o compromisso de cada frase está calibrado ao lastro?",
  "11 · a última frase aponta o que a próxima consulta precisa observar?",
];
chk.forEach((p, i) => {
  const x = 0.6 + (i % 2) * 6.2, y = 2.4 + Math.floor(i / 2) * 0.74;
  card(s, x, y, 5.95, 0.63, { fill: PP.branco, borda: PP.roxoMedio, bw: 0.5 });
  txt(s, p, { x: x + 0.15, y: y + 0.08, w: 5.65, h: 0.5, fontSize: 10.5, lineSpacingMultiple: 1.0 });
});
card(s, 6.8, 6.1, 5.9, 0.63, { fill: PP.lavanda });
txt(s, "O exame que responde sim a todas está pronto.", { x: 6.95, y: 6.22, w: 5.6, h: 0.45, fontSize: 11.5, bold: true });
fonteRodape(s, LIVRO + "Parte V, checklist de autoavaliação");
s.addNotes("Entregar junto com os primeiros exames que o residente redigir, e usar como crivo de correção.");

// ============================================================================
// FECHO · S71 a S72
// ============================================================================

// S71 · Espelho
s = novo({ bloco: "FECHO" });
titulo(s, "Na criança, o exame psíquico é o que se observa, não o que se ouve; e observar é interpretar sob disciplina.");
filete(s, { y: 2.05 });
const trad = [
  ["o discurso", "o brincar"], ["o indivíduo", "a díade"], ["a norma fixa", "a régua da idade"],
];
trad.forEach((p, i) => {
  const y = 2.5 + i * 1.05;
  card(s, 0.6, y, 4.6, 0.9, { fill: PP.lavandaClara });
  txt(s, p[0], { x: 0.85, y: y + 0.24, w: 4.1, h: 0.5, fontSize: 15, align: "center" });
  s.addShape(ST.line, { x: 5.35, y: y + 0.45, w: 1.0, h: 0, line: { color: PP.coral, width: 2.5, endArrowType: "triangle" } });
  card(s, 6.5, y, 4.6, 0.9, { fill: PP.branco, borda: PP.coral, bw: 1.25 });
  txt(s, p[1], { x: 6.75, y: y + 0.24, w: 4.1, h: 0.5, fontSize: 15, bold: true, align: "center", color: PP.coralTexto });
});
card(s, 0.6, 5.85, 12.1, 0.9, { fill: PP.lavanda });
txt(s, "O mapa não mudou: vocês acabaram de fazer o exame inteiro que já sabiam, em outra língua. O resto (os domínios, os formatos, os Bentos) foi a disciplina, mostrada em funcionamento.", { x: 0.95, y: 6.03, w: 11.5, h: 0.65, fontSize: 13.5, bold: true });
fonteRodape(s, LIVRO + "fecho");
s.addNotes("Espelho da abertura: retomar o S2 de memória. A frase-título é a que o livro deixa; vale fechar a fala com ela.");

// S72 · Fronteira + encerramento
s = novo({ dark: true, bloco: "FECHO" });
titulo(s, "Aos 12 o corpo muda e o exame muda de novo: a sós vira a regra e a confidencialidade vira contrato; a próxima aula assume.", { dark: true });
filete(s, { y: 2.15, dark: true });
txt(s, "FONTE DA AULA", { x: 0.7, y: 2.7, w: 5, h: 0.4, bold: true, fontSize: 13, charSpacing: 2, color: PP.lavanda });
txt(s, "O Exame Psíquico da Criança, livro do professor (edição consolidada, com os quatro apêndices).\nFio guia do curso: Cheniaux, Manual de Psicopatologia.", { x: 0.7, y: 3.15, w: 11.8, h: 1.1, fontSize: 15, color: PP.offWhite, lineSpacingMultiple: 1.2 });
txt(s, "APROFUNDAMENTO", { x: 0.7, y: 4.5, w: 5, h: 0.4, bold: true, fontSize: 13, charSpacing: 2, color: PP.lavanda });
txt(s, "Apêndices (a seguir, numeração contínua): 1 o lactente · 2 a coreografia da consulta · 3 a anatomia do episódio agressivo · 4 o mapa rápido dos domínios. Roteiro de estudo completo na plataforma.", { x: 0.7, y: 4.95, w: 11.8, h: 1.0, fontSize: 14, color: PP.offWhite, lineSpacingMultiple: 1.2 });
txt(s, "Dr. Diego Alves Rosa · Psiquiatria Prática", { x: 0.7, y: 6.3, w: 9, h: 0.5, fontSize: 14, color: PP.dourado });
s.addNotes("Agradecer e apontar os apêndices. Perguntas sobre lactente, montagem da consulta ou criança que bate: saltar direto para o apêndice correspondente.");

// ============================================================================
// APÊNDICES (numeração contínua) · S73 a S81
// ============================================================================
const AP = "APÊNDICE";

// S73 · Ap.1 alcance
s = novo({ bloco: AP + " 1 · O LACTENTE" });
titulo(s, "Honestidade de escopo: as camadas 0 a 5 desta aula operam do pré-escolar em diante; o lactente tem semiologia própria.");
filete(s, { y: 2.1 });
bullets(s, [
  "O exame do lactente (0 a 2 anos): os estados do bebê e suas transições, a regulação fisiológica (sono, alimentação, choro) como primeiro texto psíquico, a interação face a face e a protoconversa, a díade em escala de segundos.",
  "Esta aula toca essa semiologia onde ela desemboca no pré-escolar (corregulação, apontar, pêndulo exploração e retorno), mas não a desenvolve: ela pede material próprio, e um remendo a serviria mal.",
], { y: 2.5, gap: 1.3, fontSize: 14.5 });
fonteRodape(s, LIVRO + "Apêndice 1");
s.addNotes("Dizer na porta, como o livro faz: o leitor merece saber o alcance do instrumento que recebeu.");

// S74 · Ap.1 o que já funciona
s = novo({ bloco: AP + " 1 · O LACTENTE" });
titulo(s, "Diante do lactente, boa parte da lente já funciona: aparência, regulação de estado e a díade, que é quase o exame inteiro.");
filete(s, { y: 2.1 });
bullets(s, [
  "A aparência e os sinais de cuidado leem-se desde o primeiro dia de vida.",
  "A regulação de estado e a reatividade sensorial são exatamente o exame do bebê.",
  "A sintonia, a contingência, a corregulação e a reparação observam-se aos seis meses tanto quanto aos quatro anos, apenas em ciclos mais curtos.",
  "O que ainda não existe (o brincar simbólico, a linguagem, o eu que se nomeia) não se registra como ausente: registra-se como ainda não esperado. É a terceira tradução aplicada ao seu limite inferior.",
], { y: 2.5, gap: 1.0, fontSize: 14.5 });
fonteRodape(s, LIVRO + "Apêndice 1");
s.addNotes("A última linha é a que vale levar: “ainda não esperado” em vez de “ausente” muda o prontuário do lactente inteiro.");

// S75 · Ap.2 abertura
s = novo({ bloco: AP + " 2 · COREOGRAFIA" });
titulo(s, "A coreografia organiza o que se propõe, não o que se observa: a consulta não é um roteiro de estações.");
filete(s, { y: 2.1 });
card(s, 0.6, 2.5, 12.1, 1.9, { fill: PP.branco, borda: PP.roxoMedio, bw: 0.75 });
txt(s, "Os domínios chegam misturados o tempo todo: o afeto atravessa a frustração, a díade atravessa a despedida, a linguagem atravessa tudo. O exame é a disciplina de, depois, arquivar cada coisa vista no campo certo. O que a coreografia ordena é só o que o examinador PROPÕE, e quando; o que ele OBSERVA não tem hora.", { x: 0.95, y: 2.75, w: 11.4, h: 1.5, fontSize: 14, lineSpacingMultiple: 1.18 });
card(s, 0.6, 4.7, 12.1, 1.0, { fill: PP.lavanda });
txt(s, "Quem transforma esta página num roteiro de estações perdeu o espírito; quem a usa como ordem de propostas ganhou uma consulta que rende.", { x: 0.95, y: 4.95, w: 11.5, h: 0.65, fontSize: 14, bold: true });
fonteRodape(s, LIVRO + "Apêndice 2");
s.addNotes("Prevenir o mal-entendido antes de mostrar a ordem: é uma ordem de propostas, não uma sequência rígida.");

// S76 · Ap.2 primeira metade
s = novo({ bloco: AP + " 2 · COREOGRAFIA" });
titulo(s, "A abertura pertence à observação livre; o brincar livre antecede o dirigido; a frustração vai para o meio.");
filete(s, { y: 2.1 });
bullets(s, [
  "A observação começa antes da sala: o trajeto da sala de espera já entregou a entrada, quem conduz quem, o explorar e orbitar. Os primeiros dez, quinze minutos deliberadamente não propõem nada: conversa-se com o cuidador enquanto se lê a criança pelo canto do olho. O que ela faz sem proposta é um dado que a primeira proposta apaga para sempre.",
  "Só depois de ver o que a criança faz sozinha se entra na cena, pela porta que ela abriu, como personagem convidado. A proposta testa a flexibilidade; a entrada testa o uso do outro; a ordem protege os dois dados.",
  "A pequena frustração deliberada precisa de aliança para ser tolerada e de minutos pela frente para a curva de retorno inteira. Plantada aos cinco minutos, mede o estranhamento, não a regulação.",
], { y: 2.5, gap: 1.25, fontSize: 13.5 });
fonteRodape(s, LIVRO + "Apêndice 2");
s.addNotes("A dupla tarefa que define o examinador infantil: ouvir um e ler o outro ao mesmo tempo.");

// S77 · Ap.2 segunda metade
s = novo({ bloco: AP + " 2 · COREOGRAFIA" });
titulo(s, "As tarefas estruturadas fecham; o momento a sós mora na segunda metade; a despedida é a última prova.");
filete(s, { y: 2.1 });
bullets(s, [
  "As tarefas estruturadas entram no último terço, porque cognição se conclui por eliminação: o desempenho colhido antes de conhecer a regulação e a linguagem atribui à cognição o que pertence aos outros.",
  "O momento a sós: depois do aquecimento, antes do fechamento, proposto como rotina (“a parte em que converso um pouquinho só com ele, como faço com todo mundo”). Nunca nos últimos cinco minutos, com a mão na maçaneta: se algo aparecer, precisa haver tempo para combinar com a criança como aquilo chega ao cuidador ainda hoje.",
  "O anúncio do fim é a mais previsível das frustrações, e o que a criança faz com ela (protesto, negociação, colapso, saída fluida) é o último dado, colhido quando o examinador desavisado já guardou o caderno.",
], { y: 2.5, gap: 1.25, fontSize: 13.5 });
fonteRodape(s, LIVRO + "Apêndice 2");
s.addNotes("A proposição como rotina normaliza para a criança e para o cuidador o que uma proposição solene transformaria em alarme.");

// S78 · Ap.3 cinco tempos
s = novo({ bloco: AP + " 3 · EPISÓDIO AGRESSIVO" });
titulo(s, "O episódio agressivo se decompõe em cinco tempos observáveis: antecedente, escalada, forma, interrupção e o depois.");
filete(s, { y: 2.1 });
const tempos = [
  ["ANTECEDENTE", "o que aconteceu imediatamente antes, presenciado ou relatado com fonte"],
  ["ESCALADA", "houve rampa legível ou o ato saltou do zero? Dos dados mais informativos"],
  ["FORMA", "dirigido (a quem, a quê) ou difuso; breve ou sustentado; com força graduada ou sem freio"],
  ["INTERRUPÇÃO", "cessou sozinho, com mudança da situação ou só por contenção; em quanto tempo"],
  ["O DEPOIS", "choro e reparação, esconder-se, indiferença, abatimento, alívio: diz tanto quanto o episódio"],
];
tempos.forEach((p, i) => {
  const y = 2.45 + i * 0.86;
  card(s, 0.6, y, 12.1, 0.74, { fill: PP.branco, borda: PP.roxoMedio, bw: 0.75 });
  txt(s, p[0], { x: 0.85, y: y + 0.12, w: 2.5, h: 0.5, bold: true, fontSize: 11.5, color: PP.coralTexto });
  txt(s, p[1], { x: 3.45, y: y + 0.12, w: 9.1, h: 0.55, fontSize: 11.5, lineSpacingMultiple: 1.02 });
});
fonteRodape(s, LIVRO + "Apêndice 3 (complemento ao Domínio 12)");
s.addNotes("A criança que chega “porque bate” é das apresentações mais frequentes. O que segue é anatomia observável; a leitura do que a agressão significa pertence à formulação, que vem depois e se alimenta exatamente desta descrição.");

// S79 · Ap.3 padrão + par
s = novo({ bloco: AP + " 3 · EPISÓDIO AGRESSIVO" });
titulo(s, "O padrão entre episódios é dado por direito próprio: o mapa dos contextos descreve três crianças diferentes.");
filete(s, { y: 2.1 });
bullets(s, [
  "A frequência, e sobretudo onde a agressão ocorre e onde NUNCA ocorre: a que só existe na escola, a que só existe em casa e a que atravessa todos os cenários são três crianças diferentes.",
  "Quando o episódio é relatado, as mesmas cinco perguntas se fazem às fontes; a divergência (a escola descreve rampa, a mãe descreve o salto) registra-se como dado.",
], { y: 2.5, gap: 1.1, fontSize: 14 });
parRegistro(s, "Agressivo, sem controle.",
  "Segundo a mãe, diante da negativa do videogame: tensão crescente por cerca de um minuto, verbalização de raiva, depois arremesso do controle contra a parede; cessou sozinho em instantes; procurou a mãe chorando e pediu desculpa. Na escola, conforme relatório, episódios sem rampa descrita, dirigidos a um mesmo colega.", { y: 4.85, h: 1.95 });
fonteRodape(s, LIVRO + "Apêndice 3");
s.addNotes("O critério de generalização da Parte I trabalha aqui com força total.");

// S80 · Ap.4 mapa 1-7
s = novo({ bloco: AP + " 4 · MAPA RÁPIDO" });
titulo(s, "O mapa rápido é o índice de trabalho dos domínios, para a véspera de aula e a mão do residente (1 a 7).");
filete(s, { y: 2.05 });
const mapa1 = [
  [{ text: "DOMÍNIO", options: { bold: true, color: PP.offWhite, fill: { color: PP.roxoProfundo } } },
   { text: "OBSERVAR", options: { bold: true, color: PP.offWhite, fill: { color: PP.roxoProfundo } } },
   { text: "TROPEÇO", options: { bold: true, color: PP.offWhite, fill: { color: PP.roxoProfundo } } }],
  ["1 Aparência", "nutrição, idade aparente, dismorfias, higiene, lesões (topografia neutra)", "ler no descuido a criança, quando ele mede o sistema de cuidado"],
  ["2 Atitude", "entrada, relação com o estranho, transições; os olhos durante a imobilidade", "elogiar a criança “fácil demais”"],
  ["3 Psicomotricidade", "quantidade versus direção; coordenação; estereotipias e tiques", "chamar de hiperatividade a vitalidade da idade"],
  ["4 Autorregulação", "alerta tranquilo, reatividade sensorial, sustentação no interesse, curva da frustração", "ler a distratibilidade normativa como déficit"],
  ["5 Afeto", "qualidade, amplitude, mobilidade, congruência; a cor do afeto; consolabilidade", "“afeto preservado” por um sorriso"],
  ["6 Díade", "sintonia, contingência, corregulação, reparação; pêndulo; no escolar, reciprocidade", "tirar o cuidador da sala para examinar a criança “limpa”"],
  ["7 Brincar", "forma (nível, sequência, flexibilidade) e conteúdo (temas, repetição sem desfecho)", "interrogar a criança que brinca (a pergunta certa é do boneco)"],
];
s.addTable(mapa1.map((r, ri) => r.map((c, ci) => {
  if (typeof c === "string") return { text: c, options: { fill: { color: ri % 2 ? PP.branco : PP.lavandaClara }, color: PP.roxoProfundo, bold: ci === 0 } };
  return c;
})), { x: 0.6, y: 2.35, w: 12.1, fontFace: SANS, fontSize: 10.5, valign: "middle", border: { type: "solid", color: PP.roxoMedio, pt: 0.5 }, rowH: 0.55, colW: [2.0, 5.4, 4.7] });
fonteRodape(s, LIVRO + "Apêndice 4");
s.addNotes("O mapa não substitui os capítulos: é o índice de trabalho deles. A terceira coluna de cada linha do livro (o par de registro) está nos slides dos domínios.");

// S81 · Ap.4 mapa 8-13
s = novo({ bloco: AP + " 4 · MAPA RÁPIDO" });
titulo(s, "O mapa rápido, segunda metade (8 a 13): da linguagem aos domínios de completude.");
filete(s, { y: 2.05 });
const mapa2 = [
  [{ text: "DOMÍNIO", options: { bold: true, color: PP.offWhite, fill: { color: PP.roxoProfundo } } },
   { text: "OBSERVAR", options: { bold: true, color: PP.offWhite, fill: { color: PP.roxoProfundo } } },
   { text: "TROPEÇO", options: { bold: true, color: PP.offWhite, fill: { color: PP.roxoProfundo } } }],
  ["8 Linguagem", "função antes da estrutura; compreensão sem pistas; prosódia; intenção da ecolalia", "dar nota alta ao vocabulário e perder a pragmática deserta"],
  ["9 Cognição", "no pré-escolar, causa e efeito no brincar; no escolar, passos, âncoras, dígitos com manual", "o falso concretismo (testar abstração em quem ela não chegou)"],
  ["10 Sensopercepção", "atitude alucinatória (vale mais que a resposta); pergunta aberta e tardia; o cortejo", "a pergunta que planta (“você vê coisas?”)"],
  ["11 Consciência do eu", "os marcos do eu pela idade; a fala espontânea sobre si, textual", "parafrasear (“baixa autoestima”) o que devia ir entre aspas"],
  ["12 Juízo, insight, risco", "teste de realidade no brincar; noção do motivo; risco a sós, direto, presença E ausência", "o campo de risco em branco por medo de perguntar"],
  ["13 Completude", "vígil e estável; orientação com contra-quê; memória ecológica; autonomia da idade", "“orientado” sem referência: campo vazio fingindo estar cheio"],
];
s.addTable(mapa2.map((r, ri) => r.map((c, ci) => {
  if (typeof c === "string") return { text: c, options: { fill: { color: ri % 2 ? PP.branco : PP.lavandaClara }, color: PP.roxoProfundo, bold: ci === 0 } };
  return c;
})), { x: 0.6, y: 2.35, w: 12.1, fontFace: SANS, fontSize: 10.5, valign: "middle", border: { type: "solid", color: PP.roxoMedio, pt: 0.5 }, rowH: 0.58, colW: [2.2, 5.4, 4.5] });
fonteRodape(s, LIVRO + "Apêndice 4 · fim do deck");
s.addNotes("Fim. O checklist de autoavaliação (S70) e este mapa são os dois materiais de mão do residente.");

// ---------------------------------------------------------------------------
pres.writeFile({ fileName: __dirname + "/AULA-OFICIAL_Exame-psiquico-crianca-0a5-6a12_PsiquiatriaPratica.pptx" })
  .then(() => console.log("OK: deck gerado com", nSlide, "slides"));
