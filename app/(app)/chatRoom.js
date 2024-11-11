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
import { Timestamp } from 'firebase/firestore';
import { auth, db } from '../../firebaseConfig';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useRef } from 'react';
const chatRoom = () => {
  const item = useLocalSearchParams(); //second user
  const {user} = useAuth(); //logged in user
  const router = useRouter()
  const [messages, setMessages] = useState([])
  const textRef = useRef('');

  useEffect(() => {
    createRoomIfNotExists();
  
    console.log(user,":room", item)
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
    let message = textRef.current.trim();
    if(!message) return;
    try {
      let roomId = getRoomId(user?.userid, item?.userid);
      const docRef = doc(db, 'room', roomId);
      const messagesRef = collection(docRef, "messages");

      const newDoc = await addDoc(messagesRef, {
        userid: user?.userid,
        text: message,
        profileUrl: user?.profileUrl,
        senderName: user?.username,
        createdAt: Timestap.fromDate(new Date())
      });

      console.log("new message id:", newDoc.id);
    } catch (error) {
      
    }
  }
  return (
    <View className="flex-1 bg-white">
      <StatusBar style='dark' />
      <ChatRoomHeader user={item} router={router} />
      <View className="h-3 border-b border-neutral-300" />
      <View className="flex-1 justify-between bg-neutral-100 overflow-visible">
        <View className="flex-1">
          <MessageList messages={messages} />
        </View>
        <View style={{ marginBottom: hp(2.7) }} className="pt-2">
          <View className="flex-row mx-3 justify-between items-center mx-3">
            <View className="flex-row justify-between bg-white border p-2 border-neutral-300 rounded-neutral-300 rounded-full pl-2">
              <TextInput
                onChangeText={value => textRef.current = value}
                placeholder='Type message'
                style={{ fontSize: hp(2) }}
                className="flex-1 mr-2"
              />
              <TouchableOpacity onPress={handleSendMessage} className="bg-neutral-200 p-2 mr-[1px] rounded-full">
                <Feather name='send' size={hp(2.7)} color="#737373" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

    </View>
  )
}

export default chatRoom