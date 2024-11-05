import { View, Text, Image } from 'react-native'
import React from 'react'
import { useRouter } from "expo-router";
import { StatusBar, TextInput, TouchableOpacity } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Octicons, FontAwesome } from '@expo/vector-icons';
export default function Signup() {
  const router = useRouter()

  return (
    <View className="flex-1">
      <StatusBar style="dark" />
      <View style={{ paddingTop: hp(8), paddingHorizontal: wp(5) }} className="flex-1 gap-12">
        <View className="items-center">
          <Image style={{ height: hp(15) }} resizeMode="contain" source={require('../assets/images/swapna_logo.png')} />
        </View>
        <View className="gap-10">
          <Text style={{ fontSize: hp(4) }} className="font-bold tracking-wider text-center text-natural-800">
            Sign Up
          </Text>
          <View className="gap-4">
            {/* First Name Input */}
            <View style={{ height: hp(7) }} className="flex-row gap-4 px-4 bg-neutral-100 items-center rounded-xl">
              <Octicons name='person' size={hp(2.7)} color="gray" />
              <TextInput
                style={{ fontSize: hp(2) }}
                className="flex-1 font-semibold text-neutral-700"
                placeholder='First Name'
                placeholderTextColor={'gray'}
              />
            </View>

            {/* Last Name Input */}
            <View style={{ height: hp(7) }} className="flex-row gap-4 px-4 bg-neutral-100 items-center rounded-xl">
              <Octicons name='person' size={hp(2.7)} color="gray" />
              <TextInput
                style={{ fontSize: hp(2) }}
                className="flex-1 font-semibold text-neutral-700"
                placeholder='Last Name'
                placeholderTextColor={'gray'}
              />
            </View>

            {/* Email Address Input */}
            <View style={{ height: hp(7) }} className="flex-row gap-4 px-4 bg-neutral-100 items-center rounded-xl">
              <Octicons name='mail' size={hp(2.7)} color="gray" />
              <TextInput
                style={{ fontSize: hp(2) }}
                className="flex-1 font-semibold text-neutral-700"
                placeholder='Email Address'
                placeholderTextColor={'gray'}
              />
            </View>

            {/* Password Input */}
            <View style={{ height: hp(7) }} className="flex-row gap-4 px-4 bg-neutral-100 items-center rounded-xl">
              <Octicons name='lock' size={hp(2.7)} color="gray" />
              <TextInput
                style={{ fontSize: hp(2) }}
                className="flex-1 font-semibold text-neutral-700"
                placeholder='Password'
                placeholderTextColor={'gray'}
                secureTextEntry={true}
              />
            </View>

            {/* Sign Up Button */}
            <TouchableOpacity style={{
              height: hp(6.5),
              backgroundColor: '#101010',
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
                Sign Up
              </Text>
            </TouchableOpacity>

            {/* Divider with Text */}
            <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 20, gap: 15 }}>
              <View style={{ flex: 1, height: 1, backgroundColor: '#ccc' }} />
              <Text style={{ fontWeight: 'bold' }}>or continue with</Text>
              <View style={{ flex: 1, height: 1, backgroundColor: '#ccc' }} />
            </View>

            {/* Link to Sign In */}
            <TouchableOpacity onPress={() => router.push('/signin')} >
              <Text style={{ fontSize: hp(1.8), color: '#101010', textAlign: 'center', fontWeight: '600' }}>
                Already have an account? <Text style={{ color: '#4CAF50', fontWeight: '600' }}>Login now</Text>
              </Text>
            </TouchableOpacity>
          </View>

        </View>
      </View>
    </View>
  )
}