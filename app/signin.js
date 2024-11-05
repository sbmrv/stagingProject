import { View, Text, Image } from 'react-native'
import React from 'react'
import { useRouter } from "expo-router";
import { StatusBar, TextInput, TouchableOpacity } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Octicons, FontAwesome } from '@expo/vector-icons';

const signin = () => {
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
            Login
          </Text>
          <View className="gap-6">
            <View style={{ height: hp(7) }} className="flex-row gap-4 px-4 bg-neutral-100 items-center rounded-xl">
              <Octicons name='mail' size={hp(2.7)} color="gray" />
              <TextInput
                style={{ fontSize: hp(2) }}
                className="flex-1 font-semibold text-neutral-700"
                placeholder='Email Address' signup
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
              backgroundColor: '#101010', // Green color
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
                Login
              </Text>
            </TouchableOpacity>
          </View>
          {/* Line and Text */}
          <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 20, gap: 15 }}>
            <View style={{ flex: 1, height: 1, backgroundColor: '#ccc' }} />
            <Text style={{ marginHorizontal: 10, fontWeight: 'bold' }}>or continue with</Text>
            <View style={{ flex: 1, height: 1, backgroundColor: '#ccc' }} />
          </View>
          {/* Social Media Login Buttons */}
          {/* Social Media Login Buttons */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 20, gap: 8 }}>
            <TouchableOpacity style={{
              width: hp(6), // Make this equal to the height to create a circle
              height: hp(6),
              backgroundColor: '#4285F4',
              borderRadius: hp(3), // Half of the width and height
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <FontAwesome name="google" size={hp(3)} color="white" />
            </TouchableOpacity>

            <TouchableOpacity style={{
              width: hp(6),
              height: hp(6),
              backgroundColor: '#4267B2',
              borderRadius: hp(3),
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <FontAwesome name="facebook" size={hp(3)} color="white" />
            </TouchableOpacity>

            <TouchableOpacity style={{
              width: hp(6),
              height: hp(6),
              backgroundColor: '#1DA1F2',
              borderRadius: hp(3),
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <FontAwesome name="twitter" size={hp(3)} color="white" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => router.push('/signup')} style={{ marginTop: 20 }}>
            <Text style={{ fontSize: hp(1.8), color: '#101010', textAlign: 'center', fontWeight: '600' }}>
              Don’t have an account? <Text style={{ fontSize: hp(1.8), color: '#4CAF50', textAlign: 'center', fontWeight: '600' }}>Register now</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default signin