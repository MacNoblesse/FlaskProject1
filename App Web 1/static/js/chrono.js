//Les variables
let spans, btn_start, btn_stop, h, mn, sec, ms, t;

//Initialiser les variables
window.onload = function(){
    spans = document.querySelectorAll("span");
    btn_start = document.getElementById("start");
    btn_stop = document.getElementById("stop");
    t;
    h = mn = sec = ms = 0;
}
//formater l'affichage
    function format(valeur, digit = 2){
      return String(valeur).padStart(digit, "0")
    }
//Fonction pour mettre a jour le chronometre
function updateChrono(){
    ms += 1;
    if(ms == 100){
        ms = 0;
        sec += 1;
    }
    if(sec == 60){
        sec = 0;
        mn += 1;
    }
    if(mn == 60){
        mn = 0;
        h += 1;
    }

    
    //Inserer les valeurs dans les spans
    spans[0].innerHTML = format(h) + "h";
    spans[1].innerHTML = format(mn) + "min";
    spans[2].innerHTML = format(sec) + "s";
    spans[3].innerHTML = format(ms) + "ms";
}

//La fonction Start
function Start(){
    t = setInterval(updateChrono, 10);
    btn_start.disabled = true;
}

//La fonction Stop
function Stop(){
    clearInterval(t);
    btn_start.disabled = false;
}
function Reset(){
    clearInterval(t);
    btn_start.disabled = false;
    h = mn = sec = ms = 0;
    spans[0].innerHTML = format(h) + "h";
    spans[1].innerHTML = format(mn) + "min";
    spans[2].innerHTML = format(sec) + "s";
    spans[3].innerHTML = format(ms) + "ms";
}


//Minuteur
let intervalId = null;
    let totalMs = 0;
    let remainingMs = 0;
    let targetTime = 0;
    let enCours = false;

    const btnStart = document.getElementById("commencer");
    const affichage = document.getElementById("affiche");
    const progress = document.getElementById("progress");
    const sonFin = document.getElementById("sonFin");

    function msFromInputs() {
      const m = parseInt(document.getElementById("minutes").value) || 0;
      const s = parseInt(document.getElementById("secondes").value) || 0;
      return (m * 60 + s) * 1000;
    }

    function formatMS(ms) {
      if (ms <= 0) return "00:00";
      const totalSec = Math.ceil(ms / 1000);
      const mm = Math.floor(totalSec / 60);
      const ss = totalSec % 60;
      return String(mm).padStart(2, "0") + ":" + String(ss).padStart(2, "0");
      //texte.padStart(longueur, caractere): Ajoute un certain nombre de fois un caractere en debut d'une chaine
    }

    function updateUI() {
      affichage.textContent = formatMS(remainingMs);
      if (totalMs > 0) {
        progress.value = ((totalMs - remainingMs) / totalMs) * 100;
      } else {
        progress.value = 0;
      }
    }

    function clearRunningInterval() {
      if (intervalId !== null) {
        clearInterval(intervalId);
        intervalId = null;
      }
    }

    function startLoop() {
      clearRunningInterval();
      targetTime = Date.now() + remainingMs;
      intervalId = setInterval(() => {
        remainingMs = targetTime - Date.now();
        if (remainingMs <= 0) {
          clearRunningInterval();
          remainingMs = 0;
          enCours = false;
          btnStart.textContent = "Commencer";
          affichage.textContent = "⏰ Terminé !";
          progress.value = 100;
          sonFin.play(); // jouer le son
          return;
        }
        updateUI();
      }, 200);
    }

    btnStart.addEventListener("click", () => {
      if (!enCours && remainingMs === 0) {
        // Premier démarrage
        totalMs = msFromInputs();
        if (totalMs <= 0) {
          affichage.textContent = "⚠️ Entrez un temps valide !";
          return;
        }
        remainingMs = totalMs;
        updateUI();
        startLoop();
        enCours = true;
        btnStart.textContent = "Pause";
      }
      else if (enCours) {
        // Pause
        clearRunningInterval();
        remainingMs = Math.max(0, targetTime - Date.now());
        enCours = false;
        btnStart.textContent = "Continuer";
        updateUI();
      }
      else {
        // Continuer
        if (remainingMs > 0) {
          startLoop();
          enCours = true;
          btnStart.textContent = "Pause";
        }
      }
    });

    function Recommencer() {
      clearRunningInterval();
      totalMs = msFromInputs();
      if (totalMs <= 0) {
        affichage.textContent = "--:--";
        btnStart.textContent = "Commencer";
        remainingMs = 0;
        enCours = false;
        progress.value = 0;
        return;
      }
      remainingMs = totalMs;
      updateUI();
      startLoop();
      enCours = true;
      btnStart.textContent = "Pause";
    }

    function Arreter() {//http://localhost:5173/
      clearRunningInterval();
      remainingMs = 0;
      enCours = false;
      affichage.textContent = "--:--";
      btnStart.textContent = "Commencer";
      progress.value = 0;
    }

    // Initialisation
    updateUI();