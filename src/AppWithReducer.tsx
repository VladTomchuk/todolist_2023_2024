import React, {Reducer, useReducer, useState} from 'react';
import './App.css';
import {Todolist} from "./components/Todolist";
import {v1} from "uuid";
import AddItemForm from "./components/AddItemForm";
import AppBarComponent from "./components/AppBar";
import Container from '@mui/material/Container';
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import {
    addTodolistAC,
    changeTodolistFilterAC, changeTodolistTitleAC,
    removeTodolistAC,
    TodolistsActionType,
    todolistsReducer
} from "./state/todolists-reducer";
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    TasksActionType,
    tasksReducer
} from "./state/tasks-reducer";

export type FilterValuesType = 'all' | 'active' | 'completed'

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}

export type TodolistType = {
    todolistId: string,
    title: string,
    filter: FilterValuesType
}

export type TasksStateType = {
    [todolistId: string]: TaskType[]
}

function AppWithReducer() {
    //BLL:
    const todolistId1 = v1()
    const todolistId2 = v1()

    let [todolists, dispatchToTodolists] = useReducer<Reducer<Array<TodolistType>, TodolistsActionType>>(todolistsReducer, [
        {todolistId: todolistId1, title: "Technologies", filter: "all"},
        {todolistId: todolistId2, title: "What to learn?", filter: "all"}
    ])

    let [tasks, dispatchToTasks] = useReducer<Reducer<TasksStateType, TasksActionType>>(tasksReducer, {
            [todolistId1]: [
                {id: v1(), title: "HTML&CSS", isDone: true},
                {id: v1(), title: "JS", isDone: true},
                {id: v1(), title: "ReactJS", isDone: false},
                {id: v1(), title: "GraphQL", isDone: true},
                {id: v1(), title: "Redux", isDone: false}
            ],
            [todolistId2]: [
                {id: v1(), title: "HTML&CSS", isDone: true},
                {id: v1(), title: "JS", isDone: true},
                {id: v1(), title: "ReactJS", isDone: false},
                {id: v1(), title: "GraphQL", isDone: true},
                {id: v1(), title: "Redux", isDone: false}
            ]
        }
    )

    const getTasksForRender = (tasks: TaskType[], currentFilterValue: FilterValuesType) => {
        switch (currentFilterValue) {
            case "active":
                return tasks.filter(t => !t.isDone)
            case 'completed':
                return tasks.filter(t => t.isDone)
            default:
                return tasks
        }
    }
    const removeTask = (todolistId: string, id: string) => {
        dispatchToTasks(removeTaskAC(id, todolistId))
    }
    const changeFilter = (todolistId: string, value: FilterValuesType) => {
        dispatchToTodolists(changeTodolistFilterAC(todolistId, value))
    }
    const addTask = (todolistId: string, title: string) => {
        dispatchToTasks(addTaskAC(todolistId, title))
    }
    const changeIsDoneStatus = (todolistId: string, taskId: string, isDone: boolean) => {
        dispatchToTasks(changeTaskStatusAC(taskId, isDone, todolistId))
    }
    const removeTodolist = (todolistId: string) => {
        let action = removeTodolistAC(todolistId)
        dispatchToTodolists(action)
        dispatchToTasks(action)
    }
    const addTodo = (newTitle: string) => {
        let action = addTodolistAC(newTitle)
        dispatchToTodolists(action)
        dispatchToTasks(action)
    }
    const updateTask = (todolistId: string, taskId: string, newTitle: string) => {
        dispatchToTasks(changeTaskTitleAC(todolistId, taskId, newTitle))
    }
    const updateTodoTitle = (todolistId: string, newTitle: string) => {
        dispatchToTodolists(changeTodolistTitleAC(todolistId, newTitle))
    }

    const todolistsComponents = todolists.map(tl => {

            const tasksForTodolist = getTasksForRender(tasks[tl.todolistId], tl.filter)

            return (
                <Grid item>
                    <Paper elevation={12} style={{padding: '20px'}}>
                        <Todolist
                            key={tl.todolistId}
                            title={tl.title}
                            todolistId={tl.todolistId}
                            currentFilterValue={tl.filter}
                            tasks={tasksForTodolist}
                            removeTask={removeTask}
                            changeFilter={changeFilter}
                            callback={addTask}
                            changeIsDoneStatus={changeIsDoneStatus}
                            removeTodolist={removeTodolist}
                            updateTask={updateTask}
                            updateTodoTitle={updateTodoTitle}
                        />
                    </Paper>
                </Grid>
            )
        }
    )

    return (
        <div className="App">
            <AppBarComponent/>
            <Container>
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm callback={addTodo}/>
                </Grid>
                <Grid container spacing={3}>
                    {todolistsComponents}
                </Grid>
            </Container>
        </div>
    )
}

export default AppWithReducer;
