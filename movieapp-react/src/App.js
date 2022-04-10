import { useState, useEffect } from "react";

import Button from "./Button";
import styled from "./App.module.css";

function App() {
    const [value, setValue] = useState(0);
    const onClick = () => setValue((prev) => prev + 1);
    console.log(`Set value to ${value}.`);

    useEffect(() => {
        console.log("Call the API...");
    }, []);

    return (
        <div>
            <h1 className={styled.title}>{value}</h1>
            <button onClick={onClick}>Click Me</button>
            <br />
            <Button text={"Continue"} />
        </div>
    );
}

export default App;
