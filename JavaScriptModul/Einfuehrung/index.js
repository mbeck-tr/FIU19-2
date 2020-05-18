// alert("Hello World!");

console.log("Konsoleneintrag: ");

// Datentypen in JavaScript

// nicht streng typisiert
// Numbers - Zahlen GZ und GKZ
// Boolean - true / false
// String - Zeichenfolge

var i;
i = 10;
console.log("i: " + i);
i = i + i;
console.log("i+i: " + i);

i = "Mein Name ist Hase";
console.log(i);

var a = 10;
var b = 20;
var c = a + b;
console.log("c = a + b Ergebnis:" + c);

a = "Hello "
b = "JavaScript"
c = a + b;
console.log("c = a + b Ergebnis:" + c);

a = "Number is: ";
b = 10;
c = a + b;
console.log("c = a + b Ergebnis:" + c);

a = "50";
b = 10;
c = a + b;
console.log("c = a + b Ergebnis:" + c);

a = "50";
b = 10;
c = a - b;
console.log("c = a + b Ergebnis:" + c);

function AddNumbers(){
    console.log("Calculate ...");

    var firstNumber = document.getElementById("txtFirstNumber").value;
    
    if (firstNumber == ""){
        alert("First Number is required");
    }
    
    firstNumber = parseFloat(firstNumber);

    console.log(firstNumber);

    if (isNaN(firstNumber)){
        console.log("Error: First Number is not a number");
        alert("Please enter a valid number in the first number textbox");
    }

    var secondNumber = document.getElementById("txtSecondNumber").value;
    
    if (secondNumber == ""){
        alert("Second Number is required");
    }

    secondNumber = parseInt(secondNumber);
    
    console.log(secondNumber);

    if (isNaN(secondNumber)){
        console.log("Error: Second Number is not a number");
        alert("Please enter a valid number in the second number textbox");
    }


    console.log((firstNumber + secondNumber).toFixed(2));

    var result = Math.round((firstNumber + secondNumber)*100)/100.0;
    document.getElementById("txtResult").value = result;
}

// Strings in JavaScript

var string1 = "Hello"
var string2 = 'JavaScript'
var result = string1.concat(" ", string2);

console.log(result);

var myString = "Welcome to 'JavaScript' Training";
var myString2 = 'Welcome to "JavaScript" Training';

var s = "Welcome to \"JavaScript\" 'Training'";
var s2 = 'Welcome to "JavaSCript" \'Training\'';

s = s.toUpperCase();
s2 = s2.toLocaleLowerCase();

console.log("Länge: " + s2.length);


string1 = " AB "; // -> "AB"
string2 = " CD ";
console.log(string1.trim() + string2.trim()); // "ABCD"

myString = "Hello JavaScript";
console.log(myString.replace("JavaScript", "World"));

var str = "JavaScript Tutorial";
console.log(str.substr(0,10));
console.log(str.substring(10,0));

console.log(str.substr(11,6));

str = "mbeck@lutzundgrub.de"
result = str.indexOf("@");
console.log(str.substr(result+1));
console.log(str.substring(0,result));

var emptyArray = [];
console.log(emptyArray.length);

var myArray = new Array(10);
console.log(myArray.length);

myArray = [10,20,30];
console.log(myArray.length);

emptyArray[0] = 100;
emptyArray[1] = 200;
emptyArray[2] = 300;

console.log(emptyArray[2]);
console.log(emptyArray);

emptyArray.push(400);
console.log(emptyArray);
console.log(emptyArray.length);

console.log(emptyArray.pop());
console.log(emptyArray);

console.log(emptyArray.unshift(500));
console.log(emptyArray);

console.log(emptyArray.shift());
console.log(emptyArray);

function IsEven(value,index,array){
    if (value % 2 == 0){
        return true;
    }else{
        return false;
    }
}

var ar = [1,2,3,4,5,6,7,8,9,10]; console.log(ar.filter(IsEven));

console.log(ar.filter(function (v,i,a){return v % 2 != 0}));

console.log(ar.filter((v) => {return v % 3 == 0}));


var names = ["Sam","Mark","Tim","Sam","Tim"];
console.log(names.filter((v,i,a) => {return a.indexOf(v) == i}));


var myArray1 = new Array(3);
for (i = 0; i < 3; i++){
    myArray1[i] = new Array(3);
}

myArray1[0][0] = "1";
myArray1[1][0] = "4";
myArray1[2][2] = "9";

