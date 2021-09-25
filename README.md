# SlackMessageTracker
## Introduction
The purpose of this project is to give users a work around to Slack's Personal Workspace limits around data storage.  
It accomplishes that by giving users a website that allows them to view their workspace's present and past data.

## Design Choices
There are 3 Major points that this project is build on: getting, storing, and viewing data from a given workspace.  
Development of this project separates these areas of concern into 3 packages:
- slack-client for getting data
- slackbot-api for storing data
- react-user-client for viewing data

The pros of this approach are:
- each package can be deployed separately, allowing for a more distrubted system
- each package can be scaled appropriately for a given need, ie more servers are needed to make read and writes to the database
- each package can introduce more complexity without disrupting the entire system, ie employing a Redis queue between getting and storing data

The drawbacks of this approach are mainly a lack of flexibility given that each package makes assumptions on how the others will send/receive data.  
An example of this would be that the addition of a new feature that would add more tables to the database would then need implemented accross all 3 packages.  
For a solo developer, this may be fine, but for a team of devs this could prove to be difficult.

## Database
There are 3 tables: Users, Channels,and Messages. 
These 3 encompass the current available features that this project has to offer of displaying who posted what message in which channel.  

