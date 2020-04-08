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

namespace ThemaTasks
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
            //Tasks erzeugen
            Task task1 = new Task(test);
            task1.Start();

            var task2 = new Task(delegate () { test(); });
            task2.Start();

            var task3 = new Task(() => { test(); });
            task3.Start();

            var task4 = Task.Factory.StartNew(() =>
            {
                for (int i = 0; i < 10; i++)
                {
                    Debug.WriteLine(i);
                }
            });

            
        }

        private void WriteOutput(string msg)
        {
            tblOutput.Text += msg + Environment.NewLine;
        }

        private void test()
        {
            //for (int i = 0; i < 10; i++)
            {
                this.Dispatcher.Invoke(new Action<string>(WriteOutput), new object[] { $"test Task Aufruf" });
                //Thread.Sleep(200);
            }
        }

        
    }
}
