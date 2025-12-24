// Je récupère les éléments du DOM
const btnAdd = document.querySelector('.bouton-add');
const contactsList = document.getElementById('contacts-list');
const API_URL = 'http://localhost:3000/contacts';

// Je crée la popup (modal) au chargement de la page
const modal = document.createElement('div');
modal.className = 'modal';
modal.innerHTML = `
    <div class="modal-content">
        <div class ="modal-buttons_exit">
            <button type="button" class="btn-cancel">X</button>
        <h2>Ajouter un contact</h2>
        
        <form id="contact-form">
            <div class="form-field">
                <label for="modal-nom">Nom :</label>
                <input type="text" id="modal-nom" required>
            </div>
            
            <div class="form-field">
                <label for="modal-prenom">Prénom :</label>
                <input type="text" id="modal-prenom" required>
            </div>
            
            <div class="form-field">
                <label for="modal-email">Email :</label>
                <input type="email" id="modal-email" required>
            </div>
            
            <div class="form-field">
                <label for="modal-phone">Téléphone :</label>
                <input type="tel" id="modal-phone" required>
            </div>
            
            <div class="modal-buttons">
                
                <button type="submit" class="btn-validate" disabled>Valider</button>
            </div>
        </form>
    </div>
`;
document.body.appendChild(modal);


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
    .catch(err => console.error('Erreur chargement contacts', err));



// Je récupère les éléments de la modal
const form = document.getElementById('contact-form');
const btnCancel = document.querySelector('.btn-cancel');
const btnValidate = document.querySelector('.btn-validate');
const inputs = form.querySelectorAll('input');

// Fonction pour vérifier si tous les champs sont remplis
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

// Je surveille chaque input pour vérifier la validité en temps réel
inputs.forEach(input => {
    input.addEventListener('input', checkFormValidity);
});

// Ouverture de la modal au clic sur +
btnAdd.addEventListener('click', () => {
    modal.style.display = 'flex';
    form.reset(); // Je vide les champs
    btnValidate.disabled = true; // Je grise le bouton
});

// Fermeture de la modal au clic sur Annuler
btnCancel.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Fermeture si clic en dehors de la modal
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Soumission du formulaire
form.addEventListener('submit', (e) => {
    e.preventDefault(); // Empêche le rechargement de la page
    
    // Récupération des valeurs du formulaire
    const nom = document.getElementById('modal-nom').value;
    const prenom = document.getElementById('modal-prenom').value;
    const email = document.getElementById('modal-email').value;
    const phone = document.getElementById('modal-phone').value;
    
    const newContact = { nom, prenom, email, phone };

    // Envoi des données au serveur (json-server mettra à jour db.json)
    fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newContact)
    })
    .then(res => res.json())
    .then(contact => {
        // Création d'une ligne dans le tableau
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td>${contact.nom}</td>
            <td>${contact.prenom}</td>
            <td>${contact.email}</td>
        `;
        contactsList.appendChild(newRow);

        // Fermeture de la modal
        modal.style.display = 'none';

        console.log('Contact ajouté et sauvegardé dans db.json :', contact);
    })
    .catch(err => console.error('Erreur ajout contact', err));
});
