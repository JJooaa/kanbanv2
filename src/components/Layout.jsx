import "../styles/App.css";
import Logo from "../assets/logo-light.svg";
import dots from "../assets/icon-vertical-ellipsis.svg";
import boardImg from "../assets/icon-board.svg";
import { useContext, useState } from "react";
import SmallDropDown from "./SmallDropDown";
import hideBar from "../assets/icon-hide-sidebar.svg";
import showBar from "../assets/icon-show-sidebar.svg";
import { CopyContext } from "../App";

const Layout = ({ children }) => {
  const {
    copy,
    currentBoard,
    setCurrentBoard,
    setIsModalOpen,
    setSelectedBoard,
  } = useContext(CopyContext);

  const [showDropDown, setShowDropDown] = useState(false);

  const [showSideBar, setShowSideBar] = useState(true);

  return (
    <>
      <div className="container">
        {showSideBar && (
          <div className="sidebar">
            <div>
              <img src={Logo} alt="" className="logo" />
              <div className="sidebar-boards">
                <h4>ALL BOARDS({copy.length})</h4>
                <div>
                  {copy.map((item, index) => (
                    <div
                      key={item.name}
                      className={`list-board ${
                        item.name === copy[currentBoard].name
                          ? "active"
                          : undefined
                      }`}
                      onClick={() => {
                        setCurrentBoard(index);
                      }}
                    >
                      <img src={boardImg} alt="board" />
                      {item.name}
                    </div>
                  ))}
                  <div
                    className="list-board blue"
                    onClick={() => setIsModalOpen("add_board_form")}
                  >
                    <img src={boardImg} alt="board" className="blue-board" />+
                    Create New Board
                  </div>
                </div>
              </div>
            </div>
            <div className="list-board" onClick={() => setShowSideBar(false)}>
              <img src={hideBar} alt="eyes closed" /> Hide Sidebar
            </div>
          </div>
        )}
        <div className={showSideBar ? "header" : "header full"}>
          {!showSideBar && <img src={Logo} alt="" className="logo" />}
          <h1 className={!showSideBar ? "grow" : undefined}>
            {copy[currentBoard].name}
          </h1>
          <div className="parent">
            <button onClick={() => setIsModalOpen("task_form")}>
              + Add New Task
            </button>
            {/* Has edit Board and Delete board */}
            <img
              src={dots}
              alt="dots vertically"
              onClick={() => setShowDropDown(true)}
            />
            {showDropDown && (
              <SmallDropDown
                setShowDropDown={setShowDropDown}
                name="Board"
                setIsModalOpen={setIsModalOpen}
              />
            )}
          </div>
        </div>
        {!showSideBar && (
          <div
            className="list-board absolute"
            onClick={() => setShowSideBar(true)}
          >
            <img src={showBar} alt="eyes open" />
          </div>
        )}
        <main className={showSideBar ? "test" : "test full"}>{children}</main>
      </div>
    </>
  );
};

export default Layout;
