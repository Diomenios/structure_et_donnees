"use strict";

/* ***** actions au chargement de la page ***** */
document.addEventListener('DOMContentLoaded', initPage);                   // dès que la page est chargée (équivalent onload)

function initPage() {
    let formulaireVendeur = document.getElementById("formulaire");
    formulaireVendeur.addEventListener("submit", soumettreRequete);        // lorsque le formulaire est soumis (équivalent onsubmit)
}

/* ***** actions à la soumission du formulaire ***** */
function soumettreRequete(event) {                         // recoit l'évènement, envoyé par addEventListener
    event.preventDefault();                                // bloque l'envoi du formulaire et donc le rafraichissement de la page.

    let formulaire = this;                                 // this est l'élément qui enclenche l'appel à la fonction, soit le formulaire
    envoyerRequete([formulaire.ville.value, formulaire.mois.value, formulaire.objectif.value]);            // récupère l'id du vendeur dans le champ et l'utilise pour envoyer la requête
}

/* ***** appel ajax ***** */
function envoyerRequete(listOfValue) {
    let xhr = new XMLHttpRequest();                                                             // création d'un objet servant à effectuer la requête Ajax
    xhr.open('get', constructUrl(["ville", "mois", "objectifMin"], "http://localhost:80/objectifsVendeurs?" ,listOfValue), true);    // définit le type (get), l'url et l'asynchrone de la requête
      xhr.onload =                                                                                // définit la fonction à exécuter lorsque la réponse arrivera (le callback)
        function traiterReponse() {
            document.querySelector("#footer_table").innerHTML = formatTable(JSON.parse(xhr.responseText));                 // ici, place simplement la réponse dans un élément de la page
        };
    xhr.send();                                                                                 // envoit la requête, lorsqu'elle est bien prête et définie
}

//list et paramValue value doivent avoir la même valeur
function constructUrl(list, url, paramValue){
	let returnString = url;

	for(let e = 0 ; e < list.length-1 ; e++){
		returnString += list[e] + "=" + paramValue[e] + "&";
	}
	returnString += list[list.length-1] + "=" + paramValue[list.length-1];

	return returnString;
}

function formatTable(list){
  let table = "<table> <tr> <th> id </th> <th> nom </th> <th> prenom </th>" +
   "<th> mois </th> <th> objectif </th> </tr>";

   for(let e of list){
     table += "<tr> <td>" + e.id + "</td> <td>"+ e.nom + "</td> <td>"+ e.prenom +
              "</td> <td>"+ e.mois + "</td> <td>"+ e.objectif + "</td> </tr>";
   }

   return table;
}
