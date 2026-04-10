import React, { useState, useEffect } from "react";
import Container from "./conteiner";
import Filter from "./Filter";
import Authorize from "./authorize";
import StoreBag from "./StoreBag";
import ChangePassword from "./ChangePassword";
import "./App.css";

type Product = {
  id: number;
  name: string;
  price: number;
  pictureProduct: string;
  type: string;
  brand: string;
  quantity: number;
  createdAt?: string;
};

export default function App() {

  const [user, setUser] = useState<string | null>(null);

  const [authOpen, setAuthOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [passOpen, setPassOpen] = useState(false);

  const [filter, setFilter] = useState({ type: "", brand: "" });

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const [cart, setCart] = useState<any[]>([]);

  const [qtyOpen, setQtyOpen] = useState(false);
  const [pendingProduct, setPendingProduct] = useState<Product | null>(null);
  const [qty, setQty] = useState(1);
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setUser("Authorized"); 
    }
  }, []);
  const isAuth = () => !!localStorage.getItem("token");
  const openAddModal = (product: Product) => {
    if (!isAuth()) {
      setAuthOpen(true);
      return;
    }
    setPendingProduct(product);
    setQty(1);
    setQtyOpen(true);
  };
  const addToCart = (p: Product, quantity: number) => {
    setCart(prev => {
      const ex = prev.find(i => i.id === p.id);
      if (ex) {
        return prev.map(i =>
          i.id === p.id
            ? { ...i, quantity: i.quantity + quantity }
            : i
        );
      }
      return [...prev, { ...p, quantity }];
    });
    setCartOpen(true);
  };
  const changeQty = (id: number, delta: number) => {
    setCart(prev =>
      prev
        .map(i =>
          i.id === id ? { ...i, quantity: i.quantity + delta } : i
        )
        .filter(i => i.quantity > 0)
    );
  };
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };
  return (
    <div className="app">
      <div className="topbar">
        <h2>🛒 Store</h2>
        <div className="top-actions">
  {!user ? (
    <button onClick={() => setAuthOpen(true)}>
      Login / Register
    </button>
  ) : (
    <>
      <span>👤 {user}</span>
      <button
        onClick={() => {
          localStorage.removeItem("token");
          setUser(null);
        }}
      >
        Logout
      </button>
    </>
  )}
  <button onClick={() => setPassOpen(true)}>
    Change Password
  </button>
  <button onClick={() => setCartOpen(true)}>
    Cart ({cart.reduce((a, b) => a + b.quantity, 0)})
  </button>
</div>
      </div>
      <Filter onFilter={setFilter} />
      <Container
        filter={filter}
        onOpenProduct={setSelectedProduct}
        onAddClick={openAddModal}
      />
      {selectedProduct && (
        <div className="modalOverlay" onClick={() => setSelectedProduct(null)}>
          <div className="modalContent" onClick={e => e.stopPropagation()}>
            <button className="closeBtn" onClick={() => setSelectedProduct(null)}>✖</button>
            <h2>{selectedProduct.name}</h2>
            <p className="price">{selectedProduct.price} $</p>
            <button onClick={() => openAddModal(selectedProduct)}>
              Add to cart
            </button>
          </div>
        </div>
      )}
      {qtyOpen && pendingProduct && (
        <div className="modalOverlay" onClick={() => setQtyOpen(false)}>
          <div className="modalContent" onClick={e => e.stopPropagation()}>
            <button className="closeBtn" onClick={() => setQtyOpen(false)}>✖</button>
            <h2>{pendingProduct.name}</h2>
            <p>Stock: {pendingProduct.quantity}</p>
            <p className="price">{pendingProduct.price} $</p>
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => setQty(q => Math.max(1, q - 1))}>-</button>
              <span>{qty}</span>
              <button
                onClick={() =>
                  setQty(q =>
                    q < pendingProduct.quantity ? q + 1 : q
                  )
                }
              >
                +
              </button>
            </div>
            <button
              onClick={() => {
                addToCart(pendingProduct, qty);
                setQtyOpen(false);
              }}
            >
              Add
            </button>
          </div>
        </div>
      )}
      {authOpen && (
        <Authorize
          onLoginSuccess={(name: string) => {
            setUser(name);
            setAuthOpen(false);
          }}
          onClose={() => setAuthOpen(false)}
        />
      )}
      {cartOpen && (
        <StoreBag
          cart={cart}
          onClose={() => setCartOpen(false)}
          onAdd={changeQty}
          onRemove={changeQty}
        />
      )}
      {passOpen && (
        <ChangePassword onClose={() => setPassOpen(false)} />
      )}

    </div>
  );
}