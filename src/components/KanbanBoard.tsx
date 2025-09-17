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
  createdDate: string;
  phone?: string;
  email?: string;
  company?: string;
  source?: string;
  comments?: string[];
}

export type ColumnType = 'new' | 'progress' | 'review' | 'done';

const KanbanBoard = () => {
  const [orders, setOrders] = useState<Record<ColumnType, Order[]>>({
    new: [
      {
        id: '1',
        title: 'Редизайн веб-сайта',
        client: 'ТехКорп',
        value: 450000,
        priority: 'high',
        assignee: 'Анна Королева',
        dueDate: '2024-01-15',
        description: 'Полный редизайн корпоративного сайта с современным UX',
        createdDate: '2024-01-01',
        phone: '+7 (495) 123-45-67',
        email: 'contact@techcorp.ru',
        company: 'ТехКорп ООО',
        source: 'Реклама в интернете',
        comments: ['Клиент хочет современный дизайн', 'Обсудили техническое задание']
      },
      {
        id: '2',
        title: 'Пакет фирменного стиля',
        client: 'СтартАп Инк',
        value: 255000,
        priority: 'medium',
        assignee: 'Дмитрий Петров',
        dueDate: '2024-01-20',
        createdDate: '2024-01-05',
        phone: '+7 (812) 987-65-43',
        email: 'info@startup.ru',
        company: 'СтартАп Инк',
        source: 'Рекомендация',
        comments: ['Нужен логотип и брендбук']
      }
    ],
    progress: [
      {
        id: '3',
        title: 'Разработка мобильного приложения',
        client: 'Здоровье Плюс',
        value: 1350000,
        priority: 'high',
        assignee: 'Мария Иванова',
        dueDate: '2024-02-01',
        description: 'iOS и Android приложение для управления здоровьем',
        createdDate: '2023-12-15',
        phone: '+7 (903) 111-22-33',
        email: 'dev@healthplus.ru',
        company: 'Здоровье Плюс ООО',
        source: 'Холодный звонок',
        comments: ['Проект в разработке', 'Первая версия готова к тестированию']
      }
    ],
    review: [
      {
        id: '4',
        title: 'E-commerce платформа',
        client: 'Фэшн Стор',
        value: 750000,
        priority: 'medium',
        assignee: 'Алекс Волков',
        dueDate: '2024-01-25',
        createdDate: '2023-12-20',
        phone: '+7 (495) 555-77-88',
        email: 'orders@fashionstore.ru',
        company: 'Фэшн Стор',
        source: 'Сайт компании',
        comments: ['На проверке у клиента', 'Ждем обратную связь']
      }
    ],
    done: [
      {
        id: '5',
        title: 'Дизайн логотипа',
        client: 'Креативное Агентство',
        value: 105000,
        priority: 'low',
        assignee: 'Елена Попова',
        dueDate: '2024-01-10',
        createdDate: '2023-12-25',
        phone: '+7 (499) 333-44-55',
        email: 'creative@agency.ru',
        company: 'Креативное Агентство ООО',
        source: 'Партнер',
        comments: ['Проект завершен успешно', 'Клиент доволен результатом']
      }
    ]
  });

  const columns = [
    { id: 'new' as ColumnType, title: 'Новые заказы', count: orders.new.length },
    { id: 'progress' as ColumnType, title: 'В работе', count: orders.progress.length },
    { id: 'review' as ColumnType, title: 'На проверке', count: orders.review.length },
    { id: 'done' as ColumnType, title: 'Выполнено', count: orders.done.length }
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

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, toColumn: ColumnType) => {
    e.preventDefault();
    const orderId = e.dataTransfer.getData('text/plain');
    const fromColumn = e.dataTransfer.getData('application/column') as ColumnType;
    
    if (fromColumn && fromColumn !== toColumn) {
      moveOrder(orderId, fromColumn, toColumn);
    }
  };

  return (
    <div className="purposeful-space">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 text-center editorial-spacing">
          <h1 className="font-display font-black tracking-tight mb-4">
            Панель управления заказами
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Управляйте заказами вашей команды с помощью современного подхода к управлению проектами. 
            Перетаскивайте карточки для изменения статуса.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {columns.map(column => (
            <KanbanColumn
              key={column.id}
              column={column}
              orders={orders[column.id]}
              onMoveOrder={moveOrder}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default KanbanBoard;