function OsterSonntag(Jahr, TagesDifferenz)
    { 
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