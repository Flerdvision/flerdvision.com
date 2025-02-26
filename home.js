// Funktionen für Fokus-Outline nur für Tastaturnutzer
const handleFirstTab = (e) => {
  if (e.key === 'Tab') {
    document.body.classList.add('user-is-tabbing');
    window.removeEventListener('keydown', handleFirstTab);
    window.addEventListener('mousedown', handleMouseDownOnce);
  }
};

const handleMouseDownOnce = () => {
  document.body.classList.remove('user-is-tabbing');
  window.removeEventListener('mousedown', handleMouseDownOnce);
  window.addEventListener('keydown', handleFirstTab);
};

window.addEventListener('keydown', handleFirstTab);

// "Back to Top"-Button-Logik
const backToTopButton = document.querySelector(".back-to-top");
let isBackToTopRendered = false;

const alterStyles = (isRendered) => {
  backToTopButton.style.visibility = isRendered ? "visible" : "hidden";
  backToTopButton.style.opacity = isRendered ? "1" : "0";
  backToTopButton.style.transform = isRendered ? "scale(1)" : "scale(0)";
};

window.addEventListener("scroll", () => {
  isBackToTopRendered = window.scrollY > 700;
  alterStyles(isBackToTopRendered);
});

// Hamburger Menu Toggle
const hamburger = document.getElementById('hamburger');
const navItems = document.getElementById('nav-items');

hamburger.addEventListener('click', () => {
  navItems.classList.toggle('active');
  hamburger.classList.toggle('active');

  // Scrollen verhindern, wenn Menü offen
  if (navItems.classList.contains('active')) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
});

// Schließen des Menüs, wenn ein Link geklickt wird
document.querySelectorAll('.nav__link').forEach(link => {
  link.addEventListener('click', () => {
    navItems.classList.remove('active');
    hamburger.classList.remove('active');
    document.body.style.overflow = ''; // Scrollen wieder aktivieren
  });
});

// Swipe-Unterstützung für mobiles Menü
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener("touchstart", (event) => {
  touchStartX = event.touches[0].clientX;
});

document.addEventListener("touchmove", (event) => {
  touchEndX = event.touches[0].clientX;
});

document.addEventListener("touchend", () => {
  const swipeDistance = touchEndX - touchStartX;

  if (swipeDistance > 100) {
    navItems.classList.add("active"); // Wischen nach rechts -> Menü öffnen
    hamburger.classList.add("active");
    document.body.style.overflow = "hidden";
  } else if (swipeDistance < -100) {
    navItems.classList.remove("active"); // Wischen nach links -> Menü schließen
    hamburger.classList.remove("active");
    document.body.style.overflow = "";
  }
});

// Verhindert Rubber Band Scrolling nur im Menü
navItems.addEventListener('touchmove', function (event) {
  if (navItems.scrollHeight <= navItems.clientHeight) {
    event.preventDefault();
  }
}, { passive: false });
