import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { ExternalLink } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const navigate = useNavigate();
  const [showNewOrderDialog, setShowNewOrderDialog] = useState(false);

  return (
    <header className="h-14 border-b border-border bg-background/95 backdrop-blur-sm fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto h-full flex items-center justify-between px-4">
        <div className="flex items-center space-x-4">
          <Link to="/" className="flex items-center space-x-2">
            <h1 className="font-display font-black text-xl tracking-tight">
              МебельCRM
            </h1>
          </Link>
          <a 
            href={window.location.href} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground"
          >
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
        
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-foreground font-display font-medium hover:text-primary text-sm">
            Панель
          </Link>
          <Link to="/zakazi" className="text-muted-foreground font-display font-medium hover:text-foreground text-sm">
            Заказы
          </Link>
          <Link to="/zadachi" className="text-muted-foreground font-display font-medium hover:text-foreground text-sm">
            Задачи
          </Link>
          <Link to="/workers" className="text-muted-foreground font-display font-medium hover:text-foreground text-sm">
            Сотрудники
          </Link>
          <Link to="/analitika" className="text-muted-foreground font-display font-medium hover:text-foreground text-sm">
            Аналитика
          </Link>
        </nav>

        <div className="flex items-center space-x-3">
          <Link to="/profile">
            <Button variant="ghost" size="sm" className="font-display font-medium text-sm h-8">
              Профиль
            </Button>
          </Link>
          <Button 
            size="sm" 
            className="h-8 text-sm"
            onClick={() => setShowNewOrderDialog(true)}
          >
            Новый заказ
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;