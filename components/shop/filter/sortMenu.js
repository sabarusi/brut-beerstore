import { Menu, MenuButton, MenuDivider, MenuItemOption, MenuList, MenuOptionGroup } from '@chakra-ui/menu'
import { Button } from '@chakra-ui/button'
import { FaChevronDown } from 'react-icons/fa'
import React from 'react'
import Icon from '@chakra-ui/icon'

export const SortMenu = ({value, handleSort}) => {
    return (
        <Menu>
            <MenuButton size="sm" 
                        variant="outline" 
                        as={Button} 
                        rightIcon={<Icon as={FaChevronDown}/>}>
                            Sort
            </MenuButton>
            <MenuList fontSize="xs">
                <MenuOptionGroup value={value || "desc-pid"} 
                                 onChange={(e)=>{handleSort(e);console.log(e)}} 
                                 title="Sort by" 
                                 type="radio">
                    <MenuItemOption value="desc-pid">
                        New to Old
                    </MenuItemOption>
                    <MenuItemOption value="asc-pid">
                        Old to New
                    </MenuItemOption>
                    <MenuDivider />
                    <MenuItemOption value="asc-price">
                        Low to High
                    </MenuItemOption>
                    <MenuItemOption value="desc-price">
                        High to Low
                    </MenuItemOption>
                </MenuOptionGroup>
            </MenuList>
    </Menu>
    )
}
