"use client";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const revenueData = [
  { month: "Jan", revenue: 182000 },
  { month: "Feb", revenue: 214000 },
  { month: "Mar", revenue: 198000 },
  { month: "Apr", revenue: 256000 },
  { month: "May", revenue: 312000 },
  { month: "Jun", revenue: 348000 },
];

const topProducts = [
  { name: "Glow Serum", sales: 1284 },
  { name: "SPF 50", sales: 1103 },
  { name: "Velvet Lip", sales: 989 },
  { name: "Rose EDP", sales: 845 },
  { name: "Argan Oil", sales: 712 },
];

const statusData = [
  { name: "Delivered", value: 540, color: "#10b981" },
  { name: "Shipped", value: 220, color: "#B76E79" },
  { name: "Processing", value: 130, color: "#C9A227" },
  { name: "Pending", value: 60, color: "#FADADD" },
];

function Panel({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-border bg-white p-5 shadow-soft">
      <h3 className="mb-4 font-serif text-lg font-semibold">{title}</h3>
      {children}
    </div>
  );
}

export function AdminCharts() {
  return (
    <div className="grid gap-5 lg:grid-cols-2">
      <div className="lg:col-span-2">
        <Panel title="Revenue (last 6 months)">
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#B76E79" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="#B76E79" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" tickLine={false} axisLine={false} fontSize={12} />
              <YAxis
                tickLine={false}
                axisLine={false}
                fontSize={12}
                tickFormatter={(v) => `₹${v / 1000}k`}
              />
              <Tooltip
                formatter={(v: number) => [`₹${v.toLocaleString()}`, "Revenue"]}
                contentStyle={{ borderRadius: 12, border: "1px solid #eee" }}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#B76E79"
                strokeWidth={2.5}
                fill="url(#rev)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </Panel>
      </div>

      <Panel title="Top products">
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={topProducts} layout="vertical" margin={{ left: 20 }}>
            <XAxis type="number" hide />
            <YAxis
              type="category"
              dataKey="name"
              tickLine={false}
              axisLine={false}
              fontSize={12}
              width={80}
            />
            <Tooltip
              cursor={{ fill: "#F8F5F2" }}
              contentStyle={{ borderRadius: 12, border: "1px solid #eee" }}
            />
            <Bar dataKey="sales" fill="#B76E79" radius={[0, 8, 8, 0]} barSize={18} />
          </BarChart>
        </ResponsiveContainer>
      </Panel>

      <Panel title="Orders by status">
        <ResponsiveContainer width="100%" height={240}>
          <PieChart>
            <Pie
              data={statusData}
              dataKey="value"
              nameKey="name"
              innerRadius={55}
              outerRadius={90}
              paddingAngle={3}
            >
              {statusData.map((entry) => (
                <Cell key={entry.name} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #eee" }} />
          </PieChart>
        </ResponsiveContainer>
        <div className="mt-2 flex flex-wrap justify-center gap-3">
          {statusData.map((s) => (
            <span key={s.name} className="flex items-center gap-1.5 text-xs">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: s.color }}
              />
              {s.name}
            </span>
          ))}
        </div>
      </Panel>
    </div>
  );
}
