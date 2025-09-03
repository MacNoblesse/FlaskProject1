// const imageUrl = "{{ url_for('static', filename='img/imaC.jpg') }}"

// const objets = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
// //const objets = ['A', 'B'];
// const objetsDoubles = objets.concat(objets);

// function shuffle(array) { //Pour melanger les lettres du tableau
//     for(let i = array.length -1; i > 0; i--){
//         const j = Math.floor(Math.random() * (i + 1));
//         [ array[i], array[j] ]= [array[j], array[i]];
//     }
// }
// shuffle(objetsDoubles);

// const memoryGame = document.getElementById('memory-game');

// objetsDoubles.forEach(objet => {
//     const card = document.createElement('div');
//     card.classList.add('card');
//     card.dataset.card = objet; //Attribuer une lettre a la carte (mettre une donnee(lettre) dans card)
//     card.addEventListener("click", handleCardClick);
    
//     const cardInner = document.createElement('div');
//     cardInner.textContent = objet; // objet ce sont les lettres
//     cardInner.style.backgroundImage = `url(${imageUrl})`;
//     cardInner.classList.add('card-inner');
    
//     card.appendChild(cardInner);
//     memoryGame.appendChild(card);
// });

// //Logique
// let selectedCards = [];
// let attemps = 0;
// function handleCardClick(){
//     if(selectedCards.length < 2 && !this.classList.contains('flipped') ){ /*Verifier si l'utilisateur a selectionne 2 elemts et si la carte n'est pas retourne*/
//         this.classList.add("flipped");
//         selectedCards.push(this);
        
//         if(selectedCards.length === 2){
//             setTimeout( () => {
//                 const [firstCard, secondCard] = selectedCards; /*On affecte a selcted card les deux cartes choisies*/
//                 if(firstCard.dataset.card === secondCard.dataset.card){ /* si les deux cartes correspondent (dataset pour recuperer le contenu de card)*/
                    
//                     firstCard.classList.add('matched'); // ajouter la classe matched a la premiere carte
//                     secondCard.classList.add('matched');
//                     checkwin();
//                 }else{
//                     firstCard.classList.remove('flipped');
//                     secondCard.classList.remove('flipped');
//                 }
//                 selectedCards = []; //Reinitialise le tableau apres les deux cartes choisies
//         attemps++;
//         document.getElementById("attemps").textContent = "Nombre de tentatives : " + attemps + "";
                    
//             },1000)
            
//         }
        
        
//     }
// }
// function checkwin(){
//     const matchedcards = document.querySelectorAll('.matched');
    
//     if(matchedcards.length === objets.length * 2 ){ //verifier si les cartes sont toute (2 pour 4 elements (A,B *2))
//         document.getElementById('message').textContent = "Felicitation ! Vous avez gagne !";
//     }
// }
