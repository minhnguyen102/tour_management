interface objectPagination {
    limitItem : number,
    currentPage : number,
    skip? : number,
    totalPage? : number
}

export const PaginationHelper = (objectPagination: objectPagination, query, totalProduct: number) => {
    if(query.page){
        objectPagination.currentPage = parseInt(query.page);
    }
    objectPagination["skip"] = (objectPagination["currentPage"] - 1) * objectPagination["limitItem"];
    const totalPage = Math.ceil(totalProduct / objectPagination["limitItem"]);
    objectPagination["totalPage"] = totalPage;
    return objectPagination;
}