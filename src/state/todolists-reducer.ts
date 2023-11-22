import {v1} from "uuid";
import {TodolistsApi} from "../api/todolists-api";
import {Dispatch} from "redux";
import {TodolistType} from "./types";


export type TodolistsActionType =
    RemoveTodolistACType |
    AddTodolistACType |
    ChangeTodolistTitleACType |
    changeTodolistFilterACType |
    SetTodolistsACType

const initialState: TodolistDomainType[] = []

export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}


export const todolistsReducer = (state = initialState, action: TodolistsActionType): TodolistDomainType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.payload.todolistId)
        }
        case 'ADD-TODOLIST': {
            const newTodolist: TodolistDomainType = {...action.todolist, filter: 'all'}
            return [newTodolist, ...state]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            return state.map(el => el.id === action.payload.todolistId ? {
                ...el,
                title: action.payload.title
            } : el)
        }
        case 'CHANGE-TODOLIST-FILTER': {
            return state.map(tl => tl.id === action.payload.todolistId ? {
                ...tl,
                filter: action.payload.newFilter
            } : tl)
        }
        case 'SET-TODOLISTS': {
            return action.todolists.map(tl => {
                return {
                    ...tl,
                    filter: 'all',
                }
            })
        }
        default:
            return state
    }
}

export type SetTodolistsACType = ReturnType<typeof setTodolistsAC>

export type RemoveTodolistACType = ReturnType<typeof removeTodolistAC>
export type AddTodolistACType = ReturnType<typeof addTodolistAC>
type ChangeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>
type changeTodolistFilterACType = ReturnType<typeof changeTodolistFilterAC>

export const changeTodolistFilterAC = (todolistId: string, newFilter: FilterValuesType) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        payload: {
            todolistId, newFilter
        }
    } as const
}
export const removeTodolistAC = (todolistId: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {
            todolistId
        }
    } as const
}
export const addTodolistAC = (todolist: TodolistType) => {
    return {
        type: 'ADD-TODOLIST',
        todolist
    } as const
}
export const changeTodolistTitleAC = (todolistId: string, title: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        payload: {
            todolistId, title
        }
    } as const
}
export const setTodolistsAC = (todolists: TodolistType[]) => {
    return {
        type: 'SET-TODOLISTS',
        todolists
    } as const
}

export const fetchTodolistsTC = () => {
    return (dispatch: Dispatch) => {
        TodolistsApi.getTodolists()
            .then((resp) => {
                dispatch(setTodolistsAC(resp.data))
            })
    }
}
export const removeTodolistTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        TodolistsApi.deleteTodolist(todolistId)
            .then((resp) => {
                dispatch(removeTodolistAC(todolistId))
            })
    }
}
export const addTodolistsTC = (title: string) => {
    return (dispatch: Dispatch) => {
        TodolistsApi.postTodolist(title)
            .then((resp) => {
                const action = addTodolistAC(resp.data.data.item)
                dispatch(action)
            })
    }
}
export const changeTodolistTitleTC = (todolistId: string, title: string) => {
    return (dispatch: Dispatch) => {
        TodolistsApi.updateTodolist(todolistId, title)
            .then((resp) => {
                const action = changeTodolistTitleAC(todolistId, title)
                dispatch(action)
            })
    }
}