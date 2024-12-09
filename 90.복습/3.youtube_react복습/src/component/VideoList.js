const VideoList = ({ videos }) => {
  return (
    <>
      <h3>검색결과</h3>
      <ul>
        {videos.map((video) => (
          <li key={video.id.videoId}>
            <img
              src={video.snippet.thumbnails.default.url}
              alt={video.snippet.title}
            />
            <div>
              <h3>{video.snippet.title}</h3>
              <p>{video.snippet.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default VideoList;
