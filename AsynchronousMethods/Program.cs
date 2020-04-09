using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AsynchronousMethods
{
    class Program
    {
        static void Main(string[] args)
        {
            DisplayPrimeCounts();
            Console.WriteLine("Nach Aufruf von DisplayMethode");
            Console.ReadLine();
        }

        static void DisplayPrimeCounts()
        {
            for (int i = 0; i < 10; i++)
            {
                Console.WriteLine(
                    GetPrimesCount(i*1000000,1000000) + 
                    " Primzahlen zwischen " + (i*1000000) + " und " + ((i+1)*1000000-1));
            }
            Console.WriteLine("fertig!");
        }


        static int GetPrimesCount(int start, int count)
        {
            int primes = 0;
            bool isPrime;
            for(int i = start; i < start + count; i++)
            {
                isPrime = true;
                for(int j = 2; j*j <= i; j++)
                {
                    if (i % j == 0)
                    {
                        isPrime = false;
                        break;
                    }
                }
                if (isPrime)
                    primes++;
            }
            return primes;
        }
    }
}
