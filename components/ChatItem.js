import { View, Text, Image } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function ChatItem({ item, index, noBorder, router }) {
    console.log(item, "itemitem")
    return (
        <TouchableOpacity className={`flex-row justify-between mx-4 items-center gap-3 mb-4 pb-2 ${noBorder ? '' : 'border-b border-b-neutral-200'}`}>
            <Image
                // source={require(${item?.profileUrl})}
                source={{ uri: item?.profileUrl }} // use uri for external URLs
                style={{ height: hp(6), width: hp(6) }}
                className="rounded-full"
            />
            <View className="flex-1 gap-1">
                <View className="flex-row justify-between">
                    <Text style={{ fontSize: hp(1.8) }} className="font-semibold text-neutral-800">
                        {item.username}
                    </Text>
                    <Text style={{ fontSize: hp(1.6) }} className="font-medium text-neutral-500">
                        time
                    </Text>
                </View>
                    <Text className="font-medium text-neutral-500" style={{fontSize: hp(1.6)}}>
                        last msg
                    </Text>
            </View>
        </TouchableOpacity>
    )
}