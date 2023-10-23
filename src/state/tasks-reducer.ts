import {TasksStateType} from "../App";
import {v1} from "uuid";
import {AddTodolistACType, RemoveTodolistACType} from "./todolists-reducer";

export const tasksReducer = (state: TasksStateType, action: TasksActionType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].filter(t => t.id !== action.payload.id)
            }
        }
        case 'ADD-TASK': {

            const newTask = {
                id: v1(),
                title: action.title,
                isDone: false
            }
            console.log({action})
            console.log(state[action.todolistId])
            return {...state, [action.todolistId]: [newTask, ...state[action.todolistId]]}
        }
        case 'CHANGE-TASK-STATUS': {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(t => t.id === action.payload.id
                    ? {...t, isDone: action.payload.isDone}
                    : t)
            }
        }
        case 'CHANGE-TASK-TITLE': {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(el => el.id === action.payload.taskId
                    ? {...el, title: action.payload.newTitle}
                    : el)
            }
        }
        case 'ADD-TODOLIST': {
            return {
                ...state, [action.newTodolistId]: []
            }
        }
        case 'REMOVE-TODOLIST': {
            const copyState = {...state}
            delete copyState[action.payload.todolistId]
            return copyState
        }
        default:
            return state
    }
}

export type TasksActionType =
    RemoveTaskACType |
    AddTaskACType |
    ChangeTaskStatusACType |
    ChangeTaskTitleACType |
    AddTodolistACType | // typing of common Action creator
    RemoveTodolistACType // typing of common Action creator

type RemoveTaskACType = ReturnType<typeof removeTaskAC>
type AddTaskACType = ReturnType<typeof addTaskAC>
type ChangeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
type ChangeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>

export const removeTaskAC = (id: string, todolistId: string) => {
    return {
        type: 'REMOVE-TASK',
        payload: {
            todolistId,
            id
        }
    } as const
}
export const addTaskAC = (todolistId: string, title: string) => {
    return {
        type: 'ADD-TASK',
        title, todolistId
    } as const
}
export const changeTaskStatusAC = (id: string, isDone: boolean, todolistId: string) => {
    return {
        type: 'CHANGE-TASK-STATUS',
        payload: {
            id, isDone, todolistId
        }
    } as const
}
export const changeTaskTitleAC = (todolistId: string, taskId: string, newTitle: string) => {
    return {
        type: 'CHANGE-TASK-TITLE',
        payload: {
            todolistId, taskId, newTitle
        }
    } as const
}