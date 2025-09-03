const navItems = document.querySelectorAll('nav-item');
const indicator = document.querySelector('.indicator');

navItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        //Supprimer la classe active de tous les elements
        navItems.forEach((item) => item.classList.remove('active'));

        //ajoute la classe active a l'element selectionne
        item.classList.add('active');

        //Calcule la position de l'element clique
        const left = item.offsetLeft;
        const width = item.offsetWidth;

        //Mettre a jour la position  de l'indicateur
        indicator.style.left = `${left}px`;
        indicator.style.width = `${width}px`;
    });
});


const typedTextSpan = document.querySelector(".typed-text");
const cursorSpan = document.querySelector(".cursor");

const textArray = [
    "passione",
    "curieux",
    "developpeur",
    "administrateur",
    "ingenieur",
    "informaticien."
]

const typingDelay = 200;
const erasingDelay = 100;
const newTextDelay = 2000;

let textArrayIndex = 0;
let charIndex = 0;

function type(){
    if(charIndex < textArray[textArrayIndex].length){
        //textArray[textArrayIndex] permet de selectionner un mot dans le tableau
        //.length d'obtenir la longueur de ce mot
        if(!cursorSpan.classList.contains("typing")){
            cursorSpan.classList.add("typing");
        }
        typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
        charIndex ++;
        setTimeout(type, typingDelay)
    }else{
        cursorSpan.classList.remove("typing");
        setTimeout(erase, newTextDelay)
    }
}

function erase(){
    if(charIndex > 0){
        if(!cursorSpan.classList.contains("typing")){
            cursorSpan.classList.add("typing");
        }
        typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex-1)
        charIndex--;
        setTimeout(erase, erasingDelay);
    }else{
        cursorSpan.classList.remove("typing");
        textArrayIndex++;
        if(textArrayIndex >= textArray.length){
            textArrayIndex = 0;
        }
        setTimeout(type, typingDelay + 1100)
    }
}

//Lorsque le DOM est charge
document.addEventListener("DOMContentLoaded", function(){
    if(textArray.length){
        setTimeout(type, newTextDelay + 250)
    }
})

//Responsive
const menu_toggle = document.querySelector(".menu_toggle")
const navigation = document.querySelector(".navigation")
const header = document.querySelector("header")

menu_toggle.onclick = function(){
    menu_toggle.classList.toggle("active")
    header.classList.toggle("responsive")
    header.style.display = 'flex';

}
