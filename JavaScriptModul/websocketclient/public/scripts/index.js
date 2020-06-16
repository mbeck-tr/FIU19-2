var wsUri = 'ws://echo.websocket.org/';
var webSocket;

$(document).ready(
    function(){
        if (checkSupported()){
            connect();/*Konnektiere dich mit dem Websocket server*/
            $('#btnSend').click(Send);
        }else{
            $('#btnSend').attr('disabled','disabled');
        }
    }
);
    
function checkSupported(){
    if (window.WebSocket){
        /* ws wird unterstützt */
        writeOutput("WebSocket wird unterstützt!");
        return true;
    }else
    {
        writeOutput("WebSocket wird nicht unterstützt!");
        return false;
    }
}

function writeOutput(message){
    var output = $('#divOutput');
    output.html(output.html() + '<br/>' + message);
}


function connect(){
    webSocket = new WebSocket(wsUri);
    webSocket.onopen = function(evt){ onOpen(evt);}
    webSocket.onclose = function(evt){ onClose(evt);}
    webSocket.onerror = function(evt){ onError(evt);}
    webSocket.onmessage = function(evt){ onMessage(evt);}
}

function onMessage(evt){
    writeOutput("RESPONSE: " + evt.data);
}

function onError(evt){
    writeOutput("ERROR: " + evt.data);
}

function onClose(evt){
    writeOutput("DISCONNECTED");
}

function onOpen(evt){
    writeOutput("CONNECTED");
}

function Send(){
    var m = $('#txtMessage').val();
    if (webSocket.readyState != webSocket.OPEN){
        writeOutput("NOT OPEN: " + m);
        return;
    }
    writeOutput("SENT: " + m);
    webSocket.send(m);
}
