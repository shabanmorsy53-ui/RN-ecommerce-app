import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Product } from "@/assets/constants/types";
import { dummyProducts } from "@/assets/assets";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/components/Header";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/assets/constants";
import ProductCard from "@/components/ProductCard";

export default function Shop() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchProduct = async (pageNumber = 1) => {
    if (pageNumber === 1) {
      setLoading(true);
    } else {
      setLoadingMore(true);
    }

    try {
      const start = (pageNumber - 1) * 10;
      const end = start + 10;

      const paginateData = dummyProducts.slice(start, end);
      if (pageNumber === 1) {
        setProducts(paginateData);
      } else {
        setProducts((prev) => [...prev, ...paginateData]);
      }

      setHasMore(end < dummyProducts.length);
      setPage(pageNumber);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const loadMore = () => {
    if (!loadMore && !loading && hasMore) {
      fetchProduct(page + 1);
    }
  };

  useEffect(() => {
    fetchProduct(1);
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header title="Shop" showBack showCart />

      <View
        style={{
          flexDirection: "row",
          marginBottom: 2,
          marginVertical: 4,
          gap: 5,
          alignItems: "center",
          marginLeft: 5,
          borderRadius: 10,
          marginRight: 5,
        }}
      >
        <View
          style={{
            backgroundColor: "white",
            borderRadius: 5,
            flexDirection: "row",
            flex: 1,
            alignItems: "center",
            gap: 10,
            padding: 2,
          }}
        >
          <Ionicons name="search" color={COLORS.primary} size={24} />
          <TextInput
            placeholder="searchProducts..."
            style={{ color: "black" }}
            placeholderTextColor={"#777"}
            returnKeyType="search"
          />
        </View>

        <TouchableOpacity
          style={{
            backgroundColor: "black",
            width: 40,
            height: 40,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 5,
          }}
        >
          <Ionicons name="options-outline" color={"white"} size={24} />
        </TouchableOpacity>
      </View>

      {loading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size={"large"} color={COLORS.primary} />
        </View>
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item._id}
          numColumns={2}
          renderItem={({ item }) => <ProductCard product={item} />}
          contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            loadingMore ? (
              <View>
                <ActivityIndicator color={COLORS.primary} size={"small"} />
              </View>
            ) : null
          }
          ListEmptyComponent={
            !loading && (
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text>No Product Found</Text>
              </View>
            )
          }
        />
      )}
    </SafeAreaView>
  );
}
