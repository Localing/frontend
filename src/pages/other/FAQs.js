import React, { Fragment } from "react";
import MetaTags from "react-meta-tags";
import LayoutOne from "../../layouts/LayoutOne";
import { Container } from "react-bootstrap";
import { Link } from 'react-router-dom';

const FAQs = (props) => {

    return (
        <Fragment>
            <MetaTags>
                <title>Localing | FAQs</title>
                <meta
                    name="description"
                    content="Localing Terms"
                />
            </MetaTags>
            <LayoutOne>
                <Container className="mt-5 mb-5">
                    <h1 className="font-weight-light">Frequently Asked Questions (FAQs)</h1>
                    <hr />
                    <div className="mt-3">
                        <p className="lead">When can I redeem my voucher?</p>

                        <p>Within the period stated on the voucher, whenever you like! You’re free to wait a few weeks to redeem your voucher, or run straight there in all your excitement at the amazing deals you’re getting! There should be adequate advice on the voucher, but if we’ve missed a trick, please let us know!</p>

                        <p>We cannot guarantee it will be available when you first turn up (we’ve all been through the heartbreaking situation when a cafe is out of cake…), but if you make sure to contact the business you’ve bought it from, they can advise you as to when is best for you to pop in.</p>

                        <p className="lead">Can I swap my voucher?</p>

                        <p>We’re sorry to say that we cannot guarantee a swap, as it is very much down to your local business as to what they can and cannot do. For further information please see our Voucher terms of use.</p>


                        <p className="lead">How do I know I’ll be safe?</p>

                        <p>Your safety is our priority. Your local business will have their precautions listed on their page on our website, but if you have any particular concerns, please feel free to contact them with the details at the top of their page.</p>


                        <p className="lead">What happens if the business closes for good?</p>

                        <p>Much as we hope our efforts can help keep your local businesses running, in some very sad cases the businesses may still be forced to shut their doors for good. In those cases, we will make sure to issue a full refund to you as soon as we have completed all of the necessary administration.</p>
                    </div>
                    <hr />
                    <div>
                        <p>For additional assistance, please visit our <Link to="/support" style={{ textDecoration: 'underline' }}>Support Page</Link>.</p>
                    </div>
                </Container>
            </LayoutOne>
        </Fragment>
    );
};

export default FAQs;