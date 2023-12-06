import React, {useEffect, useState} from 'react'
import {TodolistsApi} from "./todolists-api";

export default {
    title: 'API'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        TodolistsApi.getTodolists()
            .then((response) => {
                setState(response.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>("")
    const AddNewTodo = () => {
        TodolistsApi.postTodolist(state)
            .then((response) => {
                setState(response.data)
            })
    }
    return <div>
        <div>{JSON.stringify(state)}</div>
        <input
            placeholder={"Type title of todolist"}
            type="text"
            onChange={(e) => setState(e.currentTarget.value)}
            // value={state}
        />
        <button onClick={AddNewTodo}>Add new todolist</button>
    </div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    const deleteTodo = () => {
        TodolistsApi.deleteTodolist(state)
            .then((response) => {
                setState(response.data)
            })
    }
    return (
        <div>
            <div>{JSON.stringify(state)}</div>
            <input placeholder={"To remove todo, type ID of todo "}
                   type="text"
                   onChange={(e) => setState(e.currentTarget.value)}
                   value={state}/>
            <button onClick={deleteTodo}>Delete todo</button>
        </div>

    )

}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const [title, setTitle] = useState<string>('')
    const updateTodo = () => {
        TodolistsApi.updateTodolist(todolistId, title)
            .then((response) => {
                setState(response.data)
            })
    }
    return (
        <div>
            <div>{JSON.stringify(state)}</div>
            <input type="text"
                   placeholder={"Type todolistId"}
                   onChange={(e) => setTodolistId(e.currentTarget.value)}
            />
            <input type="text"
                   placeholder={"Type new title to update"}
                   value={title}
                   onChange={(e) => setTitle(e.currentTarget.value)}
            />
            <button onClick={updateTodo}>Update todolist title</button>
        </div>
    )
}
export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    const getTasks = () => {
        TodolistsApi.getTasks(state)
            .then((resp) => {
                setState(resp.data.items)
            })
    }
    return (
        <div>
            <div>{JSON.stringify(state)}</div>
            <input type="text"
                   placeholder={"Get tasks of todolist with this ID"}
                   onChange={(e) => setState(e.currentTarget.value)}
            />
            <button onClick={getTasks}>Get tasks</button>
        </div>
    )
}
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistID, setTodolistID] = useState<any>(null)
    const [taskId, setTaskId] = useState<any>(null)

    const deleteTak = () => {
        TodolistsApi.deleteTask(todolistID, taskId)
            .then((response) => {
                setState(response.data)
            })
    }
    return (
        <div>
            <div>{JSON.stringify(state)}</div>
            <input type="text"
                   placeholder={"TodolistId of task"}
                   onChange={(e) => setTodolistID(e.currentTarget.value)}
            />
            <input type="text"
                   placeholder={"TaskID"}
                   onChange={(e) => setTaskId(e.currentTarget.value)}
            />
            <button onClick={deleteTak}>Get tasks</button>
        </div>
    )
}
export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistID, setTodolistID] = useState<any>(null)
    const [title, setTitle] = useState<any>(null)

    const addTask = () =>{
        TodolistsApi.createTask(todolistID,title)
            .then((response)=>{
                setState(response.data)
            })
    }
    return (
        <div>
            <div>{JSON.stringify(state)}</div>
            <input type="text" placeholder={"Task Title"} onChange={(e)=>setTitle(e.currentTarget.value)}/>
            <input type="text" placeholder={"TodolistId of task"} onChange={(e)=>setTodolistID(e.currentTarget.value)}/>
            <button onClick={addTask}>Add task</button>
        </div>
    )
}
export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistID, setTodolistID] = useState<any>("")
    const [taskId, seTaskId] = useState<any>("")
    const [title, setTitle] = useState<any>("")
    const [description, setDescription] = useState<any>("")
    const [status, setStatus] = useState<number>(0)
    const [priority, setPriority] = useState<number>(0)

    const addTask = () =>{
        TodolistsApi.updateTask(todolistID,taskId,{
            title: title,
            description: description,
            status: status,
            priority: priority,
            startDate: "",
            deadline: "",
        })
            .then((response)=>{
                setState(response.data)
            })
    }
    return (
        <div>
            <div>{JSON.stringify(state)}</div>
            <input
                type="text" placeholder={"TaskID "}
                onChange={(e)=>seTaskId(e.currentTarget.value)}
            />
            <input
                type="text" placeholder={"TodolistId of task"}
                onChange={(e)=>setTodolistID(e.currentTarget.value)}
            />
            <input
                type="text"
                placeholder={"Task Title"}
                onChange={(e)=>setTitle(e.currentTarget.value)}
            />
            <input
                type="text"
                placeholder={"Description"}
                onChange={(e)=>setDescription(e.currentTarget.value)}
            />
            <input
                type="number"
                placeholder={"Status"}
                onChange={(e)=>setStatus(+e.currentTarget.value)}
            />
            <input
                type="number"
                placeholder={"Priority"}
                onChange={(e)=>setPriority(+e.currentTarget.value)}
            />
            <button onClick={addTask}>Add task</button>
        </div>
    )
}