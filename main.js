// ===== MAIN JAVASCRIPT FILE =====

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all modules
    initLoader();
    initCustomCursor();
    initScrollProgress();
    initNavbar();
    initSmoothScrolling();
    initIntersectionObserver();
    initMagneticEffect();
    initCounterAnimation();
    initParallaxEffect();
    initBackToTop();
    initMobileMenu();
    initFormHandling();
    initTiltEffect();
    initTypingEffect();
    initParticles();
    initEnhancedInteractions();
    initDemoClickMessage();
});

// ===== LOADER ANIMATION =====
function initLoader() {
    const loader = document.getElementById('loader');
    const loaderCircle = document.getElementById('loaderCircle');
    
    // Check if user has already seen the loader in this session
    const hasSeenLoader = sessionStorage.getItem('hasSeenLoader');
    
    // Check if user is coming from a "Coming Soon" page
    const referrer = document.referrer;
    const isFromComingSoon = referrer && (
        referrer.includes('service-') || 
        referrer.includes('platform-') ||
        referrer.includes('coming-soon')
    );
    
    // Skip loader if coming from Coming Soon page or has seen loader before
    if (isFromComingSoon || hasSeenLoader) {
        if (loader) {
            loader.style.display = 'none';
            document.body.style.cursor = 'auto';
        }
        return;
    }
    
    // Mark that user has seen the loader
    sessionStorage.setItem('hasSeenLoader', 'true');
    
    // Show loader for a shorter time (1.5 seconds instead of 3)
    window.addEventListener('load', () => {
        setTimeout(() => {
            // Explode the circle before hiding loader
            if (loaderCircle) {
                loaderCircle.classList.add('explode');
                setTimeout(() => {
                    loader.style.opacity = '0';
                    setTimeout(() => {
                        loader.style.display = 'none';
                        document.body.style.cursor = 'auto';
                    }, 300); // Reduced from 500ms
                }, 600); // Reduced from 800ms
            } else {
                loader.style.opacity = '0';
                setTimeout(() => {
                    loader.style.display = 'none';
                    document.body.style.cursor = 'auto';
                }, 300);
            }
        }, 1500); // Reduced from 3000ms
    });
}

// ===== CUSTOM CURSOR =====
function initCustomCursor() {
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    
    if (!cursor || !cursorFollower) return;
    
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let followerX = 0;
    let followerY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function animateCursor() {
        // Smooth cursor movement
        cursorX += (mouseX - cursorX) * 0.1;
        cursorY += (mouseY - cursorY) * 0.1;
        
        // Smooth follower movement
        followerX += (mouseX - followerX) * 0.15;
        followerY += (mouseY - followerY) * 0.15;
        
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        
        cursorFollower.style.left = followerX + 'px';
        cursorFollower.style.top = followerY + 'px';
        
        requestAnimationFrame(animateCursor);
    }
    
    animateCursor();
    
    // Cursor hover effects
    const hoverElements = document.querySelectorAll('a, button, .magnetic, .feature-card, .founder-card, .stat-card');
    
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(2)';
            cursor.style.borderColor = '#f093fb';
            cursorFollower.style.transform = 'scale(0.5)';
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursor.style.borderColor = '#667eea';
            cursorFollower.style.transform = 'scale(1)';
        });
    });
}

// ===== SCROLL PROGRESS BAR =====
function initScrollProgress() {
    const progressBar = document.querySelector('.progress-bar');
    
    if (!progressBar) return;
    
    window.addEventListener('scroll', () => {
        const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// ===== NAVBAR SCROLL EFFECT =====
function initNavbar() {
    const navbar = document.getElementById('navbar');
    
    if (!navbar) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// ===== SMOOTH SCROLLING =====
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== INTERSECTION OBSERVER =====
function initIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe all animated elements
    const animatedElements = document.querySelectorAll('.fade-in, .scale-in');
    animatedElements.forEach(el => observer.observe(el));
}

// ===== MAGNETIC EFFECT =====
function initMagneticEffect() {
    const magneticElements = document.querySelectorAll('.magnetic');
    
    magneticElements.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            el.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
        });
        
        el.addEventListener('mouseleave', () => {
            el.style.transform = 'translate(0px, 0px)';
        });
    });
}

// ===== COUNTER ANIMATION =====
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number');
    
    const animateCounter = (counter) => {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += step;
            if (current < target) {
                counter.textContent = Math.floor(current).toLocaleString();
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target.toLocaleString();
            }
        };
        
        updateCounter();
    };
    
    // Create observer for counter animation
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    });
    
    counters.forEach(counter => counterObserver.observe(counter));
}

// ===== PARALLAX EFFECT =====
function initParallaxEffect() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.parallax');
        
        parallaxElements.forEach(el => {
            const speed = el.dataset.speed || 0.5;
            el.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// ===== BACK TO TOP =====
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    if (!backToTopBtn) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===== MOBILE MENU =====
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (!mobileMenuBtn) return;
    
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('active');
        if (mobileMenu) {
            mobileMenu.classList.toggle('active');
        }
    });
    
    // Close mobile menu when clicking on links
    const mobileLinks = document.querySelectorAll('.mobile-menu a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuBtn.classList.remove('active');
            if (mobileMenu) {
                mobileMenu.classList.remove('active');
            }
        });
    });
}

// ===== FORM HANDLING =====
function initFormHandling() {
    const contactForm = document.querySelector('.contact-form');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Show success message
        showNotification('Message sent successfully!', 'success');
        
        // Reset form
        this.reset();
    });
}

// ===== TILT EFFECT =====
function initTiltEffect() {
    const tiltElements = document.querySelectorAll('[data-tilt]');
    
    tiltElements.forEach(element => {
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
        });
    });
}

// ===== TYPING EFFECT =====
function initTypingEffect() {
    const heroTitle = document.querySelector('.hero-title');
    
    if (!heroTitle) return;
    
    setTimeout(() => {
        const originalText = heroTitle.textContent;
        heroTitle.innerHTML = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < originalText.length) {
                heroTitle.innerHTML += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 80);
            }
        };
        
        typeWriter();
    }, 2000);
}

// ===== ENHANCED INTERACTIONS =====
function initEnhancedInteractions() {
    // Enhanced feature card interactions
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
            this.style.zIndex = '10';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.zIndex = '1';
        });
    });
    
    // Enhanced founder card interactions
    const founderCards = document.querySelectorAll('.founder-card');
    founderCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) rotateY(5deg)';
            this.style.zIndex = '10';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotateY(0deg)';
            this.style.zIndex = '1';
        });
    });
    
    // Button click effects
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
    buttons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            createRippleEffect(this, e);
        });
    });
}

// ===== UTILITY FUNCTIONS =====

// Create ripple effect
function createRippleEffect(element, event) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.style.position = 'absolute';
    ripple.style.borderRadius = '50%';
    ripple.style.background = 'rgba(255, 255, 255, 0.3)';
    ripple.style.transform = 'scale(0)';
    ripple.style.animation = 'ripple 0.6s linear';
    ripple.style.pointerEvents = 'none';
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 2rem;
        background: ${type === 'success' ? '#4CAF50' : '#2196F3'};
        color: white;
        border-radius: 5px;
        z-index: 10000;
        animation: slideInRight 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Debounce function
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

// Throttle function
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Add CSS for ripple animation
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Performance optimization: Use requestAnimationFrame for smooth animations
function smoothScroll(target, duration = 1000) {
    const targetPosition = target.offsetTop - 80;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;
    
    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }
    
    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }
    
    requestAnimationFrame(animation);
}

// Export functions for use in other modules
window.AlaLinks = {
    smoothScroll,
    showNotification,
    debounce,
    throttle,
    isInViewport
}; 

// ===== DEMO CLICK MESSAGE HANDLER =====
function initDemoClickMessage() {
    // CSS for the floating message and animated dots
    const style = document.createElement('style');
    style.innerHTML = `
    .demo-message {
        position: fixed;
        z-index: 9999;
        background: #fff;
        color: #0084C9;
        border-radius: 1.5rem;
        box-shadow: 0 4px 24px 0 rgba(0,0,0,0.12);
        padding: 1.1rem 2.2rem;
        font-size: 1.2rem;
        font-weight: 700;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        pointer-events: none;
        opacity: 0;
        transition: opacity 0.2s, transform 0.2s;
        top: 0;
        left: 50%;
        transform: translate(-50%, -40px);
    }
    .demo-message.show {
        opacity: 1;
        transform: translate(-50%, 40px);
    }
    .demo-dot-anim { display: inline-block; }
    .demo-dot-anim span { opacity: 0.3; animation: demo-blink 1.2s infinite; }
    .demo-dot-anim span:nth-child(2) { animation-delay: 0.2s; }
    .demo-dot-anim span:nth-child(3) { animation-delay: 0.4s; }
    @keyframes demo-blink { 0%, 80%, 100% { opacity: 0.3; } 40% { opacity: 1; } }
    `;
    document.head.appendChild(style);

    let messageEl = null;
    let hideTimeout = null;

    function showDemoMessage() {
        if (messageEl) {
            clearTimeout(hideTimeout);
            messageEl.classList.remove('show');
            void messageEl.offsetWidth; // force reflow
        } else {
            messageEl = document.createElement('div');
            messageEl.className = 'demo-message';
            messageEl.innerHTML = `This is a demo. Functionality coming soon<span class='demo-dot-anim'><span>.</span><span>.</span><span>.</span></span>`;
            document.body.appendChild(messageEl);
        }
        messageEl.classList.add('show');
        hideTimeout = setTimeout(() => {
            messageEl.classList.remove('show');
        }, 2000);
    }

    // Helper: should this element trigger the message?
    function shouldShowDemoMessage(el) {
        if (!el) return false;
        
        // Platform links: let them work as before
        if (el.tagName === 'A' && el.getAttribute('href') && el.getAttribute('href').startsWith('platform-')) return false;
        
        // Service links: let them work as before (they have their own pages now)
        if (el.tagName === 'A' && el.getAttribute('href') && el.getAttribute('href').startsWith('service-')) return false;
        
        // Start Journey and Watch Demo links: let them work as before
        if (el.tagName === 'A' && el.getAttribute('href') && (el.getAttribute('href').includes('start-journey') || el.getAttribute('href').includes('watch-demo'))) return false;
        
        // Form submit: let it work as before
        if (el.tagName === 'BUTTON' && el.type === 'submit') return false;
        
        // Back to top: let it work as before
        if (el.classList.contains('back-to-top')) return false;
        
        // Hero CTA buttons: show demo message
        if (el.closest('.hero-cta')) return true;
        
        // Otherwise, show for nav links, feature cards, etc.
        return (
            el.tagName === 'A' ||
            el.tagName === 'BUTTON' ||
            el.classList.contains('magnetic') ||
            el.classList.contains('feature-card') ||
            el.classList.contains('founder-card') ||
            el.classList.contains('stat-card')
        );
    }

    document.body.addEventListener('click', function(e) {
        let el = e.target;
        // Traverse up to clickable parent
        while (el && el !== document.body) {
            if (shouldShowDemoMessage(el)) {
                showDemoMessage();
                break;
            }
            el = el.parentElement;
        }
    }, true);
} 