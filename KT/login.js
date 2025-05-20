document.addEventListener('DOMContentLoaded', function() {
    const loginButton = document.querySelector('.nut a');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const usernameError = document.getElementById('username-error');
    const passwordError = document.getElementById('password-error');

    loginButton.addEventListener('click', function(event) {

        usernameError.textContent = '';
        passwordError.textContent = '';
        if (!usernameInput.value.trim()) {
            usernameError.textContent = 'Vui lòng nhập tên người dùng.';
            event.preventDefault();
            return;
        }

        if (!passwordInput.value.trim()) {
            passwordError.textContent = 'Vui lòng nhập mật khẩu.';
            event.preventDefault(); 
            return;
        }
        event.preventDefault() 
        const username = usernameInput.value;

        localStorage.setItem('username', username); 

        window.location.href = 'index.html';
    });
});