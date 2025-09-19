import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import { ru } from "date-fns/locale";

interface Column {
  key: string;
  header: string;
  render?: (value: any, row: any) => React.ReactNode;
}

interface DataTableProps {
  title: string;
  data: any[];
  columns: Column[];
  loading?: boolean;
  emptyMessage?: string;
}

export const DataTable = ({ title, data, columns, loading, emptyMessage }: DataTableProps) => {
  const formatDate = (date: string) => {
    if (!date) return '—';
    return format(new Date(date), 'dd.MM.yyyy HH:mm', { locale: ru });
  };

  const getStatusBadge = (status: string, type?: 'order' | 'task') => {
    const variants: Record<string, string> = {
      // Order statuses
      'new': 'bg-status-new text-black',
      'in_progress': 'bg-status-progress text-white',
      'review': 'bg-status-review text-white',
      'completed': 'bg-status-done text-white',
      'cancelled': 'bg-destructive text-destructive-foreground',
      
      // Task statuses
      'pending': 'bg-warning text-warning-foreground',
      'progress': 'bg-status-progress text-white',
      'done': 'bg-status-done text-white',
      
      // User roles
      'admin': 'bg-destructive text-destructive-foreground',
      'manager': 'bg-primary text-primary-foreground',
      'edger': 'bg-accent text-accent-foreground',
      'otk': 'bg-secondary text-secondary-foreground',
    };

    const statusLabels: Record<string, string> = {
      'new': 'Новый',
      'in_progress': 'В работе', 
      'review': 'На проверке',
      'completed': 'Завершен',
      'cancelled': 'Отменен',
      'pending': 'Ожидает',
      'progress': 'В работе',
      'done': 'Выполнено',
      'admin': 'Администратор',
      'manager': 'Менеджер',
      'edger': 'Обрезчик',
      'otk': 'ОТК',
    };

    return (
      <Badge className={`${variants[status] || 'bg-muted text-muted-foreground'} font-medium`}>
        {statusLabels[status] || status}
      </Badge>
    );
  };

  const getPriorityBadge = (priority: string) => {
    const variants: Record<string, string> = {
      'low': 'bg-muted text-muted-foreground',
      'medium': 'bg-warning text-warning-foreground',
      'high': 'bg-destructive text-destructive-foreground',
      'urgent': 'bg-red-600 text-white animate-pulse',
    };

    const labels: Record<string, string> = {
      'low': 'Низкий',
      'medium': 'Средний',
      'high': 'Высокий',
      'urgent': 'Срочно',
    };

    return (
      <Badge className={`${variants[priority] || 'bg-muted text-muted-foreground'} font-medium`}>
        {labels[priority] || priority}
      </Badge>
    );
  };

  const defaultRenders: Record<string, (value: any, row: any) => React.ReactNode> = {
    created_at: (value) => formatDate(value),
    updated_at: (value) => formatDate(value),
    due_date: (value) => formatDate(value),
    start_date: (value) => formatDate(value),
    completed_at: (value) => formatDate(value),
    status: (value, row) => {
      const type = row.client_name ? 'order' : row.title ? 'task' : undefined;
      return getStatusBadge(value, type);
    },
    role: (value) => getStatusBadge(value),
    priority: (value) => getPriorityBadge(value),
    total_amount: (value) => value ? `${Number(value).toLocaleString('ru-RU')} ₽` : '—',
    salary: (value) => value ? `${Number(value).toLocaleString('ru-RU')} ₽` : '—',
  };

  if (loading) {
    return (
      <Card className="glass border-card-border">
        <CardHeader>
          <CardTitle className="text-display text-2xl font-bold">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="glass border-card-border">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-display text-2xl font-bold tracking-tight">
            {title}
          </CardTitle>
          <Badge variant="secondary" className="font-medium">
            {data.length} {data.length === 1 ? 'запись' : data.length < 5 ? 'записи' : 'записей'}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        {data.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">📋</div>
            <p className="text-muted-foreground text-lg">
              {emptyMessage || 'Данные отсутствуют'}
            </p>
          </div>
        ) : (
          <div className="rounded-lg border border-card-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent border-card-border">
                  {columns.map((column) => (
                    <TableHead 
                      key={column.key}
                      className="font-display font-semibold text-foreground bg-muted/30"
                    >
                      {column.header}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((row, index) => (
                  <TableRow 
                    key={row.id || index}
                    className="hover:bg-hover/50 transition-colors border-card-border"
                  >
                    {columns.map((column) => (
                      <TableCell key={column.key} className="font-body">
                        {column.render 
                          ? column.render(row[column.key], row)
                          : defaultRenders[column.key]
                          ? defaultRenders[column.key](row[column.key], row)
                          : row[column.key] || '—'
                        }
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};