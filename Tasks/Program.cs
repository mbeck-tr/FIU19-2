using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Tasks
{
    class Program
    {
        static void Main(string[] args)
        {
            //Tasks erzeugen, grundsätzlich Threads aus dem Threadpool, somit Background-Tasks
            Task t1 = new Task(() => { Console.WriteLine("Hallo aus neuem Task"); });
            t1.Start();
            Task t2 = Task.Factory.StartNew(() => { Console.WriteLine("Hallo über Factory!"); },TaskCreationOptions.LongRunning);//Kein Threadpool Thread

            Task t3 = Task.Run(() => { Console.WriteLine("Hallo über Task.Run!"); Thread.Sleep(3000); }); // ab .NET 4.5
            
            Console.WriteLine("Task 3 läuft!");
            t3.Wait(); //Blockiert weitere Ausführung bis Task 3 beendet ist.
            Console.WriteLine("Task 3 beendet!");

            //Wertrückgabe
            Task<string> t4 = Task.Run(() => { Console.WriteLine("Methode mit Rückgabe");Thread.Sleep(3000); return "drei"; });
            //t4.Wait(); //Bei Zugriff auf Result-Property wird auf das Beenden des Tasks gewartet! Somit ist Wait() nicht notwendig
            Console.WriteLine("Ergebnis ist: " + t4.Result);

            Task<int> t5 = Task.Run(Berechne);
            Console.WriteLine("t5 Ergebnis: " + t5.Result);

            //Ausnahme im Task abfangen
            Task<int> t6 = Task.Run(MethodeMitException);
            try
            {
                t6.Wait();
            }catch (AggregateException ex)
            {
                Console.WriteLine("Fehler: " + ex.Message + "\n" + ex.GetType());
                Console.WriteLine("InnerException: " + ex.InnerException.Message);
                if (ex.InnerException is NullReferenceException)
                {
                    Console.WriteLine("Erwartete Null Reference Exception");
                }
            }catch(Exception)
            {
                Console.WriteLine("Exception aufgetreten!! (nicht im Task)");
            }

            Console.ReadLine();
        }

        static private int Berechne()
        {
            Thread.Sleep(2000);
            return 42;
        }

        static private int MethodeMitException()
        {
            //Thread.Sleep(1000);
            throw null;
            return 42;
        }
    }
}
