import { Navbar } from "./navbar";

/** Sticky site header (navbar pinned to the top of the viewport). */
export function SiteHeader() {
  return (
    <div className="sticky top-0 z-50">
      <Navbar />
    </div>
  );
}
