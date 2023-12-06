import axios from "axios";
import {TaskPriorities, TaskStatuses, TaskType, TodolistType} from "../state/types";


const settings = {
    withCredentials: true,
    payload: {
        "api-key": "c410eced-baa9-4d4f-8e7c-26e796d99261"
    }
}
const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    ...settings
})
// api
export const TodolistsApi = {
    getTodolists() {
        return instance.get<TodolistType[]>('todo-lists')
    },
    postTodolist(title: string) {
        return instance.post<ResponseDataType<{ item: TodolistType }>>('todo-lists', {title: title})
    },
    deleteTodolist(todolistID: string) {
        return instance.delete<ResponseDataType>(`todo-lists/${todolistID}`)
    },
    updateTodolist(todolistId: string, title: string) {
        return instance.put<ResponseDataType>(`todo-lists/${todolistId}`, {title: title})
    },
    getTasks(todolistId: string) {
        return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`)
    },
    createTask(todolistId: string, title: string) {
        return instance.post<CreateTaskResponse>(`todo-lists/${todolistId}/tasks`, {title})
    },
    deleteTask(taskId: string, todolistId: string) {
        return instance.delete<ResponseDataType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
        return instance.put<ResponseDataType>(`todo-lists/${todolistId}/tasks/${taskId}`, model)
    }
}
export const authApi = {
    login(data: LoginParamsType) {
        return instance.post<ResponseDataType<{ userId?: number }>>('auth/login', data)
    },
    logout(){
        return instance.delete<ResponseDataType<{ id: number}>>('auth/login')
    },
    me() {
        return instance.get<ResponseDataType<{ id: number, email: string, login: string }>>('auth/me', )
    }
}
// types
export type LoginParamsType = {
    email: string
    password: string
    rememberMe: boolean
    captcha?: string
}
export type ResponseDataType<D = {}> = {
    resultCode: number
    messages: string[],
    data: D
}
type GetTasksResponse = {
    items: TaskType[]
    error: string | null
    totalCount: number
}
type CreateTaskResponse = {
    resultCode: number
    messages: string[],
    data: TaskType
}
export type UpdateTaskModelType = {
    title: string
    description: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
}