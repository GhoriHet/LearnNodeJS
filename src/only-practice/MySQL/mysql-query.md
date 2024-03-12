Subquery

1. Produce name and cities of all customers with the same rating as Hoffman.
=> SELECT CNAME, CITY,RATING FROM customer WHERE RATING = (SELECT RATING FROM customer WHERE CNAME='Hoffman') AND CNAME!="Hoffman"

2. Produce the names and rating of all customers who have above average orders.
=> SELECT CNUM, CNAME FROM customer WHERE CNUM IN (SELECT DISTINCT(CNUM) FROM orders WHERE AMT >= (SELECT AVG(AMT) FROM orders))

3. All orders that are greater than the average for Oct. 4
=> SELECT * FROM orders WHERE AMT > (SELECT AVG(AMT) FROM orders WHERE ODATE='10-MAY-94');
=> SELECT ODATE, AMT FROM orders WHERE AMT > (SELECT AVG(AMT) FROM orders WHERE ODATE='10-MAY-94'); // only date and average 

4. Find all customers whose cnum is 1000 above the snum of serres.
=> SELECT * FROM customer WHERE cnum IN ( SELECT snum + 1005 FROM customer );

5. Count the customers with rating above San Jose’s average.
=> SELECT COUNT(*) AS num_customers_above_avg FROM customer WHERE rating > ( SELECT AVG(rating) FROM customer WHERE city = 'Rome' );