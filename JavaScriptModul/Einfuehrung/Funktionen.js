function functionName(parameter1, parameter2, parameter_n){
    //Anweisungsblock
}

// function hoisting
var testergebnis = AddNumbers(100,200);
console.log(testergebnis);

function AddNumbers(firstNumber, secondNumber){
    var result = firstNumber + secondNumber;
    return result;
}

var ergebnis = AddNumbers(1,2);
console.log("2 Parameter: " + ergebnis);

ergebnis = AddNumbers(1);
console.log("1 Parameter: " + ergebnis);

ergebnis = AddNumbers(1,2,3,4);
console.log("4 Parameter: " + ergebnis);

// add ist noch nicht initialisiert
// console.log("Delegate add: " + add(14,25));

var add = function (fn, sn){
    var result = fn + sn;
    return result;
}

console.log("Delegate add: " + add(34,45));


var factorial = function computeFactorial(number){
    console.log("Funktion computeFactorial");
    if (number <= 1){
        return 1;
    }
    return number * computeFactorial(number -1);
}

console.log(factorial(5));
// console.log(computeFactorial(5)); führt zum Fehler


// Self invoking function expression
// Immediately Invoked Funktion Expression (IIFE)
// Self-Executing anonymous functions
// Self-Invoked ananymous functions

var result = (function computeFactorial(number){
    console.log("Funktion computeFactorial");
    if (number <= 1){
        return 1;
    }
    return number * computeFactorial(number -1);
})(5);

console.log(result);
