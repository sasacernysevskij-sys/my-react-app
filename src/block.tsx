export default function Block({
  product,
  onAddClick,
  onClick
}: any) {
  return (
    <div className="card" onClick={onClick}>
      <img src={product.pictureProduct} />
      <h3>{product.name}</h3>
      <p className="price">{product.price} $</p>
      <div style={{ fontSize: 12, color: "gray" }}>
        <div>Stock: {product.quantity}</div>
        <div>
          {product.createdAt
            ? new Date(product.createdAt).toLocaleDateString()
            : ""}
        </div>
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onAddClick();
        }}
      >
        Add
      </button>
    </div>
  );
}