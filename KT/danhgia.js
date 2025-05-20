document.addEventListener('DOMContentLoaded', function () {
  const container = document.getElementById('review-container');
  const reviews = JSON.parse(localStorage.getItem('reviews')) || [];

  reviews.forEach(review => {
    const post = document.createElement('div');
    post.className = 'post';
    post.innerHTML = `
      <img src="${review.productImage}" alt="${review.product}">
      <div class="post-content">
        <p class="date">${review.date}</p>
        <h2>${review.title}</h2>
        <p>${review.reviewText.substring(0, 100)}...</p>
        <a href="/KT/review.html?id=${review.id}">Xem chi tiết →</a>
      </div>
    `;
    container.appendChild(post);
  });
});