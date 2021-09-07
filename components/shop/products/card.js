import { Box, Stack, Badge, Heading, Text, Button} from '@chakra-ui/react'
import React from 'react'
import NextImage from 'next/image'
import { priceFormat } from '@/utils/priceFormat'
import { AnimatePresence, motion } from 'framer-motion'

export const Card = ({item, addItem, openCart}) => {
    const {pid, name, brand, desc, category, price} = item;
    const src = React.useMemo(()=>"/assets/img/"+ String(pid) + ".png",[pid])
    return (
        <Box  
            boxShadow={'2xl'}
            rounded={'lg'}
            p={6}>
            <AnimatePresence>
              <Box as={motion.div} 
                   position="relative" 
                   height={{base: 24, sm: 36}}
                   width={{base: 24, sm: 36}}
                   margin="auto"
                   whileHover={{scale:1.2}}>
                    <NextImage objectFit="contain"
                              layout="fill"
                              src={src}
                              alt={desc}
                    />
              </Box>
            </AnimatePresence>
        <Stack pt={10} 
               align={'center'}>
              <Text color={'gray.500'} 
                    fontSize={'xs'} 
                    textTransform={'uppercase'}>
                      {brand}
              </Text>
              <Box d="flex" 
                   minH={"3.6rem"} 
                   textAlign="center" 
                   alignItems="center">
                  <Heading  fontSize={name.length>15? '2xl' : "3xl"} 
                            fontFamily={'Caveat'} 
                            fontWeight={"bold"} >
                              {name}
                  </Heading>
                </Box>
                  <Badge>
                      {category}
                  </Badge>
                  <Text fontWeight={700} 
                        color="primary.400">
                          {priceFormat(price)}
                  </Text>
                  <Button variant="solid" 
                          colorScheme="primary" 
                          onClick={()=> {addItem(item); openCart()}}>
                            Add to cart
                  </Button>
          </Stack>
        </Box>
    )
}
