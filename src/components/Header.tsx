import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="purposeful-space border-b border-border bg-background/95 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <h1 className="font-display font-black text-2xl tracking-tight">
            CRM
          </h1>
          <span className="text-muted-foreground text-sm font-display font-medium">
            Editorial Workspace
          </span>
        </div>
        
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#" className="text-foreground font-display font-medium micro-lift">
            Dashboard
          </a>
          <a href="#" className="text-muted-foreground font-display font-medium micro-lift hover:text-foreground">
            Analytics
          </a>
          <a href="#" className="text-muted-foreground font-display font-medium micro-lift hover:text-foreground">
            Team
          </a>
          <a href="#" className="text-muted-foreground font-display font-medium micro-lift hover:text-foreground">
            Settings
          </a>
        </nav>

        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" className="font-display font-bold">
            Profile
          </Button>
          <Button className="btn-primary">
            New Order
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;