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