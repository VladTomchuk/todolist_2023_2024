import React from "react";

type TaskType = {
    id: number
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: TaskType[]
}

export const Todolist = (props: PropsType) => {
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            {props.tasks.map((t: TaskType) => {
                return (
                    <ul>
                        <li><input type="checkbox" checked={t.isDone}/> <span>{t.title}</span>
                        </li>
                    </ul>
                )
            })}
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    )
}