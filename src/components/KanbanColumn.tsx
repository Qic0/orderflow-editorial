import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Edit2, Check, X } from "lucide-react";
import OrderCard from "./OrderCard";
import { Order, ColumnType } from "./KanbanBoard";

interface KanbanColumnProps {
  column: {
    id: ColumnType;
    title: string;
    count: number;
  };
  orders: Order[];
  onMoveOrder: (orderId: string, fromColumn: ColumnType, toColumn: ColumnType) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent, toColumn: ColumnType) => void;
  onUpdateColumnTitle: (columnId: ColumnType, newTitle: string) => void;
  draggedOrder: string | null;
  onDragStart: (orderId: string) => void;
  onDragEnd: () => void;
}

const getColumnStatusColor = (columnId: ColumnType) => {
  const colors = {
    new: 'bg-status-new/10 text-status-new border-status-new/20',
    progress: 'bg-status-progress/10 text-status-progress border-status-progress/20',
    review: 'bg-status-review/10 text-status-review border-status-review/20',
    done: 'bg-status-done/10 text-status-done border-status-done/20'
  };
  return colors[columnId];
};

const KanbanColumn = ({ 
  column, 
  orders, 
  onMoveOrder, 
  onDragOver, 
  onDrop, 
  onUpdateColumnTitle, 
  draggedOrder, 
  onDragStart, 
  onDragEnd 
}: KanbanColumnProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(column.title);

  const handleSave = () => {
    if (editTitle.trim()) {
      onUpdateColumnTitle(column.id, editTitle.trim());
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditTitle(column.title);
    setIsEditing(false);
  };

  const isDraggedOver = draggedOrder && orders.some(order => order.id === draggedOrder);

  return (
    <div 
      className={`kanban-column transition-all duration-300 ${
        isDraggedOver ? 'ring-2 ring-primary/20 bg-primary/5' : ''
      }`}
      onDragOver={onDragOver}
      onDrop={(e) => onDrop(e, column.id)}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex-1">
          {isEditing ? (
            <div className="flex items-center gap-2 mb-2">
              <Input
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="font-display font-bold text-lg"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSave();
                  if (e.key === 'Escape') handleCancel();
                }}
                autoFocus
              />
              <button 
                onClick={handleSave}
                className="p-1 text-green-600 hover:bg-green-100 rounded"
              >
                <Check size={16} />
              </button>
              <button 
                onClick={handleCancel}
                className="p-1 text-red-600 hover:bg-red-100 rounded"
              >
                <X size={16} />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 mb-2 group">
              <h3 className="font-display font-bold text-lg tracking-tight">
                {column.title}
              </h3>
              <button
                onClick={() => setIsEditing(true)}
                className="opacity-0 group-hover:opacity-100 p-1 text-muted-foreground hover:text-foreground transition-all"
              >
                <Edit2 size={14} />
              </button>
            </div>
          )}
          <Badge variant="secondary" className={`${getColumnStatusColor(column.id)} font-display font-bold`}>
            {column.count} {column.count === 1 ? 'заказ' : 'заказов'}
          </Badge>
        </div>
      </div>

      <div className="space-y-3 min-h-[200px]">
        {orders.map(order => (
          <OrderCard
            key={order.id}
            order={order}
            columnId={column.id}
            onMoveOrder={onMoveOrder}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            isDragging={draggedOrder === order.id}
          />
        ))}
        
        {orders.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <p className="font-body text-base">Нет заказов в этой колонке</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default KanbanColumn;