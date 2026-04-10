import React, { useState } from "react";

interface FilterProps {
  onFilter: (criteria: { type: string; brand: string }) => void;
}

const Filter: React.FC<FilterProps> = ({ onFilter }) => {
  const [type, setType] = useState("");
  const [brand, setBrand] = useState("");

  const applyFilter = () => {
    onFilter({ type, brand });
  };

  const resetFilter = () => {
    setType("");
    setBrand("");
    onFilter({ type: "", brand: "" });
  };

  return (
    <div className="filter">
      <select value={type} onChange={(e) => setType(e.target.value)}>
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

      <select value={brand} onChange={(e) => setBrand(e.target.value)}>
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

      <button onClick={applyFilter}>Apply</button>
      <button onClick={resetFilter}>Reset</button>
    </div>
  );
};

export default Filter;