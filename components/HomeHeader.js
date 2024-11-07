import { View, Text, Platform } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Image } from 'expo-image';
import { blurhash } from '../utils/common'
import { useAuth } from '../context/authContext';

const ios = Platform.OS == 'ios';

export default function HomeHeader() {
  const { user } = useAuth()
   const {top} = useSafeAreaInsets();
  return (
    <View style={{paddingTop: ios? top: top+10}} className="flex-row justify-between px-5 bg-neutral-700 pb-6 rounded-b-3xl shadow">
      <View>
        <Text style={{fontSize: hp(3)}} className="bold font-medium text-white">
          Chats
        </Text>
      </View>
      <View>
        <Image
          style={{ height: hp(4.3), aspectRatio: 1, borderRadius: 100 }}
          source={user?.profileUrl}
          placeholder={{ blurhash }}
          transition={1000}
        />
      </View>
    </View>
  )
}
