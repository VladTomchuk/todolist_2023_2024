import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./components/Todolist";
import {v1} from "uuid";
import AddItemForm from "./components/AddItemForm";
import AppBarComponent from "./components/AppBar";
import Container from '@mui/material/Container';
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import {FilterValuesType, TodolistDomainType} from "./state/reducers/todolists-reducer";
import {TaskPriorities, TaskStatuses, TaskType} from "./state/types";


export type TasksStateType = {
    [todolistId: string]: TaskType[]
}

function App() {
    //BLL:
    const todolistId1 = v1()
    const todolistId2 = v1()

    let [todolists, setTodolists] = useState<TodolistDomainType[]>([
        {id: todolistId1, title: "Technologies", filter: "all", addedDate: "", order: 0},
        {id: todolistId2, title: "What to learn?", filter: "all", addedDate: "", order: 0}
    ])
    let [tasks, setTasks] = useState<TasksStateType>({
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
        setTodolists(todolists.map(tl => tl.id === todolistId ? {...tl, filter: value} : tl))
    }
    const addTask = (todolistId: string, title: string) => {
        const newTask = {
            id: v1(),
            title: title,
            description: '',
            status: TaskStatuses.New,
            priority: TaskPriorities.Middle,
            startDate: '',
            deadline: '',
            todoListId: todolistId,
            order: 0,
            addedDate: '',
        }

        // #1
        // const nextTasks = [...tasks[todolistId], newTask]
        // const copyTasks = {...tasks}
        // copyTasks[todolistId] = nextTasks
        // setTasks(copyTasks)

        // #2
        setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]})
    }
    const changeIsDoneStatus = (todolistId: string, taskId: string, status: TaskStatuses) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, status: status} : t)})
    }
    const removeTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(tl => tl.id !== todolistId))
        delete tasks[todolistId]
    }
    const addTodo = (newTitle: string) => {
        const newTodolistId = v1()
        setTodolists([{id: newTodolistId, title: newTitle, filter: "all", addedDate: "", order: 0}, ...todolists])
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
        setTodolists(todolists.map(el => el.id === todolistId ? {...el, title: newTitle} : el))
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

export default App;
