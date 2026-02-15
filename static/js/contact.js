// ==========================================
// Contact Page JavaScript - Al Shamil Turning Company
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ==========================================
    // Smooth Scrolling
    // ==========================================
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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


    // ==========================================
    // Hero Scroll Animation
    // ==========================================
    
    const heroScroll = document.querySelector('.hero-scroll');
    if (heroScroll) {
        heroScroll.addEventListener('click', function() {
            const contactSection = document.querySelector('.contact-section');
            if (contactSection) {
                contactSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }

    // ==========================================
    // Form Handling
    // ==========================================
    
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                service: document.getElementById('service').value,
                message: document.getElementById('message').value
            };

            // Basic validation
            if (!formData.name || !formData.email || !formData.phone || !formData.message) {
                showMessage('Please fill in all required fields.', 'error');
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) {
                showMessage('Please enter a valid email address.', 'error');
                return;
            }

            // Get submit button and text
            const submitBtn = contactForm.querySelector('.submit-btn');
            const btnText = submitBtn.querySelector('.btn-text');
            const originalText = btnText.textContent;
            
            // Disable button and show loading
            submitBtn.disabled = true;
            btnText.textContent = 'Sending...';

            // Real form submission
            fetch('/api/contact/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': getCookie('csrftoken')
                },
                body: JSON.stringify(formData)
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    showMessage(data.message || 'Thank you for contacting us! We will get back to you within 24 hours.', 'success');
                    contactForm.reset();
                    
                    // Hide message after 5 seconds
                    setTimeout(() => {
                        formMessage.style.display = 'none';
                    }, 5000);
                } else {
                    showMessage(data.message || 'Something went wrong. Please try again.', 'error');
                }
                submitBtn.disabled = false;
                btnText.textContent = originalText;
            })
            .catch(error => {
                console.error('Error:', error);
                showMessage('Network error. Please check your connection and try again.', 'error');
                submitBtn.disabled = false;
                btnText.textContent = originalText;
            });
        });
    }

    function showMessage(message, type) {
        formMessage.textContent = message;
        formMessage.className = `form-message ${type}`;
        formMessage.style.display = 'block';
        
        // Scroll to message
        formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    // ==========================================
    // FAQ Accordion
    // ==========================================
    
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            // Close other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });

    // ==========================================
    // Scroll Animations
    // ==========================================
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Animate sections on scroll
    const animateElements = document.querySelectorAll(
        '.info-card, .service-item, .gallery-item, .faq-item, .map-info-item'
    );

    animateElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });

    // ==========================================
    // Gallery Lightbox Effect (Optional Enhancement)
    // ==========================================
    
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const overlay = this.querySelector('.gallery-overlay');
            overlay.style.opacity = overlay.style.opacity === '1' ? '0' : '1';
        });
    });

    // ==========================================
    // Contact Info Cards Stagger Animation
    // ==========================================
    
    const infoCards = document.querySelectorAll('.info-card');
    
    infoCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });

    // ==========================================
    // Form Input Animations
    // ==========================================
    
    const formInputs = document.querySelectorAll('.form-group input, .form-group select, .form-group textarea');
    
    formInputs.forEach(input => {
        // Add focus effect
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
            if (this.value) {
                this.parentElement.classList.add('has-value');
            } else {
                this.parentElement.classList.remove('has-value');
            }
        });

        // Add floating label effect
        if (input.value) {
            input.parentElement.classList.add('has-value');
        }
    });

    // ==========================================
    // Services Cards Hover Effect
    // ==========================================
    
    const serviceItems = document.querySelectorAll('.service-item');
    
    serviceItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            serviceItems.forEach(otherItem => {
                if (otherItem !== this) {
                    otherItem.style.opacity = '0.6';
                }
            });
        });
        
        item.addEventListener('mouseleave', function() {
            serviceItems.forEach(otherItem => {
                otherItem.style.opacity = '1';
            });
        });
    });

    // ==========================================
    // Scroll Progress Indicator
    // ==========================================
    
    function updateScrollProgress() {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollPercent = (scrollTop / (documentHeight - windowHeight)) * 100;
        
        // You can use this to update a progress bar if you add one to the HTML
        // progressBar.style.width = scrollPercent + '%';
    }

    window.addEventListener('scroll', updateScrollProgress);
// ==========================================
// Combined Scroll Effects: Parallax + Navbar
// ==========================================

const heroSection = document.querySelector('.contact-hero');
const navbar = document.querySelector('.site-nav');

window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    
    // Navbar scroll behavior
    if (scrolled > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Hero parallax effect
    if (heroSection && scrolled < window.innerHeight) {
        const parallaxSpeed = 0.5;
        heroSection.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
    }
});

    // ==========================================
    // Phone Number Formatting
    // ==========================================
    
    const phoneInput = document.getElementById('phone');
    
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            
            // Format as UAE number
            if (value.length > 0) {
                if (value.startsWith('971')) {
                    value = '+' + value;
                } else if (!value.startsWith('+')) {
                    value = '+971' + value;
                }
            }
            
            e.target.value = value;
        });
    }

    // ==========================================
    // Map Info Animation on Scroll
    // ==========================================
    
    const mapSection = document.querySelector('.map-section');
    
    if (mapSection) {
        const mapObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const mapInfoItems = document.querySelectorAll('.map-info-item');
                    mapInfoItems.forEach((item, index) => {
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        }, index * 150);
                    });
                    mapObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        mapObserver.observe(mapSection);
    }

    // ==========================================
    // Gallery Grid Animation
    // ==========================================
    
    const galleryGrid = document.querySelector('.gallery-grid');
    
    if (galleryGrid) {
        const galleryObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const items = entry.target.querySelectorAll('.gallery-item');
                    items.forEach((item, index) => {
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, index * 100);
                    });
                    galleryObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        
        galleryObserver.observe(galleryGrid);
        
        // Set initial state
        galleryItems.forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.9)';
            item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        });
    }

    // ==========================================
    // Social Links Animation
    // ==========================================
    
    const socialLinks = document.querySelectorAll('.social-link');
    
    socialLinks.forEach((link, index) => {
        link.style.animationDelay = `${index * 0.1}s`;
    });

    // ==========================================
    // Add Active State to Current Page in Navigation
    // ==========================================
    
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        }
    });

    // ==========================================
    // Counter Animation for Stats (if added)
    // ==========================================
    
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(start);
            }
        }, 16);
    }

    // ==========================================
    // Lazy Load Images
    // ==========================================
    
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    }

    // ==========================================
    // Add Tooltip Functionality
    // ==========================================
    
    function createTooltip(element, text) {
        const tooltip = document.createElement('div');
        tooltip.className = 'custom-tooltip';
        tooltip.textContent = text;
        document.body.appendChild(tooltip);
        
        element.addEventListener('mouseenter', function(e) {
            tooltip.style.display = 'block';
            tooltip.style.left = e.pageX + 10 + 'px';
            tooltip.style.top = e.pageY + 10 + 'px';
        });
        
        element.addEventListener('mousemove', function(e) {
            tooltip.style.left = e.pageX + 10 + 'px';
            tooltip.style.top = e.pageY + 10 + 'px';
        });
        
        element.addEventListener('mouseleave', function() {
            tooltip.style.display = 'none';
        });
    }

    // ==========================================
    // Utility Function: Get CSRF Token for Django
    // ==========================================
    
    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    // ==========================================
    // Back to Top Button (if added to HTML)
    // ==========================================
    
    function createBackToTop() {
        const backToTop = document.createElement('button');
        backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
        backToTop.className = 'back-to-top';
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
            box-shadow: 0 4px 12px rgba(12, 22, 36, 0.3);
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
        });
        
        backToTop.addEventListener('mouseleave', () => {
            backToTop.style.transform = 'scale(1) translateY(0)';
        });
    }

    // Initialize back to top button
    createBackToTop();

    // ==========================================
    // Console Welcome Message
    // ==========================================
    
    console.log('%c Al Shamil Turning Company ', 'background: linear-gradient(135deg, #4A8ABA, #26B6CB); color: white; font-size: 20px; padding: 10px 20px; border-radius: 5px;');
    console.log('%c Thank you for visiting our website! ', 'color: #4A8ABA; font-size: 14px; padding: 5px;');

    // ==========================================
    // Performance Optimization
    // ==========================================
    
    // Debounce function for scroll events
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Apply debounce to scroll events
    window.addEventListener('scroll', debounce(() => {
        updateScrollProgress();
    }, 10));

    // ==========================================
    // Accessibility Improvements
    // ==========================================
    
    // Add keyboard navigation to FAQ
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.setAttribute('tabindex', '0');
        question.setAttribute('role', 'button');
        question.setAttribute('aria-expanded', 'false');
        
        question.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
                this.setAttribute('aria-expanded', item.classList.contains('active'));
            }
        });
    });

    // ==========================================
    // Initialize All Features
    // ==========================================
    
    console.log('Contact page initialized successfully!');
    
});