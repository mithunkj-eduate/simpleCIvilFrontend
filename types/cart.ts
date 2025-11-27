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
