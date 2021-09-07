import { supabase } from "@/utils/supabaseClient"
export const MAX_NUM_PAGE = 12;

export const pagination = (length, current) => ({current: current || 1, last: Math.ceil(length/ MAX_NUM_PAGE)||1})

export async function fetchDefault(sort, offset=0 , limit=(MAX_NUM_PAGE-1), search){
    const { data, error, count } = !search  ? await supabase
                                                    .from('beers')
                                                    .select('pid,name,brand,desc,category,price', 
                                                           { count: 'exact' })
                                                    .is('stock', true)
                                                    .order(sort.category, {ascending: sort.order})
                                                    .range(offset,limit)
                                            : await supabase
                                                    .from('beers')
                                                    .select('pid,name,brand,desc,category,price', 
                                                          { count: 'exact' })
                                                    .is('stock', true)
                                                    .textSearch('name', search,  { 
                                                      type: 'plain',
                                                      config: 'english' 
                                                    })
                                                    .order(sort.category, {ascending: sort.order})
                                                    .range(offset,limit)

    return  {products:data,count} || error
}

export async function fetchWithFilters(categories, brands , sort, offset, limit, search){
    const { data, error, count } = !search? await supabase
                                                  .from('beers')
                                                  .select('pid,name,brand,desc,category,price', { count: 'exact' })
                                                  .is('stock', true)
                                                  .filter('category',categories.key,categories.value)
                                                  .filter('brand',brands.key, brands.value)
                                                  .range(offset,limit)
                                                  .order(sort.category, {ascending: sort.order})
                                          : await supabase
                                                  .from('beers')
                                                  .select('pid,name,brand,desc,category,price', { count: 'exact' })
                                                  .is('stock', true)
                                                  .filter('category',categories.key,categories.value)
                                                  .filter('brand',brands.key, brands.value)
                                                  .textSearch('name', search, { 
                                                                type: 'plain',
                                                                config: 'english' 
                                                              })
                                                  .range(offset,limit)
                                                  .order(sort.category, {ascending: sort.order})
    return  {products:data,count} || error
}

export async function getArrivals(){
    const {data,error} = await supabase
                              .from('beers')
                              .select('pid,name,brand,desc,category,price')
                              .is('stock', true)
                              .order('pid',{ascending:false})
                              .range(0,3)
    return data || error
  }

export async function getFeatured(){
    const {data,error} = await supabase
                              .from('featured')
                              .select(`
                              beers (
                                pid,name,brand,desc,category,price
                              )
                            `)
    return data[0].beers || error
  }

export async function getFilterUIList(){
    const {data,error }= await supabase
                                .from('beers')
                                .select('brand,category')
    return data || error 
}

