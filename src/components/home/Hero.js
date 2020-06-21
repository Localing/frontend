import React, { useEffect, useState } from 'react';
import { Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Hero = ({ locationData, setLocation, clearLocationError, businesses }) => {

    const randomBusiness = () => {
        return businesses[Math.floor(Math.random() * businesses.length)]
    }

    const [business, setBusiness] = useState(randomBusiness());

    // //Rotate businesses in hero

    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         setBusiness(randomBusiness());
    //     }, 5000);
    //     return () => clearInterval(interval);
    // }, []);

    // handling changes to postcodes
    const [postcode, setPostcode] = useState("");

    const handlePostcodeSubmit = (event) => {
        event.preventDefault();
        setLocation(postcode);
    }

    return (
        <div className="hero-with-background-wrap hero2-wrap animate__animated animate__fadeIn">
            <div className="w-layout-grid hero2-grid">
                <div id="w-node-6d7d04cfb30d-5fcf7beb" className="hero2-content">
                    <div className="hero2-title">
                        <div className="size1-text">Keep the heart of {locationData.location || "your community"} beating</div>
                        <p class="paragraph-70">Pre-order from local businesses, and <strong>unlock exclusive promotions, discounts and rewards</strong> for being loyal to your community!</p>
                        <form onSubmit={handlePostcodeSubmit} className="mt-4">
                            {locationData.locationError &&
                                <Alert variant="danger" onClose={() => clearLocationError()} dismissible className="postcode-error">
                                    <p>The postcode you entered wasn't valid.</p>
                                </Alert>
                            }
                            <div className="postcode-form">
                            <input type="text" name="postcode" placeholder="Enter your postcode" value={postcode} onChange={e => setPostcode(e.target.value)} />
                            <input type="submit" value="update" className="button-small postcode-submit" />
                            </div>
                        </form>
                    </div>
                    <div className="hero2-latest w-inline-block">
                        <div className="hero2-image-collection" style={{ backgroundImage: `url('${business.imageURL}')` }}></div>
                        <div>
                            <p className="featured-text">Featured</p>
                            <div className="size5-text">{business.name}</div>
                            <div className="paragraph-70">{business.description}</div>
                        </div>
                    </div>
                    <div className="button-large hero3-button w-inline-block" onClick={() => setBusiness(randomBusiness())}>
                        <div>Discover more shops in {locationData.location || "your community"}</div><img src="assets/img/Arrow%402x.svg" alt="" class="button-arrow" />
                    </div>
                </div>
                <div id="w-node-6d7d04cfb31e-5fcf7beb" className="hero2-product">
                    <div className="hero2-product-name-link-wrap w-inline-block">
                        <Link to={`/business/${business.id}`}><p className="hero2-product-name">Order from {business.name} today</p></Link>
                    </div>
                    <p className="hero2-product-price"></p>
                </div>
            </div>
            <div className="w-layout-grid hero2-background">
                <div id="w-node-6d7d04cfb325-5fcf7beb" className="hero2-image" style={{ backgroundImage: `url('${business.imageURL}')` }}></div>
            </div>
        </div>
    )
}

export default Hero;