import React, {KeyboardEvent, ChangeEvent, useState} from "react";
import {FilterValuesType, TaskPropsType} from "./App";


type PropsType = {
    todolistId: string
    currentFilterValue: FilterValuesType
    tasks: TaskPropsType[]
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (todolistId: string, value: FilterValuesType) => void
    addTask: (title: string, todolistId: string) => void
    changeIsDoneStatus: (todolistId: string, taskId: string) => void
    removeTodolist: (todolistId: string) => void
}

export const Todolist = (props: PropsType) => {

    let [title, setTitle] = useState('')
    let [emptyValueError, setEmptyValueError] = useState(false)

    const addTaskHandler = () => {
        if (title.trim() !== '') {
            props.addTask(title.trim())
        } else {
            setEmptyValueError(true)
        }
        setTitle('')
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addTaskHandler()
        }
    }
    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        emptyValueError && setEmptyValueError(false)
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
                    onChange={onChangeInputHandler}
                    className={emptyValueError ? 'empty-value' : ''}
                />
                <button onClick={addTaskHandler}>+</button>
                {emptyValueError && <div>Please type title!</div>}
            </div>
            {props.tasks.map((t: TaskPropsType) => {
                const removeTaskHandler = () => {
                    props.removeTask(t.id)
                }
                const onChangeValueIsDoneHandler = (e: ChangeEvent<HTMLInputElement>) => {
                    props.changeIsDoneStatus(t.id, t.isDone)
                }
                return (
                    <ul>
                        <li key={t.id} className={t.isDone ? "taskDone" : "task"}>
                            <input
                                type="checkbox"
                                checked={t.isDone}
                                onChange={onChangeValueIsDoneHandler}
                            />
                            <span>{t.title}</span>
                            <button onClick={removeTaskHandler}>✖️</button>
                        </li>
                    </ul>
                )
            })}
            <div>
                <button className={props.currentFilterValue === "all" ? "btn-filter-active" : "btn-filter"}
                        onClick={onAllClickHandler}>All
                </button>
                <button className={props.currentFilterValue === "active" ? "btn-filter-active" : "btn-filter"}
                        onClick={onActiveClickHandler}>Active
                </button>
                <button className={props.currentFilterValue === "completed" ? "btn-filter-active" : "btn-filter"}
                        onClick={onComletedClickHandler}>Completed
                </button>
            </div>
        </div>
    )
}