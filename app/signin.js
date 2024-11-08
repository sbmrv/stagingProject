import { View, Text, Image, Alert, StyleSheet, SafeAreaView } from 'react-native'
import React, { useRef, useState } from 'react'
import { useRouter } from "expo-router";
import { StatusBar, TextInput, TouchableOpacity } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Octicons, FontAwesome } from '@expo/vector-icons';
import Loading from '../components/Loading'
import CustomkeyboardView from '../components/CustomkeyboardView'
import { useAuth } from '../context/authContext';

const signin = () => {
  const [loading,  setLoading] = useState(false);
  const router = useRouter()
  const {login} = useAuth();

  const emailRef = useRef("")
  const passwordRef = useRef("")

  const handleLogin = async () => {
    if (!emailRef.current || !passwordRef.current) {
      Alert.alert("Sign In", "Please fill all the fields")
      return;
    }
    setLoading(true);
    const response = await login(emailRef.current, passwordRef.current);
    setLoading(false);
    console.log("signin respo:",response)
    if (!response?.success) {
      Alert.alert("Sign in", response?.msg)
    }
  }
  
  return (
    <CustomkeyboardView>
    <View className="flex-1">
      <StatusBar style="dark" />
      <View style={{ paddingTop: hp(8), paddingHorizontal: wp(5) }} className="flex-1 gap-12">
        <View className="items-center">
          <Image style={{ height: hp(12) }} resizeMode="contain" source={require('../assets/images/swapna_logo.png')} />
        </View>
        <View className="gap-10">
          <Text style={{ fontSize: hp(4) }} className="font-bold tracking-wider text-center text-natural-800">
            Login
          </Text>
          <View className="gap-6">
            <View style={{ height: hp(7) }} className="flex-row gap-4 px-4 bg-neutral-100 items-center rounded-xl">
              <Octicons name='mail' size={hp(2.7)} color="gray" />
              <TextInput
                onChangeText={value=> emailRef.current=value}
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
                onChangeText={value=> passwordRef.current=value}
                  style={{ fontSize: hp(2) }}
                  className="flex-1 font-semibold text-neutral-700"
                  placeholder='Password'
                  placeholderTextColor={'gray'}
                  secureTextEntry={true}
                  />
              </View>
              <Text style={{ fontSize: hp(1.8) }} className="font-semibold text-right text-natural-500">Forgot password?</Text>
            </View>

            <View>
              {
                loading? (
                  <View className="flex-row justify-center" style={{ height: hp(6.5) }}>
                    <Loading size={hp(6.5)} />
                  </View>
                ):(
                  <TouchableOpacity 
                    onPress={handleLogin}
                    style={{
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
                )
              }
            </View>
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
              Don’t have an account? <Text style={{ fontSize: hp(1.8), color: '#0000EE', textAlign: 'center', fontWeight: '600' }}>Register now</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
    </CustomkeyboardView>
  )
}

export default signin


// import { Feather } from '@expo/vector-icons';
// import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

// export default function signin() {
//   return (
//     <CustomkeyboardView>
//     <SafeAreaView style={styles.container}>
//       <StatusBar barStyle="dark-content" />

//       {/* Header */}
//       <View style={styles.header}>
//         {/* <Feather name="utensils" size={24} color="#000" /> */}
//         <FontAwesome5 name="utensils" size={24} color="black" />
//         <Text style={styles.headerTitle}>Foodie Match</Text>
//         <Feather name="heart" size={24} color="#000" />
//       </View>

//       {/* Main Image */}
//       <View style={styles.imageContainer}>
//         <Image
//           source={require('../assets/images/heartlogin.png')}
//           style={styles.mainImage}
//           resizeMode="cover"
//         />
//       </View>

//       {/* Login Options */}
//       <View style={styles.loginContainer}>
//         <TouchableOpacity style={styles.loginButton} onPress={() => { }}>
//           <Feather name="mail" size={24} color="#000" />
//           <Text style={styles.buttonText}>Sign up with Email</Text>
//         </TouchableOpacity>

//         <TouchableOpacity style={styles.loginButton} onPress={() => { }}>
//             <FontAwesome name="google" size={hp(3)} color="black" />
//             <Image
//               source={require('../assets/images/googleicon.png')}
//               style={styles.iconImage}
//             />
//           <Text style={styles.buttonText}>Sign in with Apple</Text>
//         </TouchableOpacity>

//         <TouchableOpacity style={styles.loginButton} onPress={() => { }}>
//             <Image
//               source={require('../assets/images/appleicon.png')}
//               style={styles.iconImage}
//             />
//           <Text style={styles.buttonText}>Sign in with Google</Text>
//         </TouchableOpacity>

//         <TouchableOpacity onPress={() => { }}>
//           <Text style={styles.guestText}>Continue as Guest</Text>
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//     </CustomkeyboardView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//   },
//   headerTitle: {
//     fontSize: 20,
//     fontWeight: '600',
//   },
//   imageContainer: {
//     width: '100%',
//     height: 400,
//     marginVertical: 20,
//   },
//   mainImage: {
//     width: '100%',
//     height: '100%',
//     borderRadius: 20,
//   },
//   loginContainer: {
//     paddingHorizontal: 20,
//     gap: 16,
//   },
//   loginButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#F5F5F5',
//     padding: 16,
//     borderRadius: 100,
//     gap: 12,
//   },
//   buttonText: {
//     fontSize: 16,
//     fontWeight: '500',
//     color: '#000',
//   },
//   iconImage: {
//     width: 24,
//     height: 24,
//   },
//   guestText: {
//     fontSize: 16,
//     fontWeight: '500',
//     color: '#000',
//     textAlign: 'center',
//     marginTop: 8,
//   },
// });