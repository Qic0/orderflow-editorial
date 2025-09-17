import { Badge } from "@/components/ui/badge";
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

const KanbanColumn = ({ column, orders, onMoveOrder }: KanbanColumnProps) => {
  return (
    <div className="kanban-column">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-display font-bold text-lg tracking-tight mb-2">
            {column.title}
          </h3>
          <Badge variant="secondary" className={`${getColumnStatusColor(column.id)} font-display font-bold`}>
            {column.count} {column.count === 1 ? 'order' : 'orders'}
          </Badge>
        </div>
      </div>

      <div className="space-y-3">
        {orders.map(order => (
          <OrderCard
            key={order.id}
            order={order}
            columnId={column.id}
            onMoveOrder={onMoveOrder}
          />
        ))}
        
        {orders.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <p className="font-body text-base">No orders in this column</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default KanbanColumn;