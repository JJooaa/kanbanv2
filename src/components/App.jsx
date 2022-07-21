import { useEffect, useState } from "react";
import "../styles/App.css";
import Layout from "./Layout";
import Kanban from "./Kanban";
import data from "../data.json";
import Modal from "./Modal";

function App() {
  // index for choosing currentColumns from the copy array
  const [currentBoard, setCurrentBoard] = useState(0);
  // current columns
  const [currentColumns, setCurrentColumns] = useState({});

  // this is the data that we modify
  const [copy, setCopy] = useState([...data.boards]);
  // holds the strings, for what modal to render
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedTask, setSelectedTask] = useState({});

  useEffect(() => {
    setCurrentColumns({
      ...copy[currentBoard].columns,
    });
  }, [currentBoard]);

  return (
    <div>
      {isModalOpen && (
        <Modal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          selectedTask={selectedTask}
          setSelectedTask={setSelectedTask}
          copy={copy}
          setCopy={setCopy}
        />
      )}
      <Layout
        copy={copy}
        setCurrentBoard={setCurrentBoard}
        currentBoard={currentBoard}
        setIsModalOpen={setIsModalOpen}
      >
        <Kanban
          currentColumns={currentColumns}
          setCurrentColumns={setCurrentColumns}
          currentBoard={currentBoard}
          setIsModalOpen={setIsModalOpen}
          setSelectedTask={setSelectedTask}
        />
      </Layout>
    </div>
  );
}

export default App;
