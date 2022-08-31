import React, {useState} from "react";

function Counter() {

    const [number, setNumber] = useState(5);

    const onIncrease = () => {
        setNumber(a => a + 1)
    }

    const onDecrease = () => {
        if (number > 0)
            setNumber(a => a - 1)
    }

    return (
        <div>
            <h1>{number}</h1>
            <button onClick={onIncrease}>+1</button>
            <button onClick={onDecrease}>-1</button>
        </div>
    );
}

export default Counter;
