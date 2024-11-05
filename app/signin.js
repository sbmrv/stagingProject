import { View, Text, Image } from 'react-native'
import React from 'react'
import { StatusBar, TextInput, TouchableOpacity } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Octicons } from '@expo/vector-icons';

const signin = () => {
  return (
    <View className="flex-1">
      <StatusBar style="dark" />
      <View style={{ paddingTop: hp(8), paddingHorizontal: wp(5) }} className="flex-1 gap-12">
        <View className="items-center">
          <Image style={{ height: hp(25) }} resizeMode="contain" source={require('../assets/images/3094352.jpg')} />
        </View>
        <View className="gap-20">
          <Text style={{ fontSize: hp(4) }} className="font-bold tracking-wider text-center text-natural-800">
            Sign In
          </Text>
          <View className="gap-4">
            <View style={{ height: hp(7) }} className="flex-row gap-4 px-4 bg-neutral-100 items-center rounded-xl">
              <Octicons name='mail' size={hp(2.7)} color="gray" />
              <TextInput
                style={{ fontSize: hp(2) }}
                className="flex-1 font-semibold text-neutral-700"
                placeholder='Email Address'
                placeholderTextColor={'gray'}
              />
            </View>
            <View className="gap-3">
              <View style={{ height: hp(7) }} className="flex-row gap-4 px-4 bg-neutral-100 items-center rounded-xl">
                <Octicons name='lock' size={hp(2.7)} color="gray" />
                <TextInput
                  style={{ fontSize: hp(2) }}
                  className="flex-1 font-semibold text-neutral-700"
                  placeholder='Password'
                  placeholderTextColor={'gray'}
                  />
              </View>
              <Text style={{ fontSize: hp(1.8) }} className="font-semibold text-right text-natural-500">Forgot password?</Text>
            </View>

            <TouchableOpacity style={{
              height: hp(6.5),
              backgroundColor: '#4CAF50', // Green color
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
              paddingHorizontal: 16,
            }}>
              <Text style={{
                color: 'white',
                fontSize: hp(2.2),
                fontWeight: 'bold',
              }}>
                Submit
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  )
}

export default signin