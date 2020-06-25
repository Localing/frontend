import React, { Fragment, useState } from "react";
import MetaTags from "react-meta-tags";
import LayoutOne from "../../layouts/LayoutOne";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";
import { Auth } from "aws-amplify";

const ResetPassword = () => {

    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [code, setCode] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [codeSent, setCodeSent] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // sends email with reset code
    const handleGenerateCode = (event) => {
        event.preventDefault();
        setMessage("");
        setIsLoading(true);
        Auth.forgotPassword(email)
            .then(data => {
                setCodeSent(true);
                setIsLoading(false);
            })
            .catch(err => {
                setMessage(err.message);
                setIsLoading(false);
            });
    }

    // resets password using code
    const handleSavePassword = (event) => {
        event.preventDefault();
        setMessage("");
        setIsLoading(true);
        Auth.forgotPasswordSubmit(email, code, newPassword)
            .then(data => {
                setMessage("Your password was successfully reset.")
                setIsLoading(false);
            })
            .catch(err => {
                setMessage(err.message)
                setIsLoading(false);
            });
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        event.preventDefault();
        switch (name) {
            case "email":
                setEmail(value);
                break;
            case "code":
                setCode(value);
                break;
            case "newPassword":
                setNewPassword(value);
                break;
            default:
                break;
        }
    }
    return (
        <Fragment>
            <MetaTags>
                <title>Localing | Reset Password</title>
                <meta
                    name="description"
                    content="Localing - Reset Password"
                />
            </MetaTags>
            <LayoutOne>
                <div className="login-register-area pt-100 pb-100">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-7 col-md-12 ml-auto mr-auto">
                                <div className="login-register-wrapper">
                                    <div className="login-form-container">
                                        {codeSent ?
                                            <ResetPasswordForm
                                                code={code}
                                                message={message}
                                                newPassword={newPassword}
                                                handleChange={handleChange}
                                                handleSavePassword={handleSavePassword}
                                                isLoading={isLoading}
                                            />
                                            :
                                            <GenerateCodeForm
                                                email={email}
                                                message={message}
                                                handleChange={handleChange}
                                                handleGenerateCode={handleGenerateCode}
                                                isLoading={isLoading}
                                            />}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </LayoutOne>
        </Fragment>
    );
};

const GenerateCodeForm = (props) => {
    return (
        <div className="login-register-form">
            <h3>Reset your password</h3>
            {props.message !== "" && <Alert variant="dark">{props.message}</Alert>}
            <form onSubmit={props.handleGenerateCode}>
                <input
                    type="email"
                    name="email"
                    value={props.email}
                    onChange={props.handleChange}
                    placeholder="E-mail Address"
                    required
                />
                <div className="button-box">
                    <button type="submit">
                    {props.isLoading && <Spinner animation="border" size="sm" as="span" />}Reset Password
                    </button>
                </div>
            </form>
        </div>
    )
}

const ResetPasswordForm = (props) => {
    return (
        <div className="login-register-form">
            <h3>Enter verification code</h3>
            {props.message !== "" && <Alert variant="dark">{props.message}</Alert>}
            <p>Check your email for a code and enter it below.</p>
            <form onSubmit={props.handleSavePassword}>
                <input
                    type="text"
                    name="code"
                    value={props.code}
                    onChange={props.handleChange}
                    placeholder="Code"
                    required
                />
                <input
                    type="password"
                    name="newPassword"
                    value={props.newPassword}
                    onChange={props.handleChange}
                    placeholder="New Password"
                    required
                />
                <div className="button-box">
                    <button type="submit">
                        {props.isLoading && <Spinner animation="border" size="sm" as="span" />}&nbsp;&nbsp;Reset Password
                    </button>
                </div>
            </form>
        </div>
    )
}


export default ResetPassword;
