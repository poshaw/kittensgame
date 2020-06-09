# kittensgame
Some JavaScripts to automate Bloodrizer's kittens game

# Bookmarklet
javascript:(function(){
  s=document.createElement('script');
  s.type='text/javascript';
  s.charset='utf-8';
  s.src='https://cdn.jsdelivr.net/gh/poshaw/kittensgame/code.js?_='+parseInt(Math.random()*99999999);
  document.body.appendChild(s);
})();

# Refresh jsdelivr
https://purge.jsdelivr.net/gh/poshaw/kittensgame/code.js
