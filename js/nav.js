(function(){
  const here = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  const links = document.querySelectorAll("[data-nav] a");

  links.forEach(a => {
    const href = (a.getAttribute("href") || "").toLowerCase();
    if (href === here) a.classList.add("active");
    if (here === "" && href === "index.html") a.classList.add("active");
  });
})();
