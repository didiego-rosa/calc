# -*- coding: utf-8 -*-
# Fatia a aula em 7 PDFs autocontidos para servir de fontes no NotebookLM.
# Estilo dos PDFs: paleta Psiquiatria Prática (fundo claro).
import re, os, subprocess, html as H

BASE = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.dirname(BASE)
OUT = BASE

d01 = open(f"{SRC}/01-direcao.md", encoding="utf-8").read()
d02 = open(f"{SRC}/02-arquitetura-slides.md", encoding="utf-8").read()
d03 = open(f"{SRC}/03-documento-de-estudo.md", encoding="utf-8").read()

def split_h2(md):
    """divide por '## ' preservando o preâmbulo em '_pre'"""
    parts, cur, key = {}, [], "_pre"
    for ln in md.splitlines():
        if ln.startswith("## "):
            parts[key] = "\n".join(cur); cur = []; key = ln[3:].strip()
        else:
            cur.append(ln)
    parts[key] = "\n".join(cur)
    return parts

s02 = split_h2(d02)
s03 = split_h2(d03)

def k(d, frag):
    for key in d:
        if frag in key: return d[key]
    raise KeyError(frag)

# cenas da Alice divididas
cenas_raw = k(s03, "5. Cenas")
def cena(marker):
    m = re.search(r"(\*\*" + marker + r".*?)(?=\n\*\*|\Z)", cenas_raw, re.S)
    return m.group(1).strip()
regua = cena("A régua escondida")
apres = cena("Apresentação")
c1, c2, c3 = cena("Cena 1"), cena("Cena 2"), cena("Cena 3")
c4, c5 = cena("Cena 4"), cena("Cena 5")

# tabela de vídeos filtrada por ato
vid_all = k(s03, "6. Vídeos")
def vids(ids):
    lines = vid_all.splitlines()
    out = [l for l in lines if not l.strip().startswith("|")]
    tbl = [l for l in lines if l.strip().startswith("|")]
    head = tbl[:2]
    rows = [l for l in tbl[2:] if any(l.strip().startswith(f"| {i}") for i in ids)]
    return "\n".join(out[:2] + head + rows)

# blocos de slides por ato
b0, a1, a2 = k(s02, "BLOCO 0"), k(s02, "ATO 1"), k(s02, "ATO 2")
a3, a4, fech = k(s02, "ATO 3"), k(s02, "ATO 4"), k(s02, "FECHO (S58")
pre02 = s02["_pre"]

CTX = ("*Fonte-parte da aula “Desenvolvimento normal: dos 2 anos ao início da puberdade” "
       "(Dr. Diego Alves Rosa, Psiquiatria Prática, residentes de psiquiatria). "
       "Tese unificadora: o período é a história da transferência do volante da regulação "
       "(ambiente/pais → linguagem → funções executivas → grupo de pares). "
       "Slides em assertion-evidence: título é frase completa; o corpo traz só a evidência.*")

partes = []

partes.append(("Parte 0 - Direcao e visao geral", f"""# Parte 0 · Direção e visão geral da aula

{CTX}

{d01}

## Regras e elementos estruturais dos slides (Camada 2)
{pre02}

## Abertura da aula (slides S1-S4)
{b0}

## Apresentação da personagem Alice
{regua}

{apres}

## Plano de tempo
{k(s03, "10. Plano de tempo")}
"""))

partes.append(("Parte 1 - Ato 1 (2-3 anos) O corpo que ganha simbolo", f"""# Parte 1 · Ato 1 (2-3 anos): o corpo que ganha símbolo

{CTX}

## Slides do Ato 1 (S5-S19)
{a1}

## Conteúdo de estudo do Ato 1
{k(s03, "1. ATO 1")}

## Cena da Alice neste ato
{c1}

## Vídeos deste ato
{vids(["V1", "V2", "V3"])}
"""))

partes.append(("Parte 2 - Ato 2 (3-5 anos) A mente que descobre outras mentes", f"""# Parte 2 · Ato 2 (3-5 anos): a mente que descobre outras mentes

{CTX}

## Slides do Ato 2 (S20-S32)
{a2}

## Conteúdo de estudo do Ato 2
{k(s03, "2. ATO 2")}

## Cena da Alice neste ato
{c2}

## Vídeos deste ato
{vids(["V4", "V5"])}
"""))

partes.append(("Parte 3 - Ato 3 (5-7 anos) A grande virada", f"""# Parte 3 · Ato 3 (5-7 anos): a grande virada

{CTX}

## Slides do Ato 3 (S33-S46)
{a3}

## Conteúdo de estudo do Ato 3
{k(s03, "3. ATO 3")}

## Cena da Alice neste ato
{c3}

## Vídeos deste ato
{vids(["V6", "V7", "V8"])}
"""))

partes.append(("Parte 4 - Ato 4 (7 anos a puberdade) O eu comparado", f"""# Parte 4 · Ato 4 (7 anos ao início da puberdade): o eu comparado

{CTX}

## Slides do Ato 4 (S47-S57)
{a4}

## Conteúdo de estudo do Ato 4
{k(s03, "4. ATO 4")}

## Cenas da Alice neste ato
{c4}

{c5}

## Vídeos deste ato
{vids(["V9"])}
"""))

partes.append(("Parte 5 - Fecho vigilancia e apoio", f"""# Parte 5 · Fecho, vigilância e material de apoio transversal

{CTX}

## Slides de fecho (S58-S60)
{fech}

## A régua escondida das cenas (revelação do fecho)
{regua}

## Tabela-síntese de vigilância (take-home)
{k(s03, "9. Tabela")}

## Ressalvas de honestidade intelectual
{k(s03, "7. Ressalvas")}

## Perguntas prováveis de residentes
{k(s03, "8. Perguntas")}

## Referências
{k(s03, "11. Referências")}
"""))

partes.append(("Parte 6 - Identidade visual Psiquiatria Pratica", f"""# Parte 6 · Identidade visual Psiquiatria Prática (paleta e regras para qualquer peça derivada)

*Guia de estilo para reaproveitar esta aula em novos formatos (slides, infográficos, vídeos, handouts) mantendo a identidade da plataforma Psiquiatria Prática, versão fundo claro para aulas de residentes.*

## Paleta (hex)

| Token | Hex | Papel |
|-------|-----|-------|
| roxoProfundo | #56365F | âncora: títulos, corpo de texto, fundo de divisor/capa |
| roxoMedio | #8A6594 | subtítulos, bordas, numeração, legendas (nunca abaixo de 14pt) |
| lavanda | #DDC9E3 | fundo de box de destaque (área pequena/média) |
| lavandaClara | #EDE2F0 | zebra de tabela, blocos grandes, respiro |
| offWhite | #F6EFF2 | fundo de página padrão (nunca branco puro no fundo) |
| branco | #FFFFFF | exclusivo para cards sobre o offWhite |
| coral | #E96030 | acento pleno: formas, números grandes, marcadores, alertas |
| coralTexto | #B84A1F | ênfase em texto corrido (versão legível do coral) |
| dourado | #ECB841 | preenchimento secundário (ícones, badges, marcos de timeline) |

## Regras inegociáveis

1. Dourado NUNCA vira texto: só preenchimento (ícones, marcadores, badges).
2. Coral e dourado nunca juntos em peso cheio no mesmo elemento.
3. UM acento quente forte por slide: se tudo destaca, nada destaca.
4. Fundo de página é offWhite, nunca branco puro; branco só em cards.
5. roxoMedio como texto só em tamanho 14pt ou maior.
6. Coral pleno (#E96030) nunca em texto corrido: usar coralTexto (#B84A1F).

## Tipografia e composição

- Títulos: serifa (Georgia ou equivalente), bold, no roxoProfundo.
- Corpo: sem serifa (Calibri ou equivalente), roxoProfundo.
- Formato assertion-evidence: o título de cada slide é uma FRASE COMPLETA que carrega a tese; o corpo traz apenas a evidência (imagem, gráfico, esquema, um dado). A sequência de títulos, lida sozinha, deve recontar a narrativa inteira.
- Divisor escuro (fundo roxoProfundo, texto offWhite, filete dourado) a cada 10-15 slides como respiro; nesta aula, os divisores são as perguntas de tração no fecho de cada ato.
- Slides de vídeo: fundo escuro (modo cinema), botão de play em coral, especificação do clipe em offWhite.
- Vinheta clínica (cenas da Alice): fundo lavandaClara, filete coral na margem esquerda, texto em serifa itálica.
- Tabelas: cabeçalho roxoProfundo com texto offWhite; linhas alternando branco e lavandaClara; borda roxoMedio 0,5pt.
- Números grandes/estatísticas: coral, um por slide, com legenda em roxoMedio.
- Badges (faixa etária, ato, tipo de vídeo): fundo dourado com texto roxoProfundo.
- Máximo 3 cores simultâneas no mesmo elemento gráfico; a hierarquia deve sobreviver em escala de cinza.

## Elementos recorrentes desta aula (para manter em versões derivadas)

- Painel do volante: diagrama PAIS → LINGUAGEM → FREIO INTERNO → GRUPO, com o segmento já transferido em dourado, o atual em coral e os pendentes em lavanda.
- Chip de ato no canto superior direito (badge dourado): "ATO 1 · 2-3 ANOS" etc.
- Contracenas de vigilância: card branco com borda coral 2pt e selo "O QUE DEVERIA TE TIRAR O SONO" em coral.
- Apostas da plateia: selo coral "APOSTA DA PLATEIA" antes de revelações.
"""))

# ---------------------------------------------------------------- md -> html
BOLD = re.compile(r"\*\*(.+?)\*\*")
ITAL = re.compile(r"(?<!\*)\*([^*\n]+)\*(?!\*)")

def inline(t):
    t = H.escape(t, quote=False)
    t = BOLD.sub(r"<strong>\1</strong>", t)
    t = ITAL.sub(r"<em>\1</em>", t)
    return t

def md2html(md):
    out, i, lines = [], 0, md.splitlines()
    inlist = None
    def close():
        nonlocal inlist
        if inlist: out.append(f"</{inlist}>"); inlist = None
    while i < len(lines):
        ln = lines[i].rstrip(); s = ln.strip()
        if s.startswith("|"):
            close()
            tbl = []
            while i < len(lines) and lines[i].strip().startswith("|"):
                tbl.append(lines[i].strip()); i += 1
            rows = [r for r in tbl if not re.match(r"^\|[\s\-:|]+\|$", r)]
            out.append("<table>")
            for ri, r in enumerate(rows):
                cells = [c.strip() for c in r.strip("|").split("|")]
                tag = "th" if ri == 0 else "td"
                out.append("<tr>" + "".join(f"<{tag}>{inline(c)}</{tag}>" for c in cells) + "</tr>")
            out.append("</table>")
            continue
        m = re.match(r"^(#{1,4})\s+(.*)$", s)
        if m:
            close(); lvl = len(m.group(1))
            out.append(f"<h{lvl}>{inline(m.group(2))}</h{lvl}>")
        elif s.startswith("- "):
            if inlist != "ul": close(); out.append("<ul>"); inlist = "ul"
            out.append(f"<li>{inline(s[2:])}</li>")
        elif re.match(r"^\d+\.\s", s):
            if inlist != "ol": close(); out.append("<ol>"); inlist = "ol"
            item = re.sub(r"^\d+\.\s+", "", s)
            out.append(f"<li>{inline(item)}</li>")
        elif s == "---":
            close(); out.append("<hr>")
        elif s == "":
            close()
        else:
            close(); out.append(f"<p>{inline(s)}</p>")
        i += 1
    close()
    return "\n".join(out)

CSS = """
@page { margin: 16mm 15mm; }
body { background: #F6EFF2; color: #56365F; font-family: 'DejaVu Sans', Calibri, sans-serif;
       font-size: 10.5pt; line-height: 1.45; }
h1 { font-family: Georgia, serif; font-size: 19pt; line-height: 1.2; border-bottom: 3px solid #E96030;
     padding-bottom: 6px; }
h2 { font-family: Georgia, serif; font-size: 14pt; margin-top: 20px; color: #56365F;
     border-left: 5px solid #E96030; padding-left: 8px; }
h3 { font-family: Georgia, serif; font-size: 11.5pt; color: #8A6594; margin-top: 14px; }
strong { color: #B84A1F; }
em { color: #8A6594; }
table { border-collapse: collapse; width: 100%; margin: 8px 0; font-size: 9pt; }
th { background: #56365F; color: #F6EFF2; padding: 4px 6px; text-align: left; }
td { border: 0.5pt solid #8A6594; padding: 4px 6px; background: #FFFFFF; vertical-align: top; }
tr:nth-child(odd) td { background: #EDE2F0; }
ul, ol { margin: 4px 0 8px 18px; padding: 0; }
li { margin-bottom: 3px; }
hr { border: none; border-top: 1px solid #DDC9E3; margin: 12px 0; }
p { margin: 5px 0; }
"""

CHROME = "/opt/pw-browsers/chromium"
for nome, md in partes:
    html_doc = f"<!doctype html><html><head><meta charset='utf-8'><style>{CSS}</style></head><body>{md2html(md)}</body></html>"
    hpath = f"{OUT}/{nome}.html"
    ppath = f"{OUT}/{nome}.pdf"
    open(hpath, "w", encoding="utf-8").write(html_doc)
    subprocess.run([CHROME, "--headless", "--disable-gpu", "--no-sandbox",
                    f"--print-to-pdf={ppath}", "--no-pdf-header-footer", hpath],
                   check=True, capture_output=True)
    os.remove(hpath)
    print("OK", nome + ".pdf")
