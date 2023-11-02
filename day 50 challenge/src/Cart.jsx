import React from "react";

function Cart({ catalog, setItems }) {
  function addItems(p) {
    setItems((i) => [...i, p]);
  }

  return (
    <div className="block-cart">
      <h2>Products</h2>
      {catalog.map((category) => {
        return (
          <div key={"category-" + category.name}>
            <h3>{category.name}</h3>
            {category.items.map((item, index) => (
              <div key={"item-" + index} className="item-1">
                <h4>{item.name}</h4>
                <button onClick={() => addItems(item.name)}>Add</button>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}

export default Cart;
