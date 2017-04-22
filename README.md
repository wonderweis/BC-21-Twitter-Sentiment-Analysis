# BC-21-Twitter-Sentiment-Analysis
# TweetzAnalyzer
A console app that use the Twitter API to fetch tweets for a particular user and save them in JSON file. Shows % progress as the Twitter API is fetching the tweets.  Perform a word-frequency analysis and list the words with their frequency starting from the highest to the lowest excluding stop-words. 

Running Locally

Prerequisites - You will need Node.js installed in your system
Get the files - Run: git clone https://github.com/wonderweis/BC-21-Twitter-Sentiment-Analysis.git to clone the repo and then cd BC-21-Twitter-Sentiment-Analysis to navigate into the directory.
Install dependencies - Run: npm install to populates the node _modules stated in the package.json file
Run the App - start the app using node index.js and follow the prompts.

#1 Getting Twitter data

Here, we work with the Twitter API To access user timeline, you will to need to go to https://www.npmjs.com/package/twitter

To get your Keys:
Create a twitter account if you do not already have one.
Go to https://dev.twitter.com/apps and log in with your twitter credentials.
Click "Create New App"
Fill out the form and agree to the terms.
On the next page, click the "Keys and Access Tokens" tab along the top, then scroll all the way down until you see the section "Your Access Token"
Click the button "Create My Access Token".
You will now copy four values into a .env file (go to https://www.npmjs.com/package/dotenv ). These values are your "Consumer Key (API Key)", your "Consumer Secret (API Secret)", your "Access token" and your "Access token secret".
    api_key = "<Enter api key>" 
    api_secret = "<Enter api secret>"
    access_token_key = "<Enter your access token key here>" 
    access_token_secret = "<Enter your access token secret here>"


THAT'S it!

Why did I do this?

This project is part of the Andela boot-camp activities.
Feel free to comment on the code, suggest how to use IBM watson API for sentiment Analysis in javascript or ask any questions about the boot-camp.
