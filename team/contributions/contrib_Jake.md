# Jake Yim

## Contributions

- Setup some core API functionality and their respective frontend components:
  - Altered MongoDB model schemas to hold correct fields and prevent redundant entries using Object references
  - Created List page and the respective endpoint to fetch all games in a specific list
  - Implemented a popup modal to display scraper search results in a table that contains the game image, title, and an add button
  - Created an endpoint and frontend button to add a specific scraper result to the current list
- Implemented support for multiple users:
  - Wrote action script in Auth0 that creates a new user in our MongoDB database whenever a new user registers through Auth0
  - Altered existing endpoints to fetch and post for a specific logged in user instead of a hardcoded one 
- Fixed issue with new lists not being rendered immediately after added (originally they were only rendered after reloading the page)
