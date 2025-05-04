// permissions
const tablePermissions = document.querySelector("[talble-permissions]");
if(tablePermissions){
    const buttonSubmit = document.querySelector("[button-submit]");
    buttonSubmit.addEventListener("click", () => {
        const permissions = [];
        // mục tiêu : [{id quyền 1, [danh sách quyền 1]}, {id quyền 2, [danh sách quyền 2]}]

        const rows = document.querySelectorAll("[data-name]");
        rows.forEach(row => {
            const name = row.getAttribute("data-name");
            const inputs = row.querySelectorAll("input")

            if(name == "id"){
                inputs.forEach(input => {
                    const id_permission = input.value;
                    permissions.push({
                        id : id_permission,
                        permissions : []
                    })
                })
            }else{
                inputs.forEach((input, index) => {
                    const checked = input.checked; // return true or false
                    if(checked){
                        permissions[index].permissions.push(name);
                    }
                })
            }

            if(permissions.length > 0){
                const formChangePermissions = document.querySelector("#form-change-permissions");
                if(formChangePermissions){
                    const inputForm = formChangePermissions.querySelector("input[name='permissions']");
                    inputForm.value = JSON.stringify(permissions);
                    formChangePermissions.submit();
                }
            }
        })
    })
}
// End permissions

// view checked permissions
const dataRecords = document.querySelector("[data-records]")
if(dataRecords){
    const records = JSON.parse(dataRecords.getAttribute("data-records"));
    // console.log(records)
    records.forEach((record, index) => {
        const permissions = JSON.parse(record.permission);
        // console.log(permissions)
        permissions.forEach(permission => {
            const row = tablePermissions.querySelector(`[data-name = "${permission}"]`)
            const input = row.querySelectorAll("input")[index]

            input.checked = true;
        })
    })
}
// End view checked permissions