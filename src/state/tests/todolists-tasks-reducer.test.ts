import {
    addTodolistAC,
    changeTodolistEntityStatusAC,
    TodolistDomainType,
    todolistsReducer
} from "../reducers/todolists-reducer";
import {tasksReducer} from "../reducers/tasks-reducer";
import {TasksStateType} from "../../trash/App";
import {TodolistType} from "../types";

test('ids should be equals', () => {
    const startTasksState: TasksStateType = {}
    const startTodolistsState: TodolistDomainType[] = [
        {id: '1', title: 'What to learn', filter: "all", entityStatus: 'idle', addedDate: "", order: 0},
        {id: '2', title: 'What to buy', filter: "all", entityStatus: 'idle', addedDate: "", order: 0},
        {id: '3', title: 'What to read', filter: "all", entityStatus: 'idle', addedDate: "", order: 0},
    ]

    const newTodo = {id: '4', title: 'New todo', addedDate: "", order: 0}

    const action = addTodolistAC(newTodo)

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodolists = endTodolistsState[0].id

    expect(idFromTasks).toBe(action.todolist.id)
    expect(idFromTodolists).toBe(action.todolist.id)
})
test('entity status of todolist should to be chsnged',()=>{
    const startState: TodolistDomainType[] = [
        {id: '1', title: 'What to learn', filter: "all", entityStatus: 'idle', addedDate: "", order: 0},
        {id: '2', title: 'What to buy', filter: "all", entityStatus: 'idle', addedDate: "", order: 0},
        {id: '3', title: 'What to read', filter: "all", entityStatus: 'idle', addedDate: "", order: 0},
    ]

    const action = changeTodolistEntityStatusAC('1', 'loading')
    const endState = todolistsReducer(startState, action)
    expect(endState[0].entityStatus).toBe('loading')
    expect(endState[1].entityStatus).toBe('idle')
    expect(endState[2].entityStatus).toBe('idle')
})