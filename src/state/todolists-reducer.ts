import {TodolistType} from "../App";
import {v1} from "uuid";


export const todolistsReducer = (state: TodolistType[], action: ActionType): TodolistType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.todolistId !== action.payload.id)
        }
        case 'REMOVE-TASK': {
            return state
        }
        case 'ADD-TODOLIST': {
            const newTodolistId = v1()
            return [...state, {todolistId: newTodolistId, title: action.payload.newTitle, filter: "all"}]
        }
        default:
            return state
    }
}

type ActionType = removeTodolistACType | removeTaskACType | addTodolistACType

type removeTodolistACType = ReturnType<typeof removeTodolistAC>
export const removeTodolistAC = (id: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {
            id
        }
    } as const
}

type removeTaskACType = ReturnType<typeof removeTaskAC>
export const removeTaskAC = (todolistId: string, taskId: string) => {
    return {
        type: 'REMOVE-TASK',
        payload: {
            todolistId,
            taskId
        }
    } as const
}

type addTodolistACType = ReturnType<typeof addTodolistAC>
export const addTodolistAC = (newTitle: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {
            newTitle
        }
    } as const
}