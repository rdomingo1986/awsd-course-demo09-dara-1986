require('dotenv').config();

var AWS = require('aws-sdk');

var sns = new AWS.SNS({
  region: 'us-east-1'
});

sns.publish({
  TopicArn: process.env.TopicArn,
  Message: 'This is a simple message',
  Subject: 'Example Subject',
  MessageAttributes: {
    "filter": {
      DataType: 'String',
      StringValue: 'no_receive'
    }
  }
}, function (err, response) {
  if (err) return console.log(err);
  console.log(response);
});