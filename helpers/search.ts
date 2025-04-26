interface SearchHelper{
    keyword: string,
    regex?: RegExp
}
export const SearchHelper  = (query): SearchHelper => {

    let objectSearch: SearchHelper = {
        keyword : ""
    }
    if(query.keyword){
        objectSearch.keyword = query.keyword;
        const regex = new RegExp(objectSearch.keyword, "i");
        objectSearch.regex = regex;
    }
    return objectSearch
}