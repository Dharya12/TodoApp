import React from 'react';
import './TodoApp.css'
import { useState } from 'react';
import {Button, TableBody} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import {TableContainer,Table , TableHead , TableCell , TableRow} from '@mui/material'
const TodoApp = () => {
    const [Input, setInput] = useState('');
    const [Id, setId] = useState(0);
    const [selectId, updateSelectId] = useState(0);
    const [TodoItem, setTodoItem] = useState([]);
    const [editing, setEditing] = useState(false);
    const [isChecked , updateIsChecked] = useState(false);
    const [checkboxtext , updateCheckboxText] = useState("Pending");

    const setValue = (e) => {
        setInput(e.target.value);  
    }

    const addTodo = () => {
        setId(Id + 1);
        if(Input !== "")
        setTodoItem((prevItems) =>
        [
            ...prevItems,
            {
                id: Id,
                Status : checkboxtext,
                content: Input
            }
        ]);
        setInput("");
    }

    const deleteItem = (id) => {
        setTodoItem(currentTodos => currentTodos.filter(todo => {
            return todo.id !== id;
        }))
    }

    const editItem = (text, id) => {
        console.log("The id is : ", id);
        setEditing(true);
        updateSelectId(id);
        setInput(text);
    };

    const updateItem = () => {
        //setInput("");
        console.log(Input);
        TodoItem.filter((item) => {
            if (item.id === selectId) {
                item.content = Input;
            }
            return item.content;
        })

        setEditing(false);
        setInput("");
    }
    const updateStatus =(id)=>{
        TodoItem.forEach((item)=>{
            updateIsChecked(!isChecked)
            if(item.id === id)
            {   
                if(!isChecked === true)
                {
                    console.log("id is matched");
                    updateCheckboxText( "Done");
                    item.Status = "Done";
                    console.log(item.Status)
                }
                else{
                    item.Status = "Pending";
                    updateIsChecked("false");
                }  
            }
        })
    }
    const SetButton = () => {
        let result = !editing ? (<Button id='addItem' type='submit' onClick={addTodo} variant="outlined" color="secondary" size="small" endIcon={<AddIcon />}>Add Item</Button>) : (<Button id='addItem' type='submit'  onClick={updateItem} variant="outlined" color="secondary" size="small" endIcon={<CheckCircleOutlineIcon />}>update Item</Button>)
        return result;
    }

    return (
        <>
            <div  className='headContainer'>
                <h1>React Todo App</h1>
                <form>
                    <input type='text' placeholder='please enter  data' onChange={setValue} value={Input}></input>
                    <SetButton />
                </form>

            </div>
            <hr></hr>
            <TableContainer >
                <Table >
                    <TableHead>
                        <TableRow sx={{borderBottom: "2px solid rgb(243, 10, 189)",}}>
                            <TableCell align="left" sx={{ fontSize: 20 }} size="small">Todo Data</TableCell>
                            <TableCell align="center" sx={{ fontSize: 20 }} size="small">Status</TableCell>
                            <TableCell align="center" sx={{ fontSize: 20 }} size="small">Action</TableCell>
                        </TableRow>
                    
                    </TableHead>
                    <TableBody>
                        {TodoItem.map((item, index) => {
                            
                            //console.log(index);
                            return (
                                <TableRow sx={{borderBottom: "2px solid rgb(243, 10, 189)",}}>
                                    <TableCell key={item.id} id={index} align="left" size="small"> 
                                        <input type='checkbox'  onChange={(e)=>{updateStatus(item.id)}}></input>
                                        {item.content}
                                    </TableCell>
                                    <TableCell align="center">{item.Status}</TableCell>
                                    <TableCell className='editMuiButton' align="center">
                                        <Button id='editButton' variant="contained" color="success" size="small" onClick={() => editItem(item.content, item.id)} endIcon={<BorderColorIcon/>} sx={{mr:3}}>Edit</Button>
                                        <Button id='deleteButton' key={index} variant="contained" color="error" size="small" 
                                            onClick={() => {
                                                deleteItem(item.id)
                                            }}
                                            endIcon={<DeleteIcon />}
                                        >
                                            Delete
                                        </Button>
                                    </TableCell>
                            
                                </TableRow>
                            )
                        })}
                    </TableBody>
                
                </Table>
            </TableContainer>
        </>    
    )
}

export default TodoApp;

