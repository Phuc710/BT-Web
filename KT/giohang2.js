document.addEventListener('DOMContentLoaded', function () {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let discount = 0; // Biến lưu giá trị giảm giá
    const couponInput = document.getElementById('coupon-code');
    const couponError = document.getElementById('coupon-error');

    function renderCart() {
        const cartItemsTable = document.getElementById('cart-items').getElementsByTagName('tbody')[0];
        const cartTotalP = document.getElementById('cart-total');
        cartItemsTable.innerHTML = '';

        if (cart.length === 0) {
            cartItemsTable.innerHTML = '<tr><td colspan="5">Giỏ hàng của bạn đang trống.</td></tr>';
            cartTotalP.textContent = 'Tổng tiền: 0đ';
            return;
        }

        let total = 0;
        cart.forEach((item, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>
                    <img src="${item.image}" alt="${item.name}" style="width: 150px; height: 100px; object-fit: cover;">
                    <span class="product-name">${item.name}</span>
                </td>
                <td>${item.price.toLocaleString('vi-VN')}đ</td>
                <td><input type="number" class="quantity-input" data-index="${index}" value="${item.quantity}" min="1"></td>
                <td>${(item.price * item.quantity).toLocaleString('vi-VN')}đ</td>
                <td><button class="remove-btn" data-index="${index}">Xóa</button></td>
            `;
            cartItemsTable.appendChild(row);
            total += item.price * item.quantity;
        });

        // Áp dụng giảm giá
        total -= total * discount;

        cartTotalP.textContent = `Tổng tiền: ${total.toLocaleString('vi-VN')}đ`;

        // Gán lại sự kiện xóa
        document.querySelectorAll('.remove-btn').forEach(button => {
            button.addEventListener('click', removeItem);
        });

        // Gán lại sự kiện chỉnh sửa số lượng
        document.querySelectorAll('.quantity-input').forEach(input => {
            input.addEventListener('change', updateQuantity);
        });
    }

    function removeItem(event) {
        const index = event.target.dataset.index;
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
    }

    function updateQuantity(event) {
        const index = event.target.dataset.index;
        const newQuantity = parseInt(event.target.value);

        if (newQuantity <= 0) {
            event.target.value = 1;
            return;
        }

        cart[index].quantity = newQuantity;
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
    }

    function applyCoupon() {
        const couponCode = couponInput.value;

        if (couponCode === 'PhucBoyPho' || couponCode === 'Lisa' || couponCode === 'BigSale') {
            discount = 0.5;
            couponError.textContent = 'Mã hợp lệ';
            couponError.style.color = 'green'; // Màu xanh lá cây
            couponInput.value = '';
        } else {
            discount = 0;
            couponError.textContent = `Coupon "${couponCode}" does not exist! X`;
            couponError.style.color = 'red'; // Màu đỏ
            couponInput.value = '';
        }
        renderCart();
    }

    document.getElementById('apply-coupon').addEventListener('click', applyCoupon);

    renderCart();
});