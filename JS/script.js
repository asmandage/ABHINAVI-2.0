  // ============================================
        // INITIALIZATION
        // ============================================
        document.addEventListener('DOMContentLoaded', function() {
            // Initialize all components
            initializeLoading();
            initializeLanguageToggle();
            initializeCountdown();
            initializeGallery();
            initializeMusicPlayer();
            initializeScrollTop();
            initializeAnimations();
            initializeRSVP();
            initializeTouchOptimizations();
            
            // Hide loading screen
            setTimeout(() => {
                document.getElementById('loading').style.opacity = '0';
                setTimeout(() => {
                    document.getElementById('loading').style.display = 'none';
                    // Initial confetti
                    createConfetti(30);
                }, 500);
            }, 1500);
        });

        // ============================================
        // LOADING SCREEN
        // ============================================
        function initializeLoading() {
            const loading = document.getElementById('loading');
            window.addEventListener('load', function() {
                setTimeout(() => {
                    loading.style.opacity = '0';
                    setTimeout(() => {
                        loading.style.display = 'none';
                    }, 500);
                }, 1000);
            });
        }

        // ============================================
        // LANGUAGE TOGGLE
        // ============================================
        function initializeLanguageToggle() {
            const langButtons = document.querySelectorAll('.lang-btn');
            const allLangContents = document.querySelectorAll('.lang-content');
            
            // Set initial language from localStorage or browser
            let currentLang = localStorage.getItem('weddingLang') || 
                             (navigator.language.startsWith('mr') ? 'mr' : 'en');
            
            const switchLanguage = (lang) => {
                // Update buttons
                langButtons.forEach(btn => {
                    btn.classList.toggle('active', btn.dataset.lang === lang);
                });
                
                // Update content
                allLangContents.forEach(content => {
                    content.classList.toggle('active', content.dataset.lang === lang);
                    
                    // Add animation
                    if (content.dataset.lang === lang) {
                        content.style.animation = 'none';
                        setTimeout(() => {
                            content.style.animation = 'fadeInUp 0.5s ease';
                        }, 10);
                    }
                });
                
                // Save preference
                localStorage.setItem('weddingLang', lang);
                currentLang = lang;
                
                // Create ripple effect
                createRippleEffect();
            };
            
            // Add click handlers
            langButtons.forEach(btn => {
                btn.addEventListener('click', () => {
                    switchLanguage(btn.dataset.lang);
                    createConfetti(10);
                });
            });
            
            // Initialize
            switchLanguage(currentLang);
            
            return { switchLanguage };
        }

        // ============================================
        // COUNTDOWN
        // ============================================
        function initializeCountdown() {
            const weddingDate = new Date("Feb 10, 2026 00:00:00").getTime();
            const daysEl = document.getElementById('days');
            const hoursEl = document.getElementById('hours');
            const minutesEl = document.getElementById('minutes');
            const secondsEl = document.getElementById('seconds');
            
            function updateCountdown() {
                const now = new Date().getTime();
                const diff = weddingDate - now;
                
                if (diff < 0) {
                    document.getElementById("countdown").innerHTML = 
                        '<div style="color: var(--color-primary); font-size: 1.8rem; text-align: center; padding: 20px;">🎉 We Are Married! 🎉</div>';
                    createConfetti(50);
                    return;
                }
                
                const days = Math.floor(diff / (1000 * 60 * 60 * 24));
                const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((diff % (1000 * 60)) / 1000);
                
                daysEl.textContent = days.toString().padStart(2, '0');
                hoursEl.textContent = hours.toString().padStart(2, '0');
                minutesEl.textContent = minutes.toString().padStart(2, '0');
                secondsEl.textContent = seconds.toString().padStart(2, '0');
                
                // Add pulse animation to changing numbers
                [daysEl, hoursEl, minutesEl, secondsEl].forEach(el => {
                    el.style.animation = 'none';
                    setTimeout(() => {
                        el.style.animation = 'pulse 1s ease';
                    }, 10);
                });
                
                // Special effects at certain times
                if (seconds === 0) {
                    createFloatingHearts(2);
                }
                
                if (days === 100 || days === 50 || days === 30 || days === 7 || days === 1) {
                    createConfetti(20);
                }
            }
            
            // Initial update
            updateCountdown();
            
            // Update every second
            setInterval(updateCountdown, 1000);
        }

        // ============================================
        // ENHANCED GALLERY
        // ============================================
        function initializeGallery() {
            const galleryGrid = document.getElementById('galleryGrid');
            const prevBtn = document.getElementById('prevGallery');
            const nextBtn = document.getElementById('nextGallery');
            
            // Gallery data with more images
            const galleryData = [
                {
                    src: 'images/IMG1.jpg',
                    title: 'Engagement Day',
                    desc: 'Our special engagement ceremony'
                },
                {
                    src: 'images/IMG2.jpg',
                    title: 'Special Moments',
                    desc: 'Cherished memories together'
                },
                {
                    src: 'images/IMG3.jpg',
                    title: 'Together Forever',
                    desc: 'Our journey continues'
                },
                {
                    src: 'images/IMG4.jpg',
                    title: 'First Date',
                    desc: 'Where it all began'
                },
                {
                    src: 'images/IMG7.jpg',
                    title: 'Proposal',
                    desc: 'The magical moment'
                },
                {
                    src: 'images/IMG8.jpg',
                    title: 'Celebration',
                    desc: 'With family and friends'
                }
            ];
            
            let currentIndex = 0;
            const itemsPerPage = window.innerWidth < 768 ? 1 : 3;
            
            function renderGallery() {
                galleryGrid.innerHTML = '';
                
                // Calculate which items to show
                const startIndex = currentIndex;
                const endIndex = Math.min(startIndex + itemsPerPage, galleryData.length);
                
                // Add items
                for (let i = startIndex; i < endIndex; i++) {
                    const item = galleryData[i];
                    const galleryItem = document.createElement('div');
                    galleryItem.className = 'gallery-item';
                    galleryItem.innerHTML = `
                        <a href="${item.src}" data-lightbox="gallery" data-title="${item.title} - ${item.desc}">
                            <img src="${item.src}" alt="${item.title}" loading="lazy">
                            <div class="gallery-overlay">
                                <div class="gallery-overlay-content">
                                    <h3>${item.title}</h3>
                                    <p>${item.desc}</p>
                                </div>
                            </div>
                        </a>
                    `;
                    galleryGrid.appendChild(galleryItem);
                    
                    // Add animation with delay
                    setTimeout(() => {
                        galleryItem.classList.add('animate');
                    }, i * 200);
                }
                
                // Update button states
                prevBtn.disabled = currentIndex === 0;
                nextBtn.disabled = currentIndex + itemsPerPage >= galleryData.length;
                
                // Initialize lightbox
                lightbox.option({
                    'resizeDuration': 200,
                    'wrapAround': true,
                    'albumLabel': 'Image %1 of %2',
                    'fadeDuration': 300,
                    'imageFadeDuration': 300
                });
            }
            
            // Navigation
            prevBtn.addEventListener('click', () => {
                if (currentIndex > 0) {
                    currentIndex = Math.max(0, currentIndex - itemsPerPage);
                    renderGallery();
                    createSwipeAnimation('left');
                }
            });
            
            nextBtn.addEventListener('click', () => {
                if (currentIndex + itemsPerPage < galleryData.length) {
                    currentIndex = Math.min(galleryData.length - itemsPerPage, currentIndex + itemsPerPage);
                    renderGallery();
                    createSwipeAnimation('right');
                }
            });
            
            // Swipe support for mobile
            let touchStartX = 0;
            let touchEndX = 0;
            
            galleryGrid.addEventListener('touchstart', e => {
                touchStartX = e.changedTouches[0].screenX;
            });
            
            galleryGrid.addEventListener('touchend', e => {
                touchEndX = e.changedTouches[0].screenX;
                handleSwipe();
            });
            
            function handleSwipe() {
                const swipeThreshold = 50;
                const diff = touchStartX - touchEndX;
                
                if (Math.abs(diff) > swipeThreshold) {
                    if (diff > 0 && !nextBtn.disabled) {
                        // Swipe left
                        nextBtn.click();
                    } else if (diff < 0 && !prevBtn.disabled) {
                        // Swipe right
                        prevBtn.click();
                    }
                }
            }
            
            // Initial render
            renderGallery();
            
            // Responsive adjustment
            window.addEventListener('resize', () => {
                const newItemsPerPage = window.innerWidth < 768 ? 1 : 3;
                if (newItemsPerPage !== itemsPerPage) {
                    currentIndex = 0;
                    renderGallery();
                }
            });
        }

        // ============================================
        // MUSIC PLAYER
        // ============================================
        function initializeMusicPlayer() {
            const backgroundMusic = document.getElementById('backgroundMusic');
            const playMusicBtn = document.getElementById('playMusic');
            const musicIcon = playMusicBtn.querySelector('i');
            
            let isPlaying = false;
            
            // Try to play music automatically (with user interaction)
            document.addEventListener('click', function initMusic() {
                if (!isPlaying) {
                    backgroundMusic.play().then(() => {
                        isPlaying = true;
                        musicIcon.className = 'fas fa-pause';
                        playMusicBtn.style.animation = 'none';
                    }).catch(() => {
                        // Autoplay prevented
                        console.log('Autoplay prevented. User must interact first.');
                    });
                    
                    // Remove event listener after first click
                    document.removeEventListener('click', initMusic);
                }
            }, { once: true });
            
            playMusicBtn.addEventListener('click', function() {
                if (isPlaying) {
                    backgroundMusic.pause();
                    musicIcon.className = 'fas fa-play';
                    playMusicBtn.style.animation = 'pulse 2s infinite';
                } else {
                    backgroundMusic.play().then(() => {
                        musicIcon.className = 'fas fa-pause';
                        playMusicBtn.style.animation = 'none';
                    }).catch(error => {
                        console.log("Playback failed:", error);
                    });
                }
                isPlaying = !isPlaying;
                
                // Create musical notes animation
                createMusicalNotes();
            });
            
            // Volume control for mobile
            backgroundMusic.volume = 0.5;
        }

        // ============================================
        // SCROLL TO TOP
        // ============================================
        function initializeScrollTop() {
            const scrollTopBtn = document.getElementById('scrollTop');
            
            window.addEventListener('scroll', () => {
                if (window.scrollY > 300) {
                    scrollTopBtn.classList.add('visible');
                } else {
                    scrollTopBtn.classList.remove('visible');
                }
            });
            
            scrollTopBtn.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                createRippleEffect();
            });
        }

        // ============================================
        // ANIMATIONS
        // ============================================
        function initializeAnimations() {
            // Intersection Observer for scroll animations
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                        
                        // Special animations for different elements
                        if (entry.target.classList.contains('gallery-item')) {
                            entry.target.classList.add('animate');
                        }
                        
                        if (entry.target.classList.contains('story-text')) {
                            entry.target.style.animation = 'fadeInUp 0.8s ease';
                        }
                        
                        // Random floating hearts
                        if (Math.random() > 0.7) {
                            createFloatingHearts(2);
                        }
                    }
                });
            }, observerOptions);
            
            // Observe elements
            document.querySelectorAll('.gallery-item, .venue-info, .venue-image, .story-text, .story-quote, .countdown-item').forEach(el => {
                observer.observe(el);
            });
            
            // Parallax effect for hero
            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset;
                const hero = document.querySelector('.hero');
                if (hero) {
                    hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
                }
            });
        }

        // ============================================
        // RSVP FUNCTIONALITY
        // ============================================
        function initializeRSVP() {
            const rsvpButton = document.getElementById('rsvpButton');
            
            // WhatsApp message based on language
            const messages = {
                en: "Hello Nakkechi, I will be attending your wedding on 10th February 2026! Can't wait to celebrate with you both! 🎉",
                mr: "हॅलो नक्केची, मी १० फेब्रुवारी २०२६ रोजी तुमच्या लग्नाला उपस्थित राहीन! तुम दोघांसोबत साजरा करण्यासाठी प्रतीक्षा करू शकत नाही! 🎉"
            };
            
            rsvpButton.addEventListener('click', function() {
                const currentLang = document.querySelector('.lang-btn.active').dataset.lang;
                const phoneNumber = '918522007111';
                const message = encodeURIComponent(messages[currentLang]);
                const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
                
                // Open WhatsApp
                window.open(whatsappUrl, '_blank');
                
                // Celebration effects
                createConfetti(30);
                createFloatingHearts(5);
                createRippleEffect(this);
                
                // Sound effect
                const clickSound = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-select-click-1109.mp3');
                clickSound.volume = 0.3;
                clickSound.play().catch(e => console.log("Audio play failed:", e));
            });
        }

        // ============================================
        // TOUCH OPTIMIZATIONS
        // ============================================
        function initializeTouchOptimizations() {
            // Add touch-specific classes
            if ('ontouchstart' in window) {
                document.body.classList.add('touch-device');
                
                // Increase tap targets
                const tapTargets = document.querySelectorAll('.rsvp-btn, .lang-btn, .music-btn, .gallery-nav-btn, .scroll-top');
                tapTargets.forEach(target => {
                    target.style.minHeight = '44px';
                    target.style.minWidth = '44px';
                });
                
                // Prevent zoom on double tap
                let lastTouchEnd = 0;
                document.addEventListener('touchend', function(event) {
                    const now = (new Date()).getTime();
                    if (now - lastTouchEnd <= 300) {
                        event.preventDefault();
                    }
                    lastTouchEnd = now;
                }, false);
            }
            
            // Disable animations if user prefers reduced motion
            if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                document.querySelectorAll('*').forEach(el => {
                    el.style.animationPlayState = 'paused';
                });
            }
        }

        // ============================================
        // ANIMATION EFFECTS
        // ============================================
        function createConfetti(count = 50) {
            const container = document.getElementById('confetti-container');
            const colors = [
                '#d46ba6', '#d4af37', '#2c3e50', '#ffffff', 
                '#ff6b6b', '#4ecdc4', '#ffe66d', '#95e1d3'
            ];
            
            const shapes = ['❤️', '💕', '💍', '🌸', '✨', '🎉', '💫', '🌟'];
            
            for (let i = 0; i < count; i++) {
                const confetti = document.createElement('div');
                confetti.className = 'confetti';
                
                // Random properties
                const size = Math.random() * 20 + 10;
                const left = Math.random() * 100;
                const animationDuration = Math.random() * 3 + 2;
                const animationDelay = Math.random();
                const shape = shapes[Math.floor(Math.random() * shapes.length)];
                
                // Apply styles
                confetti.innerHTML = shape;
                confetti.style.fontSize = `${size}px`;
                confetti.style.left = `${left}%`;
                confetti.style.top = '-50px';
                confetti.style.color = colors[Math.floor(Math.random() * colors.length)];
                
                // Apply animation
                confetti.style.animation = `confettiFall ${animationDuration}s ease-out ${animationDelay}s forwards`;
                confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
                
                // Add to container
                container.appendChild(confetti);
                
                // Remove after animation
                setTimeout(() => {
                    confetti.remove();
                }, (animationDuration + animationDelay) * 1000);
            }
        }
        
        function createFloatingHearts(count = 3) {
            for (let i = 0; i < count; i++) {
                const heart = document.createElement('div');
                heart.innerHTML = '❤️';
                heart.style.position = 'fixed';
                heart.style.fontSize = '20px';
                heart.style.color = '#ff6b6b';
                heart.style.zIndex = '1';
                heart.style.pointerEvents = 'none';
                heart.style.left = `${Math.random() * 100}%`;
                heart.style.top = '100%';
                heart.style.opacity = '0.7';
                
                document.body.appendChild(heart);
                
                // Animate
                const duration = Math.random() * 3 + 2;
                heart.style.animation = `confettiFall ${duration}s ease-out forwards`;
                heart.style.transform = `translateX(${Math.random() * 100 - 50}px)`;
                
                // Remove after animation
                setTimeout(() => {
                    heart.remove();
                }, duration * 1000);
            }
        }
        
        function createMusicalNotes() {
            const notes = ['♪', '♫', '♬', '🎵', '🎶'];
            
            for (let i = 0; i < 5; i++) {
                const note = document.createElement('div');
                note.innerHTML = notes[Math.floor(Math.random() * notes.length)];
                note.style.position = 'fixed';
                note.style.fontSize = '24px';
                note.style.color = '#d4af37';
                note.style.zIndex = '1000';
                note.style.pointerEvents = 'none';
                note.style.left = `${Math.random() * 100}%`;
                note.style.top = '100%';
                note.style.opacity = '0.8';
                
                document.body.appendChild(note);
                
                // Animate
                const duration = Math.random() * 2 + 1;
                note.style.transition = `all ${duration}s ease-out`;
                
                setTimeout(() => {
                    note.style.top = '-50px';
                    note.style.opacity = '0';
                    note.style.transform = `translateX(${Math.random() * 100 - 50}px) rotate(${Math.random() * 360}deg)`;
                }, 10);
                
                // Remove after animation
                setTimeout(() => {
                    note.remove();
                }, duration * 1000);
            }
        }
        
        function createRippleEffect(element = document.body) {
            const ripple = document.createElement('div');
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.backgroundColor = 'rgba(212, 107, 166, 0.3)';
            ripple.style.pointerEvents = 'none';
            ripple.style.animation = 'ripple 0.6s linear';
            
            if (element === document.body) {
                ripple.style.top = '50%';
                ripple.style.left = '50%';
                ripple.style.width = '100px';
                ripple.style.height = '100px';
                ripple.style.transform = 'translate(-50%, -50%)';
                document.body.appendChild(ripple);
            } else {
                const rect = element.getBoundingClientRect();
                ripple.style.top = '0';
                ripple.style.left = '0';
                ripple.style.width = Math.max(rect.width, rect.height) + 'px';
                ripple.style.height = Math.max(rect.width, rect.height) + 'px';
                ripple.style.transform = 'translate(-50%, -50%)';
                ripple.style.top = rect.height / 2 + 'px';
                ripple.style.left = rect.width / 2 + 'px';
                element.style.position = 'relative';
                element.appendChild(ripple);
            }
            
            // Remove after animation
            setTimeout(() => {
                ripple.remove();
            }, 600);
        }
        
        function createSwipeAnimation(direction) {
            const swipe = document.createElement('div');
            swipe.innerHTML = direction === 'left' ? '←' : '→';
            swipe.style.position = 'fixed';
            swipe.style.fontSize = '40px';
            swipe.style.color = 'var(--color-primary)';
            swipe.style.zIndex = '1000';
            swipe.style.pointerEvents = 'none';
            swipe.style.left = direction === 'left' ? '20px' : 'calc(100% - 60px)';
            swipe.style.top = '50%';
            swipe.style.transform = 'translateY(-50%)';
            swipe.style.opacity = '0.7';
            swipe.style.animation = 'fadeOut 1s ease-out forwards';
            
            document.body.appendChild(swipe);
            
            // Remove after animation
            setTimeout(() => {
                swipe.remove();
            }, 1000);
        }

        // ============================================
        // PERFORMANCE OPTIMIZATIONS
        // ============================================
        // Debounce resize events
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                // Handle responsive changes
                if (window.innerWidth < 768) {
                    document.body.classList.add('mobile-view');
                } else {
                    document.body.classList.remove('mobile-view');
                }
            }, 250);
        });

        // Lazy load images
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }

        // ============================================
        // OFFLINE SUPPORT
        // ============================================
        window.addEventListener('online', () => {
            showToast('Back online!', 'success');
        });
        
        window.addEventListener('offline', () => {
            showToast('You are offline. Some features may not work.', 'warning');
        });
        
        function showToast(message, type) {
            const toast = document.createElement('div');
            toast.textContent = message;
            toast.style.position = 'fixed';
            toast.style.bottom = '20px';
            toast.style.left = '50%';
            toast.style.transform = 'translateX(-50%)';
            toast.style.background = type === 'success' ? '#4CAF50' : '#FF9800';
            toast.style.color = 'white';
            toast.style.padding = '10px 20px';
            toast.style.borderRadius = '5px';
            toast.style.zIndex = '10000';
            toast.style.animation = 'slideUp 0.3s ease';
            
            document.body.appendChild(toast);
            
            setTimeout(() => {
                toast.style.animation = 'slideUp 0.3s ease reverse';
                setTimeout(() => {
                    toast.remove();
                }, 300);
            }, 3000);
        }

        // ============================================
        // ACCESSIBILITY IMPROVEMENTS
        // ============================================
        // Focus management for keyboard users
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-user');
            }
        });
        
        document.addEventListener('click', () => {
            document.body.classList.remove('keyboard-user');
        });
        
        // Skip to main content for screen readers
        const skipLink = document.createElement('a');
        skipLink.href = '#main-content';
        skipLink.className = 'skip-link';
        skipLink.textContent = 'Skip to main content';
        skipLink.style.position = 'absolute';
        skipLink.style.top = '-40px';
        skipLink.style.left = '0';
        skipLink.style.background = 'var(--color-primary)';
        skipLink.style.color = 'white';
        skipLink.style.padding = '8px';
        skipLink.style.zIndex = '10001';
        skipLink.style.textDecoration = 'none';
        
        skipLink.addEventListener('focus', () => {
            skipLink.style.top = '0';
        });
        
        skipLink.addEventListener('blur', () => {
            skipLink.style.top = '-40px';
        });
        
        document.body.insertBefore(skipLink, document.body.firstChild);
        
        // Add main content id
        const mainContent = document.querySelector('.hero');
        if (mainContent) {
            mainContent.id = 'main-content';
        }
// Add this to your existing script
let particleDensity = 'medium'; // Default density

function createParticleAnimation() {
    const container = document.querySelector('.particles-container');
    if (!container) return;
    
    // Clear existing particles
    container.innerHTML = '';
    
    // Set particle counts based on density
    let particleCount, heartCount, sparkleCount;
    
    switch(particleDensity) {
        case 'low':
            particleCount = 40;
            heartCount = 10;
            sparkleCount = 15;
            break;
        case 'medium':
            particleCount = 80;
            heartCount = 20;
            sparkleCount = 30;
            break;
        case 'high':
            particleCount = 150;
            heartCount = 40;
            sparkleCount = 60;
            break;
        default:
            particleCount = 80;
            heartCount = 20;
            sparkleCount = 30;
    }
    
    // Create regular particles
    for (let i = 0; i < particleCount; i++) {
        createParticle(container);
    }
    
    // Create heart particles
    for (let i = 0; i < heartCount; i++) {
        createHeartParticle(container);
    }
    
    // Create sparkle particles
    for (let i = 0; i < sparkleCount; i++) {
        createSparkleParticle(container);
    }
    
    console.log(`Particle density set to: ${particleDensity}`);
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    
    // Random size
    const sizes = ['small', 'medium', 'large'];
    const size = sizes[Math.floor(Math.random() * sizes.length)];
    particle.classList.add(size);
    
    // Random color
    const colors = ['pink', 'gold', 'white'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    particle.classList.add(color);
    
    // Random animation
    const animations = ['particleFloat', 'particleFloat2', 'particleFloat3'];
    const animation = animations[Math.floor(Math.random() * animations.length)];
    
    // Random properties
    const left = Math.random() * 100;
    const duration = 15 + Math.random() * 20;
    const delay = Math.random() * 10;
    
    // Apply styles
    particle.style.cssText = `
        left: ${left}%;
        top: ${Math.random() * 100}%;
        animation-name: ${animation};
        animation-duration: ${duration}s;
        animation-delay: ${delay}s;
        --random-x: ${Math.random() * 2 - 0.5};
    `;
    
    container.appendChild(particle);
    
    // Recreate particle after animation ends
    setTimeout(() => {
        if (particle.parentNode === container) {
            particle.remove();
            createParticle(container);
        }
    }, (duration + delay) * 1000);
}

function createHeartParticle(container) {
    const heart = document.createElement('div');
    heart.classList.add('heart-particle');
    heart.innerHTML = '❤️';
    
    // Random properties
    const left = Math.random() * 100;
    const size = 12 + Math.random() * 20;
    const duration = 10 + Math.random() * 15;
    const delay = Math.random() * 20;
    
    heart.style.cssText = `
        left: ${left}%;
        font-size: ${size}px;
        animation-duration: ${duration}s;
        animation-delay: ${delay}s;
        animation-timing-function: linear;
    `;
    
    container.appendChild(heart);
    
    // Recreate heart after animation ends
    setTimeout(() => {
        if (heart.parentNode === container) {
            heart.remove();
            createHeartParticle(container);
        }
    }, (duration + delay) * 1000);
}

function createSparkleParticle(container) {
    const sparkle = document.createElement('div');
    sparkle.classList.add('sparkle-particle');
    sparkle.innerHTML = '✨';
    
    // Random properties
    const left = Math.random() * 100;
    const top = Math.random() * 100;
    const duration = 1 + Math.random() * 3;
    const delay = Math.random() * 5;
    
    sparkle.style.cssText = `
        left: ${left}%;
        top: ${top}%;
        animation-duration: ${duration}s;
        animation-delay: ${delay}s;
    `;
    
    container.appendChild(sparkle);
    
    // Recreate sparkle after animation ends
    setTimeout(() => {
        if (sparkle.parentNode === container) {
            sparkle.remove();
            createSparkleParticle(container);
        }
    }, (duration + delay) * 1000);
}

// Initialize particles with default medium density
document.addEventListener('DOMContentLoaded', function() {
    createParticleAnimation();
    
    // Initialize particle controls if they exist
    const controls = document.querySelector('.particle-controls');
    if (controls) {
        initializeParticleControls();
    }
    
    // Performance optimizations
    optimizeParticles();
    
    // Interactive particles on click
    document.addEventListener('click', (e) => {
        createClickParticles(e.clientX, e.clientY);
    });
});

// Initialize particle controls
function initializeParticleControls() {
    const buttons = document.querySelectorAll('.particle-btn');
    
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            buttons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Update density
            particleDensity = btn.dataset.density;
            
            // Recreate particles with new density
            createParticleAnimation();
            
            // Save preference to localStorage
            localStorage.setItem('particleDensity', particleDensity);
            
            // Show feedback
            showParticleFeedback(particleDensity);
        });
    });
    
    // Load saved preference
    const savedDensity = localStorage.getItem('particleDensity');
    if (savedDensity) {
        particleDensity = savedDensity;
        const activeBtn = document.querySelector(`.particle-btn[data-density="${savedDensity}"]`);
        if (activeBtn) {
            buttons.forEach(b => b.classList.remove('active'));
            activeBtn.classList.add('active');
            createParticleAnimation();
        }
    }
}

// Show feedback when changing density
function showParticleFeedback(density) {
    const messages = {
        'low': 'Particles set to Low density',
        'medium': 'Particles set to Medium density',
        'high': 'Particles set to High density'
    };
    
    // Create feedback element
    const feedback = document.createElement('div');
    feedback.textContent = messages[density];
    feedback.style.cssText = `
        position: fixed;
        bottom: 140px;
        right: 20px;
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 10px 15px;
        border-radius: 8px;
        font-size: 0.9rem;
        z-index: 10000;
        animation: slideUp 0.3s ease, fadeOut 0.3s ease 1.5s forwards;
    `;
    
    document.body.appendChild(feedback);
    
    // Remove after animation
    setTimeout(() => {
        feedback.remove();
    }, 2000);
}

// Performance optimization
function optimizeParticles() {
    // Reduce particles on low-end devices automatically
    if (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4) {
        console.log('Low-end device detected. Optimizing particles...');
        particleDensity = 'low';
        localStorage.setItem('particleDensity', 'low');
        
        // Update UI if controls exist
        const lowBtn = document.querySelector('.particle-btn[data-density="low"]');
        if (lowBtn) {
            document.querySelectorAll('.particle-btn').forEach(b => b.classList.remove('active'));
            lowBtn.classList.add('active');
        }
        
        createParticleAnimation();
    }
    
    // Reduce particles when tab is hidden
    document.addEventListener('visibilitychange', () => {
        const particles = document.querySelectorAll('.particle, .heart-particle, .sparkle-particle');
        if (document.hidden) {
            particles.forEach(el => {
                el.style.animationPlayState = 'paused';
                el.style.opacity = '0.2';
            });
        } else {
            particles.forEach(el => {
                el.style.animationPlayState = 'running';
                el.style.opacity = '';
            });
        }
    });
}

// Interactive click particles (kept from previous code)
function createClickParticles(x, y) {
    const container = document.querySelector('.particles-container');
    const colors = ['#d46ba6', '#d4af37', '#ffffff', '#ff6b6b'];
    const symbols = ['❤️', '💕', '✨', '🌸', '💫'];
    
    // Number of click particles based on density
    let clickCount;
    switch(particleDensity) {
        case 'low': clickCount = 5; break;
        case 'medium': clickCount = 10; break;
        case 'high': clickCount = 15; break;
        default: clickCount = 10;
    }
    
    for (let i = 0; i < clickCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('heart-particle');
        particle.innerHTML = symbols[Math.floor(Math.random() * symbols.length)];
        
        const angle = Math.random() * Math.PI * 2;
        const distance = 30 + Math.random() * 70;
        const size = 14 + Math.random() * 20;
        const duration = 0.6 + Math.random() * 1;
        
        particle.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            font-size: ${size}px;
            color: ${colors[Math.floor(Math.random() * colors.length)]};
            z-index: 10000;
            pointer-events: none;
            transform: translate(0, 0);
            animation: none;
        `;
        
        document.body.appendChild(particle);
        
        // Animate
        particle.animate([
            { 
                transform: `translate(0, 0) rotate(0deg) scale(1)`,
                opacity: 1 
            },
            { 
                transform: `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) rotate(360deg) scale(0)`,
                opacity: 0 
            }
        ], {
            duration: duration * 1000,
            easing: 'cubic-bezier(0.22, 0.61, 0.36, 1)'
        }).onfinish = () => particle.remove();
    }
}

// Add fadeOut animation for feedback
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
`;
document.head.appendChild(style);
        document.addEventListener("click", () => {
    const music = document.getElementById("backgroundMusic");
    music.play().catch(() => {});
}, { once: true });

const music = document.getElementById("backgroundMusic");
const playBtn = document.getElementById("playMusic");
const icon = playBtn.querySelector("i");

playBtn.addEventListener("click", () => {
    if (music.paused) {
        music.play().then(() => {
            icon.classList.remove("fa-play");
            icon.classList.add("fa-pause");
        }).catch(err => console.log(err));
    } else {
        music.pause();
        icon.classList.remove("fa-pause");
        icon.classList.add("fa-play");
    }
});
document.addEventListener("click", () => {
    if (music.paused) {
        music.play();
        icon.classList.replace("fa-play", "fa-pause");
    }
}, { once: true });
