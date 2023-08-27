const url = 'https://striveschool-api.herokuapp.com/api/product/'


async function products() {

  try {
    const response = await fetch(`${url}`, {
      headers: {
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGU2MTljN2QxNjQ1MzAwMTQyOTM0YTIiLCJpYXQiOjE2OTMwNTQ5OTIsImV4cCI6MTY5NDI2NDU5Mn0.vpcjoPvbCZq1-XOpSkApnbLDfTEs3ov-40tYSYGDAGg",
        "Content-Type": "application/json; charset=UTF-8"
      }
    })
    const dbdata = await response.json()
    displayproduct(dbdata)
    console.log(dbdata);

  } catch (error) {
    console.log('errore nel recupero dei prodotti', error);
  }
}


function displayproduct(product) {
  const table = document.getElementById('product-table');
  table.innerHTML = ''

  product.forEach(product => {

    const prod = `
        <tr>
        <td><button class="btn btn-success btn-square" onclick="detail('${product._id}')"><i class="bi bi-search"></i></button></td>
        <td><img src="${product.imageUrl}" alt="" class="primg"></td>
          <td>${product.name}</td>
          <td>${product.brand}</td>
          <td>${product.price}</td>
          <td>${product.description}</td>
          <td>${product._id}</td>
          
          <td>
            <button class="btn btn-primary" onclick="editproduct('${product._id}')">Modifica</button>
            <button class="btn btn-danger" onclick="DeleteProduct('${product._id}')">Cancella</button>
          </td>
  
        </tr>
      `
    table.innerHTML += prod
  }
  )

}


function addproduct() {
  window.location.href = 'addproduct.html'
}

function detail(product_id) {
  window.location.href = `dettagliprodotto.html?id=${product_id}`
}

function back() {
  window.location.href = 'index.html'
}



function editproduct(product_id) {
  window.location.href = `addproduct.html?id=${product_id}`
}


async function DeleteProduct(_id) {
  if (confirm('Sei sicuro di voler eliminare il prodotto')) {
    try {
      const response = await fetch(`${url}${_id}`, {
        method: 'DELETE',
        headers: {
          "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGU2MTljN2QxNjQ1MzAwMTQyOTM0YTIiLCJpYXQiOjE2OTMwNTQ5OTIsImV4cCI6MTY5NDI2NDU5Mn0.vpcjoPvbCZq1-XOpSkApnbLDfTEs3ov-40tYSYGDAGg",
          "Content-Type": "application/json; charset=UTF-8"
        }
      });
      
      if (response.ok) {
        console.log(response);
        location.reload();
      } else {
        console.log('Errore nella cancellazione del prodotto');
      }
    } catch (error) {
      console.log('Errore nella cancellazione del prodotto', error);
    }
  }
}

products()



