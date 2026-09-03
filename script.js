// ===== CODE COMPLET POUR script.js =====
document.addEventListener('DOMContentLoaded', () => {
    
    // ===== GESTION DES COMPÉTENCES DYNAMIQUES =====
// 1. Récupère les éléments du DOM
const skillsContainer = document.getElementById('skills-container');
const addSkillBtn = document.getElementById('add-skill-btn');
const skillFormContainer = document.getElementById('skill-form-container');
const newSkillForm = document.getElementById('new-skill-form');
const cancelSkillBtn = document.getElementById('cancel-skill-btn');

// 2. Charge les compétences sauvegardées au démarrage
function loadSkills() {
    // Récupère les compétences depuis localStorage (ou utilise un tableau vide si rien n'est sauvegardé)
    const savedSkills = JSON.parse(localStorage.getItem('nehilostSkills')) || [];

    // Efface le contenu actuel
    skillsContainer.innerHTML = '';

    // Ajoute chaque compétence au conteneur
    savedSkills.forEach(skill => {
        addSkillToDOM(skill);
    });

    // Ajoute aussi les compétences par défaut (si tu veux)
    const defaultSkills = [
        {
            nom: "Grand Commandant",
            description: "Vous êtes un leader né et savez galvaniser vos unités.",
            effet: "+1 DEG à toutes les unités lors du prochain combat.",
            cooldown: "3 PHASE"
        },
        {
            nom: "Maître Stratège",
            description: "Votre esprit tactique vous permet d'anticiper les mouvements ennemis.",
            effet: "Ignorez les effets négatifs de la première attaque ennemie.",
            cooldown: "5 PHASE"
        },
        {
            nom: "Soin Divin",
            description: "Une lumière sacrée enveloppe vos alliés.",
            effet: "Restaure 2D6 PV à toutes les unités alliées.",
            cooldown: "4 PHASE"
        }
    ];

    // Ajoute les compétences par défaut UNIQUEMENT si localStorage est vide
    if (savedSkills.length === 0) {
        defaultSkills.forEach(skill => {
            addSkillToDOM(skill);
        });
    }
}

// 3. Fonction pour ajouter une compétence au DOM
function addSkillToDOM(skill) {
    const skillElement = document.createElement('div');
    skillElement.className = 'skill';
    skillElement.innerHTML = `
        <h3 class="skill-name">${skill.nom}</h3>
        <div class="skill-details">
            <p><strong>Description :</strong> ${skill.description}</p>
            <p><strong>Effet :</strong> ${skill.effet}</p>
            <p><strong>Cooldown :</strong> ${skill.cooldown}</p>
        </div>
    `;

    // Ajoute l'écouteur d'événement pour le déroulage
    skillElement.addEventListener('click', () => {
        skillElement.classList.toggle('active');
    });

    skillsContainer.appendChild(skillElement);
}

// 4. Fonction pour sauvegarder les compétences dans localStorage
function saveSkills() {
    const skills = [];
    document.querySelectorAll('.skill').forEach(skillElement => {
        const nom = skillElement.querySelector('.skill-name').textContent;
        const description = skillElement.querySelector('.skill-details p:nth-child(1)').textContent.replace('<strong>Description :</strong> ', '');
        const effet = skillElement.querySelector('.skill-details p:nth-child(2)').textContent.replace('<strong>Effet :</strong> ', '');
        const cooldown = skillElement.querySelector('.skill-details p:nth-child(3)').textContent.replace('<strong>Cooldown :</strong> ', '');

        skills.push({ nom, description, effet, cooldown });
    });

    localStorage.setItem('nehilostSkills', JSON.stringify(skills));
}

// 5. Gestion du bouton "+"
addSkillBtn.addEventListener('click', () => {
    skillFormContainer.classList.add('active');
});

// 6. Gestion du formulaire
newSkillForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Récupère les valeurs du formulaire
    const nom = document.getElementById('skill-name').value;
    const description = document.getElementById('skill-description').value;
    const effet = document.getElementById('skill-effect').value;
    const cooldown = document.getElementById('skill-cooldown').value;

    // Crée un objet compétence
    const newSkill = {
        nom: nom,
        description: description,
        effet: effet,
        cooldown: cooldown
    };

    // Ajoute la compétence au DOM
    addSkillToDOM(newSkill);

    // Sauvegarde toutes les compétences (y compris les nouvelles)
    saveSkills();

    // Réinitialise le formulaire
    newSkillForm.reset();
    skillFormContainer.classList.remove('active');
});

// 7. Gestion du bouton Annuler
cancelSkillBtn.addEventListener('click', () => {
    newSkillForm.reset();
    skillFormContainer.classList.remove('active');
});

// 8. Charge les compétences au démarrage
loadSkills();
    
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
