import { Box, Icon, IconButton, Stack, Text } from '@chakra-ui/react'
import React from 'react'
import NextImage from "next/image"
import {FaMinus,FaPlus} from 'react-icons/fa'
import { priceFormat } from '@/utils/priceFormat'

export const CartItem = ({item, actions}) => {
    const {pid, name, brand, desc, price, quantity} = item;
    const src = React.useMemo( ()=>"/assets/img/"+ String(pid) + ".png",[pid])
    const totalPrice = React.useMemo(()=>priceFormat(price*quantity),[quantity,price])
    return (
       <Box boxShadow={'xl'}
            rounded={'lg'}
            p={6}>
                <Stack direction="row">
                    <Box position="relative" height={{base: 12, sm: 24}}
                                                width={{base: 12, sm: 24}}
                                                margin="auto">
                        <NextImage objectFit="contain"
                                    layout="fill"
                                    src={src}
                                    alt={desc}
                                    />
                    </Box>
                    <Stack flex={1} px={4}>
                        <Text textAlign="center" fontWeight="bold" fontSize="2xl" fontFamily="Caveat">{name}</Text>
                        <Text  textAlign="center" color={'gray.500'} fontSize={'xs'} textTransform={'uppercase'}>{brand}</Text>
                       <Stack direction="row" spacing={2} align="center" justify="center">
                           <IconButton onClick={()=> actions.onDecrement(item)} height={6} aria-label="minus" colorScheme="primary"  icon={<Icon as={FaMinus} w={3} h={3}/>}/>
                           <Text fontWeight="bold" fontSize="lg">{quantity}</Text>
                           <IconButton onClick={()=> actions.onIncrement(item)} height={6} aria-label="plus" colorScheme="primary" icon={<Icon as={FaPlus} w={3} h={3}/>}/> 
                        </Stack> 
                    </Stack>
                    <Stack w={"2.4rem"}fontSize="xs" justify="center" textAlign="center">
                        <Text fontWeight="bold" >{totalPrice}</Text>
                        <Text noOfLines={2}>{"UP "+ priceFormat(price)}</Text>
                    </Stack>
                </Stack>
       </Box>
    )
}
