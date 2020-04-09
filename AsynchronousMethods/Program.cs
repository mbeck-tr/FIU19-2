using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
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
                TaskAwaiter<int> awaiter = GetPrimesCountAsync(i * 1000000, 1000000).GetAwaiter();
                awaiter.OnCompleted(() =>
                {
                    Console.WriteLine(awaiter.GetResult() + " Primzahlen zwischen ...");
                });
            }
            Console.WriteLine("fertig!");
        }

        //TODO: muss ich noch machen {Aufgabenliste}
        static Task<int> GetPrimesCountAsync(int start, int count)
        {
            return Task.Run(() =>
            {
                int primes = 0;
                bool isPrime;
                for (int i = start; i < start + count; i++)
                {
                    isPrime = true;
                    for (int j = 2; j * j <= i; j++)
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
            });
        }
    }
}
