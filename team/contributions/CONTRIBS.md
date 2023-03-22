# Arnav Nayudu

#### Role: UX Coordinator, Final Presentation Leader

## Contributions

- Helped teammates with many various problems by debugging their code and discussing the problem they were trying to solve
- Debugged and solved multiple critical issues myself throughout the course of development, from Puppeteer configuration issues to endpoint routing issues
- Created the table UI and generation code for the original Chrome extension application
- Was responsible for refactoring our backend API to handle requests properly, with appropriate status codes
- Solved an issue that was preventing the POST endpoint for Lists from completing
- Converted web scraper code into an API endpoint for our webapp to use
- Linked search bar on List UI to the web scraper, allowing our webapp to search Steam and display the results in the frontend
- Single-handedly created, edited, and presented the entire MVP demo
- Organized, edited, and presented the final presentation as Final Presentation Leader

# 

# Alexander Granados

#### Role: Retro 3 Leader, User Manual Coordinator

## Contributions

- Overall gave ideas and feedback towards the task at hand that the team was working on
- Led the third and final retro meeting, helped to create vision for the final product
- Updated and maintained the Lists UI in order to match with the rest our design vision
- Linked together the delete button with interactive UI on the Lists page so that it could be usable
- Created and oversaw completion of the the User Manual
- Contributed to the "Team Decisions" portion of the Design Document

#

# Clifford Xu

#### Role: Testing/QA Coordinator

## Contributions

- Updated the UI for our Chrome Extension before we changed our project to a Web App.
- Implemented Unit Tests and Higher Level Tests using Mocha for our scraper and web app.
- Created the form page that allows you to add games to our database (MongoDB).
- Implemented a scoring system, which allows users to give a review (1 - 10) of their games and by clicking the "save" button would make a PUT request into our database to save that score to the game.
  - This is so that if the user were to refresh the page, or go back to the website, then their scores would be saved properly and displayed correctly.
- Created a delete button that allows users to delete a list from the list table.
- Worked on creating a delete button that would allow users to delete a game from a list, but this didn't work out.
- Fixed the form page by allowing users to add games that would display directly on the list page of games, since previously it only added a game to the database, but not to a specific list.
- Added a default Game picture for games that were added to lists using the form instead of the scraper.

#

# Jake Yim

#### Role: Scrum Master

## Contributions

- Setup some core API functionality and their respective frontend components:
  - Altered MongoDB model schemas to hold correct fields and prevent redundant entries using Object references. I made it so a user's list contains an array of references to games instead of the games itself. This way if we change an entry in the game table, it will update for every instance of that game in any list.
  - Created the List page, which displays all the games contained in a specific list in a table. The table contains the game image, title and rating. Wrote the respective GET endpoint to fetch all games in a specific list. 
  - Implemented a popup modal to display scraper search results in a table that contains the game image, title, price, discounted price, and an add button
  - Created the POST endpoint and respective frontend button to add a specific scraper result to the current list page
- Implemented support for multiple users:
  - Wrote action script in Auth0 that creates a new user in our MongoDB database whenever a new user registers through Auth0. Wrote the respective POST endpoint to create the user.
  - Altered existing endpoints to fetch and post for a specific logged in user instead of a hardcoded one 
- Fixed issue with new lists not being rendered immediately after added (originally they were only rendered after reloading the page)

# 

# Jin Jeong

#### Role: Design Document Coordinator

## Contributions

- Overall tried to provide help to other teammates whenever possible.
- Added a search bar to the Chrome extension pre-pivot.
- Primarily worked on trying to get the scraper to function on different websites (and got it to work), but we realized it was only really feasible with the Steam store, which led to the pivoting of our project.
- Handled the implementation of authorization and authentication in the web application through the use of Auth0's services, as well as any external setup required outside of the web app.
- Implemented the profile drop-down on the right side of the navbar that allows the user to log out of the web app, as well as lead them to their lists page.
- Ensured that certain features of the website were only visible to logged-in users on the web app.
- Set up the deployment of the web application's frontend and backend on Render.
  - Resolved issues that would occur in the deployment but would not show up in the local deployment.
- Oversaw the completion of the Design Document. Personally wrote the User Flow and UX Considerations section of the document.
  - Created the diagram visible in the User Flow and UX Considerations section.

#

# Kelvin Zhang

#### Role: Deployment Document Coordinator

## Contributions

- Scribed multiple sprints and retros and commited them to the team documentation. 
- When our product was a Google Chrome extension, I fixed the display issues with the extension by gathering the data from the scraper and fitting it into a nice looking table, splitting the necessary info into different cells.
- I also fixed the issue with the HTML being returned into the extension display.
- When we switched over to the web app, I helped get the component to add games, formerly called form tab, working properly. I also created the list table component which retrieved all the lists that the user adds to the database, and then stores them in a table along with the userID of the user who added the list. 
- Added additonal features to the form tab that allowed users to select which list they want to add their game to and linked the endpoints so that they could add games not on steam directly to their lists.
- Worked on creating a delete feature to remove games for lists with other team members although wasn't able to get that done in time in the end due to MongoDB's api bugging out.
- Finally, I made many UI improvements and fixes to the app, using material ui on the list table component, form tab component, and dropdown, as well as the steam scraper overlay and table for each specific list. 


### Disclaimer
Please note that I have two Github Ids when looking at /graphs/contributors. One is the one I'm signed in on Github with online which is KelvinZhang123 the other is the one that is connected to my VSCode where most of my code related commits are, that one is under the id kelvinzhang1.

#

# Rishabh Poikayil

#### Role: Product Owner

## Contributions

- Coordinated the desgination of tasks and frequently communicated with team members to ensure that the project was on schedule throughout the quarter
    - Helped other team members with issues in their task domain as needed
- Created multiple user stories (containing sub-issues with acceptance criterias) on the Kanban board to develop a list of action items needed for the project
- Coded the Steam web-scraper in Javascript from scratch using the Puppeteer library to return the necessary information for a searched game 
    -  This was done due to the lack of an API returning game information present on Steam's website
- Set up the codebase for the web application after the decision was made to pivot from the Chrome extension
    - Designed the templates to display information on the frontend using React
    - Utilized Node.js and Express to create a server listening to requests made from the client-side
    - Connected the MongoDB database to the web application to store user data
- Led sprint planning meetings and took notes documenting Scrum meetings over the course of multiple sprints
- Wrote the introduction and system architecture sections for the design document
    - Constructed the diagram explaining the system architecture of the web application
- Made minor fixes to the styling of individual components displaying information on the web application
