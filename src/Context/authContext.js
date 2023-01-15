import React, {useState, useEffect} from 'react';
import {auth} from '../firebase';
export const AuthContext = React.createContext();

export function AuthProvider({children}){
  const [user, setUser] = useState('');
  const [loading, setLoading] = useState(true);

  function signup(user, password){
    return auth.createUserWithEmailAndPassword(user, password);
  }

  function login(user, password){
    return auth.signInWithEmailAndPassword(user, password);
  }

  function logout(){
    return auth.signOut();
  }

  function forgetPassword(email){
    return auth.sendPasswordResetEmail(email);
  }

  useEffect(()=>{
    const unsub = auth.onAuthStateChanged((user)=>{
      setUser(user);
      setLoading(false);
    })
    return ()=>{
      unsub();    // willn delete this listener on componentdidUnmount
    }
  }, [])

  const store = {user, signup, login, logout, forgetPassword}
  return (
    <AuthContext.Provider value = {store}>
     {!loading && children}
    </AuthContext.Provider>
  )
}

