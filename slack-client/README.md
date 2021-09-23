# Slack Client

This package's purpose is to receive data from Slack for the project for passing to the slackbot-api(backend) package.
This package is resposible for transforming incoming data and passing said data to the backend via HTTP requests.  
It's built ontop of Slack's BoltJS package to hook onto events that occur in the workspace. 
  
## Scope
Currently, the events that are being listened for are:
- User join
- User data change
- New Channel created
- Channel data changed
- New message to tracked channel
  
## Order of Operations

On script start:
- Verify proper hooking to Slack via BoltJS package and correct tokens
- Request all current Users and Channels in the workspace
- Transform incoming [data](#data-handling) to the accepted standard 
- Make 2 requests, for Users and Channels, to the backend with the transformed data
- Await new data from Slack according to [Scope](#scope)

On Event:
- Transform incoming [data](#data-handling) via static class methods
- Make a request to the backend with the data

## Requests to Backend
In this package, all requests to the backend are handled by a single class instance of APIRequestHandler.  
The class does 2 things, send requests and keep a queue of failed requests in local memory.  
The instance will attempt the requests asynchronously and returns a promise.  
Each request will contain the data to be passed as an array to allow for the flexiblity of either sending All Users or just one message.  
On a failed request, it appends the request details to a queue. Failed requests are almost always due to the backend being down.  
On any new requests to send out, it'll first try to clear out the queue of failed requests then send out the more recent request.  

## Data Handling
JS representations of the Table Models kept in the backend are written in ./api_request/schema-definitions.js  
The package uses these constructors to create new pieces of data based on incoming data from Slack.  
The new dat is then appended to the given request created to be sent to the backend.  

# Static Classes
The classes in ./slack_event_handlers outline the methods to be called on a given scope. They're called per event in the Slack Workspace.  
They handle creating the new data points and call the APIRequestHandler with the data to make a new request.






