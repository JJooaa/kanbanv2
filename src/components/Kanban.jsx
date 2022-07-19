import { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const Kanban = ({ boards, setBoards, currentBoard }) => {
  const onDragEnd = (result, columns) => {
    if (!result.destination) return;

    const { source, destination } = result;
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.tasks];
      const destItems = [...destColumn.tasks];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);

      setBoards({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          tasks: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          tasks: destItems,
        },
      });
    } else {
      const column = boards[source.droppableId];
      const copiedItems = [...boards.tasks];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setBoards({
        ...boards,
        [source.droppableId]: {
          ...column,
          tasks: copiedItems,
        },
      });
    }
  };

  return (
    <div className="Kanban">
      <DragDropContext onDragEnd={(result) => onDragEnd(result, boards)}>
        {/* boards[0] is for the current selected board */}
        {Object.entries(boards).map(([columnId, column], index) => {
          return (
            <div key={columnId}>
              <h4>{column.name}</h4>
              <div>
                <Droppable droppableId={columnId} key={columnId} index={index}>
                  {(provided) => {
                    return (
                      <div
                        className="column"
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                      >
                        {column.tasks.map((item, index) => {
                          return (
                            <Draggable
                              key={item.title}
                              draggableId={item.title}
                              index={index}
                            >
                              {(provided, snapshot) => {
                                return (
                                  <div
                                    className="card"
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={{
                                      backgroundColor: snapshot.isDragging
                                        ? "#263B4A"
                                        : "#2B2C37",
                                      ...provided.draggableProps.style,
                                    }}
                                  >
                                    {item.title}
                                  </div>
                                );
                              }}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
                      </div>
                    );
                  }}
                </Droppable>
              </div>
            </div>
          );
        })}
      </DragDropContext>
    </div>
  );
};

export default Kanban;
