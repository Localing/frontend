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
import API from "../../services/API";

const ShopGridStandard = ({ match }) => {

    const [business, setBusiness] = useState(null);
    const [products, setProducts] = useState(null);
    const [loadingError, setLoadingError] = useState(null);
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
        // fetch business info
        API
            .get(`/business/${match.params.id}`)
            .then(response => {
                setBusiness(response.data);
            })
            .catch(error => {
                setLoadingError("Something went wrong!", error)
            });

        // fetch all products
        API
            .get(`/business/${match.params.id}/product`)
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
                setLoadingError("Something went wrong!", error)
            });
    }, [])

    useEffect(() => {
        if (products) {
            console.log("this happened");
            let sortedProducts = getSortedProducts(products, sortType, sortValue);
            const filterSortedProducts = getSortedProducts(sortedProducts, filterSortType, filterSortValue);
            sortedProducts = filterSortedProducts;
            setSortedProducts(sortedProducts);
            setCurrentData(sortedProducts.slice(offset, offset + pageLimit));
        }
    }, [offset, products, sortType, sortValue, filterSortType, filterSortValue]);

    return (
        <Fragment>
            <MetaTags>
                <title>Localing | {business && business.name}</title>
                <meta name="description" content="Localing products." />
            </MetaTags>

            <LayoutOne>
                {(business && products) ?
                    <Fragment>
                        <Jumbotron fluid className="shop-jumbotron" style={{ backgroundImage: `url('${business.imageURL}')` }}>
                            <Container>
                                <div className="shop-jumbotron-title">
                                    <h2 className="display-4">{business.name}</h2>
                                    <p><i className="fa fa-map-marker mr-1"></i>{business.address}</p>
                                    <p className="lead" style={{ whiteSpace: 'pre-line' }}>{business.description}</p>
                                    <div className="shop-buttons mt-3">
                                        {(business.latitude && business.longitude) &&
                                            <Button className="button-small mr-1"><i className="fa fa-map mr-1"></i>MAP</Button>
                                        }

                                        {(business.website) &&
                                            <Button className="button-small mr-1" href={business.website} target="_blank"><i className="fa fa-external-link" aria-hidden="true"></i>&nbsp;Website</Button>
                                        }

                                        {(business.phone) &&
                                            <Button className="button-small mr-1" href={`tel:${business.phone}`}><i className="fa fa-phone"></i>&nbsp;Call {business.phone}</Button>
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
                    </Fragment>
                    :
                    <div className="mx-auto mt-5 mb-5 text-center">
                        <h2 className="display-4 mb-4">Loading great deals!</h2>
                        {!loadingError ?
                            <Spinner animation="border" role="status">
                                <span className="sr-only">Loading...</span>
                            </Spinner> :
                            <p className="lead">{loadingError}</p>
                        }
                    </div>
                }
            </LayoutOne>
        </Fragment>

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