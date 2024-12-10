document.addEventListener('DOMContentLoaded', () => {
    // This section of my code is the 'Project' click handler that opens project links in a new tab when clicked
    const projects = document.querySelectorAll('.project');
    projects.forEach(project => {
        project.addEventListener('click', () => {
            const projectFile = project.getAttribute('data-project');
            window.open(projectFile, '_blank');
        });
    });

    // This is the GSAP animation for header text it and it animates each line of text in the header
    // Resources: https://gsap.com/text/ and https://greensock.com/docs/v3/GSAP
        const headerText = document.querySelector('.animated-text');
        const text = "DESIGNING TECHNOLOGY THAT BRIDGES PEOPLE, PURPOSE AND POSSIBILITY.";
        
        // Split the text into individual characters
        headerText.innerHTML = text.split('').map(char => `<span>${char}</span>`).join('');
    
        // Animate each character
        gsap.from('.animated-text span', {
            opacity: 0,
            y: 50,
            duration: 0.5,
            stagger: 0.05,
            ease: "power3.out"
        });


    // This the code for menu toggle
    // Handles the display of the navigation menu on mobile devices
    const menuToggle = document.querySelector('.menu-toggle');
    const navList = document.querySelector('.nav-list');
    if (menuToggle && navList) {
        menuToggle.addEventListener('click', () => {
            navList.classList.toggle('active');
        });
    }

    // Tab functionality
    // Handles the switching between different content tabs
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

