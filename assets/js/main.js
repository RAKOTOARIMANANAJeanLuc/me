(function() {
  "use strict";

  /**
   * selecteur helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos,
      behavior: 'smooth'
    })
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('body').classList.toggle('mobile-nav-active')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let body = select('body')
      if (body.classList.contains('mobile-nav-active')) {
        body.classList.remove('mobile-nav-active')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Preloader
   */
  let preloader = select('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove()
    });
  }

  /**
   * Accueil type effect
   */
  const typed = select('.typed')
  if (typed) {
    let typed_strings = typed.getAttribute('data-typed-items')
    typed_strings = typed_strings.split(',')
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Skills animation
   */
  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function(direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
  }

  /**
   * Projet isotope and filter
   */
  window.addEventListener('load', () => {
    let projetContainer = select('.projet-container');
    if (projetContainer) {
      let projetIsotope = new Isotope(projetContainer, {
        itemSelector: '.projet-item'
      });

      let projetFilters = select('#projet-flters li', true);

      on('click', '#projet-flters li', function(e) {
        e.preventDefault();
        projetFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        projetIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        projetIsotope.on('arrangeComplete', function() {
          AOS.refresh()
        });
      }, true);
    }

  });

  /**
   * Initiate projet lightbox 
   */
  const projetLightbox = GLightbox({
    selector: '.projet-lightbox'
  });

  /**
   * Initiate projet details lightbox 
   */
  const projetDetailsLightbox = GLightbox({
    selector: '.projet-details-lightbox',
    width: '90%',
    height: '90vh'
  });

  /**
   * Projet details slider
   */
  new Swiper('.projet-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });

  /**
   * Initiate Pure Counter 
   */
  new PureCounter();

})()

// Copy texte
document.addEventListener('DOMContentLoaded', function() {
  var copyTextElements = document.querySelectorAll('.copy-text');

  copyTextElements.forEach(function(element) {
      element.addEventListener('click', function() {
          var matriculeText = element.textContent;

          var textArea = document.createElement('textarea');
          textArea.value = matriculeText;
          textArea.style.position = 'fixed'; 

          document.body.appendChild(textArea);

          textArea.select();
          document.execCommand('copy');

          document.body.removeChild(textArea);

          var matriculeCopiéAlert = "Copie réussie : " + matriculeText;

          window.sessionStorage.setItem('copie_alert', matriculeCopiéAlert);

          showAlert(matriculeCopiéAlert);
      });
  });

  function showAlert(message) {
      var alertContainer = document.createElement('div');
      alertContainer.id = "auto-close-alert-copie";
      alertContainer.className = "position-fixed bottom-0 end-0 p-3";
      alertContainer.style.zIndex = "99999";

      var alertDiv = document.createElement('div');
      alertDiv.className = "alert alert-success alert-dismissible";
      alertDiv.setAttribute('role', 'alert');
      alertDiv.innerText = message;

      var closeButton = document.createElement('button');
      closeButton.type = "button";
      closeButton.className = "btn-close";
      closeButton.setAttribute('data-bs-dismiss', 'alert');
      closeButton.setAttribute('aria-label', 'Fermer');

      alertDiv.appendChild(closeButton);
      alertContainer.appendChild(alertDiv);
      document.body.appendChild(alertContainer);

      setTimeout(function() {
          document.body.removeChild(alertContainer);

          window.sessionStorage.removeItem('copie_alert');
      }, 5000); // 5000 ms (5 secondes) de délai
  }

  var storedAlert = window.sessionStorage.getItem('copie_alert');
  if (storedAlert) {
      showAlert(storedAlert);
      window.sessionStorage.removeItem('copie_alert');
  }
});