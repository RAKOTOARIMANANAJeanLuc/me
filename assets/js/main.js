(function() {
  "use strict";

  /**
   * Fonction d'aide pour le sélecteur
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
   * Fonction du gestionnaire d'événements
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
   * Gestionnaire d'événements de défilement
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * État actif des liens de la barre de navigation lors du défilement
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
   * Défilement vers un élément avec un décalage d'en-tête
   */
  const scrollto = (el) => {
    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos,
      behavior: 'smooth'
    })
  }

  /**
   * Bouton retour en haut
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
   * Basculer la navigation mobile
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('body').classList.toggle('mobile-nav-active')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Défilement avec décalage sur les liens avec une classe .scrollto
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
   * Défilement avec décalage au chargement de la page avec des liens de hachage dans l'URL
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Préchargeur
   */
  let preloader = select('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove()
    });
  }

  /**
   * Effet de type Accueil
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
   * Animation des compétences
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
   * Projet isotope et filtre
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
   * Initialiser la lightbox du projet
   */
  const projetLightbox = GLightbox({
    selector: '.projet-lightbox'
  });

  /**
   * Initialiser la lightbox des détails du projet
   */
  const projetDetailsLightbox = GLightbox({
    selector: '.projet-details-lightbox',
    width: '90%',
    height: '90vh'
  });

  /**
   * Curseur de détails du projet
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
   * Animation au défilement
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
   * Initialiser le compteur pur
   */
  new PureCounter();

})()

// Copier le texte
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
