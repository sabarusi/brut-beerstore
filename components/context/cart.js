import { cartMap } from '@/utils/cart';
import { useDisclosure } from '@chakra-ui/react';
import React,{useState,createContext, useEffect} from 'react'

export const CartContext = createContext();

export const CartProvider = ({children}) => {
    const [cart, setCart] = useState([]);
    const { isOpen, onOpen, onClose } = useDisclosure();
    
    const onStorageUpdate = (e) => {
          const { newValue } = e;
          setCart(JSON.parse(newValue));
        }
    
      const handleChange = (_cart) => {
        setCart(_cart);
        localStorage.setItem("cart", JSON.stringify(_cart));
      };

      const cartReducer = (item,action) =>{
        handleChange(cartMap[action](cart,item))
      }
    
      useEffect(() => {
        const initialData = localStorage.getItem("cart") || [] 
        setCart(initialData.length === 0 ? initialData : JSON.parse(initialData) );
        window.addEventListener("storage", onStorageUpdate);
        return () => {
          window.removeEventListener("storage", onStorageUpdate);
        };
      }, []);

    return (
        <CartContext.Provider value={{cart,cartReducer, CartUI:{isOpen,onOpen,onClose}}}>
            {children}
        </CartContext.Provider>
    )
}
