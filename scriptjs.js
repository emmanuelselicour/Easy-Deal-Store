<script>
  // Menu functionality
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const menuOverlay = document.getElementById('menuOverlay');

  function toggleMenu() {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    menuOverlay.classList.toggle('active');
    
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
  }

  hamburger.addEventListener('click', toggleMenu);
  menuOverlay.addEventListener('click', toggleMenu);

  // Fermer le menu quand on clique sur un lien
  document.querySelectorAll('.mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
      if (mobileMenu.classList.contains('active')) {
        toggleMenu();
      }
    });
  });

  // Bubble animation — 80 bulles toutes les 5 secondes
  let bubbleCount = 0;
  const maxBubbles = 300; // protection mémoire

  function generateBubbles() {
    const bubbleContainer = document.body;

    for (let i = 0; i < 80; i++) {
      if (bubbleCount >= maxBubbles) break;

      const bubble = document.createElement("div");
      bubble.className = "bubble";
      const size = Math.random() * 40 + 10;
      bubble.style.width = size + "px";
      bubble.style.height = size + "px";
      bubble.style.left = Math.random() * window.innerWidth + "px";
      bubble.style.animationDuration = 5 + Math.random() * 10 + "s";
      bubble.style.animationDelay = Math.random() * 2 + "s";
      bubble.style.background = `rgba(74, 0, 224, ${Math.random() * 0.2 + 0.05})`;
      bubbleContainer.appendChild(bubble);

      bubbleCount++;

      setTimeout(() => {
        bubble.remove();
        bubbleCount--;
      }, 15000);
    }
  }

  // Lancer une fois au début
  generateBubbles();

  // Puis toutes les 5 secondes
  setInterval(generateBubbles, 5000);

  // Supprimer les bulles qui sont hors écran si on scrolle
  document.addEventListener('scroll', () => {
    document.querySelectorAll('.bubble').forEach(bubble => {
      const rect = bubble.getBoundingClientRect();
      if (rect.top > window.innerHeight || rect.bottom < 0) {
        bubble.remove();
        bubbleCount--;
      }
    });
  });
</script>