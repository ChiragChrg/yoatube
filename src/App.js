import './App.css';
import { useState } from 'react';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';

function App() {
  const [toggleNav, setToggleNav] = useState(false);

  return (
    <div className="App">
      <Header setToggleNav={setToggleNav}/>
      <Sidebar toggleNav={toggleNav}/>
      {/* <h1>Hi Mom</h1> */}
    </div>
  );
}

export default App;
