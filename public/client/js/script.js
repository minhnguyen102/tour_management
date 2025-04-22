// Swipper slide tour detail
var swiper = new Swiper(".mySwiper", {
    spaceBetween: 10,
    slidesPerView: 4,
    freeMode: true,
    watchSlidesProgress: true,
});
var swiper2 = new Swiper(".mySwiper2", {
    spaceBetween: 10,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    thumbs: {
        swiper: swiper,
    },
});
// End Swipper slide tour detail

// Add tour to cart
const cart = localStorage.getItem("cart");
if(!cart){
    localStorage.setItem("cart", JSON.stringify([]))
}

const formAddToCart = document.querySelector("[form-add-to-cart]")
if(formAddToCart){
    formAddToCart.addEventListener("submit", (e) =>{
        e.preventDefault();
        const quantity = parseInt(e.target.elements.quantity.value);
        const tourId = parseInt(formAddToCart.getAttribute("tour-id"));
        
        if(quantity > 0 && tourId){
            const cart = JSON.parse(localStorage.getItem("cart"));
            const indexExitTour = cart.findIndex(item => item.tourId === tourId)
            if(indexExitTour === -1){
                cart.push({
                    tourId : tourId,
                    quantity : quantity
                })
            }else{
                cart[indexExitTour].quantity += quantity
            }
            localStorage.setItem("cart", JSON.stringify(cart))
        }
    })
}
// End Add tour to cart