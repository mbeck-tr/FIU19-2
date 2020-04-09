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
            //DisplayPrimeCounts();
            DisplayPrimeCountsTo2(2000000);
            Console.WriteLine("Nach Aufruf von Display-Methode");
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

        static async void DispalyPrimeCountsTo(int count) // async kennzeichnet die Methode, dass await verwendet wird
        {
            int ergebnis = await GetPrimesCountAsync(2, count);// await entkapselt den Task<int> auf Task.Result und übergibt an int ergebnis
            Console.WriteLine("Fertig mit dem Zählen, Ergebnis: "+ ergebnis);
        }

        static async void DisplayPrimeCountsTo2(int count)
        {
            Task<int> t1 = GetPrimesCountAsync(2, count);
            Task<int> t2 = GetPrimesCountAsync(count, 10000000);
            Console.WriteLine("Tasks sind gestartet!!!");
            int ergebnis = await t1;
            Console.WriteLine("Ergebnis Task1: " + ergebnis);
            Console.WriteLine("Ergebnis Task2: " + await t2);
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
