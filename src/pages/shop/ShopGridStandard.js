import PropTypes from "prop-types";
import React, { Fragment, useState, useEffect } from 'react';
import MetaTags from 'react-meta-tags';
import Paginator from 'react-hooks-paginator';
import { connect } from 'react-redux';
import { fetchProducts, clearProducts } from "../../redux/actions/productActions";
import { fetchBusiness, clearBusiness } from "../../redux/actions/businessActions";
import { getSortedProducts } from '../../helpers/product';
import LayoutOne from '../../layouts/LayoutOne';
import ShopTopbar from '../../wrappers/product/ShopTopbar';
import ShopProducts from '../../wrappers/product/ShopProducts';
import { Container, Jumbotron, Button, Spinner } from 'react-bootstrap';

const ShopGridStandard = ({
    match,
    products,
    fetchProducts,
    isFetchingProducts,
    fetchProductsError,
    clearProducts,
    business,
    fetchBusiness,
    isFetchingBusiness,
    fetchBusinessError }) => {

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

    const businessId = match.params.id;

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

        // fetch business details and all products for that business
        fetchBusiness(businessId);
        fetchProducts(businessId);

        // clear data from store upon unmount
        return () => {
            clearProducts();
            clearBusiness();
        }

    }, [])

    useEffect(() => {
        if (products) {
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
                {(!isFetchingBusiness && !isFetchingProducts && business && products) ?
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
                                    <div className="col-lg-12 order-1 order-lg-2">
                                        {/* shop topbar default */}
                                        <ShopTopbar getLayout={getLayout} getFilterSortParams={getFilterSortParams} productCount={products.length} sortedProductCount={currentData.length} />

                                        {/* shop page content default */}
                                        <ShopProducts layout={layout} products={currentData} businessId={business.businessId} />

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
                        {!fetchProductsError && !fetchBusinessError ?
                            <Spinner animation="border" role="status">
                                <span className="sr-only">Loading...</span>
                            </Spinner> :
                            <Fragment>
                                <p className="lead">Sorry, something went wrong! Please try again.</p>
                            </Fragment>
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

const mapStateToProps = (state) => {
    return {
        products: state.productData.products,
        isFetchingProducts: state.productData.isFetching,
        business: state.businessData.business,
        isFetchingBusiness: state.businessData.isFetching,
        fetchProductsError: state.productData.fetchProductsError,
        fetchBusinessError: state.businessData.fetchBusinessError
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchProducts: (businessId) => dispatch(fetchProducts(businessId)),
        clearProducts: () => dispatch(clearProducts()),
        fetchBusiness: (businessId) => dispatch(fetchBusiness(businessId)),
        clearBusiness: () => dispatch(clearBusiness())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShopGridStandard);