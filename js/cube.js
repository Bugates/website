(function(){
  const letter = (document.body.dataset.letter || "M").toUpperCase();
  const mount = document.getElementById("cubeMount");
  if(!mount) return;

  const COLORS = {
    base: "#ffffff",
    letter: "#2563eb"
  };

  const LETTERS = {
    M:[
      1,0,0,0,1,
      1,1,0,1,1,
      1,0,1,0,1,
      1,0,0,0,1,
      1,0,0,0,1
    ]
  };

  function el(tag, cls){
    const e=document.createElement(tag);
    if(cls) e.className=cls;
    return e;
  }

  function face(pattern){
    const f=el("div","face");
    for(let i=0;i<25;i++){
      const s=el("div","sticker");
      if(pattern && pattern[i]) s.style.background=COLORS.letter;
      f.appendChild(s);
    }
    return f;
  }

  const cube=el("div","cube spin");

  const faces={
    front:face(LETTERS[letter]),
    back:face(),
    right:face(),
    left:face(),
    top:face(),
    bottom:face()
  };

  Object.entries(faces).forEach(([k,v])=>{
    v.classList.add(k);
    cube.appendChild(v);
  });

  const wrap=el("div","cubeWrap");
  wrap.appendChild(cube);
  mount.appendChild(wrap);
})();
