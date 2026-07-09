let coopList = [];
let archiveList = [];

const wrapper = document.getElementById("wrapper");

let newCoopList = JSON.parse(localStorage.getItem("coopList"));

function saveCoopListToLocalstorage() {
  localStorage.setItem("coopList", JSON.stringify(coopList));
}
function saveArchiveListToLocalstorage() {
  localStorage.setItem("archiveList", JSON.stringify(archiveList));
}

if (newCoopList !== null) {
  newCoopList.forEach((coopElement) => {
    const coopName = coopElement.name;
    const coopID = coopElement.id;
    createCoop(coopName, coopID);
  });
}

function addCoop() {
  const coopName = prompt("Name für den Stall eingeben");
  if (coopName === null) {
    return;
  }
  const coopID = Date.now();
  createCoop(coopName, coopID);

  const coopElement = {
    name: coopName,
    id: coopID,
    /* eggsDay: ,
    eggsTotal: ,
    eggsAverage: ,
    startDate: ,
    endDate: , */
  };

  coopList.push(coopElement);
  console.log(coopList);

  saveCoopListToLocalstorage();

  return { coopName: coopName, coopID: coopID };
}

function createCoop(coopName, coopID) {
  if (newCoopList !== null) {
    coopList = newCoopList;
  }
  const coopDash = document.createElement("div");
  coopDash.classList.add("coop");
  const coopTitle = document.createElement("p");
  coopTitle.classList.add("coopTitle");
  coopTitle.innerText = coopName;
  const toggleBtn = document.createElement("button");
  toggleBtn.classList.add("toggleBtn");
  toggleBtn.innerText = "v";
  toggleBtn.id = "toggleBtn";
  const inputBlock = document.createElement("div");
  inputBlock.classList.add("inputBlock");
  const inputField = document.createElement("input");
  inputField.classList.add("inputField");
  inputField.placeholder = "Eier";
  const eggBtn = document.createElement("button");
  eggBtn.classList.add("eggBtn");
  eggBtn.innerText = "Speichern";
  eggBtn.onclick = addEggs;
  const checklist = document.createElement("div");
  checklist.classList.add("checklist");

  const hiddenDiv = document.createElement("div");
  hiddenDiv.classList.add("hidden");
  hiddenDiv.id = "hiddenDiv";
  const counting = document.createElement("div");
  counting.classList.add("counting");
  const minusOneQuail = document.createElement("button");
  minusOneQuail.classList.add("countBtn");
  minusOneQuail.onclick = minusQuail;
  minusOneQuail.innerText = "-";
  const countQuail = document.createElement("span");
  countQuail.id = "countQuail";
  countQuail.innerText = "0 Wachteln";
  const plusOneQuail = document.createElement("button");
  plusOneQuail.classList.add("countBtn");
  plusOneQuail.onclick = plusQuail;
  plusOneQuail.innerText = "+";
  const eggsToday = document.createElement("p");
  eggsToday.id = "eggsToday";
  eggsToday.innerText = "Eier heute total: 0";
  const eggsTotal = document.createElement("p");
  eggsTotal.id = "eggsTotal";
  eggsTotal.innerText = "Total gesammelte Eier: 0";
  const averageEggPerDay = document.createElement("p");
  averageEggPerDay.id = "averageEggPerDay";
  averageEggPerDay.innerText = "Tagesdurchschnitt Eier: 0";
  const empty = document.createElement("button");
  empty.classList.add("empty");
  empty.onclick = emptyCoop;
  empty.innerText = "Ausstallen und archivieren";

  inputBlock.appendChild(inputField);
  inputBlock.appendChild(eggBtn);

  counting.appendChild(minusOneQuail);
  counting.appendChild(countQuail);
  counting.appendChild(plusOneQuail);

  hiddenDiv.appendChild(counting);
  hiddenDiv.appendChild(eggsToday);
  hiddenDiv.appendChild(eggsTotal);
  hiddenDiv.appendChild(averageEggPerDay);
  hiddenDiv.appendChild(empty);

  coopDash.appendChild(coopTitle);
  coopDash.appendChild(inputBlock);
  coopDash.appendChild(checklist);
  coopDash.appendChild(toggleBtn);
  coopDash.appendChild(hiddenDiv);

  wrapper.appendChild(coopDash);
}

/*toggle Funktion um Details anzuzeigen */

const toggleButtons = document.querySelectorAll("#toggleBtn");

toggleButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // Findet das direkt dazugehörige Inhalts-Div
    // (Beispiel: Das nächste Element im HTML nach dem Button)
    const content = button.nextElementSibling;

    if (content) {
      content.classList.toggle("hidden");
    }
  });
});

/*Eier hinzufügen*/
function addEggs() {}

/*Ausmisten zurücksetzen*/
function clean() {}

/*Archiv anzeigen*/
function archive() {}

/*Wachtel hinzufügen*/
function plusQuail() {}

/*Wachtel ausstallen*/
function minusQuail() {}

/*Alles Ausstallen*/
function emptyCoop() {}

/*Füttern zurücksetzen*/
function feed() {}

/*Licht einschalten zurücksetzen*/
function lightOn() {}

/*Licht ausschalten zurücksetzen*/
function lightOff() {}
