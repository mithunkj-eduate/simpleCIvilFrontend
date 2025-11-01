"use client";

import { GetProductData, Products } from "@/commenType/commenTypes";
import NavBar from "@/components/commen/Navbar";
import AddModal from "@/components/helpers/AddModal";
import Loading from "@/components/helpers/Loading";
import Api, { api } from "@/components/helpers/apiheader";
import { Button } from "@/stories/Button/Button";
import { LicenseTypes } from "@/utils/enum.types";
import React, { useContext, useEffect } from "react";
import AddProduct from "./AddProduct";
import { AppContext } from "@/context/context";

const ProductsPage = () => {
  const { TOKEN } = Api();
  const [loading, setLoading] = React.useState(false);
  const [products, setProducts] = React.useState<Products[]>([]);
  const [modalFlag, setModalFlag] = React.useState(false);
  const { state } = useContext(AppContext)
console.log(state,"state user")
  const productsTableHeader = [
    {
      name: "Name",
      className: "md:px-6 pl-4 py-3 flex items-center space-x-3 truncate",
    },
    { name: "Description", className: "hidden sm:table-cell" },
    { name: "Price", className: "hidden sm:table-cell" },
    { name: "Category", className: "px-6 py-3" },
    { name: "Stock", className: "hidden sm:table-cell" },
    { name: "Created At", className: "hidden sm:table-cell" },
    { name: "Action", className: "px-6 py-3" },
  ];

  const GetUsers = async () => {
    setLoading(true);
    try {
      console.log(state.user,state.user?.id,"id")
      if(state.user && state.user.id){
      const res = await api.get(`/products?ownerId=${state.user.id}`, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          "Content-Type": "application/json",
        },
      });

      if (res) {
        setProducts(
          res.data.data.map((product: GetProductData) => ({
            id: product.id,
            name: product.name || "N/A",
            description: product.description || "N/A",
            price: product.price || 0,
            category: product.categoryId.name || "N/A",
            stock: product.saleTerms?.stock || 0,
            createdAt: product.createdAt
              ? new Date(product.createdAt).toLocaleDateString()
              : "N/A",
          }))
        );
      } else {
        console.error("Failed to fetch users:", res);
      }
    }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching users:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (TOKEN) {
      GetUsers();
    }
  }, [TOKEN]);

  return (
    <>
      <NavBar NavType={LicenseTypes.ADMIN} />

      <div className="mt-16 flex-1 min-h-screen flex flex-col justify-between">
        {loading ? (
          <Loading />
        ) : (
          <div className="w-full p-4 md:p-6 lg:p-10">
            <div className="flex items-center justify-between pb-4">
              <h2 className="text-lg font-semibold text-gray-900 md:text-xl">
                All Products
              </h2>
              <Button
                mode="primary"
                className="ml-auto px-4 py-2 text-sm md:text-base rounded-md bg-orange-600 hover:bg-orange-700 text-white transition-colors"
                onClick={() => setModalFlag(true)}
              >
                Add Product
              </Button>
            </div>
            <div className="overflow-x-auto rounded-md bg-white border border-gray-200 shadow-sm">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    {productsTableHeader.map((header, index) => (
                      <th
                        key={index}
                        className={`${header.className} text-xs font-medium text-gray-500 uppercase tracking-wider`}
                      >
                        {header.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {products.length > 0 ? (
                    products.map((product, index) => (
                      <tr
                        key={index}
                        className="hover:bg-gray-50 transition-colors cursor-pointer"
                      >
                        <td className="px-4 py-4 flex items-center space-x-3 truncate">
                          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-600">
                            {product.name.charAt(0).toUpperCase() || "N/A"}
                          </div>
                          <span className="text-sm text-gray-900 truncate w-full">
                            {product.name}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500 hidden sm:table-cell">
                          {product.description}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500 hidden sm:table-cell">
                          ₹{product.price.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {product.category}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500 hidden sm:table-cell">
                          {product.stock}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500 hidden sm:table-cell">
                          {product.createdAt}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          <Button
                            mode="secondary"
                            className="px-3 py-1 text-xs md:text-sm bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors"
                            onClick={(e) => {
                              e.stopPropagation(); // Prevent row navigation
                              // Add edit/delete logic here
                            }}
                          >
                            Manage
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={7}
                        className="px-6 py-4 text-center text-gray-500"
                      >
                        No products found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      <AddModal
        modalFlag={modalFlag}
        setModalFlag={setModalFlag}
        children={<AddProduct setModalFlag={setModalFlag} />}
      />
    </>
  );
};

export default ProductsPage;
