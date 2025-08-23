"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
} from "@heroicons/react/20/solid";
import { productSortQuery } from "@/types/productSchemaTypes";
import Api, { api } from "@/components/helpers/apiheader";

// Sample ProductCard component
interface Product {
  _id: string;
  name: string;
  description: string;
  storeId: { _id: string; name: string };
  categoryId: { _id: string; name: string };
  type: string;
  avilablity: boolean;
  saleTerms?: {
    price: number;
    salePrice: number;
    mrpPrice: number;
    stock: number;
  };
  rentalTerms?: { unit: number; pricePerUnit: number; minduration: number }[];
  rating: number;
  createdAt: string;
  tags: string[];
  color?: string;
  size?: string;
}

function ProductCard({ product }: { product: Product }) {
  const price = product.saleTerms
    ? product.saleTerms.salePrice || product.saleTerms.price
    : product.rentalTerms && product.rentalTerms.length > 0
    ? product.rentalTerms[0].pricePerUnit
    : 0;

  return (
    <div className="border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow bg-white">
      <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
      <p className="text-sm text-gray-600 mt-1">{product.description}</p>
      <p className="text-sm text-gray-500 mt-2">
        Store: {product.storeId.name}
      </p>
      <p className="text-sm text-gray-500">
        Category: {product.categoryId.name}
      </p>
      <p className="text-sm text-gray-500">Type: {product.type}</p>
      <p className="text-sm text-gray-500">
        Price: ₹{price ? price.toFixed(2) : price}{" "}
        {product.type === "rental" ? "/ unit" : ""}
      </p>
      <p className="text-sm text-gray-500">
        Availability: {product.avilablity ? "In Stock" : "Out of Stock"}
      </p>
      <p className="text-sm text-gray-500">Rating: {product.rating} / 5</p>
      {product.color && (
        <p className="text-sm text-gray-500">Color: {product.color}</p>
      )}
      {product.size && (
        <p className="text-sm text-gray-500">Size: {product.size}</p>
      )}
      {product.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {product.tags.map((tag) => (
            <span
              key={tag}
              className="inline-block bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

// AllProducts component
interface AllProductsProps {
  products: Product[];
}

function AllProducts({ products }: AllProductsProps) {
  return (
    <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.length > 0 ? (
        products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))
      ) : (
        <p className="text-gray-500 col-span-full text-center py-10">
          No products match the selected filters.
        </p>
      )}
    </div>
  );
}

const sortOptions = [
  { name: "Most Popular", value: productSortQuery.MOST_POPULAR, current: true },
  { name: "Best Rating", value: productSortQuery.BEST_RATING, current: false },
  { name: "Newest", value: productSortQuery.NEWEST, current: false },
  {
    name: "Price: Low to High",
    value: productSortQuery.PRICE_LOW_TO_HIGHT,
    current: false,
  },
  {
    name: "Price: High to Low",
    value: productSortQuery.PRICE_HIGHT_TO_LOW,
    current: false,
  },
];

const subCategories = [
  { name: "All", href: "#", current: true },
  { name: "Sale", href: "#", current: false },
  { name: "Resale", href: "#", current: false },
  { name: "Rentals", href: "#", current: false },
];

// Dynamic filter generation
const extractCategories = (products: Product[]) => {
  const categories = products.map((product) => ({
    id: product.categoryId._id,
    name: product.categoryId.name,
  }));
  return [...new Map(categories.map((cat) => [cat.id, cat])).values()].map(
    (category) => ({
      value: category.id,
      label: category.name,
      checked: false,
    })
  );
};

const extractStores = (products: Product[]) => {
  const stores = products.map((product) => ({
    id: product.storeId._id,
    name: product.storeId.name,
  }));
  return [...new Map(stores.map((store) => [store.id, store])).values()].map(
    (store) => ({
      value: store.id,
      label: store.name,
      checked: false,
    })
  );
};

const extractPriceRanges = () => {
  return [
    { value: "0-100", label: "Under ₹100", min: 0, max: 100, checked: false },
    {
      value: "100-500",
      label: "₹100 - ₹500",
      min: 100,
      max: 500,
      checked: false,
    },
    {
      value: "500-1000",
      label: "₹500 - ₹1000",
      min: 500,
      max: 1000,
      checked: false,
    },
    {
      value: "1000-above",
      label: "Above ₹1000",
      min: 1000,
      max: Infinity,
      checked: false,
    },
  ];
};

const extractTags = (products: Product[]) => {
  const allTags = products.flatMap((product) => product.tags);
  return [...new Set(allTags)].map((tag) => ({
    value: tag.toLowerCase().replace(/\s+/g, "-"),
    label: tag,
    checked: false,
  }));
};

const extractColors = (products: Product[]) => {
  const colors = products
    .map((product) => product.color)
    .filter((color): color is string => !!color);
  return [...new Set(colors)].map((color) => ({
    value: color.toLowerCase().replace(/\s+/g, "-"),
    label: color,
    checked: false,
  }));
};

const extractSizes = (products: Product[]) => {
  const sizes = products
    .map((product) => product.size)
    .filter((size): size is string => !!size);
  return [...new Set(sizes)].map((size) => ({
    value: size.toLowerCase().replace(/\s+/g, "-"),
    label: size,
    checked: false,
  }));
};

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductsPage() {
  const { TOKEN } = Api();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [productsData, setProductsData] = useState<{
    data: Product[];
    totalCount: number;
  }>({
    data: [],
    totalCount: 0,
  });
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedSort, setSelectedSort] = useState(sortOptions[0]);
  const [selectedSubCategory, setSelectedSubCategory] = useState("all");
  const [filters, setFilters] = useState({
    category: [] as { value: string; label: string; checked: boolean }[],
    store: [] as { value: string; label: string; checked: boolean }[],
    priceRange: extractPriceRanges(),
    tags: [] as { value: string; label: string; checked: boolean }[],
    color: [] as { value: string; label: string; checked: boolean }[],
    size: [] as { value: string; label: string; checked: boolean }[],
    rating: 0,
    availability: false,
    location: { lat: "", lng: "" },
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterVersion, setFilterVersion] = useState(0); // To track filter changes

  // Memoize filter options to prevent unnecessary recreation
  const memoizedFilters = useMemo(
    () => ({
      category: filters.category.map((cat) => cat.value),
      store: filters.store.map((store) => store.value),
      priceRange: filters.priceRange.find((range) => range.checked),
      tags: filters.tags.map((tag) => tag.value),
      color: filters.color.map((color) => color.value),
      size: filters.size.map((size) => size.value),
      rating: filters.rating,
      availability: filters.availability,
      location: filters.location,
    }),
    [filterVersion]
  );

  // Fetch products from API
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);

    const queryParams = new URLSearchParams();

    if (selectedSubCategory !== "all") {
      queryParams.append("type", selectedSubCategory);
    }

    const selectedCategories = filters.category
      .filter((cat) => cat.checked)
      .map((cat) => cat.value);
    if (selectedCategories.length > 0) {
      queryParams.append("categoryId", selectedCategories.join(","));
    }

    const selectedStores = filters.store
      .filter((store) => store.checked)
      .map((store) => store.value);
    if (selectedStores.length > 0) {
      queryParams.append("storeId", selectedStores.join(","));
    }

    const selectedPriceRange = filters.priceRange.find(
      (range) => range.checked
    );
    if (selectedPriceRange) {
      queryParams.append("minPrice", selectedPriceRange.min.toString());
      queryParams.append("maxPrice", selectedPriceRange.max.toString());
    }

    const selectedTags = filters.tags
      .filter((tag) => tag.checked)
      .map((tag) => tag.label);
    if (selectedTags.length > 0) {
      queryParams.append("tags", selectedTags.join(","));
    }

    const selectedColors = filters.color
      .filter((color) => color.checked)
      .map((color) => color.label);
    if (selectedColors.length > 0) {
      queryParams.append("color", selectedColors.join(","));
    }

    const selectedSizes = filters.size
      .filter((size) => size.checked)
      .map((size) => size.label);
    if (selectedSizes.length > 0) {
      queryParams.append("size", selectedSizes.join(","));
    }

    if (filters.rating > 0) {
      queryParams.append("rating", filters.rating.toString());
    }

    if (filters.availability) {
      queryParams.append("avilablity", "true");
    }

    if (filters.location.lat && filters.location.lng) {
      queryParams.append("lat", filters.location.lat);
      queryParams.append("lng", filters.location.lng);
    }

    queryParams.append("sort", selectedSort.value);
    console.log("Fetching products with query params:", queryParams.toString());
    try {
      const response = await api.get(`/products?${queryParams.toString()}`, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status !== 200) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.data;
      setProductsData(data);
      setFilteredProducts(data.data);

      // Only update filters on initial load or if filter options are empty
      if (
        filters.category.length === 0 ||
        filters.store.length === 0 ||
        filters.tags.length === 0 ||
        filters.color.length === 0 ||
        filters.size.length === 0
      ) {
        setFilters((prev) => ({
          ...prev,
          category:
            prev.category.length === 0
              ? extractCategories(data.data)
              : prev.category,
          store:
            prev.store.length === 0 ? extractStores(data.data) : prev.store,
          tags: prev.tags.length === 0 ? extractTags(data.data) : prev.tags,
          color:
            prev.color.length === 0 ? extractColors(data.data) : prev.color,
          size: prev.size.length === 0 ? extractSizes(data.data) : prev.size,
        }));
      }
    } catch (err) {
      setError("Error fetching products. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [selectedSubCategory, selectedSort, memoizedFilters]);

  // const getUserLocation = () => {
  //   navigator.geolocation.getCurrentPosition(
  //     (position) => {
  //       updateLocationFilter(
  //         position.coords.latitude.toString(),
  //         position.coords.longitude.toString()
  //       );
  //     },
  //     (err) => console.error("Geolocation error:", err)
  //   );
  // };

  // useEffect(() => {
  //   getUserLocation();
  // }, []);

  // Initial fetch and refetch on filter/sort changes
  useEffect(() => {
    if (!TOKEN || TOKEN == null || TOKEN == undefined) return;

    if (TOKEN) {
      const handler = setTimeout(() => {
        fetchProducts();
      }, 300); // Debounce API calls by 300ms

      return () => clearTimeout(handler);
    }
  }, [fetchProducts, TOKEN]);

  const updateFilter = (
    filterType: string,
    value: string,
    checked: boolean
  ) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: prev[filterType].map((option) =>
        option.value === value ? { ...option, checked } : option
      ),
    }));
    setFilterVersion((prev) => prev + 1); // Trigger fetch
  };

  const updateRatingFilter = (rating: number) => {
    setFilters((prev) => ({ ...prev, rating }));
    setFilterVersion((prev) => prev + 1); // Trigger fetch
  };

  const updateLocationFilter = (lat: string, lng: string) => {
    setFilters((prev) => ({ ...prev, location: { lat, lng } }));
    setFilterVersion((prev) => prev + 1); // Trigger fetch
  };

  const updatePriceRangeFilter = (value: string) => {
    setFilters((prev) => ({
      ...prev,
      priceRange: prev.priceRange.map((range) => ({
        ...range,
        checked: range.value === value,
      })),
    }));
    setFilterVersion((prev) => prev + 1); // Trigger fetch
  };

  const clearAllFilters = () => {
    setFilters({
      category: filters.category.map((cat) => ({ ...cat, checked: false })),
      store: filters.store.map((store) => ({ ...store, checked: false })),
      priceRange: filters.priceRange.map((range) => ({
        ...range,
        checked: false,
      })),
      tags: filters.tags.map((tag) => ({ ...tag, checked: false })),
      color: filters.color.map((color) => ({ ...color, checked: false })),
      size: filters.size.map((size) => ({ ...size, checked: false })),
      rating: 0,
      availability: false,
      location: { lat: "", lng: "" },
    });
    setSelectedSubCategory("all");
    setSelectedSort(sortOptions[0]);
    setFilterVersion((prev) => prev + 1); // Trigger fetch
  };

  return (
    <div className="bg-white">
      <div>
        {/* Mobile filter dialog */}
        <Dialog
          open={mobileFiltersOpen}
          onClose={setMobileFiltersOpen}
          className="relative z-51 lg:hidden"
        >
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-black/25 transition-opacity duration-300 ease-linear data-closed:opacity-0"
          />
          <div className="fixed inset-0 z-40 flex">
            <DialogPanel
              transition
              className="relative ml-auto flex size-full max-w-xs transform flex-col overflow-y-auto bg-white pt-4 pb-6 shadow-xl transition duration-300 ease-in-out data-closed:translate-x-full"
            >
              <div className="flex items-center justify-between px-4">
                <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={clearAllFilters}
                    className="text-sm text-indigo-600 hover:text-indigo-800"
                  >
                    Clear All
                  </button>
                  <button
                    type="button"
                    onClick={() => setMobileFiltersOpen(false)}
                    className="relative -mr-2 flex size-10 items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                  >
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon aria-hidden="true" className="size-6" />
                  </button>
                </div>
              </div>

              {/* Filters */}
              <form className="mt-4 border-t border-gray-200">
                <h3 className="sr-only">Sub Categories</h3>
                <ul
                  role="list"
                  className="px-2 py-3 font-medium text-gray-900 space-y-2"
                >
                  {subCategories.map((category) => (
                    <li key={category.name}>
                      <button
                        onClick={() => {
                          setSelectedSubCategory(category.name.toLowerCase());
                          setFilterVersion((prev) => prev + 1);
                        }}
                        className={classNames(
                          selectedSubCategory === category.name.toLowerCase()
                            ? "bg-indigo-600 text-white"
                            : "text-gray-900 hover:bg-gray-50",
                          "block w-full px-2 py-3 rounded-md text-left"
                        )}
                      >
                        {category.name}
                      </button>
                    </li>
                  ))}
                </ul>

                {[
                  "category",
                  "store",
                  "priceRange",
                  "tags",
                  "color",
                  "size",
                ].map((section) => (
                  <Disclosure
                    key={section}
                    as="div"
                    className="border-t border-gray-200 px-4 py-6"
                  >
                    <h3 className="-mx-2 -my-3 flow-root">
                      <DisclosureButton className="group flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                        <span className="font-medium text-gray-900">
                          {section.charAt(0).toUpperCase() + section.slice(1)} (
                          {section === "priceRange"
                            ? filters[section].filter((opt) => opt.checked)
                                .length
                            : filters[section].filter((opt) => opt.checked)
                                .length}
                          )
                        </span>
                        <span className="ml-6 flex items-center">
                          <PlusIcon
                            aria-hidden="true"
                            className="size-5 group-data-open:hidden"
                          />
                          <MinusIcon
                            aria-hidden="true"
                            className="size-5 group-not-data-open:hidden"
                          />
                        </span>
                      </DisclosureButton>
                    </h3>
                    <DisclosurePanel className="pt-6">
                      <div className="space-y-4">
                        {filters[section].map((option, optionIdx) => (
                          <div key={option.value} className="flex gap-3">
                            <input
                              id={`filter-mobile-${section}-${optionIdx}`}
                              name={`${section}[]`}
                              type={
                                section === "priceRange" ? "radio" : "checkbox"
                              }
                              checked={option.checked}
                              onChange={() => {
                                if (section === "priceRange") {
                                  updatePriceRangeFilter(option.value);
                                } else {
                                  updateFilter(
                                    section,
                                    option.value,
                                    !option.checked
                                  );
                                }
                              }}
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <label
                              htmlFor={`filter-mobile-${section}-${optionIdx}`}
                              className="min-w-0 flex-1 text-gray-500"
                            >
                              {option.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </DisclosurePanel>
                  </Disclosure>
                ))}

                <Disclosure
                  as="div"
                  className="border-t border-gray-200 px-4 py-6"
                >
                  <h3 className="-mx-2 -my-3 flow-root">
                    <DisclosureButton className="group flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                      <span className="font-medium text-gray-900">Rating</span>
                      <span className="ml-6 flex items-center">
                        <PlusIcon
                          aria-hidden="true"
                          className="size-5 group-data-open:hidden"
                        />
                        <MinusIcon
                          aria-hidden="true"
                          className="size-5 group-not-data-open:hidden"
                        />
                      </span>
                    </DisclosureButton>
                  </h3>
                  <DisclosurePanel className="pt-6">
                    <div className="space-y-4">
                      {[0, 1, 2, 3, 4, 5].map((rating) => (
                        <div key={rating} className="flex gap-3">
                          <input
                            id={`filter-mobile-rating-${rating}`}
                            name="rating"
                            type="radio"
                            checked={filters.rating === rating}
                            onChange={() => updateRatingFilter(rating)}
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                          <label
                            htmlFor={`filter-mobile-rating-${rating}`}
                            className="min-w-0 flex-1 text-gray-500"
                          >
                            {rating} Star{rating > 1 ? "s" : ""} & Up
                          </label>
                        </div>
                      ))}
                    </div>
                  </DisclosurePanel>
                </Disclosure>

                <Disclosure
                  as="div"
                  className="border-t border-gray-200 px-4 py-6"
                >
                  <h3 className="-mx-2 -my-3 flow-root">
                    <DisclosureButton className="group flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                      <span className="font-medium text-gray-900">
                        Location
                      </span>
                      <span className="ml-6 flex items-center">
                        <PlusIcon
                          aria-hidden="true"
                          className="size-5 group-data-open:hidden"
                        />
                        <MinusIcon
                          aria-hidden="true"
                          className="size-5 group-not-data-open:hidden"
                        />
                      </span>
                    </DisclosureButton>
                  </h3>
                  <DisclosurePanel className="pt-6">
                    <div className="space-y-4">
                      <div className="flex flex-col gap-2">
                        <label htmlFor="lat" className="text-sm text-gray-600">
                          Latitude
                        </label>
                        <input
                          id="lat"
                          type="text"
                          value={filters.location.lat}
                          onChange={(e) =>
                            updateLocationFilter(
                              e.target.value,
                              filters.location.lng
                            )
                          }
                          className="border rounded-md p-2 text-sm"
                          placeholder="Enter latitude"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label htmlFor="lng" className="text-sm text-gray-600">
                          Longitude
                        </label>
                        <input
                          id="lng"
                          type="text"
                          value={filters.location.lng}
                          onChange={(e) =>
                            updateLocationFilter(
                              filters.location.lat,
                              e.target.value
                            )
                          }
                          className="border rounded-md p-2 text-sm"
                          placeholder="Enter longitude"
                        />
                      </div>
                    </div>
                  </DisclosurePanel>
                </Disclosure>

                <Disclosure
                  as="div"
                  className="border-t border-gray-200 px-4 py-6"
                >
                  <div className="flex gap-3">
                    <input
                      id="filter-mobile-availability"
                      name="availability"
                      type="checkbox"
                      checked={filters.availability}
                      onChange={(e) => {
                        setFilters((prev) => ({
                          ...prev,
                          availability: e.target.checked,
                        }));
                        setFilterVersion((prev) => prev + 1);
                      }}
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <label
                      htmlFor="filter-mobile-availability"
                      className="min-w-0 flex-1 text-gray-500"
                    >
                      Available Products Only
                    </label>
                  </div>
                </Disclosure>
              </form>
            </DialogPanel>
          </div>
        </Dialog>

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 pt-24 pb-6 sticky top-0 bg-white z-10">
            <div className="flex flex-col">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                All Products ({filteredProducts.length})
              </h1>
              {filteredProducts.length !== productsData.totalCount && (
                <p className="text-sm text-gray-500 mt-1">
                  Showing {filteredProducts.length} of {productsData.totalCount}{" "}
                  products
                </p>
              )}
            </div>
            <div className="flex items-center space-x-4">
              <Menu as="div" className="relative inline-block text-left">
                <MenuButton className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                  Sort: {selectedSort.name}
                  <ChevronDownIcon
                    aria-hidden="true"
                    className="-mr-1 ml-1 size-5 shrink-0 text-gray-400 group-hover:text-gray-500"
                  />
                </MenuButton>
                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                >
                  <div className="py-1">
                    {sortOptions.map((option) => (
                      <MenuItem key={option.name}>
                        <button
                          onClick={() => {
                            setSelectedSort(option);
                            setFilterVersion((prev) => prev + 1);
                          }}
                          className={classNames(
                            selectedSort.value === option.value
                              ? "font-medium text-gray-900 bg-gray-100"
                              : "text-gray-500 hover:bg-gray-50",
                            "block w-full px-4 py-2 text-left text-sm"
                          )}
                        >
                          {option.name}
                        </button>
                      </MenuItem>
                    ))}
                  </div>
                </MenuItems>
              </Menu>
              <button
                type="button"
                className="-m-2 p-2 text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">View grid</span>
                <Squares2X2Icon aria-hidden="true" className="size-5" />
              </button>
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(true)}
                className="-m-2 p-2 text-gray-400 hover:text-gray-500 lg:hidden"
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon aria-hidden="true" className="size-5" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pt-6 pb-24">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>
            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              {/* Filters */}
              <form className="hidden lg:block">
                <h3 className="sr-only">Sub Categories</h3>
                <ul
                  role="list"
                  className="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900"
                >
                  {subCategories.map((category) => (
                    <li key={category.name}>
                      <button
                        onClick={() => {
                          setSelectedSubCategory(category.name.toLowerCase());
                          setFilterVersion((prev) => prev + 1);
                        }}
                        className={classNames(
                          selectedSubCategory === category.name.toLowerCase()
                            ? "text-indigo-600 font-semibold"
                            : "text-gray-900 hover:text-indigo-500",
                          "flex items-center"
                        )}
                      >
                        {category.name}
                      </button>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={clearAllFilters}
                  className="mt-4 w-full rounded-md border border-indigo-600 px-4 py-2 text-sm font-medium text-indigo-600 hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  Clear All Filters
                </button>
                {[
                  "category",
                  "store",
                  "priceRange",
                  "tags",
                  "color",
                  "size",
                ].map((section) => (
                  <Disclosure
                    key={section}
                    as="div"
                    className="border-b border-gray-200 py-6"
                  >
                    <h3 className="-my-3 flow-root">
                      <DisclosureButton className="group flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                        <span className="font-medium text-gray-900">
                          {section.charAt(0).toUpperCase() + section.slice(1)} (
                          {section === "priceRange"
                            ? filters[section].filter((opt) => opt.checked)
                                .length
                            : filters[section].filter((opt) => opt.checked)
                                .length}
                          )
                        </span>
                        <span className="ml-6 flex items-center">
                          <PlusIcon
                            aria-hidden="true"
                            className="size-5 group-data-open:hidden"
                          />
                          <MinusIcon
                            aria-hidden="true"
                            className="size-5 group-not-data-open:hidden"
                          />
                        </span>
                      </DisclosureButton>
                    </h3>
                    <DisclosurePanel className="pt-6">
                      <div className="space-y-4">
                        {filters[section].map((option, optionIdx) => (
                          <div key={option.value} className="flex gap-3">
                            <input
                              id={`filter-${section}-${optionIdx}`}
                              name={`${section}[]`}
                              type={
                                section === "priceRange" ? "radio" : "checkbox"
                              }
                              checked={option.checked}
                              onChange={() => {
                                if (section === "priceRange") {
                                  updatePriceRangeFilter(option.value);
                                } else {
                                  updateFilter(
                                    section,
                                    option.value,
                                    !option.checked
                                  );
                                }
                              }}
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <label
                              htmlFor={`filter-${section}-${optionIdx}`}
                              className="text-sm text-gray-600"
                            >
                              {option.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </DisclosurePanel>
                  </Disclosure>
                ))}
                <Disclosure as="div" className="border-b border-gray-200 py-6">
                  <h3 className="-my-3 flow-root">
                    <DisclosureButton className="group flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                      <span className="font-medium text-gray-900">Rating</span>
                      <span className="ml-6 flex items-center">
                        <PlusIcon
                          aria-hidden="true"
                          className="size-5 group-data-open:hidden"
                        />
                        <MinusIcon
                          aria-hidden="true"
                          className="size-5 group-not-data-open:hidden"
                        />
                      </span>
                    </DisclosureButton>
                  </h3>
                  <DisclosurePanel className="pt-6">
                    <div className="space-y-4">
                      {[0, 1, 2, 3, 4, 5].map((rating) => (
                        <div key={rating} className="flex gap-3">
                          <input
                            id={`filter-rating-${rating}`}
                            name="rating"
                            type="radio"
                            checked={filters.rating === rating}
                            onChange={() => updateRatingFilter(rating)}
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                          <label
                            htmlFor={`filter-rating-${rating}`}
                            className="text-sm text-gray-600"
                          >
                            {rating} Star{rating > 1 ? "s" : ""} & Up
                          </label>
                        </div>
                      ))}
                    </div>
                  </DisclosurePanel>
                </Disclosure>
                <Disclosure as="div" className="border-b border-gray-200 py-6">
                  <h3 className="-my-3 flow-root">
                    <DisclosureButton className="group flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                      <span className="font-medium text-gray-900">
                        Location
                      </span>
                      <span className="ml-6 flex items-center">
                        <PlusIcon
                          aria-hidden="true"
                          className="size-5 group-data-open:hidden"
                        />
                        <MinusIcon
                          aria-hidden="true"
                          className="size-5 group-not-data-open:hidden"
                        />
                      </span>
                    </DisclosureButton>
                  </h3>
                  <DisclosurePanel className="pt-6">
                    <div className="space-y-4">
                      <div className="flex flex-col gap-2">
                        <label
                          htmlFor="lat-desktop"
                          className="text-sm text-gray-600"
                        >
                          Latitude
                        </label>
                        <input
                          id="lat-desktop"
                          type="text"
                          value={filters.location.lat}
                          onChange={(e) =>
                            updateLocationFilter(
                              e.target.value,
                              filters.location.lng
                            )
                          }
                          className="border rounded-md p-2 text-sm"
                          placeholder="Enter latitude"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label
                          htmlFor="lng-desktop"
                          className="text-sm text-gray-600"
                        >
                          Longitude
                        </label>
                        <input
                          id="lng-desktop"
                          type="text"
                          value={filters.location.lng}
                          onChange={(e) =>
                            updateLocationFilter(
                              filters.location.lat,
                              e.target.value
                            )
                          }
                          className="border rounded-md p-2 text-sm"
                          placeholder="Enter longitude"
                        />
                      </div>
                    </div>
                  </DisclosurePanel>
                </Disclosure>
                <Disclosure as="div" className="border-b border-gray-200 py-6">
                  <div className="flex gap-3">
                    <input
                      id="filter-availability"
                      name="availability"
                      type="checkbox"
                      checked={filters.availability}
                      onChange={(e) => {
                        setFilters((prev) => ({
                          ...prev,
                          availability: e.target.checked,
                        }));
                        setFilterVersion((prev) => prev + 1);
                      }}
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <label
                      htmlFor="filter-availability"
                      className="text-sm text-gray-600"
                    >
                      Available Products Only
                    </label>
                  </div>
                </Disclosure>
              </form>

              {/* Product grid */}
              <div className="lg:col-span-3">
                {loading ? (
                  <p className="text-gray-500 text-center py-10">
                    Loading products...
                  </p>
                ) : error ? (
                  <p className="text-red-500 text-center py-10">{error}</p>
                ) : (
                  <AllProducts products={filteredProducts} />
                )}
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
