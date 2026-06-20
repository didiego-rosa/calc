# Site — Dr. Diego Alves Rosa

Landing page de captação de pacientes do **Dr. Diego Alves Rosa**, psiquiatra da
infância e adolescência (São Paulo). Página única em HTML, com CSS e JS embutidos,
**sem build**. No ar em https://drdiegorosa.com.br.

## Estrutura
```
index.html            ← o site inteiro (fonte de verdade)
.htaccess             ← força HTTPS + cache (vai pro servidor)
robots.txt            ← libera indexação e aponta o sitemap
sitemap.xml           ← mapa do site (atualizar ao criar novas páginas)
apple-touch-icon.png  ← ícone para iPhone/iPad
assets/               ← fotos otimizadas (nomes com palavra-chave)
```

## Rodar localmente
```
python -m http.server 8137
```
Abra http://localhost:8137 .

## Publicar (HostGator)
1. cPanel → Gerenciador de Arquivos → pasta `drdiegorosa.com.br`.
2. Faça backup (compactar + baixar) antes de mexer.
3. Suba `index.html`, `.htaccess`, `robots.txt`, `sitemap.xml`,
   `apple-touch-icon.png` e a pasta `assets/`.
4. Teste em janela anônima.

## Analytics
Google Analytics 4 — ID em `window.GA_ID` (`G-8VKMK5ZCKR`). Cada clique de
WhatsApp/e-mail dispara o evento `generate_lead`.
