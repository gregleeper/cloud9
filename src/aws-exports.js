/* eslint-disable */
// WARNING: DO NOT EDIT. This file is automatically generated by AWS Amplify. It will be overwritten.

const awsmobile = {
  aws_project_region: "us-east-1",
  aws_cognito_identity_pool_id:
    "us-east-1:f24a3cc6-d622-4820-ae3d-f9c84c9c230a",
  aws_cognito_region: "us-east-1",
  aws_user_pools_id: "us-east-1_K5Yxl5IWu",
  aws_user_pools_web_client_id: "2lfafnp39egd99ieppl0mvafn6",
  oauth: {
    domain: "cloud9-hugoton-dev.auth.us-east-1.amazoncognito.com",
    scope: [
      "phone",
      "email",
      "openid",
      "profile",
      "aws.cognito.signin.user.admin",
    ],
    redirectSignIn: "http://localhost:3001/,https://cloud9-chi.vercel.app/",
    redirectSignOut: "http://localhost:3001/,https://cloud9-chi.vercel.app/",
    responseType: "code",
  },
  federationTarget: "COGNITO_USER_POOLS",
  aws_cognito_login_mechanisms: [],
  aws_cognito_signup_attributes: ["EMAIL"],
  aws_cognito_mfa_configuration: "OFF",
  aws_cognito_mfa_types: ["SMS"],
  aws_cognito_password_protection_settings: {
    passwordPolicyMinLength: 8,
    passwordPolicyCharacters: [],
  },
  aws_cognito_verification_mechanisms: ["EMAIL"],
  aws_appsync_graphqlEndpoint:
    "https://ebokwlybxbhfbaccv3ejr4yapm.appsync-api.us-east-1.amazonaws.com/graphql",
  aws_appsync_region: "us-east-1",
  aws_appsync_authenticationType: "AMAZON_COGNITO_USER_POOLS",
  aws_appsync_apiKey: "da2-zq6pc24ghzetffq5jheng5l7sa",
};

export default awsmobile;
