import React from 'react';
import { Link } from 'react-router-dom';

const Hero = ({ location }) => {
    return (
        <div className="hero-with-background-wrap hero2-wrap animate__animated animate__fadeIn">
            <div className="w-layout-grid hero2-grid">
                <div id="w-node-6d7d04cfb30d-5fcf7beb" className="hero2-content">
                    <div className="hero2-title">
                        <div className="size1-text">Keep the heart of {location} beating</div>
                        <p class="paragraph-70">Pre-order from local businesses, and <strong>unlock exclusive promotions, discounts and rewards</strong> for being loyal to your community!</p>
                    </div>
                    <div className="hero2-latest w-inline-block">
                        <div className="hero2-image-collection"></div>
                        <div>
                            <div className="size5-text">Shop Name</div>
                            <div className="paragraph-70">Something about the particular store that we are featuring here.</div>
                        </div>
                    </div>
                    <div className="button-large hero3-button w-inline-block">
                        <div>Discover shops in {location}</div><img src="assets/img/Arrow%402x.svg" alt="" class="button-arrow" />
                    </div>
                </div>
                <div id="w-node-6d7d04cfb31e-5fcf7beb" className="hero2-product">
                    <div className="hero2-product-name-link-wrap w-inline-block">
                        <p className="hero2-product-name">Promotion here</p>
                    </div>
                    <p className="hero2-product-price"></p>
                </div>
            </div>
            <div className="w-layout-grid hero2-background">
                <div id="w-node-6d7d04cfb325-5fcf7beb" className="hero2-image"></div>
            </div>
        </div>
    )
}

export default Hero;