// Smooth scrolling for navigation links
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = section.offsetTop - headerHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

// FAQ Accordion functionality
document.addEventListener('DOMContentLoaded', function() {
    // FAQ Accordion
    const accordionItems = document.querySelectorAll('.accordion-item');
    
    accordionItems.forEach(item => {
        const title = item.querySelector('.accordion-title');
        const content = item.querySelector('.accordion-content');
        
        title.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all other items
            accordionItems.forEach(otherItem => {
                otherItem.classList.remove('active');
                otherItem.querySelector('.accordion-content').classList.remove('active');
            });
            
            // Toggle current item
            if (!isActive) {
                item.classList.add('active');
                content.classList.add('active');
            }
        });
    });

    // Form validation and submission
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic validation
            const name = document.getElementById('name').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const email = document.getElementById('email').value.trim();
            const question = document.getElementById('question').value.trim();
            
            if (!name || !phone || !email || !question) {
                showNotification('Пожалуйста, заполните все поля', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Пожалуйста, введите корректный email', 'error');
                return;
            }
            
            // Simulate form submission
            showNotification('Заявка отправлена! Мы свяжемся с вами в ближайшее время.', 'success');
            contactForm.reset();
        });
    }

    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    // Обработчик для навигационных ссылок
    document.querySelectorAll('.nav-menu a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1); // Удаляем #
            scrollToSection(targetId);
            
            // Закрываем мобильное меню если оно открыто
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
            }
        });
    });

    // Intersection Observer for animations
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

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.service-card, .workflow-step, .stat-item');
    animatedElements.forEach(el => observer.observe(el));

    // Active state management for services and workflow
    let currentActiveService = 1; // Index of currently active service (0-based)
    let currentActiveWorkflow = 1; // Index of currently active workflow step (0-based)

    // Auto-rotate active states
    setInterval(() => {
        // Rotate services
        const serviceCards = document.querySelectorAll('.service-card');
        serviceCards.forEach((card, index) => {
            card.classList.remove('active');
        });
        serviceCards[currentActiveService].classList.add('active');
        currentActiveService = (currentActiveService + 1) % serviceCards.length;

        // Rotate workflow steps
        const workflowSteps = document.querySelectorAll('.workflow-step');
        workflowSteps.forEach((step, index) => {
            step.classList.remove('active');
        });
        workflowSteps[currentActiveWorkflow].classList.add('active');
        currentActiveWorkflow = (currentActiveWorkflow + 1) % workflowSteps.length;
    }, 3000); // Change every 3 seconds
});

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create new notification
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    // Set background based on type
    if (type === 'success') {
        notification.style.background = 'linear-gradient(135deg, #10B981, #059669)';
    } else if (type === 'error') {
        notification.style.background = 'linear-gradient(135deg, #EF4444, #DC2626)';
    } else {
        notification.style.background = 'linear-gradient(135deg, #FF4444, #CC0000)';
    }
    
    // Add to page
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Hide and remove notification
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

// Add CSS classes for animations
const style = document.createElement('style');
style.textContent = `
    .service-card, .workflow-step, .stat-item {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }
    
    .service-card.visible, .workflow-step.visible, .stat-item.visible {
        opacity: 1;
        transform: translateY(0);
    }
    
    .nav-menu.active {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: rgba(0, 0, 0, 0.98);
        padding: 2rem;
        border-top: 1px solid #222222;
    }
    
    @media (max-width: 768px) {
        .nav-menu {
            display: none;
        }
        
        .nav-menu.active {
            display: flex;
        }
    }
`;
document.head.appendChild(style);