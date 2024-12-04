import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// 리액트와 리액트 native
// 리액트가 잘 하는건 데이터를 잘 다루는 것 이건 웹,앱 공통!
// 그리고 그 이후에 할건? 렌더링! 이걸 웹에 할거냐 앱에 할거냐. 이 차이..
// 하지만 코드가 같진 않아. 웹, 앱환경은 완전 다른거니까
