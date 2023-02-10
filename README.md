# project-t03-cheapskate

## [Deployment Instructions](./team/DEPLOYMENT.md)

## Functionality
The user simply needs to search up the title of the game they wish to see, and the extension will return the fetched information in a table inside the popup window.

## Known Problems
TODO: Describe any known issues, bugs, odd behaviors or code smells. Provide steps to reproduce the problem and/or name a file or a function where the problem lives.

## Tech Stack
HTML, CSS, JS, Python, Chrome Developer Tools

## Project Details
Our project is a Chrome extension that allows users to find cheaper listings of a particular video game they're looking for easily and quickly. Rather than the user having to scour different game stores, key websites, and the like, the user simply has to type in the name of the game they're looking for and the extension will display the lowest-priced listings of that video game right in the extension popup window. The front end of the extension itself will be built on HTML and CSS, while we will use libraries such as BeautifulSoup to help us accomplish the task of scraping different websites for the needed information and data. This information will then be sorted and displayed in a clean, minimalistic manner for easier use for the user.

## User Roles
We essentially only have one user role, which is the user of the extension. There is no need for any sort of admin maintenance, other than on the developing end. There is only one type of user, and it is the person inputting information to the extension.

The user will be able to open the extension, have the extension take in the name of a video game that they are looking for, and the extension will output a list of the cheapest listings of that particular video game on different websites. The user will be able to click on each these listings to open a new tab leading to that listing on each website.
