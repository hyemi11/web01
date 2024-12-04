import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const [loading, setLoading] = useState(false); //초기값 false
  const [clearing, setClearing] = useState(false); //초기값 false
  const [count, setCount] = useState(1); //초기값 1
  const [data, setData] = useState("null"); //초기값

  const loadData = async () => {
    setLoading(true);

    // 강제로 1초 대기
    await new Promise((resolve) => setTimeout(resolve, 1000));

    //Todo. 맨 뒤에 1을 랜덤으로 생성하시오 (1~10까지의 랜덤으로)
    const randomId = Math.floor(Math.random() * 100) + 1;
    try {
      const response = await fetch(
        `http://jsonplaceholder.typicode.com/posts/${randomId}`
      );
      const result = await response.json();
      // console.log(result);
      setData(result);
    } catch (error) {
      setData({ error: true });
    } finally {
      setLoading(false);
    }
  };

  // loadData();

  //count상태 변경시마다 loadData()실행
  useEffect(() => {
    loadData();
  }, [count]);
  // 지켜볼 변수, 이 변수가 변결될때마다, 이 함수 안의 내용을 실행해라.
  // 이 변수가 변경되었을때 발생하는 side-effect를 해결하기 위한 함수를 정의하는 곳.
  // [] <-- 이거의 의미는 최초 한번만 실행한다

  //loading 상태 변경시마다 loading상태 console에 출력
  useEffect(() => {
    console.log("loading 상태 변경:", loading);
  }, [loading]);

  //clearing 상태 변경시마다 clearing상태 console에 출력
  useEffect(() => {
    console.log("Clearing 상태 변경:", clearing);
  }, [clearing]); //

  const renderData = () => {
    if (!data) {
      return <p>No data loaded.</p>;
    }
    if (data.error) {
      return <p style={{ color: "red" }}>데이터 로딩에 실패하였습니다.</p>;
    }
    return (
      <div>
        <h3>{data.title}</h3>
        <p>{data.body}</p>
      </div>
    );
  };

  const clearHandler = async () => {
    setClearing(true); //리액트 상태 변경 예약임(즉시변경되는게 아님, true로 바뀌는 시점은 재랜더링 이후임)
    console.log("클리어 클릭됨", "Clearing 상태: ", clearing); //그래서 이전 상태인 false반환함
    // 1초 대기
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setData(null);
    setClearing(false);
  };

  return (
    <div className="container my-4">
      <button
        className="btn btn-primary"
        onClick={() => setCount(count + 1)}
        disabled={loading || clearing}
      >
        {loading ? (
          <>
            <span className="spinner-border spinner-border-sm"></span>{" "}
            Loading...(
            {count})
          </>
        ) : (
          "Load Data"
        )}
      </button>

      <button
        className="btn btn-danger ms-2"
        onClick={clearHandler}
        disabled={clearing || loading || data === null}
      >
        {clearing ? (
          <>
            <span className="spinner-border spinner-border-sm"></span>{" "}
            Clearing...
          </>
        ) : (
          "clear"
        )}
      </button>

      {/* 결과를 출력할 공간 */}
      <div className="mt-4">
        {data ? (
          data.error ? (
            <div className="alert alert-danger">
              <p style={{ color: "red" }}>데이터 로딩에 실패했습니다</p>
            </div>
          ) : (
            <div className="alert alert-success">
              <h3>{data.title}</h3>
              <p>{data.body}</p>
            </div>
          )
        ) : (
          <div className="alert alert-secondary">
            <p>No data loaded.</p>
          </div>
        )}
      </div>

      {/* 위랑 똑같은 코드를 if문으로 짜보기 */}
      {/* { <div className="mt-4"> */}
      {/* {renderData()} */}
      {/* {(() => {
                    if (!data) {
                        return <p>No data loaded.</p>
                    }
                    if (data.error) {
                        return <p style={{ color: "red" }}>데이터 로딩에 실패하였습니다.</p>
                    }
                    return (
                        <div>
                            <h3>{data.title}</h3>
                            <p>{data.body}</p>
                        </div>
                    );
                })()} }
            </div> */}
    </div>
  );
};

export default App;

// useEffect loadData() 코드흐름해석
// useEffect는 의존성 배열 [count]를 보고 있습니다.
// 즉, count 값이 변경될 때마다 loadData()가 실행됩니다.
// 버튼 클릭 → setCount 호출 → count 변경 → useEffect 실행 → loadData 호출

//useEffect
//의존성 배열에 지정된 상태값(useState 변수)**이 변할 때마다 실행되는 훅입니다.
//따라서, count가 변할 때마다 useEffect 내부의 코드가 실행되는 겁니다.

//버튼코드흐름
// 1. 버튼 클릭 → setClearing(true) → 상태 변경 → UI 업데이트(버튼 비활성화 및 로딩 스피너 표시).
// 2. 1초 대기 → 비동기 작업 완료.
// 3. setClearing(false) → 상태 변경 → UI 복구(버튼 활성화 및 원래 텍스트 표시).

//React의 상태(useState)는 값이 변경될 때 자동으로 UI가 업데이트됩니다
//위 코드에서는 clearing 상태가 UI를 제어하는 핵심 변수 역할을 하며, 상태 변화에 따라 버튼과 로딩 스피너가 동작합니다.
