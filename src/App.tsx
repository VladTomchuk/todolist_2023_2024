import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";

export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {

    let [tasks, setTasks] = useState(
        [
            {id: 1, title: "HTML&CSS", isDone: true},
            {id: 2, title: "JS", isDone: true},
            {id: 3, title: "ReactJS", isDone: false},
            {id: 4, title: "GraphQL", isDone: true},
            {id: 5, title: "Redux", isDone: false}
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

    const removeTask = (id: number) => {
        let filtredTask = tasks.filter(t => t.id !== id)
        setTasks(filtredTask)
    }

    const changeFilter = (value: FilterValuesType)=>{
        setFilter(value)
    }

    return (
        <div className="App">
            <Todolist
                title="Technologies that I am studying"
                tasks={tasksForTodolist}
                removeTask={removeTask}
                changeFilter={changeFilter}
            />
        </div>
    );
}


export default App;
