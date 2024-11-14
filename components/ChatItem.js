import { View, Text, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {blurhash, formatDate, getRoomId} from '../utils/common'
import { collection, doc, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../firebaseConfig';
export default function ChatItem({ item, index, noBorder, router, currentUser }) {
     
    const [lastMessage, setlastMessage] = useState(undefined);

    useEffect(() => {

        let roomId = getRoomId(currentUser?.userid, item?.userid);
        const docRef = doc(db, "rooms", roomId);
        const messagesRef = collection(docRef, "messages");
        const q = query(messagesRef, orderBy('createdAt', 'desc'));

        let unsub = onSnapshot(q, (snapshot) => {
            let allMessages = snapshot?.docs?.map(doc => {
                return doc.data();
            })
            console.log("allMessages", allMessages[1])
            setlastMessage(allMessages[0]? allMessages[0] : null);
        })

        return unsub;
    }, [])

    console.log('last message:', lastMessage)

    const openChatRoom =() =>{
        router.push({pathname: '/chatRoom', params: item})
    }
    const renderTime =() => {
        if (lastMessage) {
            let date = lastMessage?.createdAt;
            return formatDate(new Date(date?.seconds * 1000))
        }
    }
    const renderLastMessage =() => {
        if (typeof lastMessage == 'undefined') {
            return 'Loading...';
        };
        if (lastMessage) {
            if(currentUser?.userid == lastMessage?.userid) return "You: "+ lastMessage?.text;
            return lastMessage?.text;
        }else{
            return 'Say Hi..'
        }
    }
    return (
        <TouchableOpacity onPress={openChatRoom} className={`flex-row justify-between mx-4 items-center gap-3 mb-4 pb-2 ${noBorder ? '' : 'border-b border-b-neutral-200'}`}>
            {/* <Image
                // source={require(${item?.profileUrl})}
                source={{ uri: item?.profileUrl }} // use uri for external URLs
                style={{ height: hp(6), width: hp(6) }}
                className="rounded-full"
            /> */}
            <Image 
                style={{ height: hp(6), width: hp(6), borderRadius: 100}}
                source={{ uri: item?.profileUrl }} // use uri for external URLs
                placeholder={blurhash}
                transition={500}
            />
            <View className="flex-1 gap-1">
                <View className="flex-row justify-between">
                    <Text style={{ fontSize: hp(1.8) }} className="font-semibold text-neutral-800">
                        {item.username}
                    </Text>
                    <Text style={{ fontSize: hp(1.6) }} className="font-medium text-neutral-500">
                        {renderTime()}
                    </Text>
                </View>
                    <Text className="font-medium text-neutral-500" style={{fontSize: hp(1.6)}}>
                        {renderLastMessage()}
                    </Text>
            </View>
        </TouchableOpacity>
    )
}