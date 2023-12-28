const BASE_URL = 'http://localhost:27017'

export function getProductsInRange(startIndex,endIndex) {
  return fetch(`${BASE_URL}/products/getInRange/startIndex/${startIndex}/endIndex/${endIndex}`)
    .then(response => response.json());
}

export function createUser(formData) {
  return fetch(`${BASE_URL}/users`, {
    method: 'POST',
    body: formData
  })
    .then(response => response.json())
}

export function loginUser(credentials) {

  return fetch(`${BASE_URL}/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials)
  })
    .then(response => response.json())
}

export function deleteUser(id, token) {
  return fetch(`${BASE_URL}/users/${id}`, {
    method: 'DELETE',
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

export function getUserDetails() {
  const token = localStorage.getItem('userToken');

  return fetch(`${BASE_URL}/users/details`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then(response => response.json());
}
