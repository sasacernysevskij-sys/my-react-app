import React, { useEffect, useState } from "react";
import Block from "./block";
import Pagination from "@mui/material/Pagination";

interface Product {
  id: number;
  name: string;
  price: number;
  pictureProduct: string;
  type: string;
  brand: string;
}

interface ApiResponse {
  data: Product[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
}

interface Props {
  filter: {
    type: string;
    brand: string;
  };
}

const Container: React.FC<Props> = ({ filter }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const pageSize = 8;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const params = new URLSearchParams();

        params.append("page", page.toString());
        params.append("pageSize", pageSize.toString());

        if (filter.type) params.append("type", filter.type);
        if (filter.brand) params.append("brand", filter.brand);

        const response = await fetch(
          `https://localhost:7154/api/products?${params.toString()}`
        );

        if (!response.ok) {
          throw new Error("Server error");
        }

        const data: ApiResponse = await response.json();

        setProducts(data.data);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchProducts();
  }, [page, filter]);

  useEffect(() => {
    setPage(1);
  }, [filter]);

  return (
    <div className="container">
      <div className="grid">
        {products.map(p => (
          <Block
            key={p.id}
            name={p.name}
            price={p.price}
            img={p.pictureProduct || ""}
          />
        ))}
      </div>

      <Pagination
        count={totalPages}
        page={page}
        onChange={(_, val) => setPage(val)}
        color="primary"
        sx={{ marginTop: "20px" }}
      />
    </div>
  );
};

export default Container;