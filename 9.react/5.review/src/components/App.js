import { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Counter from "./Counter";
import Input from "./Input";
import Message from "./Message";

const App = () => {
    const pageTitle = 'Welcome to My WebSite';
    const [count, setCount] = useState(0); // 변하는 변수값을 DOM에 그려줄 변수
    const [message, setMessage] = useState(''); // 입력받을 메세지 저정할 변수
    const [showComponent, setShowComponent] = useState(true);

    const MyComponent = () => { // 리엑트 컴포넌트 라이프사이클 (생명주기) 를 통해서 mounting, updating, unmounting 등등 살펴보면 좋음..
        useEffect(() => {
            console.log('컴포넌트 등장(mounting)');
            return () => {
                console.log('컴포넌트 삭제(?) (unmounting)');
            }
        }, []);

        return <div>내 새로운 컴포넌트</div>
    }

    return (
        <div>
            <Header title={pageTitle} />
            <h1>헬로우 월드</h1>
            <main>
                <p>여기가 메인 글자가 쓰이는곳</p>
                <Counter count={count} setCount={setCount} />
                <Input setMessage={setMessage} />
                <Message count={count} message={message} />
                <button onClick={() => setShowComponent(!showComponent)}>MyComponent토글</button>
                {showComponent && <MyComponent />}
            </main>
            <Footer />
        </div>
    );
}

export default App;
