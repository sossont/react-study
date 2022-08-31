import React from "react";
import './App.css'
import InputSample from "./InputSample";

function App() {
    const name = 'Example';
    const style = {
        backgroundColor: 'black',
        color: 'aqua',
        fontSize: 24,
        padding: '1rem'
    }

    return (
        <>
            <InputSample/>
        </>
    );
}

export default App;
