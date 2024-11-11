import { View, Text, Platform } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Image } from 'expo-image';
import { blurhash } from '../utils/common'
import { useAuth } from '../context/authContext';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import { MenuItems } from './CustomMenuItems';
import { Octicons, FontAwesome, Feather, AntDesign } from '@expo/vector-icons';


const ios = Platform.OS == 'ios';

export default function HomeHeader() {
  const { user, logout } = useAuth()
  const { top } = useSafeAreaInsets();

  const handleProfile = () => {

  }

  const handleLogout = async()=>{
      await logout()

  }
  return (
    <View style={{ paddingTop: ios ? top : top + 10 }} className="flex-row justify-between px-5 bg-neutral-700 pb-6 rounded-b-3xl shadow">
      <View>
        <Text style={{ fontSize: hp(3) }} className="bold font-medium text-white">
          Chats
        </Text>
      </View>
      <View>
        <Menu>
          <MenuTrigger customStyles={{
            triggerWrapper: {
              // trigger wrapper styles
            }
          }}>
            <Image
              style={{ height: hp(4.3), aspectRatio: 1, borderRadius: 100 }}
              source={user?.profileUrl}
              placeholder={{ blurhash }}
              transition={1000}
            />
          </MenuTrigger>
          <MenuOptions
            customStyles={{
              optionsContainer: {
                borderRadius: 10,
                borderCurve: 'continuous',
                marginTop: 40,
                marginLeft: -30,
                backgroundColor: 'white',
                shadowOpacity: 0.2,
                shadowOffset: {widht: 0, height: 0},
                width: 160
              }
            }}
          >
            {/* <MenuOption onSelect={() => alert(`Save`)} text='Save' />
            <MenuOption onSelect={() => alert(`Delete`)} >
              <Text style={{ color: 'red' }}>Delete</Text>
            </MenuOption>
            <MenuOption onSelect={() => alert(`Not called`)} disabled={true} text='Disabled' /> */}
            <MenuItems
              text="Profile"
              action={handleProfile}
              value={null}
              icon={<Feather name='user' size={hp(2.5)} color="#737373" />}
            />
            < Divider/>
            <MenuItems
              text="Logout"
              action={handleLogout}
              value={null}
              icon={<AntDesign name="logout" size={hp(2.3)} color="#737373" />}
            />
          </MenuOptions>
        </Menu>
      </View>
    </View>
  )
}

const Divider =()=>{
  return (
    <View className="p-[1px] w-full bg-neutral-200" />
  )
}