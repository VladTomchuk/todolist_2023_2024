import React from "react";
import {FilterValuesType, TaskType} from "../App";
import "../App.css";
import {Task} from "./Task";
import AddItemForm from "./AddItemForm";

type PropsType = {
    title: string
    todolistId: string
    currentFilterValue: FilterValuesType
    tasks: TaskType[]
    removeTask: (todolistId: string, taskId: string) => void
    changeFilter: (todolistId: string, value: FilterValuesType) => void
    callback: (todolistId: string, title: string) => void
    changeIsDoneStatus: (todolistId: string, taskId: string, isDone: boolean) => void
    removeTodolist: (todolistId: string) => void
}

export const Todolist = (props: PropsType) => {

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
    const AddItemFormHandler = (newTitle: string) => {
        props.callback(props.todolistId, newTitle)
    }

    return (
        <div className={"todolistContainer"}>
            <div className={"todolistTitleContainer"}>
                <h3>{props.title}</h3>
                <span onClick={onclickRemoveTodolistHandler}>✖️</span>
            </div>
            <AddItemForm callback={AddItemFormHandler}/>
            <div>
                {props.tasks.map((t: TaskType) => {
                    const removeTaskCallback = () => props.removeTask(props.todolistId, t.id)
                    const changeIsDoneStatusHandler = (isDone: boolean) => props.changeIsDoneStatus(props.todolistId, t.id, isDone)
                    return (
                        <Task
                            key={t.id}
                            {...t}
                            removeTask={removeTaskCallback}
                            changeIsDoneStatus={changeIsDoneStatusHandler}
                        />
                    )
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