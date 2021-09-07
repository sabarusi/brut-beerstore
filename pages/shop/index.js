import { Stack, useMediaQuery, useDisclosure, Button, Text, Box } from '@chakra-ui/react';
import { FilterBar } from '@/components/shop/filter/filterBar';
import dynamic from 'next/dynamic';
import { CART_ACTIONS } from '@/utils/cart';
import { CartContext } from '@/components/context/cart';
import { Pagination } from '@/components/shop/pagination';
import { getFilterUIList, fetchDefault, pagination } from '@/utils/fetchData';
import { useRouter } from 'next/router'
import Head from "next/head"
import axios from "axios"
import React, {useContext, useEffect, useState} from 'react'
import useSWR, { SWRConfig } from 'swr';
const Products = dynamic(() => import("@/components/shop/products/products"))
const ShoppingCart = dynamic(() => import("@/components/shop/cart/ShoppingCart"))
const CustomModal = dynamic(() => import("@/components/shop/modal"))

const isNotEmpty = (value="") => (value.length > 0)
const fetcher = url => axios.get(url).then(res => res.data)

export default function Shop({filterList, fallback}){
    return(
        <SWRConfig value={{fallback}}>
            <Head>
                <title>Brút | Boutique Beer | Shop </title>
            </Head>
          <ShopPage filterList={filterList}/>
        </SWRConfig>
                                    )
}


function ShopPage ({filterList}) {
    const {cart, cartReducer, CartUI} = useContext(CartContext);
    const [pageIndex,setPageIndex] = useState(1)
    const [filters,setFilters] = useState({filters:{}}) //filters state for fetching
    const queryParams = React.useMemo(()=>encodeURI(JSON.stringify({...filters||{filters:{}}, page:pageIndex||1})),[filters, pageIndex])
    const { data, error } = useSWR(()=>'/api/beers?q=' + queryParams, fetcher) 
    const filterModal = useDisclosure(); // in Mobile filters are Modal
    const [showFilterBar] = useMediaQuery("(min-width: 840px)");
    const [mounted, setMounted] = useState(false) // used for useMediaQuery
    const router = useRouter()


    const handleFilters = (brands=[], categories=[],search="",sort=[]) =>{
        const objFilter = {filters: {...(isNotEmpty(categories) && {category:categories}), 
                                     ...(isNotEmpty(brands) && {brand:brands})
                                    },
                                    ...(isNotEmpty(search) && {search}),
                                    ...(isNotEmpty(sort) && {sort:{order:sort[0],category:sort[1]}})
                                }
        if(router?.query?.search && !isNotEmpty(search) ){
                                    router.replace("/shop",undefined,{shallow:true})
                                }
        setPageIndex(1)
        setFilters(objFilter)
    }

    useEffect(()=>{ setMounted(true) },[]) 
    
    useEffect(()=>{if (typeof(router?.query?.search) !== "undefined"){
                        handleFilters([],[],router?.query?.search)
                        }
                 }
                ,[router?.query?.search])

    const handlePagination = (page) =>{
        setPageIndex(page)
    } 
                                       
    const direction = mounted ? showFilterBar : true
    const isLoading = !data && !error

    return (
        <>
        <Stack direction={direction?"row":"column"} py={3}>
            {!mounted ? null 
                       :  direction ? <FilterBar filterList={filterList} 
                                                 handleFilters={handleFilters} 
                                                 search={router.query?.search}
                                      />
                        : <>
                            <Button colorScheme="primary" 
                                    variant="outline" 
                                    w={150} 
                                    margin="auto" 
                                    onClick={filterModal.onOpen}>
                                        Filters
                            </Button>
                            <CustomModal isOpen={filterModal.isOpen} 
                                         onClose={filterModal.onClose}>
                                            <FilterBar  filterList={filterList} 
                                                        handleFilters={handleFilters} 
                                                        search={router.query?.search}
                                                        initState={filters.filters} //used to persist state on closing Modal
                                                        closeModal={filterModal.onClose}
                                            />
                            </CustomModal>
                        </>}
            { (
                (!isLoading) && 
                (!isNotEmpty(data?.products)) )?  <Box d="flex" 
                                                       alignItems="center" 
                                                       justifyContent="center" 
                                                       maxW={{base:"100%",lg:"80%"}} 
                                                       flex="1">
                                                            <Text fontSize="5xl" 
                                                                  fontFamily="Caveat" 
                                                                  color="primary.400"> 
                                                                        { error ? error.message 
                                                                                : "No results found :("
                                                                        }
                                                            </Text>
                                                  </Box> 
                                : <Products isLoaded ={!isLoading} 
                                            list={data?.products} 
                                            openCart={CartUI.onOpen} 
                                            addItem={(item) => cartReducer(item,CART_ACTIONS.ADD)}
                                  />}
        </Stack>
        { (data?.page?.current === 1 && data?.page?.last === 1) 
           || isLoading ? null 
                        : <Pagination current={data?.page?.current} 
                                      last={data?.page?.last} 
                                      handleRoute={handlePagination} 
                           /> 
        }
        <ShoppingCart list={cart} disclosure={CartUI}
                                  actions={{onIncrement:(item)=> cartReducer(item,CART_ACTIONS.INCREMENT),
                                            onDecrement:(item)=> cartReducer(item,CART_ACTIONS.DECREMENT),
                                            onRemove:(item) => cartReducer(item,CART_ACTIONS.REMOVE),
                                            onClear:() => cartReducer(null, CART_ACTIONS.CLEAR)}}
        />   
        </>
    )
}


export async function getStaticProps(context) {
    const filters = await getFilterUIList()
    const defData = await fetchDefault({category:'pid',ascending:false})
    const categories = [...new Set(filters?.map(e=> e.category))].sort() //Sorting categories which are a limited quantity
    const brands = [...new Set(filters?.map(e=> e.brand))] //already sorted by Supabase

    return {
            props: { filterList: {categories,brands},
                     fallback:{
                        '/api/beers?q=%7B%22filters%22:%7B%7D,%22page%22:1%7D':{products:defData.products, 
                                                                                page:pagination(defData.count)}
                        //fallback for SWR default key, preventing re-fetching data generated statically
                     }                 
            },

            revalidate: 1 * 60 * 60
    }
  }