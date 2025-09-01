// Переключение темы
        const themeToggle = document.getElementById('themeToggle');
        const body = document.body;
        
        // Проверяем сохраненную тему в localStorage
        if (localStorage.getItem('theme') === 'dark') {
            body.classList.add('dark-theme');
            themeToggle.textContent = '☀️';
        }
        
        themeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-theme');
            
            if (body.classList.contains('dark-theme')) {
                localStorage.setItem('theme', 'dark');
                themeToggle.textContent = '☀️';
            } else {
                localStorage.setItem('theme', 'light');
                themeToggle.textContent = '🌙';
            }
        });
        
        // Мобильное меню
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const nav = document.querySelector('nav');
        
        mobileMenuBtn.addEventListener('click', () => {
            nav.classList.toggle('active');
        });
        
        // Слайдер отзывов
        const testimonials = document.getElementById('testimonials');
        const dots = document.querySelectorAll('.slider-dot');
        let currentSlide = 0;
        
        function showSlide(index) {
            testimonials.style.transform = `translateX(-${index * 100}%)`;
            
            dots.forEach(dot => dot.classList.remove('active'));
            dots[index].classList.add('active');
            
            currentSlide = index;
        }
        
        dots.forEach(dot => {
            dot.addEventListener('click', () => {
                const index = parseInt(dot.getAttribute('data-index'));
                showSlide(index);
            });
        });
        
        // Автопереключение слайдов
        setInterval(() => {
            currentSlide = (currentSlide + 1) % dots.length;
            showSlide(currentSlide);
        }, 5000);
        
        // Параллакс эффект для герой секции
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const hero = document.querySelector('.hero');
            if (hero) {
                const parallaxSpeed = 0.5;
                hero.style.backgroundPositionY = `${scrolled * parallaxSpeed}px`;
            }
        });