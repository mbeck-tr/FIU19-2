using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
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

namespace LinqToSql
{
    /// <summary>
    /// Interaktionslogik für MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        LinqSampleDataContext db = new LinqSampleDataContext();
        ICollectionView view0;
        public MainWindow()
        {
            InitializeComponent();
        }

        private void Window_Loaded(object sender, RoutedEventArgs e)
        {
            lvDepartment.DataContext = db.Departments;
            view0 = CollectionViewSource.GetDefaultView(lvDepartment.DataContext);
        }

        private void lvDepartment_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            lvEmployees.DataContext = (view0.CurrentItem as Departments).Employees;
        }

        private void btnInsert_Click(object sender, RoutedEventArgs e)
        {
            Employees newEmployee = new Employees
            {
                FirstName = "Tim",
                LastName = "T",
                Gender = "Male",
                Salary = 55000,
                DepartmentId = 1
            };

            db.Employees.InsertOnSubmit(newEmployee);
            db.SubmitChanges();

            refresh();
        }

        private void btnUpdate_Click(object sender, RoutedEventArgs e)
        {
            Employees employee = db.Employees.SingleOrDefault(emp => emp.FirstName == "Tim" && emp.LastName == "T");
            employee.Salary = 66000;
            db.SubmitChanges();
            refresh();
        }

        private void btnDelete_Click(object sender, RoutedEventArgs e)
        {
            Employees employee = db.Employees.SingleOrDefault(emp => emp.FirstName == "Tim" && emp.LastName == "T");
            db.Employees.DeleteOnSubmit(employee);
            db.SubmitChanges();
            refresh();
        }

        private void refresh()
        {
            db = new LinqSampleDataContext();
            lvDepartment.DataContext = db.Departments;
            view0 = CollectionViewSource.GetDefaultView(lvDepartment.DataContext);
            lvEmployees.DataContext = (view0.CurrentItem as Departments).Employees;
        }
    }
}
