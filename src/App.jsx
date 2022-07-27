import { useEffect, useState, createContext } from "react";
import "./styles/App.css";
import Layout from "./components/Layout";
import Kanban from "./components/Kanban";
import data from "./lib/data.json";
import Modal from "./components/Modal";

export const CopyContext = createContext();

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
  const [selectedBoard, setSelectedBoard] = useState({});

  useEffect(() => {
    setCurrentColumns({
      ...copy[currentBoard].columns,
    });
    setSelectedBoard({
      ...copy[currentBoard],
    });
  }, [currentBoard]);

  return (
    <CopyContext.Provider
      value={{
        copy,
        setCopy,
        currentColumns,
        setCurrentColumns,
        currentBoard,
        setCurrentBoard,
        selectedTask,
        setSelectedTask,
        isModalOpen,
        setIsModalOpen,
        selectedBoard,
        setSelectedBoard,
      }}
    >
      {isModalOpen && <Modal />}
      <Layout>
        <Kanban />
      </Layout>
    </CopyContext.Provider>
  );
}

export default App;
