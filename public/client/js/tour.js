// Call API bên sever 
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
    })
// End Call API bên sever 