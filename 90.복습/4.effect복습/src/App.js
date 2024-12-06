import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const [loading, setLoading] = useState(false);
  const [clearing, setClearing] = useState(false);
  const [count, setCount] = useState(1);
  const [data, setData] = useState("null");

  useEffect(() => {
    loadData();
  }, [count]);

  useEffect(() => {
    console.log("loading 상태 변경 감지: ", loading);
  }, [loading]);

  useEffect(() => {
    console.log("Clearing 상태 변경 감지: ", clearing);
  }, [clearing]);

  const loadData = async () => {
    setLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));
    const randomId = Math.floor(Math.random() * 100) + 1;
    try {
      const response = await fetch(
        `http://jsonplaceholder.typicode.com/posts/${randomId}`
      );
      const result = await response.json();
      console.log(result);
      setData(result);
    } catch (error) {
      setData({ error: true });
    } finally {
      setLoading(false);
    }
  };

  const clearHandler = async () => {
    setClearing(true);
    console.log("클리어 클리됨", "clearing 상태: ", clearing);
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
            <span
              className="spinner-border
                  spinner-border-sm"
            ></span>{" "}
            Clearing...
          </>
        ) : (
          "Clear"
        )}
      </button>

      <div className="mt-4">
        {data ? (
          data.error ? (
            <div className="alter alter-danger">
              <p style={{ color: "red" }}>데이터 로딩 실패했습니다</p>
            </div>
          ) : (
            <div className="alert alert-success">
              <h3>{data.title}</h3>
              <p>{data.body}</p>
            </div>
          )
        ) : (
          <div className="alert alert-secondary">
            <p> No data loaded.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
