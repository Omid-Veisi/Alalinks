// ===== PARTICLES SYSTEM =====

class ParticleSystem {
    constructor(container, options = {}) {
        this.container = container;
        this.particles = [];
        this.options = {
            particleCount: options.particleCount || 50,
            particleSize: options.particleSize || 4,
            particleColor: options.particleColor || '#667eea',
            particleSpeed: options.particleSpeed || 2,
            particleLife: options.particleLife || 6000,
            ...options
        };
        
        this.init();
    }
    
    init() {
        this.createParticles();
        this.animate();
    }
    
    createParticles() {
        for (let i = 0; i < this.options.particleCount; i++) {
            const particle = this.createParticle();
            this.particles.push(particle);
            this.container.appendChild(particle);
        }
    }
    
    createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random position
        const x = Math.random() * this.container.offsetWidth;
        const y = Math.random() * this.container.offsetHeight;
        
        // Random properties
        const size = Math.random() * this.options.particleSize + 2;
        const speed = Math.random() * this.options.particleSpeed + 1;
        const angle = Math.random() * Math.PI * 2;
        const life = Math.random() * this.options.particleLife + 3000;
        
        // Set styles
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: ${this.options.particleColor};
            border-radius: 50%;
            left: ${x}px;
            top: ${y}px;
            opacity: ${Math.random() * 0.5 + 0.3};
            pointer-events: none;
            z-index: 1;
        `;
        
        // Store particle data
        particle.data = {
            x: x,
            y: y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            life: life,
            maxLife: life,
            size: size
        };
        
        return particle;
    }
    
    animate() {
        this.particles.forEach(particle => {
            this.updateParticle(particle);
        });
        
        requestAnimationFrame(() => this.animate());
    }
    
    updateParticle(particle) {
        const data = particle.data;
        
        // Update position
        data.x += data.vx;
        data.y += data.vy;
        
        // Update life
        data.life -= 16; // Assuming 60fps
        
        // Bounce off edges
        if (data.x <= 0 || data.x >= this.container.offsetWidth) {
            data.vx *= -1;
        }
        if (data.y <= 0 || data.y >= this.container.offsetHeight) {
            data.vy *= -1;
        }
        
        // Update opacity based on life
        const lifeRatio = data.life / data.maxLife;
        particle.style.opacity = lifeRatio * 0.5 + 0.3;
        
        // Update position
        particle.style.left = data.x + 'px';
        particle.style.top = data.y + 'px';
        
        // Respawn if dead
        if (data.life <= 0) {
            this.respawnParticle(particle);
        }
    }
    
    respawnParticle(particle) {
        const data = particle.data;
        
        // Reset position to random edge
        const edge = Math.floor(Math.random() * 4);
        switch (edge) {
            case 0: // top
                data.x = Math.random() * this.container.offsetWidth;
                data.y = -10;
                break;
            case 1: // right
                data.x = this.container.offsetWidth + 10;
                data.y = Math.random() * this.container.offsetHeight;
                break;
            case 2: // bottom
                data.x = Math.random() * this.container.offsetWidth;
                data.y = this.container.offsetHeight + 10;
                break;
            case 3: // left
                data.x = -10;
                data.y = Math.random() * this.container.offsetHeight;
                break;
        }
        
        // Reset velocity
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * this.options.particleSpeed + 1;
        data.vx = Math.cos(angle) * speed;
        data.vy = Math.sin(angle) * speed;
        
        // Reset life
        data.life = data.maxLife;
    }
}

// ===== ADVANCED PARTICLE EFFECTS =====

class InteractiveParticleSystem extends ParticleSystem {
    constructor(container, options = {}) {
        super(container, options);
        this.mouse = { x: 0, y: 0 };
        this.initInteraction();
    }
    
    initInteraction() {
        this.container.addEventListener('mousemove', (e) => {
            const rect = this.container.getBoundingClientRect();
            this.mouse.x = e.clientX - rect.left;
            this.mouse.y = e.clientY - rect.top;
        });
    }
    
    updateParticle(particle) {
        super.updateParticle(particle);
        
        const data = particle.data;
        const dx = this.mouse.x - data.x;
        const dy = this.mouse.y - data.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Attract particles to mouse
        if (distance < 100) {
            const force = (100 - distance) / 100;
            data.vx += (dx / distance) * force * 0.1;
            data.vy += (dy / distance) * force * 0.1;
        }
    }
}

class FireworkParticleSystem extends ParticleSystem {
    constructor(container, options = {}) {
        super(container, {
            particleCount: 0,
            ...options
        });
        this.fireworks = [];
        this.initFireworks();
    }
    
    initFireworks() {
        setInterval(() => {
            this.createFirework();
        }, 2000);
    }
    
    createFirework() {
        const x = Math.random() * this.container.offsetWidth;
        const y = this.container.offsetHeight;
        
        const firework = {
            x: x,
            y: y,
            vx: (Math.random() - 0.5) * 4,
            vy: -Math.random() * 8 - 5,
            particles: []
        };
        
        this.fireworks.push(firework);
    }
    
    animate() {
        // Update fireworks
        this.fireworks.forEach((firework, index) => {
            firework.x += firework.vx;
            firework.y += firework.vy;
            firework.vy += 0.2; // gravity
            
            // Explode when at peak
            if (firework.vy >= 0 && firework.particles.length === 0) {
                this.explodeFirework(firework);
            }
            
            // Remove if off screen
            if (firework.y > this.container.offsetHeight) {
                this.fireworks.splice(index, 1);
            }
        });
        
        // Update particles
        this.particles.forEach(particle => {
            this.updateParticle(particle);
        });
        
        requestAnimationFrame(() => this.animate());
    }
    
    explodeFirework(firework) {
        const particleCount = 30;
        const colors = ['#ff0', '#f0f', '#0ff', '#f00', '#0f0', '#00f'];
        
        for (let i = 0; i < particleCount; i++) {
            const particle = this.createParticle();
            const data = particle.data;
            
            data.x = firework.x;
            data.y = firework.y;
            
            const angle = (Math.PI * 2 * i) / particleCount;
            const speed = Math.random() * 5 + 3;
            data.vx = Math.cos(angle) * speed;
            data.vy = Math.sin(angle) * speed;
            
            particle.style.background = colors[Math.floor(Math.random() * colors.length)];
            particle.style.boxShadow = `0 0 ${Math.random() * 10 + 5}px ${particle.style.background}`;
            
            this.particles.push(particle);
            this.container.appendChild(particle);
        }
    }
}

// ===== PARTICLE INITIALIZATION =====

function initParticles() {
    const particlesContainer = document.getElementById('particles');
    
    if (!particlesContainer) return;
    
    // Create basic particle system
    const particleSystem = new ParticleSystem(particlesContainer, {
        particleCount: 50,
        particleSize: 4,
        particleColor: 'rgba(102, 126, 234, 0.5)',
        particleSpeed: 1,
        particleLife: 8000
    });
    
    // Create interactive particles for hero section
    const heroParticles = new InteractiveParticleSystem(particlesContainer, {
        particleCount: 30,
        particleSize: 3,
        particleColor: 'rgba(240, 147, 251, 0.4)',
        particleSpeed: 0.5,
        particleLife: 10000
    });
    
    // Create floating particles for features section
    const featuresSection = document.querySelector('.features');
    if (featuresSection) {
        const featuresParticles = new ParticleSystem(featuresSection, {
            particleCount: 20,
            particleSize: 2,
            particleColor: 'rgba(79, 172, 254, 0.3)',
            particleSpeed: 0.3,
            particleLife: 12000
        });
    }
}

// ===== PARTICLE EFFECTS FOR SPECIFIC SECTIONS =====

function createSectionParticles() {
    // About section particles
    const aboutSection = document.querySelector('.about');
    if (aboutSection) {
        const aboutParticles = new ParticleSystem(aboutSection, {
            particleCount: 15,
            particleSize: 3,
            particleColor: 'rgba(118, 75, 162, 0.4)',
            particleSpeed: 0.4,
            particleLife: 15000
        });
    }
    
    // Founders section particles
    const foundersSection = document.querySelector('.founders');
    if (foundersSection) {
        const foundersParticles = new ParticleSystem(foundersSection, {
            particleCount: 10,
            particleSize: 2,
            particleColor: 'rgba(102, 126, 234, 0.3)',
            particleSpeed: 0.2,
            particleLife: 20000
        });
    }
}

// ===== SPECIAL EFFECTS =====

function createSparkleEffect(container) {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.style.cssText = `
        position: absolute;
        width: 4px;
        height: 4px;
        background: white;
        border-radius: 50%;
        pointer-events: none;
        animation: sparkle 1s ease-out forwards;
    `;
    
    sparkle.style.left = Math.random() * container.offsetWidth + 'px';
    sparkle.style.top = Math.random() * container.offsetHeight + 'px';
    
    container.appendChild(sparkle);
    
    setTimeout(() => {
        sparkle.remove();
    }, 1000);
}

function createTrailEffect(element) {
    const trail = document.createElement('div');
    trail.className = 'trail';
    trail.style.cssText = `
        position: absolute;
        width: 2px;
        height: 2px;
        background: var(--primary-color);
        border-radius: 50%;
        pointer-events: none;
        opacity: 0.7;
        animation: trail 0.5s ease-out forwards;
    `;
    
    const rect = element.getBoundingClientRect();
    trail.style.left = rect.left + rect.width / 2 + 'px';
    trail.style.top = rect.top + rect.height / 2 + 'px';
    
    document.body.appendChild(trail);
    
    setTimeout(() => {
        trail.remove();
    }, 500);
}

// ===== PARTICLE ANIMATIONS CSS =====

const particleStyles = document.createElement('style');
particleStyles.textContent = `
    @keyframes sparkle {
        0% {
            transform: scale(0) rotate(0deg);
            opacity: 1;
        }
        50% {
            transform: scale(1) rotate(180deg);
            opacity: 1;
        }
        100% {
            transform: scale(0) rotate(360deg);
            opacity: 0;
        }
    }
    
    @keyframes trail {
        0% {
            transform: scale(1);
            opacity: 0.7;
        }
        100% {
            transform: scale(0);
            opacity: 0;
        }
    }
    
    .particle {
        transition: opacity 0.3s ease;
    }
    
    .sparkle {
        z-index: 10;
    }
    
    .trail {
        z-index: 5;
    }
`;
document.head.appendChild(particleStyles);

// ===== INITIALIZE PARTICLES =====

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initParticles();
    createSectionParticles();
    
    // Add sparkle effects to interactive elements
    const interactiveElements = document.querySelectorAll('.btn-primary, .feature-card, .founder-card');
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            createSparkleEffect(element.parentElement);
        });
        
        element.addEventListener('mousemove', () => {
            if (Math.random() < 0.1) {
                createTrailEffect(element);
            }
        });
    });
});

// ===== EXPORT PARTICLE FUNCTIONS =====
window.ParticleSystem = {
    ParticleSystem,
    InteractiveParticleSystem,
    FireworkParticleSystem,
    createSparkleEffect,
    createTrailEffect
}; 