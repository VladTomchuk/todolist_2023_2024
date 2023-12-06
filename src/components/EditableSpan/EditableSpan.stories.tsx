import {action} from '@storybook/addon-actions';
import EditableSpan from "./EditableSpan";

export default {
    title: 'EditableSpan',
    component: EditableSpan
}

const addItemCallback = action('EditableSpan has been changed!')

export const EditableSpanBaseStory = () => {
    return (
        <EditableSpan oldTitle={"initial value"} callback={addItemCallback}/>
    )
}