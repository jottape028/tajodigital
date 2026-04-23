/* TAJO Digital 3F - Intelligence Engine 
   Version: 1.0 - Future Elite
*/

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. LOADER SYSTEM ---
    // Remove a tela de carregamento após o carregamento completo
    const loader = document.querySelector('.iphone-loader');
    const body = document.body;

    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.style.opacity = '0';
            loader.style.visibility = 'hidden';
            body.classList.remove('loading');
        }, 2000); // Tempo para a animação da barra de progresso completar
    });

    // --- 2. FAQ INTERACTIVE & BACKGROUND BLUR ---
    const faqItems = document.querySelectorAll('.faq-item');
    const mainSections = document.querySelectorAll('section, header, .hero');

    faqItems.forEach(item => {
        item.addEventListener('click', () => {
            const isOpen = item.classList.contains('active');

            // Fecha todos os outros itens
            faqItems.forEach(i => i.classList.remove('active'));
            
            if (!isOpen) {
                item.classList.add('active');
                applySmartBlur(true);
            } else {
                applySmartBlur(false);
            }
        });
    });

    // --- 3. ELITE PROJECTS & VISION BLUR ---
    // Aplica desfoque no fundo ao interagir com cards de portfólio ou visão
    const interactiveCards = document.querySelectorAll('.portfolio-card, .mv-card, .btn-primary');

    interactiveCards.forEach(card => {
        card.addEventListener('mouseenter', () => applySmartBlur(true));
        card.addEventListener('mouseleave', () => {
            // Só remove o blur se não houver um FAQ aberto
            const hasActiveFaq = document.querySelector('.faq-item.active');
            if (!hasActiveFaq) applySmartBlur(false);
        });
    });

    // Função para gerenciar o desfoque global
    function applySmartBlur(activate) {
        mainSections.forEach(section => {
            if (!section.contains(event?.target)) {
                section.style.filter = activate ? 'blur(4px) saturate(50%)' : 'none';
                section.style.transition = 'filter 0.5s ease';
            }
        });
    }

    // --- 4. HEADER NEBULA EFFECT ---
    // Adiciona sombra e opacidade extra ao scroll
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.background = 'rgba(2, 2, 4, 0.9)';
            header.style.borderBottom = '1px solid var(--cyan)';
        } else {
            header.style.background = 'var(--glass)';
            header.style.borderBottom = '1px solid var(--border)';
        }
    });

    // --- 5. SMOOTH REVEAL (OPCIONAL) ---
    // Faz os elementos surgirem conforme o scroll
    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.portfolio-card, .value-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(el);
    });
});
