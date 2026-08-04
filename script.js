document.addEventListener('DOMContentLoaded', () => {
    initNavbarScroll();
});

/* ===== NAVBAR SCROLL STATE ===== */
function initNavbarScroll() {
    const nav = document.getElementById('nav');
    if (!nav) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });
}
