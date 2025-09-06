"use client";
import NavBar from "@/components/commen/Navbar";
import AddModal from "@/components/helpers/AddModal";
import Loading from "@/components/helpers/Loading";
import Api, { api } from "@/components/helpers/apiheader";
import { Button } from "@/stories/Button/Button";
import { LicenseTypes } from "@/utils/enum.types";
import React, { useEffect } from "react";
import AddCategory from "./AddCategory";
import { CategoryTypes } from "@/utils/commenTypes";

const CategoriesPage = () => {
  const { TOKEN } = Api();
  const [loading, setLoading] = React.useState(false);
  const [products, setProducts] = React.useState<CategoryTypes[]>([]);
  const [modalFlag, setModalFlag] = React.useState(false);

  const productsTableHeader = [
    {
      name: "Name",
      className:
        "md:px-4 pl-2 md:pl-4 py-3 flex items-center space-x-3 truncate",
    },
    { name: "Description", className: "max-sm:hidden" },
    { name: "Level", className: "" },
    { name: "Status", className: "max-sm:hidden" },
    { name: "Created At", className: "max-sm:hidden" },
    { name: "Action", className: "" },
  ];

  const GetUsers = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/categories`, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          "Content-Type": "application/json",
        },
      });

      if (res.status === 200) {
        setProducts(
          res.data.data.map((product: CategoryTypes) => ({
            id: product._id,
            name: product.name || "N/A",
            description: product.description || "N/A",
            parentCatId: product.parentCatId || "N/A",
            level: product.level,
            status: product.status,
            createdAt: product.createdAt || "N/A",
            updatedAt: product.updatedAt || "N/A",
          }))
        );
      } else {
        console.error("Failed to fetch users:", res.data);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (TOKEN) GetUsers();
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
                All Categories
              </h2>
              <Button
                mode="primary"
                className="ml-auto px-4 py-2 text-sm md:text-base rounded-md bg-orange-600 hover:bg-orange-700 text-white transition-colors"
                onClick={() => setModalFlag(true)}
              >
                Add Category
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
                          {product.level}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {product.status}
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
        // eslint-disable-next-line react/no-children-prop
        children={<AddCategory setModalFlag={setModalFlag} />}
      />
    </>
  );
};

export default CategoriesPage;
