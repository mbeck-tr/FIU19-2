// Objekte in JS
// Object literal pattern

var car1 = {
    year: 2000,
    make: 'Ford',
    model: 'Fusion',
    repairs: ['repair1','repair2','repair3'],
    getInfo: function (){
        return `Vehicle: ${this.year} ${this.make} ${this.model}`;
    }
}
var car2 = {
    year: 2010,
    make: 'BMW',
    model: 'Z4',
    repairs: [],
    getInfo: function (){
        return `Vehicle: ${this.year} ${this.make} ${this.model}`;
    }
}

document.write(car1.getInfo());
document.write("<br/>");
document.write(car2.getInfo());
console.log(car1.year);
car1.repairs[3]= car1.year;
console.log(car1.repairs[3]);

// factory pattern
// JS type Object

function getVehicle(theYear, theMake, theModel) {
    var vehicle = new Object();
    vehicle.year = theYear;
    vehicle.make = theMake;
    vehicle.model = theModel;
    vehicle.getInfo = function () {
        return `Vehicle: ${this.year} ${this.make} ${this.model}`;
    }
    return vehicle;
}

var car3 = getVehicle(2015, "VW", "Golf");
car3.year = 2016;
document.write("<br/>");
document.write(car3.getInfo());
console.log("Golf: " + car3.year);


// Erzeugen einer Klasse
// JS hat kein class Schlüsselwort
// Klassen werden mit Prototype pattern erzeugt/verwendet

function Vehicle(theYear, theMake, theModel){ //constructor
    this.year = theYear; // Prototypeerweiterung mit Attributen, Member hinzufügen
    this.make = theMake;
    var model = theModel; // Kapselung von model mittels privatem Attribut (lokale Variable var)
    this.getInfo = function (){
        return `Vehicle: ${this.year} ${this.make} ${model}`;
    }
}

document.write("<br/>");
var car4 = new Vehicle(2019,"mercedes", "s500");
console.log(car4);
document.write(car4.getInfo());
console.log(car4.make);
console.log(car4.model);

document.write("<br/>");
var car5 = new Vehicle(2018,"Audi","A3");
document.write(car5.getInfo());

car4.getInfo = function (){
    return "neue Funktion";
}
document.write("<br/>zu erwarten 'neue Funktion'<br/>");
document.write(car4.getInfo());

document.write("<br/>zu erwarten 'neue Funktion'<br/>");
document.write(car5.getInfo());

function Fahrzeug(theYear, theMake, theModel){ //constructor
    var year = theYear; // private
    var make = theMake;
    var model = theModel;
    this.getYear = function (){return year} // getter -> public
    this.getMake = function(){return make}
    this.getModel = function(){return model}
    this.setYear = function(y){year = y} // setter -> public
}
Fahrzeug.prototype.getInfo = function (){
    return 'Fahrzeug: ' + this.getYear() + ' ' + this.getMake() + ' ' + this.getModel();
}

var fzg1 = new Fahrzeug(1978,"Fiat","Panda");
document.write("<br/>");
document.write(fzg1.getInfo());


fzg1.setYear(1900);
document.write("<br/>");
document.write(fzg1.getInfo());

var fzg2 = new Fahrzeug(1966, "VW", "Käfer");
document.write("<br/>");
document.write(fzg2.getInfo());

Fahrzeug.prototype.getInfo = function () {
    return "Ausgabe Fahrzeugdaten !!!";
}

document.write("<br/>");
document.write(fzg1.getInfo());
document.write("<br/>");
document.write(fzg2.getInfo());