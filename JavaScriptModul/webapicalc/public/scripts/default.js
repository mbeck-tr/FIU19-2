$(document).ready(function(){
    $('#btnAdd').on('click', addNumbers);
    $('#btnAddAsync').on('click', addNumbersAsync);
    $('#btnAddjQuery').on('click', addNumbersJQuery);
});

//mit JQuery
function addNumbersJQuery(){
    var x=$('#x').val();
    var y=$('#y').val();
    var daten = { "x":x, "y":y };
    // $.ajax({
    //     url: '/addition',
    //     data: daten,
    //     type: 'GET',
    //     dataType: 'json',
    //     success: function(ergebnis){
    //         $('#resultSpan').html(ergebnis.result);
    //     }
    // });

    $.getJSON('/addition', daten, function (daten){
        $('#resultSpan').html(daten.result);
    });
}

//ohne jQuery!!!
//asynchron
function addNumbersAsync(){
    var x = document.getElementById('x').value;
    var y = document.getElementById('y').value;
    var resultSpan = document.getElementById('resultSpan');
    
    //AJAX - Asynchronous JavaScript and XML
    var xmlhttp = new XMLHttpRequest();
    
    // onreadystatechange event:
    // wird gefeuert, wenn sich readystate ändert
    // readystates:
    // 0 = Uninitialized: open-Methode wurde noch nicht aufgerufen
    // 1 = Loading: send-Methode wurde noch nicht aufgerufen
    // 2 = Loaded: send-Methode wurde aufgerufen
    // 3 = Interactive: Downloading
    // 4 = Completed: fertig!

    xmlhttp.onreadystatechange = function () {
        console.log("readyState: " + xmlhttp.readyState);
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
            var jsonObject = JSON.parse(xmlhttp.response);
            resultSpan.innerHTML = jsonObject.result;
        }
    }

    xmlhttp.open("GET","/addition?x=" + x + "&y=" + y, true);
    xmlhttp.send();
}

//ohne jQuery!!!
//synchron
function addNumbers(){
    var x = document.getElementById('x').value;
    var y = document.getElementById('y').value;
    var resultSpan = document.getElementById('resultSpan');
    
    //AJAX - Asynchronous JavaScript and XML
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET","/addition?x=" + x + "&y=" + y, false);
    xmlhttp.send();
    var jsonObject = JSON.parse(xmlhttp.response);
    resultSpan.innerHTML = jsonObject.result;
}