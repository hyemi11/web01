import React, { useState } from "react";
import "./App.css";
import Header from "./Header";
import Footer from "./Footer";
import Counter from "./Counter";
import Message from "./Message";
import Input from "./Input";

const App = () => {
  const pageTitle = "Welcome to My Website";

  const [count, setCount] = useState(5); //State선언으로 상태관리가 되는 변수로 선언이됨.
  const [message, setMessage] = useState(""); //입력메세지 컬럼의 초기값

  return (
    <div className="App">
      <Header title={pageTitle} />
      <main className="App-header">
        <h1>Hello, World!</h1>
        <p>안녕하세요, 리액트 학습자 여러분</p>
        <Counter count={count} setCount={setCount} />
        <Message count={count} message={Message} />
        <Input setMessage={setMessage} />
      </main>
      <Footer />
    </div>
  );
};

export default App;

//이전 코드에서 컴포넌트 계층구조는
// App -> Counter -> Message
// 변경한 컴포넌트 계층구조
// App -> Counter
//     -> Message
