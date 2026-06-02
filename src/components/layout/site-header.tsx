import { AnnouncementBar } from "./announcement-bar";
import { Navbar } from "./navbar";

/** Announcement bar + Navbar stuck together at the top of the viewport. */
export function SiteHeader() {
  return (
    <div className="sticky top-0 z-50">
      <AnnouncementBar />
      <Navbar />
    </div>
  );
}
