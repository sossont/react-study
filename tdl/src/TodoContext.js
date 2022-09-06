import React, {createContext, useContext, useReducer, useRef} from "react";

const initialTodos = [
    {
        id: 1,
        text: '프로젝트 생성하기',
        done: true
    },
    {
        id: 2,
        text: '컴포넌트 스타일링',
        done: false
    }
];

function todoReducer(state, action) {
    switch (action.type) {
        case 'CREATE':
            return state.concat(action.todo);
        case 'TOGGLE':
            return state.map(todo =>
                todo.id === action.id ? {...todo, done: !todo.done} : todo);
        case 'REMOVE':
            return state.filter(todo => todo.id !== action.id);
        default:
            throw new Error(`Unhandled Action Type : ${action.type}`);
    }
}

const TodoStateContext = createContext();
const TodoDispatchContext = createContext();
const TodoNextIdContext = createContext();

export function TodoProvider({children}) {
    const [state, dispatch] = useReducer(todoReducer, initialTodos);
    const nextId = useRef(3);

    return (
        <TodoStateContext.Provider value={state}>
            <TodoDispatchContext.Provider value={dispatch}>
                <TodoNextIdContext.Provider value={nextId}>
                    {children}
                </TodoNextIdContext.Provider>
            </TodoDispatchContext.Provider>
        </TodoStateContext.Provider>
    );
}

export function useTodoState() {
    const context = useContext(TodoStateContext);
    if (!context) {
        throw new Error(`Can't find TodoProvider`);
    }
    return context;
}

export function useTodoDispatch() {
    const context = useContext(TodoDispatchContext);
    if (!context) {
        throw new Error(`Can't find DispatchProvider`);
    }
    return context;
}

export function useTodoNextId() {
    const context = useContext(TodoNextIdContext);
    if (!context) {
        throw new Error(`Can't find Next Id Provider`);
    }
    return context;
}