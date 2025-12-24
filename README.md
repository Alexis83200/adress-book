# 📒 Contact Book - Carnet de Contacts

Application web de gestion de contacts avec interface responsive et API REST.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

---

## 📋 Table des matières

- [Aperçu](#-aperçu)
- [Fonctionnalités](#-fonctionnalités)
- [Structure du projet](#-structure-du-projet)
- [Utilisation](#-utilisation)
- [Architecture technique](#️-architecture-technique)
- [API REST](#-api-rest)
- [Personnalisation](#-personnalisation)

---

## 🎯 Aperçu

**Contact Book** est une application web moderne de gestion de contacts développée en JavaScript vanilla. Elle utilise une API REST (JSON Server) pour la persistance des données et offre une interface utilisateur intuitive avec modal de saisie.

### Caractéristiques principales

✅ Interface responsive avec design moderne  
✅ Ajout de contacts via popup (modal)  
✅ Validation en temps réel des formulaires  
✅ Persistance des données (JSON Server)  
✅ Emails cliquables (mailto:)  
✅ Chargement automatique des contacts au démarrage  

---

## ⚡ Fonctionnalités

### 1. Affichage dynamique des contacts
- Tableau avec colonnes : **Nom**, **Prénom**, **Email**
- Design épuré avec bordures arrondies oranges
- Effet hover sur les lignes du tableau
- Liens emails cliquables

### 2. Ajout de contacts
- Bouton **+** vert dans l'en-tête
- Modal (popup) avec formulaire 4 champs :
  - Nom (text)
  - Prénom (text)
  - Email (validation HTML5)
  - Téléphone (tel)

### 3. Validation intelligente
- Bouton "Valider" **grisé** par défaut
- Activation automatique quand tous les champs sont remplis
- Vérification en temps réel (événement `input`)
- Empêche la soumission si données manquantes

### 4. Persistance des données
- Sauvegarde automatique dans `db.json`
- Génération d'ID unique par JSON Server
- Rechargement des contacts au démarrage
- API REST complète (GET, POST)

---



## 📁 Structure du projet
```
contact-book/
│
├── index.html              # Page principale
├── db.json                 # Base de données JSON
│
├── CSS/
│   └── note_book.css       # Styles (layout + modal)
│
└── JS/
    └── note_book.js        # Logique JavaScript
```

### Description des fichiers

| Fichier | Description |
|---------|-------------|
| `index.html` | Structure HTML, tableau des contacts |
| `db.json` | Base de données JSON (contacts) |
| `CSS/note_book.css` | Styles CSS (conteneur, modal, tableau) |
| `JS/note_book.js` | Logique JS (fetch, modal, validation) |

---



---

## 💻 Utilisation 



### Utilisation de l'interface

#### 1️⃣ Ajouter un contact

1. Cliquer sur le bouton **+** (vert) en haut à droite
2. La modal s'ouvre avec un formulaire
3. Remplir les 4 champs obligatoires :
   - **Nom** : Dupont
   - **Prénom** : Marie
   - **Email** : marie.dupont@example.com
   - **Téléphone** : 0612345678
4. Le bouton **Valider** devient vert
5. Cliquer sur **Valider**
6. Le contact apparaît dans le tableau

#### 2️⃣ Annuler l'ajout

- Cliquer sur le bouton **X** (rouge) en haut à droite de la modal
- **OU** cliquer en dehors de la modal (sur le fond gris)

#### 3️⃣ Contacter par email

- Cliquer sur un email dans le tableau
- Votre client email par défaut s'ouvre avec le destinataire pré-rempli

---

## 🏗️ Architecture technique

### HTML - Structure sémantique
```html
<div class="container">
  <!-- Bordure orange arrondie -->
  
  <header class="header">
    <!-- Bandeau bleu : "Contact book" + bouton + -->
    <h1>Contact book</h1>
    <button class="bouton-add">+</button>
  </header>
  
  <table class="contacts-table">
    <!-- En-tête du tableau -->
    <thead>
      <tr>
        <th>Nom</th>
        <th>Prénom</th>
        <th>Email</th>
      </tr>
    </thead>
    
    <!-- Zone d'injection des contacts -->
    <tbody id="contacts-list">
      <!-- Les lignes sont ajoutées ici dynamiquement -->
    </tbody>
  </table>
  
  <footer class="footer">
    <!-- Copyright -->
    <p>(c) 2025 - Acme Corp.</p>
  </footer>
</div>
```

**Points clés :**
- `id="contacts-list"` : cible JavaScript pour injecter les contacts
- Balises sémantiques (`<header>`, `<footer>`)
- Structure table (`<thead>`, `<tbody>`)

---

### CSS - Points importants

#### 1. Conteneur principal (bordure orange)
```css
.container {
    max-width: 900px;
    margin: 0 auto;              /* Je centre horizontalement */
    border: 3px solid #ff9933;   /* Bordure orange */
    border-radius: 20px;         /* Coins arrondis */
    overflow: hidden;            /* Cache les débordements */
}
```

---

#### 2. Modal (popup)
```css
.modal {
    display: none;               /* Cachée par défaut */
    position: fixed;             /* Fixe sur l'écran */
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5); /* Fond semi-transparent */
    justify-content: center;
    align-items: center;
    z-index: 1000;               /* Au-dessus de tout */
}
```

**Ouverture/Fermeture :**
```javascript
modal.style.display = 'flex';  // Ouverture
modal.style.display = 'none';  // Fermeture
```

---

#### 3. Bouton X en haut à droite
```css
.modal-buttons_exit .btn-cancel {
    position: absolute;
    top: -20px;
    right: -20px;
    background-color: #ff6b6b;  /* Rouge */
    border-radius: 50%;         /* Cercle */
    width: 35px;
    height: 35px;
}
```

---

#### 4. Validation visuelle du bouton
```css
.btn-validate:disabled {
    background-color: #ccc;     /* Gris quand désactivé */
    cursor: not-allowed;        /* Curseur interdit */
    opacity: 0.6;
}

.btn-validate:hover:not(:disabled) {
    background-color: #40c057;  /* Vert foncé au survol */
}
```

---

### JavaScript - Logique métier

#### 1. Création dynamique de la modal
```javascript
const modal = document.createElement('div');
modal.className = 'modal';
modal.innerHTML = `
    <div class="modal-content">
        <div class="modal-buttons_exit">
            <button type="button" class="btn-cancel">X</button>
        </div>
        <h2>Ajouter un contact</h2>
        <form id="contact-form">
            <!-- Formulaire complet -->
        </form>
    </div>
`;
document.body.appendChild(modal); // J'ajoute au DOM
```

**Pourquoi ?**  
La modal est créée **une seule fois** au chargement de la page, puis affichée/cachée selon les besoins.

---

#### 2. Chargement des contacts au démarrage
```javascript
const API_URL = 'http://localhost:3000/contacts';

// Je charge les contacts existants
fetch(API_URL)
    .then(res => res.json())
    .then(contacts => {
        contacts.forEach(contact => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${contact.nom}</td>
                <td>${contact.prenom}</td>              
                <td><a href="mailto:${contact.email}">${contact.email}</a></td>
            `;
            contactsList.appendChild(row);
        });
    })
    .catch(err => console.error('Erreur chargement :', err));
```

**Flux :**
1. Requête GET vers `/contacts`
2. Récupération du tableau JSON
3. Création d'une ligne `<tr>` pour chaque contact
4. Ajout au `<tbody id="contacts-list">`

---

#### 3. Validation en temps réel
```javascript
function checkFormValidity() {
    let allFilled = true;
    
    // Je vérifie chaque input
    inputs.forEach(input => {
        if (input.value.trim() === '') {
            allFilled = false;
        }
    });
    
    // J'active/désactive le bouton Valider
    btnValidate.disabled = !allFilled;
}

// Je surveille chaque input
inputs.forEach(input => {
    input.addEventListener('input', checkFormValidity);
});
```

**Mécanisme :**
- Chaque frappe clavier → `checkFormValidity()`
- Si **tous les champs remplis** → `disabled = false` (bouton vert)
- Sinon → `disabled = true` (bouton gris)

---

#### 4. Ajout d'un contact (POST)
```javascript
form.addEventListener('submit', (e) => {
    e.preventDefault(); // J'empêche le rechargement
    
    // Je récupère les valeurs
    const nom = document.getElementById('modal-nom').value;
    const prenom = document.getElementById('modal-prenom').value;
    const email = document.getElementById('modal-email').value;
    const phone = document.getElementById('modal-phone').value;
    
    const newContact = { nom, prenom, email, phone };

    // J'envoie au serveur (POST)
    fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newContact)
    })
    .then(res => res.json())
    .then(contact => {
        // Je crée une ligne dans le tableau
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td>${contact.nom}</td>
            <td>${contact.prenom}</td>
            <td><a href="mailto:${contact.email}">${contact.email}</a></td>
        `;
        contactsList.appendChild(newRow);
        
        // Je ferme la modal
        modal.style.display = 'none';
        
        console.log('Contact ajouté :', contact);
    })
    .catch(err => console.error('Erreur ajout :', err));
});
```

**Flux complet :**
1. Utilisateur remplit le formulaire
2. Clic sur **Valider**
3. Envoi POST vers `/contacts`
4. JSON Server génère un ID et sauvegarde dans `db.json`
5. Réponse contient le contact complet (avec ID)
6. Création d'une ligne `<tr>` avec les données
7. Ajout au tableau
8. Fermeture de la modal

---

### JSON - Structure des données

#### Format du fichier `db.json`
```json
{
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
    },
    {
      "nom": "Leclerc",
      "prenom": "Pierre",
      "email": "pierre.leclerc@example.com",
      "phone": "0623456789",
      "id": "a3f4"
    }
  ]
}
```

**Champs :**
- `id` : Identifiant unique (généré par JSON Server)
- `nom` : Nom de famille (string)
- `prenom` : Prénom (string)
- `email` : Adresse email (string)
- `phone` : Numéro de téléphone (string)

> 💡 **Note** : L'ID est généré automatiquement par JSON Server lors d'un POST.

---

## 🔌 API REST

### Configuration JSON Server
```bash
json-server --watch db.json --port 3000
```

**Options :**
- `--watch` : Surveille les changements dans `db.json`
- `--port 3000` : Port du serveur (par défaut 3000)

---

### Endpoints disponibles

| Méthode | Endpoint | Description | Payload |
|---------|----------|-------------|---------|
| `GET` | `/contacts` | Récupérer tous les contacts | - |
| `GET` | `/contacts/:id` | Récupérer un contact par ID | - |
| `POST` | `/contacts` | Ajouter un contact | JSON |
| `PUT` | `/contacts/:id` | Modifier un contact | JSON |
| `PATCH` | `/contacts/:id` | Modifier partiellement | JSON |
| `DELETE` | `/contacts/:id` | Supprimer un contact | - |

---

### Exemples de requêtes

#### GET - Récupérer tous les contacts
```javascript
fetch('http://localhost:3000/contacts')
    .then(res => res.json())
    .then(contacts => console.log(contacts));
```

**Réponse :**
```json
[
  {
    "id": "862e",
    "nom": "Dupont",
    "prenom": "Jean",
    "email": "jean.dupont@example.com",
    "phone": "0612345678"
  }
]
```

---

#### POST - Ajouter un contact
```javascript
fetch('http://localhost:3000/contacts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        nom: 'Durand',
        prenom: 'Marie',
        email: 'marie.durand@example.com',
        phone: '0687654321'
    })
})
.then(res => res.json())
.then(contact => console.log('Créé :', contact));
```

**Réponse :**
```json
{
  "nom": "Durand",
  "prenom": "Marie",
  "email": "marie.durand@example.com",
  "phone": "0687654321",
  "id": "b7c3"
}
```

---

#### DELETE - Supprimer un contact
```javascript
fetch('http://localhost:3000/contacts/b7c3', {
    method: 'DELETE'
})
.then(res => console.log('Supprimé'));
```

---

## 🎨 Personnalisation

### Changer les couleurs

#### 1. Bordure principale (orange → rouge)
```css
.container {
    border: 3px solid #ff3333; /* Rouge */
}
```

#### 2. Bouton + (vert → bleu)
```css
.bouton-add {
    background-color: #3399ff; /* Bleu */
}
```

#### 3. En-tête et footer (bleu → violet)
```css
.header, .footer {
    background-color: #9966ff; /* Violet */
}
```

#### 4. Modal (bleu → gris)
```css
.modal-content {
    background-color: #f0f0f0; /* Gris clair */
}
```







