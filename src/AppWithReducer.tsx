import React, {Reducer, useReducer} from 'react';
import './App.css';
import {Todolist} from "./components/Todolist";
import {v1} from "uuid";
import AddItemForm from "./components/AddItemForm";
import AppBarComponent from "./components/AppBar";
import Container from '@mui/material/Container';
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import {
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    FilterValuesType,
    removeTodolistAC,
    TodolistDomainType,
    TodolistsActionType,
    todolistsReducer
} from "./state/todolists-reducer";
import {
    addTaskAC,
    // changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    TasksActionType,
    tasksReducer
} from "./state/tasks-reducer";
import {TaskPriorities, TaskStatuses, TaskType} from "./state/types";


export type TasksStateType = {
    [todolistId: string]: TaskType[]
}

function AppWithReducer() {
    //BLL:
    const todolistId1 = v1()
    const todolistId2 = v1()

    let [todolists, dispatchToTodolists] = useReducer<Reducer<Array<TodolistDomainType>, TodolistsActionType>>(todolistsReducer, [
        {id: todolistId1, title: "Technologies", filter: "all", addedDate: "", order: 0},
        {id: todolistId2, title: "What to learn?", filter: "all", addedDate: "", order: 0}
    ])

    let [tasks, dispatchToTasks] = useReducer<Reducer<TasksStateType, TasksActionType>>(tasksReducer, {
            [todolistId1]: [
                {
                    id: v1(),
                    title: "HTML&CSS",
                    status: TaskStatuses.Completed,
                    todoListId: todolistId1,
                    startDate: '',
                    deadline: '',
                    addedDate: '',
                    order: 0,
                    priority: TaskPriorities.Low,
                    description: ''
                },
                {
                    id: v1(),
                    title: "JS",
                    status: TaskStatuses.Completed,
                    todoListId: todolistId1,
                    startDate: '',
                    deadline: '',
                    addedDate: '',
                    order: 0,
                    priority: TaskPriorities.Low,
                    description: ''
                },
            ],
            [todolistId2]: [
                {
                    id: v1(),
                    title: "HTML&CSS",
                    status: TaskStatuses.Completed,
                    todoListId: todolistId2,
                    startDate: '',
                    deadline: '',
                    addedDate: '',
                    order: 0,
                    priority: TaskPriorities.Low,
                    description: ''
                },
                {
                    id: v1(),
                    title: "JS",
                    status: TaskStatuses.Completed,
                    todoListId: todolistId2,
                    startDate: '',
                    deadline: '',
                    addedDate: '',
                    order: 0,
                    priority: TaskPriorities.Low,
                    description: ''
                },
            ]
        }
    )

    const getTasksForRender = (tasks: TaskType[], currentFilterValue: FilterValuesType) => {
        switch (currentFilterValue) {
            case "active":
                return tasks.filter(t => t.status === TaskStatuses.New)
            case 'completed':
                return tasks.filter(t => t.status === TaskStatuses.Completed)
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
    const changeIsDoneStatus = (todolistId: string, taskId: string, status: TaskStatuses) => {
        // dispatchToTasks(changeTaskStatusAC(taskId, status, todolistId))
    }
    const removeTodolist = (todolistId: string) => {
        let action = removeTodolistAC(todolistId)
        dispatchToTodolists(action)
        dispatchToTasks(action)
    }
    const addTodo = (newTitle: string) => {
        // let action = addTodolistAC(newTitle)
        // dispatchToTodolists(action)
        // dispatchToTasks(action)
    }
    const updateTask = (todolistId: string, taskId: string, newTitle: string) => {
        // dispatchToTasks(changeTaskTitleAC(todolistId, taskId, newTitle))
    }
    const updateTodoTitle = (todolistId: string, newTitle: string) => {
        dispatchToTodolists(changeTodolistTitleAC(todolistId, newTitle))
    }

    const todolistsComponents = todolists.map(tl => {

            const tasksForTodolist = getTasksForRender(tasks[tl.id], tl.filter)

            return (
                <Grid item>
                    <Paper elevation={12} style={{padding: '20px'}}>
                        <Todolist
                            key={tl.id}
                            title={tl.title}
                            todolistId={tl.id}
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
