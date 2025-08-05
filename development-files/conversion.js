(()=>{
[...document.querySelectorAll('a[href$="mp3"], a[href$="wav"]')]
  .forEach( a => {
    let audio = document.createElement("audio"); 
        a.appendChild(audio); audio.src = a.href; 
        a.setAttribute('onmouseover', `document.querySelector('audio[src="${a.href}"]').play()`); 
        a.setAttribute('onfocus', `document.querySelector('audio[src="${a.href}"]').play()`); 
        a.setAttribute('tabindex', 0);
        a.removeAttribute('target'); 
        a.removeAttribute('href');
  } );
})();
