import { useQuery } from "@tanstack/react-query";
import Header from "@/components/Header";
import { DataTable } from "@/components/DataTable";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Plus, RefreshCw, UserPlus } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Workers = () => {
  const { data: workers, isLoading, refetch } = useQuery({
    queryKey: ['workers'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  const columns = [
    { 
      key: 'avatar', 
      header: 'Фото',
      render: (value: string, row: any) => (
        <Avatar className="h-10 w-10">
          <AvatarImage src={row.avatar_url} alt={row.full_name} />
          <AvatarFallback className="bg-primary/10 text-primary font-display font-semibold">
            {row.full_name?.split(' ').map((n: string) => n[0]).join('').slice(0, 2) || '?'}
          </AvatarFallback>
        </Avatar>
      )
    },
    { key: 'full_name', header: 'ФИО' },
    { key: 'email', header: 'Email' },
    { key: 'phone', header: 'Телефон', render: (value: string) => value || '—' },
    { key: 'role', header: 'Роль' },
    { key: 'salary', header: 'Зарплата' },
    { key: 'created_at', header: 'Дата создания' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-14">
        <div className="max-w-7xl mx-auto purposeful-space">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-display text-4xl font-bold tracking-tight mb-2">
                Сотрудники
              </h1>
              <p className="text-muted-foreground text-lg">
                Управление командой и персоналом
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
                <UserPlus className="h-4 w-4 mr-2" />
                Пригласить
              </Button>
            </div>
          </div>
          
          <DataTable
            title="Команда"
            data={workers || []}
            columns={columns}
            loading={isLoading}
            emptyMessage="Сотрудники не найдены."
          />
        </div>
      </main>
    </div>
  );
};

export default Workers;