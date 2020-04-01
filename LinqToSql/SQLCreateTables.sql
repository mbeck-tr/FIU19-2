Create table Departments (
	ID int primary key identity,
	Name nvarchar(50),
	Location nvarchar(50)
)
GO

Create table Employees (
	ID int primary key identity,
	FirstName nvarchar(50),
	LastName nvarchar(50),
	Gender nvarchar(50),
	Salary int,
	DepartmentId int foreign key references Departments(ID)
)
GO

Insert into Departments values('IT','New York')
Insert into Departments values('HR','London')
Insert into Departments values('Payroll','Sydney')
GO

insert into Employees values('Mark','Hastings','Male',60000,1)
insert into Employees values('Steve','Pound','Male',45000,3)
insert into Employees values('Ben','Hoskins','Male',70000,2)
insert into Employees values('Mary','Lambeth','Female',60000,2)
GO

