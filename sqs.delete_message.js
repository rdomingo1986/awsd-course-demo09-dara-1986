require('dotenv').config();

var AWS = require('aws-sdk');

var sqs = new AWS.SQS({
  region: 'us-east-1'
});

sqs.deleteMessage({
  QueueUrl: process.env.QueueUrl,
  ReceiptHandle: process.argv[2]
}, function (err, response) {
  if (err) return console.log(err);
  console.log(response);
});