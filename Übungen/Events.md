# Kontostand

Erstellen Sie eine Klasse Kunde, welche ein privates Feld kontostand besitzt. Über die Methode "AddGuthaben" soll das Hinzufügen und Abheben von Geld ausgeführt werden. Die Klasse soll ein Event ohne Rückgabe "GutHabenFastLeer()" auslösen sobald der Kontostand 10 unterschreitet.

Bsp.:
```CSharp
static void Main(){
    Kunde k = new Kunde();
    k.GuthabenFastLeer += 
        () => Console.WriteLine(
            "Uffpasse, koi Geld meh!");    
    k.AddGuthaben(100);
    k.AddGuthaben(-90); // -> Event wird ausgelöst!

    Console.ReadKey();
}
```
