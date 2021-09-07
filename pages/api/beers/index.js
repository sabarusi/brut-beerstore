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