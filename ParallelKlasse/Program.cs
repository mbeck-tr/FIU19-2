using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace ParallelKlasse
{
    class Program
    {
        static void Main(string[] args)
        {
            Parallel.Invoke(
                () => PrimZahlen(2, 2000000),
                () => PrimZahlen(2, 4000000),
                () => PrimZahlen(2, 6000000),
                () => PrimZahlen(2, 8000000),
                () => PrimZahlen(2, 10000000),
                () => PrimZahlen(2, 12000000),
                () => PrimZahlen(2, 14000000),
                () => PrimZahlen(2, 16000000));

            Parallel.Invoke(
                () => new WebClient().DownloadFile("http://www.microsoft.com", "microsoft.html"),
               () => new WebClient().DownloadFile("http://www.google.com", "google.html"),
               () => new WebClient().DownloadFile("https://www.tagesschau.de", "tagesschau.html"),
               () => new WebClient().DownloadFile("https://www.heise.de", "heise.html"));

            //Parallel.For(1,100,(i) => DoSomething(i));
            string[] a = "bla fasel blubb".Split();
            Parallel.ForEach(a, (item) => { Console.WriteLine("Michael " + item); });
            //Parallel.ForEach("Hallo, Welt", (item) => Console.WriteLine(item));
            Parallel.ForEach("Hallo, Welt", (item, state, index) => Console.WriteLine((index + 1) + ": \t" + item));
            foreach (var item in "hallo, welt")
            {
                if (item == ',') break;
                else Console.WriteLine(item);
            }
            Parallel.ForEach("Hallo, Welt", (item, state, index) =>
            {
                if (item == ',')
                    state.Stop();
                else
                Console.WriteLine((index + 1) + ": \t" + item);
            });

            foreach (var item in a.AsParallel().Where(i => i[0] == 'b'))
            {
                Console.WriteLine(item);
            }

            Console.ReadLine();

        }

        static void DoSomething(int i)
        {
            Console.WriteLine("DoSomething wird ausgeführt, in Durchgang {0}", i);
        }

        static void PrimZahlen(int start, int count)
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
            Console.WriteLine(start + ": \t" + primes);
        }
    }
}
