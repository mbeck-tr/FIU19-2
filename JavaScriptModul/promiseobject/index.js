// Callback-Entwurfmuster

function asyncFunction(callbackFunction) {
    // noch weiterer Code
    console.log("vor Callback");
    callbackFunction();
    console.log("nach Callback");
    // weiterer Code
}

function NamedCallbackFunction() {
    console.log("Aufruf Callback")
}

asyncFunction(NamedCallbackFunction);

function asyncFunctionWithReturn(callbackFunction) {
    let result;
    setTimeout(
        () => {
            result = Math.floor(Math.random() * 100) + 1 // Zufallszahl
            console.log(result);
            if (result <= 50){
                callbackFunction(
                    null,   // kein Fehler
                    result  // Ergebniswert
                    );
            }else{
                callbackFunction(
                    new Error('Zufallszahl ' + result + ' groesser als 50.'),   // Fehler
                    undefined                                                   // kein Ergebniswert
                )
            }
        },
        2000);
    return result;
}

// try{
//     let ergebnis = asyncFunctionWithReturn();
//     console.log(ergebnis);
// }catch(error){
//     console.error('Fehler: ' + error);
// }

asyncFunctionWithReturn(
    (fehler, ergebnis) => {
        if (fehler){
            console.log(fehler);
        }else{
            console.log("Ergebnis: " + ergebnis);
        }
    }
)

function randomNumberAsync(){
    let p = new Promise(
        function(resolve, reject){
            setTimeout(
                () =>{
                    let result = Math.floor(Math.random()*100) + 1;
                    if (result <= 50){
                        resolve(result);
                    }else{
                        reject('Zufallzahl ' + result + ' groesser als 50.');
                    }
                },2000);
        }
    );
    return p;
}

let promiseObject = randomNumberAsync();
promiseObject.then(
    (ergebnis) => { console.log("Promise Ergebnis: " + ergebnis)},
    (fehler) => { console.log ("Promise Fehler: " + fehler)}
);

let promiseObject2 = randomNumberAsync();
promiseObject2.then(
    (ergebnis) => console.log(ergebnis)
).catch(
    (fehler) => console.error(fehler) 
);

let promiseObject3 = randomNumberAsync();
promiseObject3.then(
    (r) =>  { console.log("r: " + r); return r * 2 }
).then(
    (r2) => { console.log("r2: " + r2); return r2 * 2}
).then(
    (r3) => console.log("r3: " + r3)
).catch(
    (e) => console.log(e)
)