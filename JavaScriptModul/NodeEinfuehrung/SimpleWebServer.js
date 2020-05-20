/*

                      TCP Request (HTTP-GET)
Client (Webbrowser)  ------------------> Server (Webserver)
Adresse des Servers         
HTTP-Protokoll: Port 80
                     <------------------
                        Response (HTTP Type text/html)

Response
+---------------+-----------------------+
|Http-Header    | Payload               |
|Statuscode     | Text oder Html        |
|Content-Type   | Dokument              |
+---------------+-----------------------+
*/

var http = require('http');
var url = require('url');


var server = http.createServer(function (request, response){
    var urlParts = url.parse(request.url, true);
    response.writeHead(200,{"Content-Type":"text/plain"});
    response.write("Hallo " + urlParts.query.name + " von Node js!");
    response.end("viel Spass beim coden :-)");
    //console.log(request.url);
    console.log("Handled request from " + urlParts.query.name);
});
//server.listen(8000,"localhost");
var port = 8000;
var ip = 'localhost';
server.listen(port, ip);
console.log(`Server running at http://${ip}:${port}`);