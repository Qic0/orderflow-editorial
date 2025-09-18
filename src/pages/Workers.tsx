import Header from "@/components/Header";

const Workers = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-14">
        <div className="max-w-7xl mx-auto p-6">
          <h1 className="text-2xl font-bold mb-6">Сотрудники</h1>
          <div className="bg-card p-6 rounded-lg border">
            <p className="text-muted-foreground">Список всех сотрудников будет здесь</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Workers;