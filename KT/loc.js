function locsp(minPrice, maxPrice, category = null) {
    let products = document.querySelectorAll(".item");
    products.forEach(product => {
        let price = Number(product.getAttribute("data-price"));
        let productCategory = product.closest('.container').previousElementSibling.textContent.trim();
        let matchesCategory = !category || productCategory === category;
        if (price >= minPrice && price <= maxPrice && matchesCategory) {
            product.style.display = "";
        } else {
            product.style.display = "none";
        }
    });
}

function resetloc() {
    let products = document.querySelectorAll(".item");
    products.forEach(product => {
        product.style.display = "";
    });
}

function sortPrice(order) {
    let containers = document.querySelectorAll(".container");
    containers.forEach(container => {
        let items = Array.from(container.querySelectorAll(".item"));
        items.sort((a, b) => {
            let priceA = Number(a.getAttribute("data-price"));
            let priceB = Number(b.getAttribute("data-price"));
            return order === "asc" ? priceA - priceB : priceB - priceA;
        });
        items.forEach(item => container.appendChild(item));
    });
}