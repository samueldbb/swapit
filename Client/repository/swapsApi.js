const BASE_URL = 'http://localhost:27017'


export function getProductsInRange(startIndex,endIndex) {
  return fetch(`${BASE_URL}/products/getInRange/startIndex/${startIndex}/endIndex/${endIndex}`)
    .then(response => response.json());
}

export function createSwap(formData) {
  return fetch(`${BASE_URL}/swaps`, {
    method: 'POST',
    body: formData
  })
    .then(response => response.json())
}


export function addLikedProduct( product_liked_id, token ) {
  return fetch(`${BASE_URL}/users/addLikedProduct`, {

    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` // Add the token to the request headers
    }
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    });
}

export function addProductToSwap( updates, token ) {
  return fetch(`${BASE_URL}/users/addProductToSwap`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` // Add the token to the request headers
    },
    body: JSON.stringify(updates)
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    });
}
export function validateToken(token) {

  return fetch(`${BASE_URL}/users/validateToken`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(token)
  })
    .then(response => response.json())
}

