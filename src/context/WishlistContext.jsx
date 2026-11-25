import { createContext, useContext, useEffect, useReducer } from "react";

const WishListContext = createContext(null)

const STORAGE_KEY = "shopsphere-wishlist"

function getUnitialWishList(){
    try{
        const saved = localStorage.getItem(STORAGE_KEY);
        const parsed = saved ? JSON.parse(saved) : [];

        return Array.isArray(parsed) ? parsed : []
    }catch{
        return[]
    }
}

function WishListReducer(state,action){
    switch(action.type){
        case "TOGGLE_WISHLIST":{
            const exist = state.some((item) => item.id === action.payload.id);

            if(exist){
                return state.filter((item) => item.id !== action.payload.id)
            }

            return[...state,action.payload]
        }
        case "Remove_FROM_WISHLIST":
            return state.filter((item)=> item.id !== action.payload)
        case "CLEAR_WHISHLIST":
            return[];
        default:
            return state;
    }
}

export function WishListProvider({children}){
    const[wishlist,dispatch] = useReducer(
        WishListReducer,
        undefined,
        getUnitialWishList
    );

    useEffect(() =>{
        localStorage.setItem(STORAGE_KEY,JSON.stringify(wishlist))
    },[wishlist])

    const toggleWishlist = (product)=>{
        dispatch({
            type:"TOGGLE_WISHLIST",
            payload:product
        })
    }
    const removeFromWishlist = (id)=>{
        dispatch({
            type:"Remove_FROM_WISHLIST",
            payload:id
        })
    }
    const clearWishlist = () =>{
        dispatch({
            type:"CLEAR_WHISHLIST"
        })
    };
    const isInWishlist = (id) => wishlist.some((item)=>item.id == id)

    return(
        <WishListContext.Provider value={{
            wishlist,
            wishlistCount:wishlist.length,
            toggleWishlist,
            removeFromWishlist,
            clearWishlist,
            isInWishlist,
        }}>
            {children}
        </WishListContext.Provider>
    )
}

export function useWishlist(){
    const context = useContext(WishListContext);
    if(!context){
        throw new Error(
            "useWishlist must be used inside WishlistProvider"
        )
    }
    return context;
}