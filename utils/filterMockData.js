/************************************** */ 
/* ONLY FOR DEV USE ON MOCKUP DATA    *
**************************************

export function filterByKeys(products, filters){
    //products = array of objects
    //filters = array of [key,value], derived from Object.entries(obj)
     if (filters.length === 0 || products === []) {return products}
     const [key,value] = filters[0];
     const multipleValues = Array.isArray(value);
     const data = products.filter(item => multipleValues? value.includes(item[key]) : item[key] === value)
     return filterByKeys(data, filters.slice(1))
}*/