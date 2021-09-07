import {Button, Drawer, DrawerBody, DrawerFooter, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton,
        Stack, Heading, Text, Icon } from "@chakra-ui/react";
import { FaWhatsapp } from "react-icons/fa";
import { priceFormat } from "@/utils/priceFormat";
import { CartItem } from "@/components/shop/cart/cartItem";
import React from 'react'

export default function ShoppingCart({list, disclosure:{isOpen,onClose}, actions:{onClear,...itemActions}}){
    const orderPrice = React.useMemo(()=>list.reduce((acc,product) => acc + (product.price * product.quantity),0),[list])
    const orderQuantity = React.useMemo(()=>list.reduce((acc,product) => acc + (product.quantity),0),[list])
    const shippingCost = orderPrice >= 100 ? 0 : 5

    const formatCheckout=(products)=>{
            const formatItem = (product)=>(`ITEM:${product.name}, BR:${product.brand}, Q:${product.quantity}, UP:${priceFormat(product.price)}, TOT:${priceFormat(product.price*product.quantity)}\n`)
            const header =`*BRÚT BEER STORE*\n*ORDER CHECKOUT*\n`
            const subtotal= `*SUBTOTAL: ${priceFormat(orderPrice)} (${orderQuantity} ITEMS)*\n`
            const shipping = `*SHIPPING: ${shippingCost ? priceFormat(shippingCost) : "FREE"}\n*`
            const total = `*TOTAL: ${priceFormat(orderPrice+shippingCost)}*`
            return  header + list.map(e=> formatItem(e)).join('') + subtotal + shipping + total 

            }
    const doCheckout=(products)=>{
        const checkoutList = encodeURIComponent(formatCheckout(products))
        window.open(`https://wa.me/5491111111111?text=${checkoutList}`)
    }
    return (
            <Drawer
                isOpen={isOpen}
                placement="right"
                onClose={onClose}
                size={"sm"}>
                <DrawerOverlay bg="blackAlpha.500"/>
                <DrawerContent height="95%">
                        <DrawerCloseButton/>
                        <DrawerHeader>
                            <Heading as="h1" 
                                     fontSize="5xl" 
                                     fontFamily="Caveat" 
                                     textAlign="center">
                                         Your Cart
                            </Heading>
                        </DrawerHeader>
                        <DrawerBody overflowY="scroll">
                        {(list.length === 0)? <Text fontWeight="bold" 
                                                    color="primary.400"
                                                    fontSize="2xl" 
                                                    fontFamily="Caveat" 
                                                    align="center">
                                                        No items in the cart
                                                </Text> :
                                            list.map((element,i) => <CartItem key={i} 
                                                                              item={element} 
                                                                              actions={itemActions}
                                                                    />)
                        }
                        </DrawerBody>

                        <DrawerFooter>
                        {(list.length === 0)?
                            <Stack flex={1} spacing={1}>
                                <Stack direction="row" fontSize="lg" align="center" justify="center">
                                    <Text  fontFamily={"Caveat"} fontSize="2xl"fontWeight={"bold"}>Order:</Text>
                                    <Text>{priceFormat(orderPrice)}</Text>
                                    <Text>({orderQuantity})</Text>
                                    <Text fontFamily={"Caveat"} fontSize="xl"fontWeight={"bold"}>+ Shipping</Text>
                                    <Text>({shippingCost ? priceFormat(shippingCost)  : "Free"})</Text>
                                </Stack>
                                <Stack direction="row" fontSize="xl" align="center" justify="center">
                                    <Text fontFamily={"Caveat"} fontSize="3xl"fontWeight={"bold"}>Total</Text>
                                    <Text>({priceFormat(orderPrice+shippingCost)})</Text>
                                </Stack>
                                <Stack direction="row" 
                                       justifyContent="space-between" 
                                       flex={1} 
                                       pb={2}>
                                        <Button colorScheme="red" 
                                                onClick={onClear}>Clear
                                        </Button>
                                        <Button onClick={()=> orderQuantity >0 ? doCheckout(list): null} 
                                                colorScheme="primary" 
                                                leftIcon={<Icon as={FaWhatsapp}/>}>
                                                    Checkout
                                        </Button>
                                </Stack>
                            </Stack>
                        : null}
                        </DrawerFooter>
                </DrawerContent>
            </Drawer>
    )
}
