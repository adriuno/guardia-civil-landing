// ============================================
// CONFIGURACIÓN
// ============================================
const CONFIG = {
  headerOffset: 80,
  swipeThreshold: 50,
  messageTimeout: 5000,
  // EmailJS configuration - Email completamente oculto y seguro
  emailjs: {
    serviceId: "service_l64l0tp",
    templateId: "template_f61t78m", // Template para ti (notificación)
    autoReplyTemplateId: "template_iiy0b3b", // Template para usuario (confirmación)
    publicKey: "p-QrCEj1ccdOjikpz",
  },
};

// ============================================
// RENDERIZADO DE TESTIMONIOS (RESEÑAS ESCRITAS)
// ============================================
class TestimonialsRenderer {
  constructor(containerId, indicatorsId, data) {
    this.container = document.getElementById(containerId);
    this.indicators = document.getElementById(indicatorsId);
    this.data = data;
    // Paleta de colores tipo Google para los avatares
    this.colors = [
      "#1a73e8", // Azul Google
      "#ea4335", // Rojo Google
      "#34a853", // Verde Google
      "#fbbc04", // Amarillo Google
      "#f439a0", // Rosa
      "#9c27b0", // Morado
      "#00acc1", // Cyan
      "#ff6d00", // Naranja
      "#5e35b1", // Violeta
      "#43a047", // Verde oscuro
    ];
  }

  getColorForIndex(index) {
    return this.colors[index % this.colors.length];
  }

  render() {
    if (!this.container || !this.data) return;

    const html = this.data
      .map(
        (testimonial, index) => `
            <div class="testimonial-card">
                <div class="quote-icon">"</div>
                <p class="testimonial-text">${testimonial.text}</p>
                <div class="testimonial-author">
                    <div class="author-avatar" style="background-color: ${this.getColorForIndex(
                      index
                    )}">${testimonial.avatar}</div>
                    <div class="author-info">
                        <h4>${testimonial.author}</h4>
                        <p>${testimonial.role}</p>
                    </div>
                </div>
            </div>
        `
      )
      .join("");

    this.container.innerHTML = html;

    // Renderizar indicadores si existen
    if (this.indicators) {
      const indicatorsHtml = this.data
        .map(
          (testimonial, index) =>
            `<span class="indicator ${
              index === 0 ? "active" : ""
            }" data-testimonial-index="${index}"></span>`
        )
        .join("");
      this.indicators.innerHTML = indicatorsHtml;
    }
  }
}

// ============================================
// CARRUSEL DE TESTIMONIOS
// ============================================
class TestimonialsCarousel {
  constructor() {
    this.currentSlide = 0;
    this.container = document.getElementById("testimonials-container");
    this.indicators = document.querySelectorAll(
      "#testimonialsIndicators .indicator"
    );
    this.prevBtn = document.getElementById("testimonialsPrev");
    this.nextBtn = document.getElementById("testimonialsNext");
    this.autoPlayInterval = null;
    this.autoPlayDelay = 5000; // 5 segundos

    if (this.container) {
      this.totalSlides =
        this.container.querySelectorAll(".testimonial-card").length;
      this.updateItemsPerSlide();
      this.init();

      // Actualizar al cambiar el tamaño de la ventana
      window.addEventListener("resize", () => {
        this.updateItemsPerSlide();
        this.update();
      });
    }
  }

  updateItemsPerSlide() {
    // Mostrar 1 testimonio en móvil, 3 en desktop
    this.itemsPerSlide = window.innerWidth <= 768 ? 1 : 3;
    this.maxSlide = Math.max(0, this.totalSlides - this.itemsPerSlide);
  }

  init() {
    // Botones manual
    this.prevBtn?.addEventListener("click", () => {
      this.stopAutoPlay();
      this.move(-1);
      this.startAutoPlay();
    });

    this.nextBtn?.addEventListener("click", () => {
      this.stopAutoPlay();
      this.move(1);
      this.startAutoPlay();
    });

    // Indicadores
    document
      .querySelectorAll("#testimonialsIndicators .indicator")
      .forEach((indicator, index) => {
        indicator.addEventListener("click", () => {
          this.stopAutoPlay();
          this.goTo(index);
          this.startAutoPlay();
        });
      });

    // Pausar auto-play cuando el mouse está sobre el carrusel
    this.container.parentElement.addEventListener("mouseenter", () =>
      this.stopAutoPlay()
    );
    this.container.parentElement.addEventListener("mouseleave", () =>
      this.startAutoPlay()
    );

    // Iniciar auto-play
    this.startAutoPlay();
  }

  move(direction) {
    this.currentSlide += direction;

    // Si llegamos al final, volvemos al inicio
    if (this.currentSlide > this.maxSlide) {
      this.currentSlide = 0;
    }
    // Si retrocedemos desde el inicio, vamos al final
    if (this.currentSlide < 0) {
      this.currentSlide = this.maxSlide;
    }

    this.update();
  }

  goTo(index) {
    this.currentSlide = Math.min(index, this.maxSlide);
    this.update();
  }

  update() {
    // Calcular el desplazamiento basado en el ancho de las cards + gap
    const cards = this.container.querySelectorAll(".testimonial-card");
    if (cards.length > 0) {
      const cardWidth = cards[0].offsetWidth;
      const gap = 32; // 2rem = 32px
      const offset = -(this.currentSlide * (cardWidth + gap));
      this.container.style.transform = `translateX(${offset}px)`;
    }

    // Actualizar indicadores
    document
      .querySelectorAll("#testimonialsIndicators .indicator")
      .forEach((indicator, index) => {
        indicator.classList.toggle("active", index === this.currentSlide);
      });
  }

  startAutoPlay() {
    this.autoPlayInterval = setInterval(() => {
      this.move(1);
    }, this.autoPlayDelay);
  }

  stopAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
      this.autoPlayInterval = null;
    }
  }
}

// ============================================
// RENDERIZADO DE VIDEOS
// ============================================
class VideoCarouselRenderer {
  constructor(trackId, indicatorsId, data) {
    this.track = document.getElementById(trackId);
    this.indicators = document.getElementById(indicatorsId);
    this.data = data;
  }

  render() {
    if (!this.track || !this.indicators || !this.data) return;

    // Renderizar slides de video
    const slidesHtml = this.data
      .map(
        (video, index) => `
            <div class="carousel-slide">
                <div class="video-wrapper">
                    <video controls controlsList="nodownload" oncontextmenu="return false;" aria-describedby="video${video.id}-desc">
                        <source src="${video.src}" type="video/mp4">
                        Tu navegador no soporta el elemento de video.
                    </video>
                    <div class="video-info" id="video${video.id}-desc">
                        <h4>${video.title}</h4>
                        <p>${video.description}</p>
                    </div>
                </div>
            </div>
        `
      )
      .join("");

    this.track.innerHTML = slidesHtml;

    // Renderizar indicadores
    const indicatorsHtml = this.data
      .map(
        (video, index) =>
          `<span class="indicator ${
            index === 0 ? "active" : ""
          }" onclick="goToSlide(${index})"></span>`
      )
      .join("");

    this.indicators.innerHTML = indicatorsHtml;
  }
}

// ============================================
// NAVEGACIÓN MÓVIL
// ============================================
class MobileMenu {
  constructor() {
    this.navLinks = document.getElementById("navLinks");
    this.mobileMenuBtn = document.querySelector(".mobile-menu");
    this.init();
  }

  init() {
    // Toggle menu con botón
    this.mobileMenuBtn?.addEventListener("click", () => this.toggle());

    // Cerrar menú al hacer click en enlaces
    this.navLinks?.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => this.close());
    });

    // Cerrar menú al hacer click fuera
    document.addEventListener("click", (e) => {
      if (!e.target.closest("nav")) {
        this.close();
      }
    });
  }

  toggle() {
    this.navLinks?.classList.toggle("active");
  }

  close() {
    this.navLinks?.classList.remove("active");
  }
}

// ============================================
// SMOOTH SCROLL
// ============================================
class SmoothScroll {
  constructor(offset = CONFIG.headerOffset) {
    this.offset = offset;
    this.init();
  }

  init() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", (e) => this.handleClick(e));
    });
  }

  handleClick(e) {
    e.preventDefault();
    const target = document.querySelector(e.currentTarget.getAttribute("href"));

    if (target) {
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - this.offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  }
}

// ============================================
// FORMULARIO DE CONTACTO
// ============================================
class ContactForm {
  constructor(formId) {
    this.form = document.getElementById(formId);
    this.message = document.getElementById("formMessage");
    this.submitBtn = this.form?.querySelector('button[type="submit"]');
    this.validators = {
      name: {
        test: (value) => value.trim().length >= 3,
        message: "El nombre debe tener al menos 3 caracteres",
      },
      email: {
        test: (value) =>
          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value),
        message: "Por favor, introduce un email válido (ej: ejemplo@email.com)",
      },
      phone: {
        test: (value) => {
          const cleaned = value.replace(/\D/g, ""); // Elimina todo lo que NO sea dígito
          return cleaned.length === 9;
        },
        message: "El teléfono debe contener 9 dígitos",
      },
      service: {
        test: (value) => value !== "",
        message: "Por favor, selecciona un programa de interés",
      },
      message: {
        test: (value) => value.trim().length >= 7,
        message: "El mensaje debe tener al menos 7 caracteres",
      },
    };
    this.init();
  }

  init() {
    this.form?.addEventListener("submit", (e) => this.handleSubmit(e));

    // Validación en tiempo real mientras escribe
    ["name", "email", "phone", "service", "message"].forEach((fieldName) => {
      const field = document.getElementById(fieldName);
      field?.addEventListener("blur", () => this.validateField(fieldName));
      field?.addEventListener("input", () => this.clearError(fieldName));
    });
  }

  validateField(fieldName) {
    const field = document.getElementById(fieldName);
    const value = field?.value || "";
    const validator = this.validators[fieldName];

    if (!validator.test(value)) {
      this.showFieldError(fieldName, validator.message);
      return false;
    }

    this.clearError(fieldName);
    return true;
  }

  validateAllFields() {
    let isValid = true;

    Object.keys(this.validators).forEach((fieldName) => {
      if (!this.validateField(fieldName)) {
        isValid = false;
      }
    });

    return isValid;
  }

  showFieldError(fieldName, message) {
    const errorElement = document.getElementById(`${fieldName}-error`);
    const formGroup = document
      .getElementById(fieldName)
      ?.closest(".form-group");

    if (errorElement) {
      errorElement.textContent = message;
      errorElement.classList.add("show");
    }

    if (formGroup) {
      formGroup.classList.add("error");
    }
  }

  clearError(fieldName) {
    const errorElement = document.getElementById(`${fieldName}-error`);
    const formGroup = document
      .getElementById(fieldName)
      ?.closest(".form-group");

    if (errorElement) {
      errorElement.textContent = "";
      errorElement.classList.remove("show");
    }

    if (formGroup) {
      formGroup.classList.remove("error");
    }
  }

  clearAllErrors() {
    Object.keys(this.validators).forEach((fieldName) => {
      this.clearError(fieldName);
    });
  }

  async handleSubmit(e) {
    e.preventDefault();

    // Limpiar errores previos
    this.clearAllErrors();

    // Validar todos los campos
    if (!this.validateAllFields()) {
      this.showMessage(
        "Por favor, corrige los errores antes de enviar.",
        "error"
      );
      return;
    }

    this.setLoading(true);

    const formData = this.getFormData();

    try {
      // 1️⃣ Enviar email de notificación a ti (prepa.fisicas.guardias@gmail.com)
      await emailjs.send(
        CONFIG.emailjs.serviceId,
        CONFIG.emailjs.templateId,
        formData
      );

      // 2️⃣ Enviar confirmación automática al usuario
      await emailjs.send(
        CONFIG.emailjs.serviceId,
        CONFIG.emailjs.autoReplyTemplateId,
        {
          ...formData,
          user_email: "prepa.fisicas.guardias@gmail.com", // Para que aparezca como remitente
        }
      );

      this.showMessage(
        "¡Mensaje enviado con éxito! Revisa tu email para ver la confirmación.",
        "success"
      );
      this.form.reset();
      this.clearAllErrors();
    } catch (error) {
      console.error("Error al enviar:", error);
      this.showMessage(
        "Hubo un error al enviar el mensaje. Por favor, intenta de nuevo o contacta por email.",
        "error"
      );
    } finally {
      this.setLoading(false);
    }
  }

  getFormData() {
    return {
      name: document.getElementById("name")?.value.trim(),
      email: document.getElementById("email")?.value.trim(),
      phone: document.getElementById("phone")?.value.trim(),
      service: document.getElementById("service")?.value,
      message: document.getElementById("message")?.value.trim(),
    };
  }

  setLoading(isLoading) {
    if (this.submitBtn) {
      this.submitBtn.disabled = isLoading;
      this.submitBtn.textContent = isLoading ? "Enviando..." : "Enviar Mensaje";
    }
  }

  showMessage(text, type) {
    if (this.message) {
      this.message.textContent = text;
      this.message.className = `form-message ${type}`;
      this.message.style.display = "block";

      setTimeout(() => {
        this.message.style.display = "none";
      }, CONFIG.messageTimeout);
    }
  }
}

// ============================================
// HEADER SCROLL EFFECT
// ============================================
class HeaderScroll {
  constructor() {
    this.header = document.querySelector("header");
    this.lastScroll = 0;
    this.init();
  }

  init() {
    window.addEventListener("scroll", () => this.handleScroll());
  }

  handleScroll() {
    const currentScroll = window.pageYOffset;

    if (this.header) {
      this.header.style.boxShadow =
        currentScroll > 100
          ? "0 2px 20px rgba(0,0,0,0.2)"
          : "0 2px 10px rgba(0,0,0,0.1)";
    }

    this.lastScroll = currentScroll;
  }
}

// ============================================
// ANIMACIONES AL HACER SCROLL
// ============================================
class ScrollAnimations {
  constructor() {
    this.observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };
    this.init();
  }

  init() {
    const observer = new IntersectionObserver(
      (entries) => this.handleIntersection(entries),
      this.observerOptions
    );

    // Observar elementos
    document
      .querySelectorAll(".service-card, .testimonial-card, .method-step")
      .forEach((el) => {
        el.style.opacity = "0";
        el.style.transform = "translateY(30px)";
        el.style.transition = "all 0.6s ease";
        observer.observe(el);
      });
  }

  handleIntersection(entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }
}

// ============================================
// CARRUSEL DE VIDEOS
// ============================================
class VideoCarousel {
  constructor() {
    this.currentSlide = 0;
    this.track = document.getElementById("carouselTrack");
    this.slides = document.querySelectorAll(".carousel-slide");
    this.indicators = document.querySelectorAll(".indicator");
    this.container = document.querySelector(".carousel-container");
    this.totalSlides = this.slides.length;
    this.touchStartX = 0;
    this.touchEndX = 0;

    if (this.track && this.totalSlides > 0) {
      this.init();
    }
  }

  init() {
    // Navegación con botones (se manejan con onclick en HTML por simplicidad)
    window.moveCarousel = (direction) => this.move(direction);
    window.goToSlide = (index) => this.goTo(index);

    // Gestos táctiles
    this.setupTouchEvents();

    // Navegación con teclado
    this.setupKeyboardNav();
  }

  update() {
    const offset = -this.currentSlide * 100;
    this.track.style.transform = `translateX(${offset}%)`;

    // Actualizar indicadores
    this.indicators.forEach((indicator, index) => {
      indicator.classList.toggle("active", index === this.currentSlide);
    });

    // Pausar videos no visibles
    this.slides.forEach((slide, index) => {
      const video = slide.querySelector("video");
      if (video && index !== this.currentSlide) {
        video.pause();
      }
    });
  }

  move(direction) {
    this.currentSlide =
      (this.currentSlide + direction + this.totalSlides) % this.totalSlides;
    this.update();
  }

  goTo(index) {
    this.currentSlide = index;
    this.update();
  }

  setupTouchEvents() {
    if (!this.container) return;

    this.container.addEventListener("touchstart", (e) => {
      this.touchStartX = e.changedTouches[0].screenX;
    });

    this.container.addEventListener("touchend", (e) => {
      this.touchEndX = e.changedTouches[0].screenX;
      this.handleSwipe();
    });
  }

  handleSwipe() {
    const diff = this.touchStartX - this.touchEndX;

    if (Math.abs(diff) > CONFIG.swipeThreshold) {
      this.move(diff > 0 ? 1 : -1);
    }
  }

  setupKeyboardNav() {
    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") {
        this.move(-1);
      } else if (e.key === "ArrowRight") {
        this.move(1);
      }
    });
  }
}

// ============================================
// INICIALIZACIÓN
// ============================================
document.addEventListener("DOMContentLoaded", () => {
  // Renderizar testimonios y videos desde data.js
  if (typeof TESTIMONIALS_DATA !== "undefined") {
    const testimonialsRenderer = new TestimonialsRenderer(
      "testimonials-container",
      "testimonialsIndicators",
      TESTIMONIALS_DATA
    );
    testimonialsRenderer.render();
    // Inicializar carrusel de testimonios DESPUÉS de renderizar
    new TestimonialsCarousel();
  }

  if (typeof VIDEOS_DATA !== "undefined") {
    const videoRenderer = new VideoCarouselRenderer(
      "carouselTrack",
      "carouselIndicators",
      VIDEOS_DATA
    );
    videoRenderer.render();
  }

  // Inicializar componentes
  new MobileMenu();
  new SmoothScroll();
  new ContactForm("contactForm");
  new HeaderScroll();
  new ScrollAnimations();
  new VideoCarousel();
});
