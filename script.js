const translations = {
    en: {
        title: "Your Mental Wellness Companion",
        subtitle: "Experience 24/7 support with our AI-powered mental health chatbot. Professional guidance, emotional support, and practical tools - all in one place.",
        startChat: "Start Chat",
        features: "Features",
        about: "About",
        contact: "Contact",
        login: "Login",
        contactUs: "Contact Us",
        quickLinks: "Quick Links",
        operatingHours: "Operating Hours",
        connectWithUs: "Connect With Us",
        getInTouch: "Get in Touch",
        aboutUs: "About Us",
        privacyPolicy: "Privacy Policy",
        termsOfService: "Terms of Service"
    },
    hi: {
        title: "आपका मानसिक स्वास्थ्य साथी",
        subtitle: "हमारे AI-संचालित मानसिक स्वास्थ्य चैटबोट के साथ 24/7 सहायता का अनुभव करें। पेशेवर मार्गदर्शन, भावनात्मक सहायता, और व्यावहारिक टूल - सब एक जगह पर।",
        startChat: "चैट शुरू करें",
        features: "सुविधाएं",
        about: "हमारे बारे में",
        contact: "संपर्क करें",
        login: "लॉग इन",
        contactUs: "संपर्क करें",
        quickLinks: "त्वरित लिंक",
        operatingHours: "कार्य समय",
        connectWithUs: "हमसे जुड़ें",
        getInTouch: "संपर्क में रहें",
        aboutUs: "हमारे बारे में",
        privacyPolicy: "गोपनीयता नीति",
        termsOfService: "सेवा की शर्तें"
    },
    es: {
        title: "Tu Compañero de Bienestar Mental",
        subtitle: "Experimente soporte 24/7 con nuestro chatbot de salud mental impulsado por IA. Orientación profesional, apoyo emocional y herramientas prácticas, todo en un solo lugar.",
        startChat: "Iniciar Chat",
        features: "Características",
        about: "Acerca de",
        contact: "Contacto",
        login: "Iniciar Sesión",
        contactUs: "Contáctenos",
        quickLinks: "Enlaces Rápidos",
        operatingHours: "Horario de Atención",
        connectWithUs: "Conéctese con Nosotros",
        getInTouch: "Póngase en Contacto",
        aboutUs: "Sobre Nosotros",
        privacyPolicy: "Política de Privacidad",
        termsOfService: "Términos de Servicio"
    }
};

let currentLanguage = 'en';

function toggleLanguageMenu() {
    document.getElementById('languageMenu').classList.toggle('show');
}

function changeLanguage(lang) {
    currentLanguage = lang;
    document.getElementById('current-lang').textContent = lang.toUpperCase();
    document.getElementById('languageMenu').classList.remove('show');
    updateContent();

    // Save language preference
    localStorage.setItem('preferredLanguage', lang);
}

function updateContent() {
    // Update main content
    document.querySelector('.hero-content h1').textContent = translations[currentLanguage].title;
    document.querySelector('.hero-content .subtitle').textContent = translations[currentLanguage].subtitle;
    document.querySelector('.chatbot-button span').textContent = translations[currentLanguage].startChat;

    // Update navigation
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks[0].textContent = translations[currentLanguage].features;
    navLinks[1].textContent = translations[currentLanguage].about;
    navLinks[2].textContent = translations[currentLanguage].contact;
    navLinks[3].textContent = translations[currentLanguage].login;

    // Update footer sections
    document.querySelectorAll('.footer-section h3')[0].textContent = translations[currentLanguage].contactUs;
    document.querySelectorAll('.footer-section h3')[1].textContent = translations[currentLanguage].quickLinks;
    document.querySelectorAll('.footer-section h3')[2].textContent = translations[currentLanguage].operatingHours;
    document.querySelectorAll('.footer-section h3')[3].textContent = translations[currentLanguage].connectWithUs;

    // Update footer links
    const footerLinks = document.querySelectorAll('.footer-section:nth-child(2) a');
    footerLinks[0].textContent = translations[currentLanguage].features;
    footerLinks[1].textContent = translations[currentLanguage].getInTouch;
    footerLinks[2].textContent = translations[currentLanguage].aboutUs;
    footerLinks[3].textContent = translations[currentLanguage].privacyPolicy;
    footerLinks[4].textContent = translations[currentLanguage].termsOfService;

    // Update HTML lang attribute
    document.documentElement.lang = currentLanguage;
}

// Initialize language from localStorage or default to English
document.addEventListener('DOMContentLoaded', () => {
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage) {
        changeLanguage(savedLanguage);
    }
});

// Close dropdown when clicking outside
window.onclick = function (event) {
    if (!event.target.matches('.language-btn')) {
        const dropdowns = document.getElementsByClassName('language-dropdown');
        for (const dropdown of dropdowns) {
            if (dropdown.classList.contains('show')) {
                dropdown.classList.remove('show');
            }
        }
    }
}

gsap.from(".logo-container", {
    duration: 1,
    y: -50,
    opacity: 0,
    ease: "power3.out"
});

gsap.from(".hero-content", {
    duration: 1,
    x: -100,
    opacity: 0,
    delay: 0.5,
    ease: "power3.out"
});

gsap.from(".chat-preview", {
    duration: 1,
    x: 100,
    opacity: 0,
    delay: 0.5,
    ease: "power3.out"
});

function openChatbot() {
    document.getElementById('overlay').style.display = 'block';
    document.getElementById('chatbotPopup').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeChatbot() {
    document.getElementById('overlay').style.display = 'none';
    document.getElementById('chatbotPopup').style.display = 'none';
    document.body.style.overflow = 'auto';
}

document.getElementById('overlay').addEventListener('click', closeChatbot);

function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    const hamburger = document.querySelector('.hamburger');

    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');

    // Add this to prevent body scrolling when menu is open
    document.body.classList.toggle('menu-open');
}

// Add this to close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.hamburger') && !e.target.closest('.nav-links')) {
        const navLinks = document.querySelector('.nav-links');
        const hamburger = document.querySelector('.hamburger');
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    }
});

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        const hamburger = document.querySelector('.hamburger');
        const navLinks = document.querySelector('.nav-links');

        hamburger.classList.remove('active');
        navLinks.classList.remove('show');
        document.body.style.overflow = 'auto';
    });
});

function toggleChatbot() {
    const chatbot = document.getElementById('chatbot-popup');
    if (chatbot.style.display === 'none' || chatbot.style.display === '') {
        chatbot.style.display = 'block';
    } else {
        chatbot.style.display = 'none';
    }
}

document.addEventListener('click', (e) => {
    const chatbotPopup = document.getElementById('chatbot-popup');
    const chatbotButton = document.querySelector('.chatbot-button');

    if (!chatbotPopup.contains(e.target) &&
        !chatbotButton.contains(e.target) &&
        chatbotPopup.classList.contains('active')) {
        toggleChatbot();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const chatbotPopup = document.getElementById('chatbot-popup');
        if (chatbotPopup.classList.contains('active')) {
            toggleChatbot();
        }
    }
});

// Make chatbot draggable and resizable
document.addEventListener('DOMContentLoaded', function () {
    const chatbot = document.getElementById('chatbot-popup');
    let isDragging = false;
    let currentX;
    let currentY;
    let initialX;
    let initialY;

    chatbot.addEventListener('mousedown', function (e) {
        if (e.target.classList.contains('chatbot-header')) {
            isDragging = true;
            initialX = e.clientX - chatbot.offsetLeft;
            initialY = e.clientY - chatbot.offsetTop;
        }
    });

    document.addEventListener('mousemove', function (e) {
        if (isDragging) {
            e.preventDefault();
            currentX = e.clientX - initialX;
            currentY = e.clientY - initialY;
            chatbot.style.left = currentX + 'px';
            chatbot.style.top = currentY + 'px';
        }
    });

    document.addEventListener('mouseup', function () {
        isDragging = false;
    });
});
