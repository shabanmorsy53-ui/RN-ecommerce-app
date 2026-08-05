import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { CategoryItemProps } from '@/assets/constants/types'
import { Ionicons } from '@expo/vector-icons'
import { COLORS } from '@/assets/constants'


export default function CategoryItem({item,isSelected,onPress}:CategoryItemProps){
  return (
    <TouchableOpacity style={{marginRight:10,alignItems:'center'}} onPress={onPress}>
      <View style={{width:45,height:45,borderRadius:42.5,
        flexDirection:'row',justifyContent:'center',alignItems:'center',
        backgroundColor:isSelected ? '#3B82F6':'#FFFFFF',
        marginBottom:5}}>
        <Ionicons name={item.icon as any} size={24} color={isSelected ? '#fff' : COLORS.primary } style={{textAlign:'center'}}/>
      </View>

      <Text>{item.name}</Text>
    </TouchableOpacity>
  )
}