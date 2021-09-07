import { Box, Stack, Text } from '@chakra-ui/react'
import React from 'react'
import NextImage from "next/image"

export default function Footer(){
    return (
        <>
        <Stack fontFamily="Caveat" align="center" direction={{base:"column", lg:"row"}} id="about" bg="#242424" color="white" justify="space-around" spacing={{base:4,lg:2}} pt={6} pb={10}>
            <Stack h={"100%"} maxW={"35ch"} >
                <Text textAlign="center" color="primary.400" fontSize="5xl">About Brút</Text>
                <Text textAlign="justify" fontSize="xl">We are a boutique beer store made by enthusiasts for enthusiasts. 
                                   We offer finely selected premium quality beers at affordable prices.
                </Text>
            </Stack>
            <Stack>
                    <Text textAlign="center" color="primary.400" fontSize="5xl">Visit us</Text>

                    <Box
                d={{base:"none", lg:"block"}}
                position="relative" 
                height="11em"
                width="18em"
                >
                    <NextImage
                            objectFit="cover"
                            layout="fill"
                            src="/assets/img/Visit.jpg"
                            alt={"Visit us anytime, photo of our shop"}
                            />
                </Box>
                <Text textAlign="center" fontSize="xl">Location: Fake St. 123, Springfield</Text>
            </Stack>
               
            <Stack maxW={"35ch"} h={"100%"}>
                <Text textAlign="center" color="primary.400" fontSize="5xl">Contact</Text>
                <Text textAlign="justify" fontSize="xl">If you want to contact us, you can write to our email info@brut.com
                                   You can also contact us on Social Media or our Whatsapp line</Text>
            </Stack>
        </Stack>
        <Text bg="primary.400" color="white" textAlign="center" fontFamily="mono">Made with love &#10084; by Ignacio Casaburi. </Text>
        </>
    )
}
