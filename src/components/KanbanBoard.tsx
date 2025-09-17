import { useState } from "react";
import KanbanColumn from "./KanbanColumn";

export interface Order {
  id: string;
  title: string;
  client: string;
  value: number;
  priority: 'low' | 'medium' | 'high';
  assignee: string;
  dueDate: string;
  description?: string;
}

export type ColumnType = 'new' | 'progress' | 'review' | 'done';

const KanbanBoard = () => {
  const [orders, setOrders] = useState<Record<ColumnType, Order[]>>({
    new: [
      {
        id: '1',
        title: 'Website Redesign',
        client: 'Tech Corp',
        value: 15000,
        priority: 'high',
        assignee: 'Anna Koroleva',
        dueDate: '2024-01-15',
        description: 'Complete redesign of corporate website with modern UX'
      },
      {
        id: '2',
        title: 'Brand Identity Package',
        client: 'StartUp Inc',
        value: 8500,
        priority: 'medium',
        assignee: 'Dmitry Petrov',
        dueDate: '2024-01-20'
      }
    ],
    progress: [
      {
        id: '3',
        title: 'Mobile App Development',
        client: 'Health Plus',
        value: 45000,
        priority: 'high',
        assignee: 'Maria Ivanova',
        dueDate: '2024-02-01',
        description: 'iOS and Android app for healthcare management'
      }
    ],
    review: [
      {
        id: '4',
        title: 'E-commerce Platform',
        client: 'Fashion Store',
        value: 25000,
        priority: 'medium',
        assignee: 'Alex Volkov',
        dueDate: '2024-01-25'
      }
    ],
    done: [
      {
        id: '5',
        title: 'Logo Design',
        client: 'Creative Agency',
        value: 3500,
        priority: 'low',
        assignee: 'Elena Popova',
        dueDate: '2024-01-10'
      }
    ]
  });

  const columns = [
    { id: 'new' as ColumnType, title: 'New Orders', count: orders.new.length },
    { id: 'progress' as ColumnType, title: 'In Progress', count: orders.progress.length },
    { id: 'review' as ColumnType, title: 'Review', count: orders.review.length },
    { id: 'done' as ColumnType, title: 'Completed', count: orders.done.length }
  ];

  const moveOrder = (orderId: string, fromColumn: ColumnType, toColumn: ColumnType) => {
    setOrders(prev => {
      const orderToMove = prev[fromColumn].find(order => order.id === orderId);
      if (!orderToMove) return prev;

      return {
        ...prev,
        [fromColumn]: prev[fromColumn].filter(order => order.id !== orderId),
        [toColumn]: [...prev[toColumn], orderToMove]
      };
    });
  };

  return (
    <div className="purposeful-space">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 text-center editorial-spacing">
          <h1 className="font-display font-black tracking-tight mb-4">
            Orders Dashboard
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Manage your team's orders with our editorial-first approach to project management. 
            Drag and drop to update status seamlessly.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {columns.map(column => (
            <KanbanColumn
              key={column.id}
              column={column}
              orders={orders[column.id]}
              onMoveOrder={moveOrder}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default KanbanBoard;