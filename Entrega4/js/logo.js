document.addEventListener("scroll", () => {
    const header = document.getElementById("header");
    const logo = document.querySelector(".logo-numberBlocks");
    
    const threshold = 50; 
    
    if (window.scrollY > threshold) {
      //nuevo
      logo.style.width = "120px";
      logo.style.height = "70px"; 
      logo.style.transform = "translateY(0)"; //sube dentro del header
    } else {
      //original
      logo.style.width = "550px";
      logo.style.height = "320px";
      logo.style.transform = "translateY(110px)";
    }
  });
  