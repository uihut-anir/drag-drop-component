import React, { useState } from "react";
import { columnsFromBackend } from "./data/data.js"
import DndContext from "./component/dndcontext"
import { useSettingStore } from "./store.js";
import { useEffect } from "react";
import "./App.css"

export const onDragEnd = (result, columns, setColumns) => {




  if (!result.destination) return;
  const { source, destination } = result;
  console.log(columns)
  console.log(result)

  if (source.droppableId !== destination.droppableId) {

    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);

    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems
      }
    });
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);

    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems
      }
    });
  }
};






function App() {
  const [columns, setColumns] = useState(columnsFromBackend);


  const toggleDarkMode = useSettingStore(state => state.toggleDarkMode);
  const dark = useSettingStore(state => state.dark)

  useEffect(() => {
    if (dark) {
      document.querySelector('#container').classList.add('dark')
    } else {
      document.querySelector('#container').classList.remove('dark')
    }
  }, [dark])


  return (

    <div id="container" style={{ display: "flex", justifyContent: "center", alignItems: 'center', height: "90vh" }}>
      <button onClick={toggleDarkMode}>Toggle Dark Mode</button>
      <DndContext onDragEnd={onDragEnd} columns={columns} setColumns={setColumns} />
    </div>


  );
}

export default App;
