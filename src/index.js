// Opisany w dokumentacji
import SimpleLightbox from "simplelightbox";
// Dodatkowy import stylów
import "simplelightbox/dist/simple-lightbox.min.css";

const input = document.querySelector('input');
const button = document.querySelector('button');
const form = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
let lightbox

async function fetchPhotos(inputPhoto) {
  const photos = await getJsonResponse(
    `https://pixabay.com/api/?key=33188868-874ed4f4ba7cc47db513adf3f&q=${inputPhoto
      .split(' ')
      .join('')}&image_type=photo&orientation=horizontal`
  );

  //   const user = await fetch(`my-api.com/profile?token=${token}`);
  //  const friends = await fetch(`my-api.com/users/${user.id}/friends`);
  return photos.hits;
}

function renderPhotos(event) {
  event.preventDefault();

  const inputPhoto = input.value;
  console.log(inputPhoto);

  fetchPhotos(inputPhoto)
    .then(photosArray => {
      console.log(photosArray);

      gallery.innerHTML = ''
      for (let i = 0; i < photosArray.length; i++) {
        const el = photosArray[i];
        console.log(el);

        const galleryItem = document.createElement('li');
        galleryItem.classList.add('gallery-list-item');
        galleryItem.innerHTML = 
        `<a class="gallery__item" href="${el.largeImageURL}">
        <img class="gallery__image" src="${el.webformatURL}" alt="${el.tags}" loading="lazy"/>
        </a>
        <div class="info">
        <p class="info-item">
            <b>Likes</b> ${el.likes}
        </p>
        <p class="info-item">
            <b>Views</b> ${el.views}
        </p>
        <p class="info-item">
            <b>Comments</b> ${el.comments}
        </p>
        <p class="info-item">
            <b>Downloads</b> ${el.downloads}
        </p>
    </div>
        ` 

        gallery.append(galleryItem);
      }
      
      lightbox = new SimpleLightbox('.gallery a', {/* options */ });

    })
    .catch(error => console.error(error));

  event.currentTarget.reset();
}

form.addEventListener('submit', renderPhotos);

async function getJsonResponse(url) {
  const response = await fetch(url);
  return response.json();
}

