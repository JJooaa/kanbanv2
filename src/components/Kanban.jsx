import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const Kanban = ({
  currentColumns,
  setCurrentColumns,
  setSelectedTask,
  setIsModalOpen,
}) => {
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

      setCurrentColumns({
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
      setCurrentColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          tasks: copiedItems,
        },
      });
    }
  };

  // TODO, clicking the empty div, will open edit board modal
  const addNewColumn = () => {
    const newColumn = {
      name: "Tests",
      tasks: [],
    };
    setCurrentColumns({
      ...currentColumns,
      newColumn,
    });
  };

  return (
    <div className="Kanban">
      <DragDropContext
        onDragEnd={(result) => onDragEnd(result, currentColumns)}
      >
        {Object.entries(currentColumns).map(([columnId, column]) => {
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
                                    onClick={() => {
                                      setSelectedTask(item, (item.key = index));
                                      setIsModalOpen("view_task");
                                    }}
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
      <div className="add-new-column" onClick={addNewColumn}>
        + New Column
      </div>
    </div>
  );
};

export default Kanban;
