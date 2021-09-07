import { Button } from '@chakra-ui/button';
import { Box, Stack, Text } from '@chakra-ui/layout';
import NextImage from "next/image"
import React from 'react'

export const Featured = ({item, imgPosition, addItem}) => {
    return (
        <Stack spacing={0}>
        <Box
             position="relative" 
             height="lg"
             width="100%">
                <NextImage objectFit="cover"
                            objectPosition={imgPosition}
                            layout="fill"
                            src="/assets/img/featured.jpg"
                            priority={true}
                            alt={item.desc}
                />
        </Box>
        <Box w={"100%"} 
             h="20em"
             d="flex" 
             justifyContent="center" 
             position="absolute" 
             transform="translate(0,30%)" >
                <Stack textAlign="center" 
                       borderRadius="2xl" 
                       justify="center" 
                       align="center" 
                       spacing={3} 
                       p={1}
                       width={{base:"90%",sm:"80%",md:"60%",lg:"50%"}} 
                       bg="whiteAlpha.800">
                  <Text as="h1" 
                        color="primary.400" 
                        fontFamily="Caveat" 
                        fontSize={{base:"4xl",sm:"2.75em", md:"5xl"}} 
                        fontWeight={"bold"}>
                            Featured of the Month
                  </Text>
                  <Text  fontSize={{base:"md", sm:"lg", md:"xl"}} 
                         fontWeight={"bold"} >
                             {item.desc}
                  </Text>
                  <Button colorScheme="primary" 
                          onClick={()=>addItem()}>
                              Try it!
                  </Button>
                </Stack>
              </Box>
      </Stack>
    )
}
