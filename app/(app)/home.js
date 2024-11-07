import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { useAuth } from '../../context/authContext'

export default function home() {
  const { logout, user } = useAuth();

  const handleLogout = async () => {
    await logout();
  }
  console.log('user Data:', user)

  return (
    <View className= "flex-1 bg-white">
      <Text>home</Text>
      <Pressable onPress={handleLogout}>
        <Text> Sign out </Text>
      </Pressable>
    </View>
  )
}