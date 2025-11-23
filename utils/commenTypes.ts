import { CategoryLevelType, CatrgroryStatus, Operation } from "./enum.types";

export interface AutoCompleteOption {
  label: string;
  value: string;
}

export interface CategoryTypes {
  _id?: string;
  name: string;
  description: string;
  parentCatId: string | null;
  level: CategoryLevelType;
  status?: CatrgroryStatus;
  createdAt?: string;
  updatedAt?: string;
}

export enum productType {
  SALE = "sale",
  RENTAL = "rental",
  RESALE = "resale",
}

export interface ProductInputType {
  name: string;
  description?: string;
  storeId: string;
  ownerId: string;
  categoryId: string;
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
  tags?: string[];
  color?: string;
  size?: string;
  latitude: number;
  longitude: number;
  avilablity?: boolean;
}

export interface msgType {
  message: string;
  flag: boolean;
  operation: Operation;
}

