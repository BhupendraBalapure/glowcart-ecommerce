"use client";

import { useState } from "react";
import { Search } from "lucide-react";

import { formatDate, formatPrice, initials } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AdminPageHeader } from "@/components/admin/admin-page-header";

interface Customer {
  name: string;
  email: string;
  joined: string;
  orders: number;
  spent: number;
  tier: "Bronze" | "Silver" | "Gold";
}

const customers: Customer[] = [
  { name: "Ananya Rao", email: "ananya@example.com", joined: "2025-11-02", orders: 12, spent: 28400, tier: "Gold" },
  { name: "Priya Kapoor", email: "priya@example.com", joined: "2025-12-18", orders: 7, spent: 14200, tier: "Silver" },
  { name: "Sara Mathew", email: "sara@example.com", joined: "2026-01-09", orders: 5, spent: 9800, tier: "Silver" },
  { name: "Megha Sharma", email: "megha@example.com", joined: "2026-02-21", orders: 3, spent: 6100, tier: "Bronze" },
  { name: "Ishita Das", email: "ishita@example.com", joined: "2026-03-14", orders: 2, spent: 4300, tier: "Bronze" },
  { name: "Tanvi Arora", email: "tanvi@example.com", joined: "2026-04-01", orders: 9, spent: 19900, tier: "Gold" },
];

const tierVariant = {
  Gold: "gold",
  Silver: "secondary",
  Bronze: "soft",
} as const;

export default function AdminCustomersPage() {
  const [query, setQuery] = useState("");
  const filtered = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(query.toLowerCase()) ||
      c.email.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <AdminPageHeader title="Customers" description={`${customers.length} registered customers`} />

      <div className="rounded-2xl border border-border bg-white shadow-soft">
        <div className="border-b border-border p-4">
          <div className="relative max-w-xs">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search customers…"
              className="pl-9"
            />
          </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>Joined</TableHead>
              <TableHead>Orders</TableHead>
              <TableHead>Total spent</TableHead>
              <TableHead>Tier</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((c) => (
              <TableRow key={c.email}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9">
                      <AvatarFallback>{initials(c.name)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{c.name}</p>
                      <p className="text-xs text-muted-foreground">{c.email}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">{formatDate(c.joined)}</TableCell>
                <TableCell>{c.orders}</TableCell>
                <TableCell className="font-semibold">{formatPrice(c.spent)}</TableCell>
                <TableCell>
                  <Badge variant={tierVariant[c.tier]}>{c.tier}</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
