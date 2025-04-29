var url = new URL(window.location.href)
// Pagination
const buttonsPagination = document.querySelectorAll("[button-pagination]");
if(buttonsPagination.length > 0){
    buttonsPagination.forEach(button => {
        button.addEventListener("click", () => {
            const page = button.getAttribute("button-pagination");
            url.searchParams.set("page", page)
            window.location.href = url.href;
        })
    })
}
// End Pagination

// Search
const formSearch = document.querySelector("#form-search");
if(formSearch){
    formSearch.addEventListener("submit", (e) => {
        e.preventDefault();
        const keyword = e.target.elements.keyword.value;
        if(keyword){
            url.searchParams.set("keyword", keyword);
        }else{
            url.searchParams.delete("keyword");
        }
        window.location.href = url.href
    })
}
// End Search

// Sort
const sort = document.querySelector("[sort]");
if(sort){
    const sortSelect = sort.querySelector("[sort-select]");
    const buttonClear = sort.querySelector("[sort-clear]");
    const url = new URL(window.location.href);

    sort.addEventListener("change", (e) => {
        const value = e.target.value;
        const keys = value.split("-");
        let [sortKey, sortValue] = keys;
        // console.log(sortKey)
        // console.log(sortValue)
        if(sortKey && sortValue){
            url.searchParams.set("sortKey", sortKey);
            url.searchParams.set("sortValue", sortValue);
            window.location.href = url.href
        }
    })

    buttonClear.addEventListener("click", () => {
        const sortKey = url.searchParams.get("sortKey");
        const sortValue = url.searchParams.get("sortValue");
        if(sortKey && sortValue){
            url.searchParams.delete("sortKey")
            url.searchParams.delete("sorValue")
            window.location.href = url.href;
        }
    })

    // selected
    const sortKey = url.searchParams.get("sortKey")
    const sortValue = url.searchParams.get("sortValue")
    const value = sortKey + "-" + sortValue
    const optionSelected = sortSelect.querySelector(`option[value = ${value}]`)
    console.log(optionSelected)
    optionSelected.selected = true;
}
// End Sort