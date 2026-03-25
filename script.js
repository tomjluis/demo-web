(function () {
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileLang = document.querySelector('.mobile-lang');
  const menuBtn = mobileMenu?.querySelector('.mobile-tool-btn');
  const langBtn = mobileLang?.querySelector('.mobile-tool-btn');
  const mobileBook = document.querySelector('.mobile-book');
  const heroBookBtn = document.querySelector('.hero-actions .btn-primary');

  function closeDropdown(dropdown, button) {
    if (!dropdown || !button) return;
    dropdown.classList.remove('open');
    button.setAttribute('aria-expanded', 'false');
  }

  function toggleDropdown(dropdown, button, otherDropdown, otherButton) {
    if (!dropdown || !button) return;
    const isOpen = dropdown.classList.contains('open');

    closeDropdown(otherDropdown, otherButton);

    dropdown.classList.toggle('open', !isOpen);
    button.setAttribute('aria-expanded', String(!isOpen));
  }

  menuBtn?.addEventListener('click', function (e) {
    e.stopPropagation();
    toggleDropdown(mobileMenu, menuBtn, mobileLang, langBtn);
  });

  langBtn?.addEventListener('click', function (e) {
    e.stopPropagation();
    toggleDropdown(mobileLang, langBtn, mobileMenu, menuBtn);
  });

  document.addEventListener('click', function () {
    closeDropdown(mobileMenu, menuBtn);
    closeDropdown(mobileLang, langBtn);
  });

  function updateMobileBookVisibility() {
    if (!mobileBook || !heroBookBtn) return;

    const isMobile = window.innerWidth <= 760;
    if (!isMobile) {
      mobileBook.style.display = 'none';
      return;
    }

    const rect = heroBookBtn.getBoundingClientRect();
    const heroButtonVisible = rect.bottom > 0 && rect.top < window.innerHeight;

    mobileBook.style.display = heroButtonVisible ? 'none' : 'block';
  }

  window.addEventListener('scroll', updateMobileBookVisibility, { passive: true });
  window.addEventListener('resize', updateMobileBookVisibility);
  window.addEventListener('load', updateMobileBookVisibility);
  updateMobileBookVisibility();
})();
