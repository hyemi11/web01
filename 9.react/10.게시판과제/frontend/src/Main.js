import { useEffect, useState } from "react";
import { Container, Row, Button, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Post from "./Post";

const Main = () => {
  const title = "전국 고양이 자랑";
  const pageTitle = "게시판";
  const [data, setData] = useState([]);

  useEffect(() => {
    // fetch("http://localhost:3000/api/main")
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log(data);
    //     setData(data);
    //   })
    //   .catch((error) => {
    //     console.error("데이터 못가져옴: ", error);
    //   });

    setData([
      {
        id: 1,
        title: "제목1",
        content: "123",
        image: "123",
        postedAt: "2024...",
      },
      {
        id: 2,
        title: "제목2",
        content: "12222222223",
        image: "123",
        postedAt: "20245...",
      },
    ]);
  }, []);

  return (
    <div>
      <header>
        <h1>{title}</h1>
      </header>
      <main>
        <h2>{pageTitle}</h2>
        <Container className="mt-4">
          <Row>
            <Table striped bordered hover size="sm" className="mt-3">
              <thead>
                <tr>
                  <th>번호</th>
                  <th>제목</th>
                  <th>내용</th>
                  <th>썸네일</th>
                  <th>작성일</th>
                  <th>삭제</th>
                </tr>
              </thead>

              <tbody className="table-group-divider">
                {data.map((row) => (
                  <Post {...row} />
                ))}
              </tbody>
            </Table>
          </Row>
        </Container>
      </main>
    </div>
  );
};

export default Main;
