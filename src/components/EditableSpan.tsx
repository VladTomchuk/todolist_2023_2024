import React, {ChangeEvent, useState} from 'react';

type PropsType = {
    oldTitle: string
    callback: (newTitle: string) => void
}

const EditableSpan = (props: PropsType) => {

    let [editMode, setEditMode] = useState(() => false)
    let [newTitle, setNewTitle] = useState(props.oldTitle)
    const changeModeHandler = () => {
        setEditMode((prev) => !prev)
        if (editMode) {
            props.callback(newTitle)
        }
    }

    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }

    return (

        editMode
            ? <input value={newTitle} onBlur={changeModeHandler} autoFocus onChange={onChangeInputHandler}/>
            : <span onDoubleClick={changeModeHandler}>{props.oldTitle}</span>

    );
};

export default EditableSpan;