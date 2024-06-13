/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import PayModal from "../../pages/Paymodal/PayModal";
type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
};
const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showDescription, setShowDescription] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<number>();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [price, setPrice] = useState<number>(0);
  const closeModal = () => {
    setOpenModal(false);
  };

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(import.meta.env.VITE_APP_BASE_URL);
      if (!response.ok) {
        throw new Error("Error");
      }
      const data: Product[] = await response.json();
      setProducts(data);
      setLoading(false);
    } catch (error: any) {
      setError(error.message);
    }
  }, []);

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
    <div className=" w-full bg-slate-400 px-6 pb-5 ">
      {openModal && <PayModal amount={price} onClose={closeModal} />}
      <ul className="flex items-center flex-wrap w-full justify-center sm:justify-between">
        {products.map((product) => (
          <li
            key={product.id}
            className="bg-white shadow-md rounded-xl h-[25rem] w-[20rem] overflow-auto mt-6 p-4 relative cursor-pointer "
            onMouseEnter={() => {
              setShowDescription(true);
              setSelectedItem(product.id);
            }}
            onMouseLeave={() => {
              setShowDescription(false);
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              exit={{ x: -20, opacity: 0 }}
              className={` ${
                selectedItem === product.id && showDescription
                  ? "block"
                  : "hidden"
              } absolute top-1 bg-[#dad9d9d3] left-5 right-5 h-[90%] flex justify-center items-center flex-col z-[100] overflow-auto p-4`}
            >
              <p className="text-sm text-black w-full text-justify ">
                {product.description}
              </p>
              <span className=" flex justify-center items-center">
                <Button
                  onClick={() => {
                    setOpenModal(true);
                    setPrice(product.price);
                  }}
                >
                  Buy Now
                </Button>
              </span>
            </motion.div>
            <img
              src={product.image}
              alt={product.title}
              className="w-full object-contain rounded h-[60%]"
            />
            <div className=" w-full text-center">
              <h2 className="text-lg font-semibold w-full text-[#333333]">
                {product.title}
              </h2>
              <p className="text-md font-semibold ">Price: ₦ {product.price}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
