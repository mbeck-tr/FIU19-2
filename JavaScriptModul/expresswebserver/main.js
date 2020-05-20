var express = require('express');
var app = express();

//Http Verben:
//Http-Get  --> Anfrage an den Server
//Http-Post --> Datenübermittlung an den Server

app.use(express.static('./public'));

// app.get('/',function(anfrage,antwort){
//     antwort.send('Hello World');
// });

app.get("/SubmitHello", function (anfrage,antwort){
    antwort.writeHead(200, {'Content-Type':'text/html'});
    antwort.write('Hallo ' + anfrage.query.BenutzerName + "!<br/>");
    antwort.end("Have a great day!");
    console.log("Handled request from " + anfrage.query.BenutzerName);
});

var port = 8000;
app.listen(port);
console.log("Listening on port: " + port);