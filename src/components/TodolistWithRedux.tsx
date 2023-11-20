import React, {useCallback} from "react";
import "../App.css";
import {Task} from "./Task";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../state/store";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "../state/tasks-reducer";
import {
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    TodolistDomainType
} from "../state/todolists-reducer";
import {SuperButton} from "./SuperButton";
import {RemoveSuperButton} from "./RemoveSuperButton";
import { TaskType} from "../api/todolists-api";
import {TaskStatuses} from "../state/types";


type PropsType = {
    todolist: TodolistDomainType
}

export const TodolistWithRedux = React.memo((props: PropsType) => {
    console.log('todolist is called')

    const {id, title, filter} = props.todolist
    let tasks = useSelector<AppRootStateType, TaskType[]>(
        state => state.tasks[id]
    )
    const dispatch = useDispatch()

    const onAllClickHandler = useCallback(() => {
        dispatch(changeTodolistFilterAC(id, 'all'))
    }, [id])
    const onActiveClickHandler = useCallback(() => {
        dispatch(changeTodolistFilterAC(id, 'active'))
    }, [id])
    const onComletedClickHandler = useCallback(() => {
        dispatch(changeTodolistFilterAC(id, 'completed'))
    }, [id])


    if (filter === 'active') {
        tasks = tasks.filter(t => !t.status)
    }
    if (filter === 'completed') {
        tasks = tasks.filter(t => !t.status)
    }


    const AddItemFormHandler = useCallback((newTitle: string) => {
        dispatch(addTaskAC(id, newTitle))
    }, [])
    const updateTodoTitleHandler = useCallback((newTitle: string) => {
        dispatch(changeTodolistTitleAC(id, newTitle))
    }, [changeTodolistTitleAC, id])
    const onclickRemoveTodolistHandler = useCallback(() => {
        dispatch(removeTodolistAC(id))
    }, [removeTodolistAC, id])
    const updateTaskHandler = useCallback((taskId: string, newTitle: string) => {
        dispatch(changeTaskTitleAC(id, taskId, newTitle))
    }, [id])
    const changeIsDoneStatusHandler = useCallback((taskId: string, status: TaskStatuses) => {
        dispatch(changeTaskStatusAC(taskId, status, id))
    }, [changeTaskStatusAC, id])
    const removeTaskCallback = useCallback((taskId: string) => {
        dispatch(removeTaskAC(taskId, id))
    }, [removeTaskAC, id])

    return (
        <div className={"todolistContainer"}>
            <div className={"todoTitleDiv"}>
                <h3>
                    <EditableSpan
                        oldTitle={title}
                        callback={updateTodoTitleHandler}
                    />
                </h3>
                <RemoveSuperButton callback={onclickRemoveTodolistHandler}/>

            </div>
            <AddItemForm callback={AddItemFormHandler}/>
            <div>
                {tasks.map((t: TaskType) => {


                    return (
                        <Task
                            key={t.id}
                            {...t}
                            removeTask={removeTaskCallback}
                            changeIsDoneStatus={changeIsDoneStatusHandler}
                            updateTaskHandler={updateTaskHandler}
                        />
                    )
                })}
            </div>

            {/*BUTTONS OF FILTRATION */}
            <div>
                <SuperButton color={'primary'} name={'all'} filter={filter === 'all'} callback={onAllClickHandler}/>
                <SuperButton color={'warning'} name={'active'} filter={filter === 'active'}
                             callback={onActiveClickHandler}/>
                <SuperButton color={'success'} name={'completed'} filter={filter === 'completed'}
                             callback={onComletedClickHandler}/>
            </div>


        </div>
    )
})

