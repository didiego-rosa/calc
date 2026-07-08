# Arquitetura de Slides (Camada 2, v5)
## Aula: Exame psíquico na pré-escola e na escola (0 a 5 e 6 a 12 anos)

**Refeita do zero em 07/07/2026, por decisão do professor, com fonte única: `livro-do-professor-COMPLETO.md` (o livro é a fonte máxima, acima de G, FND e F1 a F8).** A versão anterior (v4, derivada de F1-F8) está em `historico/02-arquitetura-slides-v4-pre-livro.md` e não vale mais como spec; permanece como registro do trabalho de crivo.

**Decisão de estrutura:** a aula segue a estrutura do próprio livro, não mais o corte em dois atos etários da v4. Razões: (1) o livro é a fonte máxima e já é, ele mesmo, uma estrutura de ensino testada (moldura, blocos de domínios com as duas camadas etárias dentro de cada domínio, síntese, os dois Bentos como clímax, registro); (2) o livro ordena os domínios "na ordem em que os dados chegam ao examinador", que é exatamente o argumento didático da aula; (3) as duas faixas aprovadas na capa (0 a 5 e 6 a 12) continuam explícitas: cada domínio abre pela camada 0 a 5 e fecha pelo delta 6 a 12, e os dois Bentos encarnam as duas faixas. A tese ("o mesmo mapa, em outra língua") e os dispositivos da direção que sobrevivem (Bento, par de registro ruim/certo, vídeos com moldura, foco em descrição) permanecem.

**Capa aprovada pelo professor: "0 a 5 e 6 a 12".**

**Regras de construção (todas herdadas e vigentes):**
- Assertion-evidence: título é frase completa com a tese do slide; o corpo traz só a evidência. A sequência de títulos, lida sozinha, reconta o livro.
- Sem travessão em nenhum texto renderizado ou de notas (ponto, vírgula ou parênteses). Citações do livro adaptam a pontuação sem alterar o vocabulário.
- Nenhum selo de remissão renderizado (decisão do checkpoint). Remissões ao adulto e aos apêndices vivem na fala e nas notas.
- Foco em descrição: nenhum domínio termina sem a frase que o residente escreveria. O par de registro ruim/certo do livro é o dispositivo recorrente (13 pares, um por domínio, mais o do episódio agressivo no apêndice).
- Notas de apresentador em todos os slides; as Notas de Ensino do livro alimentam as notas, não o corpo.
- Bento conforme o livro: caso A (4 anos e 2 meses) essencialmente típico com variação a observar; caso B (9 anos e 7 meses) com achados e ideação passiva. O livro substitui a regra antiga "Bento sempre normal": os dois exames são o clímax didático do livro e entram como estão.
- No máximo um número em destaque por slide; detalhe fino nas notas.

**Inventário de vídeos (mantido da v4, acervo público, nunca paciente do professor):**
| ID | Spec | Lugar |
|----|------|-------|
| V1 | Birra de criança de 2 a 3 anos com o adulto entrando em corregulação, 60 a 90s; congelar em gatilho, pico e retorno | Bloco 1, fecho (S17 a S19) |
| V2 | Brincar simbólico espontâneo, 2 a 4 anos, 20 a 40s, objeto usado como outro | Domínio 7 (S34 a S36) |
| V3 | Atenção compartilhada 12 a 24 meses: apontar protodeclarativo com checagem do rosto; contraste com apontar para pedir se possível | Domínio 6 (S28 a S30) |

**Total: 72 slides principais + 13 de apêndice (numeração contínua, S73 a S85). Estimativa de fala: 80 a 90 min.**
**Sem numeração de página renderizada (decisão do professor, crivo de 07/07/2026); a numeração S1..S85 é interna, desta spec e do gerador.**

**Ordem de corte para 60 min:** (1º) bloco V1 inteiro, S17 a S19 (a técnica sobrevive na narração de S16); (2º) fundir S11+S12 (atitude numa passada); (3º) fundir S40+S41 (linguagem: as duas perguntas + compreensão); (4º) absorver S56 na narração de S55 (as duas falhas viram fala do divisor); (5º) absorver S69 na narração de S68 (as cinco regras já aparecem nos Bentos). Nunca cortar: V2, V3, o risco (S52 e S53), a síntese do normal (S59), os oito slides de Bento, o checklist (S70).

---

## Espinha (título por slide; corpo e notas no gerador `deck/gerar-deck.js`, ancoragem por parte/domínio do livro)

### MOLDURA (Parte I do livro) · S1 a S7
- **S1 · Capa (escura).** Exame psíquico na pré-escola e na escola (0 a 5 e 6 a 12 anos) / O mesmo mapa, em outra língua.
- **S2.** Vocês já sabem examinar o adulto; o que falha diante da criança não é o conhecimento, é o transporte. [P.I abertura: os três hábitos]
- **S3.** Primeira tradução: o brincar é o discurso da criança, com forma e conteúdo lidos em separado. [Tradução 1]
- **S4.** Segunda tradução: não existe criança examinável isolada; o que se examina é o par. [Tradução 2: sintonia, contingência, corregulação, reparação]
- **S5.** Terceira tradução: a régua anda com a idade, e o desvio pesa pela qualidade: dissociação, regressão, inflexibilidade. [Tradução 3]
- **S6.** O exame do adulto pergunta e escuta; o da criança propõe e observa, e o examinador vira instrumento. [O que a moldura muda no gesto; frustração; regra de ouro]
- **S7.** Vamos examinar o mesmo menino duas vezes, aos 4 e aos 9 anos, e escrever os dois prontuários. [contrato + Bento]

### BLOCO 1 · Entrada, movimento e regulação · S8 a S19
- **S8 · Divisor (escuro).** A ordem dos domínios é a ordem em que os dados chegam: meio exame antes do primeiro brinquedo. [P.II abertura do Bloco 1]
- **S9.** A aparência do pré-escolar fala de dois ao mesmo tempo: da criança e do sistema que cuida dela. [D1: dupla leitura, os dois polos, camada 6-12]
- **S10.** Lesão se descreve por cor, forma, tamanho e lugar; a conclusão forense não pertence a este campo. [D1: topografia; par de registro]
- **S11.** A criança não compartilha o enquadre: examina-se a reação à situação nova, e os olhos decidem o que a imobilidade é. [D2: inibição vs congelamento]
- **S12.** Estranhe a criança que não estranha: a intimidade instantânea com o desconhecido é achado, não facilidade. [D2: indiscriminação, monitoramento ansioso, transições; par]
- **S13.** O pré-escolar é normativamente hipercinético: examina-se a direção do movimento, não a quantidade. [D3; par falso hiperativo]
- **S14.** Tique e estereotipia se separam na sala: pelo ritmo, pelo contexto e pelo que acontece quando algo captura a criança. [D3: a cena dupla; camada 6-12]
- **S15.** A regulação é o alicerce: quem não alcança o alerta tranquilo não brinca, não se vincula e não atende. [D4: estados, reatividade sensorial, autoconsolo]
- **S16.** A atenção do pré-escolar se mede no brincar de interesse dela, e a consulta é uma amostra enviesada. [D4: naturalística, curva da frustração, viés de amostra; par]
- **S17 a S19.** Moldura, VÍDEO V1, moldura-depois: regulação, afeto e díade examinados sem uma pergunta.

### BLOCO 2 · Afeto e vínculo · S20 a S31
- **S20 · Divisor (escuro).** O coração do exame: o afeto se lê no corpo que o Bloco 1 ensinou a observar, e o vínculo, no espaço entre os dois.
- **S21.** No pré-escolar o humor não se pergunta: infere-se do padrão do afeto, do relato do cuidador e do sono, apetite e energia. [D5: a porta fechada]
- **S22.** O afeto se registra em quatro dimensões, e a cor dele separa a criança enlutada da apagada. [D5: qualidade, amplitude, mobilidade, congruência; embotamento; dissociação ideoafetiva]
- **S23.** O choro não é o dado; o dado é a curva de retorno, e dentro dela a consolabilidade. [D5: três desfechos do consolo; par]
- **S24.** No escolar o relato se entreabre, e a distância entre o que a criança diz e o que mostra é achado, não problema. [D5 camada 6-12: irritabilidade, anedonia observável, vergonha e culpa]
- **S25.** A díade se observa a consulta inteira: o pêndulo entre explorar e retornar é a base segura visível. [D6; a criança fácil demais]
- **S26.** Sob estresse aparece o padrão de uso do cuidador; descreve-se o comportamento, não se sela o rótulo. [D6: padrões; "apego desorganizado" pertence a protocolo]
- **S27.** O apontar informa pela função: pedir usa o outro como meio; mostrar convida o outro a compartilhar. [D6: referenciamento, contraste funcional]
- **S28 a S30.** Moldura, VÍDEO V3, moldura-depois: o triângulo olho, objeto, olho.
- **S31.** No escolar o palco muda para os pares, e o critério fino é a reciprocidade das amizades. [D6 camada 6-12; par]

### BLOCO 3 · O pensar e o simbolizar · S32 a S45
- **S32 · Divisor (escuro).** Três janelas para o mesmo objeto: o pensamento se encena no brincar, se diz na linguagem e se estrutura na cognição.
- **S33.** A trajetória do brincar é a régua: sensório-motor, funcional, simbólico; aos quatro anos espera-se enredo. [D7 forma; inibição lúdica]
- **S34 a S36.** Moldura, VÍDEO V2, moldura-depois: quando o bloco vira telefone, a função simbólica está no lugar.
- **S37.** Agressão no brincar é matéria-prima normal; o sinal é a destruição sem enredo e a cena que se repete sem desfecho. [D7 conteúdo; brincar pós-traumático]
- **S38.** Dentro do brincar fala-se pela cena, não sobre a cena: a pergunta certa é do boneco. [D7: uso do outro, interesse restrito, kit; par]
- **S39.** No escolar o jogo de regras assume o posto: a relação com a regra e com a derrota é o dado novo. [D7 camada 6-12: desenho, narrativa]
- **S40.** Linguagem pede duas perguntas ao mesmo tempo: está onde deveria, e o que o uso dela mostra do psiquismo? [D8: marcos com folga, ecolalia normativa]
- **S41.** A compreensão se testa retirando as pistas: peça sem apontar e veja o que a linguagem sozinha sustenta. [D8: receptiva; prosódia; ecolalia com ou sem intenção]
- **S42.** A pragmática pesa mais que a estrutura: a criança que fala muito e comunica pouco é o achado central do domínio. [D8; par]
- **S43.** O mutismo seletivo é discrepância contextual, não timidez nem déficit; e diante dele não se pressiona. [D8; camada 6-12: a narrativa como instrumento]
- **S44.** No pré-escolar a cognição se lê no brincar; no escolar começa a se deixar testar, com instrumento calibrado pela idade. [D9]
- **S45.** Concretismo aos nove anos não é sinal, é a idade: o achado fabricado pelo instrumento errado é o mais evitável dos erros. [D9; par falso concretismo; cognição por eliminação]

### BLOCO 4 · O teste, o juízo e o que se apura por último · S46 a S54
- **S46 · Divisor (escuro).** Os domínios que no adulto dependem do relato são os que mais recuam na criança; e o risco ganha capítulo próprio.
- **S47.** A fronteira entre o percebido e o imaginado é porosa por construção: monstro, amigo imaginário e figuras do sono são norma. [D10]
- **S48.** A pergunta que planta colhe alucinação falsa: registre a atitude alucinatória observada e pergunte aberto, tarde e sem sugestão. [D10: dois trilhos, o cortejo; par]
- **S49.** O eu se examina pela trajetória: primeiro nominal e corporal, depois interior, depois capaz de integrar contradições. [D11: marcos]
- **S50.** A fala da criança sobre si é espécime: colhe-se intacta, entre aspas; a paráfrase joga fora o que importava. [D11: autodesvalorização global; par]
- **S51.** O juízo se mostra no entrar e sair do faz de conta; o insight da infância é o desconforto e a noção do motivo. [D12: juízo e insight; delírio raro pede organicidade]
- **S52.** Risco se pergunta a sós, direto e sem eufemismo: perguntar não semeia a ideia; o silêncio deixa a criança sozinha. [D12: fonte, método, enquadre]
- **S53.** Risco se documenta na presença e na ausência: ideia, plano, intenção, meios, tentativas, preparativos, ou a negativa minuciosa. [D12: registro; par]
- **S54.** Quatro campos fecham a súmula em poucas linhas: vígil, orientado contra quê, memória ecológica e a autonomia da idade. [D13; inteligência como impressão; par]

### SÍNTESE (Parte III) · S55 a S59
- **S55 · Divisor (escuro).** Colher domínios não é o difícil; o difícil é amarrá-los num retrato: a síntese interpreta, obrigatoriamente e com lastro.
- **S56.** A síntese não é resumo nem diagnóstico: as duas falhas simétricas que matam o retrato. [síntese-resumo; síntese-diagnóstico; teste de fronteira]
- **S57.** O retrato se organiza em torno de um achado organizador, eleito por severidade, generalização, natureza e convergência. [ruído normativo fica fora]
- **S58.** Cada solda carrega um compromisso calibrado: descreve, sugere, é compatível com, levanta a hipótese de. [o fio; síntese relacional no pré-escolar]
- **S59.** A rubrica "sem alterações" não descreve criança nenhuma; a síntese do normal é a prova final da disciplina. [a rubrica enterrada; incerteza escrita; os seis passos]

### OS DOIS EXAMES DE BENTO (Parte IV) · S60 a S67
- **S60 · Divisor (escuro).** Bento, o mesmo menino aos 4 e aos 9: a régua anda, os domínios trocam de peso e o exame diz o quanto sabe.
- **S61.** Cena A: Bento, 4 anos e 2 meses, entra na frente da mãe, varre a sala com o olhar e vai direto aos carrinhos.
- **S62.** O exame narrativo mostra o como: prosa em primeira pessoa, com as condições da amostra na porta. [texto integral nas notas]
- **S63.** A súmula e a anotação: a sustentação curta virou organizadora porque três domínios independentes convergiram nela.
- **S64.** Tração: cinco anos depois, a mãe volta dizendo que as notas caem e que ele anda se chamando de burro.
- **S65.** Cena B: Bento, 9 anos e 7 meses, senta antes de ser convidado, rói as unhas até o leito; consulta às 16h de dia de aula.
- **S66.** A sós, com enquadre combinado, Bento entrega o que nenhum adulto sabia; o exame registra textual e minucioso. [texto integral nas notas]
- **S67.** A súmula e a anotação: o organizador aqui é um circuito, e nenhum elo depende de uma fonte só.

### O REGISTRO (Parte V) · S68 a S70
- **S68.** A mesma observação tem duas saídas: a súmula diz o quê com parâmetro; o narrativo mostra o como com a cena.
- **S69.** Cinco disciplinas atravessam os dois formatos: fonte, aspas, contra-quê, risco nos dois sentidos, condições da amostra.
- **S70.** Onze perguntas fecham o exame: o checklist que transforma o residente no seu próprio primeiro crítico.

### FECHO · S71 a S72
- **S71.** Na criança, o exame psíquico é o que se observa, não o que se ouve; e observar é interpretar sob disciplina. [espelho da moldura]
- **S72 (escuro).** Aos 12 o corpo muda e o exame muda de novo: a próxima aula assume. [fronteira + fontes + encerramento]

### APÊNDICES (do livro, numeração contínua) · S73 a S81
- **S73 a S74 · Apêndice 1 (lactente):** o alcance deste material e o que da lente já funciona no bebê.
- **S75 a S77 · Apêndice 2 (coreografia):** a ordem de propostas da consulta, da observação livre à despedida; a coreografia organiza o que se propõe, não o que se observa.
- **S78 a S79 · Apêndice 3 (episódio agressivo):** os cinco tempos observáveis e o mapa dos contextos; par de registro.
- **S80 a S81 · Apêndice 4 (mapa rápido):** uma linha por domínio, 1 a 7 e 8 a 13.
- **S82 a S85 · Apêndice 5 (dito simples, satélites ELI5, criados no crivo da entrega):** 16 conceitos difíceis em analogias de uma linha (moldura; vínculo; afeto e comunicação; síntese). Regra de uso: socorro quando a plateia travar; a analogia é ponte para a definição do livro, nunca substituta; nenhuma doutrina nova.

**Teste de aceitação da espinha:** ler S1 a S72 só pelos títulos e verificar que o livro se reconta sem som.
