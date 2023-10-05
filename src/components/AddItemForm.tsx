import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type PropsType = {
    callback: (newTitle: string) => void
}
const AddItemForm = (props: PropsType) => {

    let [title, setTitle] = useState('')
    let [emptyValueError, setEmptyValueError] = useState(false)

    const addTitleHandler = () => {
        if (title.trim() !== '') {
            props.callback(title.trim())
        } else {
            setEmptyValueError(true)
        }
        setTitle('')
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addTitleHandler()
        }
    }
    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        emptyValueError && setEmptyValueError(false)
        setTitle(e.currentTarget.value)
    }

    return (
        <div>
            <input
                value={title}
                onKeyPress={onKeyPressHandler}
                onChange={onChangeInputHandler}
                className={emptyValueError ? 'empty-value' : ''}
            />
            <button onClick={addTitleHandler}>+</button>
            {emptyValueError && <div>Please type title!</div>}
        </div>
    );
};

export default AddItemForm;