const Twit = require('twit');
const axios = require('axios');

const T = new Twit({
  consumer_key: 'your_consumer_key',
  consumer_secret: 'your_consumer_secret',
  access_token: 'your_access_token',
  access_token_secret: 'your_access_token_secret',
});

const forismaticApiUrl = 'https://api.forismatic.com/api/1.0/?method=getQuote&key=123456&format=text&lang=en';

// Function to get a random quote from Forismatic API
function getQuote(callback) {
  axios.get(forismaticApiUrl)
    .then(response => {
      const quote = response.data;
      callback(quote);
    })
    .catch(error => {
      console.error('Error fetching quote:', error.message);
      callback(null);
    });
}

// Function to post a tweet
function postTweet(tweet) {
  console.log(tweet);
  T.post('statuses/update', { status: tweet }, (err, data, response) => {
    if (err) {
      console.error('Error posting tweet:', err.message);
    } else {
      console.log('Tweet posted:', data.text);
    }
  });
}

// Call getQuote and pass postTweet as the callback
getQuote(postTweet);
