require('dotenv').config();

var AWS = require('aws-sdk');

var sqs = new AWS.SQS({
  region: 'us-east-1'
});

sqs.sendMessage({
  MessageBody: JSON.stringify({
    name: 'Domingo Ramírez',
    age: 33
  }),
  QueueUrl: process.env.QueueUrl,
  MessageAttributes: {
    'CustomAttribute': {
      DataType: 'String',
      StringValue: 'CustomValue'
    }
  }
}, function (err, response) {
  if (err) return console.log(err);
  console.log(response);
});