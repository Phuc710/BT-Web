
function debounce(func, wait) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');

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

searchInput.addEventListener('input', debounce(performSearch, 300));

searchBtn.addEventListener('click', function(e) {
    e.preventDefault();
    performSearch();
});

searchInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        performSearch();
    }
});