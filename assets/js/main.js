/* ═══════════════════════════════════════════════
   Fotografie Portfolio – main.js
   ═══════════════════════════════════════════════ */

(function () {
  'use strict';

  // ── Sidebar Mobile Toggle ─────────────────────
  const sidebar  = document.getElementById('sidebar');
  const overlay  = document.getElementById('sidebar-overlay');
  const burger   = document.getElementById('burger-btn');
  const closeBtn = document.getElementById('sidebar-close');

  function openSidebar() {
    sidebar.classList.add('open');
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeSidebar() {
    sidebar.classList.remove('open');
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (burger)   burger.addEventListener('click', openSidebar);
  if (closeBtn) closeBtn.addEventListener('click', closeSidebar);
  if (overlay)  overlay.addEventListener('click', closeSidebar);

  // ESC schließt Sidebar
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeSidebar();
  });

  // ── Lightbox ──────────────────────────────────
  const lightbox       = document.getElementById('lightbox');
  const lightboxImg    = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lbClose        = document.getElementById('lightbox-close');
  const lbPrev         = document.getElementById('lightbox-prev');
  const lbNext         = document.getElementById('lightbox-next');

  if (!lightbox) return; // Nur auf Galerie-Seiten

  const items = Array.from(document.querySelectorAll('.galerie-item'));
  let currentIndex = 0;

  function openLightbox(index) {
    currentIndex = index;
    const item    = items[index];
    const img     = item.querySelector('img');
    const caption = item.querySelector('.galerie-caption');

    lightboxImg.src           = img ? img.src : '';
    lightboxImg.alt           = img ? img.alt : '';
    lightboxCaption.textContent = caption ? caption.textContent : '';

    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }

  function showPrev() {
    currentIndex = (currentIndex - 1 + items.length) % items.length;
    openLightbox(currentIndex);
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % items.length;
    openLightbox(currentIndex);
  }

  items.forEach((item, i) => {
    item.addEventListener('click', () => openLightbox(i));
  });

  if (lbClose) lbClose.addEventListener('click', closeLightbox);
  if (lbPrev)  lbPrev.addEventListener('click', showPrev);
  if (lbNext)  lbNext.addEventListener('click', showNext);

  // Klick außerhalb des Bildes schließt
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  // Tastatur-Navigation
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape')     closeLightbox();
    if (e.key === 'ArrowLeft')  showPrev();
    if (e.key === 'ArrowRight') showNext();
  });

  // ── Galerie-Einblendanimation ─────────────────
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.style.opacity = '1';
          e.target.style.transform = 'translateY(0)';
          io.unobserve(e.target);
        }
      }),
      { threshold: 0.1 }
    );

    items.forEach((item, i) => {
      item.style.opacity    = '0';
      item.style.transform  = 'translateY(16px)';
      item.style.transition = `opacity 0.4s ease ${i * 0.04}s, transform 0.4s ease ${i * 0.04}s`;
      io.observe(item);
    });
  }

})();
