document.addEventListener("scroll", () => {
    const header = document.getElementById("header");
    const logo = document.querySelector(".logo-numberBlocks");
    
    // Umbral para iniciar el efecto (ajusta según necesites)
    const threshold = 50; 
    
    if (window.scrollY > threshold) {
      logo.style.width = "120px"; // Nuevo ancho del logo
      logo.style.height = "70px"; // Nueva altura del logo
      logo.style.transform = "translateY(0)"; // Subirlo dentro del header
    } else {
      logo.style.width = "550px"; // Tamaño original del logo
      logo.style.height = "320px"; // Tamaño original del logo
      logo.style.transform = "translateY(110px)"; // Posición original
    }
  });
  