import React, {useCallback, useEffect} from "react";
import "../App.css";
import {Task} from "./Task";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../state/store";
import {
    changeTaskStatusAC,
    createTaskTC,
    fetchTasksThunkTC,
    removeTaskTC,
    updateTaskFieldTC,
} from "../state/reducers/tasks-reducer";
import {
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    changeTodolistTitleTC,
    removeTodolistAC,
    removeTodolistTC,
    TodolistDomainType
} from "../state/reducers/todolists-reducer";
import {SuperButton} from "./SuperButton";
import {RemoveSuperButton} from "./RemoveSuperButton";
import {TaskStatuses, TaskType} from "../state/types";


type PropsType = {
    todolist: TodolistDomainType
    demo?: boolean
}

export const TodolistWithRedux = React.memo(({demo = false, ...props}: PropsType) => {

    const {id, title, filter} = props.todolist
    let tasks = useSelector<AppRootStateType, TaskType[]>(
        state => state.tasks[id]
    )
    const dispatch = useDispatch()

    useEffect(() => {
        if (demo) return
        // @ts-ignore
        dispatch(fetchTasksThunkTC(props.todolist.id))
    }, [])


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
        tasks = tasks.filter(t => t.status)
    }


    const AddItemFormHandler = useCallback((newTitle: string) => {
        // @ts-ignore
        dispatch(createTaskTC(id, newTitle))
    }, [])
    const updateTodoTitleHandler = useCallback((newTitle: string) => {
        // @ts-ignore
        dispatch(changeTodolistTitleTC(id, newTitle))
    }, [id])
    const onclickRemoveTodolistHandler = useCallback(() => {
        // @ts-ignore
        dispatch(removeTodolistTC(id))
    }, [id])
    const updateTaskHandler = useCallback((taskId: string, newTitle: string) => {
        // @ts-ignore
        dispatch(updateTaskFieldTC(id, taskId, {title: newTitle}));
    }, [id])
    const changeIsDoneStatusHandler = useCallback((taskId: string, status: TaskStatuses) => {
        // @ts-ignore
        dispatch(updateTaskFieldTC(id, taskId, {status}));
    }, [id])
    const removeTaskCallback = useCallback((taskId: string) => {
        const action = removeTaskTC(taskId, id)
        //@ts-ignore
        dispatch(action)
    }, [])

    return (
        <div className={"todolistContainer"}>
            <div className={"todoTitleDiv"}>
                <h3>
                    <EditableSpan
                        oldTitle={title}
                        callback={updateTodoTitleHandler}
                    />
                </h3>
                <RemoveSuperButton callback={onclickRemoveTodolistHandler} entityStatus={props.todolist.entityStatus}/>

            </div>
            <AddItemForm callback={AddItemFormHandler} entityStatus={props.todolist.entityStatus}/>
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

