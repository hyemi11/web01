import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const Users = () => {
  //mock 데이터... 백엔드 없으니까 가상데이터로 (기다릴순없으니)
  // const users = [
  //     { id: 1, name: 'Alice' },
  //     { id: 2, name: 'Bob' },
  //     { id: 3, name: 'Charlie' },
  // ]
  const [users, setUsers] = useState([]); // 초기값은 빈 배열

  useEffect(() => {
    fetch("http://localhost:3000/api/users")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setUsers(data);
      })
      .catch((error) => {
        console.error("데이터 못가져옴: ", error);
      });
  }, []); // 디펜던시 변수 누락하지 않도록 주의

  return (
    <div>
      <h2>유저 목록</h2>

      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <Link to={`/users/${user.id}`}>{user.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
