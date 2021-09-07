import { Button, Heading, Stack } from '@chakra-ui/react'
import React, {useState,useEffect }from 'react'
import { FilterAccordion } from './filterAccordion'
import { SortMenu } from './sortMenu'

export const FilterBar = ({filterList, handleFilters, search, closeModal, initState}) => {
    const [categories, setCategories] = useState(()=> initState?.category || [])
    const [brands, setBrands] = useState(()=> initState?.brand|| [])
    const [sort, setSort] = useState(()=> initState?.sort ? `${initState.sort.order}-${initState.sort.category}`
                                                          : "")

    useEffect(()=>{ if (search?.length>0){defaultValues()} },
                   [search])

    const handleSortChange = (value) => { setSort(value)
                                          handleFilters(brands,categories,search|| "",value.split("-"))
                                        }
    
    const defaultValues = ()=>{setCategories([])
                               setBrands([])
                               setSort("")}
    const clearAll = ()=> {
                            if (categories === [] && brands === [] && sort==="") {return null};
                            defaultValues();
                            handleFilters();
                            (typeof closeModal === "function")? closeModal(): null
                        }
    
    return (
            <Stack direction="column"
                   p={3} 
                   m={4} 
                   w={"13rem"}>
                    <Stack direction="column" align="center">
                    <Heading as="h1" 
                             fontFamily="Caveat" 
                             fontSize="5xl" 
                             fontWeight="bold">
                                 Filters
                    </Heading>
                        <Stack direction="row">
                            <Button variant="outline" 
                                    colorScheme="red" 
                                    size="sm" 
                                    w={20}
                                    onClick={()=> clearAll()}>
                                        Clear all
                            </Button>
                            <SortMenu value={sort} 
                                      handleSort={handleSortChange}
                            />
                        </Stack>
                    </Stack>
                <FilterAccordion categories={categories} 
                                 setCategories={setCategories} 
                                 brands={brands} 
                                 setBrands={setBrands}
                                 filterList={filterList}
                />
                <Button colorScheme="primary" 
                        onClick={()=>{handleFilters(brands,categories,search); 
                                      setSort("");
                                      (typeof closeModal === "function")? closeModal(): null}
                                      }>
                            Filter
                </Button>
            </Stack>
    )
}
