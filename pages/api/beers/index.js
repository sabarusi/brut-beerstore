import {fetchDefault, fetchWithFilters, pagination, MAX_NUM_PAGE} from "@/utils/fetchData"

const pageRange = (page) => ([(page -1) * MAX_NUM_PAGE, (page * MAX_NUM_PAGE)-1])
const formatFilterQuery = (query) => ({key:query ? 'in' : 'neq',
                                       value: query ? `(${query.join(',')})` : 'null'}
                                     )

export default async function handler(req, res) {
    if (req.method === 'GET') {
        const query = JSON.parse(req.query.q)
        const data = await handleGetQuery(query);
        const page = pagination(data?.count, query?.page)
        const products = data?.products
        return !data?.message ? res.status(200).json({products, page}) 
                             :  res.status(500).json(data)
      }
  }

  async function handleGetQuery({filters, sort, page='1',search}){
    const ascending = (sort?.order === "asc")
    const sortQuery = {category: sort?.category ||'pid', order: ascending}
    const [offset,limit] = pageRange(page)
    
    if (!filters?.brand && !filters?.category) {
          const res = await fetchDefault(sortQuery, offset, limit, search) 
          return res
    }
    else{
          const categories = formatFilterQuery(filters?.category)
          const brands = formatFilterQuery(filters?.brand)
          const res = await fetchWithFilters(categories,brands,sortQuery,offset,limit,search)
          return res
    }
}





//********************************************************||
//For development use, with mockup Data                   ||
/*********************************************************||
  
import {products} from "../../../utils/dataMock"
import { filterByKeys } from "../../../utils/filters"

async function fetchAll(){
    return products;
}

function orderData(data,{order, category}){
  return order === "desc"
                 ? data.slice().sort((a, b) => (a[category] < b[category]) ? 1 : -1) //Descending
                 : data.slice().sort((a, b) => (a[category] > b[category]) ? 1 : -1) //Ascending
}

  
  export default async function handler(req, res) {
    if (req.method === 'GET') {
        const query = JSON.parse(req.query.q)
        const data = await fetchAll()
        if (isEmpty(query)) {return  res.status(200).json({products: data})}

        const filters = Object.entries(query.filters)
        const filteredSearch = 'search' in query
                                ? searchByName(filterByKeys(data, filters), query.search)
                                : filterByKeys(data, filters)
        const ordered = 'sort' in query
                        ? orderData(filteredSearch, query.sort) 
                        : filteredSearch
        //.slice pagination needed if the length exceeds the MAX_NUM_PAGE
        //stil needs pagination implemented (return keys in obj with page and accept page)
        const [offset,top] = pagination(query?.page || 1)
        const numPages = Math.ceil(ordered.length / MAX_NUM_PAGE)
        const response = ordered.length > MAX_NUM_PAGE ? ordered.slice(offset,top) : ordered
        res.status(200).json( {products: response, page:{current:query?.page || 1, last:numPages} } )
      }
  }*/
  