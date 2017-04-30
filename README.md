# A Twitter Personal Feed Curator

This code mostly exists because I don't want tens of thousands of tweets hanging around well after they no longer mean anything to anyone, myself included, so ... curator with mass delete option.

## How do I this?

No, that's not missing a word.

First, [create a twitter app](https://apps.twitter.com/app/new), and get the Consumer key and secret for that by clicking the "manage keys and access tokens" link next to the Consumer key. Also generate an access token and secret associated with you. You can do that on the same page, there's a button at the bottom, click that.

Then do the following things one:

- clone this repo.
- cd into the repo direcetory and install the dependencies using `npm install`.
- create an .env file in the repo directory and put your keys and secrets, as well as your Twitter handle, in it as:

```
CONSUMER_KEY=...
CONSUMER_SECRET=...
ACCESS_TOKEN=...
ACCESS_TOKEN_SECRET=...
TWITTER_USERNAME=...
```

Okay you're good to go: you can now run `npm start` whenever you like and you'll have a server running on port 2337, go visit [http://localhost:2337](http://localhost:2337)
