# CHECKPOINT · Aula: Exame psíquico na pré-escola e na escola
**Fechado em 07/07/2026, para migração de sessão antes do build pesado (Camada 3).**
Branch: `claude/psych-exam-wave-1-checkpoint-d3ex86` (continua, por fast-forward, a antiga `claude/psych-exam-childhood-course-y6zqja`) · último commit desta onda: ver `git log`.

---

## 1. Estado atual do deck

**ATUALIZAÇÃO 07/07/2026 (após a entrega do livro): o deck EXISTE, construído do zero a partir do livro.** Por decisão do professor ("pode criar do zero os slides com base no livro", capa "0 a 5 e 6 a 12" aprovada), a arquitetura foi refeita (v5, `02-arquitetura-slides.md`, estrutura espelhando o livro: moldura, 4 blocos de domínios com as duas camadas etárias, síntese, os dois Bentos, registro, apêndices 1 a 4 do livro). A v4 (derivada de F1-F8) está arquivada em `historico/02-arquitetura-slides-v4-pre-livro.md`. O deck oficial está em `deck/AULA-OFICIAL_Exame-psiquico-crianca-0a5-6a12_PsiquiatriaPratica.pptx` (81 slides: 72 principais + 9 de apêndice, numeração contínua), gerado por `deck/gerar-deck.js` (pptxgenjs, tokens Psiquiatria Prática), com notas de apresentador em todos os slides, sem travessão, sem selo de remissão, verificado por render (LibreOffice + poppler). Bento conforme o livro: caso A típico com variação a observar; caso B com achados e ideação passiva (o livro substituiu a regra antiga "Bento sempre normal"). Os textos integrais dos dois exames narrativos estão nas notas de S62 e S66.

O material anterior ao livro, ainda válido como histórico e fontes:

- `01-direcao.md` (Camada 1): transformação do público, tese ("o mesmo mapa, em outra língua", as três traduções: canal/paciente/régua), estrutura (portal + 2 atos por idade + fecho), dispositivos, sacrifícios, foco fechado em DESCRIÇÃO do exame (não entrevista). Tese/estrutura/dispositivos nasceram como [PROPOSTA] e foram sendo consolidados nas iterações com o professor; nenhum veto recebido.
- `02-arquitetura-slides.md` (Camada 2, v4): spec slide a slide de **65 slides** (portal S1-S6; Ato 1 = 0 a 5 anos, S7-S35; Ato 2 = 6 a 12, S36-S61; fecho S62-S65), com título assertion-evidence, corpo, fontes e narração por slide; 3 vídeos com molduras (V1 birra/corregulação, V2 brincar simbólico, V3 apontar/atenção compartilhada); ordem de corte para 60 min; apêndices A a E especificados (não construídos).
- `registro-crivos.md`: duplo crivo da fase 1-2 (aluno iniciante + expert cético), 35 achados, todos aplicados, com adendo das integrações posteriores.
- `fontes/`: F1 a F5 (deep research infantil) + F6 a F8 (transcrições brutas das aulas de adulto) + `fundacao/` com os 16 extratos FND e o glossário de arbitragem.
- Avaliação de qualidade feita a pedido do professor: versão pré-integração 78/100; versão atual ~90/100 (lacunas restantes listadas na seção 4).

**O que ficou pela metade (especificado mas não redigido/construído):**
- Os dois prontuários de Bento (S34 e S61): formato e conteúdo especificados; o TEXTO integral por extenso não foi redigido (nasce nas notas + roteiro, Camada 3).
- Apêndices A a E: escopo fechado, slides não construídos.
- Roteiro de estudo completo, apêndice anti-pergunta, versões .docx: não iniciados.
- Vídeos: spec pronta; clipes de acervo público não localizados/aprovados.
- **Mapa de reconciliação: NÃO foi produzido.** Não existe artefato próprio reconciliando o vocabulário dos relatórios infantis (F1 a F5) com o vocabulário do curso (G/FND) termo a termo. O que existe de reconciliação está embutido: as citações por slide na arquitetura e as arbitragens do glossário aplicadas (commit "Aplica glossario unificado"). Se o mapa for desejado como arquivo próprio, é tarefa da retomada.

## 2. Decisões vigentes (valem sobre qualquer texto anterior desta pasta)

1. **Glossário com precedência.** Hierarquia terminológica: `fontes/fundacao/00-GLOSSARIO-UNIFICADO-ARBITRAGEM.md` (G) arbitra tudo; abaixo dele os 16 extratos FND; abaixo, as transcrições brutas F6 a F8. Decisões A1 a A20 aprovadas; camada de escopo NÚCLEO/RODAPÉ/FORA define o que entra no deck.
2. **Nenhum selo de remissão.** O deck não renderiza selo/carimbo de remissão ("vocês já viram", números de apêndice em selo etc.). As marcações de remissão na arquitetura são ancoragem interna (para o construtor e para as notas do apresentador); a ponte com o adulto acontece na fala. Já aplicado no cabeçalho de `02-arquitetura-slides.md`; ao construir a Camada 3, não criar elemento visual de selo.
3. **Livro como fonte máxima.** Acima do glossário, a autoridade doutrinária final é o livro do professor, agora versionado nesta pasta: `livro-do-professor-COMPLETO.md` (versão final revisada, com os quatro apêndices; entregue pelo professor em 07/07/2026). Em conflito entre o livro e qualquer fonte (G, extratos FND, F1 a F8), o livro decide. Ele substitui como fonte qualquer arquivo parcial de partes ou blocos do livro que venha a circular. O fio guia declarado do curso segue sendo o Cheniaux (Manual de Psicopatologia), que não está anexado ao repositório; para desempates que dependam dele, confirmar a edição com o professor.
4. **Foco em descrição, não entrevista.** A aula ensina a descrever e registrar; perguntas só aparecem como meio de eliciar o dado. Apêndice D é de REGISTRO do risco/momento a sós.
5. **Dois formatos de registro (A20).** Exame psíquico narrativo (prosa, primeira pessoa, o "como") nos prontuários de Bento; súmula (lista, terceira pessoa, o "quê") no Apêndice B, ordenada pelos blocos da aula de estrutura como checagem de completude.
6. **Faixas: 0 a 5 e 6 a 12** internamente (criança de 5 anos pertence ao Ato 1). A capa como "0 a 5 e 6 a 12" segue [PROPOSTA] aguardando aprovação formal (título recebido dizia "5 a 12").
7. **Demais regras inegociáveis do template:** assertion-evidence (títulos recontam a aula sem som); sem travessão em nenhum texto; personagem Bento sempre normal; contracenas só de vigilância, nunca critério/tratamento; nunca vídeo de paciente do professor; sacrifícios da direção §6 (adolescente, critérios de transtorno, escalas, DC:0-5 como sistema, anamnese, testagem); duplo crivo com retropropagação antes de cada entrega; identidade visual Psiquiatria Prática (tokens da aula de desenvolvimento normal, em `aulas/desenvolvimento-normal-2-anos-puberdade/deck/gerar-deck.js`, confirmar na execução).

## 3. Pipeline de referência para o build (Camada 3)

Modelo pronto no repositório, da aula anterior: `aulas/desenvolvimento-normal-2-anos-puberdade/deck/` (pptxgenjs; `gerar-deck.js` + `gerar-satelites.js` + `gerar-aula-oficial.js` para o deck único com numeração contínua). Reusar o esqueleto e os tokens; verificação visual por render antes de entregar.

## 4. O que falta (ordem sugerida; itens do build principal já FEITOS em 07/07/2026)

~~Capa "0 a 5 e 6 a 12"~~ APROVADA. ~~Prontuários de Bento, notas de apresentador, deck oficial .pptx com apêndices, render de verificação~~ FEITOS (ver seção 1). O mapa de reconciliação F1-F5 × G/FND perdeu urgência: o livro passou a ser a fonte única do deck.

1. DUPLO CRIVO da entrega (aluno iniciante + expert cético) e retropropagação ao deck e à arquitetura v5.
2. Roteiro de estudo COMPLETO por extenso (prosa, para quem parte do zero, com autoteste e respostas), agora derivado do livro.
3. Apêndice anti-pergunta (respostas prontas), se o professor ainda o quiser além dos 4 apêndices do livro que já estão no deck.
4. Tudo também em .docx pronto para Google Docs.
5. Localizar/aprovar os 3 clipes de acervo público (V1 birra/corregulação, V2 brincar simbólico, V3 apontar) conforme inventário da v5.
6. Insumos que o professor pode fornecer quando existirem: capítulos do Cheniaux (fio guia, para desempates finos); IACAPAP A.5 pt.

## 5. Como retomar na sessão nova

Ler nesta ordem: este CHECKPOINT.md → `01-direcao.md` → `02-arquitetura-slides.md` → `fontes/fundacao/00-GLOSSARIO-UNIFICADO-ARBITRAGEM.md` (cabeçalho e Seções 0, 2 e 5) → `registro-crivos.md`. As fontes completas estão todas em `fontes/` (o Code lê pelo sistema de arquivos, sem limite de anexos). Trabalhar SEMPRE nesta branch; commit e push ao fim de cada fase.
