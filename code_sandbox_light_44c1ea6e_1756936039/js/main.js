// Main JavaScript for Sales AI Blog
document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile menu toggle
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            
            // Toggle icon
            const icon = menuToggle.querySelector('i');
            if (mobileMenu.classList.contains('hidden')) {
                icon.className = 'fas fa-bars text-xl';
            } else {
                icon.className = 'fas fa-times text-xl';
            }
        });
    }
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed header
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                    const icon = menuToggle.querySelector('i');
                    icon.className = 'fas fa-bars text-xl';
                }
            }
        });
    });
    
    // Scroll progress indicator
    function updateScrollProgress() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        let progressBar = document.querySelector('.scroll-indicator');
        if (!progressBar) {
            progressBar = document.createElement('div');
            progressBar.className = 'scroll-indicator';
            document.body.appendChild(progressBar);
        }
        
        progressBar.style.width = scrollPercent + '%';
    }
    
    window.addEventListener('scroll', updateScrollProgress);
    
    // Animate statistics counters when they come into view
    function animateCounters() {
        const counters = document.querySelectorAll('.stats-counter');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.textContent.replace(/[^\d]/g, ''));
                    const suffix = counter.textContent.replace(/[\d]/g, '');
                    
                    let count = 0;
                    const increment = target / 50; // Adjust speed
                    
                    const timer = setInterval(() => {
                        count += increment;
                        if (count >= target) {
                            counter.textContent = target + suffix;
                            clearInterval(timer);
                        } else {
                            counter.textContent = Math.floor(count) + suffix;
                        }
                    }, 50);
                    
                    observer.unobserve(counter);
                }
            });
        }, { threshold: 0.5 });
        
        counters.forEach(counter => observer.observe(counter));
    }
    
    // Initialize counter animation
    animateCounters();
    
    // Add scroll-triggered animations
    function addScrollAnimations() {
        const animatedElements = document.querySelectorAll('.card-shadow, .card-shadow-lg');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fadeInUp');
                }
            });
        }, { 
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        });
        
        animatedElements.forEach(element => observer.observe(element));
    }
    
    addScrollAnimations();
    
    // Interactive card hover effects
    const interactiveCards = document.querySelectorAll('.interactive-card');
    interactiveCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Dynamic table highlighting
    const tableRows = document.querySelectorAll('table tbody tr');
    tableRows.forEach(row => {
        row.addEventListener('mouseenter', function() {
            this.style.backgroundColor = '#f8fafc';
        });
        
        row.addEventListener('mouseleave', function() {
            this.style.backgroundColor = '';
        });
    });
    
    // Call-to-Action button interactions
    const ctaButtons = document.querySelectorAll('.btn-primary, .btn-secondary');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Add ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.className = 'ripple';
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add CSS for ripple effect
    const style = document.createElement('style');
    style.textContent = `
        .btn-primary, .btn-secondary {
            position: relative;
            overflow: hidden;
        }
        
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Reading progress for long content
    function updateReadingProgress() {
        const article = document.querySelector('main');
        if (!article) return;
        
        const articleTop = article.offsetTop;
        const articleHeight = article.scrollHeight;
        const windowHeight = window.innerHeight;
        const scrollTop = window.pageYOffset;
        
        const articleScrolled = scrollTop - articleTop + windowHeight;
        const progress = Math.max(0, Math.min(100, (articleScrolled / articleHeight) * 100));
        
        // Update progress indicator if you want to show reading progress
        // console.log('Reading progress:', Math.round(progress) + '%');
    }
    
    window.addEventListener('scroll', updateReadingProgress);
    
    // Lazy loading for images
    function lazyLoadImages() {
        const images = document.querySelectorAll('img[src]');
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.classList.add('animate-fadeIn');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
    
    lazyLoadImages();
    
    // Add subtle parallax effect to hero section
    function parallaxEffect() {
        const heroSection = document.querySelector('section');
        if (!heroSection) return;
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallax = scrolled * 0.5;
            
            heroSection.style.transform = `translateY(${parallax}px)`;
        });
    }
    
    // Initialize parallax (optional - can be removed if too distracting)
    // parallaxEffect();
    
    // Form validation and submission (if needed)
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Add your form submission logic here
            console.log('Form submitted:', new FormData(this));
            
            // Show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'fixed top-20 right-6 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
            successMessage.textContent = 'Thank you! We\'ll be in touch soon.';
            document.body.appendChild(successMessage);
            
            setTimeout(() => {
                successMessage.remove();
            }, 5000);
        });
    });
    
    // Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
        // Escape key closes mobile menu
        if (e.key === 'Escape' && mobileMenu && !mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('hidden');
            const icon = menuToggle.querySelector('i');
            icon.className = 'fas fa-bars text-xl';
        }
    });
    
    // Performance optimization: debounce scroll events
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
    
    // Apply debouncing to scroll-heavy functions
    const debouncedScrollProgress = debounce(updateScrollProgress, 10);
    const debouncedReadingProgress = debounce(updateReadingProgress, 100);
    
    window.removeEventListener('scroll', updateScrollProgress);
    window.removeEventListener('scroll', updateReadingProgress);
    window.addEventListener('scroll', debouncedScrollProgress);
    window.addEventListener('scroll', debouncedReadingProgress);
    
    console.log('🚀 Sales AI Blog loaded successfully!');
});

// Utility functions
const utils = {
    // Format numbers with commas
    formatNumber: function(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    
    // Smooth scroll to element
    scrollToElement: function(element, offset = 80) {
        const elementPosition = element.offsetTop - offset;
        window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
        });
    },
    
    // Check if element is in viewport
    isInViewport: function(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
};

// Export for global access
window.BlogUtils = utils;