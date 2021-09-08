# GitHub Repository Search App

This application uses the GitHub API to fetch repositories by name or language with the option to filter by star count.

## Known Issues and Possible Solutions
A few different issues are apparent when using this app but due to the short timeframe, I decided not to implement the possible solutions. Instead, I'll breakdown these issues and their solutions here.

### API Throttling
The API throttles requests and sends back a 403 code if the limit is exceeded in a short period of time. It's fairly easy to exceed that limit when quickly skipping through the pages or submitting many search requests at once. This can be avoided by fetching larger amounts per query and then paginating based on locally cached data. Up to 100 items can be returned per API call which would provide up to 10 pages on the application meaning we would only have to make an API call for more data every 10 pages.

This could also be assisted by checking if the data we're calling for has been modified. If the API responds with a 304, we can just used the cached data since we'd be getting the same information back.

### Back/Refreshing Pages
When going back or refreshing the pages, there is a bug that prevents certain fields from re-populating with old state. This could be solved by having a more standard state preservation in the window location history and repopulating the fields through useEffect.

### API Item Limit
The API limits the total items that can be searched to 1000 items total so the pagination prevents going past page 100.

### Stars/Watcher
The API currently has a bug that causes the stargazers_count and watchers attributes to give the same number. I was unable to find a workaround and no other attribute in the response was suitable for these fields.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
