# /goal — construir uma aula completa (template reutilizável)

Copie o bloco abaixo, preencha os colchetes e envie com os PDFs da fonte anexados.
O que estiver marcado como (opcional) pode ser deixado para o Claude propor.

---

/goal Construir a aula "[TÍTULO DA AULA]" de ponta a ponta, no meu pipeline de 3 camadas, com duplo crivo antes de qualquer entrega final.

## CONTEXTO
- Público: [ex.: residentes de psiquiatria, plataforma Psiquiatria Prática]
- Duração-alvo: [ex.: 60 min] (dimensione o deck para isso e proponha ordem de corte)
- Posição no currículo: [o que veio antes, o que vem depois, onde esta aula termina]
- Fonte primária: os PDFs anexos ([livro, capítulos]). Leia-os de verdade (agentes em paralelo) e ancore o conteúdo com página. Marque como [EXT] tudo que vier de fora da fonte.

## DECISÕES FECHADAS (a direção obedece a isto, não o contrário)
- Tese unificadora: [a ideia única que organiza a aula inteira; ex.: "a transferência do volante"]
- Estrutura: [ex.: 4 atos por idade, corte por X e não por Y]
- Dispositivos: [ex.: personagem única atravessando a aula; pergunta de tração entre blocos; contracena de vigilância em vez de lista de transtornos; vídeos com moldura antes/depois; fronteira final ancorada em evento, não em idade]
- Sacrifícios: [o que fica de fora de propósito]
- (opcional) Se eu não fechar algo acima, proponha e marque como PROPOSTA para eu aprovar no checkpoint.

## REGRAS INEGOCIÁVEIS
- Slides em assertion-evidence: título é frase completa com a tese; a sequência de títulos reconta a aula sem som; detalhe fino vai para documento de apoio, nunca para o slide.
- Nunca vídeo de paciente meu; só acervo público, com especificação do que o clipe precisa conter.
- Contracenas orientam vigilância ("o que deveria tirar o sono"), nunca ensinam critérios/tratamento.
- Sem travessão em nenhum texto. Voz: simples, direta, valida antes de orientar.
- Identidade visual: [tokens/arquivo anexo, ou "declaro na execução"]. Liberdade criativa calculada é bem-vinda, desde que declarada.

## PIPELINE E CHECKPOINTS
1. Camada 1: documento de direção (transformação do público, tese, estrutura, dispositivos).
2. Camada 2: arquitetura slide a slide. CHECKPOINT comigo: revisar a espinha de títulos ANTES do deck.
3. Camada 3: deck .pptx gerado por código (pptxgenjs), com notas de apresentador em cada slide (scripts, ressalvas e apostas na nota, não no slide). Verificação visual por render antes de entregar.
4. Satélites: módulos de aprofundamento/apêndice para os pontos que a aula comprime + apêndice anti-pergunta (respostas prontas para perguntas prováveis).
5. DUPLO CRIVO obrigatório antes de cada entrega final: um agente "aluno iniciante" (clareza, jargão, exemplos, anotação errada provável) e um agente "expert cético" (imprecisão, quantificadores sem lastro, ressalvas ausentes, o que viraria erro em prova/parecer). Aplicar as correções e RETROPROPAGAR: o que o crivo corrigir num material vale para todos os outros.

## ENTREGÁVEIS (tudo versionado no repositório, branch de trabalho)
- 01 direção (.md) · 02 arquitetura (.md) · deck oficial .pptx (aula + apêndice, numeração contínua, remissões) · roteiro de estudo COMPLETO com o conteúdo por extenso para quem parte do zero (prosa, experimentos narrados, erros a não cometer, autoteste com respostas) · tudo também em .docx pronto para Google Docs.
- (opcional) Derivados NotebookLM: aula fatiada em PDFs autocontidos por bloco + PDF de identidade visual + comando de slides + prompts de podcast por episódio.

## COMO TRABALHAR
- Não me pergunte o que você pode decidir bem; decida, marque a decisão e siga. Me chame só nos checkpoints e em escolha que mude o escopo.
- Leia a fonte com agentes em paralelo; se um agente falhar por filtro, relance com outro modelo.
- Ao final de cada fase: commit e push. Ao final de tudo: resumo do que mudou e por quê, com os achados dos crivos.

---

## Dicas de uso (fora do prompt)
1. O que mais economiza retrabalho é fechar TESE e ESTRUTURA antes de começar. Uma frase de tese boa vale mais que dez instruções de formato.
2. Anexe os PDFs da fonte na primeira mensagem; sem fonte anexa o conteúdo nasce de memória e o crivo derruba depois.
3. Se quiser algo diferente do padrão (sem personagem, sem vídeos, aula curta), diga no bloco DECISÕES; o template aguenta.
4. Guarde os tokens de identidade visual num arquivo e anexe; "mesma paleta de sempre" não é instrução executável.
5. Este template funciona ainda melhor como skill (skill-creator) para invocar por nome.
