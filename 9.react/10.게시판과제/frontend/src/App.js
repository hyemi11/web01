import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./Main";

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Main />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
