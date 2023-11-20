import {action} from '@storybook/addon-actions';
import {Task} from "../components/Task";
import {TaskPriorities, TaskStatuses} from "../state/types";


export default {
    title: 'Task',
    component: Task,
}

const removeTaskCallback = action('Task has been removed!')
const changeIsDoneStatusCallback = action('isDone has been changed!')
const updateTaskHandlerCallback = action('Title of task has been updated!')

export const TaskStory = (props: any) => {
    return (
        <>
            <Task
                {...{id: '1',
                    title: "HTML&CSS",
                    status: TaskStatuses.Completed,
                    todoListId: "todolistId1",
                    startDate: '',
                    deadline: '',
                    addedDate: '',
                    order: 0,
                    priority: TaskPriorities.Low,
                    description: ''}}
                removeTask={removeTaskCallback}
                changeIsDoneStatus={changeIsDoneStatusCallback}
                updateTaskHandler={updateTaskHandlerCallback}/>
            <Task
                {...{id: '2',
                    title: "HTML&CSS",
                    status: TaskStatuses.Completed,
                    todoListId: "todolistId1",
                    startDate: '',
                    deadline: '',
                    addedDate: '',
                    order: 0,
                    priority: TaskPriorities.Low,
                    description: ''}}
                removeTask={removeTaskCallback}
                changeIsDoneStatus={changeIsDoneStatusCallback}
                updateTaskHandler={updateTaskHandlerCallback}/>
        </>

    )
}