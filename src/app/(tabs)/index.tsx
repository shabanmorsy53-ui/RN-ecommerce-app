import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/components/Header";
import { BANNERS, dummyProducts } from "@/assets/assets";
import { Dimensions } from "react-native";
import { CATEGORIES } from "@/assets/constants";
import CategoryItem from "@/components/CategoryItem";
import { useRouter } from "expo-router";
import { Product } from "@/assets/constants/types";
import ProductCard from "@/components/ProductCard";

const width = Dimensions.get("window").width;

export default function Home() {

  const router = useRouter()  

  const [active, setActive] = useState(0);
  const [products , setProducts] = useState<Product[]>([]);
  const [loading , setLoading] = useState(true);

  const fetchProduct = async ()=>{
    setProducts(dummyProducts);
    setLoading(false)
  }

  useEffect(()=>{
    fetchProduct()
  },[])

  const categories = [{id:'all',name:'All',icon:'grid'},...CATEGORIES]

  return (
    <SafeAreaView style={Styles.container} edges={["top"]}>
      <Header showMenu showLogo showCart title="forever" />

      <ScrollView
        style={{ flex: 1, padding: 10 }}
        showsVerticalScrollIndicator={false}
      >

        <View style={{marginBottom:10}}>

            <ScrollView
            horizontal
            scrollEventThrottle={16}
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            style={{ width: "100%", height: 170, borderRadius: 10 }}
            onScroll={(e)=>{
                const slide = Math.ceil(e.nativeEvent.contentOffset.x/e.nativeEvent.layoutMeasurement.width)
                if(slide !== active){
                    setActive(slide)
                }
            }}
            >
            {BANNERS.map((banner, index) => (
                <View
                key={index}
                style={{
                    width: width - 12,
                    position: "relative",
                    overflow: "hidden",
                }}
                >
                <Image
                    source={{ uri: banner.image }}
                    style={{ width: "100%", height: "100%", resizeMode: "cover" }}
                />

                <View
                    style={{
                    position: "absolute",
                    bottom: 10,
                    left: 10,
                    zIndex: 10,
                    }}
                >
                    <Text
                    style={{ color: "white", fontWeight: "bold", fontSize: 20 }}
                    >
                    {banner.title}
                    </Text>
                    <Text
                    style={{ fontSize: 12, color: "white", marginVertical: 5 }}
                    >
                    {banner.subtitle}
                    </Text>
                    <TouchableOpacity
                    style={{
                        backgroundColor: "white",
                        paddingVertical: 8,
                        borderRadius: 10,
                    }}
                    >
                    <Text style={{ textAlign: "center", fontWeight: "bold" }}>
                        GET NOW
                    </Text>
                    </TouchableOpacity>
                </View>

                <View
                    style={{
                    width: "100%",
                    height: "100%",
                    zIndex: 1,
                    backgroundColor: "rgba(0,0,0,0.3)",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    }}
                />
                </View>
            ))}
            </ScrollView>

            <View
            style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 3,
                justifyContent: "center",
                marginTop: 7,
            }}
            >
            {BANNERS.map((_, index) => (
                <View
                style={{
                    height: 10,
                    borderRadius: 2,
                    width: index === active ? 20 : 4,
                    backgroundColor: index === active ? "#777" : "#000",
                }}
                />
            ))}
            </View>

        </View>

        <View style={{marginBottom:10}}>
            <View style={{flexDirection:'row',alignItems:'center',paddingHorizontal:5,justifyContent:'space-between',marginBottom:10,}}>
                <Text style={{fontWeight:'bold',fontSize:18}}>Categories :</Text>
            </View>

            
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {
                    categories.map((cat,index)=>(
                        <CategoryItem item={cat} isSelected={false}
                         onPress={()=>router.push({pathname:'/shop', 
                            params:{category : cat.id === 'all' ? '' : cat.name }})}/>
                    ))
                }
            </ScrollView>

        </View>

        <View style={{marginBottom:10}}>

          <View style={{flexDirection:'row',justifyContent:"space-between",alignItems:'center',paddingHorizontal:5,paddingVertical:10}}>
            <Text style={{fontWeight:'bold', fontSize:15}}>Popular</Text>

            <TouchableOpacity onPress={()=> router.push('/shop')}>
                <Text style={{color:'blue'}}>See All</Text>
            </TouchableOpacity>
          </View>

          {
            loading ? (
                <ActivityIndicator size='large'/>
            ) : (
                <View style={{flexDirection:'row',flexWrap:'wrap',alignItems:'center',justifyContent:'space-between',marginVertical:10,}}>
                    {
                        products.slice(0,4).map((product,index)=>(
                            <ProductCard product={product} key={index}/>
                        ))
                    }
                </View>
            )
          }

        </View>

        <View style={{backgroundColor:'white',padding:10,borderRadius:10,marginBottom:20,alignItems:'center'}}>
            <Text style={{fontWeight:'bold' , fontSize:15,textTransform:'capitalize'}}>Join the Resoulation</Text>
            <Text  style={{fontSize:12,marginBlock:5,color:'#777',textTransform:'capitalize',textAlign:'center'}}>subscribe to our newsletter and get 10% off on your first purchase.</Text>

            <TouchableOpacity style={{backgroundColor:'black',padding:10,marginTop:5,borderRadius:10,width:'80%'}}>
                <Text style={{textAlign:'center',color:'white'}}>Subscribe Now</Text>
            </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
