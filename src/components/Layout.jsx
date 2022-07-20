import "../styles/App.css";
import Logo from "../assets/logo-light.svg";
import dots from "../assets/icon-vertical-ellipsis.svg";
import boardImg from "../assets/icon-board.svg";

const Layout = ({
  children,
  boards,
  setCurrentBoard,
  currentBoard,
  setIsModalOpen,
}) => {
  const handleChosen = (item) => {
    if (item.name === boards[currentBoard].name) {
      return "list-board active";
    }
    return "list-board";
  };
  return (
    <>
      <div className="container">
        <div className="sidebar">
          <img src={Logo} alt="" className="logo" />
          <div className="sidebar-boards">
            <h4>All boards ({boards.length})</h4>
            <div>
              {boards.map((item, index) => (
                <div
                  className={handleChosen(item)}
                  onClick={() => setCurrentBoard(index)}
                >
                  <img src={boardImg} alt="board" />
                  {item.name}
                </div>
              ))}
              <div className="list-board blue">
                <img src={boardImg} alt="board" />+ Create New Board
              </div>
            </div>
          </div>
        </div>
        <div className="header">
          <h1>{boards[currentBoard].name}</h1>
          <div>
            <button onClick={() => setIsModalOpen(true)}>+ Add New Task</button>
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
