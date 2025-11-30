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
import { CartVariantType } from "@/types/cart";
import Footer from "@/components/Footer";

export default function ProductDetails() {
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedImage, setSelectedImage] = useState("");

  // Variant selections (attributes)
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedWeight, setSelectedWeight] = useState<string>("");

  // Derived lists
  const [colors, setColors] = useState<string[]>([]);
  const [sizes, setSizes] = useState<string[]>([]);
  const [weights, setWeights] = useState<string[]>([]);

  const [matchedVariant, setMatchedVariant] = useState<any>(null); // current variant object
  const [displayPrice, setDisplayPrice] = useState<number | null>(null);

  const [variants, setVariants] = useState<CartVariantType[]>([]);
  const [selectedVariant, setSelectedVariant] = useState<CartVariantType>();

  const { TOKEN } = Api();
  const params = useParams();
  const { state } = useContext(AppContext);
  const [message, setMessage] = useState<msgType>(emptyMessage);

  const id = params.id as string;

  // Helper: extract unique attribute lists from product.variants
  const extractAttributes = (variants: any[] = []) => {
    const c = new Set<string>();
    const s = new Set<string>();
    const w = new Set<string>();
    variants.forEach((v) => {
      const attrs = v.attributes || {};
      if (attrs.color) c.add(String(attrs.color));
      if (attrs.size) s.add(String(attrs.size));
      if (attrs.weight) w.add(String(attrs.weight));
    });
    return {
      colors: [...c],
      sizes: [...s],
      weights: [...w],
    };
  };

  // Helper: find variant matching current selections
  const findMatchingVariant = (
    variants: any[] = [],
    color?: string,
    size?: string,
    weight?: string
  ) => {
    if (!variants || variants.length === 0) return null;
    // exact match priority: color + size + weight
    return (
      variants.find((v) => {
        const a = v.attributes || {};
        const matchColor = color ? a.color === color : true;
        const matchSize = size ? a.size === size : true;
        const matchWeight = weight ? a.weight === weight : true;
        return matchColor && matchSize && matchWeight;
      }) || null
    );
  };

  // FETCH PRODUCT
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/products/${id}`, {
          headers: { Authorization: `Bearer ${TOKEN}` },
        });

        const data = res.data.data;
        setProduct(data);
        console.log(data, "data");
        // set default image
        setSelectedImage(
          data.image?.[0] ??
            "https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-08.jpg"
        );

        // build attribute lists from variants (Option B)
        const { colors, sizes, weights } = extractAttributes(data.variants);
        setColors(colors);
        setSizes(sizes);
        setWeights(weights);
        setVariants(data.variants);
        // preselect first available attribute if present
        if (colors.length) setSelectedColor(colors[0]);
        if (sizes.length) setSelectedSize(sizes[0]);
        if (weights.length) setSelectedWeight(weights[0]);
      } catch (err) {
        console.error(err);
        setError("Unable to load product");
      } finally {
        setLoading(false);
      }
    };

    if (id && TOKEN) fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, TOKEN]);

  // When variants or selections change → compute matchedVariant & displayPrice & image
  useEffect(() => {
    if (!product) return;
    console.log(selectedColor, selectedSize, selectedWeight, "selectedWeight");
    const variant = findMatchingVariant(
      product.variants || [],
      selectedColor,
      selectedSize,
      selectedWeight
    );
    console.log(variant, "variant");
    setMatchedVariant(variant);

    // set price:
    let price: number | null = null;
    if (variant?.price !== undefined && variant?.price !== null) {
      price = variant.price;
    } else if (
      product.type === productType.RENTAL &&
      product.rentalTerms?.[0]?.pricePerUnit
    ) {
      price = Number(product.rentalTerms[0].pricePerUnit);
    } else if (product.saleTerms?.salePrice !== undefined) {
      price = Number(product.saleTerms.salePrice);
    } else {
      price = null;
    }
    setDisplayPrice(price);

    // set image to variant image if available, otherwise product.image[0]
    const variantImage = variant?.images?.[0];
    if (variantImage) setSelectedImage(variantImage);
    else
      setSelectedImage(
        product.image?.[0] ||
          "https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-08.jpg"
      );
  }, [product, selectedColor, selectedSize, selectedWeight]);

  if (loading) return <p className="text-center py-10">Loading…</p>;
  if (error || !product)
    return <p className="text-red-500 text-center">{error}</p>;

  // // convenience values
  // const inStock =
  //   matchedVariant?.stock !== undefined
  //     ? matchedVariant.stock > 0
  //     : product.saleTerms?.stock === undefined
  //     ? true
  //     : product.saleTerms.stock > 0;

  // // final price display string
  // const priceDisplay =
  //   displayPrice !== null
  //     ? product.type === productType.RENTAL && product.rentalTerms?.[0]
  //       ? `₹${displayPrice} / ${product.rentalTerms[0].minduration}`
  //       : `₹${displayPrice}`
  //     : "N/A";

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
    console.log(product, "product", matchedVariant);
    // if variants exist, ensure matchedVariant exists and is in stock
    if ((product.variants?.length ?? 0) > 0) {
      if (!selectedVariant) {
        setMessage({
          flag: true,
          message: "Please select a valid variant combination.",
          operation: Operation.NONE,
        });
        return;
      }
      if (selectedVariant.stock !== undefined && selectedVariant.stock <= 0) {
        setMessage({
          flag: true,
          message: "Selected variant is out of stock.",
          operation: Operation.NONE,
        });
        return;
      }
    } else {
      // fallback: if product-level stock available, check
      if (
        product.saleTerms?.stock !== undefined &&
        product.saleTerms.stock <= 0
      ) {
        setMessage({
          flag: true,
          message: "Product out of stock.",
          operation: Operation.NONE,
        });
        return;
      }
    }
    console.log(product.storeId._id, "product.storeId._id");
    try {
      // payload includes variant sku + attribute snapshot for later receipt
      const payload: any = {
        productId: product._id,
        storeId: product.storeId._id,
        vendorId: product.ownerId._id,
        quantity: 1,
        selectedColor: selectedVariant?.attributes?.color || undefined,
        selectedSize: selectedVariant?.attributes?.size || undefined,
        selectedWeight: selectedVariant?.attributes?.weight || undefined,
      };

      if (selectedVariant) {
        payload.variantSku = selectedVariant.sku;
        // include attributes snapshot
        payload.customVariant = selectedVariant.attributes || {};
        // include price snapshot (important)
        payload.salePrice = selectedVariant.price ?? displayPrice ?? 0;
      } else {
        payload.salePrice =
          product.saleTerms?.salePrice ??
          product.rentalTerms?.[0]?.pricePerUnit ??
          0;
      }

      await api.post("/carts", payload, {
        headers: { Authorization: `Bearer ${TOKEN}` },
      });

      setMessage({
        flag: true,
        message: "Item added to cart",
        operation: Operation.CREATE,
      });
    } catch (err) {
      console.error(err);
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
        {/* LEFT: IMAGE */}
        <div>
          <img
            src={selectedImage}
            className="w-full rounded-xl border border-gray-300 object-cover"
            alt={product.name}
          />
        </div>

        {/* RIGHT: DETAILS */}
        <div>
          <h1 className="text-2xl font-bold">{product.name}</h1>

          <p className="text-gray-500 mt-1">{product.description}</p>

          {/* Rating */}
          <div className="flex items-center mt-3">
            {[1, 2, 3, 4, 5].map((i, index) => (
              <StarIcon
                key={index}
                className={`h-5 w-5 ${
                  i <= product.rating ? "text-yellow-500" : "text-gray-300"
                }`}
              />
            ))}
            <span className="ml-2 text-sm text-gray-600">
              {product.rating} / 5
            </span>
          </div>

          {/* //PRICE
          <p className="text-3xl font-bold text-green-600 mt-4">
            {priceDisplay}
          </p> */}

          {/* // STOCK
          {inStock ? (
            <p className="text-sm text-green-600 mt-1">In Stock</p>
          ) : (
            <p className="text-sm text-red-600 mt-1">Out of Stock</p>
          )} */}

          {/* SELLER INFO */}
          <div className="mt-5">
            <p className="text-sm">
              <span className="font-semibold">Store:</span>{" "}
              {product.storeId?.name}
            </p>
            <p className="text-sm">
              <span className="font-semibold">Owner:</span>{" "}
              {product.ownerId?.name}
            </p>
          </div>

          <div className="mt-6">
            <h3 className="font-semibold text-lg text-gray-800 mb-3 border-b pb-1">
              All Product Variants
            </h3>

            {/* Header Row (Optional, but helpful for clarity) */}
            <div className="hidden md:flex text-xs font-medium text-gray-500 border-b pb-2 mb-2">
              <div className="w-1/4">SKU</div>
              <div className="w-1/4">Attributes</div>
              <div className="w-1/4">Price</div>
              <div className="w-1/4">Stock</div>
            </div>

            {/* Variant Rows */}
            <div className="space-y-3">
              {variants.length > 0 ? (
                variants.map((item, index) => {
                  let isSelected;
                  if (selectedVariant)
                    isSelected = item._id === selectedVariant._id;
                  const isOutOfStock = item.stock === 0;

                  return (
                    <div
                      key={index}
                      className={`
                    relative px-4 py-2 text-sm font-medium 
                    border-2 rounded-lg transition-all duration-200 
                    hover:shadow-lg focus:outline-none 
                    
                    // Conditional Styling based on selection and stock
                    ${
                      isOutOfStock
                        ? "opacity-50 cursor-not-allowed line-through border-gray-200 text-gray-400 bg-gray-50"
                        : isSelected
                        ? "border-indigo-600 bg-indigo-50 text-indigo-700 ring-2 ring-indigo-300"
                        : "border-gray-300 text-gray-800 bg-white hover:border-gray-500"
                    }
                  `}
                      onClick={() => setSelectedVariant(item)}
                    >
                      {/* SKU */}
                      <div className="w-full md:w-1/4 font-mono text-xs text-gray-600 mb-1 md:mb-0">
                        {item.sku}
                      </div>

                      {/* Attributes */}
                      <div className="w-full md:w-1/4 flex flex-wrap gap-x-2 gap-y-1 text-sm mb-1 md:mb-0">
                        {/* Displaying attributes as small, labeled badges */}
                        {Object.entries(item.attributes || {}).map(
                          ([key, value]) => (
                            <span
                              key={key}
                              className="
                  px-2 py-0.5 text-xs font-medium rounded-full 
                  bg-blue-100 text-blue-800
                "
                            >
                              {/* Capitalize the key for display */}
                              {key.charAt(0).toUpperCase() + key.slice(1)}:{" "}
                              {value}
                            </span>
                          )
                        )}
                      </div>

                      {/* Price */}
                      <div className="w-full md:w-1/4 font-bold text-gray-900 mb-1 md:mb-0">
                        ₹ {item.price.toFixed(2)}
                      </div>

                      {/* Stock */}
                      {item.stock && (
                        <div className="w-full md:w-1/4 text-sm font-semibold">
                          <span
                            className={`
                px-3 py-1 rounded-full text-xs
                ${
                  item.stock > 10
                    ? "bg-green-100 text-green-800"
                    : item.stock > 0
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-red-100 text-red-800"
                }
              `}
                          >
                            {item.stock > 0
                              ? `${item.stock} in Stock`
                              : "Sold Out"}
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })
              ) : (
                <p className="text-gray-500 italic">No variants found.</p>
              )}
            </div>
          </div>

          {variants.length && selectedVariant ? (
            <Button
              disabled={variants.length && !selectedVariant ? true : false}
              className="mt-8 w-full sm:w-50 border border-gray-400"
              onClick={() => addToCart()}
            >
              Add to Cart
            </Button>
          ) : !variants.length ? (
            <Button
              disabled={variants.length && !selectedVariant ? true : false}
              className="mt-8 w-full sm:w-50 border border-gray-400"
              onClick={() => addToCart()}
            >
              Add to Cart
            </Button>
          ) : null}

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
      {/* <div className="mt-10 border-t pt-6">
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
      </div> */}

      <Footer />

      <MessageModal
        handleClose={() => setMessage(emptyMessage)}
        modalFlag={message.flag}
        operation={message.operation}
        value={message.message}
      />
    </div>
  );
}
