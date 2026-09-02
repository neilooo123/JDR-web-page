// ===== CODE COMPLET POUR script.js =====
document.addEventListener('DOMContentLoaded', () => {
    // ===== 1. Gestion des onglets =====
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

    // ===== 2. Gestion des compétences (déroulage) =====
    const skills = document.querySelectorAll('.skill');
    skills.forEach(skill => {
        skill.addEventListener('click', () => {
            skill.classList.toggle('active');
        });
    });

    // ===== 3. Carte Leaflet personnalisée =====
    // Initialise la carte UNIQUEMENT si l'onglet "carte" existe
    if (document.getElementById('map')) {
        const map = L.map('map', {
            crs: L.CRS.Simple, // Pour utiliser une image comme fond
            minZoom: -2,
            maxZoom: 4
        });

        // 👇 ADAPTE CES VALEURS À TON IMAGE !
        const imageWidth = 2000; // Largeur de ton image en pixels
        const imageHeight = 1500; // Hauteur de ton image en pixels

        // Charge ton image comme fond
        L.imageOverlay('img-sitejdr/testunecarte.png', [
            [0, 0], // Coin supérieur gauche
            [imageHeight, imageWidth] // Coin inférieur droit
        ]).addTo(map);

        // Centre la vue
        map.setView([imageHeight / 2, imageWidth / 2], 0);

        // ===== Données des villes =====
        const villes = [
            {
                nom: "Cendrel",
                dirigeant: "Les frères Docol",
                religion: "Culte des cendres",
                puissanceDefensive: "Très peu de puissance defencive",
                description: "Petit hameau, cette ville est entouré d'une forêt profonde dans laquelle il peut-être facile de ci perdre. ",
                coords: [324, 153] // 👈 [Y, X] sur ton image
            },
            {
                nom: "Odacap",
                dirigeant: "Roi Thalric le Sage",
                religion: "Ordre du Soleil Levant",
                puissanceDefensive: "Moyenne (gardes royaux)",
                description: "Capitale commerciale au bord de la rivière Néhil.",
                coords: [1200, 300] // 👈 [Y, X]
            },
            {
                nom: "Marais de l'Ombre",
                dirigeant: "Aucun (territoire sauvage)",
                religion: "Culte des Esprits",
                puissanceDefensive: "Faible (pièges naturels)",
                description: "Zone mystérieuse où errent les âmes des défunts.",
                coords: [400, 1000] // 👈 [Y, X]
            }
        ];

        // Ajoute les marqueurs
        villes.forEach(ville => {
            // 👇 Note : Leaflet utilise [lat, lng] = [Y, X] pour les images
            const marker = L.marker([ville.coords[0], ville.coords[1]]).addTo(map);
            marker.bindPopup(`
                <div class="city-popup">
                    <h3>${ville.nom}</h3>
                    <p><strong>Dirigeant :</strong> ${ville.dirigeant}</p>
                    <p><strong>Religion :</strong> ${ville.religion}</p>
                    <p><strong>Puissance défensive :</strong> ${ville.puissanceDefensive}</p>
                    <p><strong>Description :</strong> ${ville.description}</p>
                </div>
            `);
        });
    }
});
