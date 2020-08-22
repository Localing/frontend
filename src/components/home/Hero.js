import React, { useEffect, useState, Fragment } from 'react';
import { Alert, Spinner, Button } from 'react-bootstrap';
import { HashLink as Link } from 'react-router-hash-link';
import { capitalize, truncate } from "../../helpers/strings";

const Hero = ({ locationData, setLocation, clearLocationError, businesses }) => {

    const townProfiles = [
        {
            id: "histon-and-impington",
            name: "Histon & Impington",
            description: "Over the years the two villages have grown and entwined together, to such an extent that many villagers today do not know where one ends and the other begins.",
            image: "https://localingimagefrontenddevtemp.s3.eu-west-2.amazonaws.com/histon1.jpg",
            caption: "This is Histon's most famous bar."
        },
        {
            id: "histon-and-impington",
            name: "Histon & Impington",
            description: "Some of the trackways that pass through these villages are believed to be prehistoric.",
            image: "https://localingimagefrontenddevtemp.s3.eu-west-2.amazonaws.com/histon2.jpg",
            caption: "This is some store"
        }
    ];

    // Rotate town pictures in hero
    const randomTown = () => {
        return townProfiles[Math.floor(Math.random() * townProfiles.length)]
    }

    // // Rotate businesses in hero 
    // const randomBusiness = () => {
    //     return businesses[Math.floor(Math.random() * businesses.length)]
    // }

    const [towns, setTowns] = useState(randomTown());
    // const [business, setBusiness] = useState(randomBusiness());

    // handling changes to postcodes
    const [postcode, setPostcode] = useState("");

    const [showPostcodeForm, setShowPostcodeForm] = useState(true);

    useEffect(() => {
        // show the postcode form if there's no location set
        setShowPostcodeForm(!locationData.location)
    }, [locationData.location])

    const handlePostcodeSubmit = (event) => {
        event.preventDefault();

        // strip any whitespace out of postcode
        const newPostcode = postcode.replace(/\s+/g, '');

        if (newPostcode === locationData.postcode) {
            // if user enters the same postcode that's already set, clear any errors and hide the form
            clearLocationError();
            setShowPostcodeForm(false);
        } else {
            setLocation(newPostcode);
        }
    }

    // scrolls to business grid with offset to avoid navbar obscuring section header
    const scrollWithOffset = (el) => {
        const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
        const yOffset = -150;
        window.scrollTo({ top: yCoordinate + yOffset, behavior: 'smooth' });
    }

    return (
        <div className="hero-with-background-wrap hero2-wrap animate__animated animate__fadeIn">
            <div className="w-layout-grid hero2-grid">
                <div id="w-node-6d7d04cfb30d-5fcf7beb" className="hero2-content">
                    <div className="hero2-title">
                        <div className="maroon-header-text">Keep the heart of your local high street beating!</div>
                        <p className="hero-paragraph">Pre-order from local businesses and <strong>get exclusive promotions and discounts</strong> for being loyal to your community.</p>
                        <br />
                        <div className="d-none d-sm-block">
                            <p className="lead">Choose your area to start shopping!</p>
                            <Link to="/shop/cottenham"><button style={{ display: 'inline' }} className="button-small-light mr-1">Cottenham</button></Link>
                            <Link to="/shop/histon-and-impington"><button style={{ display: 'inline' }} className="button-small-light">Histon &amp; Impington</button></Link>
                            <hr />
                            <p>Not in your area yet? <a href="#newsletter" scroll={el => scrollWithOffset(el)} style={{ textDecoration: 'underline'}}>Let us alert you when we are.</a></p>
                            
                            {/* POSTCODE ENTRY FORM - Currently disabled
                            {showPostcodeForm ?
                            <form onSubmit={handlePostcodeSubmit} className="mt-4">
                                {locationData.locationError &&
                                    <Alert variant="danger" onClose={() => clearLocationError()} dismissible className="postcode-error">
                                        <p>There was something wrong with the postcode you entered, please try again!</p>
                                    </Alert>
                                }
                                <div className="postcode-form">
                                    <input type="text" className="postcode-input mr-1" name="postcode" placeholder="Enter your postcode" value={postcode} onChange={e => setPostcode(e.target.value)} required />
                                    {locationData.loading ?
                                        <Spinner animation="border" role="status" size="lg">
                                        </Spinner>
                                        : 
                                        <Fragment>
                                        <input type="submit" value="FIND SHOPS NEARBY" className="button-small postcode-submit" />
                                        <Button className="button-small-light ml-1" onClick={() => setShowPostcodeForm(false)}>x</Button>
                                        </Fragment>
                                        }
                                </div>
                            </form>
                            :
                            <div className="location-display mt-4">
                                <div className="location-name mr-1" onClick={() => setShowPostcodeForm(true)}>
                                    <i className="fa fa-map-marker mr-1 ml-1" />{locationData.location}
                                </div>
                                <div className="postcode-form mr-1">
                                    <button className="button-small-light" onClick={() => setShowPostcodeForm(true)}>Change Location</button>
                                </div>
                                <div>
                                    <Link to="/shop" scroll={el => scrollWithOffset(el)}><button className="button-small">Shop Now</button></Link>
                                </div>
                            </div>
                        } */}
                        </div>
                    </div>
                    <Link to={`/shop/${towns.id}`}>
                        <div className="hero2-latest w-inline-block d-none d-sm-block">
                            <div>
                                <span className="featured-text lead">Featured High Street</span>
                                <div className="size5-text">{towns.name}</div>
                                <div className="hero-paragraph">{truncate(towns.description, 200, " ...")}</div>
                            </div>
                        </div>
                    </Link>
                    <Link to={`/shop/${towns.id}`}><div className="button-large hero3-button w-inline-block d-none d-sm-block">
                        <div>Discover shops in {towns.name} <img src="/assets/img/Arrow%402x.svg" alt="" className="button-arrow" /></div>
                    </div></Link>
                </div>
                <div id="w-node-6d7d04cfb31e-5fcf7beb" className="hero2-product">
                    <div className="hero2-product-name-link-wrap w-inline-block">
                        <Link to={`/shop/${towns.id}`}><p className="hero2-product-name">{towns.caption}</p></Link>
                    </div>
                    <p className="hero2-location"><i className="fa fa-map-marker mr-1" />{towns.name}</p>
                </div>
            </div>
            <div className="w-layout-grid hero2-background">
                <div id="w-node-6d7d04cfb325-5fcf7beb" className="hero2-image" style={{ backgroundImage: `url('${towns.image}')` }}></div>
            </div>
        </div>
    )
}

export default Hero;