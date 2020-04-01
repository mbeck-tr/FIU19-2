using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Kontostand
{
    public delegate void GutHabenFastLeerEventHandler();
    class Kunde
    {
        public event GutHabenFastLeerEventHandler GutHabenFastLeer;
        
        private decimal kontostand;
        public void AddGuthaben(decimal wert)
        {
            kontostand += wert;
            if (kontostand < 10)
            {
                //Event GutHabenFastLeer auslösen
                if (GutHabenFastLeer != null)
                    GutHabenFastLeer();
            }
        }
    }
    class Program
    {
        static void Main(string[] args)
        {
            Kunde k = new Kunde();
            k.GutHabenFastLeer += () => Console.WriteLine("Kontostand fast leer");
            k.AddGuthaben(100);
            k.AddGuthaben(-95); // Event wird ausgelöst

            Console.ReadLine();
        }
    }
}
