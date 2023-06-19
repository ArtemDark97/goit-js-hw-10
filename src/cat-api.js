// cat-api.js

// Виконати HTTP-запит і отримати список порід
export function fetchBreeds() {
    const url = 'https://api.thecatapi.com/v1/breeds';
    const apiKey = 'live_DVOKJYaLLTjtugnVx0jRkF1rXnET7n2H61o0otopWvn4womFNhTWX1ehERKCdOKo'; // Замініть на свій ключ доступу
    const headers = {
      'x-api-key': apiKey
    };
  
    return fetch(url, { headers })
      .then(response => response.json())
      .catch(error => {
        showError();
        throw error;
      });
  }
  // Виконати HTTP-запит і отримати інформацію про кота за породою
  export function fetchCatByBreed(breedId) {
    const url = `https://api.thecatapi.com/v1/images/search?breed_id=${breedId}`;
    const apiKey = 'live_DVOKJYaLLTjtugnVx0jRkF1rXnET7n2H61o0otopWvn4womFNhTWX1ehERKCdOKo'; // Замініть на свій ключ доступу
    const headers = {
      'x-api-key': apiKey
    };
  
    return fetch(url, { headers })
      .then(response => response.json())
      .then(data => data[0])
      .catch(error => {
        showError();
        throw error;
      });
  }