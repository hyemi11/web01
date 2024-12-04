import { createContext, useContext, useState } from "react";

// 빈 공간(Context)을 선언했음.
const ThemeContext = createContext();
// Provider가 정보를 제공하는 제공자...
// Consumer들에게.. 이 provider가 제공한 내용을 가져다가 쓸수 있게 해줌...

const ThemeSelector = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
    // 이전 테마 상태를 가져다가 반전 시키기
  };

  // 위의 정보들을 컨텍스트에 담기
  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
      {/* 나(ThemeContext) 를 감싼 하위 child들은.. 내 context에 접근이 가능함. */}
    </ThemeContext.Provider>
  );
};

// Custom Hook: 내가 직접 훅을 생성
const useTheme = () => useContext(ThemeContext);

export { ThemeSelector, useTheme };

//글로벌하게 사용할 데이터들을 저장하는 저장공간 (Context)라고 부름
//Provider라는 자료구조가{} 있고
//Consumer라는 자료구조{}가 있음
