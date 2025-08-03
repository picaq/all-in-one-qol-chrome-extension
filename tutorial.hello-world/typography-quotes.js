const paragraphs = [...document.querySelectorAll('p')];
// ~ 108 letters per line /3 = 36  ;  /4 = 27  ; /5 = 21
let sliceDepth = 30;
// sliceDepth = 20;
// removes orphans
const noBreak = s => s.slice(0, s.length-sliceDepth) + s.slice(-sliceDepth).replace(/ /g, ' ');
let hang;

// get computed font family
const family = getComputedStyle(paragraphs[0]).getPropertyValue("font-family").split(/, */)[0];
// set computed font family
switch (true) {
  case /.*garamond.*/i.test(family):
  case /.*BreveText.*/i.test(family):
    hang = "garamond";
  case /.*open ?sans.*/i.test(family):
  case /.*roboto.*/i.test(family):
    hang = "open";
  break;
  case /.*nyt-imperial.*/i.test(family):
  case /.*indy ?serif.*/i.test(family):
  case /.*georgia.*/i.test(family):
    hang = "hand-nyt";
  break;
  case /.*merriweather.*/i.test(family):
    hang = "merriweather";
  break;
  case /.*brevetext.*/i.test(family):
    hang = "brevetext";
  break;
  default:
    hang = "open";
    console.warn("No matching font family found, using default 'open' hang value.");
}

document.documentElement.style.setProperty('--hang', `var(--${hang})`);

paragraphs.forEach( p => p.innerHTML = noBreak(p.innerHTML));
paragraphs.forEach( p => p.innerText[0] === "“" ? 
                         p.className = p.className + " hanging-quote" : "");
paragraphs.forEach( p => p.innerHTML = p.innerHTML
                          .replace(/((\w+[^\w\s]?\s)(?=“\w+))(“\w+)/g, "<span class='before-quote'>$1</span><span class='hanging-quote'>$3</span>")
                          .replace(/((\w+[^\w\s]?\s)(?=‘\w+))(‘\w+)/g, "<span class='before-single-quote'>$1</span><span class='single-quote'>$3</span>")
                  );
