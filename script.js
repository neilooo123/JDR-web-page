// ===== Gestion des onglets =====
document.addEventListener('DOMContentLoaded', () => {
    const tabLinks = document.querySelectorAll('.nav-tabs a');
    const tabContents = document.querySelectorAll('.tab-content');

    tabLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            // Retire la classe "active" de tous les liens et contenus
            tabLinks.forEach(l => l.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            // Ajoute la classe "active" au lien cliqué et au contenu correspondant
            link.classList.add('active');
            const tabId = link.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });

        // ===== Gestion du déroulage des compétences =====
    document.addEventListener('DOMContentLoaded', () => {
        // Gestion des onglets (ton code existant)
        const tabLinks = document.querySelectorAll('.nav-tabs a');
        const tabContents = document.querySelectorAll('.tab-content');
    
        tabLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                tabLinks.forEach(l => l.classList.remove('active'));
                tabContents.forEach(c => c.classList.remove('active'));
                link.classList.add('active');
                const tabId = link.getAttribute('data-tab');
                document.getElementById(tabId).classList.add('active');
            });
        });
    
        // NOUVEAU : Gestion du clic sur les compétences
        const skillNames = document.querySelectorAll('.skill-name');
        skillNames.forEach(skillName => {
            skillName.addEventListener('click', (e) => {
                e.stopPropagation(); // Empêche la propagation du clic au parent
                const skill = skillName.parentElement;
                skill.classList.toggle('active'); // Active/désactive la classe "active"
            });
        });
    });
    

    // ===== Carte Interactive =====
    const map = L.map('map').setView([48.8566, 2.3522], 5); // Coordonnées de Paris par défaut

    // Ajoute la couche OpenStreetMap (gratuite)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    // Ajoute un marqueur (exemple : "Ville de départ")
    L.marker([48.8566, 2.3522]).addTo(map)
        .bindPopup('Ville de départ : <strong>Lumière</strong>.<br>Un lieu sacré pour les aventuriers.')
        .openPopup();

    // Ajoute un autre marqueur (exemple : "Donjon")
    L.marker([48.85, 2.3]).addTo(map)
        .bindPopup('Donjon de l\'Ombre.<br>Attention aux pièges !');

    // Ajoute un cercle (zone dangereuse)
    L.circle([48.86, 2.4], {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: 1000
    }).addTo(map).bindPopup('Zone maudite !');
});
