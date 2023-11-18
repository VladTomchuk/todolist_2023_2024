import axios from "axios";


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

type TodolistType = {
    id: string
    title: string
    addedDate: string,
    order: number
}

type ResponseDataType<D = {}> = {
    resultCode: number
    messages: string[],
    data: D
}

type TaskType = {
    description: string
    title: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
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

type UpdateTaskModelType = {
    title: string
    description: string
    //completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
}

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
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseDataType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
        return instance.put<ResponseDataType>(`todo-lists/${todolistId}/tasks/${taskId}`, model)
    }
}