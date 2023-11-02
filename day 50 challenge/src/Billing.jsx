import React from "react";

function Billing({method, setMethod }) {
  function addMethod(m) {
    setMethod(m);
  }

  return (
    <div className="block-billing">
      <h2>Methods</h2>
      {method.map((methods, index) => (
        <div key={"method-" + index} className={"method-" + methods.name}>
          <h3>{methods.name}</h3>
          <button onClick={() => addMethod(methods.name)}>Select</button>
        </div>
      ))}
    </div>
  );
}

export default Billing;
