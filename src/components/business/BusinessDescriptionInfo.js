import React from "react";

const BusinessDescriptionInfo = ({
  business
}) => {

  return (
    <div className="product-details-content ml-70">
      <h2>{business.name}</h2>
      <br />
      <div>
        <button className="btn btn-secondary btn-sm"><i className="fa fa-map-marker"></i>&nbsp;{business.location}</button>
        &nbsp;<button className="btn btn-primary btn-sm" href={business.website}><i className="fa fa-external-link" aria-hidden="true"></i>&nbsp;Website</button>
        &nbsp;<button className="btn btn-primary btn-sm"><i className="fa fa-phone"></i>&nbsp;Call {business.phone}</button>
      </div>
      <div className="pro-details-list">
        {business.description}
      </div>
      <p><strong>How {business.name} will keep you safe</strong></p>
      <p>{business.mitigationText}</p>
      <br />
      <p><strong>When {business.name} is anticipated to open:</strong>{business.openingStatus}</p>
      <hr />
      <div>
        <h3>Supporters</h3>
        {/* Badges of frequent supporters will go here */}
      </div>
    </div>
  );
};

export default BusinessDescriptionInfo;
