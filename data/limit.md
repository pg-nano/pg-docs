---
title: 'PostgreSQL LIMIT'
page_title: 'PostgreSQL LIMIT Clause'
page_description: 'In this tutorial, you will learn how to use PostgreSQL LIMIT clause to get a subset of rows generated by a query.'
prev_url: 'https://www.postgresqltutorial.com/postgresql-tutorial/postgresql-limit/'
ogImage: '/postgresqltutorial/film_table.png'
updatedOn: '2024-04-19T07:40:00+00:00'
enableTableOfContents: true
previousLink:
  title: 'PostgreSQL OR Operator'
  slug: 'postgresql-tutorial/postgresql-or'
nextLink:
  title: 'PostgreSQL FETCH'
  slug: 'postgresql-tutorial/postgresql-fetch'
---

**Summary**: in this tutorial, you will learn how to use the **PostgreSQL LIMIT** clause to get a subset of rows generated by a query.

## Introduction to PostgreSQL LIMIT clause

PostgreSQL `LIMIT` is an optional clause of the [`SELECT`](postgresql-select) statement that constrains the number of rows returned by the query.

Here’s the basic syntax of the `LIMIT` clause:

```sql
SELECT
  select_list
FROM
  table_name
ORDER BY
  sort_expression
LIMIT
  row_count;
```

The statement returns `row_count` rows generated by the query. If the `row_count` is zero, the query returns an empty set. If the `row_count` is `NULL`, the query returns the same result set as it does not have the `LIMIT` clause.

If you want to skip a number of rows before returning the `row_count` rows, you can use `OFFSET` clause placed after the `LIMIT` clause:

```sql
SELECT
  select_list
FROM
  table_name
ORDER BY
  sort_expression
LIMIT
  row_count
OFFSET
  row_to_skip;
```

The statement first skips `row_to_skip` rows before returning `row_count` rows generated by the query.

If the `row_to_skip` is zero, the statement will work like it doesn’t have the `OFFSET` clause.

It’s important to note that PostgreSQL evaluates the `OFFSET` clause before the `LIMIT` clause.

PostgreSQL stores rows in a table in an unspecified order, therefore, when you use the `LIMIT` clause, you should always use the [`ORDER BY`](postgresql-order-by) clause to control the row order.

If you don’t use the `ORDER BY` clause, you may get a result set with the rows in an unspecified order.

## PostgreSQL LIMIT clause examples

Let’s take some examples of using the PostgreSQL `LIMIT` clause. We will use the `film` table in the [sample database](../postgresql-getting-started/postgresql-sample-database) for the demonstration.

![PostgreSQL LIMIT - Sample Table](/postgresqltutorial/film_table.png)

### 1\) Using PostgreSQL LIMIT to constrain the number of returned rows

The following statement uses the `LIMIT` clause to get the first five films sorted by `film_id`:

```sql
SELECT
  film_id,
  title,
  release_year
FROM
  film
ORDER BY
  film_id
LIMIT
  5;
```

Output:

```text
 film_id |      title       | release_year
---------+------------------+--------------
       1 | Academy Dinosaur |         2006
       2 | Ace Goldfinger   |         2006
       3 | Adaptation Holes |         2006
       4 | Affair Prejudice |         2006
       5 | African Egg      |         2006
(5 rows)
```

How it works.

- First, sort films by the `film_id` ascending order using the `ORDER BY film_id` clause.
- Second, take 5 films from the top using the `LIMIT 5` clause.

### 2\) Using the LIMIT clause with the OFFSET clause example

To retrieve 4 films starting from the fourth one ordered by `film_id`, you can use both `LIMIT` and `OFFSET` clauses as follows:

```
SELECT
  film_id,
  title,
  release_year
FROM
  film
ORDER BY
  film_id
LIMIT 4 OFFSET 3;
```

Output:

```text
 film_id |      title       | release_year
---------+------------------+--------------
       4 | Affair Prejudice |         2006
       5 | African Egg      |         2006
       6 | Agent Truman     |         2006
       7 | Airplane Sierra  |         2006
(4 rows)
```

How it works.

- First, sort films by film id in ascending order.
- Second, skip the first three rows using the `OFFSET 3` clause.
- Second, take the next four rows using the `LIMIT 4` clause.

### 3\) Using LIMIT OFFSET to get top/bottom N rows

Typically, you often use the `LIMIT` clause to select rows with the highest or lowest values from a table.

The following example uses the `LIMIT` clause to retrieve the top 10 most expensive films by rental rate:

```
SELECT
  film_id,
  title,
  rental_rate
FROM
  film
ORDER BY
  rental_rate DESC
LIMIT
  10;
```

Output:

```
 film_id |        title        | rental_rate
---------+---------------------+-------------
      13 | Ali Forever         |        4.99
      20 | Amelie Hellfighters |        4.99
       7 | Airplane Sierra     |        4.99
      10 | Aladdin Calendar    |        4.99
       2 | Ace Goldfinger      |        4.99
       8 | Airport Pollock     |        4.99
      98 | Bright Encounters   |        4.99
     133 | Chamber Italian     |        4.99
     384 | Grosse Wonderful    |        4.99
      21 | American Circus     |        4.99
(10 rows)
```

How it works.

- First, sort all the films by rental rates from high to low using the `ORDER BY rental_rate` clause.
- Second, take only 10 rows from the top using the `LIMIT 10` clause.

## Summary

- Use the PostgreSQL `LIMIT OFFSET` clause to retrieve a subset of rows returned by a query.