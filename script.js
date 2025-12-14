document.addEventListener('DOMContentLoaded', () => {
    // ------------------------------------------------------------------
    // 1. NAVEGACIÓN SUAVE Y MENÚ HAMBURGUESA
    // ------------------------------------------------------------------
    const navToggle = document.querySelector('.nav-toggle');
    const mainNav = document.getElementById('main-nav');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');

    // Menú Hamburguesa
    navToggle.addEventListener('click', () => {
        mainNav.classList.toggle('active');
        navToggle.querySelector('i').classList.toggle('fa-bars');
        navToggle.querySelector('i').classList.toggle('fa-times');
    });

    // Cierre del menú al hacer click en un enlace (solo en móvil)
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            // Cierre en móvil
            if (mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
                navToggle.querySelector('i').classList.remove('fa-times');
                navToggle.querySelector('i').classList.add('fa-bars');
            }
            
            // Desplazamiento suave
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Offset para el header fijo
                    behavior: 'smooth'
                });
            }
        });
    });

    // ------------------------------------------------------------------
    // 2. EFECTO TYPEWRITER (HERO)
    // ------------------------------------------------------------------
    function typewriterEffect(element, text, speed) {
        let i = 0;
        element.style.width = '0';
        element.style.animation = 'blinking-cursor 0.75s step-end infinite';

        function type() {
            if (i < text.length) {
                element.style.width = (i + 1) + 'ch';
                element.textContent = text.substring(0, i + 1);
                i++;
                setTimeout(type, speed);
            } else {
                element.style.animation = 'none';
                element.style.borderRight = 'none';
            }
        }
        type();
    }

    const typewriterElement = document.querySelector('.typewriter');
    if (typewriterElement) {
        const textToType = typewriterElement.getAttribute('data-text');
        // Usamos una velocidad lenta para simular un ambiente de terminal
        typewriterEffect(typewriterElement, textToType, 90); 
    }

    // ------------------------------------------------------------------
    // 3. FILTRO DE PROYECTOS
    // ------------------------------------------------------------------
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Activar/Desactivar botón
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filter = button.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');

                if (filter === 'all' || category === filter) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });
    
    // ------------------------------------------------------------------
    // 4. ANIMACIONES AL HACER SCROLL (Observer API)
    // ------------------------------------------------------------------
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const id = entry.target.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${id}"]`);

            // Animación al entrar/salir del viewport
            if (entry.isIntersecting) {
                // Agregar clase de animación si es necesario (e.g., para fade-in)
                entry.target.classList.add('in-view'); 
                
                // Actualizar enlace activo en la navegación
                navLinks.forEach(link => link.classList.remove('active-link'));
                if (navLink) {
                     navLink.classList.add('active-link');
                }
            } else {
                entry.target.classList.remove('in-view');
            }
        });
    }, { 
        threshold: 0.3, // 30% del elemento visible
        rootMargin: '-50px 0px -50px 0px' // Margen de root para una mejor detección
    });

    sections.forEach(section => {
        observer.observe(section);
    });

    // ------------------------------------------------------------------
    // 5. MANEJO DEL FORMULARIO DE CONTACTO
    // ------------------------------------------------------------------
    const contactForm = document.getElementById('contact-form');
    
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // En una aplicación real, aquí se enviarían los datos a un backend (e.g., Formspree, Lambda, etc.)
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        const submitButton = document.querySelector('.send-button');
        submitButton.textContent = 'Enviando...';
        submitButton.disabled = true;

        setTimeout(() => {
            // Simulación de envío exitoso
            alert(`Mensaje de ${name} enviado con éxito. Te contactaré a ${email} pronto.`);
            
            contactForm.reset();
            submitButton.textContent = 'Mensaje Enviado';
            submitButton.disabled = false;
            
            setTimeout(() => {
                submitButton.textContent = 'Enviar Mensaje';
                submitButton.querySelector('i').className = 'fas fa-paper-plane';
            }, 3000);
            
        }, 1500); // Retraso de simulación
    });
});