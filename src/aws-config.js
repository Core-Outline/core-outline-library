// aws-config.js
import AWS from 'aws-sdk';

// Configure AWS with your access and secret key.
AWS.config.update({
  accessKeyId: 'AKIA5FTZC7FK6YDB7IWD',
  secretAccessKey: 'QzN1A7ROLL1cFbQI9jeY3u6qDCC/Ms4BiM4Rp52j',
  region: 'us-west-2' // e.g., 'us-east-1'
});

export const s3 = new AWS.S3();
