import { useEffect, useState } from "react";
import "../styles/App.css";
import Layout from "./Layout";
import Kanban from "./Kanban";
import data from "../data.json";
import Modal from "./Modal";

function App() {
  const [currentBoard, setCurrentBoard] = useState(0);
  const [boards, setBoards] = useState({});

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedTask, setSelectedTask] = useState({});
  useEffect(() => {
    setBoards({
      ...data.boards[currentBoard].columns,
    });
  }, [currentBoard]);

  return (
    <div>
      {isModalOpen && (
        <Modal
          setIsModalOpen={setIsModalOpen}
          selectedTask={selectedTask}
          setSelectedTask={setSelectedTask}
        />
      )}
      <Layout
        boards={data.boards}
        setCurrentBoard={setCurrentBoard}
        currentBoard={currentBoard}
        setIsModalOpen={setIsModalOpen}
      >
        <Kanban
          boards={boards}
          setBoards={setBoards}
          currentBoard={currentBoard}
          setIsModalOpen={setIsModalOpen}
          setSelectedTask={setSelectedTask}
        />
      </Layout>
    </div>
  );
}

export default App;
