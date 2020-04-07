using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;

namespace ThemaThreads
{
    /// <summary>
    /// Interaktionslogik für MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();
        }

        private void btnStart_Click(object sender, RoutedEventArgs e)
        {
            //Delegate auf die Methode, welche in eigenem Thread abgearbeitet werden soll
            //ThreadStart threadDel = new ThreadStart(Berechne);
            ParameterizedThreadStart threadDel = new ParameterizedThreadStart(Berechne);

            //Instanziierung des Threadobjekts mit Übergabe des Delegaten
            Thread myThread = new Thread(threadDel);
            myThread.Name = "Thread 1";


            //Starten des neuen Ablaufstranges
            myThread.Start(10);
            Debug.WriteLine($"{myThread.Name} Start aufgerufen!");

            //2. Thread
            Thread my2ndThread = new Thread(Berechne); // Nur Angabe der Methode reicht!
            my2ndThread.Name = "Thread 2";
            my2ndThread.IsBackground = true; // Backgroundthreads werden beendet sobald der letzte Vordergrundthread beendet ist.
            my2ndThread.Start(20);
            Debug.WriteLine($"{my2ndThread.Name} Start aufgerufen!");

            myThread.Join(); //Warten auf Ferigstellung des Threads ()
            Debug.WriteLine("Thread 1 ist beendet!");

            Debug.WriteLine("btnStart_Click Methode beendet, Mainthread wartet auf Events!");
        }

        private void Berechne(object anzahl)
        {
            Stopwatch sw = new Stopwatch();
            sw.Start();
            for (int i = 0; i < (int)anzahl; i++)
            {
                Thread.Sleep(500); // statische Methode Sleep, welche den aktuellen Thread für angegebene Millisekunden anhält
                Debug.WriteLine("{1} arbeitet {0}", i, Thread.CurrentThread.Name);
            }
            sw.Stop();
            Debug.WriteLine("Zeit: " + sw.ElapsedMilliseconds / 1000.0);
        }

        //Feld
        bool fertig = false; //Shared Variable, auch als static!
        private void btnSharedVariable_Click(object sender, RoutedEventArgs e)
        {
            //Variablen
            Thread tuewas1 = new Thread(TueWas);
            Thread tuewas2 = new Thread(TueWas);
            tuewas1.Start();
            tuewas2.Start();
        }
        private void TueWas()
        {
            int a = 10; //local Variable
            if (a == 10) { a++; Debug.WriteLine("a: " + a + "\t" + Thread.CurrentThread.ManagedThreadId); }
            if (!fertig) { fertig = true; Debug.WriteLine("Fertig! {0}", Thread.CurrentThread.ManagedThreadId); }
        }


        private void btnThreadPool_Click(object sender, RoutedEventArgs e)
        {
            int n2, n3;
            ThreadPool.GetMaxThreads(out n3, out n2);
            for (int i = 0; i < (n3 + 10); i++)
            {
                ThreadPool.QueueUserWorkItem(GrosseMenge, i); // ThreadPool-Threads sind immer Backgroundthreads
                Debug.WriteLine($"Thread_{i} in Warteschlange aufgenommen");
            }
        }

        private void GrosseMenge(object obj)
        {
            int n1, n2, n3;
            Debug.WriteLine($"-> Thread {(int)obj} gestartet");
            for (int i = 0; i < 10; i++)
            {
                Thread.Sleep(100);
            }
            ThreadPool.GetMaxThreads(out n3, out n2);
            ThreadPool.GetAvailableThreads(out n1, out n2);
            Debug.WriteLine($" <- Thread {(int)obj} beendet! (frei {n1 + 1} von {n3})");
        }

        private void btnThreadSafty_Click(object sender, RoutedEventArgs e)
        {
            Thread t1 = new Thread(TueWasThreadSafty);
            Thread t2 = new Thread(TueWasThreadSafty);
            t1.Start();
            t2.Start();
        }

        bool done = false;
        static readonly object locker = new object();
        private void TueWasThreadSafty()
        {
            lock (locker)
            {
                if (!done) {
                    Debug.WriteLine("Done! {0}", Thread.CurrentThread.ManagedThreadId); 
                    done = true;
                }
            }
        }
    }
}
