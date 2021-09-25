# Slackbot-API (BackEnd)

The purpose of this package is to handle the reading and writing of data to the database.  
It's responsible for receiving slack-client's requests and storing the data and presenting the data to react-user-client.  
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

## API
This app is responsible for 1 thing: making write queries to the database with the data provided from slack-client.  
It accomplishes this by providing endpoints for POST and PATCH requests where it'll handle CRUD opertations.  
  
For each table, it provides an endpoint: /users, /channels, /messages.  
Each endpoint is built ontop of a base class called ./views/BaseView where the individual endpoint will pass their Model's constructor to the base class.  
This class provides the methods to each endpoint where the actual CRUD operation is described.  
On each request to an endpoint, the app will construct the query and then send a response to the slack-client.
  
### CRUD Operations
The two main CRUD operations that are made are create and update, handled by POST and PATCH requests respectively.  
Because the data that is being passed is in the form of a list, the methodology is the make a query for each item in the list.  
For each item:
  1. validate the structure of the item data
  2. construct a new database entry using the provided Model
  3. make the database query
