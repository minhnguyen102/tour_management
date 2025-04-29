// button-change-status
const buttonsChangeStatus = document.querySelectorAll("[button-change-status]");
if(buttonsChangeStatus.length > 0){
    buttonsChangeStatus.forEach(button => {
        const formChangeStatus = document.querySelector("#form-change-status");
        if(formChangeStatus){
            const dataPath = formChangeStatus.getAttribute("data-path")
    
            button.addEventListener("click", () => {
                const currentStatus = button.getAttribute("data-status");
                const newStatus = (currentStatus == "active" ? "inactive" : "active")
                const idItem = button.getAttribute("data-id")
                
                const action = dataPath + `/${idItem}/${newStatus}?_method=PATCH`
                formChangeStatus.action = action;
                formChangeStatus.submit();
            })
        }
    })
}
// End button-change-status

// Filter-Status
const buttonsStatus = document.querySelectorAll("[btn-status]")
if(buttonsStatus.length > 0){
    const url = new URL(window.location.href)

    buttonsStatus.forEach(button => {
        button.addEventListener("click", () => {
            const status = button.getAttribute("btn-status");
            if(status){
                url.searchParams.set("status", status)
            }else{
                url.searchParams.delete("status")
            }
            window.location.href = url.href
        })
    })
}
// End Filter-Status

// Delete Tour
const buttonsDelete = document.querySelectorAll("[button-delete]")
if(buttonsDelete.length > 0){
    const formDelete = document.querySelector("#form-button-delete")
    if(formDelete){
        buttonsDelete.forEach(button => {
            button.addEventListener("click", () => {
                const idItem = button.getAttribute("id-item");
                const dataPath = formDelete.getAttribute("data-path");
                const newPath = `${dataPath}/${idItem}?_method=DELETE`;
                formDelete.action = newPath;
                formDelete.submit();
            })
        })
    }
}
// End Delete Tour