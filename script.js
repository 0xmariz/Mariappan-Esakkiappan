
/* =========================================
   THEME TOGGLE
========================================= */

const root = document.documentElement;
const themeButton = document.querySelector('.theme-toggle');
const themeIcon = document.querySelector('.theme-icon');
const themeColorMeta = document.querySelector('meta[name="theme-color"]');

// Restore the previously selected theme
const savedTheme = localStorage.getItem('portfolio-theme');

if (savedTheme === 'light' || savedTheme === 'dark') {
    root.dataset.theme = savedTheme;
}

// Update theme icon, accessibility label, and browser theme color
function updateThemeControl() {
    const isLightTheme = root.dataset.theme === 'light';

    if (themeIcon) {
        themeIcon.textContent = isLightTheme ? '☾' : '☼';
    }

    if (themeButton) {
        themeButton.setAttribute(
            'aria-label',
            isLightTheme ? 'Switch to dark theme' : 'Switch to light theme'
        );
    }

    if (themeColorMeta) {
        themeColorMeta.content = isLightTheme ? '#f6f7f5' : '#0b1020';
    }
}

// Initialize theme controls
updateThemeControl();

// Toggle between light and dark themes
if (themeButton) {
    themeButton.addEventListener('click', () => {
        const newTheme =
            root.dataset.theme === 'light' ? 'dark' : 'light';

        root.dataset.theme = newTheme;

        localStorage.setItem('portfolio-theme', newTheme);

        updateThemeControl();
    });
}


/* =========================================
   MOBILE NAVIGATION
========================================= */

const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');

// Toggle mobile navigation
if (menuButton && nav) {
    menuButton.addEventListener('click', () => {
        const isOpen = nav.classList.toggle('open');

        menuButton.setAttribute('aria-expanded', String(isOpen));

        menuButton.setAttribute(
            'aria-label',
            isOpen ? 'Close navigation' : 'Open navigation'
        );
    });

    // Close navigation after clicking a link
    nav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('open');

            menuButton.setAttribute('aria-expanded', 'false');
            menuButton.setAttribute('aria-label', 'Open navigation');
        });
    });

    // Close navigation when pressing Escape
    document.addEventListener('keydown', event => {
        if (event.key === 'Escape' && nav.classList.contains('open')) {
            nav.classList.remove('open');

            menuButton.setAttribute('aria-expanded', 'false');
            menuButton.setAttribute('aria-label', 'Open navigation');

            menuButton.focus();
        }
    });
}


/* =========================================
   FOOTER COPYRIGHT YEAR
========================================= */

const yearElement = document.getElementById('year');

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}


/* =========================================
   SCROLL REVEAL ANIMATIONS
========================================= */

// Elements that will animate when they enter the viewport
const revealTargets = document.querySelectorAll(
    '.section-heading, ' +
    '.about-grid, ' +
    '.skill-card, ' +
    '.project-card, ' +
    '.timeline-item, ' +
    '.achievement-card, ' +
    '.education-strip, ' +
    '.contact-section'
);

// Add the reveal class to selected elements
revealTargets.forEach(element => {
    element.classList.add('reveal');
});

// Use IntersectionObserver for scroll-based animations
if ('IntersectionObserver' in window) {

    const observer = new IntersectionObserver(
        (entries, observerInstance) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');

                    // Stop observing once the animation is triggered
                    observerInstance.unobserve(entry.target);
                }

            });

        },
        {
            threshold: 0.12
        }
    );

    revealTargets.forEach(element => {
        observer.observe(element);
    });

} else {

    // Fallback for browsers without IntersectionObserver
    revealTargets.forEach(element => {
        element.classList.add('visible');
    });

}
