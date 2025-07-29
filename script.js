const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
if (menuBtn && mobileMenu) {
  menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });
}

const elements = document.querySelectorAll('.fade-element');
if (elements.length > 0) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.remove('fade-visible');
        void entry.target.offsetWidth;
        entry.target.classList.add('fade-visible');
      } else {
        entry.target.classList.remove('fade-visible');
      }
    });
  }, { threshold: 0.2 });

  elements.forEach(el => observer.observe(el));
}

const sidebar = document.getElementById('sidebar');
const filterBtn = document.getElementById('filter-btn');
const closeSidebar = document.getElementById('close-sidebar');

if (sidebar && filterBtn && closeSidebar) {
  filterBtn.addEventListener('click', () => {
    sidebar.classList.add('open');
  });
  closeSidebar.addEventListener('click', () => {
    sidebar.classList.remove('open');
  });
}

// Parallax hero (JS smooth movement)
const hero = document.getElementById('home');
if (hero) {
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    hero.style.backgroundPositionY = -(scrolled * 0.3) + 'px';
  });
}

// Scroll top button
const scrollBtn = document.getElementById('scroll-top');
if (scrollBtn) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      scrollBtn.classList.remove('hidden');
    } else {
      scrollBtn.classList.add('hidden');
    }
  });

  scrollBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// Modal
const modal = document.getElementById('property-modal');
const closeModal = document.getElementById('close-modal');
const modalImg = document.getElementById('modal-image');
const modalTitle = document.getElementById('modal-title');
const modalDesc = document.getElementById('modal-desc');
const modalPrice = document.getElementById('modal-price');

if (modal && closeModal && modalImg && modalTitle && modalDesc && modalPrice) {
  document.querySelectorAll('.open-modal').forEach(btn => {
  btn.addEventListener('click', () => {
    const card = btn.closest('.fade-element'); // buo na card

    const img = card.querySelector('img').src;
    const title = card.querySelector('h3').textContent;
    const desc = card.querySelector('p').textContent; // unang p (features)
    const price = card.querySelector('p:last-of-type').textContent;

    modalImg.src = card.querySelector('img').src;
    modalTitle.textContent = card.querySelector('h3').textContent;
    modalDesc.textContent = card.querySelector('p').textContent;
    modalPrice.textContent = card.querySelector('p:last-of-type').textContent;

    modal.classList.remove('hidden');
  });
});

  closeModal.addEventListener('click', () => modal.classList.add('hidden'));
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.add('hidden');
  });
}

// Testimonials slider
let index = 0;
const track = document.getElementById('testimonial-track');
if (track) {
  const slides = track.children.length;
  const nextBtn = document.getElementById('next-testimonial');
  const prevBtn = document.getElementById('prev-testimonial');

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      index = (index + 1) % slides;
      track.style.transform = `translateX(-${index * 100}%)`;
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      index = (index - 1 + slides) % slides;
      track.style.transform = `translateX(-${index * 100}%)`;
    });
  }
}

const searchInput = document.querySelector('input[placeholder="Location"]');
const searchBtn = document.querySelector('.fade-element button.bg-cyan-400');
const allCards = document.querySelectorAll('#properties .fade-element');
const clearBtn = document.getElementById('clear-btn');

if (searchInput && searchBtn && clearBtn) {
  searchBtn.addEventListener('click', () => {
    const query = searchInput.value.trim().toLowerCase();
    if (!query) return;

    const keywords = ['taguig', 'makati', 'qc', 'quezon city'];

    if (keywords.includes(query)) {
      document.getElementById('properties').scrollIntoView({ behavior: 'smooth' });

      // show only matching cards
      allCards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        if (
          title.includes(query) ||
          (query === 'qc' && title.includes('quezon city'))
        ) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
      }
      });
      clearBtn.classList.remove('hidden'); // show clear button
    }
  });

  clearBtn.addEventListener('click', () => {
    // show all cards again
    allCards.forEach(card => card.classList.remove('hidden'));

    // hide button
    clearBtn.classList.add('hidden');

    // reset input
    searchInput.value = '';
  });
}