import {action} from '@storybook/addon-actions';
import {Task} from "../components/Task";

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
                {...{id: '1', title: 'react', isDone: true}}
                removeTask={removeTaskCallback}
                changeIsDoneStatus={changeIsDoneStatusCallback}
                updateTaskHandler={updateTaskHandlerCallback}/>
            <Task
                {...{id: '2', title: 'Redux', isDone: false}}
                removeTask={removeTaskCallback}
                changeIsDoneStatus={changeIsDoneStatusCallback}
                updateTaskHandler={updateTaskHandlerCallback}/>
        </>

    )
}