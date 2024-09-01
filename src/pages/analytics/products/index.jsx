import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getProducts } from "../../../api/Products";

function ProductsPage() {
  const { isPending, data } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  if (isPending) {
    return <span>Loading...</span>;
  }
  return (
    <div>
      <h1>Products</h1>
      <ul>
        {data.map((product) => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default ProductsPage;
