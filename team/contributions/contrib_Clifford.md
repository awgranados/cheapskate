# Clifford Xu

## Contributions

Updated the UI for our Chrome Extension before we changed our project to a Web App.

Implemented Unit Tests and Higher Level Tests using Mocha for our scraper and web app.

Created the form page that allows you to add games to our database (MongoDB).

Implemented a scoring system, which allows users to give a review (1 - 10) of their games and by clicking the "save" button would make a PUT request into our database to save that score to the game.
This is so that if the user were to refresh the page, or go back to the website, then their scores would be saved properly and displayed correctly.

Created a delete button that allows users to delete a list from the list table.

Worked on creating a delete button that would allow users to delete a game from a list, but this didn't work out.

Fixed the form page by allowing users to add games that would display directly on the list page of games, since previously it only added a game to the database, but not to a specific list.

Added a default Game picture for games that were added to lists using the form instead of the scraper.
