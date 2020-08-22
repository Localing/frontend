/* eslint-disable */

/* AWS Amplify Configuration */

/* Development */
const dev_config = {
    "aws_project_region": "eu-west-2",
    "aws_cognito_region": "eu-west-2",
    "aws_user_pools_id": "eu-west-2_k7xQLLSPp",
    "aws_user_pools_web_client_id": "70pd0nvpqvjvhubc7eliguaq2a",
    "oauth": {
        "domain": "auth.localing.co.uk",
        "scope": [
            "phone",
            "email",
            "openid",
            "profile",
            "aws.cognito.signin.user.admin"
        ],
        "redirectSignIn": "http://localhost:3000/",
        "redirectSignOut": "http://localhost:3000/",
        "responseType": "code"
    },
    "federationTarget": "COGNITO_USER_POOLS"
};

/* Staging */
const stage_config = {
    "aws_project_region": "eu-west-2",
    "aws_cognito_region": "eu-west-2",
    "aws_user_pools_id": "eu-west-2_ldxMX1FqA",
    "aws_user_pools_web_client_id": "7c6cmggqbftl4874u5dcvka2rq",
    "oauth": {
        "domain": "auth.localing.co.uk",
        "scope": [
            "phone",
            "email",
            "openid",
            "profile",
            "aws.cognito.signin.user.admin"
        ],
        "redirectSignIn": "https://stage.localing.co.uk/",
        "redirectSignOut": "https://stage.localing.co.uk/",
        "responseType": "code"
    },
    "federationTarget": "COGNITO_USER_POOLS"
};

/* Production */
const prod_config = {
    "aws_project_region": "eu-west-2",
    "aws_cognito_region": "eu-west-2",
    "aws_user_pools_id": "eu-west-2_OB4xNIeGr",
    "aws_user_pools_web_client_id": "2qkm5814fdn4pvoikioan1nvub",
    "oauth": {
        "domain": "auth.localing.co.uk",
        "scope": [
            "phone",
            "email",
            "openid",
            "profile",
            "aws.cognito.signin.user.admin"
        ],
        "redirectSignIn":  "https://prod.localing.co.uk",
        "redirectSignOut": "https://prod.localing.co.uk",
        "responseType": "code"
    },
    "federationTarget": "COGNITO_USER_POOLS"
};

const awsconfig = (process.env.REACT_APP_BuildENV) ? ((process.env.REACT_APP_BuildENV === "prod") ? prod_config : stage_config) : dev_config;

export default awsconfig;
