"use client";

import { useState } from "react";
import { toast } from "sonner";

import { formatDate, formatPrice } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { OrderStatusBadge } from "@/components/account/order-status-badge";
import type { OrderStatus } from "@/data/mock-account";

interface AdminOrder {
  orderNumber: string;
  customer: string;
  date: string;
  items: number;
  total: number;
  status: OrderStatus;
}

const STATUSES: OrderStatus[] = [
  "PENDING",
  "PAID",
  "PROCESSING",
  "SHIPPED",
  "DELIVERED",
  "CANCELLED",
];

const seed: AdminOrder[] = [
  { orderNumber: "GC481204", customer: "Ananya Rao", date: "2026-05-22", items: 3, total: 3997, status: "SHIPPED" },
  { orderNumber: "GC481199", customer: "Priya Kapoor", date: "2026-05-22", items: 1, total: 1299, status: "PROCESSING" },
  { orderNumber: "GC481150", customer: "Sara Mathew", date: "2026-05-21", items: 2, total: 2598, status: "DELIVERED" },
  { orderNumber: "GC481102", customer: "Megha Sharma", date: "2026-05-20", items: 4, total: 5896, status: "PAID" },
  { orderNumber: "GC481044", customer: "Ishita Das", date: "2026-05-19", items: 1, total: 3499, status: "PENDING" },
  { orderNumber: "GC480991", customer: "Tanvi Arora", date: "2026-05-18", items: 2, total: 2098, status: "CANCELLED" },
];

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<AdminOrder[]>(seed);

  function setStatus(orderNumber: string, status: OrderStatus) {
    setOrders((l) => l.map((o) => (o.orderNumber === orderNumber ? { ...o, status } : o)));
    toast.success(`Order ${orderNumber} → ${status}`);
  }

  return (
    <div>
      <AdminPageHeader title="Orders" description={`${orders.length} recent orders`} />

      <div className="rounded-2xl border border-border bg-white shadow-soft">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Items</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Update</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((o) => (
              <TableRow key={o.orderNumber}>
                <TableCell className="font-medium">#{o.orderNumber}</TableCell>
                <TableCell>{o.customer}</TableCell>
                <TableCell className="text-muted-foreground">{formatDate(o.date)}</TableCell>
                <TableCell>{o.items}</TableCell>
                <TableCell className="font-semibold">{formatPrice(o.total)}</TableCell>
                <TableCell><OrderStatusBadge status={o.status} /></TableCell>
                <TableCell>
                  <Select value={o.status} onValueChange={(v) => setStatus(o.orderNumber, v as OrderStatus)}>
                    <SelectTrigger className="h-9 w-[150px]"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {STATUSES.map((s) => (
                        <SelectItem key={s} value={s} className="capitalize">
                          {s.toLowerCase()}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
