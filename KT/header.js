document.addEventListener('DOMContentLoaded', function() {
  // Quản lý hiển thị tên người dùng
  const userDisplay = document.getElementById('user-display');
  const loginLink = document.querySelector('.right-menu a[href="/KT/login.html"]');
  const username = localStorage.getItem('username'); // Lấy tên người dùng từ localStorage

  if (username) {
    userDisplay.innerHTML = `<i class="fa-regular fa-user"></i> ${username}`;
      if (loginLink) {
          loginLink.style.display = 'none';
      }
  } else {
      userDisplay.textContent = 'SIGN IN'; 
  }

    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('nav ul');
    const navLinks = document.querySelectorAll('nav ul li a');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });

        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
            });
        });
    }
});