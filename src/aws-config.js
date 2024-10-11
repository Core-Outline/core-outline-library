import AWS from 'aws-sdk';
import { jwtDecode } from 'jwt-decode';



// AWS.config.update({
//   accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
//   secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
//   region: process.env.REACT_APP_AWS_REGION
// });

AWS.config.update({
  accessKeyId: jwtDecode("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBQ0siOiJBS0lBNUZUWkM3Rks1WExVRERQTSIsImlhdCI6MTcyODY0NDkxNX0.7bLCDrQWDqH7IN0qIzjYU5T4NWbnxwJDy4RMF_MFutY").ACK,
  secretAccessKey: jwtDecode("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBQ0siOiJNMGMvT25raEN5UVgzaExlRlFBUFh1Y3VMeGw5WnJLYjdBUml0YmpmIiwiaWF0IjoxNzI4NjQ0OTgwfQ.bvOoNnmXOS56qvFm4W1xl6AYA-H0aiy_MhD-ILYybZU").ACK,
  region: "us-west-2"
});

export const s3 = new AWS.S3();