// ===== ADVANCED ANIMATIONS JAVASCRIPT =====

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initScrollAnimations();
    initHoverAnimations();
    initTextAnimations();
    initBackgroundAnimations();
    initStaggerAnimations();
    initMorphingAnimations();
    initGlowEffects();
    initMatrixRain();
    initFloatingElements();
    initGradientAnimations();
});

// ===== SCROLL ANIMATIONS =====
function initScrollAnimations() {
    const scrollElements = document.querySelectorAll('.scroll-animate');
    
    const elementInView = (el, dividend = 1) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
            elementTop <=
            (window.innerHeight || document.documentElement.clientHeight) / dividend
        );
    };
    
    const displayScrollElement = (element) => {
        element.classList.add('scrolled');
    };
    
    const hideScrollElement = (element) => {
        element.classList.remove('scrolled');
    };
    
    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 1.25)) {
                displayScrollElement(el);
            } else {
                hideScrollElement(el);
            }
        });
    };
    
    window.addEventListener('scroll', () => {
        handleScrollAnimation();
    });
    
    // Initial check
    handleScrollAnimation();
}

// ===== HOVER ANIMATIONS =====
function initHoverAnimations() {
    const hoverElements = document.querySelectorAll('.hover-animate');
    
    hoverElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.classList.add('hovered');
        });
        
        element.addEventListener('mouseleave', function() {
            this.classList.remove('hovered');
        });
    });
}

// ===== TEXT ANIMATIONS =====
function initTextAnimations() {
    // Split text into characters for animation
    const textElements = document.querySelectorAll('.text-animate');
    
    textElements.forEach(element => {
        const text = element.textContent;
        element.innerHTML = '';
        
        text.split('').forEach((char, index) => {
            const span = document.createElement('span');
            span.textContent = char;
            span.style.animationDelay = `${index * 0.1}s`;
            span.classList.add('char-animate');
            element.appendChild(span);
        });
    });
    
    // Add CSS for character animation
    const charAnimationStyle = document.createElement('style');
    charAnimationStyle.textContent = `
        .char-animate {
            display: inline-block;
            opacity: 0;
            transform: translateY(20px);
            animation: charFadeIn 0.5s ease forwards;
        }
        
        @keyframes charFadeIn {
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(charAnimationStyle);
}

// ===== BACKGROUND ANIMATIONS =====
function initBackgroundAnimations() {
    const backgrounds = document.querySelectorAll('.animated-bg');
    
    backgrounds.forEach(bg => {
        let hue = 0;
        
        setInterval(() => {
            hue = (hue + 1) % 360;
            bg.style.background = `linear-gradient(${hue}deg, var(--primary-color), var(--secondary-color))`;
        }, 50);
    });
}

// ===== STAGGER ANIMATIONS =====
function initStaggerAnimations() {
    const staggerContainers = document.querySelectorAll('.stagger-container');
    
    staggerContainers.forEach(container => {
        const items = container.querySelectorAll('.stagger-item');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    items.forEach((item, index) => {
                        setTimeout(() => {
                            item.classList.add('visible');
                        }, index * 100);
                    });
                }
            });
        });
        
        observer.observe(container);
    });
}

// ===== MORPHING ANIMATIONS =====
function initMorphingAnimations() {
    const morphElements = document.querySelectorAll('.morph');
    
    morphElements.forEach(element => {
        let morphValue = 0;
        
        setInterval(() => {
            morphValue += 0.01;
            const radius1 = 60 + Math.sin(morphValue) * 20;
            const radius2 = 40 + Math.cos(morphValue) * 20;
            const radius3 = 30 + Math.sin(morphValue * 2) * 15;
            const radius4 = 70 + Math.cos(morphValue * 2) * 15;
            
            element.style.borderRadius = `${radius1}% ${radius2}% ${radius3}% ${radius4}% / ${radius4}% ${radius3}% ${radius2}% ${radius1}%`;
        }, 50);
    });
}

// ===== GLOW EFFECTS =====
function initGlowEffects() {
    const glowElements = document.querySelectorAll('.glow-effect');
    
    glowElements.forEach(element => {
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            element.style.setProperty('--glow-x', `${x}px`);
            element.style.setProperty('--glow-y', `${y}px`);
        });
    });
}

// ===== MATRIX RAIN EFFECT =====
function initMatrixRain() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '-1';
    canvas.style.opacity = '0.1';
    
    document.body.appendChild(canvas);
    
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    
    const columns = Math.floor(width / 20);
    const drops = new Array(columns).fill(0);
    
    function draw() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, width, height);
        
        ctx.fillStyle = '#0F0';
        ctx.font = '15px monospace';
        
        for (let i = 0; i < drops.length; i++) {
            const text = String.fromCharCode(Math.random() * 128);
            ctx.fillText(text, i * 20, drops[i] * 20);
            
            if (drops[i] * 20 > height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    
    setInterval(draw, 35);
    
    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });
}

// ===== FLOATING ELEMENTS =====
function initFloatingElements() {
    const floatingElements = document.querySelectorAll('.floating');
    
    floatingElements.forEach((element, index) => {
        const amplitude = 20 + (index * 5);
        const frequency = 0.02 + (index * 0.005);
        let time = index * 100;
        
        function float() {
            const y = Math.sin(time * frequency) * amplitude;
            element.style.transform = `translateY(${y}px)`;
            time += 0.5;
            requestAnimationFrame(float);
        }
        
        float();
    });
}

// ===== GRADIENT ANIMATIONS =====
function initGradientAnimations() {
    const gradientElements = document.querySelectorAll('.gradient-animate');
    
    gradientElements.forEach(element => {
        let angle = 0;
        
        setInterval(() => {
            angle = (angle + 1) % 360;
            element.style.background = `linear-gradient(${angle}deg, var(--primary-color), var(--secondary-color), var(--accent-color))`;
        }, 50);
    });
}

// ===== ADVANCED INTERACTION EFFECTS =====

// Magnetic effect with distance calculation
function createMagneticEffect(element, strength = 0.3) {
    element.addEventListener('mousemove', (e) => {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        const distance = Math.sqrt(x * x + y * y);
        const maxDistance = Math.sqrt((rect.width / 2) ** 2 + (rect.height / 2) ** 2);
        const normalizedDistance = Math.min(distance / maxDistance, 1);
        
        const moveX = x * strength * (1 - normalizedDistance);
        const moveY = y * strength * (1 - normalizedDistance);
        
        element.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
    
    element.addEventListener('mouseleave', () => {
        element.style.transform = 'translate(0px, 0px)';
    });
}

// Parallax with depth
function createParallaxEffect(element, depth = 0.5) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * depth;
        element.style.transform = `translateY(${rate}px)`;
    });
}

// Smooth reveal animation
function createRevealAnimation(element) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.clipPath = 'inset(0 0% 0 0)';
                entry.target.style.transform = 'translateY(0)';
                entry.target.style.opacity = '1';
            }
        });
    });
    
    element.style.clipPath = 'inset(0 100% 0 0)';
    element.style.transform = 'translateY(50px)';
    element.style.opacity = '0';
    element.style.transition = 'all 0.8s ease';
    
    observer.observe(element);
}

// ===== PERFORMANCE OPTIMIZED ANIMATIONS =====

// Throttled scroll handler
const throttledScroll = throttle(() => {
    // Handle scroll-based animations
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    parallaxElements.forEach(el => {
        const speed = parseFloat(el.dataset.parallax) || 0.5;
        const yPos = -(scrolled * speed);
        el.style.transform = `translateY(${yPos}px)`;
    });
}, 16);

window.addEventListener('scroll', throttledScroll);

// RAF-based animation loop
function createAnimationLoop(callback) {
    let animationId;
    
    function loop() {
        callback();
        animationId = requestAnimationFrame(loop);
    }
    
    loop();
    
    return () => {
        if (animationId) {
            cancelAnimationFrame(animationId);
        }
    };
}

// ===== UTILITY FUNCTIONS =====

// Throttle function for performance
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

// Easing functions
const easing = {
    linear: t => t,
    easeInQuad: t => t * t,
    easeOutQuad: t => t * (2 - t),
    easeInOutQuad: t => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
    easeInCubic: t => t * t * t,
    easeOutCubic: t => (--t) * t * t + 1,
    easeInOutCubic: t => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
};

// Animate function with easing
function animate(element, properties, duration = 1000, easingFunction = 'easeInOutQuad') {
    const startValues = {};
    const endValues = {};
    
    // Get start values
    Object.keys(properties).forEach(prop => {
        startValues[prop] = parseFloat(getComputedStyle(element)[prop]) || 0;
        endValues[prop] = properties[prop];
    });
    
    const startTime = performance.now();
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easing[easingFunction](progress);
        
        Object.keys(properties).forEach(prop => {
            const startValue = startValues[prop];
            const endValue = endValues[prop];
            const currentValue = startValue + (endValue - startValue) * easedProgress;
            
            element.style[prop] = currentValue + (prop === 'opacity' ? '' : 'px');
        });
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    
    requestAnimationFrame(update);
}

// ===== CSS ANIMATION HELPERS =====

// Add CSS keyframes dynamically
function addKeyframes(name, keyframes) {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ${name} {
            ${keyframes}
        }
    `;
    document.head.appendChild(style);
}

// Example usage:
addKeyframes('customBounce', `
    0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
    40% { transform: translateY(-30px); }
    60% { transform: translateY(-15px); }
`);

// ===== EXPORT ANIMATION FUNCTIONS =====
window.AnimationUtils = {
    createMagneticEffect,
    createParallaxEffect,
    createRevealAnimation,
    animate,
    easing,
    addKeyframes
}; 