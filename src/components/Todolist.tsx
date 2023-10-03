import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType, TaskType} from "../App";
import "../App.css";
import {Task} from "./Task";

type PropsType = {
    title: string
    todolistId: string
    currentFilterValue: FilterValuesType
    tasks: TaskType[]
    removeTask: (todolistId: string, taskId: string) => void
    changeFilter: (todolistId: string, value: FilterValuesType) => void
    addTask: (title: string, todolistId: string) => void
    changeIsDoneStatus: (todolistId: string, taskId: string, isDone: boolean) => void
    removeTodolist: (todolistId: string) => void
}

export const Todolist = (props: PropsType) => {

    let [title, setTitle] = useState('')
    let [emptyValueError, setEmptyValueError] = useState(false)

    const addTaskHandler = () => {
        if (title.trim() !== '') {
            props.addTask(props.todolistId, title.trim())
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
        props.changeFilter(props.todolistId, 'all')
    }
    const onActiveClickHandler = () => {
        props.changeFilter(props.todolistId, 'active')
    }
    const onComletedClickHandler = () => {
        props.changeFilter(props.todolistId, 'completed')
    }

    const onclickRemoveTodolistHandler = () => {
        props.removeTodolist(props.todolistId)
    }

    return (
        <div className={"todolistContainer"}>
            <div className={"todolistTitleContainer"}>
                <h3>{props.title}</h3>
                <span onClick={onclickRemoveTodolistHandler}>✖️</span>
            </div>

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

            <div>
                {props.tasks.map((t: TaskType) => {
                    const removeTaskCallback = () => props.removeTask(props.todolistId, t.id)
                    const changeIsDoneStatusHandler = (isDone: boolean) => props.changeIsDoneStatus(props.todolistId, t.id, isDone)
                    return <Task
                        key={t.id}
                        {...t}
                        removeTask={removeTaskCallback}
                        changeIsDoneStatus={changeIsDoneStatusHandler}
                    />
                })}
            </div>

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