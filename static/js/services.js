// Reveal animations on scroll with improved performance
document.addEventListener("DOMContentLoaded", () => {
    const elements = document.querySelectorAll(".fade-in-up");

    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add staggered delay based on position
                setTimeout(() => {
                    entry.target.classList.add("visible");
                }, index * 100);
                
                // Stop observing after animation triggers
                observer.unobserve(entry.target);
            }
        });
    }, { 
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    });

    elements.forEach(el => observer.observe(el));

    // Combined scroll effects: Parallax + Navbar
    const hero = document.querySelector('.services-hero');
    const navbar = document.querySelector('.site-nav');

    if (window.innerWidth > 768 && hero) {
        let ticking = false;
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const scrolled = window.pageYOffset;
                    
                    // Navbar scroll behavior
                    if (navbar && scrolled > 50) {
                        navbar.classList.add('scrolled');
                    } else if (navbar) {
                        navbar.classList.remove('scrolled');
                    }
                    
                    // Hero parallax effect
                    const parallaxSpeed = 0.5;
                    hero.style.backgroundPositionY = `${scrolled * parallaxSpeed}px`;
                    
                    ticking = false;
                });
                ticking = true;
            }
        });
    } else if (navbar) {
        // Just navbar scroll behavior for mobile or if no hero
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            if (scrolled > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // Add ripple effect to CTA button
    const ctaButton = document.querySelector('.cta-section .btn');
    if (ctaButton) {
        ctaButton.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    }

    // Animate service cards sequentially when they appear
    const serviceCards = document.querySelectorAll('.service-card');
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                cardObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    serviceCards.forEach((card, index) => {
        card.style.animation = `slideInUp 0.6s ease-out ${index * 0.2}s both paused`;
        cardObserver.observe(card);
    });

    // Video play/pause controls
    const videoCards = document.querySelectorAll('.video-card');
    videoCards.forEach(card => {
        const video = card.querySelector('video');
        const overlay = card.querySelector('.video-overlay');
        
        if (video && overlay) {
            video.addEventListener('play', () => {
                overlay.style.opacity = '0';
            });
            
            video.addEventListener('pause', () => {
                overlay.style.opacity = '1';
            });
            
            video.addEventListener('ended', () => {
                overlay.style.opacity = '1';
            });
        }
    });

    // Animated counter for statistics
    const statNumbers = document.querySelectorAll('.stat-number');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                animateCounter(entry.target, target);
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(stat => statsObserver.observe(stat));

function animateCounter(element, target) {
        let current = 0;
        const increment = target / 50;
        const duration = 2000;
        const stepTime = duration / 50;
        const suffix = element.getAttribute('data-suffix') || '';
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target + suffix;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current) + suffix;
            }
        }, stepTime);
    }
});

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px) scale(0.95);
        }
        to {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Back to top button
function createBackToTop() {
    const backToTop = document.createElement('button');
    backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTop.className = 'back-to-top';
    backToTop.setAttribute('aria-label', 'Back to top');
    backToTop.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #4A8ABA, #26B6CB);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        display: none;
        z-index: 1000;
        box-shadow: 0 4px 12px  rgba(0, 0, 0, 0.01);
        transition: all 0.3s ease;
    `;
    document.body.appendChild(backToTop);

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTop.style.display = 'block';
        } else {
            backToTop.style.display = 'none';
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    backToTop.addEventListener('mouseenter', () => {
        backToTop.style.transform = 'scale(1.1) translateY(-5px)';
        backToTop.style.boxShadow = '0 6px 20px  rgba(0, 0, 0, 0.03)';
    });

    backToTop.addEventListener('mouseleave', () => {
        backToTop.style.transform = 'scale(1) translateY(0)';
        backToTop.style.boxShadow = '0 4px 12px  rgba(0, 0, 0, 0.03)';
    });
}

// Initialize back to top button
createBackToTop();