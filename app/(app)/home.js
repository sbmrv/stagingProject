import { View, Text, Pressable } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/authContext';
import { StatusBar } from 'expo-status-bar';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ActivityIndicator } from 'react-native';
import Loading from '../../components/Loading';
import ChatList from '../../components/ChatList';
import { usersRef } from '../../firebaseConfig';
import { where, query, getDocs } from 'firebase/firestore';

export default function Home() {
  const { logout, user } = useAuth();
  const [users, setUsers] = useState([1,2,3]);

  useEffect(() => {
    if (user?.uid) {
      getUsers();
    }
  }, []);

  const getUsers1 = async () => {
    try {
      const q = query(usersRef, where('userId', '!=', user.uid));
      let data = [];
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(doc => {
        data.push({ ...doc.data() });
      });
      setUsers([1,2]);
    } catch (error) {
      console.error("Error fetching users: ", error);
    }
  };
  const getUsers = async () => {
    if (!user?.uid) {
      console.error('User not authenticated or user UID is missing.');
      return;
    }
    
    try {
      console.log("Current User UID:", user?.uid); // Log the user UID for debugging
  
      const q = query(usersRef, where('userid', '!=', user.uid));
      const querySnapshot = await getDocs(q);
      console.log('Query Snapshot:', querySnapshot);
      console.log('Documents Found:', querySnapshot.size);
      
      let data = [];
      querySnapshot.forEach(doc => {
        console.log('Document Data:', doc.data());
        data.push({ ...doc.data() });
      });
      
      if (data.length > 0) {
        console.log('Fetched Data:', data.forEach(i=>{
          console.log(i.username)
        }));
        setUsers(data); // Set the users with the fetched data
      } else {
        console.log('No users found');
      }
    } catch (error) {
      console.error("Error fetching users: ", error);
    }
  };
  
  console.log(users, "sdsdjsidshdshds")
  return (
    
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <StatusBar style='light' />
      {users.length > 0 ? (
        <ChatList users={users} />
      ) : (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator size="large" />
          {/* <Loading size={hp(10)} /> */}
        </View>
      )}
    </View>
  );
}
