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

function App() {

    let [tasks, setTasks] = useState<TaskPropsType[]>(
        [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "GraphQL", isDone: true},
            {id: v1(), title: "Redux", isDone: false}
        ]
    )

    let [filter, setFilter] = useState<FilterValuesType>('all')

    let tasksForTodolist = tasks

    if (filter === 'active') {
        tasksForTodolist = tasks.filter(t => !t.isDone)
    }

    if (filter === 'completed') {
        tasksForTodolist = tasks.filter(t => t.isDone)
    }

    const removeTask = (id: string) => {
        let filtredTask = tasks.filter(t => t.id !== id)
        setTasks(filtredTask)
    }

    const changeFilter = (value: FilterValuesType) => {
        setFilter(value)
    }

    const addTask = (title: string) => {
        let task = {id: v1(), title: title, isDone: true}
        let newTasks = [task, ...tasks]
        setTasks(newTasks)
    }

    return (
        <div className="App">
            <Todolist
                title="Technologies that I am studying"
                tasks={tasksForTodolist}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
            />
        </div>
    );
}


export default App;
