using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ereignisse
{
    class Program
    {
        static void Main(string[] args)
        {
            Circle kreis = new Circle();
            kreis.InvalidMeasure += () => Console.WriteLine("Falscher Wert!!!");
            kreis.Radius = -100;
            Console.ReadLine();
        }
    }
    public delegate void InvalidMeasureEventHandler();
    class Circle
    {
        public event InvalidMeasureEventHandler InvalidMeasure;
        private int radius;
        public int Radius
        {
            get { return radius; }
            set
            {
                if (value >= 0)
                    radius = value;
                else
                {
                    //Console.WriteLine("Unzulässiger Wert -> negativer Radius");

                    // Event auslösen
                    InvalidMeasure();
                }
            }
        }

    }
}
