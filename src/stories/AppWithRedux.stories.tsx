import {action} from '@storybook/addon-actions';
import AppWithRedux from "../AppWithRedux";
import {ReduxStoreProviderDecorator} from "./ReduxStoreProviderDecorator";

export default {
    title: 'AppWithRedux',
    component: AppWithRedux,
    decorators: [ReduxStoreProviderDecorator]
}

const addItemCallback = action('EditableSpan has been changed!')

export const EditableSpanBaseStory = () => {
    return (
        <AppWithRedux demo={true}/>
    )
}