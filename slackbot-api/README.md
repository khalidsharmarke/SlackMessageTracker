# Slackbot-API (BackEnd)

The purpose of this package is to make database queries.  
it's responsible for receiving slack-client's requests and storing the data and presenting the data to react-user-client.  
Built using Django, leveraging Django's built-in ORM to make the queries.

## Scope
It contains 2 apps:
  1. frontend:
      - serves the react app with data via a socketed connection
      - built using Django Channels

  2. api:
      - receives data from slack-client for writing to the DB
      - uses the built in Django ORM to make database queries
