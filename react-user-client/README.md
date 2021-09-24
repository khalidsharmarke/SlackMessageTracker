# React User Client
This package's purpose is to make viewable the workspace's data.  
It's responsible for providing an intuitive layout for users to view their workspace's data.  
Built using `npx create-react-app` with all available functionality intact.

## Design
The UI is meant to emulate slack's workspace, where there are a list of channels on the left of the page and a scrollable body of messages in the center.  
This is accomplished by the following react structure:
- App:
  - ChannelList:
    - Channel
  - MessageList:
    - Message

Here, the base App will render the lists of channels and messages that have been passed data to construct each channel and message.  
On page load, the App will make a WSC to the backend where it'll be receiving data from.
On a selected channel in ChannelList, the App will render the appropriate MessageList for that channel.
On scrolling to the end of a MessageList, the App will request a new page of data from the backend to continue populating the MessageList.  
On receiving new data, the App will modify it's state which will lead to both/either child components rerendering with the new data.  

## State
The state is lifted up to and completely handled by the App component.  
The App controls and manipulates the state by:
  1. storing pertinent data
  2. tracking which channel the user is currently viewing
  3. passing the data to the other components
  4. passing methods that manipulate the state to the other compenents
  5. declaring methods that create new network requests
  6. declaring methods that either modify or append to the stored data

The state is structured by 2 keys: active_channel and data.  
Data is where the representation of the data the backend has is stored.  
Active_channel is where the App tracks which channel is currently being viewed.  

The App will pass down methods to MessageList that allow it to make request for new pages of data for the given channel.
The App will pass down methods to ChannelList that allow it to change active_channel.
