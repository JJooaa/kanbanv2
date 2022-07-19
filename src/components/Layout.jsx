import React from "react";
import "../App.css";
import Logo from "../assets/logo-light.svg";
import dots from "../assets/icon-vertical-ellipsis.svg";

const Layout = ({ children, boards, setCurrentBoard, currentBoard }) => {
  console.log(boards);
  return (
    <>
      <div className="container">
        <div className="sidebar">
          <img src={Logo} alt="" />
          <div className="sidebar-boards">
            <p className="sidebar-p">All boards ({boards.length})</p>
            <div>
              {boards.map((item, index) => (
                <div
                  className="list-board"
                  onClick={() => setCurrentBoard(index)}
                >
                  {item.name}
                </div>
              ))}
              <div className="list-board blue">+ Create New Board</div>
            </div>
          </div>
        </div>
        <div className="header">
          <h1>{boards[currentBoard].name}</h1>
          <div>
            <button>+ Add New Task</button>
            <img src={dots} alt="" />
          </div>
        </div>
        <div className="test">{children}</div>
      </div>
    </>
  );
};

export default Layout;
