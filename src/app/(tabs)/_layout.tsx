import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { Feather, Ionicons } from '@expo/vector-icons'

export default function TapLayout() {
  return (

    <Tabs
    screenOptions={{
        headerShown:false,
        tabBarActiveTintColor:'black',
        tabBarInactiveTintColor:'#cdcde0',
        tabBarShowLabel:false,
        tabBarStyle:{
            backgroundColor:'#fff',
            borderTopWidth:1,
            borderTopColor:'#f0f0f0',
            height:56,
            paddingTop:8,
        }
    }}>
        <Tabs.Screen name='index' options={{tabBarIcon:({focused,color})=> <Ionicons 
        name={focused? 'home':'home-outline'} size={26} color={color}/>}}/>

        <Tabs.Screen name='cart' options={{tabBarIcon:({focused,color})=> <Feather 
        name={focused? 'shopping-cart' : 'shopping-cart'} size={26} color={color}/>}}/>

        <Tabs.Screen name='favourite' options={{tabBarIcon:({focused,color})=><Ionicons
        name={focused?'heart':'heart-outline'} size={26} color={color}/>}}/>

        <Tabs.Screen name='profile' options={{tabBarIcon:({focused,color})=><Ionicons
        name={focused?'person':'person-outline'} size={26} color={color}/>}}/>
    </Tabs>

  )
}