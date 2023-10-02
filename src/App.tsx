import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";

export type FilterValuesType = 'all' | 'active' | 'completed'

export type TaskPropsType = {
    id: string,
    title: string,
    isDone: boolean
}

export type TodolistType = {
    title: string,
    filter: FilterValuesType,
    todolistId: string
}

export type TasksStateType = {
    [todolistId: string]: TaskPropsType[]
}

function App() {
    //BLL:
    const todolistId1 = v1()
    const todolistId2 = v1()

    let [todolists, setTodolists] = useState<TodolistType[]>([
        {todolistId: todolistId1, title: "Technologies that I am studying", filter: "all"},
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

    const getTasksForRender = (tasks: TaskPropsType[], currentFilterValue: FilterValuesType) => {
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
        setTasks({...tasks, [todolistId]: [...tasks[todolistId], newTask]})
    }
    const changeIsDoneStatus = (todolistId: string, taskId: string) => {

        setTasks({...tasks, [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, isDone: !t.isDone} : t)})

    }
    const removeTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(tl => tl.todolistId !== todolistId))
        delete tasks[todolistId]
    }

    return (
        <div className="App">
            {
                todolists.map(tl => {

                        const tasksForTodolist = getTasksForRender(tasks[tl.todolistId], tl.filter)

                        return (
                            <Todolist
                                todolistId={tl.todolistId}
                                currentFilterValue={tl.filter}
                                tasks={tasksForTodolist}
                                removeTask={removeTask}
                                changeFilter={changeFilter}
                                addTask={addTask}
                                changeIsDoneStatus={changeIsDoneStatus}
                                removeTodolist={removeTodolist}
                            />
                        )
                    }
                )
            }
        </div>
    )
        ;
}


export default App;
