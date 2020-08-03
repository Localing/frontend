/* eslint-disable */

const awsmobile = {
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
        "redirectSignIn": (process.env.REACT_APP_BuildENV) ? ((process.env.REACT_APP_BuildENV === "prod") ? "https://prod.localing.co.uk" : "https://stage.localing.co.uk/") : "http://localhost:3000/",
        "redirectSignOut": (process.env.REACT_APP_BuildENV) ? ((process.env.REACT_APP_BuildENV === "prod") ? "https://prod.localing.co.uk" : "https://stage.localing.co.uk/") : "http://localhost:3000/",
        "responseType": "code"
    },
    "federationTarget": "COGNITO_USER_POOLS"
};

export default awsmobile;
