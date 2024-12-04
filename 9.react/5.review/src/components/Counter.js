import { useEffect } from "react";

const Counter = ({ count, setCount }) => {

    const incHandler = () => setCount(count + 3);
    const decHandler = () => setCount(count - 1);

    // 여기에는, 특정 변수값이 바꼈을때 하고 싶은 행동 정의
    useEffect(() => {
        // 변경 이벤트가 일어난 이후
        console.log(`카운트변수 변경됨: ${count}`);

        // Cleanup 함수라고 부르는, 이 변화가 발생했을때 **선행** 해서 실행할것
        return () => {
            console.log(`나는 클린업함수: ${count}`);
        };
    }, [count]);

    return (
        <div>
            <h2>카운터</h2>
            <p>변수값: {count}</p>
            <button onClick={decHandler}>-1 감소</button>
            <button onClick={incHandler}>+3 증가</button>
        </div>
    )
}

export default Counter;
