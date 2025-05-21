// Chargement du header dynamique
fetch('./components/Footer.html')
    .then(res => res.text())
    .then(data => {
        document.getElementById('footer').innerHTML = data;

        const blocFooter = document.getElementById("newsletterFooter");

        const observerFooter = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observerFooter.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        if (blocFooter) {
            observerFooter.observe(blocFooter);
        }
    });

// Chargement du header dynamique
fetch('./components/Header.html')
    .then(res => res.text())
    .then(data => {
    document.getElementById('header').innerHTML = data;

    // Recharge les comportements JS du menu après insertion
    const toggleBtn = document.getElementById("menu-toggle");
    const sideMenu = document.getElementById("sideMenu");
    const overlay = document.getElementById("overlay");

    toggleBtn.addEventListener("click", () => {
        sideMenu.classList.toggle("open");
        document.body.classList.toggle("no-scroll");
        overlay.style.display = sideMenu.classList.contains("open") ? "block" : "none";
    });
});