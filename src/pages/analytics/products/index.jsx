import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getProducts } from "../../../api/Products";
import ProductTable from "./_components/ProductTable";

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
      <ProductTable dataList={data} />
    </div>
  );
}

export default ProductsPage;
