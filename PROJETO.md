# PROJETO — Site Dr. Diego Alves Rosa

Documento único de transferência. Reúne tudo que é preciso para entender, rodar,
publicar e continuar este projeto em qualquer lugar (outro computador, outro
desenvolvedor ou outra IA). Se você está pegando o projeto agora, **leia este arquivo
inteiro + o `index.html`** — são a fonte de verdade.

---

## 1. O que é
Site de uma página (landing page) para captação de pacientes do **Dr. Diego Alves Rosa**,
médico psiquiatra da infância e adolescência em São Paulo. Objetivo único: transformar
visitante em agendamento (WhatsApp/e-mail).

- **No ar em:** https://drdiegorosa.com.br
- **Princípio de design:** "alívio antes de impressionar" — acolher uma mãe exausta e
  desconfiada, não exibir um site chamativo.
- **Identidade visual:** "Verde Brasa" (base creme/verde-petróleo, acento brasa,
  tipografia Fraunces + Nunito Sans).

## 2. Stack (sem build)
- HTML5 único (`index.html`) com **CSS embutido** e **JavaScript vanilla** (tema, animação
  ao rolar, Analytics e botão flutuante). Não há framework, npm, nem etapa de build.
- Fontes via Google Fonts (Fraunces + Nunito Sans).
- Para editar: basta abrir o `index.html` num editor de texto. É a fonte de verdade.

## 3. Estrutura de arquivos
```
site-dr-diego/
├── index.html                 ← O SITE INTEIRO (fonte de verdade)
├── .htaccess                  ← Config Apache (força HTTPS) — vai junto no servidor
├── assets/
│   ├── foto-hero.jpg          ← usadas no site (otimizadas p/ web, máx 1300px)
│   ├── foto-sobre.jpg
│   ├── foto-formacao.jpg
│   ├── foto-maes.jpg
│   ├── foto-instagram.jpg
│   ├── (IMG_*.JPEG, Psiquiatria*.JPEG)  ← ORIGINAIS das fotos (não vão pro servidor)
│   └── LEIA-ME.txt            ← qual foto vai em cada lugar
├── README.md                  ← como rodar e publicar (resumo)
├── PROJETO.md                 ← este arquivo (transferência completa)
├── CLAUDE.md                  ← notas de estado para a IA
├── Dr-Diego-Alves-Rosa.html   ← versão PORTÁTIL (1 arquivo só, fotos embutidas em base64)
├── drdiegorosa-site.zip       ← PACOTE DE DEPLOY (só o necessário p/ subir)
└── previa-claro.png / previa-escuro.png  ← capturas de referência
```
**Para publicar, só importam:** `index.html`, `.htaccess` e `assets/foto-*.jpg`.
O resto é apoio (originais, docs, versão portátil, prévias).

## 4. Como rodar localmente
Na pasta do projeto, suba um servidor estático simples:
```
python -m http.server 8137
```
Abra http://localhost:8137 . Também funciona abrindo `index.html` com duplo-clique
(o servidor é só mais fiel).

## 5. Como publicar / atualizar (HostGator)
> Particularidade desta conta: o site **não** é servido de `public_html`, e sim da pasta
> **`drdiegorosa.com.br`** (em `/home2/pqdieg34/drdiegorosa.com.br`). Confirme em
> cPanel → Domínios → "Document Root".

1. cPanel → **Gerenciador de Arquivos** → entre na pasta `drdiegorosa.com.br`.
2. **Backup:** selecione tudo → Compactar → Baixar (guarde antes de mexer).
3. Suba o `drdiegorosa-site.zip` (ou os arquivos soltos) → **Extrair** → substituir.
4. Teste em https://drdiegorosa.com.br (janela anônima).

DNS e SSL (Let's Encrypt) já estão configurados — não precisa mexer.
Para uma atualização simples (ex.: trocar um texto), basta subir o `index.html` por cima.

## 6. Sistema visual (tokens CSS)
Definidos no topo do `<style>` em `index.html`, via custom properties. Resumo:

| Token | Claro (padrão) | Escuro |
|---|---|---|
| `--bg` (fundo) | `#FAF5EB` | `#15302A` |
| `--bg-elev` (cards) | `#FFFCF4` | `#1E3D34` |
| `--text-strong` (títulos) | `#15302A` | `#FAF5EB` |
| `--accent` (brasa, CTAs) | `#D75F28` | `#EA7338` |
| `--kicker` (rótulos, dourado) | `#9A7430` | `#CDA04E` |
| `--maxw` (largura do conteúdo) | `1320px` | (mesma) |

- **Fontes:** Fraunces (títulos/display, serifada) + Nunito Sans (corpo/botões).
- **Tamanhos fluidos:** títulos e respiros usam `clamp()` com `vw`, então escalam com a tela.
- **Decisão de marca:** mantida a paleta brasa #EA7338/#D75F28 + kickers dourados
  (NÃO o #B84E20 que aparecia no briefing original).

## 7. Comportamento de tema
- **Padrão = CLARO para todos** (não segue mais o `prefers-color-scheme`).
- Botão no topo alterna para escuro; a escolha é salva em `localStorage`.
- Aceita `?tema=claro` / `?tema=escuro` na URL.
- A seção **"Para famílias" é sempre escura** (`#15302A`), de propósito, mesmo no claro —
  banda intencional no meio do site.

## 8. Seções (na ordem) e o funil
Hero → Atendimentos (chips) → Sobre → Formação → **Para famílias** (banda escura/emocional)
→ Instagram (card de perfil) → **FAQ** → **Como funciona** (3 passos) → Contato → Rodapé.
Há também um **botão flutuante de WhatsApp** que some no hero e dentro do Contato.
Lógica do funil: emoção → confiança → tira objeção → mostra que é simples → CTA.

## 9. Dados do profissional (usados no site)
- Nome: **Dr. Diego Alves Rosa** · Instagram: **@diegoaalvesrosa**
- CRM **230017/SP** · RQE **139111**
- WhatsApp: **5511910135794** · E-mail: **diegoaalvesrosa@gmail.com**
- Local: **Acácia · Psicologia & Psiquiatria** — Rua Oscar Freire, 2250, cj. 105, São Paulo/SP
- Formação: residência na Santa Casa de SP; subespecialização no IPq-HC-FMUSP;
  voluntário no Ambulatório de Transtornos do Neurodesenvolvimento (IPq-HC-FMUSP).
- **Atendimento:** presencial (crianças, adolescentes e adultos); **online a partir de 15 anos**.
- **Pagamento:** particular, com nota para reembolso. Valor não exposto no site (vai pro
  WhatsApp — decisão: transparência no modelo, número na conversa).

## 10. Analytics (medição de leads)
- **Google Analytics 4**, ID **`G-8VKMK5ZCKR`** (propriedade "drdiego" / drdiegorosa.com.br).
- No `index.html`, a linha `window.GA_ID = 'G-8VKMK5ZCKR'` liga a medição. Trocar o ID =
  trocar esse valor.
- Cada clique em WhatsApp/e-mail dispara o evento **`generate_lead`** com `channel`
  (whatsapp/email) e `location` (hero, contato, rodape, faq, botao_flutuante…).
- Conferir em GA → Relatórios → Tempo real.

## 11. SEO / compartilhamento
- `<title>` e `meta description` focados em "psiquiatra infantil São Paulo, TDAH".
- **Open Graph** + `canonical` com URL absoluta `https://drdiegorosa.com.br`.
- **JSON-LD** `Physician` com endereço (ajuda busca local / Google Maps).
- Favicon SVG embutido (verde base + "D" brasa).
- `og:image` aponta para `https://drdiegorosa.com.br/assets/foto-hero.jpg`.

## 12. Decisões importantes (para não refazer discussões)
- **Sem disclaimer de CFM** no site (decisão do briefing).
- **Sem depoimentos de pacientes** (vedado pela ética médica BR) — prova social via
  formação e Instagram.
- Copy revisada contra a "voz do Diego" (público: mãe exausta, linguagem simples,
  validação antes de orientação, sem culpar).
- O parágrafo do "Sobre" foi reescrito para **não** afirmar que "quase nunca é falha de
  criação" (clinicamente frágil); agora foca em "comportamento tem função → entender antes
  de corrigir → família como parte da solução".
- Serviços confirmados como do próprio Diego: psiquiatria, treinamento parental,
  psicoterapia individual e familiar.

## 13. Pendências / melhorias opcionais (não aplicadas)
- Aviso de cookies (LGPD) — recomendado, já que o GA usa cookies.
- `preload` da foto do hero (abre mais rápido).
- `robots.txt` + `sitemap.xml` (indexação).
- Sombra no menu ao rolar; `apple-touch-icon`.
- **Fora do site:** criar o **Perfil da Empresa no Google** (Maps/busca) — maior alavanca
  para ser encontrado por quem procura psiquiatra infantil na região.

## 14. Levar para um repositório Git (ex.: GitHub)
Na pasta do projeto:
```
git init
git add index.html .htaccess assets/foto-*.jpg README.md PROJETO.md CLAUDE.md
git commit -m "Site Dr. Diego Alves Rosa"
```
Crie um repositório vazio no GitHub e siga as instruções de "push an existing repository".
Sugestão: **não** versione os arquivos grandes/gerados (originais das fotos,
`drdiegorosa-site.zip`, `Dr-Diego-Alves-Rosa.html`, prévias). Um `.gitignore` com:
```
assets/IMG_*
assets/Psiquiatria*
drdiegorosa-site.zip
Dr-Diego-Alves-Rosa.html
previa-*.png
```

## 15. Continuar em outra IA / outro dev
Entregue **este `PROJETO.md` + o `index.html`**. Com os dois, dá para entender o projeto
inteiro e seguir editando. Se for outra IA de código, peça para ela ler o `index.html`
inteiro antes de mexer (é um arquivo só, com CSS e JS embutidos).

---

## 16. Atualizações aplicadas (jun/2026)
Mudanças já feitas neste repositório (parte de código do "Plano de Melhoria"):

- **Texto de bastidor removido:** saíram os `ph-label` ("salve a foto como
  assets/...") que apareciam junto às imagens.
- **Imagens renomeadas** (nomes com palavra-chave) e com **alt** descritivo:
  - `foto-hero.jpg` → `dr-diego-alves-rosa-psiquiatra-infantil.jpg`
  - `foto-sobre.jpg` → `dr-diego-alves-rosa-sobre.jpg`
  - `foto-formacao.jpg` → `dr-diego-alves-rosa-ipq-hc-fmusp.jpg`
  - `foto-maes.jpg` → `psiquiatria-infantil-orientacao-de-pais.jpg`
  - avatar do Instagram → `dr-diego-alves-rosa-instagram.jpg`
- **LGPD:** aviso de cookies (banner "Entendi", informativo).
- **Desempenho:** `preload` da foto do hero + `loading="lazy"` nas demais.
- **apple-touch-icon.png** e **sombra no menu ao rolar**.
- **SEO técnico:** `robots.txt`, `sitemap.xml` e **schema FAQPage** (FAQ vira
  pergunta/resposta para o Google).

### Pendente (decisão sua / fora do código)
- **E-mail no domínio** `contato@drdiegorosa.com.br`: criar a caixa e o
  encaminhamento na hospedagem ANTES de trocar o endereço no site (hoje continua
  `diegoaalvesrosa@gmail.com` para não quebrar o contato).
- **6 páginas de tema** (birra×TDAH, "meu filho tem TDAH?", quando levar ao
  psiquiatra, remédio faz mal?, sinais de autismo, ansiedade infantil) — escrever
  uma a uma e adicionar ao `sitemap.xml`.
- **Google Meu Negócio** e **Search Console**.
