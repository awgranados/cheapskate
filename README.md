# project-t03-cheapskate
---

## Former Deployment Details (for MVP - Chrome Extension)

### Functionality
The user simply needs to search up the title of the game they wish to see, and the extension will return the fetched information in a table inside the popup window.

### Known Problems
Clicking on one of the fetched links will immediately close the extension window.

### Tech Stack
HTML, CSS, JS, Python, Chrome Developer Tools

### Project Details
Our project is a Chrome extension that allows users to find cheaper listings of a particular video game they're looking for easily and quickly. Rather than the user having to scour different game stores, key websites, and the like, the user simply has to type in the name of the game they're looking for and the extension will display the lowest-priced listings of that video game right in the extension popup window. The front end of the extension itself will be built on HTML and CSS, while we will use libraries such as BeautifulSoup to help us accomplish the task of scraping different websites for the needed information and data. This information will then be sorted and displayed in a clean, minimalistic manner for easier use for the user.

### User Roles
We essentially only have one user role, which is the user of the extension. There is no need for any sort of admin maintenance, other than on the developing end. There is only one type of user, and it is the person inputting information to the extension.

The user will be able to open the extension, have the extension take in the name of a video game that they are looking for, and the extension will output a list of the cheapest listings of that particular video game on different websites. The user will be able to click on each these listings to open a new tab leading to that listing on each website.

---
## Final Deployment Details (Web Application)

### [Deployment Instructions](./docs/DEPLOY.md)

### Tech Stack
Javascript, React, Node.js, Express, MongoDB, Render

### Project Details
Our project is now a web application that allows users to add their favorite games to a list and rate them as per their desire in an efficient manner. The user can accomplish the same by searching for a particular game and adding it directly if it is available on Steam or by manually inputting details. The results from Steam are displayed in a popup window to the user, leaving them with the choice to add a game from there or simply close the window. The front end of the extension itself will be built on React and Javascript, with the Puppeteer library being used to scrape results from Steam. The backend is written using Node.js and Express, with all data being stored in a cluster (connected to the application) on MongoDB. The web application has been deployed on Render.

### User Roles
There still only exists one user role, which is the user of the web application. There is no need for any sort of admin maintenance, other than on the developing end. There is only one type of user, and it is the person inputting information into the extension.

### Testing
To test the steam-scraper, go into the Extension directory and run 'mocha' to run all the tests.
To test the backend, go into the backend directory and run 'mocha' to run all the tests.

### Deployment Link
https://cheapskate-t03.onrender.com
