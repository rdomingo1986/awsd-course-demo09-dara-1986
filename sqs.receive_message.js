require('dotenv').config();

var AWS = require('aws-sdk');
var util = require('util');

var sqs = new AWS.SQS({
  region: 'us-east-1'
});

sqs.receiveMessage({
  QueueUrl: process.env.QueueUrl,
  VisibilityTimeout: process.argv[2],
  WaitTimeSeconds: process.argv[3] != undefined ? process.argv[3] : 0, //short or long polling
  MaxNumberOfMessages: process.argv[4] != undefined ? process.argv[4] : 1
}, function (err, response) {
  if (err) return console.log(err);
  console.log(util.inspect(response, false, null, true));
});