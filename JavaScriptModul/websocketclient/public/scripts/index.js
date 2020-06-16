var wsUri = 'ws://echo.websocket.org/';
var webSocket;
var timerId = 0;

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
    cancelKeepAlive();
}

function onOpen(evt){
    writeOutput("CONNECTED");
    keepAlive();
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

function keepAlive(){
    var timeout = 15000;
    if (webSocket.readyState == webSocket.OPEN){
        webSocket.send('');
        console.log("sent keep alive signal");
    }
    timerId = setTimeout(keepAlive, timeout);
}

function cancelKeepAlive(){
    if (timerId){
        cancelTimeout(timerId);
    }
}
