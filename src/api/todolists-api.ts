import axios from "axios";


const settings = {
    withCredentials: true,
    payload: {
        "api-key": "c410eced-baa9-4d4f-8e7c-26e796d99261"
    }
}

type TodolistType = {
    id: string
    title: string
    addedDate: string,
    order: number
}

type ResponseDataType<D> = {
    resultCode: number
    messages: string[],
    data: D
}

export const TodolistsApi = {

    getTodolists() {
        return axios.get<TodolistType[]>('https://social-network.samuraijs.com/api/1.1//todo-lists', settings)
    },

    postTodolist(title: string) {
        return axios.post<ResponseDataType<{ item: TodolistType }>>('https://social-network.samuraijs.com/api/1.1//todo-lists', {title: title}, settings)
    },

    deleteTodolist(todolistID: string) {
        return axios.delete<ResponseDataType<{}>>(`https://social-network.samuraijs.com/api/1.1//todo-lists/${todolistID}`, settings)
    },

    updateTodolist(todolistId: string, title: string) {
        return axios.put<ResponseDataType<{}>>(`https://social-network.samuraijs.com/api/1.1//todo-lists/${todolistId}`, {title: title}, settings)
    }
}