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

    // ===== ВАЛИДАИЯ ФОРМ =====
    const form = document.querySelector('.contact-section form');
    if (!form) return;

    // Функция создания или получения элемента ошибки
    function getErrorElement(input) {
        let error = input.parentNode.querySelector('.error-message');
        if (!error) {
            error = document.createElement('div');
            error.className = 'error-message';
            input.parentNode.appendChild(error);
        }
        return error;
    }

    function clearError(input) {
        const error = input.parentNode.querySelector('.error-message');
        if (error) error.textContent = '';
        input.classList.remove('invalid');
    }

    function showError(input, message) {
        const error = getErrorElement(input);
        error.textContent = message;
        input.classList.add('invalid');
    }

    // Валидация ФИО (не менее двух слов, только буквы, пробелы, дефис)
    function validateName() {
        const nameInput = document.getElementById('name');
        const value = nameInput.value.trim();
        if (value === '') {
            showError(nameInput, 'Пожалуйста, введите ФИО');
            return false;
        }
        const nameRegex = /^[A-Za-zА-Яа-яЁё\s\-]{3,}$/;
        if (!nameRegex.test(value)) {
            showError(nameInput, 'ФИО должно содержать только буквы, пробелы или дефис (минимум 3 символа)');
            return false;
        }
        clearError(nameInput);
        return true;
    }

    // Валидация email
    function validateEmail() {
        const emailInput = document.getElementById('email');
        const value = emailInput.value.trim();
        if (value === '') {
            showError(emailInput, 'Введите email');
            return false;
        }
        const emailRegex = /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/;
        if (!emailRegex.test(value)) {
            showError(emailInput, 'Введите корректный email (например, name@domain.com)');
            return false;
        }
        clearError(emailInput);
        return true;
    }

    // Валидация телефона: разрешены 10 цифр, или +7(XXX)XXX-XX-XX, или просто цифры 10–15
    function validatePhone() {
        const phoneInput = document.getElementById('phone');
        let value = phoneInput.value.trim();
        if (value === '') {
            clearError(phoneInput);
            return true; // телефон необязателен
        }
        // Удаляем все нецифровые символы
        const digits = value.replace(/\D/g, '');
        if (digits.length >= 10 && digits.length <= 15) {
            clearError(phoneInput);
            return true;
        }
        showError(phoneInput, 'Введите телефон: от 10 до 15 цифр, можно с +, пробелами, скобками');
        return false;
    }

    // Валидация сообщения
    function validateMessage() {
        const messageInput = document.getElementById('message');
        const value = messageInput.value.trim();
        if (value === '') {
            showError(messageInput, 'Сообщение не может быть пустым');
            return false;
        }
        if (value.length < 10) {
            showError(messageInput, 'Сообщение должно содержать не менее 10 символов');
            return false;
        }
        clearError(messageInput);
        return true;
    }

    // Привязываем события input для мгновенной валидации
    document.getElementById('name').addEventListener('input', validateName);
    document.getElementById('email').addEventListener('input', validateEmail);
    document.getElementById('phone').addEventListener('input', validatePhone);
    document.getElementById('message').addEventListener('input', validateMessage);

    // Обработка отправки формы
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isPhoneValid = validatePhone();
        const isMessageValid = validateMessage();

        if (isNameValid && isEmailValid && isPhoneValid && isMessageValid) {
            // Если всё ок – можно отправить данные
            alert('Спасибо! Форма отправлена (демо-режим).');
            // Здесь можно добавить реальную отправку: form.submit()
            form.reset();
            document.querySelectorAll('.invalid').forEach(field => field.classList.remove('invalid'));
            document.querySelectorAll('.error-message').forEach(err => err.textContent = '');
        } else {
            const firstInvalid = document.querySelector('.invalid');
            if (firstInvalid) {
                firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
                firstInvalid.focus();
            }
        }
    });
});
