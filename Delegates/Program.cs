using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Delegates
{
    public delegate double CalculateHandler(double value1, double value2);
    class Program
    {
        static void Main(string[] args)
        {
            CalculateHandler calculate;
            do
            {
                //Eingabe
                Console.Clear();
                Console.WriteLine("erster Operand: ");
                double input1 = Convert.ToDouble(Console.ReadLine());
                Console.WriteLine("zweiter Operand: ");
                double input2 = Convert.ToDouble(Console.ReadLine());

                //Wahl der Operation
                Console.WriteLine("Operation: Addition (A) oder Subtraktion (S)");
                string wahl = Console.ReadLine().ToUpper();

                double result = 0;
                if (wahl == "A")
                    calculate = new CalculateHandler(Demo.Add);
                else if (wahl == "S")
                    calculate = Demo.Subtract;
                else if (wahl == "M")
                    calculate = delegate (double x, double y)
                    {
                        return x * y;
                    };
                else if (wahl == "D")
                    calculate = (x, y) =>
                    {
                        return x / y;
                    };
                else
                {
                    Console.WriteLine("Ungültige Eingabe");
                    Console.ReadLine();
                    return;
                }

                result = calculate(input1, input2);
                Console.WriteLine("Ergebnis: " + result);
                Console.WriteLine("Zum Beenden F12 drücken.");
            } while (Console.ReadKey(true).Key != ConsoleKey.F12);

        }
    }

    class Demo
    {
        public static double Add(double x, double y)
        {
            return x + y;
        }

        public static double Subtract(double x, double y)
        {
            return x - y;
        }
    }
}
