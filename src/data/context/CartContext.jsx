import { createContext, useContext, useReducer, useState } from "react";
import Cookies from "js-cookie";

const CartContext = createContext();

let rawStte = {
    items: [],
    totalAmount: 0,
}
const initialState = () => {
    let rawStte = {
        items: [],
        totalAmount: 0,
    }
    const cookiesData=localStorage.getItem('cart')
    if(cookiesData){
        rawStte=JSON.parse(cookiesData)
        
        }
        console.log(rawStte)
    return rawStte
}

//reducer function 

const cartReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_ITEM':
            const updatedItems = [...state.items, action.payload];
            const updatedTotalAmount = updatedItems.reduce((total, item) => total + item.price, 0);
            return { items: updatedItems, totalAmount: updatedTotalAmount }
            break;

        case 'REMOVE_ITEM':
            const filteredItems = state.items.filter(item => item.name != action.payload.name);
            const newTotalAmount = filteredItems.reduce((total, item) => total + item.price, 0);
            console.log(filteredItems)
            return { items: filteredItems, totalAmount: newTotalAmount };
            break;
        default:
            return state;
    }
}

//provider component
export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, initialState());
    return (
        <CartContext.Provider value={{ state, dispatch }}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => useContext(CartContext);