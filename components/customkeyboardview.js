import { View, Text, Platform, KeyboardAvoidingView, ScrollView } from 'react-native'
import React from 'react'
import { KeyboardAvoidingView, ScrollView } from 'react-native-web'

const ios = Platform.OS == 'ios';
const customkeyboardview = ({children}) => {
  return (
    <KeyboardAvoidingView
    behavior={ios? "padding": "height"}
    style={{flex: 1}}
    >
        <ScrollView
        style={{flex: 1}}
        bounces={false}
        showsVerticalScrollIndicator={false}
        >
            {
                children
            }
        </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default customkeyboardview