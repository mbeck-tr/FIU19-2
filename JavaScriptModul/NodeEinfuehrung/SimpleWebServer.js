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
var server = http.createServer(function (request, response){
    response.writeHead(200,{"Content-Type":"text/plain"});
    response.write("Hallo FIU 19/2 von Node js!");
    response.end("viel Spass beim coden :-)");
    console.log("Handled request");
});
//server.listen(8000,"localhost");
var port = 8000;
var ip = 'localhost';
server.listen(port, ip);
console.log(`Server running at http://${ip}:${port}`);