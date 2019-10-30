require('dotenv').config();

var AWS = require('aws-sdk');

var sns = new AWS.SNS({
  region: 'us-east-1'
});

sns.confirmSubscription({
  Token: process.argv[2],
  TopicArn: process.env.TopicArn
}, function (err, response) {
  if (err) return console.log(err);
  console.log(response);
});