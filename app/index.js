// screens/HomeScreen.js
import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import "../global.css";

export default function StartPage() {
  return (
    <View className="flex-1 justify-center items-center">
      <ActivityIndicator size="large" color="gray" />
    </View>
  );
};
