document.addEventListener('DOMContentLoaded', function() {
    const loginButton = document.querySelector('.nut a');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const usernameError = document.getElementById('username-error');
    const passwordError = document.getElementById('password-error');

    loginButton.addEventListener('click', function(event) {

        usernameError.textContent = '';
        passwordError.textContent = '';

        // Kiểm tra input
        if (!usernameInput.value.trim()) {
            usernameError.textContent = 'Vui lòng nhập tên người dùng.';
            event.preventDefault(); // Ngăn chặn chuyển hướng
            return;
        }

        if (!passwordInput.value.trim()) {
            passwordError.textContent = 'Vui lòng nhập mật khẩu.';
            event.preventDefault(); 
            return;
        }

        event.preventDefault() 

        const username = usernameInput.value;

        // Lưu tên người dùng vào localStorage hoặc sessionStorage
        localStorage.setItem('username', username); // hoặc sessionStorage.setItem('username', username);

        window.location.href = '/KT/giuaky.html';
    });
});