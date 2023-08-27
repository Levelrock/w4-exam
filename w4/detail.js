const url = 'https://striveschool-api.herokuapp.com/api/product/';

async function printdetail() {
    const urlParams = new URLSearchParams(new URL(window.location.href).search);
    const productId = urlParams.get('id');

    if (!productId) {
        console.log('ID del prodotto non fornito nella query string');
        return;
    }

    try {
        const response = await fetch(`${url}${productId}`, {
            headers: {
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGU2MTljN2QxNjQ1MzAwMTQyOTM0YTIiLCJpYXQiOjE2OTMwNTQ5OTIsImV4cCI6MTY5NDI2NDU5Mn0.vpcjoPvbCZq1-XOpSkApnbLDfTEs3ov-40tYSYGDAGg",
                "Content-Type": "application/json; charset=UTF-8"
            }
        });

        if (response.ok) {
            const product = await response.json();
            proddet(product);
        } else {
            console.log('Errore nel caricamento del prodotto');
        }
    } catch (error) {
        console.log('Errore nel caricamento del prodotto', error);
    }
}

function proddet(product) {
    const prodDet = document.getElementById('product-details');
    prodDet.innerHTML = `
        <h1>${product.name}</h1>
        <img src="${product.imageUrl}" alt="${product.name}">
        <p>${product.description}</p>
        <p>Prezzo: ${product.price} €</p>
    `;
}

printdetail();

function back() {
    window.location.href = 'index.html';
}
