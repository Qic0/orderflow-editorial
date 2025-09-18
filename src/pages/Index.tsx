import Header from "@/components/Header";
import KanbanBoard from "@/components/KanbanBoard";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-14">
        <KanbanBoard />
      </main>
    </div>
  );
};

export default Index;
