# HANDOFF — Site Dr. Diego Alves Rosa

Documento de transferência entre sessões (remota → local). Leia junto com
`PROJETO.md`, `CLAUDE.md` e o `index.html`.

- **Repositório:** `didiego-rosa/calc`
- **Branch de trabalho:** `claude/desktop-site-changes-tlbp3y`  ← continue NELA
- **Site no ar:** https://drdiegorosa.com.br (HostGator/cPanel, pasta `drdiegorosa.com.br/`)
- **Stack:** HTML + CSS + JS vanilla, sem build. Páginas de tema usam
  `assets/paginas-tema.css` e `assets/paginas-tema.js`.

## Como retomar na sessão local
1. Abrir o repo já na branch `claude/desktop-site-changes-tlbp3y` (fazer `git pull`).
2. Para otimizar imagens: `pip install Pillow` (tem suporte a WebP).
3. Anexar/arrastar os arquivos das fotos (na sessão local isso costuma funcionar).

---

## Estado atual (tudo commitado e no GitHub)

**14 páginas, todas validadas** (0 travessões, 1 H1 cada, sem link quebrado,
JSON-LD válido, imagens com width/height):

- `index.html` (home), `agendar.html`, `sobre.html`, `blog.html`, `pinheiros.html`,
  `politica-de-privacidade.html`
- Clusters: `funcao-antes-do-rotulo.html`, `o-treino-e-seu-nao-dele.html`,
  `nao-e-preguica-e-dificuldade-de-comecar.html`, `birra-ou-tdah.html`,
  `como-saber-se-meu-filho-tem-tdah.html`, `quando-levar-ao-psiquiatra-infantil.html`,
  `remedio-para-tdah-faz-mal.html`, `existe-limite-de-medicacao-para-tdah.html`
- Apoio: `robots.txt`, `sitemap.xml` (14 URLs), `.htaccess`, `apple-touch-icon.png`

**Fases concluídas:** 0 (fundações/SEO técnico) · 1 (home repositionada) ·
2 (/agendar via WhatsApp) · 3 (clusters + pilares) · 4 (/sobre E-E-A-T) ·
5 (local /pinheiros) · 6 (blog + 1º artigo) · 7 (LGPD).

**Imagens:** WebP já gerado para as 5 fotos atuais; todas as `<img>` estão em
`<picture>` (WebP + fallback JPG), com `picture{display:contents}`. Total de
imagens caiu de ~838 KB para ~460 KB.

## Decisões travadas (NÃO refazer)
- **Sem travessão (—)** em nenhum texto. Vírgula/ponto/parênteses.
- Evitar "cara de IA". Voz: fala com a mãe exausta, valida antes de orientar.
- **Função antes do rótulo** + **o treino é seu, não dele** + **valida o medo de remédio**.
- **Um endereço só:** Acácia, Rua Oscar Freire 2250 cj 105, Pinheiros, SP, 05409-011.
  (Alphaville fica de fora por enquanto.)
- **Conversão = WhatsApp** com a secretária (sem formulário), mensagem pré-preenchida.
- **CRM 230017/SP · RQE 1391111**.
- **Avaliações:** só trechos sóbrios (CFM), SEM link "ver no Google" (perfil ainda
  não verificado).
- Nada de preço no site. Identificação CFM (médico, CRM, RQE) no rodapé de tudo.

## TAREFA EM ABERTO — trocar as fotos
Enviar os **arquivos originais** (não colar na conversa, anexar de verdade):

| Foto a enviar | Vira o arquivo (gerar .webp E .jpg) | Slot no site |
|---|---|---|
| Consultório, sorrindo de frente | `assets/dr-diego-alves-rosa-psiquiatra-infantil.*` | Hero |
| Recorte quadrado do rosto (dessa mesma) | `assets/dr-diego-alves-rosa-instagram.*` | Avatar |
| Instituto de Psiquiatria, em pé na placa (vertical) | `assets/dr-diego-alves-rosa-ipq-hc-fmusp.*` | Formação/Sobre |
| Uma calorosa (consultório 2 ou Instituto "verde") | `assets/dr-diego-alves-rosa-sobre.*` e/ou `assets/psiquiatria-infantil-orientacao-de-pais.*` | Sobre / Para famílias |

**Receita:** Pillow + WebP **q80**, lado maior **1200px**; gerar **WebP E JPG** com
o mesmo nome-base (o site usa `<picture>`, precisa dos dois). **Recortar o hero por
cima** para não aparecer as lombadas dos livros da estante. Avatar quadrado ~600px.
Validar, commitar, mostrar prévia antes de publicar.

## Pendências fora do código (com você)
1. **Verificar o Perfil no Google** (Maps) — maior alavanca de busca local; reativa
   também o link de avaliações.
2. **E-mail no domínio** `contato@drdiegorosa.com.br` — criar caixa + encaminhamento;
   hoje o site (e a política de privacidade) usa `diegoaalvesrosa@gmail.com`.
3. **Google Search Console** — cadastrar e enviar o `sitemap.xml`.
4. **geo (lat/long)** exato no schema da home (hoje sem geo; há comentário no código).

## Próximas fases sugeridas (quando quiser)
- Mais artigos de cauda longa: "remédio de TDAH vicia ou deixa zumbi",
  "se ele joga videogame horas, como tem TDAH", "culpa de mãe", etc.
- Escolher 1 das 3 headlines da `/agendar` (A ativa; B e C comentadas no código).

## 6 avaliações reais (Google) já catalogadas
Usar sempre em versão sóbria, sem superlativo, sem reiterar (CFM):
- Evandro R. (Local Guide), Talita P., Juciele S., Isabel V., marcella z., Marcelo F.

## Como publicar (HostGator)
cPanel → Gerenciador de Arquivos → pasta `drdiegorosa.com.br` → subir
`index.html`, as demais `.html`, `assets/` (com .jpg E .webp), `.htaccess`,
`robots.txt`, `sitemap.xml`, `apple-touch-icon.png`. Testar em janela anônima.
