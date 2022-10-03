# Getting Started with GitHub Search

Simple web app to search for github repositories <br>
It uses [GitHub Rest API](https://docs.github.com/en/rest)<br>
You can search any repository by its name in this web application

# How to run
- Run below commands in order after installing apropriate [Node](https://nodejs.org/en/) version<br>
  `npm install`<br>
  `npm start`

Now, you can see the web application on your browser at address : [http://localhost:3000](http://localhost:3000)

# How to run tests

No tests are written yet.

# Future improvements

- Pagination item can be implemented in a more sophisticated way
- Adding more parameters to the API request header for better performance
- Using GraphQL API of the GitHub for faster and lightweight responses instead of REST
- Implementing caching mechanism for better performance and not exceeding the rate limit of the API
- Using more sophisticated search bar without search button (it may search as you typed query)
- Adding more filter for repository details (user, language, update time, star count)
- Reducing request number by reading maximum items at once and splitting it while showing to the user
- Authentication token can be added for increasing the API rate limit
- Database integration can be handled for preventing API request so often
