import Footer from "./Footer";
import Heading from "./Heading";
import ToDoList from "./ToDoList";

function App() {
  return (
    <div>
      <Heading />
      <div class='box'>
        <ToDoList />
      </div>
      <Footer />
    </div>
  );
}

export default App;