/**
 * MD Mushtaq Ahamad — Portfolio Interactive Logic
 * Pure Vanilla JavaScript (ES6+)
 */

document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------------------------
    // 1. Navigation & Header Scroll Effects
    // ----------------------------------------------------------------------
    const navbar = document.getElementById('navbar');
    const scrollProgress = document.getElementById('scroll-progress');
    const backToTopBtn = document.getElementById('back-to-top');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    function handleScroll() {
        const scrollY = window.scrollY;
        const pageHeight = document.documentElement.scrollHeight - window.innerHeight;
        
        // Update Scroll Progress Bar
        if (pageHeight > 0 && scrollProgress) {
            const progress = (scrollY / pageHeight) * 100;
            scrollProgress.style.width = `${progress}%`;
        }

        // Toggle Navbar Translucent Scrolled State
        if (navbar) {
            if (scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }

        // Toggle Back-to-Top Button Visibility
        if (backToTopBtn) {
            if (scrollY > 400) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        }

        // Update Active Nav Link Based on Section Intersection
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.offsetHeight;
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    // ----------------------------------------------------------------------
    // 2. Mobile Menu Toggle
    // ----------------------------------------------------------------------
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const navMenu = document.getElementById('nav-menu');

    if (hamburgerBtn && navMenu) {
        function toggleMobileMenu() {
            const isOpen = navMenu.classList.toggle('active');
            hamburgerBtn.classList.toggle('active');
            hamburgerBtn.setAttribute('aria-expanded', isOpen);
            document.body.style.overflow = isOpen ? 'hidden' : '';
        }

        function closeMobileMenu() {
            navMenu.classList.remove('active');
            hamburgerBtn.classList.remove('active');
            hamburgerBtn.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        }

        hamburgerBtn.addEventListener('click', toggleMobileMenu);

        // Close menu on nav link click
        navLinks.forEach(link => {
            link.addEventListener('click', closeMobileMenu);
        });

        // Close menu on Escape key press
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                closeMobileMenu();
            }
        });
    }

    // ----------------------------------------------------------------------
    // 3. Back to Top Button Click
    // ----------------------------------------------------------------------
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ----------------------------------------------------------------------
    // 4. Hero Code Terminal Tab Switcher
    // ----------------------------------------------------------------------
    const termTabs = document.querySelectorAll('.term-tab');
    const tabPanes = document.querySelectorAll('.terminal-body .tab-pane');

    termTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetTab = tab.getAttribute('data-tab');

            // Update active state on tab buttons
            termTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // Toggle corresponding pane
            tabPanes.forEach(pane => {
                pane.classList.remove('active');
                if (pane.id === `tab-${targetTab}`) {
                    pane.classList.add('active');
                }
            });
        });
    });

    // ----------------------------------------------------------------------
    // 5. Featured Project Mock Dashboard Tab Switcher
    // ----------------------------------------------------------------------
    const mockTabs = document.querySelectorAll('.mock-tab');
    const mockPanes = document.querySelectorAll('.mock-pane');

    mockTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetPane = tab.getAttribute('data-preview-tab');

            mockTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            mockPanes.forEach(pane => {
                pane.classList.remove('active');
                if (pane.id === `mock-pane-${targetPane}`) {
                    pane.classList.add('active');
                }
            });
        });
    });

    // ----------------------------------------------------------------------
    // 6. Copy Email to Clipboard & Toast Notification
    // ----------------------------------------------------------------------
    const copyEmailBtn = document.getElementById('copy-email-btn');
    const toast = document.getElementById('toast-notification');

    function showToast(message) {
        if (!toast) return;
        toast.textContent = message;
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3200);
    }

    if (copyEmailBtn) {
        copyEmailBtn.addEventListener('click', () => {
            const email = copyEmailBtn.getAttribute('data-email') || 'mohammadmushtaq1295@gmail.com';
            
            if (navigator.clipboard && window.isSecureContext) {
                navigator.clipboard.writeText(email)
                    .then(() => {
                        showToast(`✓ Copied email: ${email}`);
                    })
                    .catch(() => {
                        fallbackCopy(email);
                    });
            } else {
                fallbackCopy(email);
            }
        });
    }

    function fallbackCopy(text) {
        const tempInput = document.createElement('input');
        tempInput.value = text;
        document.body.appendChild(tempInput);
        tempInput.select();
        try {
            document.execCommand('copy');
            showToast(`✓ Copied email: ${text}`);
        } catch (err) {
            showToast(`Email: ${text}`);
        }
        document.body.removeChild(tempInput);
    }

    // ----------------------------------------------------------------------
    // 7. Intersection Observer for Scroll Reveals
    // ----------------------------------------------------------------------
    const revealElements = document.querySelectorAll('.reveal');

    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target); // Reveal once
                }
            });
        }, {
            root: null,
            threshold: 0.1,
            rootMargin: '0px 0px -40px 0px'
        });

        revealElements.forEach(el => revealObserver.observe(el));
    } else {
        // Fallback for older browsers
        revealElements.forEach(el => el.classList.add('active'));
    }
});
