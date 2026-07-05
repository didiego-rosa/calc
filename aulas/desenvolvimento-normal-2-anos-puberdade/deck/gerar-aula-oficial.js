// ============================================================================
// AULA OFICIAL: deck único = 60 slides principais + apêndice (satélites A-D)
// Numeração contínua; remissões "aprofundamento: apêndice X" nos slides-mãe.
// ============================================================================
const pptxgen = require("pptxgenjs");

global.__PRES__ = new pptxgen();
global.__COMBINED__ = true;
global.__SLIDE_OFFSET__ = 0;

require("./gerar-deck.js");      // S1-S60 (aula principal)
require("./gerar-satelites.js"); // S61-S86 (apêndice A-D)

global.__PRES__
  .writeFile({ fileName: __dirname + "/AULA-OFICIAL_Desenvolvimento-normal-2a-puberdade_PsiquiatriaPratica.pptx" })
  .then(() => console.log("OK: aula oficial com", global.__SLIDE_OFFSET__, "slides"));
