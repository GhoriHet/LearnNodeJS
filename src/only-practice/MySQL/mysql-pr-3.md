1) All combination of salespeople and customers who belong to the same city.

=>
SELECT salespeople.Sname, customer.CNAME, customer.CITY
FROM salespeople
INNER JOIN customer
ON salespeople.City = customer.CITY;

2) Names of all customers matched with the salespeople serving them.

=>
SELECT customer.CNAME, salespeople.Sname
FROM salespeople
INNER JOIN customer
ON salespeople.Snum = customer.SNUM;

3) List each order with the name of the customer who placed the order.

=>
SELECT customer.CNAME, orders.AMT, orders.ONUM
FROM customer
INNER JOIN orders
ON customer.Snum = orders.SNUM;

4) Produce a listing of all the customers serviced by salespeople having commission more
than 12%.

=>
SELECT customer.CNAME, salespeople.Sname, salespeople.Comm
FROM customer
INNER JOIN salespeople
ON customer.Snum = salespeople.SNUM
HAVING salespeople.Comm > 0.12

5) Calculate the amount of salesperson’s commission on each order with a rating above
100.

=>
SELECT orders.SNUM, orders.ONUM, salespeople.Comm, (orders.AMT * salespeople.Comm) AS COMM_AMT
FROM orders
INNER JOIN salespeople
ON orders.SNUM = salespeople.Snum

6) Display all customers located in cities where salesman serves has his customers.

=>
SELECT salespeople.Snum, customer.CNAME, salespeople.City, customer.CITY
FROM salespeople
INNER JOIN customer
ON salespeople.Snum = customer.SNUM
WHERE salespeople.City = customer.CITY

7) Produce all pairs of orders by a given customer, name that customer and eliminate
duplicates.

=>
SELECT orders.SNUM, orders.ONUM, salespeople.Comm, (orders.AMT * salespeople.Comm) AS COMM_AMT
FROM orders
INNER JOIN salespeople
ON orders.SNUM = salespeople.Snum
INNER JOIN customer
ON customer.CNUM = orders.CNUM
WHERE customer.RATING > 100

8) Find all customers with orders on Mar 10th

=>
SELECT customer.CNAME
FROM customer
INNER JOIN orders
ON customer.CNUM = orders.CNUM
WHERE orders.ODATE = "10-MAR-94"

9) Find all salespeople who have customers in their cities who they don’t service.

=>