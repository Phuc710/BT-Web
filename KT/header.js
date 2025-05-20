document.querySelector('.hamburger').addEventListener('click', () => {
    document.querySelector('nav ul').classList.toggle('active');
});

document.addEventListener('DOMContentLoaded', function () {
    const userInfo = document.getElementById('user-info');
    const quit = document.getElementById('dn');
    const username = localStorage.getItem('username');

    if (username) {
        userInfo.style.display = 'inline-block';
        quit.style.display = 'none';
        userInfo.innerHTML = `
            <i class="fa-regular fa-user"></i> Hi, ${username} 
            <button id="logout" style="margin-left: 15px; padding: 7px 12px;">LOG OUT</button>
        `;

        document.getElementById('logout').addEventListener('click', function () {
            localStorage.removeItem('username');
            location.reload();
        });
    } else {
        userInfo.style.display = 'none';
        quit.style.display = 'flex';
    }
});

