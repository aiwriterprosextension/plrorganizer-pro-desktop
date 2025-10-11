import { Link } from "react-router-dom";
import logo from "@/assets/logo.webp";
import { Button } from "@/components/ui/button";

export default function BlogHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <img src={logo} alt="PLR Organizer Pro" className="h-10" />
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/blog" className="text-sm font-medium">
              Blog
            </Link>
            <Link to="/tools" className="text-sm font-medium">
              Tools
            </Link>
            <Link to="/resources" className="text-sm font-medium">
              Resources
            </Link>
            <Link to="/auth">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
