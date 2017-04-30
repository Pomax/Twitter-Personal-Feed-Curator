const TwitterAPIobject = require('twit') 
const API = new TwitterAPIobject({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token: process.env.ACCESS_TOKEN,
  access_token_secret:  process.env.ACCESS_TOKEN_SECRET
});

/**
 * ... ... ... ... ... ... ...
 */
const getTweets = (req, res, next) => {
  var props = {
    screen_name: process.env.TWITTER_USERNAME,
    count: 100,
    include_rts: 1
  };

  let max_id = req.query.max_id;
  if (max_id) { props.max_id = max_id; }

  const andthen = (err, data, response) => {
    res.tweets = data.map(d => {
      return {
        id: d.id,
        text: d.text,
      }
    });
    next();
  };

  API.get('statuses/user_timeline', props, andthen);
};

/**
 * ... ... ... ... ... ... ...
 */
const tweetsAsJSON = (req, res) => {
  res.json(res.tweets);
};

/**
 * Yeah you better believe this is a get and not even a post
 */
const deleteTweets = (req, res) => {
  // NO TAKEBAKSIES, THESE TWEETS ARE NOW GONE!
  const ids = req.query.ids.split(',').map(v => parseInt(v));
  console.log(ids);
};

/**
 * Our setup function
 */
const setup = app => {
  app.get('/tweets', getTweets, tweetsAsJSON);
  app.get('/delete', deleteTweets);
};

module.exports = { setup };
