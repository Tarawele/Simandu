{/* <script> */}
// Translation system
let currentTranslations = {};
const supportedLangs = ['en', 'fr', 'ru'];

// Load translations from JSON file
async function loadTranslations(lang) {
    if (!supportedLangs.includes(lang)) lang = 'en';
    
    try {
        const response = await fetch(`translations/${lang}.json`);
        currentTranslations = await response.json();
        applyTranslations();
    } catch (error) {
        console.error('Error loading translations:', error);
        // Fallback to English
        if (lang !== 'en') {
            try {
                const enResponse = await fetch('translations/en.json');
                currentTranslations = await enResponse.json();
                applyTranslations();
            } catch (fallbackError) {
                console.error('Failed to load fallback translations:', fallbackError);
            }
        }
    }
}

// Apply translations to the page
function applyTranslations() {
    // Translate elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        const keys = key.split('.');
        let translation = currentTranslations;
        
        for (let k of keys) {
            if (translation) {
                translation = translation[k];
            } else {
                break;
            }
        }
        
        if (translation !== undefined) {
            element.innerText = translation;
        }
    });
    
    // Translate select options
    document.querySelectorAll('option[data-i18n]').forEach(option => {
        const key = option.getAttribute('data-i18n');
        const keys = key.split('.');
        let translation = currentTranslations;
        
        for (let k of keys) {
            if (translation) {
                translation = translation[k];
            } else {
                break;
            }
        }
        
        if (translation !== undefined) {
            option.innerText = translation;
        }
    });
}

// Set language and save preference
function setLanguage(lang) {
    if (!supportedLangs.includes(lang)) lang = 'en';
    
    localStorage.setItem('lang', lang);
    document.documentElement.lang = lang;
    loadTranslations(lang);
    updateLanguageSelector(lang);
}

// Update language selector UI
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

// Mobile menu toggle
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

// Products filtering
function setupProductsFilter() {
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
                alert(currentTranslations.contact?.validation_error || 'Please fill in all required fields');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert(currentTranslations.contact?.email_error || 'Please enter a valid email address');
                return;
            }
            
            // Form data would be sent to server in a real implementation
            alert(currentTranslations.contact?.thank_you || 'Thank you for your inquiry! We will contact you shortly.');
            leadForm.reset();
        });
    }
}

// Helper function to translate strings
function translate(key) {
    const keys = key.split('.');
    let translation = currentTranslations;
    for (let k of keys) {
        if (translation) {
            translation = translation[k];
        } else {
            break;
        }
    }
    return translation !== undefined ? translation : key;
}

// Smooth scrolling
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const mainNav = document.getElementById('mainNav');
                if (mainNav && mainNav.classList.contains('active')) {
                    mainNav.classList.remove('active');
                    const icon = document.getElementById('mobileMenuBtn').querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
    });
}

// Initialize everything
async function init() {
    setupMobileMenu();
    setupLanguageSelector();
    setupProductsFilter();
    setupContactForm();
    setupSmoothScrolling();
    
    // Set initial language
    const savedLang = localStorage.getItem('lang');
    const browserLang = navigator.language.split('-')[0];
    const initialLang = savedLang || (supportedLangs.includes(browserLang) ? browserLang : 'ru');
    
    setLanguage(initialLang);
}

// Start when DOM is ready
document.addEventListener('DOMContentLoaded', init);
{/* </script> */}