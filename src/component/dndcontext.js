import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import 'antd/dist/antd.css';
import { Button , Modal} from 'antd';
import { useState } from 'react';
import { Card } from 'antd';


const DndContext = ({ onDragEnd, columns, setColumns, addTodo }) => {
    const [size, setSize] = useState('large');
    const [visible, setVisible] = useState(false);
    return (
        <DragDropContext
            onDragEnd={result => onDragEnd(result, columns, setColumns)}
            style={{ position: "relative" }}
        >
            <div style={{ position: "absolute", top: "20px" }}>
                <Button type="primary" onClick={()=>setVisible(true)} size={size}>
                    Create Todo
                </Button>
            </div>
            <Modal
                title="create your todo now!!"
                centered
                visible={visible}
                onOk={() => setVisible(false)}
                onCancel={() => setVisible(false)}
                width={900}
                
            >
                <textarea style={{
                    width:"100%",
                    height:"100px",
                    fontSize:"18px",
          
                }}/>
            </Modal>

            {Object.entries(columns).map(([columnId, column], index) => {
                return (
                    <>
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center"
                            }}
                            key={columnId}
                        >

                            <h2>{column.name}</h2>
                            <div style={{ margin: 8 }}>


                                <Droppable droppableId={columnId} key={columnId}>
                                    {(provided, snapshot) => {
                                        return (
                                            <div

                                                ref={provided.innerRef}
                                                {...provided.droppableProps}
                                                isdragging={snapshot.isDragging}
                                                style={{
                                                    background: snapshot.isDraggingOver
                                                        ? "lightblue"
                                                        : "lightgrey",
                                                    padding: 4,
                                                    width: 250,
                                                    minHeight: 500
                                                }}
                                            >
                                                {column.items.map((item, index) => {
                                                    return (
                                                        <Draggable
                                                            key={item.id}
                                                            draggableId={item.id}
                                                            index={index}
                                                        >
                                                            {(provided, snapshot) => {
                                                                return (
                                                                    <div
                                                                        ref={provided.innerRef}
                                                                        {...provided.draggableProps}
                                                                        {...provided.dragHandleProps}


                                                                        {...provided.draggableProps.style}

                                                                    >
                                                                        <Card
                                                                            hoverable
                                                                            style={{
                                                                                marginTop: "7px",
                                                                                background: "#90b562"
                                                                            }}
                                                                        >
                                                                            {item.content}
                                                                        </Card>
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
                    </>

                );
            })}

        </DragDropContext>
    )

}


export default DndContext