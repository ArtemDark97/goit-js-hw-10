import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

const breedSelect = document.querySelector('#breed-select');
const loader = document.querySelector('#loader');
const error = document.querySelector('#error');
const catInfo = document.querySelector('#cat-info');

function toggleLoader(showLoader) {
  loader.style.display = showLoader ? 'block' : 'none';
}

function toggleError(showError) {
  error.style.display = showError ? 'block' : 'none';
}

function updateBreedSelect(breeds) {
  breeds.forEach(breed => {
    const option = document.createElement('option');
    option.value = breed.id;
    option.textContent = breed.name;
    breedSelect.appendChild(option);
  });

  const slimSelect = new SlimSelect({
    select: '#breed-select'
  });
}

function updateCatInfo(cat) {
  catInfo.innerHTML = '';

  const catImage = document.createElement('img');
  catImage.src = cat.url;
  catInfo.appendChild(catImage);

  const breedName = cat.breeds && cat.breeds.length > 0 ? cat.breeds[0].name : 'Unknown';
  const catName = document.createElement('h3');
  catName.textContent = `Breed: ${breedName}`;
  catInfo.appendChild(catName);

  const breedDescription = cat.breeds && cat.breeds.length > 0 ? cat.breeds[0].description : 'No description available';
  const catDescription = document.createElement('p');
  catDescription.textContent = `Description: ${breedDescription}`;
  catInfo.appendChild(catDescription);

  const breedTemperament = cat.breeds && cat.breeds.length > 0 ? cat.breeds[0].temperament : 'Unknown';
  const catTemperament = document.createElement('p');
  catTemperament.textContent = `Temperament: ${breedTemperament}`;
  catInfo.appendChild(catTemperament);
}

breedSelect.addEventListener('change', async () => {
  const breedId = breedSelect.value;
  toggleLoader(true);
  toggleError(false);

  try {
    const cat = await fetchCatByBreed(breedId);
    updateCatInfo(cat);
  } catch (error) {
    console.error(error);
    toggleError(true);
  } finally {
    toggleLoader(false);
  }
});

window.addEventListener('DOMContentLoaded', async () => {
  toggleLoader(true);
  toggleError(false);

  try {
    const breeds = await fetchBreeds();
    updateBreedSelect(breeds);
  } catch (error) {
    console.error(error);
    toggleError(true);
  } finally {
    toggleLoader(false);
  }
});