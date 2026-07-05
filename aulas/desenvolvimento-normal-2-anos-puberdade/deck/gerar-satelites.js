// ============================================================================
// Satélites da aula "Desenvolvimento normal: dos 2 anos ao início da puberdade"
// 4 módulos de aprofundamento, revisados por dois crivos (R1 iniciante e R3
// expert). Tokens Psiquiatria Prática. Gera Satelites_...pptx
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
const W = 13.33, H = 7.5, SERIF = "Georgia", SANS = "Calibri";
let n = 0;

function novo({ dark = false, chip = null } = {}) {
  n++;
  const s = pres.addSlide();
  s.background = { color: dark ? PP.roxoProfundo : PP.offWhite };
  if (chip) s.addText(chip, {
    shape: ST.roundRect, rectRadius: 0.08, x: W - 3.6, y: 0.28, w: 3.05, h: 0.34,
    fill: { color: PP.dourado }, color: PP.roxoProfundo, fontFace: SANS,
    fontSize: 10.5, bold: true, align: "center", valign: "middle",
  });
  s.addText(String(n), { x: W - 0.7, y: H - 0.42, w: 0.45, h: 0.3, fontFace: SANS, fontSize: 10, color: dark ? PP.lavanda : PP.roxoMedio, align: "right" });
  return s;
}
function titulo(s, t, { dark = false, size = null, y = 0.42, w = 9.55 } = {}) {
  const fs = size || (t.length > 118 ? 19 : t.length > 85 ? 21 : 23);
  s.addText(t, { x: 0.6, y, w, h: 1.55, fontFace: SERIF, fontSize: fs, bold: true, color: dark ? PP.offWhite : PP.roxoProfundo, valign: "top", lineSpacingMultiple: 1.04 });
}
function filete(s, { y = 2.0, dark = false } = {}) {
  s.addShape(ST.rect, { x: 0.62, y, w: 1.5, h: 0.045, fill: { color: dark ? PP.dourado : PP.coral } });
}
function rodape(s, t, dark = false) {
  s.addText(t, { x: 0.6, y: H - 0.46, w: 11.5, h: 0.34, fontFace: SANS, fontSize: 11, color: dark ? PP.lavanda : PP.roxoMedio, italic: true });
}
function card(s, x, y, w, h, { fill = PP.branco, borda = null, bw = 1 } = {}) {
  s.addShape(ST.roundRect, { x, y, w, h, rectRadius: 0.07, fill: { color: fill }, line: borda ? { color: borda, width: bw } : { color: fill, width: 0 } });
}
function txt(s, t, o) { s.addText(t, Object.assign({ fontFace: SANS, fontSize: 14, color: PP.roxoProfundo, valign: "top" }, o)); }

// Capa de set (divisor escuro com contexto e ponte com a tese)
function capaSet(s, letra, nome, ponte, contexto, notas) {
  s.addText(`SATÉLITE ${letra}`, { x: 0.62, y: 1.0, w: 6, h: 0.5, fontFace: SANS, fontSize: 15, bold: true, charSpacing: 3, color: PP.dourado });
  s.addText(nome, { x: 0.62, y: 1.55, w: 12.0, h: 1.6, fontFace: SERIF, fontSize: 34, bold: true, color: PP.offWhite, lineSpacingMultiple: 1.05 });
  s.addShape(ST.rect, { x: 0.64, y: 3.25, w: 1.7, h: 0.05, fill: { color: PP.dourado } });
  s.addText([{ text: "Onde isso se liga à tese do volante: ", options: { bold: true, color: PP.dourado } }, { text: ponte, options: {} }],
    { x: 0.62, y: 3.55, w: 12.0, h: 1.0, fontFace: SANS, fontSize: 15.5, color: PP.offWhite, lineSpacingMultiple: 1.2, valign: "top" });
  s.addText(contexto, { x: 0.62, y: 4.75, w: 12.0, h: 1.7, fontFace: SANS, fontSize: 13.5, italic: true, color: PP.lavanda, lineSpacingMultiple: 1.25, valign: "top" });
  if (notas) s.addNotes(notas);
}

// ============================================================================
// CAPA GERAL
// ============================================================================
let s = novo({ dark: true });
s.addText("Slides satélites", { x: 0.7, y: 2.1, w: 11.5, h: 1.0, fontFace: SERIF, fontSize: 40, bold: true, color: PP.offWhite });
s.addText("Desenvolvimento normal: dos 2 anos ao início da puberdade", { x: 0.7, y: 3.1, w: 11.5, h: 0.6, fontFace: SERIF, fontSize: 21, color: PP.lavanda });
s.addShape(ST.rect, { x: 0.72, y: 3.95, w: 1.7, h: 0.05, fill: { color: PP.dourado } });
s.addText("Módulos de aprofundamento. Não fazem parte da sequência principal: entram se a turma pedir, ou circulam depois como material de estudo.",
  { x: 0.7, y: 4.2, w: 11.5, h: 0.8, fontFace: SANS, fontSize: 15, italic: true, color: PP.dourado });
const mapa = [["A", "Anatomia de uma birra"], ["B", "As duas curvas do TDAH"], ["C", "Falsa crença quadro a quadro"], ["D", "Apêndice anti-pergunta"]];
mapa.forEach((m, i) => {
  const x = 0.7 + i * 3.05;
  card(s, x, 5.35, 2.8, 1.1, { fill: PP.roxoMedio });
  txt(s, m[0], { x: x + 0.15, y: 5.5, w: 0.6, h: 0.5, fontFace: SERIF, fontSize: 22, bold: true, color: PP.dourado });
  txt(s, m[1], { x: x + 0.7, y: 5.52, w: 2.0, h: 0.85, fontSize: 12.5, color: PP.offWhite });
});
s.addNotes("Deck satélite revisado por dois crivos: residente iniciante (clareza, jargão, exemplos) e residente avançado (precisão, ressalvas, quantificadores). As ressalvas de fala estão nas notas de cada slide.");

// ============================================================================
// SET A — ANATOMIA DE UMA BIRRA (8 slides)
// ============================================================================
const CA = "SATÉLITE A · BIRRA";

s = novo({ dark: true });
capaSet(s, "A", "Anatomia de uma birra",
  "aos 2-3 anos o freio mora no adulto; ler uma birra é ler como está a regulação externa. É também a base para entender, no Ato 2, a oposição que aprende a funcionar.",
  "Ferramenta deste módulo: o esquema A-B-C da análise do comportamento (Antecedente, o que veio antes; Comportamento; Consequência, o que o comportamento produziu no ambiente). Atenção ao termo: consequência aqui NÃO é castigo. E o esquema aplicado a um episódio único gera hipótese, não diagnóstico.",
  "Crivo incorporado: definir A-B-C antes de usar (R1); deixar claro que um episódio gera hipótese, não análise funcional completa (R3).");

s = novo({ chip: CA });
titulo(s, "Uma birra não é um evento, é uma sequência: e cada elo é um lugar diferente de intervir.");
filete(s);
const abc = [
  ["A · ANTECEDENTE", "o que veio imediatamente antes", "ex.: mãe diz “não” ao doce", "intervir aqui = prevenção\n(avisos, escolhas limitadas)"],
  ["B · COMPORTAMENTO", "o que a criança faz, observável", "ex.: joga-se no chão, grita", "intervir aqui = segurança\n(retirar perigos, presença)"],
  ["C · CONSEQUÊNCIA", "o que o comportamento produziu", "ex.: mãe cede o doce", "intervir aqui = consistência\n(o elo que ensina)"],
];
abc.forEach((b, i) => {
  const x = 0.7 + i * 4.1;
  card(s, x, 2.55, 3.7, 3.3, { fill: PP.branco, borda: PP.roxoMedio, bw: 0.75 });
  s.addShape(ST.rect, { x, y: 2.55, w: 3.7, h: 0.08, fill: { color: PP.coral } });
  txt(s, b[0], { x: x + 0.2, y: 2.75, w: 3.3, h: 0.45, bold: true, fontSize: 15, color: PP.coralTexto });
  txt(s, b[1], { x: x + 0.2, y: 3.25, w: 3.3, h: 0.6, fontSize: 13.5 });
  txt(s, b[2], { x: x + 0.2, y: 3.9, w: 3.3, h: 0.55, fontSize: 13, italic: true, color: PP.roxoMedio });
  txt(s, b[3], { x: x + 0.2, y: 4.6, w: 3.3, h: 1.0, fontSize: 13 });
});
card(s, 0.7, 6.1, 11.9, 0.75, { fill: PP.lavanda });
txt(s, "Consequência = o que o comportamento produziu no ambiente. NÃO é sinônimo de castigo.", { x: 1.0, y: 6.28, w: 11.3, h: 0.5, fontSize: 14, bold: true });
s.addNotes("Fala: 'isto é um esquema de leitura, não um diagnóstico do episódio'. Análise descritiva de verdade exige padrão em várias ocorrências.");

s = novo({ chip: CA });
titulo(s, "O antecedente tem dois níveis: o disparo do momento e o terreno que baixa o limiar.");
filete(s);
card(s, 0.7, 2.5, 5.75, 3.5, { fill: PP.branco, borda: PP.roxoMedio, bw: 0.75 });
txt(s, "DISPAROS (o gatilho do momento)", { x: 1.0, y: 2.7, w: 5.2, h: 0.45, bold: true, fontSize: 14.5, color: PP.coralTexto });
txt(s, "• Transição: interromper algo bom (“hora de sair da casa da avó”)\n• Negativa: o “não” ao pedido (doce no mercado)\n• Atenção do cuidador desviada: mãe no telefone, irmão no colo\n• Demanda acima da capacidade: tarefa que a mão ou a fala ainda não alcança", { x: 1.0, y: 3.2, w: 5.2, h: 2.6, fontSize: 13.5, lineSpacingMultiple: 1.2 });
card(s, 6.85, 2.5, 5.75, 3.5, { fill: PP.lavandaClara });
txt(s, "TERRENO (baixa o limiar para qualquer disparo)", { x: 7.15, y: 2.7, w: 5.2, h: 0.45, bold: true, fontSize: 14.5, color: PP.roxoMedio });
txt(s, "• Fome e sono\n• Dor e doença começando\n• Sobrecarga sensorial (mercado, festa)\n• Linguagem aquém do que a criança quer dizer\n\nO terreno não dispara a birra: torna qualquer disparo suficiente.", { x: 7.15, y: 3.2, w: 5.2, h: 2.6, fontSize: 13.5, lineSpacingMultiple: 1.2 });
card(s, 0.7, 6.25, 11.9, 0.65, { fill: PP.lavanda });
txt(s, "Esses grupos cobrem a maioria das birras, não todas. Birra que não se encaixa não é, por si, sinal de doença.", { x: 1.0, y: 6.4, w: 11.3, h: 0.45, fontSize: 13.5, bold: true });
s.addNotes("Correção do crivo R3: fome/sono não são antecedentes discretos, são operações estabelecedoras (setting events); misturar os níveis ensina a categoria errada. R1: exemplos concretos em cada item.");

s = novo({ chip: CA });
titulo(s, "Existe um ponto em que negociar para de funcionar: antes dele, prevenção; depois, proteção e presença.");
filete(s);
s.addShape(ST.line, { x: 1.2, y: 5.7, w: 7.2, h: 0, line: { color: PP.roxoMedio, width: 1.5 } });
s.addShape(ST.line, { x: 1.2, y: 2.6, w: 0, h: 3.1, line: { color: PP.roxoMedio, width: 1.5 } });
txt(s, "intensidade (esquemática)", { x: 1.25, y: 2.45, w: 3, h: 0.3, fontSize: 10.5, color: PP.roxoMedio });
txt(s, "tempo", { x: 7.7, y: 5.8, w: 1, h: 0.3, fontSize: 10.5, color: PP.roxoMedio });
s.addShape(ST.line, { x: 1.2, y: 5.55, w: 1.6, h: -0.9, line: { color: PP.dourado, width: 4 } });
s.addShape(ST.line, { x: 2.8, y: 4.65, w: 1.2, h: -1.5, line: { color: PP.coral, width: 4 } });
s.addShape(ST.line, { x: 4.0, y: 3.15, w: 1.6, h: 0.25, line: { color: PP.coral, width: 4 } });
s.addShape(ST.line, { x: 5.6, y: 3.4, w: 2.4, h: 1.9, line: { color: PP.dourado, width: 4 } });
s.addShape(ST.ellipse, { x: 2.62, y: 4.47, w: 0.36, h: 0.36, fill: { color: PP.coral } });
txt(s, "o ponto", { x: 2.25, y: 4.95, w: 1.2, h: 0.3, fontSize: 11.5, bold: true, color: PP.coralTexto });
txt(s, "PREVENÇÃO\nfunciona aqui", { x: 1.35, y: 3.3, w: 1.5, h: 0.7, fontSize: 10.5, color: PP.roxoProfundo, align: "center" });
txt(s, "pico: intervir\nprolonga", { x: 4.1, y: 2.5, w: 1.6, h: 0.6, fontSize: 10.5, color: PP.coralTexto, align: "center" });
txt(s, "pós-pico: janela\nde acolhimento", { x: 6.1, y: 4.6, w: 1.9, h: 0.6, fontSize: 10.5, color: PP.roxoProfundo, align: "center" });
card(s, 8.7, 2.45, 3.95, 3.5, { fill: PP.branco, borda: PP.coral, bw: 1.5 });
txt(s, "COMO RECONHECER QUE O PONTO PASSOU", { x: 8.95, y: 2.65, w: 3.5, h: 0.65, bold: true, fontSize: 12.5, color: PP.coralTexto });
txt(s, "• não responde mais ao nome\n• recusa a própria coisa que pedia\n• movimento descoordenado, sem direção\n\nDEPOIS DO PONTO: retirar perigos, ficar perto, pouca fala, tom baixo. Esperar perto não é ignorar.", { x: 8.95, y: 3.35, w: 3.5, h: 2.5, fontSize: 12.5, lineSpacingMultiple: 1.15 });
rodape(s, "curva esquemática (didática); a anatomia empírica descreve raiva com pico precoce e angústia mais longa (Potegal & Davison, 2003)");
s.addNotes("Cuidado central (R3): negociar DURANTE a escalada de uma birra de função 'obter' é exatamente a consequência reforçadora. O que funciona antes é prevenção antecedente (aviso de transição, escolhas limitadas), não negociação intraepisódio. 'Ponto de não-retorno' é metáfora clínica, não construto validado.");

s = novo({ chip: CA });
titulo(s, "A maioria das birras serve a obter ou evitar; algumas são só transbordamento.");
filete(s);
const fun = [
  ["OBTER", "objeto ou atenção", "ex.: o doce; o colo que foi para o irmão", PP.branco],
  ["EVITAR", "demanda ou transição", "ex.: escovar os dentes; sair do parquinho", PP.branco],
  ["TRANSBORDAMENTO", "sem função operante clara", "ex.: fim de dia, fome + sono: o sistema só transborda", PP.lavandaClara],
];
fun.forEach((f, i) => {
  const x = 0.7 + i * 4.1;
  card(s, x, 2.6, 3.7, 2.5, { fill: f[3], borda: PP.roxoMedio, bw: 0.75 });
  txt(s, f[0], { x: x + 0.2, y: 2.8, w: 3.3, h: 0.45, bold: true, fontSize: 15, color: PP.coralTexto });
  txt(s, f[1], { x: x + 0.2, y: 3.3, w: 3.3, h: 0.5, fontSize: 14, bold: true });
  txt(s, f[2], { x: x + 0.2, y: 3.85, w: 3.3, h: 1.1, fontSize: 13, italic: true, color: PP.roxoMedio });
});
card(s, 0.7, 5.4, 11.9, 1.3, { fill: PP.lavanda });
txt(s, [
  { text: "Função não é intenção. ", options: { bold: true, color: PP.coralTexto } },
  { text: "Criança de 2 anos não planeja: o ambiente selecionou o que funcionou, por repetição. As funções podem ser múltiplas e mudar dentro do mesmo episódio (começa pelo doce, mantém-se pela atenção).", options: {} },
], { x: 1.0, y: 5.6, w: 11.3, h: 0.95, fontSize: 14 });
rodape(s, "a análise formal usa 4 classes: atenção, tangível, fuga/esquiva e sensorial/automática; obter/evitar é o resumo didático");
s.addNotes("Resolve a inconsistência apontada pelo R3 entre gatilhos de terreno (fome/sono) e o binômio obter/evitar: transbordamento é a terceira coluna. R1: 'função = o que o ambiente selecionou' desarma a leitura de manipulação consciente.");

s = novo({ chip: CA });
titulo(s, "Na cena do mercado, o reforço rodou dos DOIS lados: e é isso que arma a armadilha.");
filete(s);
card(s, 0.7, 2.35, 11.9, 0.85, { fill: PP.lavandaClara });
txt(s, "A cena (do vídeo da aula): criança de ~2 anos pede doce no caixa; mãe diz não; grito e chão; após 90 segundos, a mãe entrega o doce e o grito para.", { x: 1.0, y: 2.5, w: 11.3, h: 0.6, fontSize: 13.5, italic: true });
card(s, 0.7, 3.5, 5.75, 2.6, { fill: PP.branco, borda: PP.roxoMedio, bw: 0.75 });
txt(s, "LINHA DA CRIANÇA", { x: 1.0, y: 3.68, w: 5.2, h: 0.4, bold: true, fontSize: 13.5 });
txt(s, "A: “não” ao doce\nB: grito + chão\nC: ganhou o doce\n= reforço POSITIVO (ganhou algo)", { x: 1.0, y: 4.12, w: 5.2, h: 1.8, fontSize: 13.5, lineSpacingMultiple: 1.2 });
card(s, 6.85, 3.5, 5.75, 2.6, { fill: PP.branco, borda: PP.coral, bw: 1.5 });
txt(s, "LINHA DA MÃE", { x: 7.15, y: 3.68, w: 5.2, h: 0.4, bold: true, fontSize: 13.5, color: PP.coralTexto });
txt(s, "A: grito no mercado, plateia olhando\nB: entregou o doce\nC: o grito PAROU\n= reforço NEGATIVO (algo aversivo cessou)", { x: 7.15, y: 4.12, w: 5.2, h: 1.8, fontSize: 13.5, lineSpacingMultiple: 1.2 });
card(s, 0.7, 6.3, 11.9, 0.65, { fill: PP.lavanda });
txt(s, "Reforço negativo NÃO é punição: é alívio que fortalece o comportamento que o produziu. Os dois lados saem treinados.", { x: 1.0, y: 6.44, w: 11.3, h: 0.45, fontSize: 13.5, bold: true });
s.addNotes("Peça que faltava (os dois crivos): sem a linha da mãe, o residente sai culpando a mãe; com ela, entende a armadilha de reforçamento mútuo (Patterson). Fala: um episódio filmado gera hipótese, não estabelece função.");

s = novo({ chip: CA });
titulo(s, "A pergunta que muda a consulta: o que a birra produziu, dos dois lados?");
filete(s);
card(s, 0.7, 2.5, 11.9, 1.9, { fill: PP.branco, borda: PP.coral, bw: 2 });
txt(s, [
  { text: "Quando resistir produz recuo do adulto, repetidamente e em vários contextos, a oposição vira ", options: {} },
  { text: "comportamento aprendido", options: { bold: true, color: PP.coralTexto } },
  { text: " (sem intenção consciente, sem vilão). Esse ciclo é FATOR DE RISCO e de manutenção do transtorno opositivo-desafiador (TOD), não causa suficiente: temperamento e carga familiar entram na equação.", options: {} },
], { x: 1.05, y: 2.8, w: 11.2, h: 1.4, fontSize: 16, lineSpacingMultiple: 1.2 });
card(s, 0.7, 4.75, 11.9, 1.3, { fill: PP.lavandaClara });
txt(s, "Na anamnese, três perguntas operacionais: O que acontece imediatamente depois da birra? Quem cede, com que frequência? A oposição já se espalhou para fora de casa?", { x: 1.0, y: 5.0, w: 11.3, h: 0.9, fontSize: 14.5 });
rodape(s, "ponte com a aula principal: contracena do Ato 2 (quando resistir funciona)");
s.addNotes("Correções dos crivos: TOD por extenso na primeira aparição; 'estratégia' trocado por 'comportamento aprendido'; explicitar fator de risco vs causa suficiente. Nunca dizer a um pai 'vocês produziram o TOD'.");

// ============================================================================
// SET B — AS DUAS CURVAS DO TDAH (6 slides)
// ============================================================================
const CB = "SATÉLITE B · TDAH";

s = novo({ dark: true });
capaSet(s, "B", "As duas curvas do TDAH",
  "o Ato 3 afirma que o TDAH fica visível quando a demanda cruza o freio. Este módulo desmonta o gráfico em passos e acrescenta o que ele NÃO diz.",
  "Vocabulário do módulo: “freio” é o apelido didático das funções executivas (inibir impulso, segurar informação na cabeça, trocar de plano). O gráfico é esquemático: os eixos não têm unidade comum; é uma retórica visual, e assumimos isso. O que ele explica é QUANDO o transtorno chega à consulta, nunca O QUE ele é.",
  "Crivo incorporado: definir funções executivas e assumir o caráter esquemático do gráfico (R1); o modelo explica o momento do encaminhamento, não o diagnóstico (R3).");

s = novo({ chip: CB });
titulo(s, "O freio amadurece devagar, e continua amadurecendo muito depois desta aula: até a vida adulta jovem.");
filete(s);
s.addShape(ST.line, { x: 1.3, y: 5.7, w: 10.4, h: 0, line: { color: PP.roxoMedio, width: 1.5 } });
s.addShape(ST.line, { x: 1.3, y: 2.6, w: 0, h: 3.1, line: { color: PP.roxoMedio, width: 1.5 } });
s.addShape(ST.line, { x: 1.3, y: 5.5, w: 3.2, h: -1.1, line: { color: PP.dourado, width: 4 } });
s.addShape(ST.line, { x: 4.5, y: 4.4, w: 3.2, h: -0.85, line: { color: PP.dourado, width: 4 } });
s.addShape(ST.line, { x: 7.7, y: 3.55, w: 2.2, h: -0.4, line: { color: PP.dourado, width: 4 } });
s.addShape(ST.line, { x: 9.9, y: 3.15, w: 1.7, h: -0.25, line: { color: PP.dourado, width: 4, dashType: "dash" } });
["2a", "6a", "12a", "puberdade", "adulto jovem"].forEach((lb, i) => {
  txt(s, lb, { x: 1.0 + i * 2.4, y: 5.85, w: 1.6, h: 0.3, fontSize: 11, color: PP.roxoMedio, align: "center" });
});
card(s, 8.6, 4.4, 4.0, 1.6, { fill: PP.branco, borda: PP.roxoMedio, bw: 0.75 });
txt(s, "Âncoras: aos 3, não espera a vez nem com ajuda; aos 8, espera; aos 15, planeja a semana (mais ou menos).", { x: 8.85, y: 4.6, w: 3.5, h: 1.2, fontSize: 12.5 });
rodape(s, "curva média didática: inibição, memória de trabalho e flexibilidade têm trajetórias distintas, e a variância individual é enorme");
s.addNotes("R3: não platôr na puberdade (segue até a 3ª década); R1: ancorar a curva em comportamentos observáveis.");

s = novo({ chip: CB });
titulo(s, "A demanda não sobe em rampa, sobe em escada: e o degrau dos 6 anos é o mais alto.");
filete(s);
s.addShape(ST.line, { x: 1.3, y: 5.7, w: 10.4, h: 0, line: { color: PP.roxoMedio, width: 1.5 } });
s.addShape(ST.line, { x: 1.3, y: 2.6, w: 0, h: 3.1, line: { color: PP.roxoMedio, width: 1.5 } });
// escada: creche/pré, degrau 6a, fundamental II
s.addShape(ST.line, { x: 1.3, y: 5.35, w: 2.6, h: 0, line: { color: PP.coral, width: 4 } });
s.addShape(ST.line, { x: 3.9, y: 4.85, w: 0, h: 0.5, line: { color: PP.coral, width: 4 } });
s.addShape(ST.line, { x: 3.9, y: 4.85, w: 1.9, h: 0, line: { color: PP.coral, width: 4 } });
s.addShape(ST.line, { x: 5.8, y: 3.55, w: 0, h: 1.3, line: { color: PP.coral, width: 4 } });
s.addShape(ST.line, { x: 5.8, y: 3.55, w: 2.9, h: 0, line: { color: PP.coral, width: 4 } });
s.addShape(ST.line, { x: 8.7, y: 2.95, w: 0, h: 0.6, line: { color: PP.coral, width: 4 } });
s.addShape(ST.line, { x: 8.7, y: 2.95, w: 2.6, h: 0, line: { color: PP.coral, width: 4 } });
txt(s, "casa", { x: 1.7, y: 5.45, w: 1.5, h: 0.3, fontSize: 11, color: PP.coralTexto });
txt(s, "pré-escola", { x: 3.95, y: 4.95, w: 1.7, h: 0.3, fontSize: 11, color: PP.coralTexto });
txt(s, "FUNDAMENTAL I (6a): sentar horas, instrução única para 30, sem adulto dedicado", { x: 5.0, y: 2.62, w: 3.6, h: 0.85, fontSize: 10.5, color: PP.coralTexto, bold: true });
txt(s, "FUNDAMENTAL II: organização, vários professores (a desatenção aflora aqui)", { x: 8.8, y: 2.35, w: 3.3, h: 0.7, fontSize: 10.5, color: PP.coralTexto });
rodape(s, "hiperatividade grave já é visível aos 3-4 na pré-escola; a apresentação desatenta costuma aflorar no fundamental II");
s.addNotes("Correção central do R3: degrau único aos 6 ensinaria a não procurar TDAH antes nem depois. A escada preserva o clímax dos 6 sem apagar os outros degraus.");

s = novo({ chip: CB });
titulo(s, "O vão entre as curvas explica QUANDO o TDAH chega à consulta, não O QUE ele é.");
filete(s);
s.addShape(ST.line, { x: 1.3, y: 5.7, w: 10.4, h: 0, line: { color: PP.roxoMedio, width: 1.5 } });
s.addShape(ST.line, { x: 1.3, y: 2.6, w: 0, h: 3.1, line: { color: PP.roxoMedio, width: 1.5 } });
// demanda escada simplificada
s.addShape(ST.line, { x: 1.3, y: 5.2, w: 3.6, h: 0, line: { color: PP.coral, width: 3.5 } });
s.addShape(ST.line, { x: 4.9, y: 3.55, w: 0, h: 1.65, line: { color: PP.coral, width: 3.5 } });
s.addShape(ST.line, { x: 4.9, y: 3.55, w: 6.6, h: -0.35, line: { color: PP.coral, width: 3.5 } });
// freio típico
s.addShape(ST.line, { x: 1.3, y: 5.45, w: 5.2, h: -1.6, line: { color: PP.dourado, width: 3.5 } });
s.addShape(ST.line, { x: 6.5, y: 3.85, w: 5.0, h: -1.05, line: { color: PP.dourado, width: 3.5 } });
// freio TDAH (mais baixo, tracejado roxoMedio)
s.addShape(ST.line, { x: 1.3, y: 5.6, w: 5.2, h: -1.0, line: { color: PP.roxoMedio, width: 3.5, dashType: "dash" } });
s.addShape(ST.line, { x: 6.5, y: 4.6, w: 5.0, h: -0.75, line: { color: PP.roxoMedio, width: 3.5, dashType: "dash" } });
s.addShape(ST.rect, { x: 4.9, y: 3.42, w: 4.6, h: 1.05, fill: { color: PP.coral, transparency: 82 } });
txt(s, "demanda", { x: 11.6, y: 3.05, w: 1.5, h: 0.3, fontSize: 11.5, bold: true, color: PP.coralTexto });
txt(s, "freio típico", { x: 11.6, y: 2.55, w: 1.6, h: 0.3, fontSize: 11.5, bold: true, color: PP.roxoProfundo });
txt(s, "freio TDAH", { x: 11.6, y: 3.75, w: 1.6, h: 0.3, fontSize: 11.5, bold: true, color: PP.roxoMedio });
txt(s, "o vão clínico: maior, persistente, em 2+ contextos", { x: 5.0, y: 3.5, w: 4.3, h: 0.6, fontSize: 11, italic: true });
card(s, 0.7, 6.05, 11.9, 0.85, { fill: PP.branco, borda: PP.coral, bw: 1.5 });
txt(s, "Aviso na direção oposta: os mais novos da turma recebem mais diagnóstico (efeito de idade relativa). O mesmo vão que revela TDAH também rotula imaturidade normal.", { x: 1.0, y: 6.2, w: 11.3, h: 0.6, fontSize: 13, bold: true });
rodape(s, "o diagnóstico segue exigindo prejuízo em 2+ contextos e início na infância; o gráfico não substitui critério");
s.addNotes("As duas curvas de freio (típica e mais baixa) respondem 'a escola causa TDAH?': não; a curva dessa criança já era mais baixa antes, mas ninguém precisava dela aos 4. Toda criança de 6 tem ALGUM vão: o clínico é maior, persistente e multicontexto.");

s = novo({ chip: CB });
titulo(s, "Acomodação abaixa o degrau; tratamento sobe o freio. São alavancas diferentes, e complementares.");
filete(s);
s.addShape(ST.line, { x: 1.3, y: 5.7, w: 10.4, h: 0, line: { color: PP.roxoMedio, width: 1.5 } });
s.addShape(ST.line, { x: 1.3, y: 2.6, w: 0, h: 3.1, line: { color: PP.roxoMedio, width: 1.5 } });
s.addShape(ST.line, { x: 1.3, y: 5.2, w: 3.6, h: 0, line: { color: PP.coral, width: 3.5 } });
s.addShape(ST.line, { x: 4.9, y: 3.55, w: 0, h: 1.65, line: { color: PP.coral, width: 3.5 } });
s.addShape(ST.line, { x: 4.9, y: 3.55, w: 6.6, h: -0.3, line: { color: PP.coral, width: 3.5 } });
s.addShape(ST.line, { x: 4.9, y: 4.35, w: 6.6, h: -0.3, line: { color: PP.coral, width: 3, dashType: "dash" } });
txt(s, "acomodações\nabaixam o degrau", { x: 8.3, y: 4.45, w: 2.6, h: 0.6, fontSize: 11, bold: true, color: PP.coralTexto });
s.addShape(ST.line, { x: 1.3, y: 5.6, w: 10.2, h: -1.7, line: { color: PP.roxoMedio, width: 3.5, dashType: "dash" } });
s.addShape(ST.line, { x: 1.3, y: 5.35, w: 10.2, h: -2.15, line: { color: PP.dourado, width: 3.5 } });
txt(s, "tratamento (comportamental + farmacológico)\nsobe a curva do freio, funcionalmente", { x: 7.6, y: 2.55, w: 4.4, h: 0.6, fontSize: 11, bold: true, color: PP.roxoProfundo });
card(s, 0.7, 6.05, 11.9, 0.85, { fill: PP.lavandaClara });
txt(s, "Acomodações (sentar longe da janela, instrução fracionada, pausas de movimento): evidência individual modesta; pedem-se por relatório médico à escola. Não substituem tratamento, nem o contrário.", { x: 1.0, y: 6.18, w: 11.3, h: 0.65, fontSize: 12.5 });
s.addNotes("R1 pediu o elefante: onde entra a medicação. Resposta no gráfico: tratamento desloca o freio; acomodação desloca a demanda. R3: evidência de acomodações isoladas é fraca (Harrison 2013); dizer 'modesta' e seguir.");

// ============================================================================
// SET C — FALSA CRENÇA QUADRO A QUADRO (7 slides)
// ============================================================================
const CC = "SATÉLITE C · FALSA CRENÇA";

s = novo({ dark: true });
capaSet(s, "C", "Falsa crença quadro a quadro",
  "é o pré-requisito cognitivo da vida em grupo: sem representar a mente do outro, não há amizade recíproca (Ato 4) nem convivência escolar. Este módulo desmonta o experimento do Ato 2.",
  "O cenário: uma criança ASSISTE a uma encenação com duas bonecas (Sally e Anne) e responde a UMA pergunta no final. Quem é testada é a criança da plateia, não as bonecas. Paradigma da transferência inesperada (Sally-Anne, Baron-Cohen et al., 1985); o livro-fonte usa o paradigma irmão da caixa de doces. “Falsa crença” = agir por uma representação do mundo que ficou desatualizada.",
  "Crivo R1: sem este setup, o residente passa 3 slides achando que a história é sobre Sally. Definir falsa crença antes dos quadros.");

s = novo({ chip: CC });
titulo(s, "Quadro 1: Sally guarda a bolinha na cesta e sai para brincar.");
filete(s);
// cena: Sally (esq) com cesta, Anne (dir) com caixa
function boneca(s, x, y, cor, nome) {
  s.addShape(ST.ellipse, { x, y, w: 0.55, h: 0.55, fill: { color: cor } });
  s.addShape(ST.roundRect, { x: x - 0.08, y: y + 0.6, w: 0.7, h: 0.9, rectRadius: 0.1, fill: { color: cor } });
  txt(s, nome, { x: x - 0.45, y: y + 1.55, w: 1.5, h: 0.35, align: "center", fontSize: 13, bold: true });
}
boneca(s, 2.6, 2.9, PP.roxoMedio, "Sally");
boneca(s, 9.9, 2.9, PP.dourado, "Anne");
s.addShape(ST.roundRect, { x: 3.9, y: 4.4, w: 1.6, h: 0.9, rectRadius: 0.25, fill: { color: PP.lavanda }, line: { color: PP.roxoMedio, width: 1 } });
txt(s, "cesta", { x: 3.9, y: 5.35, w: 1.6, h: 0.3, align: "center", fontSize: 12, color: PP.roxoMedio });
s.addShape(ST.ellipse, { x: 4.55, y: 4.55, w: 0.35, h: 0.35, fill: { color: PP.coral } });
s.addShape(ST.rect, { x: 7.9, y: 4.35, w: 1.5, h: 0.95, fill: { color: PP.branco }, line: { color: PP.roxoMedio, width: 1 } });
txt(s, "caixa", { x: 7.9, y: 5.35, w: 1.5, h: 0.3, align: "center", fontSize: 12, color: PP.roxoMedio });
card(s, 0.7, 6.1, 11.9, 0.75, { fill: PP.lavandaClara });
txt(s, "A criança da plateia assiste a tudo, do começo ao fim. Guarde isso.", { x: 1.0, y: 6.27, w: 11.3, h: 0.5, fontSize: 13.5, bold: true });
s.addNotes("Encenar com voz de contador de história: o storyboard é literal de propósito.");

s = novo({ chip: CC });
titulo(s, "Quadro 2: com Sally fora, Anne muda a bolinha para a caixa.");
filete(s);
txt(s, "Sally saiu\nde cena", { x: 1.7, y: 3.3, w: 2.0, h: 0.7, align: "center", fontSize: 13, italic: true, color: PP.roxoMedio });
boneca(s, 9.9, 2.9, PP.dourado, "Anne");
s.addShape(ST.roundRect, { x: 3.9, y: 4.4, w: 1.6, h: 0.9, rectRadius: 0.25, fill: { color: PP.lavanda }, line: { color: PP.roxoMedio, width: 1 } });
txt(s, "cesta (vazia)", { x: 3.7, y: 5.35, w: 2.0, h: 0.3, align: "center", fontSize: 12, color: PP.roxoMedio });
s.addShape(ST.rect, { x: 7.9, y: 4.35, w: 1.5, h: 0.95, fill: { color: PP.branco }, line: { color: PP.coral, width: 2 } });
s.addShape(ST.ellipse, { x: 8.45, y: 4.6, w: 0.35, h: 0.35, fill: { color: PP.coral } });
txt(s, "caixa", { x: 7.9, y: 5.35, w: 1.5, h: 0.3, align: "center", fontSize: 12, color: PP.roxoMedio });
s.addShape(ST.line, { x: 5.6, y: 4.75, w: 2.2, h: 0, line: { color: PP.coral, width: 3, endArrowType: "triangle" } });
card(s, 0.7, 6.1, 11.9, 0.75, { fill: PP.lavandaClara });
txt(s, "Assimetria que carrega o teste: a criança da plateia VIU a mudança; Sally, não.", { x: 1.0, y: 6.27, w: 11.3, h: 0.5, fontSize: 13.5, bold: true });
s.addNotes("Não correr aqui: a assimetria de informação é o coração do experimento.");

s = novo({ chip: CC });
titulo(s, "Quadro 3, a pergunta: onde Sally vai PROCURAR a bolinha?");
filete(s);
card(s, 1.6, 2.7, 10.1, 2.2, { fill: PP.lavanda });
txt(s, [
  { text: "“Onde Sally vai ", options: {} },
  { text: "PROCURAR", options: { bold: true, color: PP.coralTexto } },
  { text: " a bolinha?”", options: {} },
], { x: 2.0, y: 3.25, w: 9.3, h: 0.8, fontFace: SERIF, fontSize: 28 });
txt(s, "feita à criança da plateia, não às bonecas", { x: 2.0, y: 4.15, w: 9.3, h: 0.4, fontSize: 13.5, italic: true, color: PP.roxoMedio });
card(s, 1.6, 5.3, 10.1, 1.1, { fill: PP.branco, borda: PP.coral, bw: 1.5 });
txt(s, "O verbo é o teste: “onde a bolinha ESTÁ?” pergunta sobre o mundo; “onde ela vai PROCURAR?” pergunta sobre a CABEÇA de Sally.", { x: 1.95, y: 5.55, w: 9.5, h: 0.7, fontSize: 14.5, bold: true });
s.addNotes("R1 confessou: na primeira leitura não notaria o verbo. Destacar oralmente também. Se reproduzir no consultório, a pergunta errada ('onde está?') anula o teste.");

s = novo({ chip: CC });
titulo(s, "A proporção de acertos cruza a metade por volta dos 4 anos: transição gradual, não interruptor.");
filete(s);
card(s, 0.7, 2.6, 5.75, 2.9, { fill: PP.lavandaClara });
txt(s, "AOS 3, A MAIORIA ERRA: “na caixa”", { x: 1.0, y: 2.8, w: 5.2, h: 0.5, bold: true, fontSize: 14.5, color: PP.roxoMedio });
txt(s, "Não é memória fraca nem desatenção: a criança responde com a única versão do mundo que consegue sustentar, a dela. A crença desatualizada de Sally ainda não cabe na conta.", { x: 1.0, y: 3.35, w: 5.2, h: 1.9, fontSize: 13.5, lineSpacingMultiple: 1.2 });
card(s, 6.85, 2.6, 5.75, 2.9, { fill: PP.branco, borda: PP.coral, bw: 1.5 });
txt(s, "AOS 5, A MAIORIA ACERTA: “na cesta”", { x: 7.15, y: 2.8, w: 5.2, h: 0.5, bold: true, fontSize: 14.5, color: PP.coralTexto });
txt(s, "A criança agora sustenta duas representações ao mesmo tempo: onde a bolinha está, e onde Sally ACREDITA que está. E prevê o comportamento pela crença, não pelo fato.", { x: 7.15, y: 3.35, w: 5.2, h: 1.9, fontSize: 13.5, lineSpacingMultiple: 1.2 });
card(s, 0.7, 5.8, 11.9, 0.85, { fill: PP.lavanda });
txt(s, "Aos 4, o desempenho fica perto do meio a meio: uma criança de 4 que erra NÃO está atrasada por isso.", { x: 1.0, y: 5.98, w: 11.3, h: 0.55, fontSize: 14, bold: true });
rodape(s, "meta-análise de Wellman, Cross & Watson (2001): transição gradual, sensível à forma da tarefa, linguagem e cultura");
s.addNotes("R3: sem idades-muro. R1: dar o mecanismo do erro dos 3 anos (senão vira 'burrice ou memória').");

s = novo({ chip: CC });
titulo(s, "O protocolo controla a memória com perguntas-controle; o que falha aos 3 é outra coisa.");
filete(s);
card(s, 0.7, 2.5, 5.75, 3.3, { fill: PP.branco, borda: PP.roxoMedio, bw: 0.75 });
txt(s, "AS PERGUNTAS-CONTROLE", { x: 1.0, y: 2.7, w: 5.2, h: 0.45, bold: true, fontSize: 14 });
txt(s, "“Onde a bolinha está de verdade?” e “onde estava no começo?”: a criança de 3 ACERTA as duas. Memória e realidade estão intactas; o que falta é a crença do outro.", { x: 1.0, y: 3.2, w: 5.2, h: 2.4, fontSize: 13.5, lineSpacingMultiple: 1.2 });
card(s, 6.85, 2.5, 5.75, 3.3, { fill: PP.lavandaClara });
txt(s, "DUAS LEITURAS HONESTAS DO ERRO", { x: 7.15, y: 2.7, w: 5.2, h: 0.45, bold: true, fontSize: 14, color: PP.roxoMedio });
txt(s, "1. Representacional: ainda não sustenta a crença falsa do outro.\n2. Executiva/pragmática: até representa, mas não inibe a resposta pela realidade.\n\nFalhar no teste NÃO é sinônimo de não ter teoria da mente.", { x: 7.15, y: 3.2, w: 5.2, h: 2.4, fontSize: 13.5, lineSpacingMultiple: 1.2 });
card(s, 0.7, 6.05, 11.9, 0.85, { fill: PP.branco, borda: PP.coral, bw: 1.5 });
txt(s, "Ponte clínica: o paradigma nasceu na pesquisa do autismo, mas NÃO é teste diagnóstico: passar não exclui TEA, falhar não o diagnostica.", { x: 1.0, y: 6.22, w: 11.3, h: 0.6, fontSize: 13.5, bold: true });
rodape(s, "versão do livro-fonte: caixa de doces (conteúdo inesperado; Perner et al. 1987; descrita no Bee & Boyd via Flavell), paradigma irmão do Sally-Anne");
s.addNotes("R3: sem as perguntas-controle, 'não mede memória' é dogma; com elas, é método. Ter na manga (para pergunta de plateia): versões implícitas com bebês estão no centro de fracassos de replicação recentes.");

// ============================================================================
// SET D — APÊNDICE ANTI-PERGUNTA (7 slides)
// ============================================================================
const CD = "SATÉLITE D · APÊNDICE";

s = novo({ dark: true });
capaSet(s, "D", "Apêndice anti-pergunta",
  "seis respostas prontas para as perguntas mais prováveis da turma. Ficam depois das referências; nunca se apresentam, salta-se até elas quando a pergunta vier.",
  "Formato de cada slide: a pergunta como título, a resposta em três tempos (o que é verdade, o que é exagero, o que responder na prática).",
  null);

function antiPergunta(s, pergunta, verdade, exagero, pratica, fonte, notas) {
  s.addText("SE PERGUNTAREM", {
    shape: ST.roundRect, rectRadius: 0.08, x: 0.6, y: 0.34, w: 2.7, h: 0.4,
    fill: { color: PP.coral }, color: PP.branco, fontFace: SANS, fontSize: 12, bold: true, align: "center", valign: "middle",
  });
  titulo(s, pergunta, { y: 0.95, size: 24 });
  const cols = [["O QUE É VERDADE", verdade, PP.branco, PP.roxoProfundo], ["O QUE É EXAGERO", exagero, PP.lavandaClara, PP.roxoMedio], ["NA PRÁTICA", pratica, PP.lavanda, PP.coralTexto]];
  cols.forEach((c, i) => {
    const x = 0.7 + i * 4.1;
    card(s, x, 2.55, 3.7, 3.55, { fill: c[2], borda: PP.roxoMedio, bw: 0.75 });
    txt(s, c[0], { x: x + 0.2, y: 2.75, w: 3.3, h: 0.45, bold: true, fontSize: 13.5, color: c[3] });
    txt(s, c[1], { x: x + 0.2, y: 3.25, w: 3.3, h: 2.7, fontSize: 12.5, lineSpacingMultiple: 1.18 });
  });
  if (fonte) rodape(s, fonte);
  if (notas) s.addNotes(notas);
}

s = novo({ chip: CD });
antiPergunta(s, "“Piaget foi superado?”",
  "A SEQUÊNCIA replica: conservação, erros clássicos e a ordem das aquisições aparecem em qualquer cultura testada.",
  "O calendário e os estágios como blocos: competências surgem antes com tarefas simplificadas, e a mesma lógica chega em tempos diferentes por conteúdo (décalage: conserva número anos antes de conservar volume).",
  "Use Piaget como mapa, não como mecanismo. O motor é experiência + processamento (Siegler: a criança adquire regras cada vez melhores conforme pratica, sem saltos de estágio).",
  "Bee & Boyd cap. 9, p. 240-242",
  "R1: décalage glossado no próprio slide; Siegler em frase completa.");

s = novo({ chip: CD });
antiPergunta(s, "“Qual a prevalência real de TDAH?”",
  "Com critérios padronizados e método fixo, a prevalência fica perto de 5% em idade escolar e é estável entre décadas e países (meta-análise de Polanczyk et al.).",
  "O “até 10%” citado pelo livro é prevalência de DIAGNÓSTICO relatado por pais nos EUA: mede prática diagnóstica, não o transtorno. A diferença entre os dois números É a resposta.",
  "“Diagnostica-se mais do que existe em alguns lugares, e menos em outros. O transtorno em si: ~5% das crianças em idade escolar, qualquer país.”",
  "Bee & Boyd cap. 9, p. 255 (Gahagan 2011) + Polanczyk et al.",
  "Explicar por que os números divergem (critério, informante, corte de prejuízo) é a aula de epidemiologia em 30 segundos.");

s = novo({ chip: CD });
antiPergunta(s, "“Palmada funciona?”",
  "A associação com desfechos piores (mais agressão, pior relação, clima de rejeição) é consistente na meta-análise específica de palmada (Gershoff & Grogan-Kaylor, 2016), sem nenhum benefício demonstrado.",
  "“Palmada causa transtorno”: a evidência é majoritariamente correlacional, com efeitos pequenos a moderados. A recomendação de não usar vem da convergência + ausência de benefício, não de causa provada.",
  "O que ensinar no lugar: consequência calma e consistente (o elo C do satélite A). E no Brasil, castigo físico é vedado por lei (Lei Menino Bernardo, 13.010/2014).",
  "Bee & Boyd cap. 8, p. 217",
  "R1: ensina pelo exemplo que dor resolve conflito ('modela' é jargão de Bandura). Nunca desmontar a palmada sem deixar alternativa no lugar.");

s = novo({ chip: CD });
antiPergunta(s, "“Telas causam TDAH?”",
  "A associação entre uso de telas e sintomas de desatenção é FRACA e provavelmente bidirecional: crianças com TDAH também buscam mais telas.",
  "Qualquer resposta causal firme, para qualquer lado. A fonte desta aula não cobre o tema, e a literatura não fecha a conta.",
  "Pergunta funcional que substitui o número: o que a tela está substituindo? (1h de tablet no jantar = 1h a menos de conversa). Diretrizes por idade existem (SBP); use-as como teto, não como álibi.",
  null,
  "Se cobrarem número: SBP sugere evitar telas antes dos 2 anos e limitar por faixa etária depois. O princípio funcional importa mais que o teto.");

s = novo({ chip: CD });
antiPergunta(s, "“Bilinguismo atrasa a fala?”",
  "O vocabulário POR língua pode ser menor, e misturar códigos na mesma frase é normal. O vocabulário conceitual SOMADO é comparável ao do monolíngue.",
  "“Bilinguismo não muda nada”: nega o que o pai observa (menos palavras em cada língua) e queima credibilidade. Valide a observação antes de corrigir a conclusão.",
  "Alarmes que não dependem de língua: nenhuma palavra aos 18 meses, nenhuma combinação de 2 palavras aos 2 anos, perda de habilidades em qualquer idade. Isso avalia igual, em qualquer casa.",
  null,
  "Coerente com a voz do professor: validar antes de orientar.");

s = novo({ chip: CD });
antiPergunta(s, "“Birra até que idade é normal?”",
  "Pico por volta de 18 meses a 3 anos (birras diárias e curtas são esperadas), declínio de frequência e intensidade até os 4-5. Aos 5-6: raras, curtas e proporcionais, não zero.",
  "Qualquer corte por idade absoluta (“birra depois dos 5 = doença”). A trajetória vale mais que o número.",
  "Red flags de QUALIDADE, além da trajetória: autoagressão, agressão dirigida ao cuidador, episódios muito longos (20-25+ min), não se acalma nem com ajuda, birras iguais com adultos de fora da família.",
  "Bee & Boyd cap. 8, p. 226 + literatura de birra clínica (Wakschlag, Belden)",
  "R1: sem o pico, 'decrescente' não desenha nada; R3: o padrão que muda de QUALIDADE alarma tanto quanto o que não declina.");

// ---------------------------------------------------------------------------
pres.writeFile({ fileName: __dirname + "/Satelites_Desenvolvimento-normal_PsiquiatriaPratica.pptx" })
  .then(() => console.log("OK:", n, "slides"));
