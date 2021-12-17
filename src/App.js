import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import ChatApp from './Home/ChatApp/ChatApp';
import Home from './Home/Home/Home';
import Login from './Home/Login/Login';
import Register from './Home/Register/Register';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/chatapp" element={<ChatApp />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
