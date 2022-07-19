import { useEffect, useState } from "react";
import "./App.css";
import Layout from "./components/Layout";
import Kanban from "./components/Kanban";
import data from "./data.json";

function App() {
  const [currentBoard, setCurrentBoard] = useState(0);
  const [boards, setBoards] = useState({});

  useEffect(() => {
    setBoards({
      ...data.boards[currentBoard].columns,
    });
  }, [currentBoard]);

  return (
    <div className="App">
      <Layout boards={data.boards} setCurrentBoard={setCurrentBoard}>
        <Kanban
          boards={boards}
          setBoards={setBoards}
          currentBoard={currentBoard}
        />
      </Layout>
    </div>
  );
}

export default App;
