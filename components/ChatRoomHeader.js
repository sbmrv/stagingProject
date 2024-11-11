import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { TouchableOpacity } from 'react-native'
import { Entypo, Ionicons } from '@expo/vector-icons'
import { Image } from 'expo-image'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const ChatRoomHeader = ({ user, router }) => {
  return (
    <Stack.Screen
      options={{
        title: "",
        headerShadowVisible: false,
        headerLeft: () => (
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <TouchableOpacity onPress={() => router.back()}>
              <Entypo name="chevron-left" size={hp(4)} color="#737373" />
            </TouchableOpacity>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <Image
                source={{ uri: user?.profileUrl }}
                style={{ height: hp(4.5), aspectRatio: 1, borderRadius: 100 }}
              />
              <Text style={{ fontSize: hp(2.5), color: '#737373', fontWeight: '500' }}>
                {user?.username}
              </Text>
            </View>
          </View>
        ),
        headerRight: () => (
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 18, marginRight: 8 }}>
            <Ionicons name="call" size={hp(2.8)} color="#737373" />
            <Ionicons name="videocam" size={hp(2.8)} color="#737373" />
          </View>
        ),
      }}
    />
  );
};

export default ChatRoomHeader;
