// Файл: js/data.js
// Описание: Этот файл содержит основные данные, используемые в приложении.
// Он экспортирует константы с информацией о местоположениях, переводах, транспортных средствах,
// популярных маршрутах и отзывах клиентов.

/**
 * @typedef {object} Location
 * @property {string} name - Название местоположения (например, "Zurich Airport (ZRH)").
 * @property {string} type - Тип местоположения (например, "airport", "hotel").
 * @property {number} lat - Широта.
 * @property {number} lng - Долгота.
 */

/**
 * Массив объектов с предопределенными местоположениями для автозаполнения.
 * @type {Location[]}
 */
export const locations = [
    { name: "Zurich Airport (ZRH)", type: "airport", lat: 47.4647, lng: 8.5491 },
    { name: "Hotel Baur au Lac", type: "hotel", lat: 47.3667, lng: 8.5388 },
    { name: "Hotel Dolder Grand", type: "hotel", lat: 47.3729, lng: 8.5733 },
    { name: "Hotel Widder", type: "hotel", lat: 47.3724, lng: 8.5384 },
    { name: "Hotel Savoy Baur en Ville", type: "hotel", lat: 47.3699, lng: 8.5394 },
    { name: "Hotel Park Hyatt Zurich", type: "hotel", lat: 47.3642, lng: 8.5354 }
];

/**
 * Объект с переводами текстовых строк интерфейса на разные языки.
 * Ключи верхнего уровня - это коды языков (например, 'ru', 'en').
 * Вложенные объекты содержат пары ключ-значение, где ключ - это идентификатор строки,
 * а значение - ее перевод на соответствующий язык.
 */
export const translations = {
    ru: {
        'nav.home': 'Главная',
        'nav.about': 'О нас',
        'nav.blog': 'Блог',
        'nav.contacts': 'Контакты',
        'hero.title': 'VIP Трансфер из Цюриха в Швейцарию и Францию',
        'hero.form.title': 'Забронируйте премиум трансфер',
        'hero.form.from': 'Откуда',
        'hero.form.to': 'Куда',
        'hero.form.passengers': 'Количество пассажиров',
        'hero.form.passenger1': '1 пассажир',
        'hero.form.passenger2': '2 пассажира',
        'hero.form.passenger3': '3 пассажира',
        'hero.form.passenger4': '4 пассажира',
        'hero.form.date': 'Дата поездки',
        'hero.form.returnDate': 'Дата возвращения',
        'hero.form.addReturn': 'Добавить обратный трансфер',
        'hero.form.showRoute': 'Показать маршрут',
        'hero.vehicle.title': 'Выберите люксовый автомобиль',
        'hero.vehicle.select': 'Выбрать',
        'benefits.exclusive.title': 'Эксклюзивный VIP трансфер',
        'benefits.exclusive.text': 'Персональный водитель и люксовые автомобили из Цюриха',
        'benefits.privacy.title': 'Конфиденциальность',
        'benefits.privacy.text': 'Гарантированная приватность для поездок в Швейцарию и Францию',
        'benefits.punctuality.title': 'Пунктуальность',
        'benefits.punctuality.text': 'Точное прибытие в отели и курорты',
        'howItWorks.title': 'Ваш люксовый трансфер из Цюриха',
        'howItWorks.step1.title': 'Выберите маршрут',
        'howItWorks.step1.text': 'Из аэропорта Цюриха в отель или курорт',
        'howItWorks.step2.title': 'Забронируйте',
        'howItWorks.step2.text': 'Укажите детали поездки',
        'howItWorks.step3.title': 'Наслаждайтесь',
        'howItWorks.step3.text': 'Комфортная поездка на премиум автомобиле',
        'vehicles.title': 'Наш автопарк для VIP трансферов',
        'footer.about': 'О нас',
        'footer.contacts': 'Контакты',
        'nav.fleet': 'Автопарк',
        'nav.popular': 'Популярные трансферы',
        'nav.reviews': 'Отзывы',
        'nav.faq': 'FAQ',
        'header.phone': '+41 79 789 39 76',
        'header.rating': '5.0 средний рейтинг наших клиентов',
        'fleet.title': 'Наш Автопарк',
        'fleet.subtitle': 'Мы предлагаем только лучшие автомобили для вашего комфорта и безопасности.',
        'hero.vehicle.mercedes-s.name': 'Mercedes-Benz S-Class',
        'hero.vehicle.mercedes-s.description': 'Флагманский седан, символ роскоши и инноваций.',
        'hero.vehicle.mercedes-v.name': 'Mercedes-Benz V-Class',
        'hero.vehicle.mercedes-v.description': 'Вместительный и комфортабельный минивэн для групп.',
        'hero.vehicle.mercedes-e.name': 'Mercedes-Benz E-Class',
        'hero.vehicle.mercedes-e.description': 'Элегантность и практичность для деловых поездок.',
        'hero.vehicle.bmw-7.name': 'BMW 7 Series',
        'hero.vehicle.bmw-7.description': 'Combination of sporty dynamics and impeccable comfort.',
        'hero.vehicle.audi-a8.name': 'Audi A8',
        'hero.vehicle.audi-a8.description': 'Innovation and minimalist design for connoisseurs.',
        'hero.vehicle.rolls-royce.name': 'Rolls-Royce Phantom',
        'hero.vehicle.rolls-royce.description': 'The pinnacle of automotive art and unsurpassed luxury.',
        'popular.title': 'Наши самые популярные маршруты',
        'popular.subtitle': 'Откройте для себя самые востребованные направления среди наших клиентов.',
        'popular.zurich-zermatt.title': 'Цюрих - Церматт (Маттерхорн)',
        'popular.zurich-zermatt.description': 'Путешествие к подножию легендарного Маттерхорна. Насладитесь живописными видами Швейцарских Альп и комфортной дорогой до знаменитого горнолыжного курорта.',
        'popular.zurich-geneva.title': 'Цюрих - Женева',
        'popular.zurich-geneva.description': 'Прямой трансфер между двумя крупнейшими городами Швейцарии. Идеально для деловых поездок или для знакомства с культурными центрами страны.',
        'popular.zurich-stmoritz.title': 'Цюрих - Санкт-Мориц',
        'popular.zurich-stmoritz.description': 'Элитный трансфер в один из самых престижных горнолыжных курортов мира. Насладитесь поездкой по захватывающим горным перевалам.',
        'popular.zurich-milan.title': 'Цюрих - Милан',
        'popular.zurich-milan.description': 'Международный трансфер из финансового центра Швейцарии в столицу моды Италии. Путешествуйте с комфортом между странами.',
        'popular.learn-more': 'Узнать больше',
        'reviews.title': 'Что говорят наши клиенты',
        'reviews.subtitle': 'Отзывы тех, кто уже оценил наш сервис.',
        'faq.title': 'Часто задаваемые вопросы',
        'faq.subtitle': 'Найдите ответы на самые распространенные вопросы о наших услугах.',
        'faq.q1': 'Как забронировать трансфер?',
        'faq.a1': 'Забронировать трансфер очень просто! Вы можете использовать форму бронирования на главной странице нашего сайта, указав точки отправления и назначения, дату и время. Также вы можете связаться с нами по телефону или электронной почте.',
        'faq.q2': 'Какие автомобили доступны?',
        'faq.a2': 'Наш автопарк состоит из автомобилей представительского класса, включая Mercedes-Benz S-Class, V-Class, E-Class, а также BMW 7 Series и Audi A8. Мы также можем предоставить эксклюзивные автомобили, такие как Rolls-Royce Phantom, по предварительному запросу.',
        'faq.q3': 'Могу ли я изменить или отменить бронирование?',
        'faq.a3': 'Да, вы можете изменить или отменить свое бронирование. Пожалуйста, свяжитесь с нашей службой поддержки как можно скорее. Условия изменения и отмены могут зависеть от времени, оставшегося до поездки, и будут уточнены при обращении.',
        'faq.q4': 'Предоставляете ли вы детские кресла?',
        'faq.a4': 'Да, мы можем предоставить детские автокресла и бустеры по предварительному запросу. Пожалуйста, укажите возраст ребенка при бронировании, чтобы мы могли подобрать подходящее кресло.',
        'faq.q5': 'Как узнать стоимость трансфера?',
        'faq.a5': 'Используйте нашу форму бронирования: введите точки отправления и назначения, и система автоматически рассчитает предварительную стоимость. Для индивидуальных запросов или длительных поездок свяжитесь с нами напрямую для получения точной цены.',
        'footer.about.title': 'О VIP Transfer',
        'footer.about.text': 'VIP Transfer — ваш надежный партнер в мире премиальных перевозок. Мы предлагаем безупречный сервис, комфортабельные автомобили и профессиональных водителей для ваших поездок по Швейцарии и Европе.',
        'footer.navigation.title': 'Навигация',
        'footer.contact.title': 'Свяжитесь с нами',
        'footer.legal.title': 'Правовая информация',
        'footer.address': 'Швейцария, Цюрих, Bahnhofstrasse 123',
        'footer.phone': '+41 79 789 39 76',
        'footer.email': 'info@viptransfer.com',
        'footer.hours': 'Пн-Вс: Круглосуточно',
        'footer.privacy': 'Политика конфиденциальности',
        'footer.terms': 'Условия использования',
        'footer.sitemap': 'Карта сайта',
        'footer.copyright': '© 2025 VIP Transfer. Все права защищены.',
        
        // Модальное окно галереи
        'gallery.close': 'Закрыть',
        'gallery.prev': 'Предыдущее',
        'gallery.next': 'Следующее',
        
        // Описания автомобилей для галереи
        'vehicle.maybach-s680.name': 'Mercedes-Maybach S680',
        'vehicle.maybach-s680.description': 'Luxury sedan for VIP transfers from Zurich to Switzerland and France.',
        'vehicle.maybach-gls.name': 'Mercedes-Maybach GLS',
        'vehicle.maybach-gls.description': 'Spacious SUV for comfortable VIP transfers from Zurich.',
        'vehicle.sprinter.name': 'Mercedes Sprinter',
        'vehicle.sprinter.description': 'Spacious minibus for group VIP transfers from Zurich.',
        'vehicle.v-class.name': 'Mercedes V-Class',
        'vehicle.v-class.description': 'Comfortable minivan for VIP transfers from Zurich.'
    },
    en: {
        'nav.home': 'Home',
        'nav.about': 'About Us',
        'nav.blog': 'Blog',
        'nav.contacts': 'Contacts',
        'hero.title': 'VIP Transfer from Zurich to Switzerland and France',
        'hero.form.title': 'Book a Premium Transfer',
        'hero.form.from': 'From',
        'hero.form.to': 'To',
        'hero.form.passengers': 'Number of Passengers',
        'hero.form.passenger1': '1 passenger',
        'hero.form.passenger2': '2 passengers',
        'hero.form.passenger3': '3 passengers',
        'hero.form.passenger4': '4 passengers',
        'hero.form.date': 'Travel Date',
        'hero.form.returnDate': 'Return Date',
        'hero.form.addReturn': 'Add Return Transfer',
        'hero.form.showRoute': 'Show Route',
        'hero.vehicle.title': 'Select a Luxury Vehicle',
        'hero.vehicle.select': 'Select',
        'benefits.exclusive.title': 'Exclusive VIP Transfer',
        'benefits.exclusive.text': 'Personal driver and luxury vehicles from Zurich',
        'benefits.privacy.title': 'Privacy',
        'benefits.privacy.text': 'Guaranteed privacy for trips to Switzerland and France',
        'benefits.punctuality.title': 'Punctuality',
        'benefits.punctuality.text': 'Precise arrival at hotels and resorts',
        'howItWorks.title': 'Your Luxury Transfer from Zurich',
        'howItWorks.step1.title': 'Choose a Route',
        'howItWorks.step1.text': 'From Zurich airport to hotel or resort',
        'howItWorks.step2.title': 'Book',
        'howItWorks.step2.text': 'Specify trip details',
        'howItWorks.step3.title': 'Enjoy',
        'howItWorks.step3.text': 'Comfortable ride in a premium vehicle',
        'vehicles.title': 'Our Fleet for VIP Transfers',
        'footer.about': 'About Us',
        'footer.contacts': 'Contacts',
        'nav.fleet': 'Fleet',
        'nav.popular': 'Popular Transfers',
        'nav.reviews': 'Reviews',
        'nav.faq': 'FAQ',
        'header.phone': '+41 79 789 39 76',
        'header.rating': '5.0 average rating from our clients',
        'fleet.title': 'Our Fleet',
        'fleet.subtitle': 'We offer only the best vehicles for your comfort and safety.',
        'hero.vehicle.mercedes-s.name': 'Mercedes-Benz S-Class',
        'hero.vehicle.mercedes-s.description': 'Flagship sedan, a symbol of luxury and innovation.',
        'hero.vehicle.mercedes-v.name': 'Mercedes-Benz V-Class',
        'hero.vehicle.mercedes-v.description': 'Spacious and comfortable minivan for groups.',
        'hero.vehicle.mercedes-e.name': 'Mercedes-Benz E-Class',
        'hero.vehicle.mercedes-e.description': 'Elegance and practicality for business trips.',
        'hero.vehicle.bmw-7.name': 'BMW 7 Series',
        'hero.vehicle.bmw-7.description': 'Combination of sporty dynamics and impeccable comfort.',
        'hero.vehicle.audi-a8.name': 'Audi A8',
        'hero.vehicle.audi-a8.description': 'Innovation and minimalist design for connoisseurs.',
        'hero.vehicle.rolls-royce.name': 'Rolls-Royce Phantom',
        'hero.vehicle.rolls-royce.description': 'The pinnacle of automotive art and unsurpassed luxury.',
        'popular.title': 'Our Most Popular Routes',
        'popular.subtitle': 'Discover the most in-demand destinations among our clients.',
        'popular.zurich-zermatt.title': 'Zurich - Zermatt (Matterhorn)',
        'popular.zurich-zermatt.description': 'Journey to the foot of the legendary Matterhorn. Enjoy the scenic views of the Swiss Alps and comfortable road to the famous ski resort.',
        'popular.zurich-geneva.title': 'Zurich - Geneva',
        'popular.zurich-geneva.description': 'Direct transfer between Switzerland\'s two largest cities. Perfect for business trips or exploring the country\'s cultural centers.',
        'popular.zurich-stmoritz.title': 'Zurich - St. Moritz',
        'popular.zurich-stmoritz.description': 'Elite transfer to one of the world\'s most prestigious ski resorts. Enjoy the ride through breathtaking mountain passes.',
        'popular.zurich-milan.title': 'Zurich - Milan',
        'popular.zurich-milan.description': 'International transfer from Switzerland\'s financial center to Italy\'s fashion capital. Travel comfortably between countries.',
        'popular.learn-more': 'Learn More',
        'reviews.title': 'What Our Clients Say',
        'reviews.subtitle': 'Reviews from those who have already appreciated our service.',
        'faq.title': 'Frequently Asked Questions',
        'faq.subtitle': 'Find answers to the most common questions about our services.',
        'faq.q1': 'How to book a transfer?',
        'faq.a1': 'Booking a transfer is very simple! You can use the booking form on our main page, specifying departure and destination points, date and time. You can also contact us by phone or email.',
        'faq.q2': 'What vehicles are available?',
        'faq.a2': 'Our fleet consists of executive class vehicles, including Mercedes-Benz S-Class, V-Class, E-Class, as well as BMW 7 Series and Audi A8. We can also provide exclusive vehicles such as Rolls-Royce Phantom upon request.',
        'faq.q3': 'Can I change or cancel my booking?',
        'faq.a3': 'Yes, you can change or cancel your booking. Please contact our support service as soon as possible. Terms of change and cancellation may depend on the time remaining until the trip and will be clarified upon contact.',
        'faq.q4': 'Do you provide child seats?',
        'faq.a4': 'Yes, we can provide child car seats and boosters upon request. Please specify the child\'s age when booking so we can select the appropriate seat.',
        'faq.q5': 'How to find out the cost of transfer?',
        'faq.a5': 'Use our booking form: enter departure and destination points, and the system will automatically calculate the preliminary cost. For individual requests or long trips, contact us directly for an accurate price.',
        'footer.about.title': 'About VIP Transfer',
        'footer.about.text': 'VIP Transfer is your reliable partner in the world of premium transportation. We offer impeccable service, comfortable vehicles and professional drivers for your trips around Switzerland and Europe.',
        'footer.navigation.title': 'Navigation',
        'footer.contact.title': 'Contact Us',
        'footer.legal.title': 'Legal Information',
        'footer.address': 'Switzerland, Zurich, Bahnhofstrasse 123',
        'footer.phone': '+41 79 789 39 76',
        'footer.email': 'info@viptransfer.com',
        'footer.hours': 'Mon-Sun: 24/7',
        'footer.privacy': 'Privacy Policy',
        'footer.terms': 'Terms of Use',
        'footer.sitemap': 'Sitemap',
        'footer.copyright': '© 2025 VIP Transfer. All rights reserved.',
        
        // Модальное окно галереи
        'gallery.close': 'Close',
        'gallery.prev': 'Previous',
        'gallery.next': 'Next',
        
        // Описания автомобилей для галереи
        'vehicle.maybach-s680.name': 'Mercedes-Maybach S680',
        'vehicle.maybach-s680.description': 'Luxury sedan for VIP transfers from Zurich to Switzerland and France.',
        'vehicle.maybach-gls.name': 'Mercedes-Maybach GLS',
        'vehicle.maybach-gls.description': 'Spacious SUV for comfortable VIP transfers from Zurich.',
        'vehicle.sprinter.name': 'Mercedes Sprinter',
        'vehicle.sprinter.description': 'Spacious minibus for group VIP transfers from Zurich.',
        'vehicle.v-class.name': 'Mercedes V-Class',
        'vehicle.v-class.description': 'Comfortable minivan for VIP transfers from Zurich.'
    }
};

/**
 * @typedef {object} Vehicle
 * @property {string} name - Полное название автомобиля (например, "Mercedes-Maybach S680").
 * @property {string} description - Краткое описание автомобиля.
 * @property {string[]} specs - Массив строк с техническими характеристиками (вместимость, багаж и т.д.).
 * @property {string[]} images - Массив путей к изображениям автомобиля.
 */

/**
 * Объект, содержащий подробную информацию о каждом доступном транспортном средстве.
 * Ключами являются идентификаторы автомобилей (например, 'maybach-s680').
 * @type {Object.<string, Vehicle>}
 */
export const vehicles = {
    'maybach-s680': {
        name: "Mercedes-Maybach S680",
        description: "Роскошный седан для VIP трансферов из Цюриха в Швейцарию и Францию.",
        specs: [
            "Вместимость: до 4 пассажиров",
            "Багаж: 2 больших чемодана",
            "Кондиционер: Да",
            "Тип: Персональный трансфер"
        ],
        images: [
            "img/mers.webp",
            "img/mers.webp",
            "img/mers.webp"
        ]
    },
    'maybach-gls': {
        name: "Mercedes-Maybach GLS",
        description: "Просторный внедорожник для комфортных VIP трансферов из Цюриха.",
        specs: [
            "Вместимость: до 4 пассажиров",
            "Багаж: 3 больших чемодана",
            "Кондиционер: Да",
            "Тип: Персональный трансфер"
        ],
        images: [
            "img/mers.webp",
            "img/mers.webp",
            "img/mers.webp"
        ]
    },
    sprinter: {
        name: "Mercedes Sprinter",
        description: "Просторный микроавтобус для групповых VIP трансферов из Цюриха.",
        specs: [
            "Вместимость: до 4 пассажиров",
            "Багаж: 8 больших чемоданов",
            "Кондиционер: Да",
            "Тип: Групповой трансфер"
        ],
        images: [
            "img/mers.webp",
            "img/mers.webp",
            "img/mers.webp"
        ]
    },
    'v-class': {
        name: "Mercedes V-Class",
        description: "Комфортабельный минивэн для VIP трансферов из Цюриха.",
        specs: [
            "Вместимость: до 4 пассажиров",
            "Багаж: 4 больших чемодана",
            "Кондиционер: Да",
            "Тип: Персональный/Групповой трансфер"
        ],
        images: [
            "img/mers.webp",
            "img/mers.webp",
            "img/mers.webp"
        ]
    }
};

/**
 * @typedef {object} PopularTransfer
 * @property {string} id - Уникальный идентификатор маршрута (например, 'zurich-zermatt').
 * @property {string} image - Путь к изображению для карточки маршрута.
 * @property {string} titleKey - Ключ для получения заголовка из объекта `translations`.
 * @property {string} descriptionKey - Ключ для получения описания из объекта `translations`.
 */

/**
 * Массив данных для раздела "Популярные трансферы".
 * @type {PopularTransfer[]}
 */
export const popularTransfers = [
    {
        id: 'zurich-zermatt',
        image: 'img/zermatt.webp',
        titleKey: 'popular.zurich-zermatt.title',
        descriptionKey: 'popular.zurich-zermatt.description'
    },
    {
        id: 'zurich-geneva',
        image: 'img/geneva.webp',
        titleKey: 'popular.zurich-geneva.title',
        descriptionKey: 'popular.zurich-geneva.description'
    },
    {
        id: 'zurich-stmoritz',
        image: 'img/st-moritz.webp',
        titleKey: 'popular.zurich-stmoritz.title',
        descriptionKey: 'popular.zurich-stmoritz.description'
    },
    {
        id: 'zurich-milan',
        image: 'img/milan.webp',
        titleKey: 'popular.zurich-milan.title',
        descriptionKey: 'popular.zurich-milan.description'
    }
];

/**
 * @typedef {object} Review
 * @property {string} name - Имя клиента.
 * @property {string} date - Дата отзыва.
 * @property {number} rating - Оценка (количество звезд).
 * @property {string} text - Текст отзыва.
 * @property {string} image - Путь к аватару клиента.
 */

/**
 * Массив объектов с отзывами клиентов.
 * @type {Review[]}
 */
export const reviews = {
    ru: [
        {
            text: '"Поездка с VIP Transfer была безупречной. Водитель приехал вовремя, автомобиль был в идеальном состоянии, а сам путь прошел незаметно. Настоящий премиум-сервис!"',
            name: 'Анна К.'
        },
        {
            text: '"Заказывал трансфер из аэропорта Цюриха. Все было на высшем уровне: встреча, помощь с багажом, комфорт в пути. Очень рекомендую этот сервис!"',
            name: 'Дмитрий М.'
        },
        {
            text: '"Использовали VIP Transfer для поездки в горы. Машина очень комфортная, водитель аккуратный, а виды за окном просто завораживали. Обязательно воспользуемся снова!"',
            name: 'Елена С.'
        }
    ],
    en: [
        {
            text: '"The trip with VIP Transfer was impeccable. The driver arrived on time, the car was in perfect condition, and the journey itself went unnoticed. A real premium service!"',
            name: 'Anna K.'
        },
        {
            text: '"I ordered a transfer from Zurich airport. Everything was at the highest level: meeting, help with luggage, comfort on the way. I highly recommend this service!"',
            name: 'Dmitry M.'
        },
        {
            text: '"We used VIP Transfer for a trip to the mountains. The car is very comfortable, the driver is careful, and the views outside the window were simply mesmerizing. We will definitely use it again!"',
            name: 'Elena S.'
        }
    ]
};