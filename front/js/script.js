//AFFICHAGE DES PRODUITS SUR LA PAGE INDEX
//--------------------------------------------------------------------------------------------------
// Fonction qui injecte le contenu de l'API présentant les canapés dans index.html.
const displayKanap = (listKanap) => {

    let kanapsToAdd = '';
    listKanap.forEach(kanap => {

        kanapsToAdd += `
              <a href="./product.html?id=${kanap._id}">
                  <article>
                      <img src="${kanap.imageUrl}" alt="canapé : ${kanap.altTxt}">
                      <h3 class="productName">${kanap.name}</h3>
                      <p class="productDescription">${kanap.description}</p>
                  </article>
              </a>
              `;
    })

    // Selection de la section "items" dans le DOM pour pouvoir lui injecter les données plus facilement.
    const kanapBox = document.getElementById("items");
    kanapBox.innerHTML = kanapsToAdd

};


const run = () => {
    // Méthode Fetch qui récupère les données des canapés dans l'API et renvoie un fichier .json.
    fetch("http://localhost:3000/api/products")
        .then(response => {
            //On vérifie que la promesse est résolue.
            if (response.ok) {
                // SI elle est est résolue alors on récupère le fichier .json qui contient les données.
                return response.json()
            }

            else {
                console.log('Mauvaise réponse du réseau');
            }
        })
        // Le fichier .json est traité et son contenu stocké dans la variable "kanapList".
        .then(kanapList => {

            // Appel des fonctions d'affichage.
            displayKanap(kanapList);
        })
        // On récupère l'erreur dans l'une des requêtes.
        .catch(error => {
            console.log("Il y a eu un problème avec l'opération fetch: " + error.message);
        });

}

run()