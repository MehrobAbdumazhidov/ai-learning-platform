document.addEventListener("DOMContentLoaded", function () {
  console.log("JS загружен"); // проверка

  // ===== МЕНЮ =====
  const menuToggle = document.querySelector(".menu-toggle");
  const navMenu = document.querySelector(".nav-menu");

  if (!menuToggle) {
    console.error("menu-toggle НЕ найден");
  }

  if (!navMenu) {
    console.error("nav-menu НЕ найден");
  }

  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", function () {
      navMenu.classList.toggle("active");

      if (navMenu.classList.contains("active")) {
        menuToggle.textContent = "✕";
      } else {
        menuToggle.textContent = "☰";
      }
    });
  }

  // ===== ТЕМА =====
  const themeToggle = document.querySelector(".theme-toggle");

  if (!themeToggle) {
    console.error("theme-toggle НЕ найден");
  }

  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");

      if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("theme", "dark");
        themeToggle.textContent = "☀️ Светлая тема";
      } else {
        localStorage.setItem("theme", "light");
        themeToggle.textContent = "🌙 Тёмная тема";
      }
    });
  }
});
