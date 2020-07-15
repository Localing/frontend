import React, { useEffect, useState, Fragment } from 'react';
import { Alert, Spinner, Button } from 'react-bootstrap';
import { HashLink as Link } from 'react-router-hash-link';
import { capitalize, truncate } from "../../helpers/strings";

const Hero = ({ locationData, setLocation, clearLocationError, businesses }) => {

    // Rotate businesses in hero 
    const randomBusiness = () => {
        return businesses[Math.floor(Math.random() * businesses.length)]
    }

    const [business, setBusiness] = useState(randomBusiness());

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
                        <div className="maroon-header-text">Keep the heart of your local high street beating</div>
                        <p class="hero-paragraph">Pre-order from local businesses, and <strong>get exclusive promotions and discounts</strong> for being loyal to your community!</p>
                        <div className="d-none d-sm-block">
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
                        }
                        </div>
                    </div>
                    <Link to={`/business/${business.businessId}`}>
                    <div className="hero2-latest w-inline-block d-none d-sm-block">
                            <div>
                                <span className="featured-text">Featured</span>
                                <div className="size5-text">{business.name}</div>
                                <div className="hero-paragraph">{truncate(business.description, 200, " ...")}</div>
                            </div>
                    </div>
                    </Link>
                    <Link to="/shop" scroll={el => scrollWithOffset(el)}><div className="button-large hero3-button w-inline-block d-none d-sm-block">
                        <div>Discover more shops near you <img src="/assets/img/Arrow%402x.svg" alt="" className="button-arrow" /></div>
                    </div></Link>
                </div>
                <div id="w-node-6d7d04cfb31e-5fcf7beb" className="hero2-product">
                    <div className="hero2-product-name-link-wrap w-inline-block">
                        <Link to={`/business/${business.businessId}`}><p className="hero2-product-name">Explore deals at {business.name}</p></Link>
                    </div>
                    <p className="hero2-location"><i className="fa fa-map-marker mr-1" />{capitalize(business.area)}</p>
                </div>
            </div>
            <div className="w-layout-grid hero2-background">
                <div id="w-node-6d7d04cfb325-5fcf7beb" className="hero2-image" style={{ backgroundImage: `url('${business.imageURL}')` }}></div>
            </div>
        </div>
    )
}

export default Hero;