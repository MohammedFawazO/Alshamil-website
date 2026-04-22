// ==================== PARALLAX SCROLLING ====================
function initParallax() {
    const parallaxSections = document.querySelectorAll('.parallax-section');
    
    window.addEventListener('scroll', () => {
        parallaxSections.forEach(section => {
            const scrolled = window.pageYOffset;
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const speed = section.dataset.speed || 0.5;
            
            // Check if section is in viewport
            if (scrolled + window.innerHeight > sectionTop && scrolled < sectionTop + sectionHeight) {
                const parallaxBg = section.querySelector('.parallax-bg');
                if (parallaxBg) {
                    const yPos = (scrolled - sectionTop) * speed;
                    parallaxBg.style.transform = `translateY(${yPos}px)`;
                }
            }
        });
    });
}

// ==================== SCROLL ANIMATIONS ====================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Trigger counter animation if it's a counter item
                if (entry.target.classList.contains('counter-item')) {
                    animateCounter(entry.target);
                }
            }
        });
    }, observerOptions);
    
    // Observe all animated elements
    const animatedElements = document.querySelectorAll(
        '.slide-in-left, .slide-in-right, .counter-item, .facility-item'
    );
    
    animatedElements.forEach(el => observer.observe(el));
}

// ==================== COUNTER ANIMATION ====================
function animateCounter(element) {
    const targetEl = element.querySelector('.stat-number');
    if (!targetEl || targetEl.classList.contains('counted')) return;

    targetEl.classList.add('counted');

    const finalValue = Number(targetEl.dataset.target) || 0;
    const displayValue = targetEl.dataset.display || finalValue;
    const suffix = targetEl.dataset.suffix || '';
    const providedDuration = Number(targetEl.dataset.duration) || 0;

    // If author provided a duration data attribute use it, otherwise compute a gentle duration
    // Scale duration with the target value but clamp between 2000ms and 8000ms
    const duration = providedDuration || Math.min(8000, Math.max(2000, finalValue * 30));

    const startTime = performance.now();

    // easing for a smooth slow finish
    function easeOutQuad(t) {
        return t * (2 - t);
    }

    function update(now) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = easeOutQuad(progress);
        const current = Math.round(finalValue * eased);
        targetEl.textContent = current + suffix;

        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            targetEl.textContent = displayValue + suffix;
        }
    }

    requestAnimationFrame(update);
}


// ==================== SMOOTH SCROLL ====================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}
// Navbar scroll behavior
const navbar = document.querySelector('.site-nav');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});
// ==================== IMAGE LAZY LOADING ENHANCEMENT ====================
function enhanceImageLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    images.forEach(img => {
        img.addEventListener('load', () => {
            img.style.opacity = '0';
            setTimeout(() => {
                img.style.transition = 'opacity 0.5s ease';
                img.style.opacity = '1';
            }, 50);
        });
    });
}

// ==================== HOVER EFFECTS FOR CARDS ====================
function initCardEffects() {
    const cards = document.querySelectorAll('.card, .service-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function(e) {
            const x = e.offsetX;
            const y = e.offsetY;
            const width = this.offsetWidth;
            const height = this.offsetHeight;
            
            const xRotation = ((y - height / 2) / height) * 10;
            const yRotation = ((x - width / 2) / width) * -10;
            
            this.style.transform = `perspective(1000px) rotateX(${xRotation}deg) rotateY(${yRotation}deg) translateY(-10px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
}

// ==================== PERFORMANCE OPTIMIZATION ====================
function optimizePerformance() {
    // Throttle scroll events
    let ticking = false;
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                ticking = false;
            });
            ticking = true;
        }
    });
}

// ==================== INITIALIZE ALL FEATURES ====================
document.addEventListener('DOMContentLoaded', () => {
    initParallax();
    initScrollAnimations();
    initSmoothScroll();
    enhanceImageLoading();
    initCardEffects();
    optimizePerformance();
    
    // Add page load animation
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});


// ==================== SCROLL ANIMATIONS ====================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Trigger counter animation if it's a counter item
                if (entry.target.classList.contains('counter-item')) {
                    animateCounter(entry.target);
                }
            }
        });
    }, observerOptions);
    
    // Observe all animated elements
    const animatedElements = document.querySelectorAll(
        '.slide-in-left, .slide-in-right, .counter-item, .facility-item, .team-member'
    );
    
    animatedElements.forEach(el => observer.observe(el));
}