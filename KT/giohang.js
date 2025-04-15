// giuaky.js
document.addEventListener('DOMContentLoaded', function() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    updateCartTotal();

    const buyButtons = document.querySelectorAll('.buy-btn');
    buyButtons.forEach(button => {
        button.addEventListener('click', addToCart);
    });

    function addToCart(event) {
        const button = event.target;
        const name = button.dataset.name;
        const price = parseInt(button.dataset.price);
        const image = button.dataset.image;

        const item = {
            name: name,
            price: price,
            image: image,
            quantity: 1
        };

        const existingItem = cart.find(cartItem => cartItem.name === name);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push(item);
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartTotal();
    }

    function updateCartTotal() {
        let total = 0;
        cart.forEach(item => {
            total += item.price * item.quantity;
        });
        document.getElementById('cart-total').textContent = total.toLocaleString('vi-VN');
    }
});

