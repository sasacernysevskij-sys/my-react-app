import React, { useState } from "react";
export default function Filter({ onFilter }: any) {
  const [type, setType] = useState("");
  const [brand, setBrand] = useState("");
  return (
    <div className="filter">

      <select onChange={(e) => setType(e.target.value)}>
        <option value="">All Types</option>
        <option value="Laptop">Laptop</option>
        <option value="Smartphone">Smartphone</option>
        <option value="Console">Console</option>
        <option value="Hair Dryer">Hair Dryer</option>
        <option value="Oven">Oven</option>
        <option value="Drone">Drone</option>
        <option value="Hair Straightener">Hair Straightener</option>
        <option value="VR Headset">VR Headset</option>
        <option value="Washing Machine">Washing Machine</option>
        <option value="Air Conditioner">Air Conditioner</option>
      </select>

      <select onChange={(e) => setBrand(e.target.value)}>
        <option value="">All Brands</option>
        <option value="Apple">Apple</option>
        <option value="Samsung">Samsung</option>
        <option value="Xiaomi">Xiaomi</option>
        <option value="ASUS">ASUS</option>
        <option value="Acer">Acer</option>
        <option value="Lenovo">Lenovo</option>
        <option value="Sony">Sony</option>
        <option value="Microsoft">Microsoft</option>
        <option value="Dell">Dell</option>
        <option value="Dyson">Dyson</option>
        <option value="Bosch">Bosch</option>
        <option value="DJI">DJI</option>
        <option value="Meta">Meta</option>
        <option value="LG">LG</option>
      </select>
      <button onClick={() => onFilter({ type, brand })}>
        Apply
      </button>

    </div>
  );
}