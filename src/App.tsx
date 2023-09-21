import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";

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

    const removeTask = (id: number) => {
        let filtredTask = tasks.filter(t => t.id !== id)
        setTasks(filtredTask)
    }

    return (
        <div className="App">
            <Todolist title="Technologies that I am studying" tasks={tasks} removeTask={removeTask}/>
        </div>
    );
}


export default App;
