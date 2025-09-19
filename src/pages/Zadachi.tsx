import { useQuery } from "@tanstack/react-query";
import Header from "@/components/Header";
import { DataTable } from "@/components/DataTable";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Plus, RefreshCw, Filter } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const Zadachi = () => {
  const { data: zadachi, isLoading, refetch } = useQuery({
    queryKey: ['zadachi'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('zadachi')
        .select(`
          *,
          author:author_id(full_name),
          responsible:responsible_user_id(full_name),
          zakaz:zakaz_id(title)
        `)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  const columns = [
    { key: 'title', header: 'Задача' },
    { 
      key: 'responsible', 
      header: 'Ответственный',
      render: (value: any) => value?.full_name || '—'
    },
    { key: 'status', header: 'Статус' },
    { key: 'priority', header: 'Приоритет' },
    { 
      key: 'zakaz', 
      header: 'Заказ',
      render: (value: any) => value?.title || '—'
    },
    { key: 'due_date', header: 'Срок' },
    { key: 'created_at', header: 'Создана' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-14">
        <div className="max-w-7xl mx-auto purposeful-space">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-display text-4xl font-bold tracking-tight mb-2">
                Задачи
              </h1>
              <p className="text-muted-foreground text-lg">
                Управление задачами по всем заказам
              </p>
            </div>
            <div className="flex gap-3">
              <Button 
                variant="outline" 
                size="sm"
                className="micro-lift"
              >
                <Filter className="h-4 w-4 mr-2" />
                Фильтр
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => refetch()}
                className="micro-lift"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Обновить
              </Button>
              <Button className="micro-lift">
                <Plus className="h-4 w-4 mr-2" />
                Новая задача
              </Button>
            </div>
          </div>
          
          <DataTable
            title="Все задачи"
            data={zadachi || []}
            columns={columns}
            loading={isLoading}
            emptyMessage="Задачи не найдены. Создайте первую задачу."
          />
        </div>
      </main>
    </div>
  );
};

export default Zadachi;