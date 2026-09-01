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

        // ===== Gestion des compétences (déroulage) =====
    const skills = document.querySelectorAll('.skill'); // 👈 Cible toute la case
    skills.forEach(skill => {
        skill.addEventListener('click', (e) => {
            e.stopPropagation();
            skill.classList.toggle('active'); // 👈 Active/désactive les détails
        });
    });

    // ===== CARTE PERSONNALISÉE =====
document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialise la carte avec un système de coordonnées simple (pour les images)
    const map = L.map('map', {
        crs: L.CRS.Simple, // 👈 Permet d'utiliser une image comme fond
        minZoom: -2, // Permet de zoomer très près
        maxZoom: 4
    });

    // 2. Dimensions de TON image (à adapter !)
    const imageWidth = 2000; // Largeur de ton image en pixels
    const imageHeight = 1500; // Hauteur de ton image en pixels

    // 3. Ajoute ton image comme fond de carte
    L.imageOverlay('img-sitejdr/testunecarte.png', [
        [0, 0], // Coin supérieur gauche (en pixels)
        [imageHeight, imageWidth] // Coin inférieur droit (en pixels)
    ]).addTo(map);

    // 4. Centre la vue sur l'image
    map.setView([imageHeight / 2, imageWidth / 2], 0);

    // ===== DONNÉES DES VILLES =====
    const villes = [
        {
            nom: "Elduria",
            dirigeant: "Les frères Docol",
            religion: "Culte de la Lune Éternelle",
            puissanceDefensive: "Très élevée (muraille de pierre noire)",
            description: "Ville fortifiée entourée de montagnes, connue pour ses mines d'argent et son temple lunaire. Les frères Docol y règnent avec une poigne de fer, mais leur loyauté envers le Culte de la Lune est sans faille.",
            coords: [800, 500] // 👈 Coordonnées en pixels sur TON image
        },
        {
            nom: "Odacap",
            dirigeant: "Roi Thalric le Sage",
            religion: "Ordre du Soleil Levant",
            puissanceDefensive: "Moyenne (gardes royaux)",
            description: "Capitale commerciale au bord de la rivière Néhil, centre du négoce et de la diplomatie. Le roi Thalric y a établi une bibliothèque légendaire.",
            coords: [1200, 300] // 👈 À adapter
        },
        {
            nom: "Marais de l'Ombre",
            dirigeant: "Aucun (territoire sauvage)",
            religion: "Culte des Esprits",
            puissanceDefensive: "Faible (pièges naturels)",
            description: "Zone mystérieuse où errent les âmes des défunts. Les Fiolistes y récoltent des herbes rares pour leurs potions.",
            coords: [400, 1000] // 👈 À adapter
        }
    ];

    // 5. Ajoute les marqueurs pour chaque ville
    villes.forEach(ville => {
        // Crée un marqueur
        const marker = L.marker([ville.coords[1], ville.coords[0]]).addTo(map);

        // Crée le contenu du popup
        const popupContent = `
            <div class="city-popup">
                <h3>${ville.nom}</h3>
                <p><strong>Dirigeant :</strong> ${ville.dirigeant}</p>
                <p><strong>Religion principale :</strong> ${ville.religion}</p>
                <p><strong>Puissance défensive :</strong> ${ville.puissanceDefensive}</p>
                <p><strong>Description :</strong> ${ville.description}</p>
            </div>
        `;

        // Associe le popup au marqueur
        marker.bindPopup(popupContent);
    });
});
