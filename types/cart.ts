export interface CartItem {
  _id: string;
  name: string;
  saleTerms?: { salePrice: number; stock: number };
  rentalTerms?: { pricePerUnit: number; minduration: string }[];
  type: string;
  image: { url: string }[];
  quantity: number;
  storeId: { _id: string; name: string; address: string };
  ownerId: { _id: string; name: string };
}
