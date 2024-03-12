
1) Display snum, sname, city and comm. Of all salespeople.

=> SELECT snum, sname, city, comm FROM salespeople

2) Display all snum without duplicates from all orders.

=> SELECT DISTINCT snum FROM orders

3) Display names and commissions of all salespeople from London.

=> SELECT SNAME, COMM FROM salespeople WHERE city='London'

4) All customers with a rating of 100.

=> SELECT cname FROM customer WHERE rating=100

5) Produce order no, amount and date for all rows in the order table

=> SELECT ONUM, AMT, ODATE FROM orders

6) All customers who were either located in San Jose or had a rating above $200.

=> select *from customer where city='San Jose' or rating>200

7) All customers in San Jose, who have a rating > 200

=> SELECT * FROM customer WHERE city="San Jose" AND rating>200

8) All orders for more than $1000.

=> SELECT * FROM orders WHERE amt>=1000;

9) Names and cities of all salespeople in London with a commission above 0.10.

=> SELECT sname, city FROM salespeople WHERE city="London" AND comm>0.10;

10) All customers excluding those with rating <= 100 if they are located in Rome.

=> SELECT * FROM customer WHERE rating<=100 AND city='Rome';

11) All salespeople either in Barcelona or in London.

=> SELECT * FROM salespeople WHERE city="London" OR city="Barcelona"

12) All salespeople with commission between 0.10 and 0.12 boundary. (Boundary values 0.10
and 0.12 to be included.)

=> SELECT * FROM salespeople WHERE comm<=0.1 OR comm<=0.12;

13) All customers without a city.
=> SELECT cnum, cname, rating, snum FROM customer

14) All orders taken on Mar. 10th or 10th Apr.

=> SELECT * FROM orders WHERE odate="10-MAR-94" OR odate="10-APR-94"

15) All customers services by Peel or Motika.

=> 

16) All customers whose names begin with a letter A or G.

=> SELECT * FROM customer WHERE CNAME LIKE 'G%';
=> SELECT * FROM customer WHERE cname LIKE 'a%' OR cname LIKE 'g%'

17) All orders except those with 0 or null value in amt field.

=> SELECT * FROM orders WHERE amt!=0 OR NULL;

18) Count the number of salespeople currently listing orders in the order table

=> SELECT COUNT(DISTINCT SNUM) FROM orders;

19) Largest order taken by each sales order value more than $3000.

=>

20) Which day had the highest total amount ordered?

=>

21) Count all orders for 10 June.
Get the output like:

For dd/mm/yy, there are orders

=> SELECT COUNT(ONUM) FROM orders WHERE ODATE="10-MAY-94";

22) Count the number of different non-null city values in customers table.

=> SELECT COUNT(DISTINCT CITY) FROM customer;

23) Assume that each salesperson has a commission of 12%. Produce order no, salesman no
and amount salesman commission for each day and place the result in descending order.

=> SELECT onum, snum, (amt * 0.12) AS COMM_AMT FROM orders ORDER BY COMM_AMT DESC;

24) Find salespeople no, who have multiple customers.

=> SELECT SNUM FROM customer GROUP BY SNUM HAVING COUNT(SNUM) > 1;

25) Extract rows of all salespeople with more than one current order.

=> SELECT SNUM, COUNT(SNUM) FROM orders GROUP BY SNUM HAVING SNUM;