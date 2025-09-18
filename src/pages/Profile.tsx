import Header from "@/components/Header";

const Profile = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-14">
        <div className="max-w-7xl mx-auto p-6">
          <h1 className="text-2xl font-bold mb-6">Личный кабинет</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-card p-6 rounded-lg border">
              <h2 className="text-lg font-semibold mb-4">Информация о пользователе</h2>
              <p className="text-muted-foreground">Скоро здесь будет профиль пользователя</p>
            </div>
            <div className="bg-card p-6 rounded-lg border">
              <h2 className="text-lg font-semibold mb-4">Текущие задачи</h2>
              <p className="text-muted-foreground">Список активных задач</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;