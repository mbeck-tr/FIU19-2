﻿using System;
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
            ThreadStart threadDel = new ThreadStart(Berechne);
            
            //Instanziierung des Threadobjekts mit Übergabe des Delegaten
            Thread myThread = new Thread(threadDel);

            //Starten des neuen Ablaufstranges
            myThread.Start();


            Debug.WriteLine("Thread Start aufgerufen!");
            Debug.WriteLine("btnStart_Click Methode beendet, Mainthread wartet auf Events!");
        }

        private void Berechne()
        {
            Stopwatch sw = new Stopwatch();
            sw.Start();
            for (int i = 0; i < 10; i++)
            {
                Thread.Sleep(500); // statische Methode Sleep, welche den aktuellen Thread für angegebene Millisekunden anhält
                Debug.WriteLine("Programm arbeitet {0}", i);
            }
            sw.Stop();
            Debug.WriteLine("Zeit: " + sw.ElapsedMilliseconds / 1000.0);
        }
    }
}
