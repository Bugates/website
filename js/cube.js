(function(){
  const letter = (document.body.getAttribute("data-letter") || "O").toUpperCase();
  const stage = document.getElementById("cubeMount");
  if (!stage) return;

  const reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const COLORS = {
    k: "#0b0f14", // "off" / dark
    w: "#e9eef7",
    r: "#ff4d4d",
    o: "#ff9f43",
    y: "#ffd43b",
    g: "#2ed573",
    b: "#4dabf7",
    p: "#b197fc",
  };

  const FACE_BASE = {
    front: "b",
    right: "r",
    left: "o",
    top: "w",
    bottom: "y",
    back: "g",
  };

  const LETTER_PATTERNS = {
    O: [
      "w","w","w","w","w",
      "w","k","k","k","w",
      "w","k","k","k","w",
      "w","k","k","k","w",
      "w","w","w","w","w",
    ],
    S: [
      "w","w","w","w","w",
      "w","k","k","k","k",
      "w","w","w","w","w",
      "k","k","k","k","w",
      "w","w","w","w","w",
    ],
    F: [
      "w","w","w","w","w",
      "w","k","k","k","k",
      "w","w","w","w","k",
      "w","k","k","k","k",
      "w","k","k","k","k",
    ],
    E: [
      "w","w","w","w","w",
      "w","k","k","k","k",
      "w","w","w","w","k",
      "w","k","k","k","k",
      "w","w","w","w","w",
    ],
    M: [
      "w","k","k","k","w",
      "w","w","k","w","w",
      "w","k","w","k","w",
      "w","k","k","k","w",
      "w","k","k","k","w",
    ],
    P: [
      "w","w","w","w","k",
      "w","k","k","k","w",
      "w","w","w","w","k",
      "w","k","k","k","k",
      "w","k","k","k","k",
    ],
    B: [
      "w","w","w","w","k",
      "w","k","k","k","w",
      "w","w","w","w","k",
      "w","k","k","k","w",
      "w","w","w","w","k",
    ],
  };

  function clampLetter(l){
    return LETTER_PATTERNS[l] ? l : "O";
  }

  function el(tag, cls){
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    return e;
  }

  function buildFace(){
    const f = el("div", "face");
    for (let i=0;i<25;i++){
      const s = el("div", "sticker");
      f.appendChild(s);
    }
    return f;
  }

  function fillFace(faceEl, arr){
    const kids = faceEl.querySelectorAll(".sticker");
    kids.forEach((k,i)=>{
      const c = arr[i] || "k";
      k.style.background = COLORS[c] || COLORS.k;
    });
  }

  function solid(colorKey){
    return Array.from({length:25}, () => colorKey);
  }

  function randomMix(){
    const keys = ["w","r","o","y","g","b","p","k"];
    return Array.from({length:25}, () => keys[Math.floor(Math.random()*keys.length)]);
  }

  const wrap = el("div", "cubeWidget");
  const cubeWrap = el("div", "cubeWrap");
  const cube = el("div", "cube");
  cubeWrap.appendChild(cube);

  const faces = {
    front: buildFace(),
    back: buildFace(),
    right: buildFace(),
    left: buildFace(),
    top: buildFace(),
    bottom: buildFace(),
  };
  faces.front.classList.add("front");
  faces.back.classList.add("back");
  faces.right.classList.add("right");
  faces.left.classList.add("left");
  faces.top.classList.add("top");
  faces.bottom.classList.add("bottom");

  cube.appendChild(faces.front);
  cube.appendChild(faces.back);
  cube.appendChild(faces.right);
  cube.appendChild(faces.left);
  cube.appendChild(faces.top);
  cube.appendChild(faces.bottom);

  // Initial "scramble"
  fillFace(faces.front, randomMix());
  fillFace(faces.right, randomMix());
  fillFace(faces.left, randomMix());
  fillFace(faces.top, randomMix());
  fillFace(faces.bottom, randomMix());
  fillFace(faces.back, randomMix());

  const meta = el("div", "cubeMeta");
  const t = el("div", "title");
  t.textContent = `Cube animation: forming “${clampLetter(letter)}”`;
  const h = el("div", "hint");
  h.textContent = "This animation is decorative. Navigation remains available at all times.";
  meta.appendChild(t);
  meta.appendChild(h);

  wrap.appendChild(cubeWrap);
  wrap.appendChild(meta);

  stage.appendChild(wrap);

  function solveToLetter(){
    const L = clampLetter(letter);

    // Solve other faces to clean solids
    fillFace(faces.right, solid(FACE_BASE.right));
    fillFace(faces.left, solid(FACE_BASE.left));
    fillFace(faces.top, solid(FACE_BASE.top));
    fillFace(faces.bottom, solid(FACE_BASE.bottom));
    fillFace(faces.back, solid(FACE_BASE.back));

    // Front face becomes base color, then letter overlay
    const base = solid(FACE_BASE.front);
    fillFace(faces.front, base);

    const pattern = LETTER_PATTERNS[L];
    const merged = base.map((c, i) => (pattern[i] === "w" ? "w" : c));
    fillFace(faces.front, merged);
  }

  function animate(){
    if (!reduceMotion){
      cube.classList.add("spinning");
    }
    // A short "scramble flicker"
    let steps = reduceMotion ? 1 : 10;
    let i = 0;

    const interval = setInterval(()=>{
      i++;
      fillFace(faces.front, randomMix());
      fillFace(faces.right, randomMix());
      fillFace(faces.top, randomMix());
      if (i >= steps){
        clearInterval(interval);
        solveToLetter();
        cube.classList.remove("spinning");
      }
    }, reduceMotion ? 10 : 60);
  }

  animate();
})();
