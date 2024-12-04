import { useEffect } from "react";

const Message = ({ count, message }) => {

    useEffect(() => {
        // 메세지가 변경될때, 사이드이펙트??
        document.title = message || '기본타이틀';
    }, [message]);

    useEffect(() => {
        // 여기는 최초 1회 (페이지가 렌더링될때) 호출되는것
        console.log('컴포넌트 mounting');

        return () => {
            console.log('컴포넌트 unmounting');
        }
    }, []); // 내용이 없으면?? 최초 1회 호출되는거고... 

    useEffect(() => {
        // 카운트가 짝수냐 홀수냐에 따라서...
        document.body.style.backgroundColor = count % 2 === 0 ? 'lightblue' : 'lightcoral';
        
        // 변수값이 변경되기 전
        return () => {
            // 배경색 초기화
            document.body.style.backgroundColor = ''; 
        }
    }, [count]); // 변수가 있을때랑...

    return (
        <div>
            <h3>메세지: {message} </h3>
            {count > 10 && <p>많이 클릭하셨네요.</p>}
            {count < 0 && <p>음수입니다. 잘못 클릭하셨을까요??</p>}
        </div>
    );
}

export default Message;
