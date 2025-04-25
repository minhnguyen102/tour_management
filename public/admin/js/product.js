// button-change-status
const buttonsChangeStatus = document.querySelectorAll("[button-change-status]");
if(buttonsChangeStatus.length > 0){
    buttonsChangeStatus.forEach(button => {
        const formChangeStatus = document.querySelector("#form-change-status");
        const dataPath = formChangeStatus.getAttribute("data-path")

        button.addEventListener("click", () => {
            const currentStatus = button.getAttribute("data-status");
            const newStatus = (currentStatus == "active" ? "inactive" : "active")
            const idItem = button.getAttribute("data-id")
            
            const action = dataPath + `/${idItem}/${newStatus}?_method=PATCH`
            formChangeStatus.action = action;
            formChangeStatus.submit();
        })
    })
}
// End button-change-status