import { convertToSlug } from "./convertToSlug";

interface SearchHelper{
    keyword: string,
    keywordRegex?: string,
    slugRegex?: string
}
export const SearchHelper  = (query): SearchHelper => {

    let objectSearch: SearchHelper = {
        keyword : ""
    }
    if(query.keyword){
        objectSearch.keyword = query.keyword;
        // console.log(objectSearch.keyword)

        const keywordRegex = query.keyword.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
        objectSearch.keywordRegex = keywordRegex; 
        // console.log(objectSearch.keywordRegex)

        const slugRegex: string = convertToSlug(query.keyword);
        objectSearch.slugRegex = slugRegex; 
        // console.log(slugRegex)

    }
    return objectSearch
}