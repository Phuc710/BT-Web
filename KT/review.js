document.addEventListener('DOMContentLoaded', function () {
const urlParams = new URLSearchParams(window.location.search);
const reviewId = urlParams.get('id');
const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
const review = reviews.find(r => r.id == reviewId);

  if (review) {
    document.getElementById('product-img').src = review.productImage;
    document.getElementById('product-img').alt = review.product;
    document.getElementById('product-title').textContent = `Đánh Giá Sản Phẩm ${review.product}`;
    document.getElementById('review-title').textContent = review.title;
    document.getElementById('review-text').textContent = review.reviewText;
    document.getElementById('user-img').src = review.userImage;
    document.getElementById('user-img').alt = review.userName;
    document.getElementById('user-name').textContent = review.userName;
    document.getElementById('rating').textContent = '⭐'.repeat(review.rating) + '☆'.repeat(5 - review.rating) + ` ${review.rating}/5`;
  } else {
    document.querySelector('.container').innerHTML = '<p>Đánh giá không tồn tại.</p>';
  }
});