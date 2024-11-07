import React, { createContext, useEffect, useState, useContext } from 'react';
import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateCurrentUser } from 'firebase/auth';
import { auth, db } from '../firebaseConfig';
import { doc, getDoc, setDoc } from 'firebase/firestore'

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(undefined);

  useEffect(()=>{
    const unsub = onAuthStateChanged(auth, (user)=>{
      console.log("got user: ",user);

      if (user) {
        setIsAuthenticated(true);
        setUser(user);
        updateUserData(user.uid)
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    })
    return unsub;
  }, [])
  const updateUserData = async (userId) => {
    const docRef = doc(db, 'users', userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      let data = docSnap.data();
      setUser({...user, username: data.username, profileUrl: data.profileUrl, userId: data.userId})
    }
  }

  const login = async (email, password) => {
    try{
      // setUser(userData);
      const response = await signInWithEmailAndPassword(auth, email, password);
      return { success: true };

    }catch(e){
      let msg = e.message;
      if (msg.includes('auth/invalid-email')) msg = 'Invalid email'
      return { success: false, msg };
    }
  };

  const register = async (email, password, username, profileUrl) => {
    try {
      // setUser(userData);
      const response = await createUserWithEmailAndPassword(auth, email, password);
      console.log('response.user' , response?.user);
      
      // setUser(response?.user);
      // setIsAuthenticated(true);

      await setDoc(doc(db, "users", response?.user?.uid),{
        username,
        profileUrl,
        userid: response?.user?.uid
      });
      return {success: true, data: response?.user};
    } catch(e) {
      let msg = e.message;
      if(msg.includes('auth/invalid-email')) msg='Invalid email'
      if (msg.includes('auth/email-already-in-use')) msg = 'This email is already in use'
      return { success: false, msg };
    }
  };

  const logout = async () => {
    try {
      // setUser(null);
      await signOut(auth)
      return {success: true};
    } catch(e) {
      return {success: false, msg: e.message, error: e};
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Export the AuthContext for use in other components
export const useAuth = () => {
  const value = useContext(AuthContext);

  if(!value){
    throw new Error('useAuth must be wrapped inside authcontextprovider')
  }
  return value;
};
