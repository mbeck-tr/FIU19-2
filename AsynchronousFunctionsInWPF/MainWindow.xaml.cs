using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
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

namespace AsynchronousFunctionsInWPF
{
    /// <summary>
    /// Interaktionslogik für MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        Button button = new Button { Content = "Go" };
        Button button2 = new Button { Content = "Web" };
        TextBlock result = new TextBlock();
        public MainWindow()
        {
            InitializeComponent();
            var stackpanel = new StackPanel();
            stackpanel.Children.Add(button);
            stackpanel.Children.Add(button2);
            stackpanel.Children.Add(result);
            this.Content = stackpanel;
            button.Click += (sender, args) => Go();
            button2.Click += (sender, args) => Go2();
        }

        async void Go2()
        {
            button2.IsEnabled = false;
            result.Text = "";
            string[] urls = "www.tagesschau.de www.microsoft.com www.google.de www.apple.com www.heise.de www.facebook.com www.lutzundgrub.de".Split();
            int totalLength = 0;
            try
            {
                foreach(string url in urls)
                {
                    var uri = new Uri("https://" + url);
                    //byte[] data = new WebClient().DownloadData(uri); //Synchron
                    byte[] data = await new WebClient().DownloadDataTaskAsync(uri); //Asynchron
                    result.Text += "Größe von " + url + " ist " + data.Length + Environment.NewLine;
                    totalLength += data.Length;
                }
                result.Text += "Gesamtgröße: " + totalLength;
            }catch (WebException ex)
            {
                result.Text += "Fehler: " + ex.Message;
            }
            finally
            {
                button2.IsEnabled = true;
            }
        }


        async void Go()
        {
            result.Text = "";
            button.IsEnabled = false;
            for (int i = 1; i < 5; i++)
            {
                result.Text += await GetPrimesCountAsync(i * 1000000, 10000) + " Primzahlen zwischen " + (i * 1000000) + " und " + ((i * 1000000) - 1) + Environment.NewLine;
            }
            button.IsEnabled = true;
        }

        Task<int> GetPrimesCountAsync(int start, int count)
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
