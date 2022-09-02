import {useCallback, useState} from "react";

function reducer(state, action) {
    switch (action.type) {
        case 'RESET':
            return {
                username: '',
                email: ''
            }
        case 'CHANGE':
            return {
                ...state,
                [action.name]: action.value
            };
        default:
            return state;
    }
}

function useInputs(initialForm) {
    /*
    const [form, dispatch] = useReducer(reducer, initialForm);

    const onChange = useCallback(e => {
        const {name, value} = e.target
        dispatch({type: 'CHANGE', name, value});
    }, []);

    const reset = useCallback(() =>
            dispatch({tpye: 'RESET'}),
        []);

    return [form, onChange, reset];
    */
    const [form, setForm] = useState(initialForm);

    const onChange = useCallback(e => {
        const {name, value} = e.target;
        setForm(form => ({...form, [name]: value}));
    }, []);

    const reset = useCallback(() => setForm(initialForm), [initialForm]);
    return [form, onChange, reset];
}

export default useInputs;