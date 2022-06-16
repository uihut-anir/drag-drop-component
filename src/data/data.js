import { v4 as uuidv4 } from 'uuid';

 const itemsFromBackend = [
    { id: uuidv4(), content: "First tafrgsdfhgsdfghd dsfg sdfgh sdh sfdfd ghsrgh sk" },
    { id: uuidv4(), content: "Second task" },
    { id: uuidv4(), content: "Third task" },
    { id: uuidv4(), content: "Fourth task" },
    { id: uuidv4(), content: "Fifth task" }
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
    "Done": {
      name: "Completed",
      items: []
    }
  };