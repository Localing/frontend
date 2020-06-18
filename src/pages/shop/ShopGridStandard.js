import PropTypes from "prop-types";
import React, { Fragment, useState, useEffect } from 'react';
import MetaTags from 'react-meta-tags';
import Paginator from 'react-hooks-paginator';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { getSortedProducts } from '../../helpers/product';
import LayoutOne from '../../layouts/LayoutOne';
import ShopSidebar from '../../wrappers/product/ShopSidebar';
import ShopTopbar from '../../wrappers/product/ShopTopbar';
import ShopProducts from '../../wrappers/product/ShopProducts';
import { Container, Jumbotron } from 'react-bootstrap';

const ShopGridStandard = ({ location, products, business }) => {
    let data = useLocation();

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
        let sortedProducts = getSortedProducts(products, sortType, sortValue);
        const filterSortedProducts = getSortedProducts(sortedProducts, filterSortType, filterSortValue);
        sortedProducts = filterSortedProducts;
        setSortedProducts(sortedProducts);
        setCurrentData(sortedProducts.slice(offset, offset + pageLimit));

    }, [offset, products, sortType, sortValue, filterSortType, filterSortValue]);

    return (
        <Fragment>
            <MetaTags>
                <title>Localing | {business.name}</title>
                <meta name="description" content="Localing products." />
            </MetaTags>

            <LayoutOne headerTop="invisible">

                <Jumbotron fluid className="shop-jumbotron" style={{ backgroundImage: `url('${business.imageURL}')` }}>
                    <Container className="shop-jumbotron-title">
                        <h1>{business.name}</h1>
                        <h3>{business.description}</h3>
                        <div className="mt-3">
                            <button className="btn btn-secondary btn-sm"><i className="fa fa-map-marker"></i>&nbsp;{business.location}</button>
        &nbsp;<button className="btn btn-primary btn-sm" href={business.website}><i className="fa fa-external-link" aria-hidden="true"></i>&nbsp;Website</button>
        &nbsp;<button className="btn btn-primary btn-sm"><i className="fa fa-phone"></i>&nbsp;Call {business.phone}</button>
                        </div>

                    </Container>
                </Jumbotron>

                <div className="shop-area pt-95 pb-100">
                    <div className="container">
                        <div className="row">
                            {/*  <div className="col-lg-3 order-2 order-lg-1">
                                shop sidebar 
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
    )
}

ShopGridStandard.propTypes = {
    location: PropTypes.object,
    products: PropTypes.array
}

const mapStateToProps = (state, ownProps) => {
    return {
        products: state.productData.products.filter(
            product => product.businessID == ownProps.match.params.id
        ),
        business: state.businessData.businesses.filter(
            business => business.id == ownProps.match.params.id
        )[0]
    }
}

export default connect(mapStateToProps)(ShopGridStandard);