import AddItemForm from "../components/AddItemForm";
import {action} from '@storybook/addon-actions';

export default {
    title: 'AddItemForm',
    component: AddItemForm
}

const addItemCallback = action('Title has been sent!')

export const AddItemFormBaseStory = () => {
    return (
        <AddItemForm callback={addItemCallback}/>
    )
}

export const AddItemFormDisabledtory = () => {
    return (
        <AddItemForm callback={addItemCallback} entityStatus={'loading'}/>
    )
}