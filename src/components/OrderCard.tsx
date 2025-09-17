import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Order, ColumnType } from "./KanbanBoard";
import { Calendar, DollarSign, User } from "lucide-react";
import { useState } from "react";
import OrderDetailsSheet from "./OrderDetailsSheet";

interface OrderCardProps {
  order: Order;
  columnId: ColumnType;
  onMoveOrder: (orderId: string, fromColumn: ColumnType, toColumn: ColumnType) => void;
  onDragStart?: (orderId: string) => void;
  onDragEnd?: () => void;
  isDragging?: boolean;
}

const getPriorityColor = (priority: Order['priority']) => {
  const colors = {
    low: 'bg-muted text-muted-foreground',
    medium: 'bg-warning/10 text-warning-foreground',
    high: 'bg-destructive/10 text-destructive'
  };
  return colors[priority];
};

const getPriorityText = (priority: Order['priority']) => {
  const texts = {
    low: 'Низкий',
    medium: 'Средний',
    high: 'Высокий'
  };
  return texts[priority];
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

const formatDate = (dateString: string) => {
  return new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'short'
  }).format(new Date(dateString));
};

const OrderCard = ({ 
  order, 
  columnId, 
  onMoveOrder, 
  onDragStart, 
  onDragEnd, 
  isDragging 
}: OrderCardProps) => {
  const [showDetails, setShowDetails] = useState(false);

  const handleDoubleClick = () => {
    const columns: ColumnType[] = ['new', 'progress', 'review', 'done'];
    const currentIndex = columns.indexOf(columnId);
    const nextIndex = (currentIndex + 1) % columns.length;
    const nextColumn = columns[nextIndex];
    
    onMoveOrder(order.id, columnId, nextColumn);
  };

  const handleClick = () => {
    setShowDetails(true);
  };

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('text/plain', order.id);
    e.dataTransfer.setData('application/column', columnId);
    onDragStart?.(order.id);
  };

  const handleDragEnd = () => {
    onDragEnd?.();
  };

  return (
    <>
      <Card 
        className={`kanban-card group cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
          isDragging ? 'opacity-50 scale-95 rotate-3 shadow-2xl' : 'hover:shadow-lg'
        }`}
        onDoubleClick={handleDoubleClick}
        onClick={handleClick}
        draggable
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="space-y-3">
          <div className="flex items-start justify-between">
            <h4 className="font-display font-bold text-base tracking-tight leading-tight">
              {order.title}
            </h4>
            <Badge 
              variant="secondary" 
              className={`${getPriorityColor(order.priority)} text-xs font-display font-bold`}
            >
              {getPriorityText(order.priority)}
            </Badge>
          </div>

          <p className="text-muted-foreground font-body text-sm leading-relaxed">
            {order.client}
          </p>

          {order.description && (
            <p className="text-muted-foreground font-body text-sm leading-relaxed line-clamp-2">
              {order.description}
            </p>
          )}

          <div className="flex items-center justify-between pt-2 border-t border-card-border">
            <div className="flex items-center space-x-4 text-xs text-muted-foreground">
              <div className="flex items-center space-x-1">
                <DollarSign className="w-3 h-3" />
                <span className="font-display font-bold">
                  {formatCurrency(order.value)}
                </span>
              </div>
              
              <div className="flex items-center space-x-1">
                <Calendar className="w-3 h-3" />
                <span className="font-body">
                  {formatDate(order.dueDate)}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2 pt-1">
            <User className="w-3 h-3 text-muted-foreground" />
            <span className="text-xs font-body text-muted-foreground">
              {order.assignee}
            </span>
          </div>

          <div className="opacity-0 group-hover:opacity-100 transition-opacity text-xs text-muted-foreground font-body italic">
            Кликните для деталей • Двойной клик для перемещения
          </div>
        </div>
      </Card>

      <OrderDetailsSheet 
        order={order}
        isOpen={showDetails}
        onClose={() => setShowDetails(false)}
      />
    </>
  );
};

export default OrderCard;