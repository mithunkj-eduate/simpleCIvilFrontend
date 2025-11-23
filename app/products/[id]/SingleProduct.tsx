/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect, useContext } from "react";
import { useParams } from "next/navigation";
import { StarIcon } from "@heroicons/react/20/solid";
import Api, { api } from "@/components/helpers/apiheader";
import { AppContext } from "@/context/context";
import { productType } from "@/types/product";
import { Button } from "@/stories/Button/Button";
import MessageModal from "@/customComponents/MessageModal";
import { Operation } from "@/utils/enum.types";
import { msgType } from "@/utils/commenTypes";
import { emptyMessage } from "@/utils/constants";

export default function ProductDetails() {
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const { TOKEN } = Api();
  const params = useParams();
  const { state } = useContext(AppContext);
  const [message, setMessage] = useState<msgType>(emptyMessage);

  const id = params.id as string;

  // FETCH PRODUCT
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get(`/products/${id}`, {
          headers: { Authorization: `Bearer ${TOKEN}` },
        });

        const data = res.data.data;
        setProduct(data);
        setSelectedImage(
          data.image?.[0] ||
            "https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-08.jpg"
        );
      } catch (err) {
        setError("Unable to load product");
      } finally {
        setLoading(false);
      }
    };
    if (id && TOKEN) fetchData();
  }, [id, TOKEN]);

  if (loading) return <p className="text-center py-10">Loading…</p>;
  if (error || !product)
    return <p className="text-red-500 text-center">{error}</p>;

  const price =
    product.type === productType.RENTAL && product.rentalTerms?.[0]
      ? `₹${product.rentalTerms[0].pricePerUnit} / ${product.rentalTerms[0].minduration}`
      : product.saleTerms
      ? `₹${product.saleTerms.salePrice.toFixed(2)}`
      : "N/A";

  // ADD TO CART
  const addToCart = async () => {
    if (!TOKEN && !state.user) {
      setMessage({
        flag: true,
        message: "Please login to add items.",
        operation: Operation.NONE,
      });
      return;
    }

    try {
      await api.post(
        "/carts",
        { productId: product._id, quantity: 1 },
        { headers: { Authorization: `Bearer ${TOKEN}` } }
      );

      setMessage({
        flag: true,
        message: "Item added to cart",
        operation: Operation.CREATE,
      });
    } catch (err) {
      setMessage({
        flag: true,
        message: "Failed to add item",
        operation: Operation.NONE,
      });
    }
  };


  return (
    <div className="bg-white p-4 md:p-10">
      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* LEFT: IMAGES */}
        <div>
          <img
            src={selectedImage}
            className="w-full rounded-xl border border-gray-300 object-cover"
            alt="saleproduct"
          />

          {/* Thumbnail */}
          {/* <div className="flex gap-3 mt-4">
            {product.image.length && product.image?.map((img: any, i: number) => (
              <img
                key={i}
                src={img}
                onClick={() => setSelectedImage(img)}
                className={`h-20 w-20 cursor-pointer rounded-lg border ${
                  selectedImage === img && "border-blue-500"
                }`}
              />
            ))}
          </div> */}
        </div>

        {/* RIGHT: PRODUCT DETAILS */}
        <div>
          <h1 className="text-2xl font-bold">{product.name}</h1>

          <p className="text-gray-500 mt-1">{product.description}</p>

          {/* Rating */}
          <div className="flex items-center mt-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <StarIcon
                key={i}
                className={`h-5 w-5 ${
                  i <= product.rating ? "text-yellow-500" : "text-gray-300"
                }`}
              />
            ))}
            <span className="ml-2 text-sm text-gray-600">
              {product.rating} / 5
            </span>
          </div>

          {/* PRICE */}
          <p className="text-3xl font-bold text-green-600 mt-4">{price}</p>

          {/* STOCK */}
          {product.avilablity ? (
            <p className="text-sm text-green-600 mt-1">In Stock</p>
          ) : (
            <p className="text-sm text-red-600 mt-1">Out of Stock</p>
          )}

          {/* SELLER INFO */}
          <div className="mt-5">
            <p className="text-sm">
              <span className="font-semibold">Store:</span>{" "}
              {product.storeId.name}
            </p>
            <p className="text-sm">
              <span className="font-semibold">Owner:</span>{" "}
              {product.ownerId.name}
            </p>
          </div>

          {/* BUTTON */}
          <Button
            mode="primary"
            disabled={!product.avilablity}
            className="mt-8 w-full sm:w-50"
            onClick={addToCart}
          >
            Add to Cart
          </Button>

          {/* TAGS */}
          {product.tags?.length > 0 && (
            <div className="mt-6">
              <h4 className="font-medium">Tags</h4>
              <div className="flex gap-2 flex-wrap mt-2">
                {product.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-xs bg-gray-100 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* DETAILS SECTION */}
      <div className="mt-10 border-t pt-6">
        <h3 className="text-xl font-semibold">Product Details</h3>
        <p className="text-gray-700 mt-2">Type: {product.type}</p>

        {product.type === productType.RENTAL && (
          <>
            <p className="text-gray-700">
              Min Duration: {product.rentalTerms?.[0]?.minduration}
            </p>
            <p className="text-gray-700">
              Unit: {product.rentalTerms?.[0]?.unit}
            </p>
          </>
        )}

        {product.saleTerms && (
          <>
            <p className="text-gray-700 mt-2">
              MRP: ₹{product.saleTerms.mrpPrice}
            </p>
            <p className="text-gray-700">Stock: {product.saleTerms.stock}</p>
          </>
        )}
      </div>

      <MessageModal
        handleClose={() => {
          setMessage(emptyMessage);
        }}
        modalFlag={message.flag}
        operation={message.operation}
        value={message.message}
      />
    </div>
  );
}
