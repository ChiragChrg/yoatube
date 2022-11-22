import './App.css';
import Content from './components/Content/Content';
import { BrowserRouter as Browser, Routes, Route } from "react-router-dom";
function App() {

  return (
    <div className="App">
      <Browser>
        <Routes>
          <Route path="/" element={<Content />} />
        </Routes>
      </Browser>
    </div>
  );
}

export default App;
