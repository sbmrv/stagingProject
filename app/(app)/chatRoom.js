import { View, Text, TextInput } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar';
import ChatRoomHeader from '../../components/ChatRoomHeader';
import MessageList from '../../components/MessageList';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useAuth } from '../../context/authContext';
import { getRoomId } from '../../utils/common';
import { auth, db } from '../../firebaseConfig';
import { doc, getDoc, onSnapshot, orderBy, setDoc, Timestamp } from 'firebase/firestore';
import { useRef } from 'react';
import { addDoc, collection, query } from 'firebase/firestore';

const chatRoom = () => {
  const item = useLocalSearchParams(); //second user
  const {user} = useAuth(); //logged in user
  const router = useRouter()
  const [messages, setMessages] = useState([])
  const textRef = useRef('');
  const inputRef = useRef(null);

  useEffect(() => {
    createRoomIfNotExists();
    let roomId = getRoomId(user?.userid, item?.userid);
    const docRef = doc(db, "rooms", roomId);
    const messagesRef = collection(docRef, "messages");
    const q = query(messagesRef, orderBy('createdAt', 'asc'));
    
    let unsub = onSnapshot(q, (snapshot)=>{
      let allMessages = snapshot.docs.map(doc=>{
        return doc.data();
      })
      setMessages([...allMessages]);
    })

    return unsub;
  }, [])
  const createRoomIfNotExists = async ()=>{
    // roomId
    let roomId = getRoomId(user?.userid, item?.userid);
    await setDoc(doc(db, "rooms", roomId),{
      roomId,
      createdAt: Timestamp.fromDate(new Date())
    });
  }
  const handleSendMessage = async () => {
    if (!user?.userid) {
      console.log("User ID is not available.");
      return;
    }
    let message = textRef.current.trim();
    if (!message) return;
    try {
      let roomId = getRoomId(user?.userid, item?.userid);
      const docRef = doc(db, 'rooms', roomId);
      const messagesRef = collection(docRef, "messages");
      textRef.current= "";
      if (inputRef) inputRef?.current?.clear();
      console.log(inputRef.current, "hhhhhhhhhhh")
      const newDoc = await addDoc(messagesRef, {
        userid: user?.userid,
        text: message,
        profileUrl: user?.profileUrl,
        senderName: user?.username,
        createdAt: Timestamp.fromDate(new Date())
      });

      console.log("new message id:", newDoc.id);
    } catch (error) {
      console.log("error: ", error);
    }
  };

  return (
    <View className="flex-1 bg-white">
      <StatusBar style='dark' />
      <ChatRoomHeader user={item} router={router} />
      <View className="h-3 border-b border-neutral-300" />
      <View className="flex-1 justify-between bg-neutral-100 overflow-visible">
        <View className="flex-1">
          <MessageList messages={messages} currentUser={user} />
        </View>
        <View style={{ marginBottom: hp(2.7) }} className="pt-2">
          <View className="flex-row mx-3 justify-between items-center mx-3">
            <View className="flex-row justify-between bg-white border p-2 border-neutral-300 rounded-neutral-300 rounded-full pl-2">
              <TextInput
                ref={inputRef}
                onChangeText={value => textRef.current = value}
                placeholder='Type message...'
                style={{ fontSize: hp(2) }}
                className="flex-1 mr-2"
              />
              <TouchableOpacity onPress={handleSendMessage} className="bg-neutral-200 p-2 mr-[1px] rounded-full flex-row">
                <Feather name='send' size={hp(2.7)} color="#737373" />
                <Text>send</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

    </View>
  )
}

export default chatRoom