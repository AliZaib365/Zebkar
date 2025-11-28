        // Header scroll effect
        window.addEventListener('scroll', function () {
            const header = document.querySelector('.site-header');
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });

        // Mobile menu functionality
        const hamburger = document.querySelector('.hamburger');
        const mobileMenu = document.querySelector('.mobile-menu');
        const closeMenu = document.querySelector('.close-menu');

        hamburger.addEventListener('click', function () {
            this.classList.toggle('active');
            mobileMenu.classList.toggle('active');
        });

        closeMenu.addEventListener('click', function () {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
        });

        // Close mobile menu when clicking on a link
        const mobileLinks = document.querySelectorAll('.mobile-nav a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function () {
                hamburger.classList.remove('active');
                mobileMenu.classList.remove('active');
            });
        });

        // Create additional diamond particles dynamically
        function createDiamondParticles() {
            const hero = document.querySelector('.hero');
            const particleCount = 8; // Additional particles beyond the static ones

            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.classList.add('diamond-particle');

                // Random position
                const top = Math.random() * 100;
                const left = Math.random() * 100;
                const delay = Math.random() * 6;

                particle.style.top = `${top}%`;
                particle.style.left = `${left}%`;
                particle.style.animationDelay = `${delay}s`;

                hero.appendChild(particle);
            }
        }

        // Initialize particles when page loads
        window.addEventListener('load', createDiamondParticles);
