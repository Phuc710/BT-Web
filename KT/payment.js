document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const total = parseInt(urlParams.get('total')) || 0;

    const displayAmountElement = document.getElementById('display-amount');
    displayAmountElement.textContent = total.toLocaleString('vi-VN') + 'đ';

    const bankId = 'MB';
    const accountNo = '09696969690';
    const template = 'print';
    const description = 'THANH TOAN SAN PHAM';
    const accountName = 'NGUYEN THANH PHUC';
    const qrUrl = `https://img.vietqr.io/image/${bankId}-${accountNo}-${template}.png?amount=${total}&addInfo=${encodeURIComponent(description)}&accountName=${encodeURIComponent(accountName)}`;

    const qrImage = document.getElementById('qr-code');
    qrImage.src = qrUrl;

   
    let timeLeft = 120;
    const timerElement = document.getElementById('timer');
    let isSuccess = false;
    let checkInterval; 

    function updateTimer() {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timerElement.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        timeLeft--;

        if (timeLeft < 0 && !isSuccess) {
            clearInterval(timerInterval);
            clearInterval(checkInterval); 
            const statusBox = document.getElementById('payment-status');
            statusBox.textContent = 'Hết thời gian. Chưa nhận được thanh toán!';
            statusBox.style.color = '#ff4d4d';
            statusBox.classList.remove('waiting');
        }
    }

    const timerInterval = setInterval(updateTimer, 1000);

    async function checkPaid(price, content) {
        const statusBox = document.getElementById('payment-status');
        const scriptURL = 'https://script.google.com/macros/s/AKfycbwKLfrtiOgWWFLTb5j_4d66I6MeT6tgyT8kYOx2E0eGZ5mtxXy0WEyI_DLeXFJYaL73/exec'; // **<--- CHÈN URL ỨNG DỤNG WEB CỦA BẠN VÀO ĐÂY**

        try {
            const response = await fetch(scriptURL);
            const result = await response.json();
            console.log("Response from API:", result);

            if (result && !result.error && Array.isArray(result.data)) {
                const payments = result.data;
                for (let payment of payments) {
                    let lastPrice = parseInt(payment['Giá trị'] ? payment['Giá trị'].toString().replace(/\./g, '') : '0') || 0;
                    const lastContent = payment['Mô tả'] || '';

                    console.log(`Comparing: price: ${price}, lastPrice: ${lastPrice}, content: ${content}, lastContent: ${lastContent}`);

                    if (lastPrice === price && lastContent.includes(content)) {
                        isSuccess = true;
                        statusBox.textContent = 'Thanh toán thành công!';
                        statusBox.style.color = '#00cc00';
                        statusBox.classList.remove('waiting');
                        clearInterval(timerInterval);
                        clearInterval(checkInterval); 
                        setTimeout(() => {
                            localStorage.removeItem('cart');
                            window.location.href = '/KT/giuaky.html';
                        }, 5000);
                        return; 
                    }
                }
                if (!isSuccess) {
                    statusBox.textContent = 'Đang chờ thanh toán';
                }
            } else {
                console.error('Invalid data structure:', result);
                statusBox.textContent = `Lỗi: Dữ liệu trả về không hợp lệ! ${result.message || ''}`;
                statusBox.style.color = '#ff4d4d';
                statusBox.classList.remove('waiting');
                clearInterval(timerInterval);
                clearInterval(checkInterval); 
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            statusBox.textContent = 'Lỗi khi kiểm tra thanh toán! ' + error.message;
            statusBox.style.color = '#ff4d4d';
            statusBox.classList.remove('waiting');
            clearInterval(timerInterval);
            clearInterval(checkInterval); 
        }
    }


    function startPaymentCheck(price, content) {
        const intervalTime = 5000; // check after 5s
        const maxWait = 120000; // max2p
        let waited = 0;

        checkInterval = setInterval(async () => { 
            if (isSuccess || waited >= maxWait) {
                clearInterval(checkInterval);
                return;
            }
            await checkPaid(price, content);
            waited += intervalTime;
        }, intervalTime);
    }

    startPaymentCheck(total, description);
});