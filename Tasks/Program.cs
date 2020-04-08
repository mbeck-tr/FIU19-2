using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
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

            goto weiter; // nur Demonstration
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

            weiter: //Goto Sprungmarke (nur zur Demonstration!!!)
            // Methoden mit Übergabeparameter in neuem Task aufrufen
            Task<int> t7 = Task.Factory.StartNew(BerechneSinn, 13);
            Console.WriteLine("t7: " + t7.Result);

            Task<int> t8 = Task.Run(() => { return BerechneMitIntUebergabe(100); });
            Console.WriteLine("t8: " + t8.Result);

            Task t9 = Task.Run(() => MethodeMitVielenParametern(12, 2.3, "Hallo", 'c'));

            //Task abbrechen
            cts = new CancellationTokenSource(); //Instanz erstellen
            Task t10 = Task.Factory.StartNew(SchreibeX, cts.Token);

            Thread.Sleep(1500);
            cts.Cancel();

            //Continuations
            //Nach Fertigstellung eines Task, eine weitere Aufgabe ausführen
            // 1. Möglichkeit
            Console.WriteLine("Starte t11");
            Task<int> t11 = Task.Run(() => { Thread.Sleep(2000); return 42; });
            
            TaskAwaiter<int> awaiter = t11.GetAwaiter();
            awaiter.OnCompleted(() =>
            {
                int ergebnis = awaiter.GetResult();
                Console.WriteLine("Ergebnis von t11: " + ergebnis);
            });
            Console.WriteLine("Nach Aufruf der OnCompleted-Methode.");

            //2. Möglichkeit
            Console.WriteLine("Starte t12");
            Task<int> t12 = Task.Run(() => { Thread.Sleep(2000); return 42; });
            t12.ContinueWith(vorrigerTask =>
            {
                int ergebnis = vorrigerTask.Result;
                Console.WriteLine("Ergebnis von t12: {0}", ergebnis);
            });
            Console.WriteLine("Nach Aufruf der ContinueWith-Methode");


            Console.ReadLine();
        }

        static CancellationTokenSource cts; //Tokenquelle für das Handling des vorzeitigen Abbruchs

        static private void SchreibeX()
        {
            while (true)
            {
                Console.Write("X");
                if (cts.Token.IsCancellationRequested)
                {
                    Console.WriteLine("Abbruch!");
                    return;
                }
            }
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

        static private int BerechneSinn(object wert)
        {
            int a = (int)wert;
            return a / a * 42;
        }

        static private int BerechneMitIntUebergabe(int i)
        {
            return i * i;
        }

        static private void MethodeMitVielenParametern(int i, double d, string s, char c)
        {
            //Anweisungen
        }
    }
}
