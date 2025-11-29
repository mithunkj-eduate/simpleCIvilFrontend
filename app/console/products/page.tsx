"use client";

import { GetProductData, Products } from "@/commenType/commenTypes";
import NavBar from "@/components/commen/Navbar";
import AddModal from "@/components/helpers/AddModal";
import Loading from "@/components/helpers/Loading";
import Api, { api } from "@/components/helpers/apiheader";
import { Button } from "@/stories/Button/Button";
import { LicenseTypes, Operation } from "@/utils/enum.types";
import React, { useContext, useEffect, useState } from "react";
import AddProduct from "./AddProduct";
import { AppContext } from "@/context/context";
import Image from "next/image";

const ProductsPage = () => {
  const { TOKEN } = Api();
  const [loading, setLoading] = React.useState(false);
  const [products, setProducts] = React.useState<Products[]>([]);
  const [modalFlag, setModalFlag] = React.useState(false);
  const { state } = useContext(AppContext);
  const [operation, setOperation] = useState<Operation>(Operation.NONE);
  const [selectedId, setSelectedId] = useState("");

  const productsTableHeader = [
    {
      name: "Name",
      className: "md:px-6 pl-4 py-3 flex items-center space-x-3 truncate",
    },
    { name: "Description", className: "hidden sm:table-cell" },
    // { name: "Mrp Price", className: "hidden sm:table-cell" },
    // { name: "Sale Price", className: "hidden sm:table-cell" },
    { name: "Group", className: "px-6 py-3" },
    { name: "Category", className: "px-6 py-3 hidden sm:table-cell" },
    { name: "Subcategory", className: "px-6 py-3 hidden sm:table-cell" },
    // { name: "Stock", className: "hidden sm:table-cell" },
    { name: "Created At", className: "hidden sm:table-cell" },
    { name: "Action", className: "px-6 py-3" },
  ];

  const GetUsers = async () => {
    setLoading(true);
    try {
      if (state.user && state.user.id) {
        const res = await api.get(`/products?ownerId=${state.user.id}`, {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
            "Content-Type": "application/json",
          },
        });

        if (res) {
          setProducts(
            res.data.data.map((product: GetProductData) => ({
              id: product._id,
              name: product.name || "N/A",
              description: product.description || "N/A",
              mrpPrice: product.saleTerms?.mrpPrice || 0,
              salePrice: product.saleTerms?.salePrice || 0,
              group: product.groupId?.name || "N/A",
              category: product.categoryId?.name || "N/A",
              subsidiary: product.subsidiaryId?.name || "N/A",
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
  }, [TOKEN, state.user?.id]);

  return (
    <>
      <NavBar NavType={LicenseTypes.ADMIN} />

      <div className="flex-1 min-h-screen flex flex-col justify-between">
        {loading ? (
          <Loading />
        ) : (
          <div className="mx-auto max-w-7xl px-4  py-8 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between pb-4">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                All Products
              </h1>
              <Button
                mode="primary"
                className="ml-auto px-4 py-2 text-sm md:text-base rounded-md bg-orange-600 hover:bg-orange-700 text-white transition-colors"
                onClick={() => {
                  setOperation(Operation.CREATE);
                  setModalFlag(true);
                }}
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
                        {/* <td className="px-6 py-4 text-sm text-gray-500 hidden sm:table-cell">
                          ₹{product.mrpPrice.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500 hidden sm:table-cell">
                          ₹{product.salePrice.toFixed(2)}
                        </td> */}
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {product.group}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500 hidden sm:table-cell">
                          {product.category}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500 hidden sm:table-cell">
                          {product.subsidiary}
                        </td>
                        {/* <td className="px-6 py-4 text-sm text-gray-500 hidden sm:table-cell">
                          {product.stock}
                        </td> */}
                        <td className="px-6 py-4 text-sm text-gray-500 hidden sm:table-cell">
                          {product.createdAt}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500 flex">
                          <Image
                            width={50}
                            height={50}
                            src={"/EyeIcon.svg"}
                            alt="productEdit"
                            className="size-5"
                            onClick={() => {
                              setSelectedId(product.id);
                              setOperation(Operation.VIEW);
                              setModalFlag(true);
                            }}
                          />
                          <Image
                            width={50}
                            height={50}
                            src={"/Edit.svg"}
                            alt="productEdit"
                            className="size-5"
                            onClick={() => {
                              setSelectedId(product.id);
                              setOperation(Operation.UPDATE);
                              setModalFlag(true);
                            }}
                          />
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

      <AddModal modalFlag={modalFlag} setModalFlag={setModalFlag}>
        <AddProduct
          setModalFlag={setModalFlag}
          operations={{
            operation,
            setOperation,
          }}
          selectedId={selectedId}
        />
      </AddModal>
    </>
  );
};

export default ProductsPage;
