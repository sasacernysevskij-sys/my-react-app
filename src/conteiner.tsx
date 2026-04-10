import React, { useEffect, useState } from "react";
import Block from "./block";

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
export default function Container({
  filter,
  onOpenProduct,
  onAddClick
}: any) {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  useEffect(() => {
    const url =
      `https://localhost:7154/api/products?page=${page}&pageSize=8` +
      (filter.type ? `&type=${filter.type}` : "") +
      (filter.brand ? `&brand=${filter.brand}` : "");

    fetch(url)
      .then(r => r.json())
      .then(d => {
        setProducts(d.data);
        setTotalPages(d.totalPages);
      });

  }, [filter, page]);

  return (
    <div>
      <div className="grid">
        {products.map(p => (
          <Block
            key={p.id}
            product={p}
            onClick={() => onOpenProduct(p)}
            onAddClick={() => onAddClick(p)}   
          />
        ))}
      </div>
      <div className="pagination">
        <button disabled={page === 1} onClick={() => setPage(p => p - 1)}>
          Prev
        </button>
        <span>{page} / {totalPages}</span>
        <button disabled={page === totalPages} onClick={() => setPage(p => p + 1)}>
          Next
        </button>
      </div>
    </div>
  );
}