import React, { useState } from "react";
import Cart from "./Cart"; // Import the Cart component
import Shipping from "./Shipping"; // Import the Shipping component
import Billing from "./Billing"; // Import the Billing component
import Invoice from "./Invoice"; // Import the Invoice component

const catalog = [
  {
    name: "Liquid",
    items: [
      {
        name: "Water 500mL",
      },
      {
        name: "Orange juice 1L",
      },
      {
        name: "Soda 355mL",
      },
    ],
  },
  {
    name: "Fruits",
    items: [
      {
        name: "Apples 750g",
      },
      {
        name: "Bananas 500g",
      },
      {
        name: "Oranges 1kg",
      },
    ],
  },
];

const methods = ["Paypal", "Cash", "Google Pay", "Apple Pay"];

export default function App() {
  const [items, setItems] = useState([]);
  const [address, setAddress] = useState({});
  const [method, setMethod] = useState("");
  return (
    <>
      <h1>My order</h1>
      <div className="container">
        <Cart setItems={setItems} catalog={catalog} />
        <Shipping setAddress={setAddress} /> {/* Pass the setAddress prop */}
        <Billing method={methods} setMethod={setMethod} /> {/* Pass the setMethod prop */}
        <Invoice items={items} address={address}/>
      </div>
    </>
  );
}
