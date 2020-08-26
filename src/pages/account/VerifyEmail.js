import React, { Fragment, useState, useEffect } from "react";
import * as QueryString from "query-string";
import MetaTags from "react-meta-tags";
import Container from "react-bootstrap/Container";
import Jumbotron from "react-bootstrap/Jumbotron";
import LayoutOne from "../../layouts/LayoutOne";
import Button from "react-bootstrap/Button";
import { Link } from 'react-router-dom';

var AWS = require("aws-sdk");
var CognitoIdentityServiceProvider = new AWS.CognitoIdentityServiceProvider({
    apiVersion: "2016-04-19",
    region: "eu-west-2"
});

const VerifyEmail = (props) => {

    const [verifying, setVerifying] = useState(true);
    const [verified, setVerified] = useState(false);

    useEffect(() => {
        const urlParams = QueryString.parse(props.location.search);

        let confirmParams = {
            ClientId: urlParams.clientId,
            ConfirmationCode: urlParams.code,
            Username: urlParams.username
        };

        CognitoIdentityServiceProvider.confirmSignUp(
            confirmParams,
            function (err, data) {
                if (err) {
                    setVerified(false);
                    setVerifying(false);
                } else {
                    setVerified(true);
                    setVerifying(false);
                }
            }
        );
    }, [props.location.search]);

    return (
        <Fragment>
            <MetaTags>
                <title>Localing | Login and Signup</title>
                <meta
                    name="description"
                    content="Localing Login and Signup"
                />
            </MetaTags>
            <LayoutOne>
                <Container className="mt-5 mb-5">
                    <Jumbotron className="text-center">
                        {verifying ?
                            <h2>Verifying your acccount...</h2>
                            :
                            <Fragment>
                                {verified ?
                                    <Fragment>
                                        <h2>Congratulations! Your account has been successfully verified!</h2>
                                        <Button variant="outline-dark"><Link to="/">Start Shopping</Link></Button>
                                    </Fragment>
                                    :
                                    <Fragment>
                                        <h2>Sorry, we had an issue verifying your account, please try again.</h2>
                                        <Button variant="outline-dark"><Link to="/login">Try Again</Link></Button>
                                    </Fragment>
                                }
                            </Fragment>
                        }
                    </Jumbotron>
                </Container>
            </LayoutOne>
        </Fragment>
    );
}

export default VerifyEmail;