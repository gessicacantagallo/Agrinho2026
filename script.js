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
            // Adiciona focus para acessibilidade
            target.focus();
        }
    });
});

// ===========================
// NAVBAR ATIVO
// ===========================

function updateActiveLink() {
    const links = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('main section');

    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    links.forEach(link => {
        link.style.borderBottomColor = 'transparent';
        link.style.color = '#333';
        
        if (link.getAttribute('href').slice(1) === current) {
            link.style.borderBottomColor = '#2e7d32';
            link.style.color = '#2e7d32';
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

document.querySelectorAll('.card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
    observer.observe(card);
});

// ===========================
// FAQ INTERATIVO
// ===========================

const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const summary = item.querySelector('summary');
    const details = item;

    summary.addEventListener('click', (e) => {
        // Fecha todas as outras FAQs quando uma é aberta
        faqItems.forEach(other => {
            if (other !== item && other.hasAttribute('open')) {
                other.removeAttribute('open');
            }
        });
    });

    // Suporte para teclado
    summary.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            if (details.hasAttribute('open')) {
                details.removeAttribute('open');
            } else {
                details.setAttribute('open', '');
            }
        }
    });
});

// ===========================
// FEEDBACK DO USUÁRIO
// ===========================

document.addEventListener('DOMContentLoaded', () => {
    console.log('🌾 Bem-vindo ao site Agrinho 2026!');
    console.log('Lei nº 9.974/00 - Responsabilidade Compartilhada');
    console.log('Para dúvidas, consulte o fabricante do produto ou visite um centro de recebimento.');
});

// ===========================
// DETECÇÃO DE MOBILE
// ===========================

const isMobile = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

if (isMobile()) {
    document.body.classList.add('is-mobile');
    console.log('📱 Versão mobile detectada - interface otimizada');
}

// ===========================
// PRESSIONAR TECLA ESC PARA FECHAR FAQ
// ===========================

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        faqItems.forEach(item => {
            if (item.hasAttribute('open')) {
                item.removeAttribute('open');
            }
        });
    }
});

// ===========================
// SCROLL TO TOP (OPCIONAL)
// ===========================

function showScrollToTopButton() {
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');
    
    if (scrollY > 300) {
        if (!scrollToTopBtn) {
            const btn = document.createElement('button');
            btn.id = 'scrollToTopBtn';
            btn.innerHTML = '⬆️ Voltar ao Topo';
            btn.style.cssText = `
                position: fixed;
                bottom: 20px;
                right: 20px;
                padding: 10px 15px;
                background-color: #2e7d32;
                color: white;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                z-index: 99;
                font-size: 14px;
                transition: all 0.3s ease;
                box-shadow: 0 2px 8px rgba(0,0,0,0.2);
            `;
            
            btn.addEventListener('mouseover', () => {
                btn.style.backgroundColor = '#388e3c';
                btn.style.boxShadow = '0 8px 16px rgba(0,0,0,0.3)';
            });
            
            btn.addEventListener('mouseout', () => {
                btn.style.backgroundColor = '#2e7d32';
                btn.style.boxShadow = '0 2px 8px rgba(0,0,0,0.2)';
            });
            
            btn.addEventListener('click', () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
            
            document.body.appendChild(btn);
        }
    } else {
        const scrollToTopBtn = document.getElementById('scrollToTopBtn');
        if (scrollToTopBtn) {
            scrollToTopBtn.remove();
        }
    }
}

window.addEventListener('scroll', showScrollToTopButton);

// ===========================
// ANALYTICS SIMPLES
// ===========================

function trackSectionView(sectionId) {
    console.log(`📍 Visualizou seção: ${sectionId}`);
}

document.querySelectorAll('main section').forEach(section => {
    const id = section.getAttribute('id');
    observer.observe(section);
    
    const trackObserver = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
            trackSectionView(id);
        }
    }, { threshold: 0.5 });
    
    trackObserver.observe(section);
});