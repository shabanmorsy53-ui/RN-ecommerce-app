import { dummyWishlist } from "@/assets/assets";
import { Product, WishlistContextType } from "@/assets/constants/types";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

const WishlistContext = createContext<WishlistContextType | undefined>(
  undefined,
);

export function WishlistProvider({ children }: { children: ReactNode }) {

    const [wishlist , setWishlist] = useState<Product[]>([]);
    const [loading , setLoading] = useState(false);

    const fetchWishList = ()=>{
        setLoading(true);
        setWishlist(dummyWishlist);
        setLoading(false)
    }

    const toggleWishlist =(product:Product)=>{
        const exists = wishlist.find((p)=> p._id === product._id);

        setWishlist((prev)=>{
            if(exists){
                return prev.filter((p)=>p._id !== product._id)
            }
            return [...prev,product]
        })

    }

    const isInWishlist = (productID:string) =>{
        return wishlist.some((p)=> p._id === productID)
    }

    useEffect(()=>{
        fetchWishList();
    },[])


  return (
    <WishlistContext.Provider value={{wishlist,loading,toggleWishlist,isInWishlist} as WishlistContextType}>
        {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist(){
    const context = useContext(WishlistContext);
    if(context === undefined){
        throw new Error('use wishlist must be within a wishlistprovider')
    }
    return context;
};
