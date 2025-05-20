
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export function Header() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
      <div className="container flex items-center justify-between h-16 px-4 md:px-6 gap-4">
        <div className="flex items-center gap-2">
          <a href="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold text-primary">EduTrack</span>
          </a>
        </div>
        <div className="flex-1 max-w-md hidden md:flex">
          <div className="relative w-full">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="pl-8 w-full bg-gray-50"
            />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm">
            Help
          </Button>
          <Button variant="ghost" size="icon">
            <span className="sr-only">Notifications</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
            >
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
          </Button>
          <span className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-medium">
            AD
          </span>
        </div>
      </div>
    </header>
  );
}
