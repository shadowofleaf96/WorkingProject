import React from 'react';

function Shipping({ setAddress }) {
    function addAddress(e) {
        const { target: { name, value } } = e;
        setAddress((address) => ({ ...address, [name]: value }));
    }

    return (
        <div className="block-shipping">
            <h2>Shipping</h2>
            <div className="input-firstName">
                <label>First name</label>
                <br />
                <input
                    name="firstName"
                    onChange={addAddress} // Attach a change event to capture the value and call addAddress
                />
            </div>
            <div className="input-lastName">
                <label>Last name</label>
                <br />
                <input
                    name="lastName"
                    onChange={addAddress} // Attach a change event to capture the value and call addAddress
                />
            </div>
            <div className="input-city">
                <label>City</label>
                <br />
                <input
                    name="city"
                    onChange={addAddress} // Attach a change event to capture the value and call addAddress
                />
            </div>
            <div className="input-phone">
                <label>Phone</label>
                <br />
                <input
                    name="phone"
                    onChange={addAddress} // Attach a change event to capture the value and call addAddress
                />
            </div>
            <div className="input-email">
                <label>Email</label>
                <br />
                <input
                    name="email"
                    onChange={addAddress} // Attach a change event to capture the value and call addAddress
                />
            </div>
            <div className="input-postalCode">
                <label>Postal code</label>
                <br />
                <input
                    name="postalCode"
                    onChange={addAddress} // Attach a change event to capture the value and call addAddress
                />
            </div>
            <div className="input-address1">
                <label>Address</label>
                <br />
                <input
                    name="address1"
                    onChange={addAddress} // Attach a change event to capture the value and call addAddress
                />
            </div>
        </div>
    );
}

export default Shipping;
