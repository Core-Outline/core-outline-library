import AWS from 'aws-sdk';
import { jwtDecode } from 'jwt-decode';



// AWS.config.update({
//   accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
//   secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
//   region: process.env.REACT_APP_AWS_REGION
// });

AWS.config.update({
  accessKeyId: jwtDecode("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBQ0siOiJBS0lBNUZUWkM3RktYNFFVR1JYSSIsImlhdCI6MTcyOTEzNjQxM30.9L6rWuZL1SUXqbmfmqkuV1Ce_TpR5Y3OxByrMrtTIXI").ACK,
  secretAccessKey: jwtDecode("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBQ0siOiJvVlhjai9LQ05tY0VLOS81TGFCajZaVFJDMGMvbDdxbHoyQXBSWlVsIiwiaWF0IjoxNzI5MTM2NDEzfQ.pDoutohv5oYHpPDfz6fISl7vdvRPFNsyPgWKzhNaGJg").ACK,
  region: "us-west-2"
});

export const s3 = new AWS.S3();