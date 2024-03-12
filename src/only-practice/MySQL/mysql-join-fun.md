1) LEFT OUTER JOIN:

=> SELECT salespeople.Snum, salespeople.Sname, orders.SNUM, orders.AMT FROM salespeople
LEFT OUTER JOIN orders
ON salespeople.Snum = orders.SNUM

=> SELECT salespeople.Snum, salespeople.Sname, customer.SNUM, customer.CNAME FROM salespeople
LEFT OUTER JOIN customer
ON salespeople.Snum = customer.SNUM

2) RIGHT OUTER JOIN:

=> SELECT salespeople.Snum, salespeople.Sname, orders.SNUM, orders.AMT FROM orders
RIGHT OUTER JOIN salespeople
ON salespeople.Snum = orders.SNUM

=> SELECT customer.SNUM, customer.CNAME, salespeople.Sname, salespeople.Snum FROM customer
RIGHT OUTER JOIN salespeople
ON salespeople.Snum = customer.SNUM

3) UNION ALL // CROSS

=> SELECT salespeople.Snum, salespeople.Sname, orders.SNUM, orders.AMT FROM salespeople
LEFT OUTER JOIN orders
ON salespeople.Snum = orders.SNUM

UNION ALL 

SELECT salespeople.Snum, salespeople.Sname, orders.SNUM, orders.AMT FROM salespeople
RIGHT OUTER JOIN orders
ON salespeople.Snum = orders.SNUM

=> SELECT customer.SNUM, customer.CNAME, salespeople.Sname, salespeople.Snum FROM customer
RIGHT OUTER JOIN salespeople
ON salespeople.Snum = customer.SNUM

UNION ALL 

SELECT customer.SNUM, customer.CNAME, salespeople.Sname, salespeople.Snum FROM salespeople
LEFT OUTER JOIN customer
ON salespeople.Snum = customer.SNUM
