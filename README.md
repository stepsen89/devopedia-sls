# Devopedia - Project App

This project contains the client and backend application for devopedia.
The following instructions show how to use the app locally which will run the client (React application) connected to the deployed API Gateway endpoint.

## Running the frontend app locally

You need to have Git, Nvm installed to run the client code locally

First, clone the repository to your local machine.
Go into the project folder and navigate to the client folder.

This will contain all the necessary code to run the app locally.

  ```bash
  npm install
  ```

*NOTE: npm install will install all the dependencies*

  ```bash
  npm run start
  ```

this command will start the application, running it on `localhost:3005` to avoid any conflicts with your existing localhosts (which mainly runs on localhost:3000)

open your browser on `localhost:3005` (in general, running `npm run start` would open a new tab if you're already having an open window)

Now, log in (using Google, or create new account) and start your journey.


## Setup/Technologies used

- ReactJS
- TailwindCSS
- Auth0
- DynamoDB
- Serverless Framework (using NodeJS, Typescript): AWS Lambda, API Gateway
- Git

## App Functionalities

 1. Log in and create an item
 2. See list of all entries for your user (auth with auth0)
 3. Edit an entry and update properties
 4. "Learn" entry which will update the repeated number
 5. Set an entry to be done automatically when repeated number = repeating Times
 6. Delete items



