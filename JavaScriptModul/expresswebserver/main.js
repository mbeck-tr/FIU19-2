var express = require('express');
var app = express();
var formidable = require('formidable');
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

app.post("/PostHello", function(anfrage,antwort){
    if (anfrage.method.toLowerCase() == 'post'){
        var form = formidable.IncomingForm();
        form.parse(anfrage, function (err, attribute){
            antwort.writeHead(200, {'Content-Type': 'text/html'});
            antwort.write('Hello ' + attribute.BenutzerName + "!<br/>");
            antwort.end("Have a POST great day!");
            console.log("Handled request from " + attribute.BenutzerName);
        });
    }
});

var port = 8000;
app.listen(port);
console.log("Listening on port: " + port);