import React from "react";

interface BlockProps {
  name: string;
  price: number;
  img: string;
}

const Block: React.FC<BlockProps> = ({ name, price, img }) => {
  return (
    <div className="block">
      <img src={img} alt={name} className="block-img" />
      <h3>{name}</h3>
      <p>${price.toFixed(2)}</p>
    </div>
  );
};

export default Block;