// ===== CODE COMPLET POUR script.js =====
document.addEventListener('DOMContentLoaded', () => {
    // 1. Gestion des onglets
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

    // 2. Gestion des compétences (déroulage)
    const skillNames = document.querySelectorAll('.skill-name');
    skillNames.forEach(skillName => {
        skillName.addEventListener('click', (e) => {
            e.stopPropagation();
            const skill = skillName.parentElement;
            skill.classList.toggle('active');
        });
    });

    // 3. Carte Interactive (Leaflet)
    const map = L.map('map').setView([48.8566, 2.3522], 5);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
    L.marker([48.8566, 2.3522]).addTo(map)
        .bindPopup('Ville de départ : <strong>Lumière</strong>.<br>Un lieu sacré pour les aventuriers.')
        .openPopup();
    L.marker([48.85, 2.3]).addTo(map)
        .bindPopup('Donjon de l\'Ombre.<br>Attention aux pièges !');
    L.circle([48.86, 2.4], {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: 1000
    }).addTo(map).bindPopup('Zone maudite !');
});
