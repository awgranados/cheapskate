# Jake Yim

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
