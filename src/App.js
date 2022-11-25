import './App.css';
import Content from './components/Content';
import Dashboard from './components/Dashboard/Dashboard';
import Player from './components/Player/Player';
import { BrowserRouter as Browser, Routes, Route } from "react-router-dom";
function App() {

  return (
    <div className="App">
      <Browser>
        <Routes>
          <Route element={<Content />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/watch=:videoId" element={<Player />} />
          </Route>
        </Routes>
      </Browser>
    </div>
  );
}

export default App;
