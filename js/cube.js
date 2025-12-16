(function(){
  const letter = (document.body.getAttribute("data-letter") || "O").toUpperCase();
  const mount = document.getElementById("cubeMount");
  if(!mount) return;

  const COLORS = {
    w:"#f5f5f5",
    y:"#ffd500",
    r:"#c41e3a",
    o:"#ff5800",
    b:"#0051ba",
    g:"#009e60",
    k:"#111"
  };

  const FACE = {
    front:"b",
    back:"g",
    right:"r",
    left:"o",
    top:"w",
    bottom:"y"
  };

  const LETTERS = {
    O:[
      "w","w","w","w","w",
      "w","k","k","k","w",
      "w","k","k","k","w",
      "w","k","k","k","w",
      "w","w","w","w","w"
    ],
    S:[
      "w","w","w","w","w",
      "w","k","k","k","k",
      "w","w","w","w","w",
      "k","k","k","k","w",
      "w","w","w","w","w"
    ],
    F:[
      "w","w","w","w","w",
      "w","k","k","k","k",
      "w","w","w","w","k",
      "w","k","k","k","k",
      "w","k","k","k","k"
    ],
    E:[
      "w","w","w","w","w",
      "w","k","k","k","k",
      "w","w","w","w","k",
      "w","k","k","k","k",
      "w","w","w","w","w"
    ],
    M:[
      "w","k","k","k","w",
      "w","w","k","w","w",
      "w","k","w","k","w",
      "w","k","k","k","w",
      "w","k","k","k","w"
    ],
    P:[
      "w","w","w","w","k",
      "w","k","k","k","w",
      "w","w","w","w","k",
      "w","k","k","k","k",
      "w","k","k","k","k"
    ],
    B:[
      "w","w","w","w","k",
      "w","k","k","k","w",
      "w","w","w","w","k",
      "w","k","k","k","w",
      "w","w","w","w","k"
    ]
  };

  const L = LETTERS[letter] ? letter : "O";

  function face(){
    const f=document.createElement("div");
    f.className="face";
    for(let i=0;i<25;i++){
      const s=document.createElement("div");
      s.className="sticker";
      f.appendChild(s);
    }
    return f;
  }

  function fill(f,color){
    [...f.children].forEach(s=>s.style.background=COLORS[color]);
  }

  function fillPattern(f,base,pattern){
    [...f.children].forEach((s,i)=>{
      s.style.background = pattern[i]==="w" ? COLORS.w : COLORS[base];
    });
  }

  const wrap=document.createElement("div");
  wrap.className="cubeWrap";
  const cube=document.createElement("div");
  cube.className="cube spin";
  wrap.appendChild(cube);

  const faces={
    front:face(),
    back:face(),
    right:face(),
    left:face(),
    top:face(),
    bottom:face()
  };

  Object.entries(faces).forEach(([k,f])=>{
    f.classList.add(k);
    cube.appendChild(f);
    fill(f,FACE[k]);
  });

  setTimeout(()=>{
    fillPattern(faces.front, FACE.front, LETTERS[L]);
    cube.classList.remove("spin");
  },700);

  mount.appendChild(wrap);
})();
