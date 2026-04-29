document.addEventListener("DOMContentLoaded", () => {
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

    // ===== ЛАЙКИ =====
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

    // ===== КОММЕНТАРИИ =====
        // ===== ОТКРЫТИЕ / ЗАКРЫТИЕ =====
    const toggleButtons = document.querySelectorAll(".toggle-comments-btn");

    toggleButtons.forEach(btn => {
        btn.addEventListener("click", () => {

            const article = btn.closest(".article-card");
            const currentComments = article.querySelector(".comments");

            //
            document.querySelectorAll(".comments").forEach(block => {
                if (block !== currentComments) {
                    block.classList.add("hidden");
                }
            });

            //
            document.querySelectorAll(".toggle-comments-btn").forEach(b => {
                if (b !== btn) b.textContent = "💬 Комментарии";
            });

            // 
            currentComments.classList.toggle("hidden");

            btn.textContent = currentComments.classList.contains("hidden")
            ? "💬 Комментарии"
            : "✖ Закрыть";

        });
        // ===== КОММЕНТАРИИ + localStorage =====
        const articles = document.querySelectorAll(".article-card");

        articles.forEach(article => {
            const id = article.dataset.id;

            const input = article.querySelector(".comment-input");
            const btn = article.querySelector(".comment-btn");
            const list = article.querySelector(".comment-list");

            // если блока нет — пропускаем
            if (!input || !btn || !list) return;

            const key = "comments_" + id;

            // загрузка
            const savedComments = JSON.parse(localStorage.getItem(key)) || [];

            savedComments.forEach(text => {
                const li = document.createElement("li");
                li.textContent = text;
                list.appendChild(li);
            });

            // добавление
            btn.addEventListener("click", () => {
                const text = input.value.trim();
                if (!text) return;

                const li = document.createElement("li");
                li.textContent = text;
                list.appendChild(li);

                savedComments.push(text);
                localStorage.setItem(key, JSON.stringify(savedComments));

                input.value = "";
            });
        });
    });
});
