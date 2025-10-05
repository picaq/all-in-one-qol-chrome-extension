const hangQuotes = () => {
  const paragraphs = [...document.querySelectorAll('p')];
  // ~ 108 letters per line /3 = 36  ;  /4 = 27  ; /5 = 21
  let sliceDepth = 30;
  // sliceDepth = 20;
  sliceDepth = 15;
  // removes orphans
  const noBreak = s => s.slice(0, s.length-sliceDepth) + s.slice(-sliceDepth).replace(/ /g, ' ');
  let hang;

  // get computed font family
  const mid = Math.floor(paragraphs.length / 2);
  const family = getComputedStyle(paragraphs[mid-1])?.getPropertyValue("font-family")?.split(/, */)[0];
  console.log("Computed font family:", family);
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
      hang = "hang-nyt";
    break;
    case /.*merriweather.*/i.test(family):
      hang = "merriweather";
    break;
    case /.*breve ?text.*/i.test(family):
      hang = "brevetext";
    break;
    case /.*Publico ?Text.*/i.test(family):
      hang = "publicotext";
    break;
    case /.*tiempos ?text.*/i.test(family):
      hang = "tiempostext";
    break;
    case /.*dm ?sans.*/i.test(family):
      hang = "dmsans";
    break;
    case /.*GT ?Sectra.*/i.test(family):
      hang = "gtsectra";
    break;
    default:
      hang = "garamond";
      console.warn("No matching font family found, using default 'garamond' hang value.");
  }

  document.documentElement.style.setProperty('--hang', `var(--${hang})`);

  const partialHang = new Set(['A', 'o']);

  paragraphs.forEach( p => p.innerHTML = noBreak(p.innerHTML));
  paragraphs.forEach( p => {
                      if (p.innerText[0] === "“") { 
                        if (partialHang.has(p.innerText[1])) {
                          p.className = p.className + " single-quote";
                        } else {
                          p.className = p.className + " hanging-quote";
                        }
                      }
                  });
  paragraphs.forEach( p => p.innerHTML = p.innerHTML
                            .replace(/((\w+[^\w\s]?\s)(?=“\w+))(“\w+)/g, "<span class='before-quote'>$1</span><span class='hanging-quote'>$3</span>")
                            .replace(/((\w+[^\w\s]?\s)(?=‘\w+))(‘\w+)/g, "<span class='before-single-quote'>$1</span><span class='single-quote'>$3</span>")
                    );

}

setTimeout(() => {
  hangQuotes();
  console.log("Timeout executed, hanging quotes applied!");
}, 680);