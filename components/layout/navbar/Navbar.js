import {Box, Heading, Icon, IconButton, Stack, useDisclosure, useMediaQuery } from '@chakra-ui/react'
import {FaShoppingCart, FaBars} from 'react-icons/fa'
import { SearchBar } from '@/components/layout/navbar/searchBar'
import { CartContext } from '@/components/context/cart'
import InfoBar from '@/components/layout/navbar/infoBar'
import MenuMobile from '@/components/layout/navbar/menuMobile'
import LinkMenu from '@/components/layout/navbar/links'
import {useRouter} from 'next/router'
import React, { useState, useEffect, useContext } from 'react'

export default function Navbar(){
    const router = useRouter();
    const [isMounted,setMounted]= useState(false)
    const {CartUI:{onOpen:onCartOpen}} = useContext(CartContext);
    const {isOpen:isModalOpen, onOpen:onModalOpen, onClose:onModalClose } = useDisclosure();
    const [spaceForMenu] = useMediaQuery("(min-width: 840px)");
    const [spaceForSearch] = useMediaQuery("(min-width: 390px)")

    useEffect( ()=> { setMounted(true) } , [])
    return (
        <Stack spacing={0}>
            <Stack direction="row" 
                   bg="#242424" 
                   fontSize="4xl" 
                   color="white" 
                   py={{base:4, sm:6}} 
                   px={{base:2,sm:5,md:8}} 
                   spacing={{base:1, sm:3}}
                   justify="space-between">
                <Heading as="a" 
                         fontFamily="caveat" 
                         fontSize={{base:"2.5rem", sm:"5xl",md:"5xl"}} 
                         href="/">
                    Brút
                </Heading>
                {spaceForSearch  ? <SearchBar/> : null }

                <Stack fontFamily="caveat" 
                       direction="row" 
                       spacing={{base:2, sm:3, md:6}}
                       align="center" 
                       as="nav">
                    {(!isMounted) ? null : spaceForMenu 
                    ? <LinkMenu links={[{text:"Home", action:()=> {router.push("/",undefined,{shallow:true});}},
                                        {text:"Shop", action:()=> {router.push("/shop",undefined,{shallow:true})} },
                                        {text:"Cart", action:onCartOpen}]}     
                        />
                     : <>
                        <IconButton onClick={onModalOpen} 
                                    aria-label="Menu" 
                                    variant="unstyled" 
                                    color="white" 
                                    icon={<Icon as={FaBars} 
                                                w={7} 
                                                h={7}
                                            />} 
                                    size="md"
                        />
                        <IconButton onClick={onCartOpen} 
                                    aria-label="Shopping Cart"
                                    variant="unstyled" 
                                    color="white" 
                                    icon={<Icon as={FaShoppingCart} 
                                                w={7} 
                                                h={7}
                                            />} 
                                    size="md"/>
                        <MenuMobile isOpen={isModalOpen} 
                                    onClose={onModalClose}/>
                       </>
                    }
                </Stack>
            </Stack>

            <InfoBar/>

            {!spaceForSearch && isMounted 
                                ?<Box d="flex" 
                                      color="white" 
                                      justifyContent="center"
                                      py={2} >
                                            <SearchBar border={{size:"1px solid", 
                                                                color:"primary.400"}}
                                            />
                                </Box> 
                                : null }
        </Stack>
    )
}