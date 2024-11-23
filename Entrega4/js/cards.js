document.addEventListener('DOMContentLoaded', () => {
    const frames = document.querySelectorAll('.frame');
    const observer = new IntersectionObserver((entries) => {
      let delay = 0;
  
      entries.forEach((entry) => {
        const { target, isIntersecting } = entry;
        setTimeout(() => {
          target.classList.toggle('visible', isIntersecting);
          target.classList.toggle('hidden', !isIntersecting);
        }, isIntersecting ? delay : 0);
  
        if (isIntersecting) delay += 300;
      });
    }, { threshold: 0.5 });
  
    frames.forEach((frame) => observer.observe(frame));
  });