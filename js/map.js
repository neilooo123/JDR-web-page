   // ===== CARTE PERSONNALISÉE =====
if (document.getElementById('map')) {
    const map = L.map('map', {
        crs: L.CRS.Simple,
        minZoom: -2,
        maxZoom: 4
    });

    const imageWidth = 2000; // 👈 ADAPTE À TON IMAGE
    const imageHeight = 1500; // 👈 ADAPTE À TON IMAGE

    L.imageOverlay('img-sitejdr/testunecarte.png', [
        [0, 0],
        [imageHeight, imageWidth]
    ]).addTo(map);

    map.setView([imageHeight / 2, imageWidth / 2], 0);

    // 👇 ICÔNES PERSONNALISÉES (NOUVEAU)
    const cityIcons = {
        "Cendrel": L.icon({
            iconUrl: 'img-sitejdr/cendrel-marker.png',
            iconSize: [32, 32],
            iconAnchor: [16, 32]
        }),
        "Odacap": L.icon({
            iconUrl: 'img-sitejdr/odacap-marker.png',
            iconSize: [32, 32],
            iconAnchor: [16, 32]
        }),
        "Marais de l'Ombre": L.icon({
            iconUrl: 'img-sitejdr/marais-marker.png',
            iconSize: [32, 32],
            iconAnchor: [16, 32]
        })
    };

    const defaultIcon = L.icon({
        iconUrl: 'img-sitejdr/default-marker.png',
        iconSize: [32, 32],
        iconAnchor: [16, 32]
    });

    // 👇 DONNÉES DES VILLES
    const villes = [
        {
            nom: "Cendrel",
            dirigeant: "Les frères Docol",
            religion: "Culte des cendres",
            puissanceDefensive: "Très peu de puissance défensive",
            description: "Petit hameau entouré d'une forêt profonde...",
            coords: [324, 153]
        },
        // ... (tes autres villes)
    ];

    // 👇 AJOUT DES MARQUEURS AVEC ICÔNES
    villes.forEach(ville => {
        const marker = L.marker(
            [ville.coords[0], ville.coords[1]],
            { icon: cityIcons[ville.nom] || defaultIcon }
        ).addTo(map);
        marker.bindPopup(/* ... */);
    });
}

