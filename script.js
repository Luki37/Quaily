let coopList = [];
let archiveList = [];

const wrapper = document.getElementById("wrapper");

let newCoopList = JSON.parse(localStorage.getItem("coopList"));

console.log(newCoopList);

if (newCoopList !== null) {
  newCoopList.forEach((coopElement) => {
    const coopDash = document.createElement("div");
    coopDash.classList.add("coop");
    const coopID = coopElement.id;
    const coopName = coopElement.name;
    const link = document.createElement("a");
    link.classList.add("coopTitle");
    link.innerText = coopName;
    link.href = "#";
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

    inputBlock.appendChild(inputField);
    inputBlock.appendChild(eggBtn);

    coopDash.appendChild(link);
    coopDash.appendChild(inputBlock);
    coopDash.appendChild(checklist);

    wrapper.appendChild(coopDash);
  });
}

function saveCoopListToLocalstorage() {
  localStorage.setItem("coopList", JSON.stringify(coopList));
}
function saveArchiveListToLocalstorage() {
  localStorage.setItem("archiveList", JSON.stringify(archiveList));
}

/*neue html seite erschaffen für neuen Stall*/
function addNewPage() {}

/*Stall im Dashboard anlegen*/
function createCoopDashboard() {
  if (newCoopList !== null) {
    coopList = newCoopList;
  }

  const coopDash = document.createElement("div");
  coopDash.classList.add("coop");
  const coopID = (coopDash.id = Date.now());
  const coopName = prompt("Name für den Stall eingeben");
  const link = document.createElement("a");
  link.classList.add("coopTitle");
  link.innerText = coopName;
  link.href = "#";
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

  inputBlock.appendChild(inputField);
  inputBlock.appendChild(eggBtn);

  coopDash.appendChild(link);
  coopDash.appendChild(inputBlock);
  coopDash.appendChild(checklist);

  wrapper.appendChild(coopDash);

  return { name: coopName, id: coopID };
}

/*Funktion neuen Stall hinzufügen*/
function addCoop() {
  const newDetails = addNewPage();
  const newCoop = createCoopDashboard();

  const coopElement = {
    name: newCoop.name,
    id: newCoop.id,
    /* eggsDay: ,
    eggsTotal: ,
    eggsAverage: ,
    startDate: ,
    endDate: , */
  };

  coopList.push(coopElement);
  console.log(coopList);

  saveCoopListToLocalstorage();
}

/*Eier hinzufügen*/
function addEggs() {}

/*Ausmisten zurücksetzen*/
function clean() {}

/*Füttern zurücksetzen*/
function feed() {}

/*Licht einschalten zurücksetzen*/
function lightOn() {}

/*Licht ausschalten zurücksetzen*/
function lightOff() {}

/*Archiv anzeigen*/
function archive() {}

/*Funktionen für die Unterseiten*/

/*Wachtel hinzufügen*/
function plusQuail() {}

/*Wachtel ausstallen*/
function minusQuail() {}

/*Alles Ausstallen*/
function emptyCoop() {}
