document.addEventListener('DOMContentLoaded', () => {
    // Получаем все необходимые элементы из DOM
    const sliderContent = document.querySelector('.slider-content');
    const slides = document.querySelectorAll('.slide-image'); // Теперь это изображения
    const prevArrow = document.querySelector('.slider-arrow.prev');
    const nextArrow = document.querySelector('.slider-arrow.next');
    const dots = document.querySelectorAll('.dot');
    const navLinks = document.querySelectorAll('.slider-navigation-links a');

    // Текущий индекс активного слайда
    let currentIndex = 0;
    // Общее количество слайдов
    const totalSlides = slides.length;

    // Данные для каждого слайда, чтобы динамически обновлять текстовую информацию
    // Эти данные должны соответствовать макету для каждого слайда
    const slideData = [
        {
            city: "Rostov-on-Don<br>LCD admiral",
            area: "81 m2",
            time: "3.5 months",
            cost: "Upon request",
        },
        {
            city: "Sochi<br>Thieves",
            area: "105 m2",
            time: "4 months",
            cost: "Upon request",
        },
        {
            city: "Rostov-on-Don<br>Patriotic",
            area: "93 m2",
            time: "3 months",
            cost: "Upon request",
        }
    ];

    // Получаем элементы, которые будут отображать детали
    const cityValue = document.querySelector('.detail-item:nth-child(1) .detail-value');
    const areaValue = document.querySelector('.detail-item:nth-child(2) .detail-value');
    const timeValue = document.querySelector('.detail-item:nth-child(3) .detail-value');
    const costValue = document.querySelector('.detail-item:nth-child(4) .detail-value');


    /**
     * Функция для обновления отображения слайдов, точек и навигационных ссылок.
     * Также обновляет текстовую информацию о проекте.
     * @param {number} index - Индекс слайда, который должен стать активным.
     */
    function updateSlider(index) {
        // Проверяем границы индекса:
        if (index >= totalSlides) {
            currentIndex = 0; // Переходим к первому слайду
        } else if (index < 0) {
            currentIndex = totalSlides - 1; // Переходим к последнему слайду
        } else {
            currentIndex = index; // Устанавливаем переданный индекс
        }

        // Перемещаем контейнер слайдов, чтобы показать нужный слайд
        sliderContent.style.transform = `translateX(-${currentIndex * 100}%)`;

        // Обновляем активные классы для точек (индикаторов)
        dots.forEach((dot, i) => {
            if (i === currentIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });

        // Обновляем активные классы для навигационных ссылок
        navLinks.forEach((link, i) => {
            if (i === currentIndex) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });

        // Обновляем текстовую информацию на основе slideData
        const currentSlideInfo = slideData[currentIndex];
        cityValue.innerHTML = currentSlideInfo.city; // Используем innerHTML для <br>
        areaValue.textContent = currentSlideInfo.area;
        timeValue.textContent = currentSlideInfo.time;
        costValue.textContent = currentSlideInfo.cost;
    }

    // Обработчик клика на стрелку "Вперед"
    nextArrow.addEventListener('click', () => {
        updateSlider(currentIndex + 1);
    });

    // Обработчик клика на стрелку "Назад"
    prevArrow.addEventListener('click', () => {
        updateSlider(currentIndex - 1);
    });

    // Обработчик клика на индикаторы-кружочки
    dots.forEach(dot => {
        dot.addEventListener('click', (event) => {
            const slideIndex = parseInt(event.target.dataset.slide);
            updateSlider(slideIndex);
        });
    });

    // Обработчик клика на навигационные ссылки
    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const slideIndex = parseInt(event.target.dataset.slide);
            updateSlider(slideIndex);
        });
    });

    // Инициализируем слайдер, показывая первый слайд при загрузке
    updateSlider(0);
});