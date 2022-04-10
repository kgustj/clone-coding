import { useState, useEffect } from "react";

import Button from "./Button";
import styled from "./App.module.css";

function App() {
    const [count, setCount] = useState(0);
    const [keyword, setKeyword] = useState("");

    const onClick = () => setCount((prev) => prev + 1);
    const onChange = (event) => setKeyword(event.target.value);

    useEffect(() => {
        console.log("Call the API...");
    }, []);
    useEffect(() => {
        console.log(`Set count to ${count}.`);
    }, [count]);
    useEffect(() => {
        // keyword가 존재하며, 길이가 5 이상일 때 실행
        if (keyword && keyword.length >= 5) {
            console.log(`Search for ${keyword}.`);
        }
        // keyword가 변화할 때 useEffect를 실행함. (Deps)
    }, [keyword]);
    useEffect(() => {
        console.log("Count or Keyword changed.");
        // keyword가 변화할 때 useEffect를 실행함. (Deps)
    }, [count, keyword]);

    return (
        <div>
            <input
                value={keyword} //
                type="text"
                placeholder="Search ..."
                onChange={onChange}
            ></input>
            <h1 className={styled.title}>{count}</h1>
            <button onClick={onClick}>Click Me</button>
            <br />
            <Button text={"Continue"} />
        </div>
    );
}

export default App;
