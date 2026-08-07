
import { dummyCart } from "@/assets/assets";
import { Product } from "@/assets/constants/types";
import { Children, createContext, ReactNode, useContext, useState } from "react";

export type cartItem = {
    id:string;
    productId:string;
    product:Product;
    quantity:number;
    size:string;
    price:number;
}

type cartContextType = {
    cartItem:cartItem[];
    addToCart : (product:Product,size:string)=>Promise<void>;
    removeFromCart : (itemId:string,size:string)=>Promise<void>;
    upDateQuantity : (itemID:string,quantity:number,size:string)=>Promise<void>;
    clearCart : ()=> Promise<void>;
    cartTotal : number;
    itemCount : number;
    isLoading : boolean;
};



const cartContext = createContext<cartContextType|undefined>(undefined);

export  function CartProvider({children}:{children:ReactNode}){

    const [cartItems , setCartItems] = useState<cartItem[]>([]);
    const [isLoading , setIsLoading] = useState(false);
    const [cartTotal , setCartTotal] = useState(0);

    const fetchCart = async () => {
        setIsLoading(true);
        const serverCart = dummyCart;
        const mappedItem : cartItem[] = serverCart.items.map((item:any)=>({
            id:item.product._id,
            productId:item.product._id,
            product:item.product,
            quantity:item.quantity,
            size:item?.size || 'M',
            price:item.price,
        }));

        setCartItems(mappedItem);
        setCartTotal(serverCart.totalAmount);
        setIsLoading(false);
    }


    return(
        <cartContext.Provider value={{}}>
            {children}
        </cartContext.Provider>
    )
}


export function useCart(){
    const context = useContext(cartContext);
    if(context === undefined){
        throw new Error('use cart must be within a CartProvider')
    }
    return context;
};
