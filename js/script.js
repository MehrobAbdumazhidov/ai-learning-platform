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

// ===== ФИЛЬТР КУРСОВ =====
const filterButtons = document.querySelectorAll(".filter-buttons button");
const cards = document.querySelectorAll(".article-card");

// Функция для применения фильтра
function filterCards(filterValue) {
    cards.forEach(card => {
        if (filterValue === "all" || card.dataset.category === filterValue) {
            card.style.display = "";
        } else {
            card.style.display = "none";
        }
    });
}

// Обработчики кнопок
filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        const filter = button.dataset.filter;
        filterButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");
        filterCards(filter);
    });
});

// Инициализация: активировать первую кнопку ("Все") при загрузке
document.querySelector(".filter-buttons button[data-filter='all']")?.classList.add("active");
filterCards("all");

// ===== ПОИСК =====
const searchInput = document.querySelector(".search-input");

if (searchInput) {
  searchInput.addEventListener("input", () => {
    const value = searchInput.value.toLowerCase();
    const articles = document.querySelectorAll(".article-card");

    articles.forEach(article => {
      const text = article.innerText.toLowerCase();

      if (text.includes(value)) {
        article.style.display = "";
      } else {
        article.style.display = "none";
      }
    });
  });
}

const likeButtons = document.querySelectorAll(".like-btn");

likeButtons.forEach(btn => {
  const article = btn.closest(".article-card");
  const id = article.dataset.id;

  const key = "likes_" + id;

  let count = localStorage.getItem(key) || 0;
  btn.querySelector("span").textContent = count;

  btn.addEventListener("click", () => {
    count++;
    localStorage.setItem(key, count);
    btn.querySelector("span").textContent = count;
  });
});
