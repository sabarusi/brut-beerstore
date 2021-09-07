import { Box, SimpleGrid, Skeleton, Stack } from '@chakra-ui/react'
import React from 'react'
import { Card } from '@/components/shop/products/card'

export default function Products ({list, addItem, openCart, isLoaded=true}){
    
    return (
        <Stack maxW={{base:"100%",lg:"80%"}}
               p={2}
               flex="1">
            <SimpleGrid justify="center"
                        gridGap={5}
                        columns={{base:1, sm:2, md:3,xl:4,}}
                        >              
                {isLoaded ? list?.map((elem, i) =><Card addItem={addItem} 
                                                        key={i} 
                                                        item={elem} 
                                                        openCart={openCart}
                                                    />) 

                          : [...Array(12).keys()].map((i) => <Skeleton key={i} 
                                                                       startColor="gray.100" 
                                                                       endColor="primary.200">
                                                                    <Box rounded="lg" 
                                                                         w={200} 
                                                                         h={400}
                                                                     />
                                                              </Skeleton>)}
            </SimpleGrid>
        </Stack>
    )
}
