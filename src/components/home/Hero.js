import React from 'react';

const Hero = ({ location }) => {
    return (
        <div className="hero-with-background-wrap hero2-wrap">
            <div className="w-layout-grid hero2-grid">
                <div id="w-node-6d7d04cfb30d-5fcf7beb" className="hero2-content">
                    <div className="hero2-title">
                        <div className="size1-text">Keep the heart of {location} beating</div>
                        <p class="paragraph-70">Pre-order from local businesses, and <strong>unlock exclusive promotions, discounts and rewards</strong> for being loyal to your community!</p>
                    </div>
                    <a href="#" className="hero2-latest w-inline-block">
                        <div className="hero2-image-collection"></div>
                        <div>
                            <div className="size5-text">Shop Name</div>
                            <div className="paragraph-70">Something about the particular store that we are looking at.</div>
                        </div>
                    </a>
                    <a href="#" className="button-large hero3-button w-inline-block">
                        <div>Discover shops in {location}</div><img src="assets/img/Arrow%402x.svg" alt="" class="button-arrow" />
                    </a>
                </div>
                <div id="w-node-6d7d04cfb31e-5fcf7beb" className="hero2-product">
                    <a href="#" className="hero2-product-name-link-wrap w-inline-block">
                        <p className="hero2-product-name">Promotion</p>
                    </a>
                    <p className="hero2-product-price">$100</p>
                </div>
            </div>
            <div className="w-layout-grid hero2-background">
                <div id="w-node-6d7d04cfb325-5fcf7beb" className="hero2-image"></div>
            </div>
        </div>
    )
}

export default Hero;