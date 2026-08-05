import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import React from "react";
import { HeaderProps } from "@/assets/constants/types";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function Header({
  title,
  showCart,
  showSearch,
  showBack,
  showMenu,
  showLogo,
}: HeaderProps) {
  const router = useRouter();
  const {itemCount} = {itemCount:6};

  return (
    <View style={styles.headerContainer}>
      <View style={styles.left}>
        {showBack && (
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color={"#000"} />
          </TouchableOpacity>
        )}

        {showMenu && (
            <TouchableOpacity>
                <Ionicons name="menu-outline" size={28} color={'#000'}/> 
            </TouchableOpacity>
        )}

        {
            showLogo ? (
                <View style={styles.imageLogo}>
                    <Image source={require('../../assets/logo.png')} style={styles.logo}/>
                </View>
            ) : title && (<Text style={styles.title}>{title}</Text>)
        }

        {(!title && !showSearch) && <View style={{flex:1}}/>}
      </View>

      <View style={styles.right}>

        {
            showSearch && (
                <TouchableOpacity>
                    <Ionicons name="search-outline" size={26} color={'#000'}/>
                </TouchableOpacity>
            )
        }

        {
            showCart && (
                <TouchableOpacity onPress={()=> router.push('/(tabs)/cart')}>
                    <View style={styles.countDiv}>
                        <Ionicons name="bag-outline" size={26} color={'#000'}/>
                        <View style={styles.bigCount}>
                            <Text style={styles.count}>{itemCount}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            )
        }

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "white",
    paddingVertical: 8,
    paddingHorizontal: 7,
  },

  left: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
  },

  imageLogo:{
    flex:1,
  },

  logo:{
    width:'100%',
    height:24,
    resizeMode:'contain',
  },

  title:{
    fontWeight:'bold',
    marginRight:10,
    textAlign:'center',
    flex:1,
    textTransform:'capitalize',
    fontSize:20,
  },

  right:{
    flexDirection:'row',
    alignItems:'center',
    gap:4,
  },

  countDiv:{
    position:'relative',
    marginRight:8,
  },

  bigCount:{
    backgroundColor:'red',
    justifyContent:'center',
    alignItems:'center',
    width:16,
    height:16,
    borderRadius:8,
    position:'absolute',
    right:-5,
    top:-1,
  },

  count:{
    color:'white',
    fontSize:10,
  },

});
