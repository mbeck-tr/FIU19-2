let einkaufskorb = [];

einkaufskorb = JSON.parse(sessionStorage.getItem('einkaufskorb'));
if (!einkaufskorb) einkaufskorb = [];

let htmlWarenkorb = "<table><tr><th>Bezeichnung</th><th>Menge</th><th>Preis</th><th>Gesamtpreis</th>";

for (let index = 0; index < einkaufskorb.length; index++) {
    const element = einkaufskorb[index];
    htmlWarenkorb = htmlWarenkorb + `<tr><td>${element.artikel.bezeichnung}</td><td>${element.menge}</td><td>${element.artikel.preis}</td><td>${element.artikel.preis * element.menge}</td></tr>`;

}

document.getElementById('warenkorb').innerHTML = htmlWarenkorb + "</table>";