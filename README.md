📒 Contact Book - Carnet de Contacts
Application web de gestion de contacts avec interface intuitive et stockage JSON.

📋 Table des matières

Aperçu
Fonctionnalités
Technologies utilisées
Structure du projet
Installation
Utilisation
Architecture technique
API & Endpoints
Améliorations futures


🎯 Aperçu
Contact Book est une application de gestion de contacts développée en HTML/CSS/JavaScript vanilla. Elle permet d'ajouter, visualiser et gérer des contacts via une interface utilisateur moderne avec modal responsive.
Caractéristiques principales :

✅ Ajout de contacts via popup (modal)
✅ Validation en temps réel des formulaires
✅ Stockage des données en JSON (db.json)
✅ Interface responsive avec bordures stylisées
✅ Bouton "Valider" désactivé tant que tous les champs ne sont pas remplis


⚡ Fonctionnalités
1. Affichage des contacts

Tableau avec colonnes : Nom, Prénom, Email
Design épuré avec bordures arrondies oranges
En-tête et footer bleus

2. Ajout de contacts

Bouton + vert dans l'en-tête
Modal (popup) avec formulaire 4 champs :

Nom
Prénom
Email
Téléphone



3. Validation intelligente

Bouton "Valider" grisé par défaut
Activation automatique quand tous les champs sont remplis
Vérification en temps réel (événement input)

4. Stockage JSON

Sauvegarde dans db.json
Génération automatique d'ID unique
Structure normalisée des données


🛠️ Technologies utilisées
TechnologieUtilisationHTML5Structure sémantiqueCSS3Mise en forme + ModalJavaScript (ES6+)Logique métier + DOMJSONStockage des données

📁 Structure du projet
contact-book/
│
├── index.html          # Structure HTML principale
├── note_book.css       # Styles (layout + modal)
├── note_book.js        # Logique JavaScript
└── db.json             # Base de données JSON

🚀 Installation
Prérequis

Navigateur web moderne (Chrome, Firefox, Edge)
Serveur local (Live Server, http-server, etc.)

Étapes

Cloner ou télécharger le projet

bashgit clone https://github.com/votre-username/contact-book.git
cd contact-book
```

2. **Vérifier la structure des fichiers**
```
✓ index.html
✓ note_book.css
✓ note_book.js
✓ db.json

Lancer avec Live Server (VS Code)


Clic droit sur index.html
Sélectionner "Open with Live Server"

OU

Lancer avec http-server (Node.js)

bashnpx http-server
```

5. **Accéder à l'application**
```
http://localhost:5500

💻 Utilisation
Ajouter un contact

Cliquer sur le bouton + vert en haut à droite
La modal s'ouvre avec un formulaire
Remplir les 4 champs obligatoires :

Nom
Prénom
Email (format validé)
Téléphone


Le bouton Valider devient vert
Cliquer sur Valider
Le contact apparaît dans le tableau

Annuler l'ajout

Cliquer sur Annuler (bouton gris)
OU cliquer en dehors de la modal


🏗️ Architecture technique
HTML - Structure sémantique
html<div class="container">
  <!-- Bordure orange arrondie -->
  
  <header class="header">
    <!-- Bandeau bleu : titre + bouton + -->
  </header>
  
  <table class="contacts-table">
    <!-- Tableau avec en-têtes -->
    <tbody id="contacts-list">
      <!-- Zone d'injection des contacts -->
    </tbody>
  </table>
  
  <footer class="footer">
    <!-- Copyright -->
  </footer>
</div>
Points clés :

id="contacts-list" : cible JavaScript pour ajouter des lignes
Balises sémantiques (<header>, <footer>)


CSS - Points importants
1. Bordure principale (conteneur)
css.container {
    max-width: 900px;
    margin: 0 auto;
    border: 3px solid #ff9933;  /* Bordure orange */
    border-radius: 20px;        /* Coins arrondis */
    overflow: hidden;           /* Cache les débordements */
}
2. Modal (popup)
css.modal {
    display: none;              /* Cachée par défaut */
    position: fixed;            /* Fixe sur l'écran */
    background-color: rgba(0, 0, 0, 0.5); /* Fond semi-transparent */
    z-index: 1000;              /* Au-dessus de tout */
}
3. Validation visuelle du bouton
css.btn-validate:disabled {
    background-color: #ccc;     /* Gris quand désactivé */
    cursor: not-allowed;        /* Curseur interdit */
    opacity: 0.6;
}

JavaScript - Logique métier
1. Création dynamique de la modal
javascriptconst modal = document.createElement('div');
modal.className = 'modal';
modal.innerHTML = `
    <div class="modal-content">
        <!-- Formulaire complet -->
    </div>
`;
document.body.appendChild(modal); // J'ajoute au DOM
Pourquoi ? La modal est créée une seule fois au chargement de la page.

2. Validation en temps réel
javascriptfunction checkFormValidity() {
    let allFilled = true;
    
    inputs.forEach(input => {
        if (input.value.trim() === '') {
            allFilled = false; // Un champ vide trouvé
        }
    });
    
    btnValidate.disabled = !allFilled; // Active/désactive le bouton
}

// Je surveille chaque input
inputs.forEach(input => {
    input.addEventListener('input', checkFormValidity);
});
Mécanisme :

Chaque frappe clavier → checkFormValidity()
Si tous les champs remplis → disabled = false (bouton vert)
Sinon → disabled = true (bouton gris)


3. Ouverture/Fermeture de la modal
javascript// Ouverture
btnAdd.addEventListener('click', () => {
    modal.style.display = 'flex'; // Je rends visible
    form.reset();                 // Je vide les champs
    btnValidate.disabled = true;  // Je grise le bouton
});

// Fermeture (clic extérieur)
modal.addEventListener('click', (e) => {
    if (e.target === modal) {     // Si clic sur le fond noir
        modal.style.display = 'none';
    }
});

4. Ajout d'un contact au tableau
javascriptform.addEventListener('submit', (e) => {
    e.preventDefault(); // J'empêche le rechargement
    
    // Je récupère les valeurs
    const nom = document.getElementById('modal-nom').value;
    const prenom = document.getElementById('modal-prenom').value;
    const email = document.getElementById('modal-email').value;
    const phone = document.getElementById('modal-phone').value;
    
    // Je crée une nouvelle ligne
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td>${nom}</td>
        <td>${prenom}</td>
        <td>${email}</td>
    `;
    
    contactsList.appendChild(newRow); // J'ajoute au tableau
    modal.style.display = 'none';     // Je ferme la modal
});

JSON - Structure des données
Format du fichier db.json
json{
  "contacts": [
    {
      "id": "862e",
      "nom": "Dupont",
      "prenom": "Jean",
      "email": "jean.dupont@example.com",
      "phone": "0612345678"
    },
    {
      "id": "6100",
      "nom": "Martin",
      "prenom": "Sophie",
      "email": "sophie.martin@example.com",
      "phone": "0698765432"
    }
  ]
}
Champs :

id : Identifiant unique (4 caractères hexadécimaux)
nom : Nom de famille
prenom : Prénom
email : Adresse email
phone : Numéro de téléphone


🔌 API & Endpoints
Configuration JSON Server (optionnelle)
Si vous souhaitez utiliser JSON Server pour une API REST complète :
bash# Installation
npm install -g json-server

# Lancement
json-server --watch db.json --port 3000
Endpoints disponibles
MéthodeEndpointDescriptionGET/contactsRécupérer tous les contactsGET/contacts/:idRécupérer un contact par IDPOST/contactsAjouter un contactPUT/contacts/:idModifier un contactDELETE/contacts/:idSupprimer un contact
Exemple de requête POST
javascriptfetch('http://localhost:3000/contacts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        id: Math.random().toString(36).substr(2, 4),
        nom: 'Durand',
        prenom: 'Pierre',
        email: 'pierre.durand@example.com',
        phone: '0687654321'
    })
});

🎨 Personnalisation
Changer les couleurs
Bordure principale
css.container {
    border: 3px solid #ff9933; /* Remplacer #ff9933 */
}
Bouton +
css.bouton-add {
    background-color: #90ee90; /* Remplacer #90ee90 */
}
En-tête et footer
css.header, .footer {
    background-color: #66b3ff; /* Remplacer #66b3ff */
}
