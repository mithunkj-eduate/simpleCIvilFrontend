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

import { productType } from "./commenTypes";

export interface SaleTerms {
  mrpPrice: number;
  salePrice: number;
  stock: number;
}

export interface RentalTerm {
  unit: number;
  pricePerUnit: number;
  minduration: string;
}

export interface VariantType {
  sku: string;
  price: number;
  stock?: number;
  attributes?: {
    color?: string;
    size?: string;
    weight?: string;
    material?: string;
    [key: string]: string | undefined; // for any other variant-specific attributes
  };
  images?: string[];
}


export interface ProductInputType {
  name: string;
  description: string;
  storeId: string;
  ownerId: string;
  groupId?: string;
  categoryId?: string;
  subsidiaryId?: string;
  latitude?: number;
  longitude?: number;
  avilablity?: boolean;
  type: productType;
  color?: string;
  size?: string;
  tags?: string[];
  saleTerms?: {
    mrpPrice?: number;
    salePrice?: number;
    stock?: number;
  };
  rentalTerms?: {
    unit: number;
    pricePerUnit: number;
    minduration: string;
  }[];
  variants?: VariantType[];
}


export interface msgType {
  message: string;
  flag: boolean;
  operation: Operation;
}
