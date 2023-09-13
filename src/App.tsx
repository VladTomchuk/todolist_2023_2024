import React from 'react';
import './App.css';
import {Todolist} from "./Todolist";

function App() {
    return (
        <div className="App">
            <Todolist title="Technologies that I've studied"/>
            <Todolist title="Technologies that I am studying"/>
            <Todolist title="Technologies that I will study"/>
        </div>
    );
}


export default App;
