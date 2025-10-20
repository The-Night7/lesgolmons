document.addEventListener('DOMContentLoaded', function() {
    // Navigation active
    const currentLocation = location.pathname;
    const navLinks = document.querySelectorAll('nav ul li a');

    navLinks.forEach(link => {
        if(link.getAttribute('href') === currentLocation ||
            (currentLocation === '/' && link.getAttribute('href') === 'index.html')) {
            link.classList.add('active');
        }
    });

    // Gestion du menu déroulant
    const dropdowns = document.querySelectorAll('.dropdown');

    dropdowns.forEach(dropdown => {
        const dropdownContent = dropdown.querySelector('.dropdown-content');

        // Désactiver le comportement CSS hover pour le remplacer par JavaScript
        dropdownContent.style.display = 'none';
        dropdownContent.style.opacity = '0';
        dropdownContent.style.transition = 'opacity 0.3s ease';

        // Variable pour stocker le timeout
        let timeout;

        dropdown.addEventListener('mouseenter', function() {
            clearTimeout(timeout);
            // Afficher le menu déroulant
            dropdownContent.style.display = 'block';
            // Utiliser requestAnimationFrame pour s'assurer que le navigateur a traité le changement de display
            requestAnimationFrame(() => {
                dropdownContent.style.opacity = '1';
            });
        });

        dropdown.addEventListener('mouseleave', function() {
            // Ajouter un délai avant de cacher le menu
            timeout = setTimeout(() => {
                dropdownContent.style.opacity = '0';
                // Attendre que la transition d'opacité soit terminée avant de cacher le menu
                setTimeout(() => {
                    dropdownContent.style.display = 'none';
                }, 300); // Correspondant à la durée de transition
            }, 200); // Délai avant de commencer à cacher
        });
    });

    // Animation des cartes au scroll
    const animateOnScroll = function() {
        const cards = document.querySelectorAll('.card');
        cards.forEach(card => {
            const cardPosition = card.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;

            if(cardPosition < screenPosition) {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }
        });
    };

    // Initialiser les cartes avec une opacité de 0
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Appel initial pour les éléments déjà visibles

    // Smooth scroll pour les ancres
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});