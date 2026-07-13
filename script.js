let coopList = [];
let archiveList = [];

const wrapper = document.getElementById("wrapper");
const wrapperArchiv = document.getElementById("wrapperArchiv");

let newCoopList = JSON.parse(localStorage.getItem("coopList"));

function saveCoopListToLocalstorage() {
  localStorage.setItem("coopList", JSON.stringify(coopList));
}
function saveArchiveListToLocalstorage() {
  localStorage.setItem("archiveList", JSON.stringify(archiveList));
}

/* fragt ab ob Liste im Localstorage und läd diese, wenn vorhanden*/
if (newCoopList !== null) {
  coopList = newCoopList;
  coopList.forEach((coopElement) => {
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

/* checkt beim neuladen der Seite ob der tägliche 
Eierzähler zurückgesetzt werden soll*/
checkDailyReset();

/* berechnet täglicher durchschnittswert eier*/
if (newCoopList !== null) {
  coopList = newCoopList;
  coopList.forEach((coopElement) => {
    /* rechnet aktuelle Zeit minus startzeit*/
    const pastTime = Date.now() - coopElement.startDate;
    /* teilt durch anzahl Millisekunden pro Tag*/
    const pastDays = Math.ceil(pastTime / (1000 * 60 * 60 * 24));
    /* berechnet Durchschnitt*/
    let average = Number(coopElement.eggsTotal) / pastDays;
    coopElement.eggsAverage = average;

    saveCoopListToLocalstorage();
  });
}

function addCoop() {
  /* öffnet mit prompt ein fenster um Namen zu definieren*/
  const coopName = prompt("Name für den Stall eingeben");
  if (coopName === null) {
    return;
  }
  /* definiert einzigartige ID ahnhand Date.now*/
  const coopID = Date.now();
  createCoop(coopName, coopID);
  /* definiert zeitpunkt für reset täglicher eier*/
  const heuteAbend = new Date();
  heuteAbend.setHours(23, 59, 0, 0);

  /* fügt die für berechnungen relevanten werte dem onjekt für das array hinzu*/
  const coopElement = {
    name: coopName,
    id: coopID,
    anzahlWachteln: 0,
    eggsDay: 0,
    eggsTotal: 0,
    eggsAverage: 0,
    /*gibt die Anzahl der Millisekunden zurück, die zwischen dem 1. Januar 1970 
    (00:00:00 Uhr UTC) und dem in der Variablen heuteAbend gespeicherten 
    Zeitpunkt vergangen sind*/
    dailyEggReset: heuteAbend.getTime(),
    feedReset: Date.now(),
    cleanReset: Date.now(),
    lightsOn: Date.now(),
    lightsOff: Date.now(),
    startDate: Date.now(),
    endDate: 0,
    /* placeholder kann nachträglich wert zugewiesen werden mit: 

    coopList.forEach(coop => {
    if (coop.placeholderCoop1 === undefined) {
        coop.placeholderCoop1 = 1;                    Beispiel neuer Wert = 1
    }
});

saveCoopListToLocalstorage();*/

    placeholder1: 0,
    placeholder2: 0,
    placeholder3: 0,
    placeholder4: Date.now(),
    placeholder5: Date.now(),
    placeholder6: Date.now(),
    placeholder7: [],
    placeholder8: [],
    placeholder9: {},
  };

  coopList.push(coopElement);

  saveCoopListToLocalstorage();
  location.reload();

  /*gibt die elemente für weitere Verwendung ausserhalb der function weiter*/
  return {
    coopName: coopName,
    coopID: coopID,
    coopElement: coopElement,
  };
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
  inputField.inputMode = "numeric";
  inputField.setAttribute("type", "number");
  inputField.setAttribute("min", "0");
  inputField.setAttribute("step", "1");
  const eggBtn = document.createElement("button");
  eggBtn.classList.add("eggBtn");
  eggBtn.innerText = "Speichern";
  eggBtn.id = "addEggs";
  const checklist = document.createElement("div");
  checklist.classList.add("checklist");
  const feedReset = document.createElement("button");
  feedReset.classList.add("feed");
  /* feedReset.classList.add("hidden"); */
  feedReset.innerText = "Füttern";
  const cleanReset = document.createElement("button");
  cleanReset.classList.add("clean");
  cleanReset.classList.add("hidden");
  cleanReset.innerText = "Ausmisten";
  const switchLightOn = document.createElement("button");
  switchLightOn.classList.add("lightOn");
  switchLightOn.classList.add("hidden");
  switchLightOn.innerText = "Beleuchtung installieren";
  const switchLightOff = document.createElement("button");
  switchLightOff.classList.add("lightOff");
  switchLightOff.classList.add("hidden");
  switchLightOff.innerText = "Beleuchtung deinstallieren";

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
  empty.id = "emptyCoop";
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
  coopDash.appendChild(feedReset);
  coopDash.appendChild(cleanReset);
  coopDash.appendChild(switchLightOn);
  coopDash.appendChild(switchLightOff);
  coopDash.appendChild(toggleBtn);
  coopDash.appendChild(hiddenDiv);

  wrapper.appendChild(coopDash);
}

/*toggle Funktion um Details anzuzeigen */
const toggleButtons = document.querySelectorAll("#toggleBtn");

toggleButtons.forEach((button) => {
  button.addEventListener("click", () => {
    /* findet das direkt dazugehörige Inhalts-Div
    (Beispiel: Das nächste Element im HTML nach dem Button) */
    const content = button.nextElementSibling;

    if (content) {
      content.classList.toggle("hidden");
    }
  });
});

/*Eier hinzufügen*/
/* querySelectorAll nimmt alle elemente mit dieser ID.
ACHTUNG: geht nur, weil jeder coop eine einzigartige ID hat, sonst .classname nehmen*/
const addEggsBtns = document.querySelectorAll("#addEggs");
/*geht jeden passenden button durch, dass es auf alle anwendbar ist*/
addEggsBtns.forEach((button) => {
  button.addEventListener("click", () => {
    /*checkt die ID des coop ab*/
    const boxID = parseInt(button.closest(".coop").id);
    const gefundenesCoop = coopList.find((coop) => coop.id === boxID);
    /*addiert den wert des vorherigen elements (inputfield)*/
    let content = parseInt(button.previousElementSibling.value);
    /*prüft dass Eingabefeld nicht leer ist */
    if (isNaN(content)) {
      alert("Eigabe darf nicht leer sein!");
      return;
    } else {
      /*summiert diesen wert zum vorhandenen wert im objekt*/
      gefundenesCoop.eggsDay += content;
      /*definiert dem Objekt ein startdatum für tagesdurchschnitt 
    wenn das erste mal eier dazugefügt werden*/
      if (gefundenesCoop.eggsTotal === 0) {
        gefundenesCoop.startDate = Date.now();
      }
      /*addiert den wert auch zum vorhandenen wert total eier*/
      gefundenesCoop.eggsTotal += content;
      saveCoopListToLocalstorage();
      /*lädt die ganze seite neu um im html zu aktualisieren*/
      location.reload();
    }
  });
});

/*Ausmisten zurücksetzen*/
const cleanBtns = document.querySelectorAll(".clean");

cleanBtns.forEach((button) => {
  const boxID = parseInt(button.closest(".coop").id);
  const gefundenesCoop = coopList.find((coop) => coop.id === boxID);

  if (!gefundenesCoop) return;

  const jetzt = Date.now();
  const zweiWochen = 1000 * 60 * 60 * 24 * 14;
  if (jetzt > gefundenesCoop.cleanReset + zweiWochen) {
    button.classList.remove("hidden");
  } else {
    button.classList.add("hidden");
  }
  button.addEventListener("click", () => {
    button.classList.add("hidden");
    gefundenesCoop.cleanReset = Date.now();
    saveCoopListToLocalstorage();
  });
});

/*Archiv anzeigen*/
function archive() {
  if (archiveList == "") {
    alert("Archiv wurde noch nicht angelegt.");
    return;
  } else {
    return;
  }
}

/*Wachtel hinzufügen*/
/* beschreibung siehe addEggsBtns */
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
/* beschreibung siehe addEggsBtns */
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
const emptyBtns = document.querySelectorAll("#emptyCoop");

emptyBtns.forEach((button, coopElement) => {
  button.addEventListener("click", () => {
    archiveList.push(coopElement);

    alert("Archivierung vorerst noch nicht möglich.");
  });
});

/*Daily Reset Eggs*/
function checkDailyReset() {
  const jetzt = Date.now();
  /*Erstellt einen Zustandsschalter (Flag) mit dem Startwert false. 
  Er merkt sich, ob im Verlauf der Funktion Daten geändert wurden. */
  let listeWurdeGeaendert = false;

  coopList.forEach((coopElement) => {
    /*handelt wenn die aktuelle Zeit (grösser als) die resetzeit überschritten hat*/
    if (jetzt >= coopElement.dailyEggReset) {
      coopElement.eggsDay = 0;
      /*definiert neue resetzeit*/
      const morgenAbend = new Date();
      morgenAbend.setHours(23, 59, 0, 0);
      /*Sicherheitsprüfung: Wenn die berechneten 23:59 Uhr (als Millisekunden) 
      vor oder gleich der aktuellen Zeit jetzt liegen (weil es z. B. schon 23:59:15 Uhr ist), 
      wird der Codeblock ausgeführt. */
      if (morgenAbend.getTime() <= jetzt) {
        /*erhöht das datum mit +1*/
        morgenAbend.setDate(morgenAbend.getDate() + 1);
      }
      /*schreibt die neue resetzeit wieder als millisekunden ins array*/
      coopElement.dailyEggReset = morgenAbend.getTime();
      /*Schaltet das Flag auf true, da an diesem Element Änderungen vorgenommen wurden.*/
      listeWurdeGeaendert = true;
    }
  });
  if (listeWurdeGeaendert) {
    saveCoopListToLocalstorage();
    location.reload();
  }
}

/*Füttern zurücksetzen*/
const feedBtns = document.querySelectorAll(".feed");

feedBtns.forEach((button) => {
  const boxID = parseInt(button.closest(".coop").id);
  const gefundenesCoop = coopList.find((coop) => coop.id === boxID);

  if (!gefundenesCoop) return;

  const jetzt = Date.now();
  const feedCountdown = 1000 * 60 * 60 * 22;
  if (jetzt > gefundenesCoop.feedReset + feedCountdown) {
    button.classList.remove("hidden");
  } else {
    button.classList.add("hidden");
  }
  button.addEventListener("click", () => {
    button.classList.add("hidden");
    gefundenesCoop.feedReset = Date.now();
    saveCoopListToLocalstorage();
  });
});

/*Licht einschalten zurücksetzen*/
const lighOnBtns = document.querySelectorAll(".lightOn");

lighOnBtns.forEach((button) => {
  const boxID = parseInt(button.closest(".coop").id);
  const gefundenesCoop = coopList.find((coop) => coop.id === boxID);

  if (!gefundenesCoop) return;
  /*setzt das jetztige Datum*/
  const jetzt = new Date();
  /*nimmt die Jahreszahl aus dem jeztigen Datum*/
  const aktuellesJahr = jetzt.getFullYear();
  /*definiert Zieldatum(Jahr, Monat, Tag, stunde, Minute): 
  15.SEPTEMBER(!Januar = 0. Monat) 0800 Uhr*/
  const lightOnDate = new Date(aktuellesJahr, 8, 15, 8, 0, 0);

  /* macht Button sichtbar wenn beide bedingungen erfüllt sind:
  das Datum überschritten und der Button im aktuellen Jahr noch nicht gebraucht */
  if (jetzt >= lightOnDate && gefundenesCoop.lightsOn !== aktuellesJahr) {
    button.classList.remove("hidden");
  }

  button.addEventListener("click", () => {
    /* schreibt das aktuelle Jahr in den localstorage, dass der button nur einmal 
    im Jahr erscheint (siehe Bedingung oben) // macht button wieder unsichtbar*/
    gefundenesCoop.lightsOn = aktuellesJahr;
    button.classList.add("hidden");
    saveCoopListToLocalstorage();
  });
});

/*Licht ausschalten zurücksetzen*/
const lighOffBtns = document.querySelectorAll(".lightOff");

lighOffBtns.forEach((button) => {
  const boxID = parseInt(button.closest(".coop").id);
  const gefundenesCoop = coopList.find((coop) => coop.id === boxID);

  if (!gefundenesCoop) return;
  /*setzt das jetztige Datum*/
  const jetzt = new Date();
  /*nimmt die Jahreszahl aus dem jeztigen Datum*/
  const aktuellesJahr = jetzt.getFullYear();
  /*definiert Zieldatum(Jahr, Monat, Tag, stunde, Minute): 
  26.MÄRZ(!Januar = 0. Monat) 0800 Uhr*/
  const lightOnDate = new Date(aktuellesJahr, 2, 26, 8, 0, 0);

  /* macht Button sichtbar wenn beide bedingungen erfüllt sind:
  das Datum überschritten und der Button im aktuellen Jahr noch nicht gebraucht */
  if (jetzt >= lightOnDate && gefundenesCoop.lightsOff !== aktuellesJahr) {
    button.classList.remove("hidden");
  }

  button.addEventListener("click", () => {
    /* schreibt das aktuelle Jahr in den localstorage, dass der button nur einmal 
    im Jahr erscheint (siehe Bedingung oben) // macht button wieder unsichtbar*/
    gefundenesCoop.lightsOff = aktuellesJahr;
    button.classList.add("hidden");
    saveCoopListToLocalstorage();
  });
});
