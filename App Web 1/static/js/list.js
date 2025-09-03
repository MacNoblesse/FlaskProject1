let taches = [];

//Fonction pour ajouter une tache
function ajouterTache(tache) {
    taches.push( {texte: tache, fait: false});
    localStorage.setItem("taches", JSON.stringify(taches)); /*setItem une methode de l'objet localStorage uttilise pour stocker
    le tableau taches sous forme de chaine de caracteres JSON pour conserver les taches meme apres la fermeture de la page
    JSON.stringnify conertit un objet Javascript en une chaine*/

    afficherTaches();
}

//Fonction pour supprimer une tache
function supprimerTache(index){
    taches.splice(index, 1); /*Splice supprime/Ajoute un element du tableau a partir d'une position (index position de debut pour ajouter/supprimer)
    1: position de fin(Le nombre debugger'elements qu'on veut supprimer)*/

    localStorage.setItem("taches", JSON.stringify(taches));
    afficherTaches();
}

//Fonction pour marquer une tache comme faite
function marquerTache(index){
    taches[index].fait = !taches[index].fait;
    localStorage.setItem("taches", JSON.stringify(taches));
    afficherTaches();
}

//Fonction pour afficher les taches
function afficherTaches(){
    let listeTaches = document.getElementById("liste-taches");
    listeTaches.innerHTML = "";
    let tachesStockees = localStorage.getItem("taches");
    if (tachesStockees){
        taches = JSON.parse(tachesStockees); //Parser une chaine et la convertir en objet javascript
        taches.forEach((tache, index) => {
            let li = document.createElement("li");
            let texte = document.createTextNode(tache.texte);
            let bouttonSupprimer = document.createElement("button");
            bouttonSupprimer.textContent = "Suppr";
            bouttonSupprimer.onclick = function(){
                supprimerTache(index);
            }
        let boutonMarquer = document.createElement("button");
        boutonMarquer.textContent = tache.fait ? "Annuler" : "Fait";
        boutonMarquer.onclick = function () {
            marquerTache(index);
        };
        li.appendChild(texte);
        li.appendChild(bouttonSupprimer);
        li.appendChild(boutonMarquer);
        if(tache.fait){
            li.style.textDecoration = "line-through";
        }
        listeTaches.appendChild(li);
    });
}
}

    //Ajouter des evenements pour detecter les interactions des utilisateurs
    document.getElementById("ajouter-tache").addEventListener("click", () =>{
        let tache = document.getElementById("tache").value;
        ajouterTache(tache);
        document.getElementById("tache").value = "";
    });

    //Afficher les donnees stockees
    afficherTaches();