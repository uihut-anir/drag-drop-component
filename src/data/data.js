import { v4 as uuidv4 } from 'uuid';

 const itemsFromBackend = [
    { id: "1", content: "hay task taf" },
    { id: "2", content: "Second task" },
    { id: "3", content: "Third task" },
    { id: "4", content: "Fourth task" },
    { id: "5", content: "Fifth task" }
  ];
  
 export const columnsFromBackend = {
    "To do": {
      name: "Todos",
      items: itemsFromBackend
    },
    "In Progress": { 
      name: "In Progress",
      items: []
    },
    "Completed": {
      name: "Completed",
      items: []
    }
  };