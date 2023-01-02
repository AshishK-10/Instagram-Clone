import logo from './logo.svg';
import './App.css';
import Signup from './components/Signup'
import Login from './components/Login';
import { BrowserRouter, Route, Routes} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path = "/login" element={<Login/>}/>
        <Route path = "/signup" element={<Signup/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
