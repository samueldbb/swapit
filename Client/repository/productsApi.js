const BASE_URL = 'http://localhost:27017'


export function addSeenProducts( number, token ) {
  return fetch(`${BASE_URL}/addSeenProducts/number/${number}`, {
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


export function getProductsInRange(startIndex, endIndex, token) {
  return fetch(`${BASE_URL}/products/getInRange/startIndex/${startIndex}/endIndex/${endIndex}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    });
}

export function createProduct(formData) {
  return fetch(`${BASE_URL}/products`, {
    method: 'POST',
    body: formData
  })
    .then(response => response.json())
}

export function getProductDetails(productId) {
  return fetch(`${BASE_URL}/products/details/${productId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(response => response.json());
}

