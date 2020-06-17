function OsterSonntag(Jahr, TagesDifferenz)
    { // Erstellt von Ralf Pfeifer (www.arstechnica.de)

        // Falls kein Datum angegeben, aktuelles Jahr verwenden.
        if ((Jahr == "") || (Jahr == null)) { Jahr = new Date().getYear() }

        // Falls ausserhalb des gültigen Datumsbereichs, kein Ergebnis zurueckgeben
        if ((Jahr < 1970) || (2099 < Jahr)) {  return "Datum muss zwischen 1970 und 2099 liegen"; }

        // Falls keine TagesDifferenz angegeben, TadgesDifferenz auf 0 setzen.
        if ((TagesDifferenz == "") || (TagesDifferenz == null)) { TagesDifferenz = 0; }

        var a = Jahr % 19;
        var d = (19 * a + 24) % 30;
        var Tag = d + (2 * (Jahr % 4) + 4 * (Jahr % 7) + 6 * d + 5) % 7;
        if ((Tag == 35) || ((Tag == 34) && (d == 28) && (a > 10))) { Tag -= 7; }

        var OsterDatum = new Date(Jahr, 2, 22)
        // 86400000 = 24 h * 60 min * 60 s * 1000 ms
        // Die Zahl 86400000 nicht ausklammern, sonst gibt's Probleme bei der Typumwandlung !!
        OsterDatum.setTime(OsterDatum.getTime() + 86400000 * TagesDifferenz + 86400000 * Tag)

        // Uhrzeit aus dem Datum entfernen
        OsterDatum = OsterDatum.toLocaleString()
        OsterDatum = OsterDatum.substring(0, OsterDatum.indexOf(","));
        return OsterDatum;
    }

   function getOsterSonntag(){
        let datum = OsterSonntag(document.getElementById('jahr').value);
        console.log(datum);
        console.log("tests");
        console.log(istEinFeiertag("12.4.2020,"));
        console.log(istEinFeiertag("13.4.2020,"));
        console.log(istEinFeiertag("14.4.2020,"));
   }

   function istEinFeiertag(datum){
        //prüfen ob nicht beweglicher Feiertag zutrifft!
        jahr = datum.substring(datum.indexOf(",")-4,datum.indexOf(","));
        let diff = [-2,+1,0,+50];
        for (let index = 0; index < diff.length; index++) {
           if (datum.toLocaleString().substring(0, datum.indexOf(",")) ==
            OsterSonntag(jahr,diff[index]))
            return true;
        }
        return false;
   }