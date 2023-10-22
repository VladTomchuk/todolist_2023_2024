import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";


export const todolistsReducer = (state: TodolistType[], action: ActionType): TodolistType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.todolistId !== action.payload.todolistId)
        }
        case 'ADD-TODOLIST': {
            //const newTodolistId = v1()
            return [...state, {todolistId: action.payload.newTodolistId, title: action.payload.newTitle, filter: "all"}]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            return state.map(el => el.todolistId === action.payload.todolistId ? {
                ...el,
                title: action.payload.title
            } : el)
        }
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl => tl.todolistId === action.payload.todolistId ? {...tl, filter: action.payload.newFilter} : tl)
        default:
            return state
    }
}

type ActionType =
    RemoveTodolistACType |
    AddTodolistACType |
    ChangeTodolistTitleACType |
    changeTodolistFilterACType

export type RemoveTodolistACType = ReturnType<typeof removeTodolistAC>
export const removeTodolistAC = (todolistId: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {
            todolistId
        }
    } as const
}

export type AddTodolistACType = ReturnType<typeof addTodolistAC>
export const addTodolistAC = (newTitle: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {
            newTitle, newTodolistId:v1()
        }
    } as const
}

type ChangeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>
export const changeTodolistTitleAC = (todolistId: string, title: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        payload: {
            todolistId, title
        }
    } as const
}

type changeTodolistFilterACType = ReturnType<typeof changeTodolistFilterAC>
export const changeTodolistFilterAC = (todolistId:string, newFilter:FilterValuesType) => {
  return{
      type:'CHANGE-TODOLIST-FILTER',
      payload:{
          todolistId, newFilter
      }
  }as const
}