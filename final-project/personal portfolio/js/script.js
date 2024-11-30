document.addEventListener('DOMContentLoaded', () => {
    // Handle project clicks to open links in a new tab
    const projects = document.querySelectorAll('.project');
    projects.forEach(project => {
        project.addEventListener('click', () => {
            const projectFile = project.getAttribute('data-project');
            window.open(projectFile, '_blank'); // Opens the project in a new tab
        });
    });

    // GSAP text animation for header
    gsap.timeline()
        .to(".animated-text span", {
            y: 0,             // Final position (no offset)
            opacity: 1,       // Fully visible
            duration: 1,      // Duration for each line
            ease: "power2.out", // Smooth easing
            stagger: 0.2      // Delay between each line
        });

    // Mobile menu toggle functionality
    const menuToggle = document.querySelector('.menu-toggle');
    const navList = document.querySelector('.nav-list');

    if (menuToggle && navList) {
        menuToggle.addEventListener('click', function() {
            navList.classList.toggle('active');
        });
    }

    // Smooth scrolling for anchor links on page
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Parallax effect for sections
    window.addEventListener('scroll', function() {
        const parallaxSections = document.querySelectorAll('.parallax-section');
        
        parallaxSections.forEach(section => {
            const distance = window.pageYOffset;
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (distance > sectionTop - window.innerHeight && distance < sectionTop + sectionHeight) {
                const speed = section.dataset.speed || 0.5;
                const yPos = (distance - sectionTop) * speed;
                section.style.backgroundPositionY = `${yPos}px`;
            }
        });
    });


        const tabs = document.querySelectorAll('.tab-button');
        const contents = document.querySelectorAll('.tab-content');
    
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const target = tab.dataset.tab;
    
                tabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
    
                contents.forEach(content => {
                    content.classList.remove('active');
                    if (content.id === target) {
                        content.classList.add('active');
                    }
                });
            });
        });
    });