import { products } from "./products";

export type OrderStatus =
  | "PENDING"
  | "PAID"
  | "PROCESSING"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED";

export interface MockOrderItem {
  name: string;
  image: string;
  price: number;
  quantity: number;
}

export interface MockOrder {
  orderNumber: string;
  date: string;
  status: OrderStatus;
  total: number;
  items: MockOrderItem[];
}

const p = (i: number) => products[i];

export const mockOrders: MockOrder[] = [
  {
    orderNumber: "GC481204",
    date: "2026-05-22",
    status: "SHIPPED",
    total: 3997,
    items: [
      { name: p(0).name, image: p(0).images[0], price: p(0).price, quantity: 1 },
      { name: p(2).name, image: p(2).images[0], price: p(2).price, quantity: 1 },
      { name: p(8).name, image: p(8).images[0], price: p(8).price, quantity: 1 },
    ],
  },
  {
    orderNumber: "GC479018",
    date: "2026-04-30",
    status: "DELIVERED",
    total: 2598,
    items: [
      { name: p(4).name, image: p(4).images[0], price: p(4).price, quantity: 1 },
      { name: p(13).name, image: p(13).images[0], price: p(13).price, quantity: 1 },
    ],
  },
  {
    orderNumber: "GC476655",
    date: "2026-06-01",
    status: "PROCESSING",
    total: 3499,
    items: [
      { name: p(10).name, image: p(10).images[0], price: p(10).price, quantity: 1 },
    ],
  },
];

export interface MockAddress {
  id: string;
  fullName: string;
  phone: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postalCode: string;
  isDefault: boolean;
}

export const mockAddresses: MockAddress[] = [
  {
    id: "addr-1",
    fullName: "Ananya Rao",
    phone: "+91 98765 43210",
    line1: "402, Rose Residency",
    line2: "Bandra West",
    city: "Mumbai",
    state: "Maharashtra",
    postalCode: "400050",
    isDefault: true,
  },
  {
    id: "addr-2",
    fullName: "Ananya Rao (Office)",
    phone: "+91 98765 43210",
    line1: "9th Floor, Glow Tower",
    line2: "Andheri East",
    city: "Mumbai",
    state: "Maharashtra",
    postalCode: "400069",
    isDefault: false,
  },
];

export const ORDER_TIMELINE: OrderStatus[] = [
  "PENDING",
  "PAID",
  "PROCESSING",
  "SHIPPED",
  "DELIVERED",
];
