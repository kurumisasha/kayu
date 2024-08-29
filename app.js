document.addEventListener('DOMContentLoaded', function () {
    const generateButton = document.getElementById('generateButton');
    const voucherDetails = document.getElementById('voucherDetails');
    const guestIdInput = document.getElementById('guestId');
    const voucherCodeInput = document.getElementById('voucherCode');

    generateButton.addEventListener('click', function () {
        const guestId = guestIdInput.value.trim();
        const voucherCode = voucherCodeInput.value.trim();

        if (!guestId || !voucherCode) {
            alert('Please enter both Guest ID and Voucher Code');
            return;
        }

        fetchVoucherDetails(guestId, voucherCode);
    });

    function fetchVoucherDetails(guestId, voucherCode) {
        const url = `https://api.teeg.cloud/vouchers/campaigns/guests/${guestId}/voucher/${voucherCode}?tz=`;
        const accessToken = 'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6Imp0X1htek9Od2NqTlg0VFhjTjRvMUhNM2k5aUtpczlpSGgxYTllcEdENGsiLCJ0eXAiOiJKV1QifQ...';  // Ganti dengan full token access kamu

        fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': accessToken,
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Voucher not found');
                }
                return response.json();
            })
            .then(data => {
                voucherDetails.innerHTML = `
                    <p><strong>Voucher Code:</strong> ${data.voucher_code}</p>
                    <p><strong>Amount:</strong> ${data.amount}</p>
                    <p><strong>Expiry Date:</strong> ${data.expiry_date}</p>
                `;
            })
            .catch(error => {
                console.error('Error fetching voucher details:', error);
                voucherDetails.innerHTML = '<p>Failed to fetch voucher details. Please check the Guest ID or Voucher Code and try again later.</p>';
            });
    }
});
