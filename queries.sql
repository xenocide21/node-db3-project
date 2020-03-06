  
-- Multi-Table Query Practice

-- Display the ProductName and CategoryName for all products in the database. Shows 77 records.

SELECT p.ProductName, c.CategoryName
  FROM Product AS p
JOIN Category AS c
  ON p.CategoryId = c.Id;

-- Display the order Id and shipper CompanyName for all orders placed before August 9 2012. Shows 429 records.

SELECT o.Id AS OrderID, s.CompanyName AS ShipperCompany
FROM [Order] AS o
JOIN Shipper AS s
ON o.ShipVia = s.Id
WHERE o.OrderDate < '2012-08-09';

-- Display the name and quantity of the products ordered in order with Id 10251. Sort by ProductName. Shows 3 records.

SELECT p.ProductName, od.Quantity AS QuantityOfProduct
FROM OrderDetail AS od
JOIN Product AS p
ON od.ProductId = p.Id
WHERE od.OrderId = 10251;

-- Display the OrderID, Customer's Company Name and the employee's LastName for every order. All columns should be labeled clearly. Displays 16,789 records.

-- NOTE: Left join would retrieve more records. It says 'every' order. 

SELECT o.Id AS OrderID, c.CompanyName AS CustomersCompany, e.LastName
  FROM [Order] AS o
JOIN Customer AS c
  ON o.CustomerId = c.Id
JOIN Employee AS e
  ON o.EmployeeId = e.Id;

-- Stretch: Displays CategoryName and a new column called Count that shows how many products are in each category. Shows 9 records.

SELECT c.CategoryName, COUNT(DISTINCT p.ProductName) AS DistinctProducts
  FROM Products AS p
JOIN Categories AS c
  ON p.CategoryId = c.CategoryId
GROUP BY c.CategoryName;

-- Stretch: Display OrderID and a column called ItemCount that shows the total number of products placed on the order. Shows 196 records.

SELECT o.Id AS OrderID, SUM(od.Quantity) AS ItemCount
FROM [Order] AS o
JOIN OrderDetail AS od
ON o.Id = od.OrderId
GROUP BY o.Id;