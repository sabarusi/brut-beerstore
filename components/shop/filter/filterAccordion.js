import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel } from '@chakra-ui/accordion'
import { Checkbox, CheckboxGroup } from '@chakra-ui/checkbox'
import { Heading, Stack } from '@chakra-ui/layout'
import React from 'react'

export const FilterAccordion = ({filterList, brands, setBrands, categories, setCategories}) => {
    return (
        <Accordion allowToggle>
            <FilterItem type="Brands" 
                        value={brands} 
                        setValue={setBrands}
                        typeList={filterList?.brands}/>
            <FilterItem type="Categories" 
                        value={categories}
                        setValue={setCategories}
                        typeList={filterList?.categories}/>
        </Accordion>
    )
}

function FilterItem({type, typeList, value, setValue}){
    return(
        <AccordionItem>
            <AccordionButton>
                    <Heading as="h2"
                             fontFamily="Caveat"
                             pr={type === "Brands"? 3 : 1}  
                             fontSize={type==="Brands"?"3xl":"2xl"} 
                             color="primary.400">
                                 {type}
                     </Heading>
                    <AccordionIcon />
            </AccordionButton>
            <AccordionPanel>
                <Stack>
                    <CheckboxGroup colorScheme="primary" 
                                   size="sm" 
                                   value={value} 
                                   onChange={(e)=>setValue(e)}>
                        {(!typeList.length) ? null 
                                                   : typeList.map((e,i)=> 
                                                                        <Checkbox value={e} 
                                                                                  key={i}>
                                                                                      {e}
                                                                        </Checkbox>)
                        }
                    </CheckboxGroup>
                </Stack>
            </AccordionPanel>
        </AccordionItem>
    )
}
