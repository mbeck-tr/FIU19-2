// Web Storage

// Anzahl Elemente
console.log("Elemente: " + sessionStorage.length);

// Storage löschen
sessionStorage.clear();

// Speichern eines Elementes
sessionStorage.setItem('firstname','Max');
sessionStorage.setItem('lastname','Mustermann');

let user = {
    firstname: 'Max',
    lastname: 'Mustermann'
}

sessionStorage.setItem('user',JSON.stringify(user));

console.log("Elementanzahl: " + sessionStorage.length);

var vorname = sessionStorage.getItem('firstname');
var nachname = sessionStorage.getItem('lastname');

user = JSON.parse(sessionStorage.getItem('user'));


document.getElementById('output').innerHTML = vorname + " " + nachname + "<br/>" + 
                                                user.firstname + " " + user.lastname;


sessionStorage.removeItem('firstname');

function save(){
    var v = document.getElementById('txtName').value;
    sessionStorage.setItem('firstname', v);
    var div = document.getElementById('output');
    div.innerHTML = div.innerHTML + "<br>" + sessionStorage.getItem('firstname');
}