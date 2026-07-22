/* ==========================================================================
   MUHAMMED PORTFOLIO JAVASCRIPT
   Theme Switcher, Search Modal, Mobile Drawer Menu, and Scroll-to-Top
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. LIGHT / DARK THEME TOGGLE WITH LOCALSTORAGE ---
    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;

    // Load saved theme or default to 'dark'
    const savedTheme = localStorage.getItem('portfolio_theme') || 'dark';
    htmlElement.setAttribute('data-theme', savedTheme);

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
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    if (mobileMenuToggleBtn && mobileDrawer) {
        mobileMenuToggleBtn.addEventListener('click', () => {
            mobileDrawer.classList.add('active');
            document.body.style.overflow = 'hidden';
        });

        const closeMobileDrawer = () => {
            mobileDrawer.classList.remove('active');
            document.body.style.overflow = '';
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
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // --- 6. EXACT BFOLIO GSAP SCROLLTRIGGER TP-GALLERY-AREA ANIMATION ---
    const galleryArea = document.querySelector('.tp-gallery-area');
    const trackLeft = document.getElementById('track-left');
    const trackCenter = document.getElementById('track-center');
    const trackRight = document.getElementById('track-right');

    if (galleryArea && trackLeft && trackCenter && trackRight) {
        if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
            gsap.registerPlugin(ScrollTrigger);

            const isMobile = window.innerWidth <= 767;
            const moveDistance = isMobile ? 320 : 540;

            const galleryTl = gsap.timeline({
                scrollTrigger: {
                    trigger: galleryArea,
                    start: isMobile ? "top 15%" : "top top",
                    end: isMobile ? "+=1000" : "+=1800",
                    pin: !isMobile,
                    scrub: 1.2,
                    anticipatePin: 1,
                    invalidateOnRefresh: true
                }
            });

            // Left & Right columns: start at y:0 and move UP
            galleryTl.to([trackLeft, trackRight], {
                y: -moveDistance,
                ease: "none"
            }, 0);

            // Center column: starts shifted UP and moves DOWN to y: 0
            galleryTl.fromTo(trackCenter, {
                y: -moveDistance
            }, {
                y: 0,
                ease: "none"
            }, 0);
        }
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

    // --- 8. WORKS PORTFOLIO CATEGORY FILTERING ---
    const filterPills = document.querySelectorAll('.filter-pill');
    const workItems = document.querySelectorAll('.work-grid-item');

    filterPills.forEach(pill => {
        pill.addEventListener('click', () => {
            filterPills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');

            const filterValue = pill.getAttribute('data-filter');

            workItems.forEach(item => {
                const category = item.getAttribute('data-category') || '';
                if (filterValue === 'all' || category.includes(filterValue)) {
                    item.style.display = 'block';
                    item.style.opacity = '1';
                } else {
                    item.style.display = 'none';
                    item.style.opacity = '0';
                }
            });
        });
    });

    // --- 9. CONTACT FORM HANDLER ---
    const contactForm = id('contact-form');
    const feedbackToast = id('form-feedback-message');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = contactForm.querySelector('.btn-submit-inquiry');
            if (submitBtn) {
                submitBtn.style.opacity = '0.7';
                submitBtn.disabled = true;
            }

            setTimeout(() => {
                if (feedbackToast) {
                    feedbackToast.style.display = 'block';
                }
                contactForm.reset();
                if (submitBtn) {
                    submitBtn.style.opacity = '1';
                    submitBtn.disabled = false;
                }
            }, 800);
        });
    }

    // --- 10. CUSTOM AI CHATBOT CONTROLLER & KNOWLEDGE BASE ---
    const chatbotTrigger = id('chatbot-trigger');
    const chatbotWindow = id('chatbot-window');
    const chatbotClose = id('chatbot-close');
    const chatbotBody = id('chatbot-messages');
    const chatbotForm = id('chatbot-form');
    const chatbotInput = id('chatbot-input');
    const chatbotTooltip = id('chatbot-tooltip');

    if (chatbotTrigger && chatbotWindow) {
        // Toggle chat window visibility
        const toggleChat = (show) => {
            if (show) {
                chatbotWindow.classList.add('active');
                if (chatbotTooltip) chatbotTooltip.style.display = 'none';
                if (chatbotInput) chatbotInput.focus();
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

        // Smart Knowledge Base Responses
        const getAIResponse = (userText) => {
            const q = userText.toLowerCase().trim();

            if (q.includes('service') || q.includes('offer') || q.includes('work') || q.includes('do')) {
                return "I offer high-end **UI/UX Design**, **Front-End Development** (HTML/CSS/JS/React/Next.js), **Mobile App UI**, and **Brand Identity** systems. All tailored for maximum speed and conversion! 🚀";
            }
            if (q.includes('contact') || q.includes('email') || q.includes('phone') || q.includes('number') || q.includes('whatsapp') || q.includes('reach')) {
                return "You can reach Muhammed directly via:<br>📧 Email: <a href='mailto:muhammedklkm@gmail.com' style='color:#ff6b35;'>muhammedklkm@gmail.com</a><br>📱 WhatsApp: <a href='https://wa.me/919656216086' target='_blank' style='color:#ff6b35;'>+91 9656216086</a><br>Or use our <a href='contact.html' style='color:#ff6b35;'>Contact Form</a>!";
            }
            if (q.includes('price') || q.includes('cost') || q.includes('rate') || q.includes('quote') || q.includes('budget')) {
                return "Project pricing varies based on scope & complexity. We offer flexible packages for startups, agencies, and enterprise brands. <a href='contact.html' style='color:#ff6b35;'>Get an instant quote here</a>!";
            }
            if (q.includes('tech') || q.includes('stack') || q.includes('tool') || q.includes('code')) {
                return "Muhammed's core Tech Stack includes:<br>• **Design**: Figma, Adobe Creative Cloud<br>• **Front-End**: HTML5, SCSS/CSS3, JavaScript ES6+, React, Next.js<br>• **Animation**: GSAP ScrollTrigger, SwiperJS";
            }
            if (q.includes('experience') || q.includes('year') || q.includes('about') || q.includes('who')) {
                return "Muhammed is a passionate Senior UI/UX Designer & Front-End Developer with **5+ years of craft experience** and over **14+ launched projects** worldwide! ⚡";
            }
            if (q.includes('hi') || q.includes('hello') || q.includes('hey') || q.includes('namaste')) {
                return "Hello there! 👋 How can I help you elevate your web product or brand today?";
            }

            return "Thanks for your query! For detailed project inquiries or custom quotes, feel free to drop an email at **muhammedklkm@gmail.com** or send a WhatsApp message to **+91 9656216086**! 💬";
        };

        const appendMessage = (sender, text) => {
            if (!chatbotBody) return;
            const msgRow = document.createElement('div');
            msgRow.className = `chat-msg-row ${sender}`;
            msgRow.innerHTML = `<div class="msg-bubble">${text}</div>`;
            chatbotBody.appendChild(msgRow);
            chatbotBody.scrollTop = chatbotBody.scrollHeight;
        };

        // Form Submit Handler
        if (chatbotForm && chatbotInput) {
            chatbotForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const text = chatbotInput.value.trim();
                if (!text) return;

                appendMessage('user', text);
                chatbotInput.value = '';

                // Typing indicator delay simulation
                setTimeout(() => {
                    const reply = getAIResponse(text);
                    appendMessage('bot', reply);
                }, 400);
            });
        }

        // Delegate Suggestion Chip Clicks
        document.addEventListener('click', (e) => {
            if (e.target && e.target.classList.contains('chat-suggest-chip')) {
                const questionText = e.target.getAttribute('data-query') || e.target.textContent;
                appendMessage('user', questionText);
                setTimeout(() => {
                    const reply = getAIResponse(questionText);
                    appendMessage('bot', reply);
                }, 400);
            }
        });
    }
});

