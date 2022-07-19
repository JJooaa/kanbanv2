import { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const Kanban = ({ boards, setBoards, currentBoard }) => {
  const onDragEnd = (result, columns) => {
    if (!result.destination) return;

    const { source, destination } = result;
    if (source.droppableId !== destination.droppableId) {
      // what column we take from
      const sourceColumn = columns[source.droppableId];
      // what column we change to
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
      const column = columns[source.droppableId];
      const copiedItems = [...column.tasks];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setBoards({
        ...columns,
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
        {Object.entries(boards).map(([columnId, column]) => {
          return (
            <div key={columnId}>
              <div>
                <h4 className="column-name">
                  {column.name} ({column.tasks.length})
                </h4>
                <Droppable droppableId={columnId} key={columnId}>
                  {(provided) => {
                    return (
                      <div className="column" ref={provided.innerRef}>
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
                                    <h4>{item.title}</h4>
                                    <p>subtasks</p>
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
