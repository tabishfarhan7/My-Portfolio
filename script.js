// Smooth scrolling 
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
})

window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(10,10,10,0.98)';
    } else {
        navbar.style.backgroundColor = 'rgba(10,10,10,0.95)';
    }
});


    //hamburger when clicked 
//     const hamburger = document.getElementById('hamburger');
// const navLinks = document.getElementById('navLinks');

// hamburger.addEventListener('click', () => {
//     navLinks.classList.toggle('active');
// });




const profileImg = document.querySelector('.profile-img');

const images = [
  'assets/Ghazi.png', // default
  'assets/profile.jpg',
  'assets/profile2.jpeg',
  'assets/profile3.jpeg',
  'assets/profile4.jpeg',
//   'profile5.jpeg',
  'assets/20.jpg'
];

let currentIndex = 0;
profileImg.src = images[currentIndex];
profileImg.style.transition = 'opacity 0.8s ease-in-out';

setInterval(() => {
  profileImg.style.opacity = 0;

  setTimeout(() => {
    currentIndex = (currentIndex + 1) % images.length;
    profileImg.src = images[currentIndex];
    profileImg.style.opacity = 1;
  }, 500); // wait before switching
}, 3000); // every 3 seconds



//TypeWriter Effect 
document.addEventListener("DOMContentLoaded", () => {
  const textElement = document.querySelector('.typewriter-text');
  const texts = ["Hi, I'm Tabish Farhan", "Full-Stack Web Developer"];
  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  if (!textElement) {
    console.error("❌ .typewriter-text element not found.");
    return;
  }

  function typeEffect() {
    const currentText = texts[textIndex];
    if (isDeleting) {
      charIndex--;
    } else {
      charIndex++;
    }

    textElement.innerHTML = currentText.substring(0, charIndex);

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentText.length) {
      typeSpeed = 1500;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
      typeSpeed = 500;
    }

    setTimeout(typeEffect, typeSpeed);
  }

  typeEffect();
});






// Portfolio Section JavaScript

// Animate project cards on scroll
function animateProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('animate-in');
                }, index * 150);
            }
        });
    }, { 
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    projectCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        observer.observe(card);
    });
}

// Add project card interactions
function addProjectInteractions() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        // Add click effect
        card.addEventListener('click', function(e) {
            // Don't trigger if clicking on buttons
            if (e.target.closest('.project-buttons')) return;
            
            // Add click ripple effect
            const ripple = document.createElement('div');
            ripple.classList.add('ripple');
            
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
        
        // Add hover effect for buttons
        const buttons = card.querySelectorAll('.btn-github, .btn-demo');
        buttons.forEach(button => {
            button.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-2px) scale(1.05)';
            });
            
            button.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });
    });
}

// Add typing effect to section title
function addTypingEffect() {
    const title = document.querySelector('.portfolio-title');
    if (!title) return;
    
    const text = title.textContent;
    title.textContent = '';
    
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            title.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    };
    
    // Start typing when section is in view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                typeWriter();
                observer.disconnect();
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(title);
}

// Add smooth scroll for anchor links
function addSmoothScroll() {
    const portfolioLinks = document.querySelectorAll('a[href="#projects"]');
    
    portfolioLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector('#projects');
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Add CSS for ripple effect and loading states
function addRippleStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(46, 204, 113, 0.3);
            pointer-events: none;
            transform: scale(0);
            animation: rippleEffect 0.6s ease-out;
            z-index: 1;
        }
        
        @keyframes rippleEffect {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
        
        .project-card {
            position: relative;
            overflow: hidden;
        }
        
        .portfolio-title.typing::after {
            content: '|';
            animation: blink 1s infinite;
        }
        
        @keyframes blink {
            0%, 50% { opacity: 1; }
            51%, 100% { opacity: 0; }
        }

        /* Loading states for images */
        .project-image-wrapper {
            position: relative;
        }

        .image-loading {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            color: var(--accent, #2ecc71);
            font-size: 2rem;
            z-index: 2;
        }

        .loading-spinner {
            width: 40px;
            height: 40px;
            border: 4px solid rgba(46, 204, 113, 0.3);
            border-top: 4px solid #2ecc71;
            border-radius: 50%;
            animation: spin 1s linear infinite;
        }

        @keyframes spin {
            0% { transform: translate(-50%, -50%) rotate(0deg); }
            100% { transform: translate(-50%, -50%) rotate(360deg); }
        }

        .project-image {
            transition: opacity 0.3s ease;
        }

        .project-image.loading {
            opacity: 0.3;
        }

        .project-image.loaded {
            opacity: 1;
        }

        .project-image.error {
            opacity: 0.7;
            filter: grayscale(1);
        }
    `;
    document.head.appendChild(style);
}

// Enhanced image loading with fallbacks and loading states
function addImageLoadingEffect() {
    const projectImages = document.querySelectorAll('.project-image');
    
    projectImages.forEach((img, index) => {
        const wrapper = img.closest('.project-image-wrapper');
        
        // Create loading spinner
        const loadingSpinner = document.createElement('div');
        loadingSpinner.className = 'image-loading';
        loadingSpinner.innerHTML = '<div class="loading-spinner"></div>';
        wrapper.appendChild(loadingSpinner);
        
        // Set initial loading state
        img.classList.add('loading');
        
        // Create a new image to test loading
        const testImg = new Image();
        
        // Set timeout for loading (5 seconds max)
        const loadingTimeout = setTimeout(() => {
            console.warn(`Image ${img.src} took too long to load, using fallback`);
            handleImageError(img, wrapper, loadingSpinner, index);
        }, 5000);
        
        testImg.onload = function() {
            clearTimeout(loadingTimeout);
            img.src = testImg.src;
            img.classList.remove('loading');
            img.classList.add('loaded');
            loadingSpinner.remove();
        };
        
        testImg.onerror = function() {
            clearTimeout(loadingTimeout);
            console.warn(`Failed to load image: ${img.src}`);
            handleImageError(img, wrapper, loadingSpinner, index);
        };
        
        // Start loading the image
        testImg.src = img.src;
    });
}

// Handle image loading errors with fallbacks
function handleImageError(img, wrapper, loadingSpinner, index) {
    // Array of fallback images from Unsplash
    const fallbackImages = [
        'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=250&fit=crop',
        'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=250&fit=crop',
        'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=250&fit=crop',
        'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=250&fit=crop',
        'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=250&fit=crop'
    ];
    
    // Use index to cycle through fallback images
    const fallbackSrc = fallbackImages[index % fallbackImages.length];
    
    // Try loading fallback image
    const fallbackImg = new Image();
    
    fallbackImg.onload = function() {
        img.src = fallbackSrc;
        img.classList.remove('loading');
        img.classList.add('loaded');
        loadingSpinner.remove();
    };
    
    fallbackImg.onerror = function() {
        // If fallback also fails, show a placeholder
        img.style.display = 'none';
        loadingSpinner.innerHTML = '<i class="fas fa-image" style="font-size: 2rem; color: #666;"></i>';
        loadingSpinner.style.color = '#666';
    };
    
    fallbackImg.src = fallbackSrc;
}

// Preload images when they come into view
function addLazyLoading() {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            }
        });
    }, {
        rootMargin: '50px'
    });

    const lazyImages = document.querySelectorAll('.project-image[data-src]');
    lazyImages.forEach(img => imageObserver.observe(img));
}

// Initialize all portfolio functionality
function initializePortfolio() {
    // Add styles first
    addRippleStyles();
    
    // Initialize animations and interactions
    animateProjectCards();
    addProjectInteractions();
    addTypingEffect();
    addSmoothScroll();
    addImageLoadingEffect();
    addLazyLoading();
    
    console.log('Portfolio section initialized successfully!');
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializePortfolio);

// Also initialize if script is loaded after DOM
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializePortfolio);
} else {
    initializePortfolio();
}

// Add resize handler for responsive behavior
window.addEventListener('resize', () => {
    // Recalculate any position-dependent elements
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        // Reset any inline styles that might interfere with responsive design
        card.style.transform = '';
    });
});



// Contact Form JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');
    const messagePopup = document.getElementById('messagePopup');
    
    // Add animation classes on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe contact cards and form
    document.querySelectorAll('.contact-card').forEach(card => {
        observer.observe(card);
    });
    
    observer.observe(document.querySelector('.contact-form-wrapper'));
    
    // Form submission handling
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name').trim();
        const email = formData.get('email').trim();
        const message = formData.get('message').trim();
        
        // Basic validation
        if (!name || !email || !message) {
            showMessage('Please fill in all fields.', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showMessage('Please enter a valid email address.', 'error');
            return;
        }
        
        // Show loading state
        setLoadingState(true);
        
        // Simulate form submission (replace with actual API call)
     fetch("https://formspree.io/f/manjkzzz", {
    method: "POST",
    body: new FormData(contactForm),
    headers: {
        'Accept': 'application/json'
    }
}).then(response => {
    if (response.ok) {
        contactForm.reset();
        showMessage("Thank you for your message! I'll get back to you soon.", "success");
    } else {
        showMessage("Oops! Something went wrong. Try again later.", "error");
    }
    setLoadingState(false);
}).catch(error => {
    showMessage("Error submitting the form. Please check your internet.", "error");
    setLoadingState(false);
});

    });
    
    // Contact card click handlers
    document.querySelectorAll('.contact-card').forEach(card => {
        card.addEventListener('click', function() {
            const contactType = this.dataset.contact;
            
            switch(contactType) {
                case 'email':
                    window.location.href = 'mailto:tabishfarhan516@gmail.com';
                    break;
                case 'instagram':
                    window.open('https://www.instagram.com/tabishfarhan_7/', '_blank');
                    break;
                case 'linkedin':
                    window.open('https://www.linkedin.com/in/md-tabish-farhan/', '_blank');
                    break;
            }
        });
        
        // Add ripple effect
        card.addEventListener('click', function(e) {
            createRipple(e, this);
        });
    });
    
    // Form input animations
    document.querySelectorAll('.form-input, .form-textarea').forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
    });
});

function setLoadingState(loading) {
    const submitBtn = document.getElementById('submitBtn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');
    
    if (loading) {
        submitBtn.disabled = true;
        btnText.style.display = 'none';
        btnLoading.style.display = 'inline-block';
    } else {
        submitBtn.disabled = false;
        btnText.style.display = 'inline-block';
        btnLoading.style.display = 'none';
    }
}

function showMessage(text, type) {
    const messagePopup = document.getElementById('messagePopup');
    const messageText = messagePopup.querySelector('.message-text');
    const messageIcon = messagePopup.querySelector('.message-icon');
    
    messageText.textContent = text;
    messagePopup.className = `message-popup show ${type}`;
    
    if (type === 'success') {
        messageIcon.className = 'message-icon fas fa-check-circle';
    } else {
        messageIcon.className = 'message-icon fas fa-exclamation-circle';
    }
    
    // Auto close after 5 seconds
    setTimeout(() => {
        closeMessage();
    }, 5000);
}

function closeMessage() {
    const messagePopup = document.getElementById('messagePopup');
    messagePopup.classList.remove('show');
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function createRipple(event, element) {
    const circle = document.createElement('span');
    const diameter = Math.max(element.clientWidth, element.clientHeight);
    const radius = diameter / 2;
    
    const rect = element.getBoundingClientRect();
    
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - rect.left - radius}px`;
    circle.style.top = `${event.clientY - rect.top - radius}px`;
    circle.classList.add('ripple');
    
    // Add ripple styles
    circle.style.position = 'absolute';
    circle.style.borderRadius = '50%';
    circle.style.transform = 'scale(0)';
    circle.style.animation = 'ripple 600ms linear';
    circle.style.backgroundColor = 'rgba(46, 204, 113, 0.3)';
    circle.style.pointerEvents = 'none';
    
    // Remove existing ripples
    const ripple = element.getElementsByClassName('ripple')[0];
    if (ripple) {
        ripple.remove();
    }
    
    element.appendChild(circle);
    
    // Remove ripple after animation
    setTimeout(() => {
        circle.remove();
    }, 600);
}

// Add CSS for ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .contact-card {
        position: relative;
        overflow: hidden;
    }
    
    .form-group.focused .form-input,
    .form-group.focused .form-textarea {
        border-color: var(--accent);
        box-shadow: 0 0 20px rgba(46, 204, 113, 0.2);
    }
`;
document.head.appendChild(style);

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// // Add parallax effect to background
// window.addEventListener('scroll', () => {
//     const scrolled = window.pageYOffset;
//     const contactSection = document.querySelector('.contact');
//     if (contactSection) {
//         const rate = scrolled * -0.5;
//         contactSection.style.transform = `translateY(${rate}px)`;
//     }
// });
