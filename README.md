# A Twitter Personal Feed Curator

This code mostly exists because I don't want tens of thousands of tweets hanging around well after they no longer mean anything to anyone, myself included, so ... curator with mass delete option.

## How do I this?

No, that's not missing a word.

First, create a twitter app, and get a consumer key/secret for that, then also generate an access token and secret associated with you. You can do that essentially on the same page.

- Clone
- install with `npm install`
- create an .env file and put your keys and secrets, and your Twitter handle, in it as:

```
CONSUMER_KEY=...
CONSUMER_SECRET=...
ACCESS_TOKEN=...
ACCESS_TOKEN_SECRET=...
TWITTER_USERNAME=...
```
Okay you're good to go: `npm start` and you have a server running on port 2337, go visit http://localhost:2337
