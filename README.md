# node-twitmonitor

Built as Real-time twit monitor application with [Node.js](http://www.nodejs.org), [Socket.io](http://socket.io/), [Express](http://expressjs.com/) and [Bootstrap](http://twitter.github.com/bootstrap/).


## Set up
To run, you'll first need to get a [Twitter Developer Account](https://dev.twitter.com/apps/new). Once you
have this, create a json file called `twitter.json` in the following format:

    {
        "consumer_key": "YOUR_CONSUMER_KEY_HERE",
        "consumer_secret": "YOUR_CONSUMER_SECRET_HERE",
        "access_token_key": "YOUR_ACCESS_TOKEN_KEY_HERE",
        "access_token_secret": "YOUR_ACCESS_TOKEN_SECRET"
    }


## Run
	npm install
	node twitmonitor.js

