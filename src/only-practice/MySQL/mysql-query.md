Subquery

1. Produce name and cities of all customers with the same rating as Hoffman.
=> SELECT CNAME, CITY,RATING FROM customer WHERE RATING = (SELECT RATING FROM customer WHERE CNAME='Hoffman') AND CNAME!="Hoffman"

2. Produce the names and rating of all customers who have above average orders.
=> SELECT CNUM, CNAME FROM customer WHERE CNUM IN (SELECT DISTINCT(CNUM) FROM orders WHERE AMT >= (SELECT AVG(AMT) FROM orders))