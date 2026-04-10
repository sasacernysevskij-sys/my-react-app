export default function StoreBag({
  cart,
  onClose,
  onAdd,
  onRemove
}: any) {
  const isAuth = () => !!localStorage.getItem("token");
  const buy = async () => {
    if (!isAuth()) {
      alert("Login first");
      return;
    }
    const token = localStorage.getItem("token");
    for (const item of cart) {
      const res = await fetch("https://localhost:7154/api/orders/buyProduct", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          productId: item.id,
          quantity: item.quantity
        })
      });
      if (!res.ok) {
        const text = await res.text();
        alert(text);
        return;
      }
    }
    alert("Success");
    window.location.reload();
  };
  return (
    <div className="modalOverlay" onClick={onClose}>
      <div className="modalContent" onClick={e => e.stopPropagation()}>
        <button className="closeBtn" onClick={onClose}>✖</button>
        <h2>Cart</h2>
        {cart.map((i: any) => (
          <div key={i.id} className="cartItem">
            <span>{i.name}</span>
            <div>
              <button onClick={() => onRemove(i.id, -1)}>-</button>
              {i.quantity}
              <button onClick={() => onAdd(i.id, 1)}>+</button>
            </div>

          </div>
        ))}

        <button className="buyBtn" onClick={buy}>
          BUY
        </button>

      </div>
    </div>
  );
}