document.getElementById('review-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const product = document.getElementById('product').value;
  const title = document.getElementById('title').value;
  const reviewText = document.getElementById('review-text').value;
  const rating = document.getElementById('rating').value;
  const userName = document.getElementById('user-name').value;
  const userImage = document.getElementById('user-image').files[0];

  const productImages = {
    'AK-47': '/image/ak47.webp',
    'AWP': '/image/awp.webp',
    'Dao bướm': '/image/buom.webp'
  };

  let imageSrc = '/image/default-user.jpg';
  if (userImage) {
    const reader = new FileReader();
    reader.onload = function (e) {
      imageSrc = e.target.result;
      saveReview();
    };
    reader.readAsDataURL(userImage);
  } else {
    saveReview();
  }

  function saveReview() {
    const review = {
      id: Date.now(), 
      product,
      productImage: productImages[product],
      title,
      reviewText,
      rating,
      userName,
      userImage: imageSrc,
      date: new Date().toLocaleDateString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      })
    };

    let reviews = JSON.parse(localStorage.getItem('reviews')) || [];
    reviews.push(review);
    localStorage.setItem('reviews', JSON.stringify(reviews));

    window.location.href = '/KT/danhgia.html';
  }
});