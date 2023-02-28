import './App.css';
import Signup from './components/Signup'
import Login from './components/Login';
import Feed from './components/Feed'
import ForgetPassword from './components/ForgetPassword';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import { AuthProvider } from './Context/authContext';
import PrivateRoute from './components/PrivateRoute';
import Profile from './components/Profile';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route exact path = "/" element={<PrivateRoute/>}>
            <Route exact path='/' element={<Feed/>}/>
          </Route>
          <Route exact path = "/profile/:id" element={<PrivateRoute/>}>
            <Route exact path='/profile/:id' element={<Profile/>}/>
          </Route>
          <Route path = "/login" element={<Login/>}/>
          <Route path = "/signup" element={<Signup/>}/>
          <Route path = "/forgetPassword" element={<ForgetPassword/>}/>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
