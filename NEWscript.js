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
    const anzahlWachteln = coopElement.anzahlWachteln;
    const eggsDay = coopElement.eggsDay;
    const eggsTotal = coopElement.eggsTotal;
    const eggsAverage = coopElement.eggsAverage;
    createCoop(
      coopName,
      coopID,
      anzahlWachteln,
      eggsDay,
      eggsTotal,
      eggsAverage,
    );
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
    anzahlWachteln: 0,
    eggsDay: 0,
    eggsTotal: 0,
    eggsAverage: 0,
    startDate: 0,
    endDate: 0,
  };

  coopList.push(coopElement);
  console.log(coopList);

  saveCoopListToLocalstorage();
  location.reload();

  return { coopName: coopName, coopID: coopID, coopElement: coopElement };
}

function createCoop(
  coopName,
  coopID,
  anzahlWachteln,
  eggsDay,
  eggsTotal,
  eggsAverage,
) {
  if (newCoopList !== null) {
    coopList = newCoopList;
  }

  const coopDash = document.createElement("div");
  coopDash.classList.add("coop");
  coopDash.id = coopID;
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
  eggBtn.id = "addEggs";
  const checklist = document.createElement("div");
  checklist.classList.add("checklist");

  const hiddenDiv = document.createElement("div");
  hiddenDiv.classList.add("hidden");
  hiddenDiv.id = "hiddenDiv";
  const counting = document.createElement("div");
  counting.classList.add("counting");
  const minusOneQuail = document.createElement("button");
  minusOneQuail.classList.add("countBtn");
  minusOneQuail.id = "minusQuail";
  minusOneQuail.innerText = "-";
  const countQuail = document.createElement("span");
  countQuail.id = "countQuail";
  countQuail.innerText = anzahlWachteln;
  const Wachteln = document.createElement("span");
  Wachteln.innerText = "Wachteln";

  const plusOneQuail = document.createElement("button");
  plusOneQuail.classList.add("countBtn");
  plusOneQuail.id = "plusQuail";
  plusOneQuail.innerText = "+";
  const eggsToday = document.createElement("p");
  eggsToday.id = "eggsToday";
  eggsToday.innerText = "Eier heute total: " + eggsDay;
  const allEggs = document.createElement("p");
  allEggs.id = "eggsTotal";
  allEggs.innerText = "Total gesammelte Eier: " + eggsTotal;
  const averageEggPerDay = document.createElement("p");
  averageEggPerDay.id = "averageEggPerDay";
  averageEggPerDay.innerText = "Tagesdurchschnitt Eier: " + eggsAverage;
  const empty = document.createElement("button");
  empty.classList.add("empty");
  empty.onclick = emptyCoop;
  empty.innerText = "Ausstallen und archivieren";

  inputBlock.appendChild(inputField);
  inputBlock.appendChild(eggBtn);

  counting.appendChild(minusOneQuail);
  counting.appendChild(countQuail);
  counting.appendChild(Wachteln);
  counting.appendChild(plusOneQuail);

  hiddenDiv.appendChild(counting);
  hiddenDiv.appendChild(eggsToday);
  hiddenDiv.appendChild(allEggs);
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
const addEggsBtns = document.querySelectorAll("#addEggs");

addEggsBtns.forEach((button) => {
  button.addEventListener("click", () => {
    const boxID = parseInt(button.closest(".coop").id);
    const gefundenesCoop = coopList.find((coop) => coop.id === boxID);
    let content = parseInt(button.previousElementSibling.value);
    gefundenesCoop.eggsDay += content;
    gefundenesCoop.eggsTotal += content;
    saveCoopListToLocalstorage();
    location.reload();
  });
});

/*Ausmisten zurücksetzen*/
function clean() {}

/*Archiv anzeigen*/
function archive() {}

/*Wachtel hinzufügen*/
const plusQuailBtns = document.querySelectorAll("#plusQuail");

plusQuailBtns.forEach((button) => {
  button.addEventListener("click", () => {
    const boxID = parseInt(button.closest(".coop").id);
    const gefundenesCoop = coopList.find((coop) => coop.id === boxID);
    let content = parseInt(
      button.previousElementSibling.previousElementSibling.innerText,
    );
    content += 1;
    button.previousElementSibling.previousElementSibling.innerText = content;
    gefundenesCoop.anzahlWachteln = content;
    saveCoopListToLocalstorage();
  });
});

/*Wachtel ausstallen*/
const minusQuailBtns = document.querySelectorAll("#minusQuail");

minusQuailBtns.forEach((button) => {
  button.addEventListener("click", () => {
    const boxID = parseInt(button.closest(".coop").id);
    const gefundenesCoop = coopList.find((coop) => coop.id === boxID);
    let content = parseInt(button.nextElementSibling.innerText);
    if (content > 0) {
      content -= 1;
      button.nextElementSibling.innerText = content;
      gefundenesCoop.anzahlWachteln = content;
      saveCoopListToLocalstorage();
    } else {
      alert("Hier sind keine negativen Zahlen möglich!");
      return;
    }
  });
});

/*Alles Ausstallen*/
function emptyCoop() {}

/*Füttern zurücksetzen*/
function feed() {}

/*Licht einschalten zurücksetzen*/
function lightOn() {}

/*Licht ausschalten zurücksetzen*/
function lightOff() {}
