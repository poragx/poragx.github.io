(function(){
  // 3-dot mobile menu
  var dots=document.getElementById('dots'), menu=document.getElementById('menu');
  function setMenu(o){
    menu.classList.toggle('open',o);
    dots.setAttribute('aria-expanded',o);
    dots.setAttribute('aria-label',o?'Close menu':'Open menu');
  }
  dots.addEventListener('click',function(e){e.stopPropagation();setMenu(!menu.classList.contains('open'))});
  menu.addEventListener('click',function(e){if(e.target.closest('a'))setMenu(false)});
  document.addEventListener('click',function(e){if(!menu.contains(e.target))setMenu(false)});
  document.addEventListener('keydown',function(e){if(e.key==='Escape')setMenu(false)});
  window.addEventListener('resize',function(){if(innerWidth>860)setMenu(false)});

  // highlight the section you are currently viewing
  var ids=['home','about','skills','projects','contact'];
  var secs=ids.map(function(i){return document.getElementById(i)});
  var links=document.querySelectorAll('[data-s]');
  function spy(){
    var y=window.scrollY+110, cur='home';
    secs.forEach(function(s){if(s.offsetTop<=y)cur=s.id});
    if(window.innerHeight+window.scrollY>=document.documentElement.scrollHeight-4)cur='contact';
    links.forEach(function(a){a.classList.toggle('on',a.dataset.s===cur)});
  }
  window.addEventListener('scroll',spy,{passive:true});spy();

  // "More About Me" toggle
  var mb=document.getElementById('moreBtn'), more=document.getElementById('more');
  mb.addEventListener('click',function(){
    var o=more.classList.toggle('open');
    mb.setAttribute('aria-expanded',o);
    mb.querySelector('span').textContent=o?'Show Less':'More About Me';
  });

  // copy buttons (email, phone)
  document.querySelectorAll('.copy').forEach(function(b){
    b.addEventListener('click',function(){
      var t=b.dataset.copy, sp=b.previousElementSibling;
      function done(ok){b.textContent=ok?'Copied':'Select';setTimeout(function(){b.textContent='Copy'},1500)}
      function sel(){var r=document.createRange();r.selectNodeContents(sp);var s=getSelection();s.removeAllRanges();s.addRange(r);done(false)}
      try{navigator.clipboard.writeText(t).then(function(){done(true)},sel)}catch(e){sel()}
    });
  });
})();