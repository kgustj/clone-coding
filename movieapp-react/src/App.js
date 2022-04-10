import { useState, useEffect } from "react";

import Button from "./Button";
import styled from "./App.module.css";

function App() {
    const [value, setValue] = useState(0);
    const onClick = () => setValue((prev) => prev + 1);
    console.log("all");
    const iRunOnlyOnce = () => {
        console.log("one");
    };
    useEffect(iRunOnlyOnce, []);

    return (
        <div>
            <h1 className={styled.title}>{value}</h1>
            <Button text={"Click Me!"} onClick={onClick} />
        </div>
    );
}

export default App;
