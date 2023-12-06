import {TodolistsApi} from "../../api/todolists-api";
import {Dispatch} from "redux";
import {TodolistType} from "../types";
import {RequestStatusType, SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType} from "./appReducer";
import {handleServerNetworkError} from "../../utils/error-utils";


const initialState: TodolistDomainType[] = []
export const todolistsReducer = (state = initialState, action: TodolistsActionType): TodolistDomainType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.payload.todolistId)
        }
        case 'ADD-TODOLIST': {
            const newTodolist: TodolistDomainType = {...action.todolist, filter: 'all', entityStatus: 'idle'}
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
                return {...tl, filter: 'all', entityStatus: 'idle'}
            })
        }
        case 'CHANGE-TODOLIST-ENTITY-STATUS': {
            return state.map(tl => tl.id === action.todolistId
                ? {...tl, entityStatus: action.status}
                : tl)
        }
        default:
            return state
    }
}

///////ACTION CREATORS//////////
export const changeTodolistFilterAC = (todolistId: string, newFilter: FilterValuesType) => ({
        type: 'CHANGE-TODOLIST-FILTER',
        payload: {todolistId, newFilter}
    } as const
)
export const removeTodolistAC = (todolistId: string) => ({
        type: 'REMOVE-TODOLIST',
        payload: {todolistId}
    } as const
)
export const addTodolistAC = (todolist: TodolistType) => {
    return {type: 'ADD-TODOLIST', todolist} as const
}
export const changeTodolistTitleAC = (todolistId: string, title: string) => ({
    type: 'CHANGE-TODOLIST-TITLE',
    payload: {todolistId, title}
} as const)
export const setTodolistsAC = (todolists: TodolistType[]) => ({type: 'SET-TODOLISTS', todolists} as const)
export const changeTodolistEntityStatusAC = (todolistId: string, status: RequestStatusType) => ({
    type: 'CHANGE-TODOLIST-ENTITY-STATUS',
    todolistId,
    status
} as const)

////////THUNK CREATORS////////
export const fetchTodolistsTC = () => (dispatch: ThunkDispatch) => {
    dispatch(setAppStatusAC('loading'))
    TodolistsApi.getTodolists()
        .then((resp) => {
            dispatch(setTodolistsAC(resp.data))
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}
export const removeTodolistTC = (todolistId: string) => (dispatch: ThunkDispatch) => {
    dispatch(setAppStatusAC('loading'))
    dispatch(changeTodolistEntityStatusAC(todolistId, 'loading'))
    TodolistsApi.deleteTodolist(todolistId)
        .then((resp) => {
            dispatch(removeTodolistAC(todolistId))
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}
export const addTodolistsTC = (title: string) => (dispatch: ThunkDispatch) => {
    dispatch(setAppStatusAC('loading'))
    TodolistsApi.postTodolist(title)
        .then((resp) => {
            const action = addTodolistAC(resp.data.data.item)
            dispatch(action)
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}
export const changeTodolistTitleTC = (todolistId: string, title: string) => (dispatch: ThunkDispatch) => {
    TodolistsApi.updateTodolist(todolistId, title)
        .then((resp) => {
            const action = changeTodolistTitleAC(todolistId, title)
            dispatch(action)
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}

////////TYPES/////////
export type TodolistsActionType =
    RemoveTodolistACType |
    AddTodolistACType |
    ChangeTodolistTitleACType |
    changeTodolistFilterACType |
    SetTodolistsACType |
    changeTodolistEntityStatusACType

export type SetTodolistsACType = ReturnType<typeof setTodolistsAC>
export type RemoveTodolistACType = ReturnType<typeof removeTodolistAC>
export type AddTodolistACType = ReturnType<typeof addTodolistAC>
type ChangeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>
type changeTodolistFilterACType = ReturnType<typeof changeTodolistFilterAC>
type changeTodolistEntityStatusACType = ReturnType<typeof changeTodolistEntityStatusAC>

export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}
type ThunkDispatch = Dispatch<TodolistsActionType | SetAppStatusActionType | SetAppErrorActionType>