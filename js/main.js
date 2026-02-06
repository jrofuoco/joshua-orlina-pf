document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    setupMobileMenu();
    setupSmoothScroll();
    setupTypingAnimation();
    setupScrollEffects();
    setupContactForm();
    setupSkillAnimations();
    setupScrollToTop();
    setupCardClicks();
}

function setupMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            
            const icon = this.querySelector('svg');
            if (icon) {
                icon.classList.toggle('rotate-90');
            }
        });
        
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.add('hidden');
            });
        });
    }
}

function setupSmoothScroll() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                updateActiveNavLink(targetId);
            }
        });
    });
}

function updateActiveNavLink(targetId) {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${targetId}`) {
            link.classList.add('active');
        }
    });
}

function setupTypingAnimation() {
    const typingText = document.getElementById('typing-text');
    const phrases = [
        'Full Stack Developer',
        'UI/UX Designer',
        'Problem Solver',
        'Adaptive'
    ];
    
    if (typingText) {
        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;
        
        function typeEffect() {
            const currentPhrase = phrases[phraseIndex];
            
            if (isDeleting) {
                typingText.textContent = currentPhrase.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 50;
            } else {
                typingText.textContent = currentPhrase.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 100;
            }
            
            if (!isDeleting && charIndex === currentPhrase.length) {
                typingSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                typingSpeed = 500;
            }
            
            setTimeout(typeEffect, typingSpeed);
        }
        
        typeEffect();
    }
}

function setupScrollEffects() {
    const navbar = document.getElementById('navbar');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (navbar) {
            if (scrollTop > 50) {
                navbar.style.backgroundColor = 'rgba(26, 32, 44, 0.98)';
                navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';
            } else {
                navbar.style.backgroundColor = 'rgba(26, 32, 44, 0.95)';
                navbar.style.boxShadow = 'none';
            }
        }
        
        updateActiveSection();
        
        lastScrollTop = scrollTop;
    });
}

function updateActiveSection() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.pageYOffset + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            updateActiveNavLink(sectionId);
        }
    });
}

function setupContactForm() {
    const contactForm = document.getElementById('contact-form');
    const contactModal = document.getElementById('contact-modal');
    const closeModalBtn = document.getElementById('close-modal');
    
    if (contactForm && contactModal) {
        // Show modal when form is submitted
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            showModal();
        });
        
        // Close modal when button is clicked
        if (closeModalBtn) {
            closeModalBtn.addEventListener('click', hideModal);
        }
        
        // Close modal when clicking outside
        contactModal.addEventListener('click', function(e) {
            if (e.target === contactModal) {
                hideModal();
            }
        });
        
        // Close modal with Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && !contactModal.classList.contains('hidden')) {
                hideModal();
            }
        });
    }
    
    function showModal() {
        const modal = document.getElementById('contact-modal');
        const modalContent = modal.querySelector('.transform');
        
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        
        // Animate in
        setTimeout(() => {
            modalContent.classList.remove('scale-95');
            modalContent.classList.add('scale-100');
        }, 10);
    }
    
    function hideModal() {
        const modal = document.getElementById('contact-modal');
        const modalContent = modal.querySelector('.transform');
        
        // Animate out
        modalContent.classList.remove('scale-100');
        modalContent.classList.add('scale-95');
        
        setTimeout(() => {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
        }, 300);
    }
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `fixed top-20 right-6 px-6 py-4 rounded-lg shadow-lg z-50 transform translate-x-full transition-transform duration-300`;
    
    if (type === 'success') {
        notification.style.backgroundColor = '#48bb78';
        notification.style.color = 'white';
    } else if (type === 'error') {
        notification.style.backgroundColor = '#f56565';
        notification.style.color = 'white';
    } else {
        notification.style.backgroundColor = '#4299e1';
        notification.style.color = 'white';
    }
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

function setupSkillAnimations() {
    const skillBars = document.querySelectorAll('.skill-item .bg-teal-400');
    
    const animateSkills = function() {
        skillBars.forEach(bar => {
            const rect = bar.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
            
            if (isVisible && !bar.classList.contains('animated')) {
                bar.classList.add('animated');
                const width = bar.style.width;
                bar.style.width = '0%';
                
                setTimeout(() => {
                    bar.style.width = width;
                }, 100);
            }
        });
    };
    
    animateSkills();
    
    window.addEventListener('scroll', animateSkills);
}

function setupScrollToTop() {
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.id = 'scroll-top';
    scrollTopBtn.innerHTML = `
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
        </svg>
    `;
    document.body.appendChild(scrollTopBtn);
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    });
    
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

function setupCardClicks() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach((card, index) => {
        card.style.cursor = 'pointer';
        card.setAttribute('data-card-index', index);
        
        card.addEventListener('click', function(e) {
            // Don't trigger if clicking on a link directly
            if (e.target.tagName === 'A' || e.target.closest('a')) {
                return;
            }
            
            const cardTitle = this.querySelector('h3').textContent.trim();
            showCardModal(cardTitle, this);
        });
    });
}

function showCardModal(cardTitle, cardElement) {
    // Create or get modal
    let modal = document.getElementById('card-modal');
    
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'card-modal';
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.85);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 50;
            backdrop-filter: blur(5px);
            padding: 2rem;
            animation: fadeIn 0.3s ease-out;
        `;
        
        modal.innerHTML = `
            <div style="background: linear-gradient(135deg, #1a1a1a 0%, #0d0d0d 100%); border-radius: 1rem; width: 100%; max-width: 1200px; max-height: 90vh; overflow-y: auto; border: 2px solid #7CB342; box-shadow: 0 20px 60px rgba(124, 179, 66, 0.15), 0 0 40px rgba(124, 179, 66, 0.05);">
                <div style="position: sticky; top: 0; padding: 1.5rem 2rem; border-bottom: 1px solid rgba(124, 179, 66, 0.2); display: flex; justify-content: space-between; align-items: center; background: rgba(13, 13, 13, 0.95); z-index: 10;">
                    <h2 style="color: #7CB342; font-size: 1.75rem; margin: 0; font-weight: bold; letter-spacing: 0.5px;" id="modal-title"></h2>
                    <button id="modal-close-btn" style="background: none; border: none; color: #999999; font-size: 1.5rem; cursor: pointer; padding: 0.5rem; transition: all 0.3s ease;" onclick="closeCardModal()">✕</button>
                </div>
                <div id="modal-content" style="padding: 2.5rem;"></div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Add close button hover effect
        const closeBtn = modal.querySelector('#modal-close-btn');
        closeBtn.addEventListener('mouseover', function() {
            this.style.color = '#7CB342';
            this.style.transform = 'scale(1.2)';
        });
        closeBtn.addEventListener('mouseout', function() {
            this.style.color = '#999999';
            this.style.transform = 'scale(1)';
        });
        
        // Close modal on background click
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeCardModal();
            }
        });
        
        // Close on Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal.style.display !== 'none') {
                closeCardModal();
            }
        });
        
        // Add fade-in animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeIn {
                from {
                    opacity: 0;
                }
                to {
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Update modal title
    const modalTitle = modal.querySelector('#modal-title');
    modalTitle.textContent = cardTitle;
    
    // Populate modal content based on card title
    const modalContent = modal.querySelector('#modal-content');
    
    if (cardTitle === 'Water Meter Management System') {
        modalContent.innerHTML = `
            <div>
                <div style="margin-bottom: 3rem;">
                    <h3 style="color: #8BC34A; font-size: 1.25rem; margin-bottom: 1.5rem; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; border-left: 4px solid #7CB342; padding-left: 1rem;">Admin Panel</h3>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem;">
                        <div style="overflow: hidden; border-radius: 0.75rem; border: 1px solid rgba(124, 179, 66, 0.3); transition: all 0.3s ease; cursor: pointer;" class="img-card">
                            <img src="img/Water-Works/admin/login.jpg" alt="Login" style="width: 100%; height: 250px; object-fit: cover; border-radius: 0.75rem; transition: transform 0.3s ease;">
                        </div>
                        <div style="overflow: hidden; border-radius: 0.75rem; border: 1px solid rgba(124, 179, 66, 0.3); transition: all 0.3s ease; cursor: pointer;" class="img-card">
                            <img src="img/Water-Works/admin/consumer_list.jpg" alt="Consumer List" style="width: 100%; height: 250px; object-fit: cover; border-radius: 0.75rem; transition: transform 0.3s ease;">
                        </div>
                        <div style="overflow: hidden; border-radius: 0.75rem; border: 1px solid rgba(124, 179, 66, 0.3); transition: all 0.3s ease; cursor: pointer;" class="img-card">
                            <img src="img/Water-Works/admin/consumer_info.jpg" alt="Consumer Info" style="width: 100%; height: 250px; object-fit: cover; border-radius: 0.75rem; transition: transform 0.3s ease;">
                        </div>
                        <div style="overflow: hidden; border-radius: 0.75rem; border: 1px solid rgba(124, 179, 66, 0.3); transition: all 0.3s ease; cursor: pointer;" class="img-card">
                            <img src="img/Water-Works/admin/meter_connection.jpg" alt="Meter Connection" style="width: 100%; height: 250px; object-fit: cover; border-radius: 0.75rem; transition: transform 0.3s ease;">
                        </div>
                        <div style="overflow: hidden; border-radius: 0.75rem; border: 1px solid rgba(124, 179, 66, 0.3); transition: all 0.3s ease; cursor: pointer;" class="img-card">
                            <img src="img/Water-Works/admin/reading.jpg" alt="Reading" style="width: 100%; height: 250px; object-fit: cover; border-radius: 0.75rem; transition: transform 0.3s ease;">
                        </div>
                        <div style="overflow: hidden; border-radius: 0.75rem; border: 1px solid rgba(124, 179, 66, 0.3); transition: all 0.3s ease; cursor: pointer;" class="img-card">
                            <img src="img/Water-Works/admin/charges.jpg" alt="Charges" style="width: 100%; height: 250px; object-fit: cover; border-radius: 0.75rem; transition: transform 0.3s ease;">
                        </div>
                        <div style="overflow: hidden; border-radius: 0.75rem; border: 1px solid rgba(124, 179, 66, 0.3); transition: all 0.3s ease; cursor: pointer;" class="img-card">
                            <img src="img/Water-Works/admin/posting.jpg" alt="Posting" style="width: 100%; height: 250px; object-fit: cover; border-radius: 0.75rem; transition: transform 0.3s ease;">
                        </div>
                        <div style="overflow: hidden; border-radius: 0.75rem; border: 1px solid rgba(124, 179, 66, 0.3); transition: all 0.3s ease; cursor: pointer;" class="img-card">
                            <img src="img/Water-Works/admin/bills_and_payment.jpg" alt="Bills and Payment" style="width: 100%; height: 250px; object-fit: cover; border-radius: 0.75rem; transition: transform 0.3s ease;">
                        </div>
                        <div style="overflow: hidden; border-radius: 0.75rem; border: 1px solid rgba(124, 179, 66, 0.3); transition: all 0.3s ease; cursor: pointer;" class="img-card">
                            <img src="img/Water-Works/admin/billing_summary.jpg" alt="Billing Summary" style="width: 100%; height: 250px; object-fit: cover; border-radius: 0.75rem; transition: transform 0.3s ease;">
                        </div>
                        <div style="overflow: hidden; border-radius: 0.75rem; border: 1px solid rgba(124, 179, 66, 0.3); transition: all 0.3s ease; cursor: pointer;" class="img-card">
                            <img src="img/Water-Works/admin/analytics.jpg" alt="Analytics" style="width: 100%; height: 250px; object-fit: cover; border-radius: 0.75rem; transition: transform 0.3s ease;">
                        </div>
                        <div style="overflow: hidden; border-radius: 0.75rem; border: 1px solid rgba(124, 179, 66, 0.3); transition: all 0.3s ease; cursor: pointer;" class="img-card">
                            <img src="img/Water-Works/admin/user_management.jpg" alt="User Management" style="width: 100%; height: 250px; object-fit: cover; border-radius: 0.75rem; transition: transform 0.3s ease;">
                        </div>
                        <div style="overflow: hidden; border-radius: 0.75rem; border: 1px solid rgba(124, 179, 66, 0.3); transition: all 0.3s ease; cursor: pointer;" class="img-card">
                            <img src="img/Water-Works/admin/brgy_list.jpg" alt="Brgy List" style="width: 100%; height: 250px; object-fit: cover; border-radius: 0.75rem; transition: transform 0.3s ease;">
                        </div>
                    </div>
                </div>
                
                <div style="margin-bottom: 3rem;">
                    <h3 style="color: #8BC34A; font-size: 1.25rem; margin-bottom: 1.5rem; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; border-left: 4px solid #7CB342; padding-left: 1rem;">Reader Portal</h3>
                    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem;">
                        <div style="overflow: hidden; border-radius: 0.75rem; border: 1px solid rgba(124, 179, 66, 0.3); transition: all 0.3s ease; cursor: pointer;" class="img-card">
                            <img src="img/Water-Works/reader/homepage.jpg" alt="Homepage" style="width: 100%; height: 400px; object-fit: contain; border-radius: 0.75rem; transition: transform 0.3s ease;">
                        </div>
                        <div style="overflow: hidden; border-radius: 0.75rem; border: 1px solid rgba(124, 179, 66, 0.3); transition: all 0.3s ease; cursor: pointer;" class="img-card">
                            <img src="img/Water-Works/reader/dashboard.jpg" alt="Dashboard" style="width: 100%; height: 400px; object-fit: contain; border-radius: 0.75rem; transition: transform 0.3s ease;">
                        </div>
                        <div style="overflow: hidden; border-radius: 0.75rem; border: 1px solid rgba(124, 179, 66, 0.3); transition: all 0.3s ease; cursor: pointer;" class="img-card">
                            <img src="img/Water-Works/reader/list_of_consumers.jpg" alt="List of Consumers" style="width: 100%; height: 400px; object-fit: contain; border-radius: 0.75rem; transition: transform 0.3s ease;">
                        </div>
                        <div style="overflow: hidden; border-radius: 0.75rem; border: 1px solid rgba(124, 179, 66, 0.3); transition: all 0.3s ease; cursor: pointer;" class="img-card">
                            <img src="img/Water-Works/reader/readingpage.jpg" alt="Reading Page" style="width: 100%; height: 400px; object-fit: contain; border-radius: 0.75rem; transition: transform 0.3s ease;">
                        </div>
                    </div>
                </div>
                
                <div style="margin-bottom: 3rem;">
                    <h3 style="color: #8BC34A; font-size: 1.25rem; margin-bottom: 1.5rem; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; border-left: 4px solid #7CB342; padding-left: 1rem;">Consumer Portal</h3>
                    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem;">
                        <div style="overflow: hidden; border-radius: 0.75rem; border: 1px solid rgba(124, 179, 66, 0.3); transition: all 0.3s ease; cursor: pointer;" class="img-card">
                            <img src="img/Water-Works/consumer/login.jpg" alt="Consumer Login" style="width: 100%; height: 400px; object-fit: contain; border-radius: 0.75rem; transition: transform 0.3s ease;">
                        </div>
                        <div style="overflow: hidden; border-radius: 0.75rem; border: 1px solid rgba(124, 179, 66, 0.3); transition: all 0.3s ease; cursor: pointer;" class="img-card">
                            <img src="img/Water-Works/consumer/homepage.jpg" alt="Consumer Homepage" style="width: 100%; height: 400px; object-fit: contain; border-radius: 0.75rem; transition: transform 0.3s ease;">
                        </div>
                    </div>
                </div>
            </div>
            <style>
                .img-card:hover {
                    border-color: #7CB342;
                    box-shadow: 0 0 20px rgba(124, 179, 66, 0.3);
                    transform: translateY(-4px);
                }
                .img-card:hover img {
                    transform: scale(1.05);
                }
            </style>
        `;
    } else if (cardTitle === 'Audit Portal') {
        modalContent.innerHTML = `
            <div>
                <div style="background: rgba(124, 179, 66, 0.1); border-left: 4px solid #7CB342; padding: 1.5rem; border-radius: 0.5rem; margin-bottom: 2rem;">
                    <p style="color: #CCCCCC; margin: 0; font-size: 1rem; line-height: 1.6;">
                        Screenshots of the live system are unavailable due to company policy. The images shown are photos taken during development/deployment.
                    </p>
                </div>
                
                <div>
                    <h3 style="color: #8BC34A; font-size: 1.25rem; margin-bottom: 1.5rem; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; border-left: 4px solid #7CB342; padding-left: 1rem;">System Screenshots</h3>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem;">
                        <div style="overflow: hidden; border-radius: 0.75rem; border: 1px solid rgba(124, 179, 66, 0.3); transition: all 0.3s ease; cursor: pointer;" class="img-card">
                            <img src="img/audit-portal/homepage.jpg" alt="Homepage" style="width: 100%; height: 250px; object-fit: cover; border-radius: 0.75rem; transition: transform 0.3s ease;">
                        </div>
                        <div style="overflow: hidden; border-radius: 0.75rem; border: 1px solid rgba(124, 179, 66, 0.3); transition: all 0.3s ease; cursor: pointer;" class="img-card">
                            <img src="img/audit-portal/fyp.jpg" alt="FYP" style="width: 100%; height: 250px; object-fit: cover; border-radius: 0.75rem; transition: transform 0.3s ease;">
                        </div>
                        <div style="overflow: hidden; border-radius: 0.75rem; border: 1px solid rgba(124, 179, 66, 0.3); transition: all 0.3s ease; cursor: pointer;" class="img-card">
                            <img src="img/audit-portal/fyp1.jpg" alt="FYP 1" style="width: 100%; height: 250px; object-fit: cover; border-radius: 0.75rem; transition: transform 0.3s ease;">
                        </div>
                        <div style="overflow: hidden; border-radius: 0.75rem; border: 1px solid rgba(124, 179, 66, 0.3); transition: all 0.3s ease; cursor: pointer;" class="img-card">
                            <img src="img/audit-portal/meeting.jpg" alt="Meeting" style="width: 100%; height: 250px; object-fit: cover; border-radius: 0.75rem; transition: transform 0.3s ease;">
                        </div>
                        <div style="overflow: hidden; border-radius: 0.75rem; border: 1px solid rgba(124, 179, 66, 0.3); transition: all 0.3s ease; cursor: pointer;" class="img-card">
                            <img src="img/audit-portal/meeting1.jpg" alt="Meeting 1" style="width: 100%; height: 250px; object-fit: cover; border-radius: 0.75rem; transition: transform 0.3s ease;">
                        </div>
                        <div style="overflow: hidden; border-radius: 0.75rem; border: 1px solid rgba(124, 179, 66, 0.3); transition: all 0.3s ease; cursor: pointer;" class="img-card">
                            <img src="img/audit-portal/leaderboard.jpg" alt="Leaderboard" style="width: 100%; height: 250px; object-fit: cover; border-radius: 0.75rem; transition: transform 0.3s ease;">
                        </div>
                        <div style="overflow: hidden; border-radius: 0.75rem; border: 1px solid rgba(124, 179, 66, 0.3); transition: all 0.3s ease; cursor: pointer;" class="img-card">
                            <img src="img/audit-portal/proffilepage.jpg" alt="Profile Page" style="width: 100%; height: 250px; object-fit: cover; border-radius: 0.75rem; transition: transform 0.3s ease;">
                        </div>
                    </div>
                </div>
            </div>
            <style>
                .img-card:hover {
                    border-color: #7CB342;
                    box-shadow: 0 0 20px rgba(124, 179, 66, 0.3);
                    transform: translateY(-4px);
                }
                .img-card:hover img {
                    transform: scale(1.05);
                }
            </style>
        `;
    } else if (cardTitle === 'SciLab Reservation System') {
        modalContent.innerHTML = `
            <div>
                <div style="margin-bottom: 3rem;">
                    <h3 style="color: #8BC34A; font-size: 1.25rem; margin-bottom: 1.5rem; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; border-left: 4px solid #7CB342; padding-left: 1rem;">Admin Dashboard</h3>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem;">
                        <div style="overflow: hidden; border-radius: 0.75rem; border: 1px solid rgba(124, 179, 66, 0.3); transition: all 0.3s ease; cursor: pointer;" class="img-card">
                            <img src="img/SciLab/admin/dashboard.png" alt="Dashboard" style="width: 100%; height: 250px; object-fit: cover; border-radius: 0.75rem; transition: transform 0.3s ease;">
                        </div>
                        <div style="overflow: hidden; border-radius: 0.75rem; border: 1px solid rgba(124, 179, 66, 0.3); transition: all 0.3s ease; cursor: pointer;" class="img-card">
                            <img src="img/SciLab/admin/inventory_admin.png" alt="Inventory" style="width: 100%; height: 250px; object-fit: cover; border-radius: 0.75rem; transition: transform 0.3s ease;">
                        </div>
                        <div style="overflow: hidden; border-radius: 0.75rem; border: 1px solid rgba(124, 179, 66, 0.3); transition: all 0.3s ease; cursor: pointer;" class="img-card">
                            <img src="img/SciLab/admin/manage_professor_admin.png" alt="Manage Professor" style="width: 100%; height: 250px; object-fit: cover; border-radius: 0.75rem; transition: transform 0.3s ease;">
                        </div>
                        <div style="overflow: hidden; border-radius: 0.75rem; border: 1px solid rgba(124, 179, 66, 0.3); transition: all 0.3s ease; cursor: pointer;" class="img-card">
                            <img src="img/SciLab/admin/ongoing_reservation_admin.png" alt="Ongoing Reservations" style="width: 100%; height: 250px; object-fit: cover; border-radius: 0.75rem; transition: transform 0.3s ease;">
                        </div>
                        <div style="overflow: hidden; border-radius: 0.75rem; border: 1px solid rgba(124, 179, 66, 0.3); transition: all 0.3s ease; cursor: pointer;" class="img-card">
                            <img src="img/SciLab/admin/professor_approval_admin.png" alt="Professor Approval" style="width: 100%; height: 250px; object-fit: cover; border-radius: 0.75rem; transition: transform 0.3s ease;">
                        </div>
                        <div style="overflow: hidden; border-radius: 0.75rem; border: 1px solid rgba(124, 179, 66, 0.3); transition: all 0.3s ease; cursor: pointer;" class="img-card">
                            <img src="img/SciLab/admin/reserve_history_admin.png" alt="Reserve History" style="width: 100%; height: 250px; object-fit: cover; border-radius: 0.75rem; transition: transform 0.3s ease;">
                        </div>
                        <div style="overflow: hidden; border-radius: 0.75rem; border: 1px solid rgba(124, 179, 66, 0.3); transition: all 0.3s ease; cursor: pointer;" class="img-card">
                            <img src="img/SciLab/admin/room_monitor_admin.png" alt="Room Monitor" style="width: 100%; height: 250px; object-fit: cover; border-radius: 0.75rem; transition: transform 0.3s ease;">
                        </div>
                        <div style="overflow: hidden; border-radius: 0.75rem; border: 1px solid rgba(124, 179, 66, 0.3); transition: all 0.3s ease; cursor: pointer;" class="img-card">
                            <img src="img/SciLab/admin/student_approval_admin.png" alt="Student Approval" style="width: 100%; height: 250px; object-fit: cover; border-radius: 0.75rem; transition: transform 0.3s ease;">
                        </div>
                        <div style="overflow: hidden; border-radius: 0.75rem; border: 1px solid rgba(124, 179, 66, 0.3); transition: all 0.3s ease; cursor: pointer;" class="img-card">
                            <img src="img/SciLab/admin/unreturned_item_admin.png" alt="Unreturned Items" style="width: 100%; height: 250px; object-fit: cover; border-radius: 0.75rem; transition: transform 0.3s ease;">
                        </div>
                    </div>
                </div>
                
                <div style="margin-bottom: 3rem;">
                    <h3 style="color: #8BC34A; font-size: 1.25rem; margin-bottom: 1.5rem; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; border-left: 4px solid #7CB342; padding-left: 1rem;">Professor Portal</h3>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem;">
                        <div style="overflow: hidden; border-radius: 0.75rem; border: 1px solid rgba(124, 179, 66, 0.3); transition: all 0.3s ease; cursor: pointer;" class="img-card">
                            <img src="img/SciLab/professor/dashboard_student_professor.png" alt="Dashboard" style="width: 100%; height: 250px; object-fit: cover; border-radius: 0.75rem; transition: transform 0.3s ease;">
                        </div>
                        <div style="overflow: hidden; border-radius: 0.75rem; border: 1px solid rgba(124, 179, 66, 0.3); transition: all 0.3s ease; cursor: pointer;" class="img-card">
                            <img src="img/SciLab/professor/history_professor.png" alt="History" style="width: 100%; height: 250px; object-fit: cover; border-radius: 0.75rem; transition: transform 0.3s ease;">
                        </div>
                        <div style="overflow: hidden; border-radius: 0.75rem; border: 1px solid rgba(124, 179, 66, 0.3); transition: all 0.3s ease; cursor: pointer;" class="img-card">
                            <img src="img/SciLab/professor/pending_professor.png" alt="Pending" style="width: 100%; height: 250px; object-fit: cover; border-radius: 0.75rem; transition: transform 0.3s ease;">
                        </div>
                        <div style="overflow: hidden; border-radius: 0.75rem; border: 1px solid rgba(124, 179, 66, 0.3); transition: all 0.3s ease; cursor: pointer;" class="img-card">
                            <img src="img/SciLab/professor/reservation_professor.png" alt="Reservation" style="width: 100%; height: 250px; object-fit: cover; border-radius: 0.75rem; transition: transform 0.3s ease;">
                        </div>
                        <div style="overflow: hidden; border-radius: 0.75rem; border: 1px solid rgba(124, 179, 66, 0.3); transition: all 0.3s ease; cursor: pointer;" class="img-card">
                            <img src="img/SciLab/professor/students_with_unra.png" alt="Students with Unreturned" style="width: 100%; height: 250px; object-fit: cover; border-radius: 0.75rem; transition: transform 0.3s ease;">
                        </div>
                        <div style="overflow: hidden; border-radius: 0.75rem; border: 1px solid rgba(124, 179, 66, 0.3); transition: all 0.3s ease; cursor: pointer;" class="img-card">
                            <img src="img/SciLab/professor/student_approval_professor.png" alt="Student Approval" style="width: 100%; height: 250px; object-fit: cover; border-radius: 0.75rem; transition: transform 0.3s ease;">
                        </div>
                        <div style="overflow: hidden; border-radius: 0.75rem; border: 1px solid rgba(124, 179, 66, 0.3); transition: all 0.3s ease; cursor: pointer;" class="img-card">
                            <img src="img/SciLab/professor/student_approved_professor.png" alt="Student Approved" style="width: 100%; height: 250px; object-fit: cover; border-radius: 0.75rem; transition: transform 0.3s ease;">
                        </div>
                    </div>
                </div>
                
                <div>
                    <h3 style="color: #8BC34A; font-size: 1.25rem; margin-bottom: 1.5rem; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; border-left: 4px solid #7CB342; padding-left: 1rem;">Student Portal</h3>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem;">
                        <div style="overflow: hidden; border-radius: 0.75rem; border: 1px solid rgba(124, 179, 66, 0.3); transition: all 0.3s ease; cursor: pointer;" class="img-card">
                            <img src="img/SciLab/student/ladningpage.png" alt="Landing Page" style="width: 100%; height: 250px; object-fit: cover; border-radius: 0.75rem; transition: transform 0.3s ease;">
                        </div>
                        <div style="overflow: hidden; border-radius: 0.75rem; border: 1px solid rgba(124, 179, 66, 0.3); transition: all 0.3s ease; cursor: pointer;" class="img-card">
                            <img src="img/SciLab/student/login.png" alt="Login" style="width: 100%; height: 250px; object-fit: cover; border-radius: 0.75rem; transition: transform 0.3s ease;">
                        </div>
                        <div style="overflow: hidden; border-radius: 0.75rem; border: 1px solid rgba(124, 179, 66, 0.3); transition: all 0.3s ease; cursor: pointer;" class="img-card">
                            <img src="img/SciLab/student/register.png" alt="Register" style="width: 100%; height: 250px; object-fit: cover; border-radius: 0.75rem; transition: transform 0.3s ease;">
                        </div>
                        <div style="overflow: hidden; border-radius: 0.75rem; border: 1px solid rgba(124, 179, 66, 0.3); transition: all 0.3s ease; cursor: pointer;" class="img-card">
                            <img src="img/SciLab/student/createreserve.png" alt="Create Reservation" style="width: 100%; height: 250px; object-fit: cover; border-radius: 0.75rem; transition: transform 0.3s ease;">
                        </div>
                        <div style="overflow: hidden; border-radius: 0.75rem; border: 1px solid rgba(124, 179, 66, 0.3); transition: all 0.3s ease; cursor: pointer;" class="img-card">
                            <img src="img/SciLab/student/reservation.png" alt="Reservation" style="width: 100%; height: 250px; object-fit: cover; border-radius: 0.75rem; transition: transform 0.3s ease;">
                        </div>
                        <div style="overflow: hidden; border-radius: 0.75rem; border: 1px solid rgba(124, 179, 66, 0.3); transition: all 0.3s ease; cursor: pointer;" class="img-card">
                            <img src="img/SciLab/student/pendingapproval.png" alt="Pending Approval" style="width: 100%; height: 250px; object-fit: cover; border-radius: 0.75rem; transition: transform 0.3s ease;">
                        </div>
                        <div style="overflow: hidden; border-radius: 0.75rem; border: 1px solid rgba(124, 179, 66, 0.3); transition: all 0.3s ease; cursor: pointer;" class="img-card">
                            <img src="img/SciLab/student/history.png" alt="History" style="width: 100%; height: 250px; object-fit: cover; border-radius: 0.75rem; transition: transform 0.3s ease;">
                        </div>
                    </div>
                </div>
            </div>
            <style>
                .img-card:hover {
                    border-color: #7CB342;
                    box-shadow: 0 0 20px rgba(124, 179, 66, 0.3);
                    transform: translateY(-4px);
                }
                .img-card:hover img {
                    transform: scale(1.05);
                }
            </style>
        `;
    } else if (cardTitle === 'PLSPCart – E-Commerce Platform') {
        modalContent.innerHTML = `
            <div>
                <div style="margin-bottom: 3rem;">
                    <h3 style="color: #8BC34A; font-size: 1.25rem; margin-bottom: 1.5rem; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; border-left: 4px solid #7CB342; padding-left: 1rem;">Admin Dashboard</h3>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem;">
                        <div style="overflow: hidden; border-radius: 0.75rem; border: 1px solid rgba(124, 179, 66, 0.3); transition: all 0.3s ease; cursor: pointer;" class="img-card">
                            <img src="img/plspcart/admin/Screenshot 2026-02-07 000636.png" alt="Admin 1" style="width: 100%; height: 250px; object-fit: cover; border-radius: 0.75rem; transition: transform 0.3s ease;">
                        </div>
                        <div style="overflow: hidden; border-radius: 0.75rem; border: 1px solid rgba(124, 179, 66, 0.3); transition: all 0.3s ease; cursor: pointer;" class="img-card">
                            <img src="img/plspcart/admin/Screenshot 2026-02-07 000640.png" alt="Admin 2" style="width: 100%; height: 250px; object-fit: cover; border-radius: 0.75rem; transition: transform 0.3s ease;">
                        </div>
                        <div style="overflow: hidden; border-radius: 0.75rem; border: 1px solid rgba(124, 179, 66, 0.3); transition: all 0.3s ease; cursor: pointer;" class="img-card">
                            <img src="img/plspcart/admin/Screenshot 2026-02-07 000643.png" alt="Admin 3" style="width: 100%; height: 250px; object-fit: cover; border-radius: 0.75rem; transition: transform 0.3s ease;">
                        </div>
                        <div style="overflow: hidden; border-radius: 0.75rem; border: 1px solid rgba(124, 179, 66, 0.3); transition: all 0.3s ease; cursor: pointer;" class="img-card">
                            <img src="img/plspcart/admin/Screenshot 2026-02-07 000647.png" alt="Admin 4" style="width: 100%; height: 250px; object-fit: cover; border-radius: 0.75rem; transition: transform 0.3s ease;">
                        </div>
                        <div style="overflow: hidden; border-radius: 0.75rem; border: 1px solid rgba(124, 179, 66, 0.3); transition: all 0.3s ease; cursor: pointer;" class="img-card">
                            <img src="img/plspcart/admin/Screenshot 2026-02-07 000651.png" alt="Admin 5" style="width: 100%; height: 250px; object-fit: cover; border-radius: 0.75rem; transition: transform 0.3s ease;">
                        </div>
                        <div style="overflow: hidden; border-radius: 0.75rem; border: 1px solid rgba(124, 179, 66, 0.3); transition: all 0.3s ease; cursor: pointer;" class="img-card">
                            <img src="img/plspcart/admin/Screenshot 2026-02-07 000700.png" alt="Admin 6" style="width: 100%; height: 250px; object-fit: cover; border-radius: 0.75rem; transition: transform 0.3s ease;">
                        </div>
                        <div style="overflow: hidden; border-radius: 0.75rem; border: 1px solid rgba(124, 179, 66, 0.3); transition: all 0.3s ease; cursor: pointer;" class="img-card">
                            <img src="img/plspcart/admin/Screenshot 2026-02-07 000704.png" alt="Admin 7" style="width: 100%; height: 250px; object-fit: cover; border-radius: 0.75rem; transition: transform 0.3s ease;">
                        </div>
                    </div>
                </div>
                
                <div>
                    <h3 style="color: #8BC34A; font-size: 1.25rem; margin-bottom: 1.5rem; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; border-left: 4px solid #7CB342; padding-left: 1rem;">Buyer Platform</h3>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem;">
                        <div style="overflow: hidden; border-radius: 0.75rem; border: 1px solid rgba(124, 179, 66, 0.3); transition: all 0.3s ease; cursor: pointer;" class="img-card">
                            <img src="img/plspcart/buyer/Screenshot 2026-02-07 000006.png" alt="Buyer 1" style="width: 100%; height: 250px; object-fit: cover; border-radius: 0.75rem; transition: transform 0.3s ease;">
                        </div>
                        <div style="overflow: hidden; border-radius: 0.75rem; border: 1px solid rgba(124, 179, 66, 0.3); transition: all 0.3s ease; cursor: pointer;" class="img-card">
                            <img src="img/plspcart/buyer/Screenshot 2026-02-07 000011.png" alt="Buyer 2" style="width: 100%; height: 250px; object-fit: cover; border-radius: 0.75rem; transition: transform 0.3s ease;">
                        </div>
                        <div style="overflow: hidden; border-radius: 0.75rem; border: 1px solid rgba(124, 179, 66, 0.3); transition: all 0.3s ease; cursor: pointer;" class="img-card">
                            <img src="img/plspcart/buyer/Screenshot 2026-02-07 000017.png" alt="Buyer 3" style="width: 100%; height: 250px; object-fit: cover; border-radius: 0.75rem; transition: transform 0.3s ease;">
                        </div>
                        <div style="overflow: hidden; border-radius: 0.75rem; border: 1px solid rgba(124, 179, 66, 0.3); transition: all 0.3s ease; cursor: pointer;" class="img-card">
                            <img src="img/plspcart/buyer/Screenshot 2026-02-07 000023.png" alt="Buyer 4" style="width: 100%; height: 250px; object-fit: cover; border-radius: 0.75rem; transition: transform 0.3s ease;">
                        </div>
                        <div style="overflow: hidden; border-radius: 0.75rem; border: 1px solid rgba(124, 179, 66, 0.3); transition: all 0.3s ease; cursor: pointer;" class="img-card">
                            <img src="img/plspcart/buyer/Screenshot 2026-02-07 000032.png" alt="Buyer 5" style="width: 100%; height: 250px; object-fit: cover; border-radius: 0.75rem; transition: transform 0.3s ease;">
                        </div>
                        <div style="overflow: hidden; border-radius: 0.75rem; border: 1px solid rgba(124, 179, 66, 0.3); transition: all 0.3s ease; cursor: pointer;" class="img-card">
                            <img src="img/plspcart/buyer/Screenshot 2026-02-07 000035.png" alt="Buyer 6" style="width: 100%; height: 250px; object-fit: cover; border-radius: 0.75rem; transition: transform 0.3s ease;">
                        </div>
                        <div style="overflow: hidden; border-radius: 0.75rem; border: 1px solid rgba(124, 179, 66, 0.3); transition: all 0.3s ease; cursor: pointer;" class="img-card">
                            <img src="img/plspcart/buyer/Screenshot 2026-02-07 000342.png" alt="Buyer 7" style="width: 100%; height: 250px; object-fit: cover; border-radius: 0.75rem; transition: transform 0.3s ease;">
                        </div>
                        <div style="overflow: hidden; border-radius: 0.75rem; border: 1px solid rgba(124, 179, 66, 0.3); transition: all 0.3s ease; cursor: pointer;" class="img-card">
                            <img src="img/plspcart/buyer/Screenshot 2026-02-07 000346.png" alt="Buyer 8" style="width: 100%; height: 250px; object-fit: cover; border-radius: 0.75rem; transition: transform 0.3s ease;">
                        </div>
                        <div style="overflow: hidden; border-radius: 0.75rem; border: 1px solid rgba(124, 179, 66, 0.3); transition: all 0.3s ease; cursor: pointer;" class="img-card">
                            <img src="img/plspcart/buyer/Screenshot 2026-02-07 000356.png" alt="Buyer 9" style="width: 100%; height: 250px; object-fit: cover; border-radius: 0.75rem; transition: transform 0.3s ease;">
                        </div>
                        <div style="overflow: hidden; border-radius: 0.75rem; border: 1px solid rgba(124, 179, 66, 0.3); transition: all 0.3s ease; cursor: pointer;" class="img-card">
                            <img src="img/plspcart/buyer/Screenshot 2026-02-07 000414.png" alt="Buyer 10" style="width: 100%; height: 250px; object-fit: cover; border-radius: 0.75rem; transition: transform 0.3s ease;">
                        </div>
                    </div>
                </div>
            </div>
            <style>
                .img-card:hover {
                    border-color: #7CB342;
                    box-shadow: 0 0 20px rgba(124, 179, 66, 0.3);
                    transform: translateY(-4px);
                }
                .img-card:hover img {
                    transform: scale(1.05);
                }
            </style>
        `;
    } else {
        modalContent.innerHTML = `
            <div style="padding: 3rem 2rem; text-align: center;">
                <div style="color: #7CB342; font-size: 3rem; margin-bottom: 1rem;">◆</div>
                <p style="color: #CCCCCC; font-size: 1.1rem;">No images available for this project yet.</p>
            </div>
        `;
    }
    
    // Show modal
    modal.style.display = 'flex';
}

function closeCardModal() {
    const modal = document.getElementById('card-modal');
    if (modal) {
        modal.style.display = 'none';
    }
}

function setupIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    const animateElements = document.querySelectorAll('.project-card, .skill-item, section > div');
    animateElements.forEach(el => {
        observer.observe(el);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    setupIntersectionObserver();
});

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

const optimizedScroll = throttle(function() {
}, 16);

window.addEventListener('scroll', optimizedScroll);

window.addEventListener('error', function(e) {
    console.error('Portfolio Error:', e.error);
});

window.PortfolioApp = {
    showNotification,
    updateActiveNavLink,
    debounce,
    throttle
};
