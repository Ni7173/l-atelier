document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.project').forEach(project => {
        const bgColor = project.getAttribute('data-bg-color');
        const starColor = project.getAttribute('data-star-color');

        // Appliquer les couleurs en tant que variables CSS
        project.style.setProperty('--bg-color', `${bgColor}`);
        project.style.setProperty('--star-color', `${starColor}`);
    });
});
