import { Leaf, RotateCcw, ShieldCheck, Truck } from "lucide-react";

const items = [
  { Icon: Truck, title: "Free shipping", desc: "On all orders over ₹999" },
  { Icon: Leaf, title: "Clean beauty", desc: "Cruelty-free & vegan options" },
  { Icon: RotateCcw, title: "Easy returns", desc: "15-day hassle-free returns" },
  { Icon: ShieldCheck, title: "Secure checkout", desc: "100% protected payments" },
];

export function ValueProps() {
  return (
    <section className="border-y border-border bg-white">
      <div className="container grid grid-cols-2 gap-6 py-8 lg:grid-cols-4">
        {items.map(({ Icon, title, desc }) => (
          <div key={title} className="flex items-center gap-3">
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-secondary text-rosegold-dark">
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold">{title}</p>
              <p className="text-xs text-muted-foreground">{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
