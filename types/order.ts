export enum OrderStatus {
  PENDING = "PENDING",
  CONFIRMED = "CONFIRMED",
  CANCELLED = "CANCELLED",
}

export enum PaymentMethod {
  CASH = "CASH",
  CARD = "CARD",
  ONLINE = "ONLINE",
}

export enum DeliveryStatus {
  PENDING = "PENDING",
  SHIPPED = "SHIPPED",
  DELIVERED = "DELIVERED",
  RETURNED = "RETURNED",
}

export enum OrderAcceptStatus {
  PENDING = "PENDING",
  ACCEPTED = "ACCEPTED",
  REACHED_STORE = "REACHED_STORE",
  PICKED = "PICKED",
  REACHED_DROP = "REACHED_DROP",
  DELIVERED = "DELIVERED",
  CANCELLED = "CANCELLED",
}

// --- OrderItem Schema Interface ---
export interface IOrderItem {
  productId: string; // ObjectId of Product

  // Variants
  selectedColor?: string;
  selectedSize?: string;
  selectedWeight?: string;
  customVariant?: Record<string, any>; // Complex variant details

  quantity: number;
  priceSnapshot: number; // The item's salePrice at the time of purchase
  attributesSnapshot: { [key: string]: string }; // Custom attributes snapshot
}

// --- Order Schema Interface ---
export interface IOrder {
  buyerId: string;
  venderId: string; // The seller ID
  storeId: string;

  items: IOrderItem[];

  // Delivery/Location
  deliveryAddress: string;
  location: [number, number];

  // Pricing
  receipt: {
    subtotal?: number;
    shipping?: number;
    discount?: number;
    tax?: number;
    total?: number;
  };

  // Statuses
  paymentMethod: PaymentMethod;
  orderStatus: OrderStatus;
  deliveryStatus: DeliveryStatus;

  // Optional dates
  deliveryDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}


export interface ResOrderType{
_id:string,
items:[]
}

export interface getOrdersType{
  OrderType:ResOrderType
}