Subquery

1. Produce name and cities of all customers with the same rating as Hoffman.
=> SELECT CNAME, CITY,RATING FROM customer WHERE RATING = (SELECT RATING FROM customer WHERE CNAME='Hoffman') AND CNAME!="Hoffman"

2. Produce the names and rating of all customers who have above average orders.
=> SELECT CNUM, CNAME FROM customer WHERE CNUM IN (SELECT DISTINCT(CNUM) FROM orders WHERE AMT >= (SELECT AVG(AMT) FROM orders))

3. All orders that are greater than the average for Oct. 4
=> SELECT ONUM, AMT FROM orders WHERE amt > ( SELECT AVG(amt) FROM orders WHERE ODATE = '10-APR-94' )

4. Find all customers whose cnum is 1000 above the snum of serres.
=> SELECT cnum, cname FROM customer WHERE cnum IN ( SELECT (snum + 1005) FROM salespeople )

5. Count the customers with rating above San Jose’s average.
=> SELECT COUNT(CNUM) AS 'Total Customer' FROM customer WHERE RATING > ( 
    SELECT AVG(RATING) FROM customer WHERE CITY = 'San Jose'
)

6. Find name and number of salespeople who have more than or a customer.
=> SELECT SNUM, SNAME FROM salespeople WHERE SNUM = (SELECT SNUM FROM customer GROUP BY SNUM HAVING COUNT(CNUM) > 1)

7. Find total amount in orders for each salesperson for whom this total is greater than the amount of the largest order in the order table.
=> SELECT SNUM, SUM(AMT) FROM orders GROUP BY SNUM HAVING SUM(AMT) > (SELECT MAX(AMT) FROM orders)

8. All orders credited to the same salesperson who services Hoffman.
=> SELECT * FROM orders WHERE SNUM = (SELECT SNUM FROM customer WHERE CNAME = 'Hoffman')

9. Find the sums of the amounts from order table grouped by date, eliminating all those dates where the sum was not at least 2000 above the maximum amount.
=> SELECT SUM(AMT), ODATE FROM orders GROUP BY ODATE HAVING SUM(AMT) > (SELECT MAX(AMT)+1000 FROM orders)

10. Find salespeople number, name, and city who have multiple customers.
=> SELECT SNUM, SNAME, CITY FROM salespeople WHERE SNUM = (SELECT  SNUM FROM customer GROUP BY SNUM HAVING COUNT(CNUM) > 1)