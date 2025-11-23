import { productType } from "@/utils/commenTypes";

export interface User {
  id: string;
  name: string;
  role: string;
  email: string;
  phoneNumber: string;
  permission: string;
  authMethod: string;
  status: string;
  createdAt: string;
  lastLoggedIn: string;
}

export interface Products {
  _id?: string;
  id: string;
  name: string;
  description: string;
  mrpPrice: number;
  salePrice: number;
  group: string;
  category: string;
  subsidiary: string;
  stock: number;
  createdAt: string;
  updatedAt: string;
}

export interface GetProductData {
  _id?: string;
  id: string;
  name: string;
  description: string;
  price: number;
  groupId: {
    _id: string;
    name: string;
  };
  categoryId: {
    _id: string;
    name: string;
  };
  subsidiaryId: {
    _id: string;
    name: string;
  };
  storeId: {
    _id: string;
    name: string;
  };
  ownerId: {
    _id: string;
    name: string;
  };
  rentalTerms?: {
    unit?: number;
    pricePerUnit?: number;
    minduration?: string;
  }[];
  saleTerms?: {
    mrpPrice?: number;
    salePrice?: number;
    stock?: number;
  };
  type?: productType;
  image?: {
    type?: string;
    url: string;
  }[];
  location: {
    coordinates: [number, number]; // [longitude, latitude]
  };
  avilablity?: boolean;
  rating?: number;
  createdAt: string;
  updatedAt: string;
}

export interface Stores {
  id: string;
  name: string;
  ownerId: string;
  address: string;
  location: number[];
  pincode: number;
  createdAt: string;
  updatedAt: string;
}

export interface GetStores {
  _id: string;
  name: string;
  ownerId: string;
  address: string;
  location: number[];
  pincode: number;
  createdAt: string;
  updatedAt: string;
}
