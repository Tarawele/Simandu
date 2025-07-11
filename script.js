
        // Common JavaScript for all pages

        // Mobile Menu Toggle
        function setupMobileMenu() {
            const mobileMenuBtn = document.getElementById('mobileMenuBtn');
            const mainNav = document.getElementById('mainNav');
            
            if (mobileMenuBtn && mainNav) {
                mobileMenuBtn.addEventListener('click', () => {
                    mainNav.classList.toggle('active');
                    const icon = mobileMenuBtn.querySelector('i');
                    if (icon.classList.contains('fa-bars')) {
                        icon.classList.remove('fa-bars');
                        icon.classList.add('fa-times');
                    } else {
                        icon.classList.remove('fa-times');
                        icon.classList.add('fa-bars');
                    }
                });
            }
        }

        // Language Translation System
        let currentTranslations = {};

        // Sample translations - in a real app these would be in external JSON files
        const translations = {
            en: {
                common: {
                    home: "Home",
                    about: "About",
                    products: "Products",
                    contact: "Contact",
                    explore_products: "Explore Products",
                    request_quote: "Request Quote",
                    connect_with_us: "Connect With Us",
                    price_request: "Price on Request",
                    origin: "Origin",
                    send_inquiry: "Send Inquiry",
                    full_name: "Full Name",
                    email_address: "Email Address",
                    phone_number: "Phone Number",
                    product_interest: "Product Interest",
                    select_product: "Select a product",
                    other: "Other",
                    message: "Your Message",
                    get_in_touch: "Get In Touch",
                    russia_office: "Russia Office",
                    guinea_office: "Guinea Office",
                    phone: "Phone",
                    email: "Email"
                },
                home: {
                    hero_title: "Bridging Guinea & Russia Through Premium Trade",
                    hero_text: "Specializing in the export of high-quality Guinean oils, coffee beans, cacao beans, and nuts to Russia, and the import of Russian wheat seeds, soaps, and onions to Guinea."
                },
                about: {
                    section_title: "About Our Company",
                    section_subtitle: "Connecting markets through trusted trade relationships",
                    about_heading: "Your Reliable Trade Partner",
                    about_text1: "AfroEuro Trade Bridge specializes in facilitating premium agricultural trade between Guinea and Russia. Founded by professionals with deep roots in both countries, we leverage our unique understanding of both markets to create valuable trade opportunities.",
                    about_text2: "Our team in Guinea ensures direct access to the highest quality agricultural products, while our Russian operations guarantee efficient distribution and market penetration.",
                    about_text3: "We pride ourselves on ethical sourcing, transparent operations, and building long-term partnerships with both suppliers and buyers.",
                    feature1_title: "Trusted Relationships",
                    feature1_text: "Direct partnerships with producers in Guinea and distributors in Russia ensure quality and reliability.",
                    feature2_title: "Quality Products",
                    feature2_text: "We specialize in premium agricultural goods sourced directly from their origins.",
                    feature3_title: "Efficient Logistics",
                    feature3_text: "Streamlined import/export processes ensuring timely delivery of goods.",
                    feature4_title: "Mutual Benefit",
                    feature4_text: "Creating economic opportunities for both Guinean producers and Russian buyers."
                },
                products: {
                    section_title: "Our Products",
                    section_subtitle: "Premium agricultural goods from Guinea and Russia",
                    from_guinea: "From Guinea",
                    from_russia: "From Russia",
                    coffee_title: "Premium Coffee Beans",
                    coffee_desc: "High-quality Arabica beans grown in the rich volcanic soil of Guinea's highlands.",
                    fouta_djallon: "Fouta Djallon",
                    cacao_title: "Cacao Beans",
                    cacao_desc: "Organic cacao beans with rich flavor profile, perfect for premium chocolate production.",
                    guinee_forest: "Guinée Forestière",
                    palm_oil_title: "Palm Oil",
                    palm_oil_desc: "Cold-pressed, unrefined palm oil with rich nutrients and vibrant color.",
                    basse_guinee: "Basse-Guinée",
                    nuts_title: "Premium Nuts",
                    nuts_desc: "High-quality cashews and other nuts sourced from Guinea's fertile regions.",
                    wheat_title: "Wheat Seeds",
                    wheat_desc: "High-yield, disease-resistant wheat seeds suitable for African growing conditions.",
                    krasnodar: "Krasnodar Region",
                    soap_title: "Traditional Soaps",
                    soap_desc: "Natural, handmade soaps using traditional Russian methods and ingredients.",
                    moscow_region: "Moscow Region",
                    onion_title: "Premium Onions",
                    onion_desc: "High-quality storage onions with excellent shelf life and flavor profile.",
                    volgograd: "Volgograd Region"
                },
                contact: {
                    section_title: "Contact Us",
                    section_subtitle: "Get in touch for quotes, orders, and partnership opportunities",
                    get_in_touch: "Get In Touch",
                    get_in_touch_desc: "Have questions about our products or services? Reach out to our team for more information or to request a quote.",
                    map_placeholder: "Location Map",
                    thank_you: "Thank you for your inquiry! We will contact you shortly.",
                    validation_error: "Please fill in all required fields.",
                    email_error: "Please enter a valid email address.",
                    phone_error: "Please enter a valid phone number."
                }
            },
            fr: {
                common: {
                    home: "Accueil",
                    about: "À propos",
                    products: "Produits",
                    contact: "Contact",
                    explore_products: "Explorer les produits",
                    request_quote: "Demander un devis",
                    connect_with_us: "Contactez-nous",
                    price_request: "Prix sur demande",
                    origin: "Origine",
                    send_inquiry: "Envoyer une demande",
                    full_name: "Nom complet",
                    email_address: "Adresse e-mail",
                    phone_number: "Numéro de téléphone",
                    product_interest: "Intérêt pour le produit",
                    select_product: "Sélectionnez un produit",
                    other: "Autre",
                    message: "Votre message",
                    get_in_touch: "Contactez-nous",
                    russia_office: "Bureau Russie",
                    guinea_office: "Bureau Guinée",
                    phone: "Téléphone",
                    email: "E-mail"
                },
                home: {
                    hero_title: "Relier la Guinée et la Russie par un commerce de qualité",
                    hero_text: "Spécialisé dans l'exportation d'huiles, de grains de café, de fèves de cacao et de noix de haute qualité de Guinée vers la Russie, et l'importation de semences de blé, de savons et d'oignons russes en Guinée."
                },
                about: {
                    section_title: "À propos de notre entreprise",
                    section_subtitle: "Connecter les marchés grâce à des relations commerciales de confiance",
                    about_heading: "Votre partenaire commercial fiable",
                    about_text1: "AfroEuro Trade Bridge est spécialisé dans la facilitation du commerce agricole de qualité entre la Guinée et la Russie. Fondée par des professionnels ayant des racines profondes dans les deux pays, nous tirons parti de notre compréhension unique des deux marchés pour créer des opportunités commerciales précieuses.",
                    about_text2: "Notre équipe en Guinée garantit un accès direct aux produits agricoles de la plus haute qualité, tandis que nos opérations en Russie garantissent une distribution efficace et une pénétration du marché.",
                    about_text3: "Nous sommes fiers de notre approvisionnement éthique, de nos opérations transparentes et de la construction de partenariats à long terme avec les fournisseurs et les acheteurs.",
                    feature1_title: "Relations de confiance",
                    feature1_text: "Des partenariats directs avec les producteurs en Guinée et les distributeurs en Russie assurent qualité et fiabilité.",
                    feature2_title: "Produits de qualité",
                    feature2_text: "Nous nous spécialisons dans les produits agricoles de qualité provenant directement de leurs origines.",
                    feature3_title: "Logistique efficace",
                    feature3_text: "Processus d'import/export rationalisés garantissant une livraison rapide des marchandises.",
                    feature4_title: "Avantage mutuel",
                    feature4_text: "Création d'opportunités économiques pour les producteurs guinéens et les acheteurs russes."
                },
                products: {
                    section_title: "Nos produits",
                    section_subtitle: "Produits agricoles de qualité de Guinée et de Russie",
                    from_guinea: "De Guinée",
                    from_russia: "De Russie",
                    coffee_title: "Grains de café premium",
                    coffee_desc: "Grains d'Arabica de haute qualité cultivés dans le sol volcanique riche des hauts plateaux de Guinée.",
                    fouta_djallon: "Fouta Djallon",
                    cacao_title: "Fèves de cacao",
                    cacao_desc: "Fèves de cacao biologiques au profil aromatique riche, parfaites pour la production de chocolat premium.",
                    guinee_forest: "Guinée forestière",
                    palm_oil_title: "Huile de palme",
                    palm_oil_desc: "Huile de palme pressée à froid, non raffinée, riche en nutriments et de couleur vive.",
                    basse_guinee: "Basse-Guinée",
                    nuts_title: "Noix premium",
                    nuts_desc: "Noix de cajou et autres noix de haute qualité provenant des régions fertiles de Guinée.",
                    wheat_title: "Semences de blé",
                    wheat_desc: "Semences de blé à haut rendement et résistantes aux maladies, adaptées aux conditions de croissance africaines.",
                    krasnodar: "Région de Krasnodar",
                    soap_title: "Savons traditionnels",
                    soap_desc: "Savons naturels faits à la main selon des méthodes et ingrédients traditionnels russes.",
                    moscow_region: "Région de Moscou",
                    onion_title: "Oignons premium",
                    onion_desc: "Oignons de conservation de haute qualité avec une excellente durée de conservation et un profil aromatique.",
                    volgograd: "Région de Volgograd"
                },
                contact: {
                    section_title: "Contactez-nous",
                    section_subtitle: "Contactez-nous pour des devis, des commandes et des opportunités de partenariat",
                    get_in_touch: "Contactez-nous",
                    get_in_touch_desc: "Vous avez des questions sur nos produits ou services ? Contactez notre équipe pour plus d'informations ou pour demander un devis.",
                    map_placeholder: "Carte de localisation",
                    thank_you: "Merci pour votre demande ! Nous vous contacterons sous peu.",
                    validation_error: "Veuillez remplir tous les champs obligatoires.",
                    email_error: "Veuillez entrer une adresse e-mail valide.",
                    phone_error: "Veuillez entrer un numéro de téléphone valide."
                }
            },
            ru: {
                common: {
                    home: "Главная",
                    about: "О нас",
                    products: "Продукты",
                    contact: "Контакты",
                    explore_products: "Исследовать продукты",
                    request_quote: "Запросить предложение",
                    connect_with_us: "Связаться с нами",
                    price_request: "Цена по запросу",
                    origin: "Происхождение",
                    send_inquiry: "Отправить запрос",
                    full_name: "Полное имя",
                    email_address: "Адрес электронной почты",
                    phone_number: "Номер телефона",
                    product_interest: "Интерес к продукту",
                    select_product: "Выберите продукт",
                    other: "Другое",
                    message: "Ваше сообщение",
                    get_in_touch: "Связаться с нами",
                    russia_office: "Офис в России",
                    guinea_office: "Офис в Гвинее",
                    phone: "Телефон",
                    email: "Электронная почта"
                },
                home: {
                    hero_title: "Соединяя Гвинею и Россию через премиальную торговлю",
                    hero_text: "Специализируемся на экспорте высококачественных масел, кофейных зерен, какао-бобов и орехов из Гвинеи в Россию и импорте российских семян пшеницы, мыла и лука в Гвинею."
                },
                about: {
                    section_title: "О нашей компании",
                    section_subtitle: "Соединяем рынки через доверительные торговые отношения",
                    about_heading: "Ваш надежный торговый партнер",
                    about_text1: "AfroEuro Trade Bridge специализируется на содействии премиальной сельскохозяйственной торговле между Гвинеей и Россией. Основанная профессионалами с глубокими корнями в обеих странах, мы используем наше уникальное понимание обоих рынков для создания ценных торговых возможностей.",
                    about_text2: "Наша команда в Гвинее обеспечивает прямой доступ к сельскохозяйственной продукции высшего качества, а наши операции в России гарантируют эффективное распределение и проникновение на рынок.",
                    about_text3: "Мы гордимся этичным снабжением, прозрачными операциями и построением долгосрочных партнерских отношений с поставщиками и покупателями.",
                    feature1_title: "Доверительные отношения",
                    feature1_text: "Прямые партнерства с производителями в Гвинее и дистрибьюторами в России обеспечивают качество и надежность.",
                    feature2_title: "Качественная продукция",
                    feature2_text: "Мы специализируемся на премиальных сельскохозяйственных товарах, полученных непосредственно из их источников.",
                    feature3_title: "Эффективная логистика",
                    feature3_text: "Оптимизированные процессы импорта/экспорта, обеспечивающие своевременную доставку товаров.",
                    feature4_title: "Взаимная выгода",
                    feature4_text: "Создание экономических возможностей для производителей Гвинеи и российских покупателей."
                },
                products: {
                    section_title: "Наша продукция",
                    section_subtitle: "Премиальные сельскохозяйственные товары из Гвинеи и России",
                    from_guinea: "Из Гвинеи",
                    from_russia: "Из России",
                    coffee_title: "Премиум кофейные зерна",
                    coffee_desc: "Высококачественные зерна арабики, выращенные в богатой вулканической почве нагорья Гвинеи.",
                    fouta_djallon: "Фута-Джаллон",
                    cacao_title: "Какао-бобы",
                    cacao_desc: "Органические какао-бобы с богатым вкусовым профилем, идеально подходящие для производства премиального шоколада.",
                    guinee_forest: "Лесная Гвинея",
                    palm_oil_title: "Пальмовое масло",
                    palm_oil_desc: "Холодного отжима, нерафинированное пальмовое масло с богатыми питательными веществами и ярким цветом.",
                    basse_guinee: "Нижняя Гвинея",
                    nuts_title: "Премиум орехи",
                    nuts_desc: "Высококачественные кешью и другие орехи из плодородных регионов Гвинеи.",
                    wheat_title: "Семена пшеницы",
                    wheat_desc: "Высокоурожайные, устойчивые к болезням семена пшеницы, подходящие для африканских условий выращивания.",
                    krasnodar: "Краснодарский край",
                    soap_title: "Традиционное мыло",
                    soap_desc: "Натуральное мыло ручной работы, изготовленное по традиционным российским методам и из ингредиентов.",
                    moscow_region: "Московская область",
                    onion_title: "Премиум лук",
                    onion_desc: "Высококачественный лук для хранения с отличным сроком годности и вкусовым профилем.",
                    volgograd: "Волгоградская область"
                },
                contact: {
                    section_title: "Свяжитесь с нами",
                    section_subtitle: "Свяжитесь с нами для получения предложений, заказов и возможностей партнерства",
                    get_in_touch: "Свяжитесь с нами",
                    get_in_touch_desc: "Есть вопросы о наших продуктах или услугах? Обратитесь к нашей команде для получения дополнительной информации или запроса предложения.",
                    map_placeholder: "Карта местоположения",
                    thank_you: "Спасибо за ваш запрос! Мы свяжемся с вами в ближайшее время.",
                    validation_error: "Пожалуйста, заполните все обязательные поля.",
                    email_error: "Пожалуйста, введите действительный адрес электронной почты.",
                    phone_error: "Пожалуйста, введите действительный номер телефона."
                }
            }
        };
        async function loadTranslations(lang) {
            try {
                // In a real implementation, we would fetch from a file:
                // const response = await fetch(`translations/${lang}.json`);
                // currentTranslations = await response.json();
                
                // For this demo, use the translations object
                currentTranslations = translations[lang];
                applyTranslations();
            } catch (error) {
                console.error('Error loading translations:', error);
                // Fallback to English
                currentTranslations = translations.ru;
                applyTranslations();
            }
        }

        function applyTranslations() {
            // Translate elements with data-i18n attribute
            document.querySelectorAll('[data-i18n]').forEach(element => {
                const key = element.getAttribute('data-i18n');
                const keys = key.split('.');
                let translation = currentTranslations;
                for (let k of keys) {
                    translation = translation?.[k];
                    if (translation === undefined) break;
                }
                if (translation !== undefined) {
                    element.innerText = translation;
                }
            });
            
            // Translate placeholder text
            document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
                const key = element.getAttribute('data-i18n-placeholder');
                const keys = key.split('.');
                let translation = currentTranslations;
                for (let k of keys) {
                    translation = translation?.[k];
                    if (translation === undefined) break;
                }
                if (translation !== undefined) {
                    element.setAttribute('placeholder', translation);
                }
            });
            
            // Translate select options
            document.querySelectorAll('option[data-i18n]').forEach(element => {
                const key = element.getAttribute('data-i18n');
                const keys = key.split('.');
                let translation = currentTranslations;
                for (let k of keys) {
                    translation = translation?.[k];
                    if (translation === undefined) break;
                }
                if (translation !== undefined) {
                    element.innerText = translation;
                }
            });
        }

        function setLanguage(lang) {
            localStorage.setItem('lang', lang);
            document.documentElement.lang = lang;
            loadTranslations(lang);
            updateLanguageSelector(lang);
        }

        function updateLanguageSelector(lang) {
            const flags = document.querySelectorAll('.lang-flag');
            flags.forEach(flag => {
                if (flag.getAttribute('data-lang') === lang) {
                    flag.classList.add('active');
                } else {
                    flag.classList.remove('active');
                }
            });
        }

        // Setup language selector buttons
        function setupLanguageSelector() {
            const flags = document.querySelectorAll('.lang-flag');
            flags.forEach(flag => {
                flag.addEventListener('click', () => {
                    const lang = flag.getAttribute('data-lang');
                    setLanguage(lang);
                });
            });
        }

        // Products page filtering
        function setupProductsFilter() {
            if (!document.querySelector('.products-tabs')) return;

            const tabBtns = document.querySelectorAll('.tab-btn');
            const productCards = document.querySelectorAll('.product-card');
            
            tabBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    // Update active tab
                    tabBtns.forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    
                    // Filter products
                    const category = btn.getAttribute('data-category');
                    productCards.forEach(card => {
                        if (category === 'all' || card.getAttribute('data-category') === category) {
                            card.style.display = 'block';
                        } else {
                            card.style.display = 'none';
                        }
                    });
                });
            });
        }

        // Form submission
        function setupContactForm() {
            const leadForm = document.getElementById('leadForm');
            if (leadForm) {
                leadForm.addEventListener('submit', (e) => {
                    e.preventDefault();
                    
                    // Form validation
                    const name = document.getElementById('name').value;
                    const email = document.getElementById('email').value;
                    const phone = document.getElementById('phone').value;
                    const interest = document.getElementById('interest').value;
                    const message = document.getElementById('message').value;
                    
                    if (!name || !email || !phone || !interest || !message) {
                        alert(translate('contact.validation_error'));
                        return;
                    }
                    
                    // Email validation
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(email)) {
                        alert(translate('contact.email_error'));
                        return;
                    }
                    
                    // Phone validation
                    const phoneRegex = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/;
                    if (!phoneRegex.test(phone)) {
                        alert(translate('contact.phone_error'));
                        return;
                    }
                    
                    // Form data would be sent to server in a real implementation
                    alert(translate('contact.thank_you'));
                    leadForm.reset();
                });
            }
        }

        // Helper function to translate strings
        function translate(key) {
            const keys = key.split('.');
            let translation = currentTranslations;
            for (let k of keys) {
                translation = translation?.[k];
                if (translation === undefined) break;
            }
            return translation !== undefined ? translation : key;
        }

        // Initialize
        function init() {
            setupMobileMenu();
            setupLanguageSelector();
            setupProductsFilter();
            setupContactForm();
            
            // Set initial language
            const savedLang = localStorage.getItem('lang');
            const browserLang = navigator.language.split('-')[0]; // get main language
            const supportedLangs = ['en', 'fr', 'ru'];
            
            let initialLang = 'ru'; // default to Russian
            
            if (savedLang && supportedLangs.includes(savedLang)) {
                initialLang = savedLang;
            } else if (supportedLangs.includes(browserLang)) {
                initialLang = browserLang;
            }
            
            setLanguage(initialLang);
        }

        // Call init when DOM is loaded
        document.addEventListener('DOMContentLoaded', init);
    {/* </script> */}