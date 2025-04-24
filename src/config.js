export const config = {
  aws: {
    Auth: {
      region: process.env.REACT_APP_COGNITO_REGION || "us-east-1",
      userPoolId:
        process.env.REACT_APP_COGNITO_USER_POOL_ID || "your-user-pool-id",
      userPoolWebClientId:
        process.env.REACT_APP_COGNITO_CLIENT_ID || "your-client-id",
    },
  },
  api: {
    baseUrl: process.env.REACT_APP_API_URL || "https://your-backend-api-url",
  },
};
