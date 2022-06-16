import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import 'antd/dist/antd.css';
import { Button, Modal } from 'antd';
import { useState } from 'react';
import { Card } from 'antd';


const DndContext = ({ onDragEnd, columns, setColumns, }) => {
    const [size, setSize] = useState('large');
    const [visible, setVisible] = useState(false);
    const [content, setContent] = useState("")

    const onSubmit = () => {
        setVisible(false);
        console.log(content)
    (content)
        setContent("")
    }
    
    return (
        <DragDropContext
            onDragEnd={result => onDragEnd(result, columns, setColumns)}
            style={{ position: "relative" }}
        >
            <div style={{ position: "absolute", top: "10px"}}>
                <Button type="primary" onClick={() => setVisible(true)} size={size}>
                    Create Todo
                </Button>
            </div>
            <Modal
                title="Creating todo function is on progress....visit later!!"
                centered
                okText={"Create Todo"}
                visible={visible}
                onOk={onSubmit}
                onCancel={() => setVisible(false)}
                width={900}
               

            >
                <textarea value={content} onChange={(e) => setContent(e.target.value)} style={{
                    width: "100%",
                    height: "100px",
                    fontSize: "18px",

                }} />
            </Modal>

            {Object.entries(columns).map(([columnId, column], index) => {
                return (
                    <div key={index} style={{ background:"white", marginLeft:"20px" ,}}>
                        <Card
                            hoverable
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                               
                            }}
                            key={columnId}
                            >

                            <h2>{column.name}</h2>
                            <div style={{ margin: 8 }}>


                                <Droppable  droppableId={columnId} key={columnId}>
                                    {(provided, snapshot) => {
                                        return (
                                            <div

                                                ref={provided.innerRef}
                                                {...provided.droppableProps}
                                                isdragging={snapshot.isDragging}
                                                style={{
                                                    background: snapshot.isDraggingOver
                                                        ? "white"
                                                        : "white",
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
                                                                                background: "#90b562",
                                                                                userSelect:"none"
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
                        </Card>
                    </div>

                );
            })}

        </DragDropContext>
    )

}


export default DndContext