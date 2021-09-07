import { Box, Icon, IconButton, Input, InputGroup, InputRightElement } from '@chakra-ui/react'
import React, {useState} from 'react'
import {FaSearch} from 'react-icons/fa'
import {useRouter} from "next/router"

export const SearchBar = ({border}) => {
    const [inputValue, setInputValue] = useState("")
    const router = useRouter();

    const handleSearch = ()=> {
                                setInputValue("")
                                if (inputValue) {
                                    router.push({pathname:"/shop", 
                                                 query:{search:inputValue}},
                                                 undefined, 
                                                 {shallow:true} ) 
                                            }
    }

    return (
        <Box display="flex" 
             alignItems="center">
                        <InputGroup>
                            <Input placeholder="Search name of the beer" 
                                    width={{ base: "12rem", sm: "18rem", md: "md" }}
                                    size="sm"
                                    bg="white" 
                                    variant="unstyled"
                                    border={border?.size || null}
                                    borderColor={border?.color || null}
                                    color="green.400"
                                    p={2}
                                    justifySelf="center"
                                    value={inputValue}
                                    onChange={(e)=>setInputValue(e.target.value)}/>
                            <InputRightElement>
                                <IconButton variant="unstyled"
                                            aria-label="search"
                                            onClick={()=> handleSearch() } 
                                            icon={<Icon as={FaSearch}
                                                        color="primary.400"
                                                   />}
                                />
                            </InputRightElement>
                        </InputGroup>
        </Box>
    )
}
