require('dotenv').config();

var AWS = require('aws-sdk');

var sqs = new AWS.SQS({
  region: 'us-east-1'
});

var emptyQueueCount = 0;

function recursion() {
  if(emptyQueueCount === 3) return console.log('Queue Processing Finished');
  sqs.receiveMessage({
    QueueUrl: process.env.QueueUrl,
    VisibilityTimeout: 30,
    WaitTimeSeconds: 20
  }, function (err, response) {
    if (err) console.log(err);
    console.log(response);
    if(response.Messages === undefined || response.Messages.length === 0) {
      emptyQueueCount++;
      recursion();
    } else {
      console.log('Message processed ' + response.Messages[0].Body);
      sqs.deleteMessage({
        QueueUrl: process.env.QueueUrl,
        ReceiptHandle: response.Messages[0].ReceiptHandle
      }, function (err, response) {
        if (err) console.log(err);
        recursion();
      });
    }
  });
}

recursion();