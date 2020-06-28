import PropTypes from "prop-types";
import React, { Fragment, useState, useEffect } from 'react';
import MetaTags from 'react-meta-tags';
import Paginator from 'react-hooks-paginator';
import { connect } from 'react-redux';
import { getSortedProducts } from '../../helpers/product';
import LayoutOne from '../../layouts/LayoutOne';
import ShopSidebar from '../../wrappers/product/ShopSidebar';
import ShopTopbar from '../../wrappers/product/ShopTopbar';
import ShopProducts from '../../wrappers/product/ShopProducts';
import { Container, Jumbotron, Button, Spinner } from 'react-bootstrap';
import axios from 'axios';

const ShopGridStandard = ({ products, match }) => {

    const [business, setBusiness] = useState(null);
    const [layout, setLayout] = useState('grid three-column');
    const [sortType, setSortType] = useState('');
    const [sortValue, setSortValue] = useState('');
    const [filterSortType, setFilterSortType] = useState('');
    const [filterSortValue, setFilterSortValue] = useState('');
    const [offset, setOffset] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentData, setCurrentData] = useState([]);
    const [sortedProducts, setSortedProducts] = useState([]);

    const pageLimit = 15;


    const getLayout = (layout) => {
        setLayout(layout)
    }

    const getSortParams = (sortType, sortValue) => {
        setSortType(sortType);
        setSortValue(sortValue);
    }

    const getFilterSortParams = (sortType, sortValue) => {
        setFilterSortType(sortType);
        setFilterSortValue(sortValue);
    }

    useEffect(() => {
        axios
            .get(`https://consumerapi.dev.localing.co.uk/business/${match.params.id}`)
            .then(response => {
                setBusiness(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, [])

    useEffect(() => {
        let sortedProducts = getSortedProducts(products, sortType, sortValue);
        const filterSortedProducts = getSortedProducts(sortedProducts, filterSortType, filterSortValue);
        sortedProducts = filterSortedProducts;
        setSortedProducts(sortedProducts);
        setCurrentData(sortedProducts.slice(offset, offset + pageLimit));

    }, [offset, products, sortType, sortValue, filterSortType, filterSortValue]);

    return (
        business ? <Fragment>
            <MetaTags>
                <title>Localing | {business.name}</title>
                <meta name="description" content="Localing products." />
            </MetaTags>

            <LayoutOne>

                <Jumbotron fluid className="shop-jumbotron" style={{ backgroundImage: `url('${business.imageURL}')` }}>
                    <Container>
                        <div className="shop-jumbotron-title">
                            <h2 className="display-4">{business.name}</h2>
                            <p><i className="fa fa-map-marker mr-1"></i>{business.address}</p>
                            <p className="lead" style={{ whiteSpace: 'pre-line'}}>{business.description}</p>
                            <div className="shop-buttons mt-3">
                                {(business.latitude && business.longitude) &&
                                    <button className="button-small mr-1"><i className="fa fa-map mr-1"></i>MAP</button>
                                }

                                {(business.website) &&
                                    <button className="button-small mr-1" href={business.website}><i className="fa fa-external-link" aria-hidden="true"></i>&nbsp;Website</button>
                                }

                                {(business.phone) &&
                                    <button className="button-small mr-1"><i className="fa fa-phone"></i>&nbsp;Call {business.phone}</button>
                                }
                            </div>
                        </div>
                    </Container>
                </Jumbotron>

                <div className="shop-area pt-95 pb-100">
                    <div className="container">
                        <div className="row">
                            {/* shop sidebar  
                            <div className="col-lg-3 order-2 order-lg-1">     
                                <ShopSidebar products={products} getSortParams={getSortParams} sideSpaceClass="mr-30"/> 
                            </div> */}
                            <div className="col-lg-12 order-1 order-lg-2">
                                {/* shop topbar default */}
                                <ShopTopbar getLayout={getLayout} getFilterSortParams={getFilterSortParams} productCount={products.length} sortedProductCount={currentData.length} />

                                {/* shop page content default */}
                                <ShopProducts layout={layout} products={currentData} />

                                {/* shop product pagination */}
                                <div className="pro-pagination-style text-center mt-30">
                                    <Paginator
                                        totalRecords={sortedProducts.length}
                                        pageLimit={pageLimit}
                                        pageNeighbours={2}
                                        setOffset={setOffset}
                                        currentPage={currentPage}
                                        setCurrentPage={setCurrentPage}
                                        pageContainerClass="mb-0 mt-0"
                                        pagePrevText="«"
                                        pageNextText="»"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </LayoutOne>
        </Fragment>
            :
            <div className="mx-auto mt-5 text-center">
                <h2>Welcome to Localing</h2>
                <p>Loading...</p>
                <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>
            </div>
    )
}

ShopGridStandard.propTypes = {
    location: PropTypes.object,
    products: PropTypes.array
}

const mapStateToProps = (state, ownProps) => {
    return {
        products: state.productData.products.filter(
            product => product.businessID === ownProps.match.params.id
        )
    }
}

export default connect(mapStateToProps)(ShopGridStandard);