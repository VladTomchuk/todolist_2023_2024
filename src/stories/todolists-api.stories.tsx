import React, {useEffect, useState} from 'react'
import {TodolistsApi} from "../api/todolists-api";

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
            value={state}
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
                   value={todolistId}
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
    useEffect(() => {
        const todolistId = "a1d36b69-6bfd-48bd-9008-c13d9863bd3f"
        TodolistsApi.getTasks(todolistId)
            .then((resp) => {
                setState(resp.data.items)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistID = "22250de8-9b08-4dbb-bb52-38f06cd05c50"
        const taskId = ""
        TodolistsApi.deleteTask(todolistID, taskId)
            .then((response) => {
                setState(response.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}