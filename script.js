// ===========================
// SMOOTH SCROLLING
// ===========================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===========================
// ATIVO NA NAVBAR
// ===========================

function updateActiveLink() {
    const links = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('main section');

    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    links.forEach(link => {
        link.style.borderBottomColor = 'transparent';
        if (link.getAttribute('href').slice(1) === current) {
            link.style.borderBottomColor = '#2e7d32';
            link.style.color = '#2e7d32';
        } else {
            link.style.color = '#333';
        }
    });
}

window.addEventListener('scroll', updateActiveLink);

// ===========================
// ANIMAÇÃO AO SCROLL
// ===========================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(card);
});

// ===========================
// FEEDBACK DO USUÁRIO
// ===========================

document.addEventListener('DOMContentLoaded', () => {
    console.log('🌾 Bem-vindo ao site Agrinho 2026!');
    console.log('Acesse as seções através do menu de navegação ou role a página.');
});

// ===========================
// DICA: MOBILE DETECTION
// ===========================

const isMobile = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

if (isMobile()) {
    console.log('📱 Versão mobile detectada - interface otimizada');
}