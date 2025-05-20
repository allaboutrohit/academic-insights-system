
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { BarChart, FileText, FilePlus, Award } from "lucide-react";

const navItems = [
  { label: "Dashboard", path: "/dashboard", icon: "home" },
  { label: "Students", path: "/students", icon: "users" },
  { label: "Assignments", path: "/assignments", icon: "file-plus" },
  { label: "Exams", path: "/exams", icon: "file-text" },
  { label: "Analysis", path: "/analysis", icon: "bar-chart" },
];

export function Sidebar() {
  const location = useLocation();
  
  const getIcon = (icon: string) => {
    switch (icon) {
      case "home":
        return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>;
      case "users":
        return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
      case "file-plus":
        return <FilePlus className="h-5 w-5" />;
      case "file-text":
        return <FileText className="h-5 w-5" />;  
      case "bar-chart":
        return <BarChart className="h-5 w-5" />;
      default:
        return null;
    }
  };
  
  return (
    <aside className="h-[calc(100vh-4rem)] w-16 md:w-60 hidden md:block border-r border-gray-200 sticky top-16">
      <nav className="flex flex-col gap-2 p-2">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors hover:bg-muted hover:text-foreground",
              location.pathname === item.path
                ? "bg-muted text-foreground font-medium"
                : "text-muted-foreground"
            )}
          >
            {getIcon(item.icon)}
            <span className="hidden md:inline-block">{item.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
