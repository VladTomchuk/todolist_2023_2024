import {TasksStateType} from '../../trash/App'
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    setTasksAC,
    tasksReducer
} from "../reducers/tasks-reducer";
import {addTodolistAC, removeTodolistAC, setTodolistsAC} from "../reducers/todolists-reducer";
import {TaskPriorities, TaskStatuses} from '../types';


let startState: TasksStateType


beforeEach(() => {
    startState = {
        'todolistId1': [
            {
                id: '1',
                title: "CSS",
                status: TaskStatuses.New,
                todoListId: "todolistId1",
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                description: ''
            },
            {
                id: '2',
                title: "JS",
                status: TaskStatuses.Completed,
                todoListId: "todolistId1",
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                description: ''
            },
            {
                id: '3',
                title: "React",
                status: TaskStatuses.New,
                todoListId: "todolistId1",
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                description: ''
            }
        ],
        'todolistId2': [
            {
                id: '1',
                title: "bread",
                status: TaskStatuses.Completed,
                todoListId: "todolistId2",
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                description: ''
            },
            {
                id: '2',
                title: "milk",
                status: TaskStatuses.Completed,
                todoListId: "todolistId2",
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                description: ''
            },
            {
                id: '3',
                title: "tea",
                status: TaskStatuses.New,
                todoListId: "todolistId2",
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                description: ''
            }
        ]
    }
})

test('correct task should be deleted from correct array', () => {

    const action = removeTaskAC('2', 'todolistId2')

    const endState = tasksReducer(startState, action)

    expect(endState).toEqual({
        'todolistId1': [
            {
                id: '1',
                title: "CSS",
                status: TaskStatuses.New,
                todoListId: "todolistId1",
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                description: ''
            },
            {
                id: '2',
                title: "JS",
                status: TaskStatuses.Completed,
                todoListId: "todolistId1",
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                description: ''
            },
            {
                id: '3',
                title: "React",
                status: TaskStatuses.New,
                todoListId: "todolistId1",
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                description: ''
            }
        ],
        'todolistId2': [
            {
                id: '1',
                title: "bread",
                status: TaskStatuses.Completed,
                todoListId: "todolistId2",
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                description: ''
            },
            {
                id: '3',
                title: "tea",
                status: TaskStatuses.New,
                todoListId: "todolistId2",
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                description: ''
            }
        ]
    })
})
test('correct task should be added to correct array', () => {

    const action = addTaskAC('todolistId2', 'juce')

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(4)
    expect(endState['todolistId2'][0].id).toBeDefined()
    expect(endState['todolistId2'][0].title).toBe('juce')
    expect(endState['todolistId2'][0].status).toBe(TaskStatuses.New)
})
test('status of specified task should be changed', () => {

    const action = changeTaskStatusAC('2', TaskStatuses.New, 'todolistId2')

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'][1].status).toBe(TaskStatuses.New)
})
test('new title of task should to changes the task`s old title', () => {

    const action = changeTaskTitleAC('todolistId2', '1', 'newTitle')

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId2'].length).toBe(3)
    expect(endState['todolistId2'][0].title).toBe('newTitle')

})
test('new array should be added when new todolist is added', () => {
    const newTodo = {id: 'todolistId3', title: 'What to read', filter: "all", addedDate: "", order: 0}
    const action = addTodolistAC(newTodo);

    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState)
    const newKey = keys.find(k => k != 'todolistId1' && k != 'todolistId2')
    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})
test('property with todolistId should be deleted', () => {

    const action = removeTodolistAC('todolistId2')

    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todolistId2']).not.toBeDefined()
})
test('property with todolistId should be deleted', () => {

    const action = setTodolistsAC(
        [
            {id: '1', title: 'title1', addedDate: '', order: 0},
            {id: '2', title: 'title2', addedDate: '', order: 0},
        ]
    )

    const endState = tasksReducer({}, action)

    const keys = Object.keys(endState)

    expect(keys.length).toBe(2)

    expect(endState['1']).toStrictEqual([])
    expect(endState['2']).toStrictEqual([])
})
test('tasks should to be added to todolist', () => {

    const action = setTasksAC('todolistId1', startState['todolistId1'])

    const endState = tasksReducer({
        'todolistId1': [],
        'todolistId2': []
    }, action)

    const keys = Object.keys(endState)

    expect(keys.length).toBe(2)
    expect(endState['todolistId1'].length).toBe(3)
})
