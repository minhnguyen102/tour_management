// Call API bên sever 
const drawListTour = () => {
    fetch("http://localhost:3000/cart/list-tour",{
        method : "POST",
        body : localStorage.getItem("cart"),
        headers : {
            "Content-Type" : "application/json"
        }
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
    
            const htmls = data.tours.map((tour, index) => {
                return `
                    <tr>
                        <td>${index + 1}</td>
                        <td>
                            <img src="${tour.image}" alt="${tour.inforTour.slug}" width="80px" />
                        </td>
                        <td>
                            <a href="/tours/detail/${tour.inforTour.slug}">${tour.inforTour.title}</a>
                        </td>
                        <td>${tour.newPrice.toLocaleString()}đ</td>
                        <td>
                            <input 
                                type="number" 
                                name="quantity" 
                                value="${tour.quantity}" 
                                min="1" 
                                item-id="${tour.tourId}" 
                                style="width: 60px;" 
                            />
                        </td>
                        <td>${tour.totalPrice.toLocaleString()}đ</td>
                        <td>
                            <button 
                                class="btn btn-danger" 
                                btn-delete="${tour.tourId}"
                            >
                                Xóa
                            </button>
                        </td>
                    </tr>
    
                    `
            })
    
            const listTour = document.querySelector("[list-tour]")
            listTour.innerHTML = htmls.join("")
    
            const spanTotalPrice = document.querySelector("[total-price]");
            const totalPrice = data.tours.reduce((sum, tour) => sum + tour.totalPrice, 0);
            spanTotalPrice.innerHTML = totalPrice.toLocaleString()
    
            deleteTour();
            updateQuantityTour();
        })
}
// End Call API bên sever 


// Xóa tour trong giỏ hàng
const deleteTour = () => {
    const btnsDelete = document.querySelectorAll("[btn-delete]");
    if(btnsDelete){
        
        btnsDelete.forEach(button => {
            button.addEventListener("click", () =>{
                const cart = JSON.parse(localStorage.getItem("cart"));
                const idItem = button.getAttribute("btn-delete");
                const index = cart.findIndex(item => item.tourId == idItem);
                cart.splice(index, 1)
                localStorage.setItem("cart", JSON.stringify(cart));
                drawListTour()
            })
        })
    }
}
// Hết Xóa tour trong giỏ hàng

// Cập nhật số lượng đơn hàng
const updateQuantityTour = () => {
    const inputsUpdate = document.querySelectorAll("[list-tour] input[item-id]");
    if(inputsUpdate){
        // console.log(inputsUpdate)
        inputsUpdate.forEach(input => {
            input.addEventListener("change", () =>{
                const cart = JSON.parse(localStorage.getItem("cart"));
                const idItem = input.getAttribute("item-id");
                const newQuantity = parseInt(input.value);
                const tour = cart.find(item => item.tourId == idItem);
                tour.quantity = newQuantity   
                localStorage.setItem("cart", JSON.stringify(cart));
                drawListTour()
            })
        })
    }
}
// Hết Cập nhật số lượng đơn hàng
drawListTour();

// Lấy thông tin đơn hàng gửi lên sever
const formOrder = document.querySelector("[form-order]")
if(formOrder){
    formOrder.addEventListener("submit", (e) => {
        e.preventDefault();
        const fullName = e.target.elements.fullName.value;
        const phone = e.target.elements.phone.value;
        const note = e.target.elements.note.value;
        const tour = JSON.parse(localStorage.getItem("cart"))

        const data = {
            inforUser: {
                fullName : fullName,
                phone : phone,
                note : note
            }, 
            tour : tour
        }

        fetch("/order", {
            method : "POST",
            body : JSON.stringify(data),
            headers : {
                "Content-Type" : "application/json"
            }
        })
            .then(res => res.json())
            .then(data => {
                if(data.code === 200){
                    localStorage.removeItem("cart");
                    window.location.href = `/order/success/${data.orderCode}`
                }else{
                    window.alert("Đặt hàng thất bại")
                }
            })
    })
}
// Hết Lấy thông tin đơn hàng gửi lên sever

