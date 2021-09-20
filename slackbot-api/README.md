# BackEnd

Built using Django, this process serves the react app front end with data and handles the read/writes to the Database.

It contains 2 apps:
  1. frontend:
      - serves the react app with data via a socketed connection
      - built using Django Channels

  2. api:
      - receives data from slack-client for writing to the DB
      - uses the built in Django ORM with psycopg2 to make PostgreSQL queries
