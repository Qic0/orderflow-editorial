import Header from "@/components/Header";

const Analitika = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-14">
        <div className="max-w-7xl mx-auto p-6">
          <h1 className="text-2xl font-bold mb-6">Аналитика</h1>
          <div className="bg-card p-6 rounded-lg border">
            <p className="text-muted-foreground">Сводка по заказам в виде диаграмм и таблиц будет здесь</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Analitika;