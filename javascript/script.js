// en massa local storage hämtnigar som kollar
//om värdet finns annrs hämat vi en standard värde
let hunger = Number(localStorage.getItem("hunger"));
const maxHunger = 100;
let energy = Number(localStorage.getItem("energy"));
let maxEnergy = 100;
let wellbeing = Number(localStorage.getItem("wellbeing"));
let blobmoney = Number(localStorage.getItem("blobmoney"));
// lite variabler
const maxWellbeing = 100;
let energytimer;
let hungertimer;
let wellbeingtimer;
let sleeptimer;
let blinktimer;
let infotimer;
let blobname = "Thoir";
let isactive = true;
// här är lite hämtnigar med DOM
let hungerbar = document.querySelector(".hunger");
let energybar = document.querySelector(".energy");
let wellbeingbar = document.querySelector(".wellbeing");
const foodbtn = document.querySelector(".food");
const playbtn = document.querySelector(".play");
const sleepbtn = document.querySelector(".sleep");
const reset = document.querySelector(".new-game");
const goToWork = document.querySelector(".work");
let money = document.querySelector(".money");
const blobbody = document.querySelector(".blob-body");
const workingText = document.querySelector(".working-text");
allbtns = document.querySelector(".btn-continer");
const eye1 = document.querySelector(".eye-one");
const eye2 = document.querySelector(".eye-two");
const info = document.querySelector(".info");
const info2 = document.querySelector(".info2");
const info3 = document.querySelector(".info3");
const sleeping = document.querySelector(".sleeping");

// en func som sparar stålarna
function updateMoneyDisplay() {
  money.textContent = blobmoney;
  localStorage.setItem("blobmoney", blobmoney);
}

// en hunger func som gär en massa utfall beronde på nivå av hunger .......
function blobHunger() {
  if (hunger <= 0) {
    isactive = false;
    blobbody.classList.add("hidden");
    info.textContent = "DIN DJURPLÅGARE HAN DOG";
    energy = 1;
    wellbeing = 1;
    foodbtn.disabled = true;
    playbtn.disabled = true;
    goToWork.disabled = true;
    sleepbtn.disabled = true;
    info2.classList.add("hidden");
    info3.classList.add("hidden");

    //börja blinka när odjuet är död
    clearInterval(infotimer);
    infotimer = setInterval(() => {
      info.style.display = info.style.display === "none" ? "block" : "none";
    }, 800);

    clearInterval(wellbeingtimer);
    clearInterval(hungertimer);
    clearInterval(energytimer);
    clearInterval(blinktimer);
    clearInterval(info3timer);
    clearInterval(info2timer);
    blobEnergy();
    blobWellbeing();
  } else if (hunger <= 20) {
    info.textContent = `Det är tid att ge ${blobname} mat annars dör ${blobname}`;
    blobbody.style.borderColor = "red";
    blobbody.style.backgroundColor = "red";
  } else if (hunger <= 40) {
    info.textContent = `${blobname} Börjar bli hungrig nu!!`;
    blobbody.style.borderColor = "blue";
    blobbody.style.backgroundColor = "blue";
  } else if (hunger <= 60) {
    info.style.display = "none";
    blobbody.style.borderColor = "green";
    blobbody.style.backgroundColor = "green";
  } else if (hunger <= 80) {
    blobbody.style.borderColor = "brown";
    blobbody.style.backgroundColor = "brown";
  } else {
    blobbody.style.borderColor = "gold";
    blobbody.style.backgroundColor = "gold";
  }
  localStorage.setItem("hunger", hunger);
  hungerbar.textContent = `Hunger : ${hunger}/${maxHunger}`;
  updateMoneyDisplay();
}

// samma här fast energi
function blobEnergy() {
  if (energy <= 20) {
    info2.textContent = `${blobname} är väldigt trött`;
  } else if (energy <= 50) {
    info2.textContent = `${blobname} börjar bli trött`;
  } else if (energy <= 100) {
    info2.textContent = `${blobname} är full av energi`;
  }
  localStorage.setItem("energy", energy);
  energybar.textContent = `Energy: ${energy}/${maxEnergy}`;
}

// och samma är fast för mående
function blobWellbeing() {
  if (wellbeing <= 10) {
    info3.textContent = "😔";
  } else if (wellbeing <= 40) {
    info3.textContent = "😐";
  } else if (wellbeing <= 80) {
    info3.textContent = "😊";
  } else if (wellbeing <= 100) {
    info3.textContent = "😍";
  }
  localStorage.setItem("wellbeing", wellbeing);
  wellbeingbar.textContent = `Wellbeing: ${wellbeing}  /${maxWellbeing}`;
}

// knappen som matar odjuret
foodbtn.addEventListener("click", function () {
  if (hunger <= 99) {
    blobmoney -= 1;
    localStorage.setItem("blobmoney", blobmoney);
    money.textContent = blobmoney;
    hunger += 5;
  } else {
    foodbtn.disabled = true;
  }
  if (blobmoney <= 0) {
    foodbtn.disabled = true;
  }
  if (hunger >= maxHunger) {
    hunger = 100;
  }
  blobHunger();
  updateMoneyDisplay();
});

// vill du busa med odjuret använd denna knapp
playbtn.addEventListener("click", function () {
  if (wellbeing <= 99) {
    wellbeing += 5;
    blobWellbeing();
  }
});

// denna func var engetnligen till för att kallas på så att hunger går ner men det blev lite mer  den kollar också så att hunger inte är 0 samt om hunger stiger ver 100 så kommer knappen försvinna

function blobishungry() {
  hunger--;

  if (hunger <= 0) {
    clearInterval(hungertimer);
    clearInterval(wellbeingtimer);
    clearInterval(energytimer);
  }
  if (hunger < 100) {
    foodbtn.disabled = false;
  }
  blobHunger();
}

// här har jag inte kunnat bestämma mig vad som händer när energi är noll så just nu ingenting
function blobfeelinggood() {
  wellbeing--;
  blobWellbeing();
  if (wellbeing <= 0) {
  }
}

// samma gäller här
function blobNeedToSleep() {
  energy--;
  blobEnergy();
  if (energy <= 0) {
  }
}

// typ en slags reset efter odjuret har sovit
function blobOpenEyes() {
  eye1.style.backgroundColor = "white";
  eye2.style.backgroundColor = "white";
  allbtns.classList.toggle("hidden");
  sleeping.style.display = "none";
  energy = maxEnergy;
}

// tryck på denna knapp så  somnar odjuret en stund ps det går att fixa tiden längst ner ;)
sleepbtn.addEventListener("click", function () {
  eye1.style.backgroundColor = "black";
  eye2.style.backgroundColor = "black";
  allbtns.classList.toggle("hidden");
  sleeping.style.display = "block";
  sleeptimer = setTimeout(function () {
    blobOpenEyes();
    blobEnergy();
  }, 6000);
});

// denna lilla func gär att han hon det den rär på sig
function blobblinking() {
  eye1.classList.toggle("move");
  eye2.classList.toggle("move");
  blobbody.classList.toggle("move");
}

// trött på odjuret skicka ivägen en stund o tjäna lite pengar
goToWork.addEventListener("click", function () {
  blobbody.classList.add("hidden");
  workingText.textContent = `${blobname} is out there getting that 💵`;
  workingText.style.display = "block";
  workingtimer = setTimeout(function () {
    blobbody.classList.remove("hidden");
    workingText.style.display = "none";
    blobmoney += 5;
    energy -= 10;
    localStorage.setItem("blobmoney", blobmoney);
    money.textContent = blobmoney;
    blobEnergy();
    updateMoneyDisplay();
  }, 200);
});

// om du vill bärja om tryck här.
reset.addEventListener("click", function () {
  resetgame = prompt("Vill du starta om ?  (yes or no)").toLowerCase();
  if (resetgame === "yes") {
    isactive = true;
    localStorage.clear();
    hunger = 50;
    wellbeing = 50;
    energy = 50;
    blobmoney = 10;

    // Stop blinking death message
    clearInterval(infotimer);
    info.style.display = "block";
    info2.classList.remove("hidden");
    info3.classList.remove("hidden");

    blobEnergy();
    blobHunger();
    blobWellbeing();
    updateMoneyDisplay();
    blobbody.classList.remove("hidden");
    foodbtn.disabled = false;
    playbtn.disabled = false;
    goToWork.disabled = false;
    sleepbtn.disabled = false;

    timers();
  } else {
  }
});

// om isactive är true kör dessa gottegrisar
if (isactive) {
  blobEnergy();
  blobHunger();
  blobWellbeing();
  timers();
}

// alla timers i en func
function timers() {
  wellbeingtimer = setInterval(blobfeelinggood, 3600000); //3600000
  hungertimer = setInterval(blobishungry, 180000); //1800000
  energytimer = setInterval(blobNeedToSleep, 3600000); //3600000
  blinktimer = setInterval(blobblinking, 1000);
  info3timer = setInterval(function () {
    if (info3.style.display === "none") {
      info3.style.display = "block";
    } else {
      info3.style.display = "none";
    }
  }, 8000);

  info2timer = setInterval(function () {
    if (info2.style.display === "none") {
      info2.style.display = "block";
    } else {
      info2.style.display = "none";
    }
  }, 8000);
}
