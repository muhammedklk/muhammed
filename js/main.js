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

    // --- 10. WHATSAPP INTEGRATED CHATBOT LOGIC ---
    const waTriggerBtn = id('wa-trigger-btn');
    const waChatBox = id('wa-chat-box');
    const waCloseBtn = id('wa-close-btn');
    const waChatForm = id('wa-chat-form');
    const waInputField = id('wa-input-field');
    const waChipBtns = document.querySelectorAll('.wa-chip-btn');
    const whatsappPhone = '919656216086';

    if (waTriggerBtn && waChatBox) {
        waTriggerBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            waChatBox.classList.toggle('active');
        });

        if (waCloseBtn) {
            waCloseBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                waChatBox.classList.remove('active');
            });
        }

        // Close on clicking outside
        document.addEventListener('click', (e) => {
            if (!waChatBox.contains(e.target) && !waTriggerBtn.contains(e.target)) {
                waChatBox.classList.remove('active');
            }
        });

        // Quick action chips click handler
        waChipBtns.forEach(chip => {
            chip.addEventListener('click', () => {
                const textMsg = chip.getAttribute('data-msg');
                if (textMsg) {
                    const encodedMsg = encodeURIComponent(textMsg);
                    window.open(`https://wa.me/${whatsappPhone}?text=${encodedMsg}`, '_blank');
                }
            });
        });

        // Form submit handler
        if (waChatForm && waInputField) {
            waChatForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const userMsg = waInputField.value.trim();
                if (userMsg) {
                    const encodedMsg = encodeURIComponent(userMsg);
                    window.open(`https://wa.me/${whatsappPhone}?text=${encodedMsg}`, '_blank');
                    waInputField.value = '';
                }
            });
        }
    }
});

