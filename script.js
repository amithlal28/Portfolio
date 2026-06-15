document.addEventListener('DOMContentLoaded', () => {
    initCursorFollower();
    initNavbarScroll();
    initDragScroll();
});

/* ===== CUSTOM CURSOR FOLLOWER ===== */
function initCursorFollower() {
    const dot = document.getElementById('cursorDot');
    const outline = document.getElementById('cursorOutline');
    
    if (!dot || !outline) return;

    let mouseX = 0;
    let mouseY = 0;
    
    let dotX = 0;
    let dotY = 0;
    let outlineX = 0;
    let outlineY = 0;
    
    // Lerp coefficient for trailing circle lag (higher = faster, lower = smoother lag)
    const lerpFactor = 0.15;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Custom requestAnimationFrame loop for hardware accelerated rendering
    function updateCursor() {
        // Immediate positioning for dot
        dotX = mouseX;
        dotY = mouseY;
        
        // Lerp positioning for trailing outline
        outlineX += (mouseX - outlineX) * lerpFactor;
        outlineY += (mouseY - outlineY) * lerpFactor;
        
        dot.style.transform = `translate3d(${dotX}px, ${dotY}px, 0) translate(-50%, -50%)`;
        outline.style.transform = `translate3d(${outlineX}px, ${outlineY}px, 0) translate(-50%, -50%)`;
        
        requestAnimationFrame(updateCursor);
    }
    
    requestAnimationFrame(updateCursor);
    
    // Hover interactions for clickable/interactive items
    const interactives = document.querySelectorAll('a, button, .btn, .nav-logo, .work-card, .skill-tags span');
    
    interactives.forEach(item => {
        item.addEventListener('mouseenter', () => {
            document.body.classList.add('hovered-interactive');
        });
        item.addEventListener('mouseleave', () => {
            document.body.classList.remove('hovered-interactive');
        });
    });
}

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

/* ===== CLICK AND DRAG HORIZONTAL SCROLL ===== */
function initDragScroll() {
    const slider = document.getElementById('horizontalScroll');
    if (!slider) return;
    
    let isDown = false;
    let startX;
    let scrollLeft;
    
    slider.addEventListener('mousedown', (e) => {
        isDown = true;
        slider.style.cursor = 'grabbing';
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    });
    
    slider.addEventListener('mouseleave', () => {
        isDown = false;
        slider.style.cursor = 'grab';
    });
    
    slider.addEventListener('mouseup', () => {
        isDown = false;
        slider.style.cursor = 'grab';
    });
    
    slider.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        // Scroll speed multiplier
        const walk = (x - startX) * 2;
        slider.scrollLeft = scrollLeft - walk;
    });
    
    // Set initial cursor style
    slider.style.cursor = 'grab';
}