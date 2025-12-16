(function(){
  const letter = (document.body.dataset.letter || "O").toUpperCase();
  const mount = document.getElementById("cubeMount");
  if(!mount) return;

  const BLUE = "#2563eb";

  const LETTERS = {
    O:[
      1,1,1,1,1,
      1,0,0,0,1,
      1,0,0,0,1,
      1,0,0,0,1,
      1,1,1,1,1
    ],
    S:[
      1,1,1,1,1,
      1,0,0,0,0,
      1,1,1,1,1,
      0,0,0,0,1,
      1,1,1,1,1
    ],
    F:[
      1,1,1,1,1,
      1,0,0,0,0,
      1,1,1,1,0,
      1,0,0,0,0,
      1,0,0,0,0
    ],
    E:[
      1,1,1,1,1,
      1,0,0,0,0,
      1,1,1,1,0,
      1,0,0,0,0,
      1,1,1,1,1
    ],
    M:[
      1,0,0,0,1,
      1,1,0,1,1,
      1,0,1,0,1,
      1,0,0,0,1,
      1,0,0,0,1
    ],
    P:[
      1,1,1,1,0,
      1,0,0,0,1,
      1,1,1,1,0,
      1,0,0,0,0,
      1,0,0,0,0
    ],
    B:[
      1,1,1,1,0,
      1,0,0,0,1,
      1,1,1,1,0,
      1,0,0,0,1,
      1,1,1,1,0
    ]
  };

  function el(t,c){const e=document.createElement(t);if(c)e.className=c;return e}

  function face(pattern){
    const f=el("div","face");
    for(let i=0;i<25;i++){
      const s=el("div","sticker");
      if(pattern && pattern[i]) s.style.background=BLUE;
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
