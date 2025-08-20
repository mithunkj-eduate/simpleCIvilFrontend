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
          <div className="w-full md:p-10 p-4">
            <div className="flex">
              <h2 className="pb-4 text-lg font-medium">All Categories</h2>
              <Button
                mode="primary"
                className="ms-auto m-2"
                onClick={() => setModalFlag(true)}
              >
                Add{" "}
              </Button>
            </div>
            <div className="flex flex-col items-center max-w-6xl w-full overflow-hidden rounded-md bg-white border border-gray-500/20">
              <table className="table-fixed w-full overflow-hidden">
                <thead className="text-gray-900 text-sm text-left">
                  <tr>
                    {productsTableHeader.map((header, index) => (
                      <th
                        key={index}
                        className={`${header.className} px-4 py-3`}
                      >
                        {header.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="text-sm text-gray-500">
                  {products &&
                    products.map((product, index) => (
                      <tr key={index} className="border-t border-gray-500/20">
                        <td className="md:px-4 pl-2 md:pl-4 py-3 flex items-center space-x-3 truncate">
                          <div className="bg-gray-500/10 rounded p-2">
                            {/* <Image
                        src={product ? "" : "/placeholder.png"}
                        alt="product Image"
                        className="w-16"
                        width={1280}
                        height={720}
                      /> */}
                            {product.name
                              ? product.name.charAt(0).toUpperCase()
                              : "N/A"}
                          </div>
                          <span className="truncate w-full">
                            {product.name}
                          </span>
                        </td>
                        <td className="px-4 py-3 max-sm:hidden">
                          {product.description}
                        </td>
                        <td className="px-4 py-3">{product.level}</td>

                        <td className="px-4 py-3 max-sm:hidden">
                          {product.status}
                        </td>

                        <td className="px-4 py-3 max-sm:hidden">
                          {product.createdAt}
                        </td>
                        <td className="px-4 py-3 max-sm:hidden">
                          <button className="flex items-center gap-1 px-1.5 md:px-3.5 py-2 bg-orange-600 text-white rounded-md">
                            <span className="hidden md:block">Visit</span>
                            {/* <Image
                              className="h-3.5"
                              src={"/"}
                              alt="redirect_icon"
                            /> */}
                          </button>
                        </td>
                      </tr>
                    ))}
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
