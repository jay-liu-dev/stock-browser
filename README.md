# Simple Stock Quote Monitoring Application (using Yahoo financial API)

![The app in action](/screenshot.png?raw=true 'The app in action')

## Notes

- Yahoo API updates the stock prices every 5 minutes, thus the real-time update on the page is on the interval of 5 minutes
- Yahoo API has a quota for freemium accounts, the app will cease to function when quota is reached
- Selected stocks are cached on local storage meaning that the next time you visit the page, the previous selection will
  persist
- When selecting the stocks, the selector input is filled with default options. However, as you start typing, it will query Yahoo API and list the corresponding stocks. (this will exhaust the quota though)

## How to set up

### Client

- Go to `client` directory and run `yarn install`

### Server

- Go to `server` directory and run `yarn install`
- Create a `.env` file and fill it with the API credentials and other configs

## How to run

Please run the server first and then the client.  
If not, please reload the client page when server is up.

### Server

- Go to `server` directory and run `npm start`

### Client

- Go to `client` directory and run `npm start`

## Precautions

- Server is using the port 3001 as default and the client is configured under that assumption. When you have to change this port, please contact Jay and re-configure the front-end accordingly.
- Yahoo API is not always working, but the error cases are gracefully ignored and wouldn't crash the app.
