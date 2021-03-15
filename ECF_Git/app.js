var films = [{
        title: "Deadpool",
        years: 2016,
        authors: "Tim Miller"
    },
    {
        title: "Spiderman",
        years: 2002,
        authors: "Sam Raimi"
    },
    {
        title: "Scream",
        years: 1996,
        authors: "Wes Craven"
    },
    {
        title: "It: chapter 1",
        years: 2019,
        authors: "Andy Muschietti"
    }
];

// récupération de mes éléments statique html
var tbodyElt = document.querySelector('tbody');
var formElt = document.getElementById('form');
var alertElt = document.getElementById('alert');
var filtre = document.getElementById('filtre');


// Création 
var btnForm = document.createElement('button')
btnForm.textContent = 'Ajouter'
btnForm.type = 'button'
btnForm.classList.add('btn')
btnForm.classList.add('btn-primary')

formElt.appendChild(btnForm);


/**
 * Fonction auto appelant permettant d'afficher les films au lancement de la page
 * Ajout des événements sur le filtre et le bouton "ajouter" 
 * @function AutoAppelant
 */
(function () {
    // Affiche les films au démarage
    afficherFilm();

    // Ajout de l'événement sur le filtre lors d'un changement de valeur
    filtre.addEventListener('change', filterBy);

    // Ajout de l'événement sur le bouton "ajouter"
    btnForm.addEventListener('click', afficherForm)

})();

/**
 * Affiche les films dans le tableau
 * @function afficherFilm : 
 */
function afficherFilm() {
    // Met le contenu de mon table a vide 
    tbodyElt.innerHTML = "";

    //Parcours mon tableau de film
    films.forEach(function (film, index) {
        // Création des différents élements nécessaire pour la structure du tableau
        let tr = document.createElement('tr')
        let tdTilte = document.createElement('td');
        let tdYear = document.createElement('td');
        let tdAunthor = document.createElement('td');
        let tdAction = document.createElement('td');
        let btnSupp = document.createElement('button');

        // Ajoute les différents informations des films dans les cellules du tableau
        tdTilte.textContent = film.title;
        tdYear.textContent = film.years;
        tdAunthor.textContent = film.authors;

        // Bouton supprimer
        btnSupp.textContent = "Supprimer";
        btnSupp.dataset.filmId = index;
        btnSupp.classList.add('btn')
        btnSupp.classList.add('btn-danger')

        // Ajout de l'événement click sur le bouton supprimer
        btnSupp.addEventListener('click', supprimerFilm);

        // Affecte les différents éléments enfant a leurs parents
        tdAction.appendChild(btnSupp);
        tr.appendChild(tdTilte);
        tr.appendChild(tdYear);
        tr.appendChild(tdAunthor);
        tr.appendChild(tdAction);
        tbodyElt.appendChild(tr);
    });
}

/**
 * Supprime la ligne du film dans le tableau
 * @function supprimerFilm
 */
function supprimerFilm() {
    // Demande une confirmation de suppression
    let rep = confirm("êtes-vous sur de vouloir supprimer ce film ? ");
    // Si confirme supprime la ligne de mon tableau
    if (rep) {
        // Récupére l'élément parent <tr> et le supprime 
        //tbodyElt.removeChild(this.parentNode.parentNode);
        films.splice(this.dataset.filmId, 1);
        this.parentNode.parentNode.remove();
    }
}

    /**
     * Afficher le formulaire d'ajout de film
     * @function afficherForm
     */
    function afficherForm() {
        // Crée une div pour le formulaire
        divForm = document.createElement('div')
        divForm.classList.add('form-inline')

        // Crée une zone de saisi pour le titre
        let inputTitle = document.createElement('input');
        inputTitle.type = 'text';
        inputTitle.id = 'title';
        inputTitle.placeholder = 'Entrer un titre';
        inputTitle.classList.add('form-control')

        // Crée une zone de saisi pour l'année
        let inputYears = document.createElement('input');
        inputYears.type = 'number';
        inputYears.id = 'years';
        inputYears.placeholder = 'Entrer une année';
        inputYears.classList.add('form-control')

        // Crée une zone de saisi pour le réalisateur
        let inputAuthor = document.createElement('input');
        inputAuthor.type = 'text';
        inputAuthor.id = 'authors';
        inputAuthor.placeholder = 'Entrer un auteur';
        inputAuthor.classList.add('form-control')

        // Crée un bouton pour sauvegarder le film
        btnAjouter = document.createElement('button');
        btnAjouter.textContent = "Save";
        btnAjouter.type = "submit";
        btnAjouter.classList.add('btn')
        btnAjouter.classList.add('btn-success')

        //Ajoute l'événement lors du click sur le bouton Ajouter
        btnAjouter.addEventListener('click', formAdd)

        // Ajoute les éléments du formulaire dans la div
        divForm.appendChild(inputTitle);
        divForm.appendChild(inputYears);
        divForm.appendChild(inputAuthor);
        divForm.appendChild(btnAjouter);

        // Remplace le bouton par le formulaire
        formElt.replaceChild(divForm, btnForm)
    }


    /**
     * Permet d'afficher et de vérifier le formulaire
     * @function formAdd
     */
    function formAdd() {
        // Crée une variable objet pour le film
        // Je parseInt ma date pour l'avoir en type Number
        let form = {
            title: document.getElementById('title').value,
            years: parseInt(document.getElementById('years').value),
            authors: document.getElementById('authors').value
        }

        // Récupére l'année en cours
        let yearsCurrently = new Date().getFullYear();

        // Tableau d'erreur
        let alerts = [];

        // RegExp pour l'année
        let regex = new RegExp('[0-9]{4}');

        // Test la saisi du titre
        if (form.title === null || form.title.length < 2) {
            alerts.push("Le titre dois contenu au minimum 2 caractères");
            //console.log("Le titre dois contenu au minimum 2 caractères");
        }

        if (!regex.test(form.years) || form.years > yearsCurrently) {
            alerts.push("L'année dois être compris entre 1900 et " + yearsCurrently)
            //console.log("L'année dois être compris entre 1900 et " + yearsCurrently)
        }

        // Test la saisi du réalisateur
        if (form.authors === null || form.authors.length < 5) {
            alerts.push("Le nom de l'auteur dois contenu au minimum 5 caractères");
            //console.log("Le nom de l'auteur contenu au minimum 5 caractères");
        }

        // Crée un paragraphe permettant d'afficher tous les erreurs
        var pAlert = document.createElement('p');
        pAlert.innerHTML = "";
        // Test si au moins une erreur a été enregistrer
        if (alerts.length !== 0) {
            // Affiche le message d'erreur
            pAlert.innerHTML += "Une erreur est survenu pour les informations suivantes :"
            // Crée un liste des erreurs
            let ulElt = document.createElement('ul');

            alerts.forEach(alert => {
                liElt = document.createElement('li')
                liElt.innerHTML = alert;
                ulElt.appendChild(liElt);
            });

            pAlert.appendChild(ulElt);
            pAlert.classList.add('alert')
            pAlert.classList.add('alert-danger')
            alertElt.appendChild(pAlert);

            // Supprime l'évenement sur le bouton afin de ne pas pouvoir recliqué
            btnAjouter.removeEventListener('click', formAdd);

            setInterval(function () {
                alerts = []
                alertElt.removeChild(pAlert);
                btnAjouter.addEventListener('click', formAdd)
            }, 3000)

        } else {
            films.push({
                title: capitalize(form.title),
                years: form.years,
                authors: capitalize(form.authors)
            })
            pAlert.innerHTML = "Film enregistrer avec succès";
            pAlert.classList.add('alert')
            pAlert.classList.add('alert-success')
            alertElt.appendChild(pAlert);

            // Ré-affiche le bouton "Ajouter"
            formElt.replaceChild(btnForm, divForm);

            // Affiche le message pendant 3s
            setInterval(function () {
                alertElt.removeChild(pAlert);
            }, 3000)

            //Ré-affiche le tableau avec les nouvelles valeur
            afficherFilm();
        }
    }

    /**
     * Permet de filtrer les films par 
     * @function filterBy
     */
    function filterBy() {
        if (this.value !== "#") {
            if (this.value == "title") {
                films.sort(function (a, b) {
                    var nameA = a.title.toUpperCase();
                    var nameB = b.title.toUpperCase();

                    if (nameA < nameB) {
                        return -1;
                    }
                    if (nameA > nameB) {
                        return 1;
                    }
                    return 0;
                });
            } else if (this.value == "years") {
                films.sort(function (a, b) {
                    return b.years - a.years
                });

            } else {
                console.log("Je n'est pas compris votre demande");
            }
            //Ré-affiche le tableau avec les nouvelles valeur
            afficherFilm();

        }
    }

    /**
     * Permet de mettre la première lettre en majuscule
     * @function capitalize
     * @param {String} str 
     */
    function capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }