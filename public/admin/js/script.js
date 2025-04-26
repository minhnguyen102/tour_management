// Pagination
var url = new URL(window.location.href)
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