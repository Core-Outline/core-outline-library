import AWS from 'aws-sdk';


// AWS.config.update({
//   accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
//   secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
//   region: process.env.REACT_APP_AWS_REGION
// });

AWS.config.update({
  accessKeyId: "AKIA5FTZC7FK6YDB7IWD",
  secretAccessKey: "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",
  region: "us-west-2"
});

export const s3 = new AWS.S3();