require('dotenv').config();

var AWS = require('aws-sdk');

var sns = new AWS.SNS({
  region: 'us-east-1'
});

sns.subscribe({
  TopicArn: process.env.TopicArn,
  Protocol: 'email-json',
  Endpoint: 'domingo@allincloudservices.com'
}, function (err, response) {
  if (err) return console.log(err);
  console.log(response);
});