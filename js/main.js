/* ==========================================================================
   MUHAMMED PORTFOLIO JAVASCRIPT
   Theme Switcher, Search Modal, Mobile Drawer Menu, and Scroll-to-Top
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // --- LENIS ULTRA-SMOOTH SCROLLING INTEGRATION ---
    if (typeof Lenis !== 'undefined') {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
            touchMultiplier: 1.8
        });

        // Sync Lenis scroll updates with GSAP ScrollTrigger
        if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
            lenis.on('scroll', ScrollTrigger.update);

            gsap.ticker.add((time) => {
                lenis.raf(time * 1000);
            });

            gsap.ticker.lagSmoothing(0);
        } else {
            function raf(time) {
                lenis.raf(time);
                requestAnimationFrame(raf);
            }
            requestAnimationFrame(raf);
        }
    }

    // Helper function to safely get element by ID
    const id = (elementId) => document.getElementById(elementId);

    // --- 1. LIGHT / DARK THEME TOGGLE WITH LOCALSTORAGE ---
    const themeToggleBtn = id('theme-toggle');
    const htmlElement = document.documentElement;

    // Default theme set to pure white light mode
    htmlElement.setAttribute('data-theme', 'light');
    localStorage.setItem('portfolio_theme', 'light');

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = htmlElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

            htmlElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('portfolio_theme', newTheme);
        });
    }

    // --- STICKY HEADER GLASSMORPHIC SCROLL LISTENER ---
    const siteHeader = document.querySelector('.site-header');

    const handleHeaderScroll = () => {
        if (siteHeader) {
            if (window.scrollY > 20) {
                siteHeader.classList.add('scrolled');
            } else {
                siteHeader.classList.remove('scrolled');
            }
        }
    };

    window.addEventListener('scroll', handleHeaderScroll, { passive: true });
    handleHeaderScroll();

    // --- GSAP SCROLLTRIGGER STICKY PIN & PARALLAX ANIMATION (EXACT BFOLIO TP-GALLERY-AREA) ---
    const galleryArea = document.getElementById('tp-gallery-area');
    const trackLeft = document.getElementById('track-left');
    const trackCenter = document.getElementById('track-center');
    const trackRight = document.getElementById('track-right');

    if (galleryArea && trackLeft && trackCenter && trackRight) {
        if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
            gsap.registerPlugin(ScrollTrigger);

            // Initial column off-sets matching bfolio demo design
            gsap.set(trackLeft, { y: 100 });
            gsap.set(trackCenter, { y: -450 });
            gsap.set(trackRight, { y: 100 });

            // Create pinned GSAP ScrollTrigger timeline
            let galleryTL = gsap.timeline({
                scrollTrigger: {
                    trigger: galleryArea,
                    start: 'top top',
                    end: '+=1400',
                    pin: true,
                    scrub: 1,
                    anticipatePin: 1,
                    invalidateOnRefresh: true
                }
            });

            galleryTL
                .to(trackLeft, { y: -550, ease: 'none' }, 0)
                .to(trackCenter, { y: 300, ease: 'none' }, 0)
                .to(trackRight, { y: -550, ease: 'none' }, 0);
        } else {
            // High-performance smooth fallback
            trackLeft.style.transition = 'transform 0.1s linear';
            trackCenter.style.transition = 'transform 0.1s linear';
            trackRight.style.transition = 'transform 0.1s linear';

            const handleGalleryScroll = () => {
                const rect = galleryArea.getBoundingClientRect();
                const windowHeight = window.innerHeight;

                if (rect.top <= windowHeight && rect.bottom >= 0) {
                    const scrollProgress = (windowHeight - rect.top) / (windowHeight + rect.height);
                    const offset = (scrollProgress - 0.5) * 400;

                    trackLeft.style.transform = `translate3d(0, ${-offset}px, 0)`;
                    trackCenter.style.transform = `translate3d(0, ${offset * 1.3}px, 0)`;
                    trackRight.style.transform = `translate3d(0, ${-offset}px, 0)`;
                }
            };

            window.addEventListener('scroll', handleGalleryScroll, { passive: true });
            handleGalleryScroll();
        }
    }

    // --- 2. SEARCH OVERLAY TOGGLE ---
    const searchToggleBtn = document.getElementById('search-toggle');
    const searchOverlay = document.getElementById('search-overlay');
    const searchCloseBtn = document.getElementById('search-close');
    const searchInput = document.getElementById('search-input');

    if (searchToggleBtn && searchOverlay) {
        searchToggleBtn.addEventListener('click', () => {
            searchOverlay.classList.add('active');
            if (searchInput) searchInput.focus();
        });

        if (searchCloseBtn) {
            searchCloseBtn.addEventListener('click', () => {
                searchOverlay.classList.remove('active');
            });
        }

        searchOverlay.addEventListener('click', (e) => {
            if (e.target === searchOverlay) {
                searchOverlay.classList.remove('active');
            }
        });
    }

    // --- 3. MOBILE DRAWER NAVIGATION MENU ---
    const mobileMenuToggleBtn = document.getElementById('mobile-menu-toggle');
    const mobileDrawer = document.getElementById('mobile-drawer');
    const mobileDrawerCloseBtn = document.getElementById('mobile-drawer-close');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link, .overlay-nav-link');

    if (mobileMenuToggleBtn && mobileDrawer) {
        mobileMenuToggleBtn.addEventListener('click', () => {
            mobileDrawer.classList.add('active');
            document.body.style.overflow = 'hidden';
        });

        const closeMobileDrawer = () => {
            mobileDrawer.classList.remove('active');
            setTimeout(() => {
                document.body.style.overflow = '';
            }, 500);
        };

        if (mobileDrawerCloseBtn) {
            mobileDrawerCloseBtn.addEventListener('click', closeMobileDrawer);
        }

        mobileNavLinks.forEach(link => {
            link.addEventListener('click', closeMobileDrawer);
        });
    }

    // --- 4. CLOSE ON ESCAPE KEY ---
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (searchOverlay && searchOverlay.classList.contains('active')) {
                searchOverlay.classList.remove('active');
            }
            if (mobileDrawer && mobileDrawer.classList.contains('active')) {
                mobileDrawer.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
    });

    // --- 5. SCROLL TO TOP BUTTON ---
    const scrollTopBtn = document.getElementById('scroll-to-top');
    if (scrollTopBtn) {
        const toggleScrollTopVisibility = () => {
            if (window.scrollY > 300) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        };

        window.addEventListener('scroll', toggleScrollTopVisibility, { passive: true });
        toggleScrollTopVisibility();

        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // --- 7. BOLD MINIMALIST FAQ ACCORDION ---
    const boldFaqItems = document.querySelectorAll('.bold-faq-item');

    boldFaqItems.forEach(item => {
        const collapse = item.querySelector('.bold-faq-collapse');
        if (item.classList.contains('active') && collapse) {
            collapse.style.maxHeight = collapse.scrollHeight + 'px';
        }

        const btn = item.querySelector('.bold-faq-btn');
        if (btn) {
            btn.addEventListener('click', () => {
                const isActive = item.classList.contains('active');

                // Close all items
                boldFaqItems.forEach(other => {
                    other.classList.remove('active');
                    const otherBtn = other.querySelector('.bold-faq-btn');
                    if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
                    const otherCollapse = other.querySelector('.bold-faq-collapse');
                    if (otherCollapse) otherCollapse.style.maxHeight = null;
                });

                // Open clicked item if not active
                if (!isActive) {
                    item.classList.add('active');
                    btn.setAttribute('aria-expanded', 'true');
                    if (collapse) {
                        collapse.style.maxHeight = collapse.scrollHeight + 'px';
                    }
                }
            });
        }
    });

    // --- 9. CONTACT FORM HANDLER (DELIVERS TO MUHAMMEDKLKM@GMAIL.COM) ---
    const contactForm = id('contact-form');
    const feedbackToast = id('form-feedback-message');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = contactForm.querySelector('.btn-submit-inquiry');
            const submitBtnSpan = submitBtn ? submitBtn.querySelector('span') : null;
            const originalText = submitBtnSpan ? submitBtnSpan.textContent : 'Send Message';

            if (submitBtn) {
                submitBtn.style.opacity = '0.7';
                submitBtn.disabled = true;
                if (submitBtnSpan) submitBtnSpan.textContent = 'Sending Message...';
            }

            const formData = new FormData(contactForm);

            fetch('https://formsubmit.co/ajax/muhammedklkm@gmail.com', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json'
                },
                body: formData
            })
            .then(res => res.json())
            .then(data => {
                if (feedbackToast) {
                    feedbackToast.textContent = "Message sent successfully! Form details delivered to muhammedklkm@gmail.com.";
                    feedbackToast.style.display = 'block';
                    feedbackToast.style.color = '#4ade80';
                }
                contactForm.reset();
            })
            .catch(err => {
                if (feedbackToast) {
                    feedbackToast.textContent = "Sending message via mail server...";
                    feedbackToast.style.display = 'block';
                }
                contactForm.submit();
            })
            .finally(() => {
                if (submitBtn) {
                    submitBtn.style.opacity = '1';
                    submitBtn.disabled = false;
                    if (submitBtnSpan) submitBtnSpan.textContent = originalText;
                }
            });
        });
    }

    // --- 10. USER-FRIENDLY QUICK CHAT WIDGET CONTROLLER ---
    const chatbotTrigger = id('chatbot-trigger');
    const chatbotWindow = id('chatbot-window');
    const chatbotClose = id('chatbot-close');

    if (chatbotTrigger && chatbotWindow) {
        const toggleChat = (show) => {
            if (show) {
                chatbotWindow.classList.add('active');
            } else {
                chatbotWindow.classList.remove('active');
            }
        };

        chatbotTrigger.addEventListener('click', () => {
            const isActive = chatbotWindow.classList.contains('active');
            toggleChat(!isActive);
        });

        if (chatbotClose) {
            chatbotClose.addEventListener('click', () => toggleChat(false));
        }

        // Close when clicking outside widget
        document.addEventListener('click', (e) => {
            const widgetContainer = id('chatbot-widget');
            if (widgetContainer && !widgetContainer.contains(e.target) && chatbotWindow.classList.contains('active')) {
                toggleChat(false);
            }
        });
    }

    // --- 11. PORTFOLIO PAGE INTERACTIVE FILTER SYSTEM ---
    const filterPills = document.querySelectorAll('.filter-pill');
    const workItems = document.querySelectorAll('.work-grid-item');

    if (filterPills.length > 0 && workItems.length > 0) {
        filterPills.forEach(pill => {
            pill.addEventListener('click', () => {
                // Update active state on filter pills
                filterPills.forEach(p => p.classList.remove('active'));
                pill.classList.add('active');

                const filterValue = pill.getAttribute('data-filter');

                workItems.forEach(item => {
                    const categories = item.getAttribute('data-category') || '';
                    if (filterValue === 'all' || categories.includes(filterValue)) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0) scale(1)';
                        }, 30);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'translateY(16px) scale(0.96)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }

    // --- 12. ABOUT SECTION HEADLINE WORD-BY-WORD SCROLL REVEAL ---
    const aboutHeadline = document.querySelector('.about-main-headline');
    if (aboutHeadline) {
        const textContent = aboutHeadline.innerText || aboutHeadline.textContent;
        const cleanText = textContent.replace(/\.\s*$/, '').trim();
        const words = cleanText.split(/\s+/);

        aboutHeadline.innerHTML = words.map(w => `<span class="reveal-word">${w}</span>`).join(' ');

        const revealWords = aboutHeadline.querySelectorAll('.reveal-word');

        if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined' && revealWords.length > 0) {
            gsap.registerPlugin(ScrollTrigger);

            const getColors = () => {
                const isLight = document.documentElement.getAttribute('data-theme') === 'light';
                return {
                    activeColor: isLight ? '#0f1015' : '#ffffff',
                    dimColor: isLight ? 'rgba(15, 16, 21, 0.2)' : 'rgba(255, 255, 255, 0.22)'
                };
            };

            const colors = getColors();

            gsap.fromTo(revealWords,
                {
                    color: colors.dimColor,
                    opacity: 0.25
                },
                {
                    color: colors.activeColor,
                    opacity: 1,
                    stagger: 0.15,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: aboutHeadline,
                        start: 'top 85%',
                        end: 'bottom 45%',
                        scrub: 0.8
                    }
                }
            );
        }
    }
});

/* ==========================================================================
   WORKFLOW LOOP CARD — PHASE SWITCHER
   Cycles: Figma Design (4s) → Code Editor (4s) → Deploy/Live (4s) → repeat
   ========================================================================== */
(function initWorkflowLoop() {
    const scenes = document.querySelectorAll('.wf-scene');
    const steps  = document.querySelectorAll('.wf-phase-step');

    if (!scenes.length || !steps.length) return;

    const PHASE_DURATION = 4200; // ms per phase
    let currentPhase = 0;
    let timer = null;

    function goToPhase(index) {
        // Hide all scenes & deactivate all steps
        scenes.forEach(s => {
            s.classList.remove('active');
        });
        steps.forEach(s => s.classList.remove('active'));

        // Activate target
        scenes[index].classList.add('active');
        steps[index].classList.add('active');
        currentPhase = index;
    }

    function nextPhase() {
        goToPhase((currentPhase + 1) % scenes.length);
    }

    // Allow user to click any step tab interactively
    steps.forEach((step, idx) => {
        step.style.cursor = 'pointer';
        step.addEventListener('click', () => {
            goToPhase(idx);
            if (timer) clearInterval(timer);
            timer = setInterval(nextPhase, PHASE_DURATION);
        });
    });

    // Start loop
    goToPhase(0);
    timer = setInterval(nextPhase, PHASE_DURATION);
})();

/* ==========================================================================
   SLEEK PRELOADER COUNTER & CURTAIN SLIDE ANIMATION
   ========================================================================== */
(function initPreloader() {
    const preloader = document.getElementById('preloader');
    const preloaderBar = document.getElementById('preloader-bar');
    const preloaderNumber = document.getElementById('preloader-number');

    if (!preloader) return;

    document.body.classList.add('preloader-active');
    let currentProgress = 0;

    const updateProgress = (target, duration, onComplete) => {
        const startTime = performance.now();
        const startProgress = currentProgress;

        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progressRatio = Math.min(elapsed / duration, 1);
            const easeOutRatio = 1 - Math.pow(1 - progressRatio, 3);
            currentProgress = Math.round(startProgress + (target - startProgress) * easeOutRatio);

            if (preloaderBar) preloaderBar.style.width = currentProgress + '%';
            if (preloaderNumber) preloaderNumber.textContent = currentProgress;

            if (progressRatio < 1) {
                requestAnimationFrame(animate);
            } else if (onComplete) {
                onComplete();
            }
        };

        requestAnimationFrame(animate);
    };

    // Smooth rapid initial bar build to 80%
    updateProgress(85, 450, () => {
        const finishPreloader = () => {
            updateProgress(100, 250, () => {
                setTimeout(() => {
                    preloader.classList.add('loaded');
                    document.body.classList.remove('preloader-active');
                }, 180);
            });
        };

        if (document.readyState === 'complete') {
            finishPreloader();
        } else {
            window.addEventListener('load', finishPreloader);
            setTimeout(finishPreloader, 1200);
        }
    });
})();

/* ==========================================================================
   CUSTOM INTERACTIVE SELECT DROPDOWN CONTROLLER
   ========================================================================== */
(function initCustomSelects() {
    const customWrappers = document.querySelectorAll('.custom-select-wrapper');

    if (!customWrappers.length) return;

    customWrappers.forEach(wrapper => {
        const trigger = wrapper.querySelector('.custom-select-trigger');
        const label = wrapper.querySelector('.custom-select-label');
        const hiddenInput = wrapper.querySelector('input[type="hidden"]');
        const options = wrapper.querySelectorAll('.custom-option');

        if (!trigger || !options.length) return;

        // Toggle open state
        trigger.addEventListener('click', (e) => {
            e.stopPropagation();
            // Close all other dropdowns
            customWrappers.forEach(w => {
                if (w !== wrapper) w.classList.remove('open');
            });
            wrapper.classList.toggle('open');
        });

        // Option selection
        options.forEach(opt => {
            opt.addEventListener('click', (e) => {
                e.stopPropagation();
                options.forEach(o => o.classList.remove('selected'));
                opt.classList.add('selected');

                const val = opt.getAttribute('data-value');
                const text = opt.textContent.trim();

                if (hiddenInput) hiddenInput.value = val;
                if (label) label.textContent = text;

                wrapper.classList.remove('open');
            });
        });
    });

    // Close on click outside
    document.addEventListener('click', () => {
        customWrappers.forEach(w => w.classList.remove('open'));
    });
})();

/* ==========================================================================
   REDESIGNED MAC BROWSER CASE STUDY LIGHTBOX PREVIEW CONTROLLER
   ========================================================================== */
(function initCaseStudyLightbox() {
    const lightbox = document.getElementById('project-lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxClose = document.getElementById('lightbox-close');
    const macDotClose = document.getElementById('mac-dot-close');
    const lightboxUrlDisplay = document.getElementById('lightbox-url-display');
    const macBrowserBody = lightbox ? lightbox.querySelector('.mac-browser-body') : null;
    const triggers = document.querySelectorAll('.case-study-trigger');

    if (!lightbox || !triggers.length) return;

    let savedScrollY = 0;

    const openLightbox = (imgSrc, titleText) => {
        savedScrollY = window.scrollY;
        
        if (lightboxImg) lightboxImg.src = imgSrc;
        if (lightboxTitle) lightboxTitle.textContent = titleText;
        if (lightboxUrlDisplay) {
            const cleanTitle = titleText.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
            lightboxUrlDisplay.textContent = `muhammed.design/works/${cleanTitle}`;
        }

        lightbox.classList.add('active');
        
        // Strict Body Scroll Lock via position fixed
        document.body.style.position = 'fixed';
        document.body.style.top = `-${savedScrollY}px`;
        document.body.style.left = '0';
        document.body.style.right = '0';
        document.body.style.width = '100%';
        document.body.style.overflow = 'hidden';
        document.documentElement.style.overflow = 'hidden';

        if (macBrowserBody) {
            macBrowserBody.scrollTop = 0;
        }
    };

    const closeLightbox = () => {
        lightbox.classList.remove('active');
        
        // Restore Body Scroll Position seamlessly
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.left = '';
        document.body.style.right = '';
        document.body.style.width = '';
        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';

        window.scrollTo(0, savedScrollY);
    };

    triggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            const imgSrc = trigger.getAttribute('href');
            const titleText = trigger.getAttribute('data-title') || 'Project Case Study';
            openLightbox(imgSrc, titleText);
        });
    });

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    if (macDotClose) macDotClose.addEventListener('click', closeLightbox);

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });

    // Smooth mouse wheel scrolling forwarded directly to macBrowserBody
    lightbox.addEventListener('wheel', (e) => {
        if (macBrowserBody) {
            macBrowserBody.scrollTop += e.deltaY;
        }
    }, { passive: true });
})();

// --- HERO 3D PARALLAX TILT CONTROLLER ---
(() => {
    const tiltStage = document.getElementById('hero-tilt-stage');
    if (!tiltStage) return;

    const mainCard = tiltStage.querySelector('.main-glass-card');
    const backCard = tiltStage.querySelector('.back-depth-card');
    const floatTop = tiltStage.querySelector('.float-top-badge');
    const floatBottom = tiltStage.querySelector('.float-bottom-badge');

    document.addEventListener('mousemove', (e) => {
        if (window.innerWidth <= 991) return;
        const rect = tiltStage.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const rotateX = ((e.clientY - centerY) / rect.height) * -12;
            const rotateY = ((e.clientX - centerX) / rect.width) * 12;

            if (mainCard) mainCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
            if (backCard) backCard.style.transform = `perspective(1000px) rotateX(${rotateX * 0.7}deg) rotateY(${rotateY * 0.7}deg) translateZ(-20px) rotate(-3deg)`;
            if (floatTop) floatTop.style.transform = `perspective(1000px) rotateX(${rotateX * 1.3}deg) rotateY(${rotateY * 1.3}deg) translateZ(30px)`;
            if (floatBottom) floatBottom.style.transform = `perspective(1000px) rotateX(${rotateX * 1.2}deg) rotateY(${rotateY * 1.2}deg) translateZ(25px)`;
        }
    });

    tiltStage.addEventListener('mouseleave', () => {
        if (mainCard) mainCard.style.transform = '';
        if (backCard) backCard.style.transform = '';
        if (floatTop) floatTop.style.transform = '';
        if (floatBottom) floatBottom.style.transform = '';
    });
})();



