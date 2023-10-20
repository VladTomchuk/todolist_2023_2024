import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./components/Todolist";
import {v1} from "uuid";
import AddItemForm from "./components/AddItemForm";
import AppBarComponent from "./components/AppBar";
import Container from '@mui/material/Container';
import  Paper from "@mui/material/Paper";
import  Grid from "@mui/material/Grid";

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

function App() {
    //BLL:
    const todolistId1 = v1()
    const todolistId2 = v1()

    let [todolists, setTodolists] = useState<TodolistType[]>([
        {todolistId: todolistId1, title: "Technologies", filter: "all"},
        {todolistId: todolistId2, title: "What to learn?", filter: "all"}
    ])

    let [tasks, setTasks] = useState<TasksStateType>({
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

        // #1
        // const tasksToRemove = tasks[todolistId]
        // const filtredTasks = tasksToRemove.filter(t => t.id !== id)
        // let CopyTasks = {...tasks}
        // CopyTasks[todolistId] = filtredTasks
        // setTasks(CopyTasks)

        // #2
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== id)})

    }
    const changeFilter = (todolistId: string, value: FilterValuesType) => {
        setTodolists(todolists.map(tl => tl.todolistId === todolistId ? {...tl, filter: value} : tl))
    }
    const addTask = (todolistId: string, title: string) => {
        const newTask = {
            id: v1(),
            title: title,
            isDone: false
        }

        // #1
        // const nextTasks = [...tasks[todolistId], newTask]
        // const copyTasks = {...tasks}
        // copyTasks[todolistId] = nextTasks
        // setTasks(copyTasks)

        // #2
        setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]})
    }
    const changeIsDoneStatus = (todolistId: string, taskId: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, isDone: !t.isDone} : t)})
    }
    const removeTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(tl => tl.todolistId !== todolistId))
        delete tasks[todolistId]
    }
    const addTodo = (newTitle: string) => {
        const newTodolistId = v1()
        setTodolists([{todolistId: newTodolistId, title: newTitle, filter: "all"}, ...todolists])
        setTasks({...tasks, [newTodolistId]: []})
    }
    const updateTask = (todolistId: string, taskId: string, newTitle: string) => {

        setTasks({
            ...tasks,
            [todolistId]: tasks[todolistId].map(el => el.id === taskId ? {...el, title: newTitle} : el)
        })

        console.log(tasks)
    }
    const updateTodoTitle = (todolistId: string, newTitle: string) => {
        setTodolists(todolists.map(el => el.todolistId === todolistId ? {...el, title: newTitle} : el))
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

export default App;
