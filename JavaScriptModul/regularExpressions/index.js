// regEx
var text = "image/png";

console.log(text.match('image.*'));
console.log(text.match(/image.*/));

// Einelementige reguläre Ausdrücke
// Schulnote prüfen
var note = "3";
var regEx = /[1-6]/
console.log(note.match(regEx));

//Mehrelementige reguläre Ausdrücke
//Bahngleis
var Bahngleis = "8c";
regEx = /[1-36-9][a-dA-D]/;
console.log(Bahngleis.match(regEx));

//Hausnummer
var Hausnummer = "234b";
Hausnummer ="34b";
Hausnummer = "3b";
Hausnummer = "3"
regEx = /[1-9][0-9]?[0-9]?[a-z]?/ // optionale Elemente mit ?-Suffix
regEx = /[1-9][0-9]{0,2}[a-z]?/ // Wiederholung eines Elements {min,max}-Suffix
regEx = /[1-9][0-9]{1,4}[a-z]?/
console.log(Hausnummer.match(regEx));

//PLZ
var PLZ = "07233";
regEx = /[0-9]{5}/; //Wiederholung für x-mal;
console.log(PLZ.match(regEx));

//Wiederholung für mindestens x-mal
regEx = /[a-mA-N]{3,}/;

// Beliebige Wiederholungen

// Telefonnummern
var tel1 = "0654/12345-34";
var tel2 = "0049 160 555444";
var tel3 = "0180.23.555.444";

var tel1 = "--/../123.";
regEx = /[0-9/. \-]+/;  // +-Suffix einmaliges oder mehrmaliges Vorkommen
                        // Backslash "escaped" Steuerzeichen (hier Minus)
regEx = /[0-9/. \-]*/;  // *-Suffix keinmal oder beliebig oft

console.log(tel1.match(regEx));

//Platzhalter
var name = "Hans Peter Wurst";
regEx = /Hans .*Wurst/;
console.log(name.match(regEx));

// Elemente invertieren mit ^
regEx = /Hans [^qz]+ Wurst/
console.log(name.match(regEx));

// Klammern fassen Ausdrücke zu einem Element zusammen
name = "bla blub Hans Wurst";
regEx = /Hans (Peter )?Wurst/
console.log(name.match(regEx));

var banane = "bananananane";
regEx = /ba(na){2,5}ne/;
console.log(banane.match(regEx));

// Alternativen
var wetter = "Das Wetter ist toll";
var wetter2 = "Das Wetter ist richtig schlecht";

regEx = /Das Wetter ist (toll|richtig schlecht)/
console.log(wetter.match(regEx) != null);
console.log(wetter2.match(regEx) != null);

// Modifikatoren
// i = Case-Insensitivity
// g = global
// s = multiline
// m = zeilenmodus

var text = "Blaue Flaschen und blaue Vasen stehen auf blaue Stuehle";
regEx = /blaue/ig
console.log(text.match(regEx));

// Anfangs- und Endzeichen
var datum = "Am 1.1.2000 ist Neujahr";
datum = "1.1.2000 ist Neujahrstag";
datum = "1.1.2000";
regEx = /^1\.1\.2000$/; // Anfangszeichen: ^
                        // Endzeichen: $
console.log(datum.match(regEx));