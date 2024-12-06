import React from "react";

function Post({ id, title, content, image, postedAt }) {
  return (
    <tr>
      <td>{id}</td>
      <td>{title}</td>
      <td>{content}</td>
      <td>{image}</td>
      <td>{postedAt}</td>
      <td>
        <button>삭제</button>
      </td>
    </tr>
  );
}

export default Post;
