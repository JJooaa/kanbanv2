import "../styles/App.css";
import Logo from "../assets/logo-light.svg";
import dots from "../assets/icon-vertical-ellipsis.svg";
import boardImg from "../assets/icon-board.svg";

const Layout = ({
  children,
  copy,
  setCurrentBoard,
  currentBoard,
  setIsModalOpen,
}) => {
  return (
    <>
      <div className="container">
        <div className="sidebar">
          <img src={Logo} alt="" className="logo" />
          <div className="sidebar-boards">
            <h4>All boards ({copy.length})</h4>
            <div>
              {copy.map((item, index) => (
                <div
                  className={`list-board ${
                    item.name === copy[currentBoard].name && "active"
                  }`}
                  onClick={() => setCurrentBoard(index)}
                >
                  <img src={boardImg} alt="board" />
                  {item.name}
                </div>
              ))}
              <div
                className="list-board blue"
                onClick={() => setIsModalOpen("add_new_board")}
              >
                <img src={boardImg} alt="board" className="blue-board" />+
                Create New Board
              </div>
            </div>
          </div>
        </div>
        <div className="header">
          <h1>{copy[currentBoard].name}</h1>
          <div>
            <button onClick={() => setIsModalOpen("add_new_task")}>
              + Add New Task
            </button>
            {/* Has edit Board and Delete board */}
            <img src={dots} alt="" />
          </div>
        </div>
        <main className="test">{children}</main>
      </div>
    </>
  );
};

export default Layout;
