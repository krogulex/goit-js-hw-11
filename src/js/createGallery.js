import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

function createGallery(photosArray) {
  const gallery = document.querySelector('.gallery');

  for (let i = 0; i < photosArray.length; i++) {
    const el = photosArray[i];

    const galleryItem = document.createElement('li');
    galleryItem.classList.add('gallery-list-item');
    galleryItem.innerHTML = `<a class="gallery__item" href="${el.largeImageURL}"><img class="gallery__image" src="${el.webformatURL}" alt="${el.tags}" loading="lazy"/></a><div class="info"><p class="info-item"><b>Likes</b> ${el.likes}</p><p class="info-item"><b>Views</b> ${el.views}</p><p class="info-item"><b>Comments</b> ${el.comments}</p><p class="info-item"><b>Downloads</b> ${el.downloads}</p></div>`;

    gallery.append(galleryItem);
  }

  let lightbox = new SimpleLightbox('.gallery a', {
    /* options */
  }).refresh();
}
export { createGallery };
