import { Button, Stack, Text } from '@chakra-ui/react'
import React from 'react'

export const Pagination = ({current, last, handleRoute}) => {
    return (
        <Stack direction="column" 
               spacing={2} 
               py={4} 
               align="center">
            <Text fontFamily="Caveat" 
                  fontSize="2xl">
                      Page {current} of {last}
            </Text>
            <Stack direction="row">
                {[...Array(last).keys()].map(e=> e+1 === current? <Text key={e}>
                                                                        {e+1}
                                                                  </Text> 
                                                                : <Button key={e} variant="link" 
                                                                          onClick={()=>handleRoute(e+1)}>
                                                                          {e+1}
                                                                   </Button>)}
            </Stack>
        </Stack>
    )
}
