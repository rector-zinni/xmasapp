import { createContext,useContext,useReducer,useState } from "react";

const CartContext=createContext();


const initialState={
    items:[],
    totalAmount:0,
}

//reducer function 

const cartReducer=(state,action)=>{
    switch(action.type){
        case 'ADD_ITEM':
            const updatedItems=[...state.items,action.payload];
            const updatedTotalAmount=updatedItems.reduce((total,item)=>total+item.price,0);
            return {items:updatedItems,totalAmount:updatedTotalAmount}

        case 'REMOVE_ITEM':
            const filteredItems=state.items.filter(item=>item.id!=action.payload.id);
            const newTotalAmount=filteredItems.reduce((total,item)=>total+item.price,0);
            return {items:updatedItems,totalAmount:newTotalAmount};
        default:
            return state;
    }
}

//provider component
export const CartProvider=({children})=>{
    const [state,dispatch] = useReducer(cartReducer,initialState);
    return(
        <CartContext.Provider value={{state,dispatch}}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart=()=>useContext(CartContext);