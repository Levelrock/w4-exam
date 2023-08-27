const url = 'https://striveschool-api.herokuapp.com/api/'

const form = document.getElementById('add_product');

const url_img = document.getElementById('url_img');
const product = document.getElementById('prodotto');
const produttore = document.getElementById('produttore');
const price = document.getElementById('prezzo');
const des = document.getElementById('descrizione');


form.addEventListener('submit', async (event) => {

  event.preventDefault();
  const urlid = new URLSearchParams(new URL(window.location.href).search)
  const productId = urlid.get('id')
  const validation = handler();
  if (!validation) return false;



  const productValue = {
    name: product.value,
    brand: produttore.value,
    imageUrl: url_img.value,
    price: price.value,
    description: des.value
  }

  let response;

  try {
    if (productId) {
       response = await fetch(`${url}product/${productId}`, {
        method: 'PUT',
        body: JSON.stringify(productValue),
        headers: {
          "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGU2MTljN2QxNjQ1MzAwMTQyOTM0YTIiLCJpYXQiOjE2OTMwNTQ5OTIsImV4cCI6MTY5NDI2NDU5Mn0.vpcjoPvbCZq1-XOpSkApnbLDfTEs3ov-40tYSYGDAGg",
          "Content-Type": "application/json; charset=UTF-8",
        }
      })
    }else{
       response = await fetch(`${url}product/`, {
        method: 'POST',
        body: JSON.stringify(productValue),
        headers: {
          "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGU2MTljN2QxNjQ1MzAwMTQyOTM0YTIiLCJpYXQiOjE2OTMwNTQ5OTIsImV4cCI6MTY5NDI2NDU5Mn0.vpcjoPvbCZq1-XOpSkApnbLDfTEs3ov-40tYSYGDAGg",
          "Content-Type": "application/json; charset=UTF-8",
        }
      })
    }

    if (response.ok) {
      window.location.href = 'index.html'
    } else {
       alert('Si è verificato un errore durante la creazione del prodotto')
    }

  } catch (error) {
    console.log('errore durante il salvataggio', error);
    alert('Si è verificato un errore durante l\'aggiunta di un prodotto')
  }

}
)


function handler() {

  const validation = validate()
  let isValid = true;

  if (!validation.isValid) {

    for (const field in validation.errors) {
      const errorData = document.getElementById(`${field}-error`)
      errorData.textContent = '';
      errorData.textContent = validation.errors[field]
    }

    isValid = false

  }

  return isValid

}

  


function validate() {
  const errors = {}

  if (!url_img.value) errors.url_img = "Immagine Richiesta";
  else errors.url_img = "";

  if (!product.value) errors.product = "Nome prodotto Richiesto";
  else errors.product = "";

  if (!produttore.value) errors.produttore = "Produttore Richiesto";
  else errors.produttore = "";

  if (!price.value) errors.price = "Prezzo Richiesto";
  else errors.price = "";

  if (!des.value) errors.des = "Descrizione Richiesta";
  else errors.des = "";

  return {
    isValid: Object.values(errors).every(value => value === ''),
    errors
  };
}

validate()



function back() {
  window.location.href = 'index.html'
}

//cancella prodotto


async function DeleteProduct(_id) {
  if (confirm('Sei sicuro di voler eliminare il prodotto?')) {
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


//modifica prodtto

async function getproduct(_id) {
  const urlid = new URLSearchParams(new URL(window.location.href).search)
  const productId = urlid.get('id')

  console.log(productId);



  if (productId) {
    try {
      const response = await fetch(`${url}product/${productId}`, {
        method: 'GET',
        headers: {
          "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGU2MTljN2QxNjQ1MzAwMTQyOTM0YTIiLCJpYXQiOjE2OTMwNTQ5OTIsImV4cCI6MTY5NDI2NDU5Mn0.vpcjoPvbCZq1-XOpSkApnbLDfTEs3ov-40tYSYGDAGg",
          "Content-Type": "application/json; charset=UTF-8",
        }
      })
      const productRes = await response.json();
      console.log(productRes);
      if (!(productRes)) {
        console.log('il prodotto non esiste');
        return 
      }
      
      console.log(productRes.name);

      product.value = productRes.name;
      produttore.value = productRes.brand;
      url_img.value = productRes.imageUrl;
      price.value = productRes.price;
      des.value = productRes.description;

      return productRes
      

    } catch (error) {
      console.log('errore nel recupero del prodotto', error);
    }
  }
}

getproduct()





