document.addEventListener("DOMContentLoaded", () => {
  // ===== Мобильное меню =====
  const menuToggle = document.querySelector(".menu-toggle");
  const navMenu = document.querySelector(".nav-menu");

  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
      navMenu.classList.toggle("active");
    });
  }

  // ===== Тема =====
  const themeToggle = document.querySelector(".theme-toggle");

  // Загружаем сохранённую тему
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
  }

  // Обновляем текст кнопки
  if (themeToggle) {
    if (document.body.classList.contains("dark-mode")) {
      themeToggle.textContent = "☀️ Светлая тема";
    } else {
      themeToggle.textContent = "🌙 Тёмная тема";
    }

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
