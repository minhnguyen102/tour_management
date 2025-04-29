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
    if(optionSelected){
        optionSelected.selected = true;
    }
}
// End Sort

// ChangeMulti
// 1.Checkbox (checkall => all check và ngược lại)
const checkboxMulti = document.querySelector("[checkbox-multi]")
if(checkboxMulti){
    const inputCheckAll = checkboxMulti.querySelector("input[name=checkall]");
    const inputsCheckbox = checkboxMulti.querySelectorAll("input[name=id]");
    // checkall => all check
    inputCheckAll.addEventListener("click", () =>{
        if(inputCheckAll.checked){
            inputsCheckbox.forEach(inputCheckbox => {
                inputCheckbox.checked = true;
            })
        }else{
            inputsCheckbox.forEach(inputCheckbox => {
                inputCheckbox.checked = false;
            })
        }
    })
    // all check => checkall (count == length)
    inputsCheckbox.forEach(inputCheckbox => {
        inputCheckbox.addEventListener("click", () => {
            const countChecked = checkboxMulti.querySelectorAll("input[name=id]:checked").length;
            (countChecked == inputsCheckbox.length) ? inputCheckAll.checked = true : inputCheckAll.checked = false 
        })
    })

    // Lấy ra form change(form change gồm danh sách id tour + option chỉnh sửa)
    const formChangeMulti = document.querySelector("[form-change-multi]");
    if(formChangeMulti){
        formChangeMulti.addEventListener("submit", (e) => {
            e.preventDefault();
            const toursChecked = checkboxMulti.querySelectorAll("input[name=id]:checked");
            const typeChange = e.target.elements.type.value;
            console.log(typeChange)
            // lấy ra id của các tour => cho vào 1 mảng
            if(toursChecked.length > 0){
                let ids = [];
                toursChecked.forEach(tour => {
                    const idTour = tour.getAttribute("value");
                    ids.push(idTour);
                })
                // console.log(ids.join("-")) // ok
                // form lưu trữ ids;
                const inputIds = formChangeMulti.querySelector("input[name=ids]");
                inputIds.value = ids.join("-")
                formChangeMulti.submit();
            }else{
                alert("Bạn phải chọn ít nhất một sản phẩm");
            }
        })
    }

}
// End ChangeMulti