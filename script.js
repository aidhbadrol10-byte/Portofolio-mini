// ================== TAHUN OTOMATIS DI FOOTER ==================
document.getElementById("year").textContent = new Date().getFullYear();

// ================== DARK / LIGHT MODE TOGGLE ==================
const themeToggle = document.getElementById("theme-toggle");
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  themeToggle.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
});

// ================== HAMBURGER MENU (MOBILE) ==================
const hamburger = document.getElementById("hamburger");
const navLinksContainer = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
  navLinksContainer.classList.toggle("show");
});

document.querySelectorAll(".nav-link").forEach(link => {
  link.addEventListener("click", () => {
    navLinksContainer.classList.remove("show");
  });
});

// ================== EFEK TYPING DI HERO ==================
const typingText = document.getElementById("typing-text");
const roles = ["Mahasiswa", "Disciple Student"];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
  const currentRole = roles[roleIndex];

  if (isDeleting) {
    charIndex--;
  } else {
    charIndex++;
  }

  typingText.textContent = currentRole.substring(0, charIndex);

  let speed = isDeleting ? 60 : 120;

  if (!isDeleting && charIndex === currentRole.length) {
    speed = 1200;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    speed = 400;
  }

  setTimeout(typeEffect, speed);
}
typeEffect();

// ================== ANIMASI MUNCUL SAAT SCROLL (Intersection Observer) ==================
const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
    } else {
      entry.target.classList.remove("active");
    }
  });
}, { threshold: 0, rootMargin: "0px 0px -80px 0px" });

revealElements.forEach(el => revealObserver.observe(el));

// ================== HIGHLIGHT NAV LINK SESUAI SCROLL ==================
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });

  // Tombol Back to Top
  const backToTop = document.getElementById("back-to-top");
  if (window.scrollY > 400) {
    backToTop.classList.add("show");
  } else {
    backToTop.classList.remove("show");
  }
});

// ================== BACK TO TOP BUTTON ==================
document.getElementById("back-to-top").addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// ================== FILTER PROJECT ==================
const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    filterButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const filterValue = btn.getAttribute("data-filter");

    projectCards.forEach(card => {
      if (filterValue === "all" || card.getAttribute("data-category") === filterValue) {
        card.classList.remove("hide");
      } else {
        card.classList.add("hide");
      }
    });
  });
});

// ================== COPY EMAIL TO CLIPBOARD ==================
const copyBtn = document.getElementById("copy-btn");
const emailText = document.getElementById("email-text").textContent;
const toast = document.getElementById("toast");

if (copyBtn) {
  copyBtn.addEventListener("click", () => {
    navigator.clipboard.writeText(emailText).then(() => {
      // Tampilkan toast
      toast.classList.add("show");
      
      // Sembunyikan toast setelah 2 detik
      setTimeout(() => {
        toast.classList.remove("show");
      }, 2000);
    });
  });
}