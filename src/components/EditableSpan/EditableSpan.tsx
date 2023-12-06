import React, {ChangeEvent, memo, useCallback, useState} from 'react';

type PropsType = {
    oldTitle: string
    callback: (newTitle: string) => void
}

const EditableSpan = memo((props: PropsType) => {
    //console.log('editable span is called!')
    let [editMode, setEditMode] = useState(() => false)
    let [newTitle, setNewTitle] = useState(props.oldTitle)

    const changeModeHandler = useCallback(() => {
        setEditMode((prev) => !prev)
        if (editMode) {
            props.callback(newTitle)
        }
    }, [newTitle])
    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }

    return (
        editMode
            ?
            <input type={"text"} value={newTitle} onBlur={changeModeHandler} autoFocus onChange={onChangeInputHandler}/>
            : <span onDoubleClick={changeModeHandler}>{props.oldTitle}</span>
    );
});

export default EditableSpan;