// WebAPI
// REST - Representational State Transfer

// Standard HTTP-Operationen (GET, POST, PUT, DELETE) 
// werden auf CRUD - Operationen gemapped (Create, Read, Update, Delete)


// Beispiel
// HTTP-Get

// Kunde mit KdNr 5 abrufen
// http://localhost:80/Customer/5

// Fzg mit Fzgnr ABC123
// http://localhost/Vehicle?VIN=ABC123

// Liste der Bestellungen
// http://localhost/Orders -> Liste der Bestellungen

// http://locahost/Order/23 -> Bestellung nr 23
// http://localhost/Order?name=Michael
// http://localhost/Orders -> Liste der Bestellungen

// HTTP-Post
// neuen Kunden ändern (Update)
// http://localhost/Customers
// Body: name=Beck&address=123+Bumblebee+Lane

// HTTP-PUT
// neuen Kunden hinzufuegen (Create)
// http://localhost/Customers
// Body: name=Beck&address=123+Bumblebee+Lane
// Beispiel Kunden hinzufuegen über HTTP-POST
// http://localhost/Customers
// Boby: verb=PUT&name=Michael&address=123+Bumblebee+Lane

// HTTP-DELETE
// löschen eines Kunden (Delete)
// http://localhost/Customers
// Body: id=321
// Beispiel löschen eines Fzg über HTTP-GET
// http://localhost/Vehicle?verb=DELETE&VIN=ABC123

// RESTful web service
let express = require("express");
let app = express();
let formidable = require("formidable");

app.use(express.static("./public"));

app.get('/addition', function(request, response){
    let x = Number(request.query.x);
    let y = Number(request.query.y);
    let result = x + y;

    response.writeHead(200, {"Content-Type": "application/json"});
    response.end('{ "result" : ' + result + '}'); // --> {"result" : 30}
    console.log("Handled addition request for x=" + x + ", y=" + y);
});

let port = 8000;
app.listen(port);
console.log("Listening on port: " + port);