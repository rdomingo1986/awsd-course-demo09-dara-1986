require('dotenv').config();

var AWS = require('aws-sdk');

var sqs = new AWS.SQS({
  region: 'us-east-1'
});

var entries = [];

for(var i = 1; i <= parseInt(process.argv[2]); i++) {
  entries.push({
    Id: (Math.random().toString(36).substring(2, 16) + Math.random().toString(36).substring(2, 16)).toUpperCase(),
    MessageBody: Math.random().toString(36).substring(2, 16) + Math.random().toString(36).substring(2, 16)
  });
}

sqs.sendMessageBatch({
  QueueUrl: process.env.QueueUrl,
  Entries: entries
}, function (err, response) {
  if (err) return console.log(err);
  console.log(response);
});