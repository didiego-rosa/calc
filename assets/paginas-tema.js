/* JS compartilhado das páginas de tema — mesmo comportamento da home */

// Medição de leads (Google Analytics 4)
window.GA_ID = 'G-8VKMK5ZCKR';
(function(){
  var id = window.GA_ID;
  if(!id || id.indexOf('G-')!==0 || id==='G-XXXXXXXXXX') return;
  var s=document.createElement('script'); s.async=true;
  s.src='https://www.googletagmanager.com/gtag/js?id='+id; document.head.appendChild(s);
  window.dataLayer=window.dataLayer||[]; window.gtag=function(){dataLayer.push(arguments);};
  gtag('js', new Date()); gtag('config', id);
})();

// Alternância de tema
function flipTema(){
  var root=document.documentElement;
  var claro=root.getAttribute('data-theme')==='light';
  if(claro){root.removeAttribute('data-theme');try{localStorage.setItem('tema','escuro')}catch(e){}}
  else{root.setAttribute('data-theme','light');try{localStorage.setItem('tema','claro')}catch(e){}}
  atualizaLabel();
}
function atualizaLabel(){
  var claro=document.documentElement.getAttribute('data-theme')==='light';
  document.querySelectorAll('.theme-btn').forEach(function(b){b.textContent=claro?'Modo escuro':'Modo claro'});
}
atualizaLabel();

// Sombra no menu ao rolar
(function(){var n=document.querySelector('nav');if(!n)return;function s(){n.classList.toggle('scrolled',window.scrollY>8);}addEventListener('scroll',s,{passive:true});s();})();

// Botão flutuante de WhatsApp: aparece depois de rolar um pouco
(function(){
  var f=document.getElementById('waFloat'); if(!f)return;
  function upd(){ f.classList.toggle('show', window.scrollY>400); }
  addEventListener('scroll',upd,{passive:true}); upd();
})();

// Mede cada clique de lead (WhatsApp/e-mail): canal + de onde veio
(function(){
  document.addEventListener('click',function(e){
    var a=e.target.closest('a'); if(!a) return;
    var href=a.getAttribute('href')||'';
    var canal = href.indexOf('wa.me')>-1 ? 'whatsapp' : (href.indexOf('mailto:')===0 ? 'email' : null);
    if(!canal) return;
    var local = a.id==='waFloat' ? 'botao_flutuante'
      : (a.closest('footer') ? 'rodape'
      : ((a.closest('section,header,main')||{}).id || 'pagina'));
    if(typeof gtag==='function'){ gtag('event','generate_lead',{channel:canal, location:local}); }
  });
})();

// Aviso de cookies (LGPD)
function aceitaCookies(){try{localStorage.setItem('cookieok','1')}catch(e){}var b=document.getElementById('cookieBanner');if(b)b.classList.remove('show');}
(function(){try{if(localStorage.getItem('cookieok'))return;}catch(e){}var b=document.getElementById('cookieBanner');if(b)setTimeout(function(){b.classList.add('show')},800);})();
