// Основные функции для работы формы
document.addEventListener('DOMContentLoaded', function() {
    // Инициализация первого шага
    document.getElementById('step1').classList.add('active');

    // Обработка отправки формы
    const form = document.getElementById('giftForm');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        submitForm();
    });
});
// Трекинг кликов по рекомендациям
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('gift-card') || e.target.closest('.gift-card')) {
        // Отслеживание кликов по рекомендациям
        if (typeof gtag !== 'undefined') {
            gtag('event', 'gift_click', {
                'gift_title': e.target.querySelector('h3')?.textContent
            });
        }
    }
});
// Переход к следующему шагу
function nextStep(currentStep) {
    // Валидация текущего шага перед переходом
    if (!validateStep(currentStep)) return;

    // Скрыть текущий шаг
    document.getElementById(`step-${currentStep}`).classList.remove('active');
    document.getElementById(`step${currentStep}`).classList.remove('active');

    // Показать следующий шаг
    const nextStepNum = currentStep + 1;
    document.getElementById(`step-${nextStepNum}`).classList.add('active');
    document.getElementById(`step${nextStepNum}`).classList.add('active');
}

// Возврат к предыдущему шагу
function prevStep(currentStep) {
    // Скрыть текущий шаг
    document.getElementById(`step-${currentStep}`).classList.remove('active');
    document.getElementById(`step${currentStep}`).classList.remove('active');

    // Показать предыдущий шаг
    const prevStepNum = currentStep - 1;
    document.getElementById(`step-${prevStepNum}`).classList.add('active');
    document.getElementById(`step${prevStepNum}`).classList.add('active');
}

// Валидация шага формы
function validateStep(stepNumber) {
    let isValid = true;
    const step = document.getElementById(`step-${stepNumber}`);

    // Проверка обязательных полей
    const requiredInputs = step.querySelectorAll('[required]');
    requiredInputs.forEach(input => {
        if (!input.value.trim()) {
            input.style.borderColor = 'red';
            isValid = false;

            // Убираем подсветку при исправлении
            input.addEventListener('input', function() {
                if (this.value.trim()) {
                    this.style.borderColor = '#ddd';
                }
            });
        }
    });

    if (!isValid) {
        alert('Пожалуйста, заполните все обязательные поля');
    }

    return isValid;
}

// Отправка формы и обработка результатов
function submitForm() {
        // Сбор данных для аналитики
    const analyticsData = {
        relationship: document.getElementById('relationship').value,
        age: document.getElementById('age').value,
        budget: document.getElementById('budget').value,
        timestamp: new Date().toISOString()
    };
    
    // Отправка в Google Analytics (пример)
    if (typeof gtag !== 'undefined') {
        gtag('event', 'form_submit', analyticsData);
    }
    // Скрываем форму и показываем загрузку
    document.querySelector('.questionnaire').classList.add('hidden');
    document.getElementById('results').classList.remove('hidden');

    // Собираем данные формы
    const formData = {
        relationship: document.getElementById('relationship').value,
        age: document.getElementById('age').value,
        interests: document.getElementById('interests').value,
        occasion: document.getElementById('occasion').value,
        budget: document.getElementById('budget').value,
        preferences: document.getElementById('preferences').value,
        personality: document.getElementById('personality').value,
        pastGifts: document.getElementById('pastGifts').value,
        additionalInfo: document.getElementById('additionalInfo').value
    };

    // Здесь будет вызов API ИИ для получения рекомендаций
    // Временная имитация ответа от API
    setTimeout(() => {
        simulateAIResponse(formData);
    }, 3000);
}

// Имитация ответа от ИИ (замените на реальный вызов API)
function simulateAIResponse(formData) {
    // Скрываем индикатор загрузки
    document.getElementById('loading').classList.add('hidden');

    // Создаем макет ответа (в реальном приложении это будет ответ от API)
    const giftIdeas = generateMockGifts(formData);
    const giftsContainer = document.getElementById('giftIdeas');

    // Очищаем контейнер и добавляем предложения
    giftsContainer.innerHTML = '';
    giftIdeas.forEach(gift => {
        const giftCard = document.createElement('div');
        giftCard.className = 'gift-card';
        giftCard.innerHTML = `
            <h3>${gift.title}</h3>
            <p>${gift.description}</p>
            <p class="price">Примерная цена: ${gift.price} руб.</p>
            <p>Почему это хороший подарок: ${gift.reason}</p>
            <a href="${gift.link}" target="_blank" class="btn">Где купить</a>
        `;
        giftsContainer.appendChild(giftCard);
    });
}

// Генерация тестовых данных (замените на реальный вызов API)
function generateMockGifts(formData) {
    // Все возможные варианты подарков сгруппированы по категориям
    const allGifts = {
        universal: [
            {
                title: 'Подарочный сертификат',
                description: 'Сертификат в магазин, соответствующий интересам получателя',
                price: '500-10000',
                reason: 'Позволяет человеку выбрать именно то, что ему нужно',
                link: '#'
            },
            {
                title: 'Эксклюзивный мастер-класс',
                description: 'Онлайн или оффлайн занятие по интересу получателя',
                price: '2000-15000',
                reason: 'Необычный опыт вместо материального подарка',
                link: '#'
            },
            {
                title: 'Подписка на сервис',
                description: 'Годовая подписка на стриминговый сервис, приложение или журнал',
                price: '1000-10000',
                reason: 'Подарок, который будет радовать весь год',
                link: '#'
            },
            {
                title: 'Качественный гаджет',
                description: 'Полезное устройство, соответствующее бюджету',
                price: '2000-50000',
                reason: 'Практичный подарок для современного человека',
                link: '#'
            },
            {
                title: 'Книга с автографом автора',
                description: 'Особенное издание любимого автора',
                price: '1000-5000',
                reason: 'Персонализированный и ценный подарок для книголюба',
                link: '#'
            }
        ],
        partner: [
            {
                title: 'Романтическое путешествие',
                description: 'Организованная поездка на выходные',
                price: '10000-50000',
                reason: 'Создаст незабываемые воспоминания для пары',
                link: '#'
            },
            {
                title: 'Ювелирное изделие',
                description: 'Качественная бижутерия или украшение',
                price: '5000-100000',
                reason: 'Классический подарок, который будет хранить эмоции',
                link: '#'
            },
            {
                title: 'Фотосессия',
                description: 'Профессиональная съемка для пары',
                price: '5000-30000',
                reason: 'Позволит сохранить лучшие моменты отношений',
                link: '#'
            },
            {
                title: 'Персонализированный арт-объект',
                description: 'Картина, гравюра или скульптура с индивидуальным дизайном',
                price: '5000-50000',
                reason: 'Уникальный подарок, созданный специально для ваших отношений',
                link: '#'
            }
        ],
        parent: [
            {
                title: 'Цифровая фоторамка с предустановленными фото',
                description: 'Готовый подарок с семейными фотографиями',
                price: '3000-15000',
                reason: 'Будет постоянно напоминать о семье',
                link: '#'
            },
            {
                title: 'Сертификат в СПА',
                description: 'Набор расслабляющих процедур',
                price: '3000-20000',
                reason: 'Позволит родителям отдохнуть и расслабиться',
                link: '#'
            },
            {
                title: 'Умный домашний помощник',
                description: 'Устройство для умного дома с голосовым управлением',
                price: '5000-30000',
                reason: 'Поможет упростить повседневные задачи',
                link: '#'
            },
            {
                title: 'Коллаж из фотографий',
                description: 'Оригинально оформленные совместные фото',
                price: '2000-10000',
                reason: 'Трогательный и душевный подарок',
                link: '#'
            }
        ],
        child: [
            {
                title: 'Обучающий конструктор',
                description: 'Набор для развития технических навыков',
                price: '1000-20000',
                reason: 'Развивает логику и креативное мышление',
                link: '#'
            },
            {
                title: 'Интерактивный питомец',
                description: 'Умная игрушка, реагирующая на действия',
                price: '2000-15000',
                reason: 'Развивает ответственность и эмоциональный интеллект',
                link: '#'
            },
            {
                title: 'Набор для творчества',
                description: 'Комплект для рисования, лепки или рукоделия',
                price: '500-10000',
                reason: 'Способствует развитию творческих способностей',
                link: '#'
            },
            {
                title: 'Детские умные часы',
                description: 'Гаджет с GPS и функциями связи',
                price: '3000-15000',
                reason: 'Практичный подарок для безопасности ребенка',
                link: '#'
            }
        ],
        friend: [
            {
                title: 'Совместный опыт',
                description: 'Билеты на мероприятие или квест для двоих',
                price: '2000-20000',
                reason: 'Подарит общие воспоминания и эмоции',
                link: '#'
            },
            {
                title: 'Персонализированный аксессуар',
                description: 'Вещь с индивидуальным дизайном по интересам друга',
                price: '1000-10000',
                reason: 'Покажет, что вы знаете вкусы получателя',
                link: '#'
            },
            {
                title: 'Набор любимых угощений',
                description: 'Коробка с эксклюзивными сладостями или деликатесами',
                price: '1500-10000',
                reason: 'Порадует ценителя хорошей еды',
                link: '#'
            },
            {
                title: 'Комикс или манга про вашу дружбу',
                description: 'Индивидуально созданная история',
                price: '5000-25000',
                reason: 'Оригинальный и трогательный подарок',
                link: '#'
            }
        ]
    };

    // Выбираем подходящие категории подарков
    let suitableGifts = [...allGifts.universal];

    if (formData.relationship && allGifts[formData.relationship]) {
        suitableGifts = [...suitableGifts, ...allGifts[formData.relationship]];
    }

    // Фильтрация по бюджету
    if (formData.budget) {
        const budget = parseInt(formData.budget);
        suitableGifts = suitableGifts.filter(gift => {
            const giftPrice = parseInt(gift.price.split('-')[0]);
            return giftPrice <= budget;
        });
    }

    // Сортировка по цене (от дорогих к дешевым)
    suitableGifts.sort((a, b) => {
        const priceA = parseInt(a.price.split('-')[0]);
        const priceB = parseInt(b.price.split('-')[0]);
        return priceB - priceA;
    });

    // Возвращаем 5 самых релевантных подарков
    return suitableGifts.slice(0, 6);
}

