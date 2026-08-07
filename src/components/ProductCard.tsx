import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { ProductCardProps } from "@/assets/constants/types";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/assets/constants";
import { useWishlist } from "@/context/WishlistContext";

export default function ProductCard({ product }: ProductCardProps) {

  const {toggleWishlist , isInWishlist} = useWishlist()

  const isLiked = isInWishlist(product._id);

  return (
    <Link href={`/Product/${product._id}`} asChild>
      <TouchableOpacity
        style={{
          width: "48%",
          backgroundColor: "white",
          borderRadius: 10,
          marginBottom: 10,
          overflow: "hidden",
          paddingBottom:5
        }}
      >
        <View style={{ position: "relative", height: 200, width: "100%" }}>
          <Image
            source={{ uri: product.images[0] }}
            style={{ width: "100%", height: "100%", resizeMode: "cover" }}
          />

          <TouchableOpacity
            style={{
              position: "absolute",
              top: 7,
              right: 7,
              backgroundColor: "white",
              padding: 4,
              borderRadius: "50%",
              alignItems: "center",
            }}

            onPress={(e)=>{
                e.stopPropagation();
                toggleWishlist(product)
            }}
          >
            <Ionicons
              name={isLiked ? "heart" : "heart-outline"}
              size={20}
              color={isLiked ? 'red' : COLORS.accent}
            />
          </TouchableOpacity>

          {
            product.isFeatured && (
                <View style={{position:'absolute',top:5,left:5,backgroundColor:'black',padding:4,borderRadius:6}}>
                    <Text style={{color:'white', fontSize:12}}>Featured</Text>
                </View>
            )
          }
        </View>

        <View style={{padding:5}}>
            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between', paddingHorizontal:3}}>
                <Ionicons name="star" size={14} color={'#ffd700'}/>
                <Text>4.6</Text>
            </View>

            <Text>{product.name.split(' ').slice(0,4).join(' ')}...</Text>

            <View style={{flexDirection:'row',alignItems:'center'}}>
                <Text style={{fontWeight:'bold'}}>${product.price.toFixed(2)}</Text>
            </View>
        </View>

      </TouchableOpacity>
    </Link>
  );
}
