"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { StarIcon } from "@heroicons/react/20/solid";
import Api, { api } from "@/components/helpers/apiheader";
import { productType } from "@/types/product";
import AddOrder from "../AddOrder";
import { Button } from "@/stories/Button/Button";

interface Product {
  _id: string;
  name: string;
  description: string;
  storeId: { _id: string; name: string; address: string };
  ownerId: { _id: string; name: string; email: string };
  categoryId: { _id: string; name: string };
  saleTerms?: { mrpPrice: number; salePrice: number; stock: number };
  rentalTerms?: { unit: number; pricePerUnit: number; minduration: string }[];
  type: productType;
  image: { url: string }[];
  avilablity: boolean;
  rating: number;
  color?: string;
  size?: string;
  brand?: string;
  tags: string[];
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function SingleProduct() {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAddOrderModalOpen, setIsAddOrderModalOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const { TOKEN } = Api();
  const params = useParams();
  const router = useRouter();

  const productId = params.id as string;

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await api.get(`/products/${productId}`, {
          headers: { Authorization: `Bearer ${TOKEN}` },
        });
        if (!response.data.data) {
          throw new Error("Failed to fetch product");
        }
        setProduct(response.data.data);
        setSelectedColor(response.data.data.color || null);
        setSelectedSize(response.data.data.size || null);
      } catch (err) {
        setError("Error fetching product. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (productId && TOKEN) {
      fetchProduct();
    }
  }, [productId, TOKEN]);

  const handleOrderAdded = () => {
    // Refresh OrdersPage or redirect to OrdersPage
    router.push("/orders");
  };

  if (loading) return <p className="text-center py-10">Loading...</p>;
  if (error || !product)
    return (
      <p className="text-red-500 text-center py-10">
        {error || "Product not found"}
      </p>
    );

  const price =
    product.type === productType.RENTAL && product.rentalTerms?.[0]
      ? `₹${product.rentalTerms[0].pricePerUnit} / ${product.rentalTerms[0].minduration}`
      : product.saleTerms
      ? `₹${product.saleTerms.salePrice.toFixed(2)}`
      : "N/A";

  const breadcrumbs = [
    { id: 1, name: "Products", href: "/products" },
    { id: 2, name: product.categoryId.name, href: "#" },
  ];

  return (
    <>
      <div className="bg-white">
        <div className="pt-6">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb">
            <ol
              role="list"
              className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8"
            >
              {breadcrumbs.map((breadcrumb) => (
                <li key={breadcrumb.id}>
                  <div className="flex items-center">
                    <a
                      href={breadcrumb.href}
                      className="mr-2 text-sm font-medium text-gray-900"
                    >
                      {breadcrumb.name}
                    </a>
                    <svg
                      fill="currentColor"
                      width={16}
                      height={20}
                      viewBox="0 0 16 20"
                      aria-hidden="true"
                      className="h-5 w-4 text-gray-300"
                    >
                      <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                    </svg>
                  </div>
                </li>
              ))}
              <li className="text-sm">
                <span className="font-medium text-gray-500">
                  {product.name}
                </span>
              </li>
            </ol>
          </nav>

          {/* Image gallery */}
          <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-8 lg:px-8">
            {[1].map((img, index) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={index}
                src={
                  "https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-08.jpg"
                }
                alt={product.name}
                className={`${
                  index === 0
                    ? "row-span-2 aspect-3/4"
                    : index === 1
                    ? "col-start-2 aspect-3/2"
                    : index === 2
                    ? "col-start-2 row-start-2 aspect-3/2"
                    : "row-span-2 aspect-4/5"
                } size-full rounded-lg object-cover ${
                  index > 2 ? "max-lg:hidden" : ""
                }`}
              />
            ))}
          </div>

          {/* Product info */}
          <div className="mx-auto max-w-2xl px-4 pt-10 pb-16 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto_auto_1fr] lg:gap-x-8 lg:px-8 lg:pt-16 lg:pb-24">
            <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                {product.name}
              </h1>
              <p className="mt-2 text-sm text-gray-500">
                Sold by: {product.ownerId.name}
              </p>
              <p className="mt-1 text-sm text-gray-500">
                Store: {product.storeId.name}
              </p>
              {product.brand && (
                <p className="mt-1 text-sm text-gray-500">
                  Brand: {product.brand}
                </p>
              )}
            </div>

            {/* Options */}
            <div className="mt-4 lg:row-span-3 lg:mt-0">
              <h2 className="sr-only">Product information</h2>
              <p className="text-3xl tracking-tight text-gray-900">{price}</p>
              {!product.avilablity && (
                <p className="text-red-500 text-sm mt-2">Out of stock</p>
              )}

              {/* Reviews */}
              <div className="mt-6">
                <h3 className="sr-only">Reviews</h3>
                <div className="flex items-center">
                  <div className="flex items-center">
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <StarIcon
                        key={rating}
                        aria-hidden="true"
                        className={classNames(
                          product.rating > rating
                            ? "text-gray-900"
                            : "text-gray-200",
                          "size-5 shrink-0"
                        )}
                      />
                    ))}
                  </div>
                  <p className="sr-only">{product.rating} out of 5 stars</p>
                  <a
                    href="#reviews"
                    className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    {product.rating > 0
                      ? `${product.rating} reviews`
                      : "No reviews"}
                  </a>
                </div>
              </div>

              <form className="mt-10" onSubmit={(e) => e.preventDefault()}>
                {/* Colors */}
                {product.color && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Color</h3>
                    <fieldset aria-label="Choose a color" className="mt-4">
                      <div className="flex items-center gap-x-3">
                        <div className="flex rounded-full outline -outline-offset-1 outline-black/10">
                          <input
                            value={product.color}
                            checked={selectedColor === product.color}
                            name="color"
                            type="radio"
                            aria-label={product.color}
                            className={classNames(
                              "bg-[--color] size-8 appearance-none rounded-full forced-color-adjust-none checked:outline-2 checked:outline-offset-2 focus-visible:outline-3 focus-visible:outline-offset-3",
                              { "--color": product.color.toLowerCase() }
                            )}
                            onChange={() => setSelectedColor(product.color)}
                          />
                        </div>
                      </div>
                    </fieldset>
                  </div>
                )}

                {/* Sizes */}
                {product.size && (
                  <div className="mt-10">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium text-gray-900">
                        Size
                      </h3>
                      <a
                        href="#"
                        className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        Size guide
                      </a>
                    </div>
                    <fieldset aria-label="Choose a size" className="mt-4">
                      <div className="grid grid-cols-4 gap-3">
                        <label
                          aria-label={product.size}
                          className="group relative flex items-center justify-center rounded-md border border-gray-300 bg-white p-3 has-checked:border-indigo-600 has-checked:bg-indigo-600 has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-indigo-600"
                        >
                          <input
                            value={product.size}
                            checked={selectedSize === product.size}
                            name="size"
                            type="radio"
                            className="absolute inset-0 appearance-none focus:outline-none"
                            onChange={() =>
                              product.size ? setSelectedSize(product.size) : ""
                            }
                          />
                          <span className="text-sm font-medium text-gray-900 uppercase group-has-checked:text-white">
                            {product.size}
                          </span>
                        </label>
                      </div>
                    </fieldset>
                  </div>
                )}

                <Button
                  type="button"
                  onClick={() => setIsAddOrderModalOpen(true)}
                  disabled={!product.avilablity}
                  mode="primary"
                  className="mt-10 flex w-full items-center justify-center"
                >
                  Place Order
                </Button>
              </form>
            </div>

            <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pt-6 lg:pr-8 lg:pb-16">
              {/* Description and details */}
              <div>
                <h3 className="sr-only">Description</h3>
                <div className="space-y-6">
                  <p className="text-base text-gray-900">
                    {product.description}
                  </p>
                </div>
              </div>

              {product.tags.length > 0 && (
                <div className="mt-10">
                  <h3 className="text-sm font-medium text-gray-900">Tags</h3>
                  <div className="mt-4">
                    <ul role="list" className="flex flex-wrap gap-2">
                      {product.tags.map((tag) => (
                        <li
                          key={tag}
                          className="inline-block rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-600"
                        >
                          {tag}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              <div className="mt-10">
                <h2 className="text-sm font-medium text-gray-900">Details</h2>
                <div className="mt-4 space-y-6">
                  <p className="text-sm text-gray-600">
                    Type:{" "}
                    {product.type.charAt(0).toUpperCase() +
                      product.type.slice(1)}
                  </p>
                  {product.type === productType.RENTAL &&
                    product.rentalTerms?.[0] && (
                      <>
                        <p className="text-sm text-gray-600">
                          Minimum Duration: {product.rentalTerms[0].minduration}
                        </p>
                        <p className="text-sm text-gray-600">
                          Rental Unit: {product.rentalTerms[0].unit}
                        </p>
                      </>
                    )}
                  {product.saleTerms && (
                    <>
                      <p className="text-sm text-gray-600">
                        MRP: ₹{product.saleTerms.mrpPrice.toFixed(2)}
                      </p>
                      <p className="text-sm text-gray-600">
                        Stock: {product.saleTerms.stock}
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {isAddOrderModalOpen && (
          <AddOrder
            product={{
              _id: product._id,
              name: product.name,
              venderId: {
                _id: product.ownerId._id,
                name: product.ownerId.name,
              },
              storeId: { _id: product.storeId._id, name: product.storeId.name },
              saleTerms: product.saleTerms,
            }}
            setModalFlag={setIsAddOrderModalOpen}
            onOrderAdded={handleOrderAdded}
          />
        )}
      </div>
    </>
  );
}
