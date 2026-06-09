import Header from "./components/Header";
import TaskBoard from "./components/TaskBoard";

function App() {
  return (
    <main className="min-h-screen bg-[#f8f9fb] px-9 py-4">
      <div className="mx-auto max-w-[785px]">
        <Header />
        <TaskBoard />
      </div>
    </main>
  );
}

export default App;