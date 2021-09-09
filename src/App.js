import Header from "./components/Header";
import TodoList from "./components/TodoList";
import 'bootstrap/dist/css/bootstrap.css'

function App() {

  return (
    <>
      <Header title="MiniApp" 
              subtitle="Fullstack Lunes"/>
      <main className="container w-50">
        <TodoList />
      </main>
    </>
  );
  
}

export default App;
