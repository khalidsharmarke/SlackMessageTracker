# Slackbot-API (BackEnd)

The purpose of this package is to make database queries.  
it's responsible for receiving slack-client's requests and storing the data and presenting the data to react-user-client.  
Built using Django, leveraging Django's built-in ORM to make the queries.

It contains 2 apps:
  1. frontend:
      - serves the react app with data via a socketed connection
      - built using Django Channels

  2. api:
      - receives data from slack-client for writing to the DB
      - uses the built in Django ORM to make database queries

## Frontend
This app is responsible for 2 things: serving the react page and providing the page wtih data.  
It accomplishes this by providing the endpoints for serving the react page and websocket connection.  
  
On HTTP request, it serves the client with the react page that will then make a WSC request back to the package.  
On WSC request, the app will append a socketed connection to the layer of socketed connections that handles in-memory management.  
On WSC instantiation, an instance of ./MessagesDataSet is appended to the connection.  
On sokcet new data request, a page of data will be sent to the react page for the request channel.  

### MessagesDataSet
The MessagesDataSet class is responsible for performing queries that'll provide the webpage with the needed data.  
It accomplishes this by keeping a collection of references to querysets of Messages in memory.  
  
The structure of the data is a python Object where each key is the name of a Channel.  
The value for each key is another Object where there is a Django Paginator and a key that tracks which page the react page is on.  
This collection is built by querying the Channels table and for each Channel, it creates the key value pair above.  
the Paginator is constructed with a queryset from querying the Messages table for all messages from the given channel.  
  
Because Django doesn't execute queries in the Paginators, the time complexity of the construction of the collection is O(n).  
The burden of querying is pushed to the event where the react page is to be served the next page of data.  
