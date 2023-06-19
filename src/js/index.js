import SlimSelect from 'slim-select';
import Notiflix from 'notiflix';
import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

const breedSelect = document.querySelector('#breed-select');
const loader = document.querySelector('#loader');
const error = document.querySelector('#error');
const catInfo = document.querySelector('#cat-info');
let currentCatCard = null;

function toggleLoader(showLoader) {
  loader.style.display = showLoader ? 'block' : 'none';
}

function toggleError(showError) {
  error.style.display = showError ? 'block' : 'none';
}

async function updateBreedSelect() {
  toggleLoader(true);
  toggleError(false);

  try {
    const breeds = await fetchBreeds();
    breedSelect.innerHTML = '';
    breeds.forEach(breed => {
      const option = document.createElement('option');
      option.value = breed.id;
      option.textContent = breed.name;
      breedSelect.appendChild(option);
    });

    const slimSelect = new SlimSelect('#breed-select');
  } catch (error) {
    console.error(error);
    toggleError(true);
  } finally {
    toggleLoader(false);
  }
}

async function updateCatInfo(breedId) {
  if (currentCatCard) {
    currentCatCard.style.display = 'none';
  }

  toggleLoader(true);
  toggleError(false);

  try {
    const cat = await fetchCatByBreed(breedId);

    const catCard = document.createElement('div');

    const catImage = document.createElement('img');
    catImage.src = cat.url;
    catCard.appendChild(catImage);

    const breedName = cat.breeds && cat.breeds.length > 0 ? cat.breeds[0].name : 'Unknown';
    const catName = document.createElement('h3');
    catName.textContent = `Breed: ${breedName}`;
    catCard.appendChild(catName);

    const breedDescription = cat.breeds && cat.breeds.length > 0 ? cat.breeds[0].description : 'No description available';
    const catDescription = document.createElement('p');
    catDescription.textContent = `Description: ${breedDescription}`;
    catCard.appendChild(catDescription);

    const breedTemperament = cat.breeds && cat.breeds.length > 0 ? cat.breeds[0].temperament : 'Unknown';
    const catTemperament = document.createElement('p');
    catTemperament.textContent = `Temperament: ${breedTemperament}`;
    catCard.appendChild(catTemperament);

    catInfo.appendChild(catCard);
    currentCatCard = catCard;
  } catch (error) {
    console.error(error);
    toggleError(true);
  } finally {
    toggleLoader(false);
  }
}

window.addEventListener('DOMContentLoaded', async () => {
  updateBreedSelect();
});

breedSelect.addEventListener('change', async () => {
  const breedId = breedSelect.value;
  updateCatInfo(breedId);
});

Notiflix.Notify.Init({ timeout: 3000 });