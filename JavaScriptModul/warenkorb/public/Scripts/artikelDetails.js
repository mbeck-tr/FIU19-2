const urlParams = new URLSearchParams(window.location.search);
const myParam = urlParams.get("id");
console.log(myParam);

let artikelliste = [];
let einkaufskorb = [];

einkaufskorb = JSON.parse(sessionStorage.getItem('einkaufskorb'));
if (!einkaufskorb) einkaufskorb = [];
artikelliste = JSON.parse(sessionStorage.getItem('artikelliste'));
let artikel = artikelliste.find((v)=>v.nr == myParam);
document.getElementById('divArtikelDetails').innerHTML = `<strong>Artikelnr:</strong><br>${artikel.nr}<br><strong>Artikelbezeichnung:</strong><br>${artikel.bezeichnung}<br><strong>ArtikelDetails:</strong><br>${artikel.details}<br><strong>Artikelpreis:</strong><br>${artikel.preis}`;

function addArtikel(){
    let menge = document.getElementById('menge').value;
    einkaufskorb.push({artikel: artikel, menge: menge});
    sessionStorage.setItem('einkaufskorb', JSON.stringify(einkaufskorb));
}