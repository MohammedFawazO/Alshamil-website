// Scroll Animation Observer
document.addEventListener('DOMContentLoaded', function() {
    
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe all animation elements
    const animatedElements = document.querySelectorAll(
        '.fade-in, .slide-up, .fade-in-up, .fade-in-left, .fade-in-right, .zoom-in, .pop-in, .slide-in-left, .slide-in-right'
    );
    
    animatedElements.forEach(el => observer.observe(el));

    // Counter Animation
    const counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                animateCounter(entry.target);
                entry.target.classList.add('counted');
            }
        });
    }, { threshold: 0.5 });

    const counters = document.querySelectorAll('.count-up');
    counters.forEach(counter => counterObserver.observe(counter));

    function animateCounter(element) {
        const numberElement = element.querySelector('.stat-number');
        if (!numberElement) return;
        
        const target = parseInt(numberElement.getAttribute('data-count')) || 0;
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                numberElement.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                numberElement.textContent = target;
            }
        };

        updateCounter();
    }

    // Hero overlay and content animation on scroll
    const heroSection = document.querySelector('.hero-section');
    const heroOverlay = document.querySelector('.hero-overlay');
    const heroContent = document.querySelector('.hero-content');
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    if (heroSection && heroOverlay && heroContent) {
        let ticking = false;
        const threshold = 50; // px scrolled before effects trigger

        function updateHero() {
            const scrolled = window.scrollY > threshold;
            
            // Add/remove 'scrolled' class for section, overlay and content
            heroSection.classList.toggle('scrolled', scrolled);
            heroOverlay.classList.toggle('scrolled', scrolled);
            heroContent.classList.toggle('scrolled', scrolled);
            
            // Hide scroll indicator when user scrolls
            if (scrollIndicator) {
                scrollIndicator.classList.toggle('hidden', scrolled);
            }
            
            ticking = false;
        }

        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(updateHero);
                ticking = true;
            }
        });
    }

    // CTA Button Animation Sequence
    const ctaButton = document.querySelector('.hero-content .cta-button');
    if (ctaButton) {
        console.log('CTA Button found:', ctaButton);
        
        // First, fade in the button
        setTimeout(() => {
            ctaButton.classList.add('fade-in-complete');
            console.log('Fade-in complete class added');
        }, 100);
        
        // Then start the floating pulse animation after fade-in completes
        setTimeout(() => {
            // Remove any transition to allow animation to work
            ctaButton.style.transition = 'none';
            ctaButton.classList.add('pulse-animation');
            console.log('Pulse animation class added');
            console.log('Button classes:', ctaButton.className);
        }, 2000); // 100ms + 1900ms (to allow fade-in transition to complete)
    } else {
        console.log('CTA Button not found!');
    }

    // Parallax Scrolling Effect
    let parallaxTicking = false;
    
    window.addEventListener('scroll', function() {
        if (!parallaxTicking) {
            window.requestAnimationFrame(() => {
                const scrolled = window.pageYOffset;
                
                // Hero parallax
                const hero = document.getElementById('hero');
                if (hero) {
                    hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
                }

                // Services background parallax
                const servicesBg = document.getElementById('services-bg');
                if (servicesBg) {
                    const rect = servicesBg.getBoundingClientRect();
                    if (rect.top < window.innerHeight && rect.bottom > 0) {
                        servicesBg.style.backgroundPositionY = (scrolled - servicesBg.offsetTop) * 0.5 + 'px';
                    }
                }

                // Stats background parallax
                const statsBg = document.getElementById('stats-bg');
                if (statsBg) {
                    const rect = statsBg.getBoundingClientRect();
                    if (rect.top < window.innerHeight && rect.bottom > 0) {
                        statsBg.style.backgroundPositionY = (scrolled - statsBg.offsetTop) * 0.5 + 'px';
                    }
                }

                // Parallax sections (from second CSS file)
                const parallaxBgs = document.querySelectorAll('.parallax-bg');
                parallaxBgs.forEach(bg => {
                    const rect = bg.getBoundingClientRect();
                    if (rect.top < window.innerHeight && rect.bottom > 0) {
                        const speed = 0.5;
                        const yPos = -(scrolled * speed);
                        bg.style.transform = `translateY(${yPos}px)`;
                    }
                });
                
                parallaxTicking = false;
            });
            parallaxTicking = true;
        }
    });

    // Smooth scroll for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            // Skip if it's just "#"
            if (href === '#') {
                e.preventDefault();
                return;
            }
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Update URL hash for accessibility
                history.pushState(null, '', href);
            }
        });
    });
});

// Navbar scroll behavior
const navbar = document.querySelector('.site-nav');
if (navbar) {
    let navTicking = false;
    
    window.addEventListener('scroll', () => {
        if (!navTicking) {
            window.requestAnimationFrame(() => {
                if (window.scrollY > 50) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
                navTicking = false;
            });
            navTicking = true;
        }
    });
}

// Back to Top Button
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
        opacity: 0;
        visibility: hidden;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(12, 22, 36, 0.3);
        transition: all 0.3s ease;
        font-size: 18px;
    `;
    document.body.appendChild(backToTop);

    let scrollTicking = false;
    
    window.addEventListener('scroll', () => {
        if (!scrollTicking) {
            window.requestAnimationFrame(() => {
                if (window.pageYOffset > 300) {
                    backToTop.style.opacity = '1';
                    backToTop.style.visibility = 'visible';
                } else {
                    backToTop.style.opacity = '0';
                    backToTop.style.visibility = 'hidden';
                }
                scrollTicking = false;
            });
            scrollTicking = true;
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
        backToTop.style.boxShadow = '0 6px 20px rgba(12, 22, 36, 0.4)';
    });

    backToTop.addEventListener('mouseleave', () => {
        backToTop.style.transform = 'scale(1) translateY(0)';
        backToTop.style.boxShadow = '0 4px 12px rgba(12, 22, 36, 0.3)';
    });
}

// Initialize back to top button
createBackToTop();