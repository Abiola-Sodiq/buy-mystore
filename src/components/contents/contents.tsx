/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      const response = await fetch("https://fakestoreapi.com/products");
      if (!response.ok) {
        throw new Error("Error");
      }
      const data: Product[] = await response.json();
      setProducts(data);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className=" flex justify-center items-center h-[80svh]">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className=" flex justify-center items-center h-[80svh]">Error</div>
    );
  }

  return (
    <div className=" w-full bg-slate-400">
      <h1>Product List</h1>
      <ul className="flex items-center flex-wrap w-full">
        {products.map((product) => (
          <li key={product.id} className="bg-white shadow-md rounded-xl">
            <img
              src={product.image}
              alt={product.title}
              className="w-52 h-52 object-contain rounded"
            />
            <div className="">
              <h2 className="text-lg font-semibold w-full max-w-48">
                {product.title}
              </h2>
              <p className="text-sm text-gray-700 w-full max-w-48">
                {product.description}
              </p>
              <p className="text-md font-semibold ">Price: {product.price}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
