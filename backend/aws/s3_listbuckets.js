var AWS = require('aws-sdk');
AWS.config.update({region: 'REGION'});
s3 = new AWS.S3({apiVersion: '2006-03-01'});
s3.listBuckets(function(err, data) {
    if (err) {
      console.log("Error", err);
    } else {
      console.log("Success", data.Buckets);
    }
  });
