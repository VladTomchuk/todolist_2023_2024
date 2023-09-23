import React, {KeyboardEvent, ChangeEvent, useState} from "react";
import {FilterValuesType, TaskPropsType} from "./App";


type PropsType = {
    title: string
    tasks: TaskPropsType[]
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
}

export const Todolist = (props: PropsType) => {

    let [title, setTitle] = useState('')

    const addTaskHandler = () => {
        props.addTask(title)
        setTitle('')
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addTaskHandler()
        }
    }
    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onAllClickHandler = () => {
        props.changeFilter('all')
    }
    const onActiveClickHandler = () => {
        props.changeFilter('active')
    }
    const onComletedClickHandler = () => {
        props.changeFilter('completed')
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    value={title}
                    onKeyPress={onKeyPressHandler}
                    onChange={onChangeInputHandler}/>
                <button onClick={addTaskHandler}>+</button>
            </div>
            {props.tasks.map((t: TaskPropsType) => {
                const removeTaskHandler = () => {
                    props.removeTask(t.id)
                }

                return (
                    <ul>
                        <li key={t.id}>
                            <input type="checkbox" checked={t.isDone}/><span>{t.title}</span>
                            <button onClick={removeTaskHandler}>✖️</button>
                        </li>
                    </ul>
                )
            })}
            <div>
                <button onClick={onAllClickHandler}>All</button>
                <button onClick={onActiveClickHandler}>Active</button>
                <button onClick={onComletedClickHandler}>Completed</button>
            </div>
        </div>
    )
}