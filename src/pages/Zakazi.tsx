
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/Header";
import { DataTable } from "@/components/DataTable";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Plus, RefreshCw } from "lucide-react";

const Zakazi = () => {
  const { data: zakazi, isLoading, refetch } = useQuery({
    queryKey: ['zakazi'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('zakazi')
        .select(`
          *,
          creator:created_by(full_name)
        `)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  const columns = [
    { key: 'title', header: 'Название' },
    { key: 'client_name', header: 'Клиент' },
    { key: 'client_phone', header: 'Телефон', render: (value: string) => value || '—' },
    { key: 'status', header: 'Статус' },
    { key: 'total_amount', header: 'Сумма' },
    { key: 'due_date', header: 'Срок выполнения' },
    { key: 'created_at', header: 'Создан' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-14">
        <div className="max-w-7xl mx-auto purposeful-space">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-display text-4xl font-bold tracking-tight mb-2">
                Заказы
              </h1>
              <p className="text-muted-foreground text-lg">
                Управление всеми заказами компании
              </p>
            </div>
            <div className="flex gap-3">
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
                Новый заказ
              </Button>
            </div>
          </div>
          
          <DataTable
            title="Все заказы"
            data={zakazi || []}
            columns={columns}
            loading={isLoading}
            emptyMessage="Заказы не найдены. Создайте первый заказ."
          />
        </div>
      </main>
    </div>
  );
};

export default Zakazi;