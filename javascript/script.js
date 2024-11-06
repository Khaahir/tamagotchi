let hunger = localStorage.getItem("hunger");
const maxHunger = 100;
let energy = localStorage.getItem("energy");
let maxEnergy = 100;

let wellbeing = localStorage.getItem("wellbeing");
const maxWellbeing = 100;
let energytimer;
let hungertimer;
let wellbeingtimer;
let sleeptimer;
let blinktimer;
let blobname = "Thior";
let isactive = true;
let hungerbar = document.querySelector(".hunger");
let energybar = document.querySelector(".energy");
let wellbeingbar = document.querySelector(".wellbeing");
const foodbtn = document.querySelector(".food");
const playbtn = document.querySelector(".play");
const sleepbtn = document.querySelector(".sleep");
const reset = document.querySelector(".new-game");
const goToWork = document.querySelector (".work")
const blobbody = document.querySelector(".blob-body");
allbtns = document.querySelector(".btn-continer");
const eye1 = document.querySelector(".eye-one");
const eye2 = document.querySelector(".eye-two");
const info = document.querySelector(".info");
const info2 = document.querySelector(".info2");
const info3 = document.querySelector(".info3");
const sleeping = document.querySelector(".sleeping");

function blobHunger() {
  if (hunger <= 0) {
    blobbody.style.display = "none";
    info.textContent = "DIN DJURPLÅGARE HAN DOG";
    energy = 0;
    wellbeing = 0;
  } else if (hunger <= 20) {
    info.textContent = `Det är tid att ge  ${blobname}  mat annars dör ${blobname}`;
    blobbody.style.borderColor = "red";
    blobbody.style.backgroundColor = "red";
  } else if (hunger <= 40) {
    info.style.textContent = `${blobname}Börjar bli hungrig nu!!`;
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
}

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

foodbtn.addEventListener("click", function () {
  if (hunger <= 99) {
    hunger += 5;
    blobHunger();
    console.log(hunger);
  } else {
    foodbtn.style.display = "none";
  }
  if (hunger > maxHunger) {
    hunger === 100;
  }
});

playbtn.addEventListener("click", function () {
  if (wellbeing <= 99) {
    wellbeing += 5;
    blobWellbeing();
  } else {
  }
});

function blobishungry() {
  hunger--;

  if (hunger <= 0) {
    clearInterval(hungertimer);
    clearInterval(wellbeingtimer);
    clearInterval(energytimer);
  }
  if (hunger < 100) {
    foodbtn.style.display = "block";
  }
  blobHunger();
}

function blobfeelinggood() {
  wellbeing--;
  blobWellbeing();
  if (wellbeing <= 0) {
  }
}

function blobNeedToSleep() {
  energy--;
  blobEnergy();
  if (energy <= 0) {
  }
}
function blobOpenEyes() {
  eye1.style.backgroundColor = "white";
  eye2.style.backgroundColor = "white";
  allbtns.classList.toggle("hidden");
  sleeping.style.display = "none";
  energy = maxEnergy;
}

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

function blobblinking() {
  eye1.classList.toggle("move");
  eye2.classList.toggle("move");
  blobbody.classList.toggle("move");
}


goToWork.addEventListener(function(){
  if()
})

reset.addEventListener(function () {
  resetgame = prompt("Vill du starta om ?  (yes or no)").toLowerCase;
  if ((resetgame = "no")) {
  } else {
  }
});




if (isactive) {
  blobEnergy();
  blobHunger();
  blobWellbeing();
  wellbeingtimer = setInterval(blobfeelinggood, 8300000); //3600000
  hungertimer = setInterval(blobishungry, 88000); //1800000
  energytimer = setInterval(blobNeedToSleep, 88000); //3600000
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
  infotimer = setInterval(function () {
    if (info.style.display === "none") {
      info.style.display = "block";
    } else {
      info.style.display = "none";
    }
  }, 8000);
}
