import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Product } from "@/assets/constants/types";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { dummyProducts } from "@/assets/assets";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "@/assets/constants";
import { Ionicons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";

const width = Dimensions.get("window").width;

export default function ProductDetalis() {
  const { id } = useLocalSearchParams();

  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const { addToCart, cartItem } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const fetchProduct = async () => {
    setProduct(dummyProducts.find((p) => p._id === id) as any);
    setLoading(false);
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <SafeAreaView
        style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
      >
        <ActivityIndicator size="large" color={COLORS.primary} />
      </SafeAreaView>
    );
  }

  if (!product) {
    return (
      <SafeAreaView
        style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
      >
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 20,
            textTransform: "capitalize",
          }}
        >
          product not found
        </Text>
      </SafeAreaView>
    );
  }

  const isLiked = isInWishlist(product._id);

  const handleAddToCart = () => {
    if (!selectedSize) {
      Toast.show({
        type: "info",
        text1: "No Selected Size",
        text2: "please select asize",
      });
      return;
    }

    addToCart(product, selectedSize || "");
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView style={{ paddingBottom: 100 }}>
        <View
          style={{
            position: "relative",
            height: 450,
            alignItems: "center",
          }}
        >
          <ScrollView
            pagingEnabled
            horizontal
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={16}
            onScroll={(e) => {
              const slide = Math.ceil(
                e.nativeEvent.contentOffset.x /
                  e.nativeEvent.layoutMeasurement.width,
              );
              if (slide !== activeImageIndex) {
                setActiveImageIndex(slide);
              }
            }}
          >
            {product.images?.map((img) => (
              <Image
                source={{ uri: img }}
                style={{ width: width, height: 450, resizeMode: "cover" }}
              />
            ))}
          </ScrollView>

          <View
            style={{
              position: "absolute",
              top: 40,
              left: 20,
              backgroundColor: "white",
              padding: 5,
              borderRadius: "50%",
            }}
          >
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={24} color={COLORS.primary} />
            </TouchableOpacity>
          </View>

          <View
            style={{
              position: "absolute",
              top: 40,
              right: 20,
              backgroundColor: "white",
              padding: 5,
              borderRadius: "50%",
            }}
          >
            <TouchableOpacity onPress={() => toggleWishlist(product)}>
              <Ionicons
                name={isLiked ? "heart" : "heart-outline"}
                size={24}
                color={isLiked ? "red" : COLORS.primary}
              />
            </TouchableOpacity>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 3,
              justifyContent: "center",
              position: "absolute",
              bottom: 6,
            }}
          >
            {product.images?.map((_, index) => (
              <View
                style={{
                  height: 10,
                  borderRadius: 2,
                  width: index === activeImageIndex ? 20 : 4,
                  backgroundColor: index === activeImageIndex ? "#777" : "#000",
                }}
              />
            ))}
          </View>
        </View>

        <View style={{ padding: 10 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
                marginRight: 10,
                flex: 1,
                textTransform: "capitalize",
                fontSize: 20,
              }}
            >
              {product.name}
            </Text>

            <View
              style={{
                flexDirection: "row",
                gap: 5,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Ionicons name="star" color={"#ffd700"} size={14} />
              <Text style={{ fontWeight: "bold" }}>6.4</Text>
              <Text style={{ color: "#777" }}>(85)</Text>
            </View>
          </View>

          <Text style={{ fontWeight: "bold", fontSize: 18, marginVertical: 5 }}>
            ${product.price.toFixed(2)}
          </Text>

          {product.sizes && product.sizes.length > 0 && (
            <>
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 15,
                  marginTop: 20,
                  marginLeft: 10,
                }}
              >
                Size:
              </Text>

              <View style={{ flexDirection: "row", gap: 20, padding: 10 }}>
                {product.sizes.map((size, index) => (
                  <TouchableOpacity
                    onPress={() => {
                      setSelectedSize(size);
                    }}
                    style={{
                      backgroundColor: selectedSize === size ? "black" : "#777",
                      width: 35,
                      height: 35,
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: 17.5,
                    }}
                  >
                    <Text style={{ color: "white" }}>{size}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </>
          )}

          <Text style={{ fontWeight: "bold", fontSize: 18, padding: 5 }}>
            Description:
          </Text>
          <Text style={{ marginVertical: 5, color: "#b8b2b2" }}>
            {product.description}
          </Text>
        </View>
      </ScrollView>

      <View
        style={{
          flexDirection: "row",
          backgroundColor: "white",
          bottom: 0,
          padding: 20,
          justifyContent: "space-between",
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: "black",
            width: "50%",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: 5,
            padding: 10,
            borderRadius: 20,
          }}
          onPress={() => handleAddToCart()}
        >
          <Ionicons name="bag-outline" size={20} color={"white"} />
          <Text style={{ color: "white" }}>Add To Cart</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("/(tabs)/cart")}
          style={{
            position: "relative",
            width: "20%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Ionicons name="bag-outline" size={28} color={"black"} />
          <View
            style={{
              backgroundColor: "red",
              width: 20,
              height: 20,
              borderRadius: 10,
              position: "absolute",
              top: 2,
              right: 6,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ color: "white" }}>0</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
