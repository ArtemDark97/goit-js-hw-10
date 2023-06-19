const API_KEY = 'live_DVOKJYaLLTjtugnVx0jRkF1rXnET7n2H61o0otopWvn4womFNhTWX1ehERKCdOKo'; 

export async function fetchBreeds() {
  const response = await fetch('https://api.thecatapi.com/v1/breeds', {
    headers: {
      'x-api-key': API_KEY,
    },
  });
  const data = await response.json();
  return data;
}
 
export async function fetchCatByBreed(breedId) {
  const response = await fetch(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`, {
    headers: {
      'x-api-key': API_KEY,
    },
  });
  const data = await response.json();
  return data[0];
}