import {RequestStatusType} from "./reducers/appReducer";
import {FilterValuesType} from "./reducers/todolists-reducer";

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3,
}

export enum TaskPriorities {
    Low ,
    Middle ,
    high,
    Urgently,
    Later,
}

export type TodolistType = {
    id: string
    title: string,
    addedDate: string,
    order: number
}
export type TaskType = {
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}