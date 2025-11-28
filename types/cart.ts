// export interface CartItem {
//   _id: string;
//   name: string;
//   saleTerms?: { salePrice: number; stock: number };
//   rentalTerms?: { pricePerUnit: number; minduration: string }[];
//   type: string;
//   image: { url: string }[];
//   quantity: number;
//   storeId: { _id: string; name: string; address: string };
//   ownerId: { _id: string; name: string };
// }

export interface CartItem {
  _id: any;
  vendorId: string;
  productId: string;
  storeId: string;
  quantity: number;

  // product pricing
  isRental: boolean;
  salePrice: number;
  rentalPricePerUnit: number;

  // selected variant fields
  selectedColor?: string;
  selectedSize?: string;
  selectedWeight?: string;

  // rental dates
  rentalStartDate?: string | Date;
  rentalEndDate?: string | Date;
}

export interface CartState {
  items: CartItem[];
}

// Define the type for the 'attributes' map
type VariantAttributes = {
  [key: string]: string; // Keys are strings (e.g., 'color', 'size'), values are strings
};

// Define the main interface for a Variant document
export interface CartVariantType {
  // Fields defined directly in the schema
  sku: string; // { type: String, required: true }
  price: number; // { type: Number, required: true }
  stock: number; // { type: Number, default: 0 }

  // Custom Map field
  attributes: VariantAttributes; // { type: Map, of: String, default: {} }
  images: string[]; // [String]
  _id?: string;
  id?: string; // Mongoose virtual getter
}

// Define the inner structure of the Product, Vendor, and Store IDs
// (assuming only the relevant fields are needed for type definition)
interface IMinimalReference {
  _id: string;
  name?: string;
}

interface IProductDetails extends IMinimalReference {
  saleTerms: {
    mrpPrice: number;
    salePrice: number;
  };
  rentalTerms: any[]; // Assuming it's an array of unknown rental terms
  storeId: IMinimalReference & { address: string };
  ownerId: IMinimalReference & { email: string; phoneNumber: string };
  categoryId: IMinimalReference;
}

interface ICustomVariant {
  color: string;
  size: string;
  weight: string;
  material: string;
}

// 1. The main Cart Item structure (the type for a single element in the 'items' array)
export interface ICartItem {
  _id: string;
  productId: IProductDetails;
  storeId: IMinimalReference & { address: string };
  vendorId: IMinimalReference & { email: string; phoneNumber: string };

  quantity: number;
  salePrice: number;
  isRental: boolean;

  // Specific selected attributes
  selectedColor?: string;
  selectedSize?: string;
  selectedWeight?: string;
  customVariant: ICustomVariant;
}

// 2. The type for the Cart's 'items' array
export type ICartItemsArray = ICartItem[];

// 3. The function signature for setCartItems (using React's Dispatch type)
// This is the most accurate type for the setter function itself.
export type SetCartItemsType = React.Dispatch<
  React.SetStateAction<ICartItemsArray>
>;
