import { Heading, Stack, useMediaQuery } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { CartContext } from "@/components/context/cart";
import { CART_ACTIONS } from "@/utils/cart";
import { getArrivals,getFeatured } from "@/utils/fetchData";
import React, {useContext} from "react"
import { Featured } from "@/components/shop/products/featured";
import Head from "next/head"
const Products = dynamic(() => import("@/components/shop/products/products"))
const ShoppingCart = dynamic(() => import("@/components/shop/cart/ShoppingCart"))

export default function Home({arrivals , featured}) {
  const {cart, cartReducer, CartUI} = useContext(CartContext);
  const [isMobile] = useMediaQuery("(min-width: 768px)")
  const position = !isMobile? "50% 50%": "0% 5%"

  return (
    <>
    <Head>
      <title>Brút | Boutique Beer | Home </title>
    </Head>
    <Stack mt={0} 
           mb={2} 
           width="100%" >
       <Featured item={featured} 
                 imgPosition={position} 
                 addItem={()=> {cartReducer(featured,CART_ACTIONS.ADD); CartUI.onOpen()}}
        />
        <Stack spacing={5}
               p={4} 
               align="center">
            <Heading as="h1" 
                     fontFamily="caveat" 
                     fontSize="6xl" 
                     textAlign="center">
                     New arrivals
             </Heading>
             <Products list={arrivals} 
                       openCart={CartUI.onOpen} 
                       addItem={(item) => cartReducer(item,CART_ACTIONS.ADD)}
              />
        </Stack>
    </Stack>
    <ShoppingCart list={cart} 
                  disclosure={CartUI}
                  actions={{onIncrement:(item)=> cartReducer(item,CART_ACTIONS.INCREMENT),
                            onDecrement:(item)=> cartReducer(item,CART_ACTIONS.DECREMENT),
                            onRemove:(item) => cartReducer(item,CART_ACTIONS.REMOVE),
                            onClear:() => cartReducer(null, CART_ACTIONS.CLEAR)}}
     />

    </>
  )
}

export async function getStaticProps(context) {
  const arrivals = await getArrivals()
  const featured = await getFeatured()
  return {
          props: { arrivals, featured },
          revalidate: 1 * 60 * 60
  }
}

