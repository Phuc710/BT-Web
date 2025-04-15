// find.js

// Hàm debounce để giảm tải
function debounce(func, wait) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

// Lấy ô input và nút tìm kiếm
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');

// Hàm thực hiện tìm kiếm
function performSearch() {
    const searchTerm = searchInput.value.trim().toLowerCase();
    const items = document.querySelectorAll('.item');
    
    items.forEach(item => {
        const itemName = item.querySelector('h3').textContent.toLowerCase();
        if (itemName.includes(searchTerm)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
    
    if (searchTerm === '') {
        items.forEach(item => {
            item.style.display = 'block';
        });
    }
}

// Lắng nghe sự kiện input (tìm kiếm theo thời gian thực)
searchInput.addEventListener('input', debounce(performSearch, 300));

// Lắng nghe sự kiện click vào nút tìm kiếm
searchBtn.addEventListener('click', function(e) {
    e.preventDefault();
    performSearch();
});

// Lắng nghe phím Enter
searchInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        performSearch();
    }
});