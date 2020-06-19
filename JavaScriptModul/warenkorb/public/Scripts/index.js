document.getElementById('btnImport').addEventListener(
    "change",
    importieren,
    false
);
let artikelliste;

init();

function init() {
    // erstelle Artikelliste in SessionStorage
    if (artikelliste = JSON.parse(sessionStorage.getItem('artikelliste'))) {
        console.log("Liste vorhanden")
    } else {
        artikelliste = [{
            nr: "001G453",
            bezeichnung: "Grafikkarte XY",
            details: "Ganz tolle Grafikkarte mit Top Leistung!!!",
            preis: 459.99
        }, {
            nr: "234P352",
            bezeichnung: "CPU 5,6 GHZ",
            details: "Die schnellste Zentraleinheit!!!",
            preis: 989.90
        }, {
            nr: "987R635",
            bezeichnung: "RAM Speicherriegel 3000 32 GB",
            detail: "Speicher zum Hammerpreis",
            preis: 199.00
        }];
        sessionStorage.setItem('artikelliste', JSON.stringify(artikelliste));
    }
    htmlAktualisieren();
}

function htmlAktualisieren() {
    let htmlArtikelListe = "<table><tr><th>Nr</th><th>Bezeichnung</th><th>Preis</th>";
    for (let index = 0; index < artikelliste.length; index++) {
        const element = artikelliste[index];
        htmlArtikelListe = htmlArtikelListe + `<tr><td>${element.nr}</td><td><a href="artikelDetails.html?id=${element.nr}">${element.bezeichnung}</a></td><td>${element.preis}</td></tr>`;
    }
    htmlArtikelListe = htmlArtikelListe + '</table>';
    document.getElementById("divArtikelListe").innerHTML = htmlArtikelListe;
}

function importieren(event) {
    let file = event.target.files[0];
    let reader = new FileReader();
    if (file.type.match('text.*')) {
        reader.onload = (event) => {
            if (reader.result.match(/;/g).length != 3) {
                alert("Falsches Format");
                return;
            }
            let artikelStringArray = reader.result.split(";");
            
            if (!artikelStringArray[0].match(/[0-9]{3}[A-Z][0-9]{3}/)){
                alert("Artikelnummer falsches Format");
                return;
            }
            if (!artikelStringArray[3].match(/[1-9][0-9]{0,3}\.[0-9][0-9]/)){
                alert("Preis falsches Format");
                return;
            }
            let newArtikel = {
                nr: artikelStringArray[0],
                bezeichnung: artikelStringArray[1],
                detail: artikelStringArray[2],
                preis: artikelStringArray[3]
            };
            artikelliste.push(newArtikel);
            sessionStorage.setItem('artikelliste', JSON.stringify(artikelliste));
            htmlAktualisieren();
        }
        reader.readAsText(file);
    }
}
