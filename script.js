const html = document.documentElement;
const buttons = document.querySelectorAll("[data-lang-target]");
const menuToggle = document.querySelector(".menu-toggle");
const navWrap = document.querySelector(".nav-wrap");
const navLinks = document.querySelectorAll(".site-nav a");

function setLanguage(lang) {
  html.setAttribute("data-lang", lang);
  html.setAttribute("lang", lang === "mk" ? "mk" : "en");

  buttons.forEach((button) => {
    button.classList.toggle("active", button.dataset.langTarget === lang);
    button.setAttribute(
      "aria-pressed",
      String(button.dataset.langTarget === lang),
    );
  });

  try {
    localStorage.setItem("darfild-language", lang);
  } catch (error) {
    // Ignore storage issues.
  }
}

function closeMenu() {
  if (!menuToggle || !navWrap) return;
  navWrap.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
}

buttons.forEach((button) => {
  button.addEventListener("click", () =>
    setLanguage(button.dataset.langTarget),
  );
});

if (menuToggle && navWrap) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navWrap.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 820) closeMenu();
    });
  });
}

const storedLanguage = (() => {
  try {
    return localStorage.getItem("darfild-language");
  } catch (error) {
    return null;
  }
})();

setLanguage(storedLanguage === "mk" ? "mk" : "en");
