import React from "react";

function Invoice({ items, address, method }) {
  return (
    <div className="block-invoice">
      <h2>Invoice</h2>
      {address && (
        <div className="address">
          <div>Order N°1 | {new Date().toString()}</div>
          {address.firstName && address.lastName && (
            <div>
              {address.firstName}, {address.lastName}
            </div>
          )}
          <div>{address.city}</div>
          <div>{address.postalCode}</div>
          <div>{address.address1}</div>
          {address.email && address.phone && (
            <div>
              {address.email} | {address.phone}
            </div>
          )}
        </div>
      )}
      {items.length > 0 && (
        <div className="products">
          <h3>Products</h3>
          <ul>
            {items.map((item) => {
              return (
                <div key={item} className="item-1">
                  {item}
                </div>
              );
            })}
          </ul>
        </div>
      )}
      {method && (
        <div className="method">
          <h3>Payment method</h3>
          <span>{method}</span>
        </div>
      )}
    </div>
  );
}

export default Invoice;
