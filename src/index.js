import { fetchPhotos } from './js/fetchPhotos';
import { createGallery } from './js/createGallery';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Notiflix from 'notiflix';

const input = document.querySelector('input[name="searchQuery"]');
const form = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
//const loadMore = document.querySelector('.load-more');

console.log(input)
let inputPhoto;
let page = 1;
let per_page = 40;
let totalPages;
let totalPhotos;

function renderPhotos(event) {
  page = 1;
  event.preventDefault();
  gallery.innerHTML = '';
  inputPhoto = input.value;

  fetchPhotos(inputPhoto, page, per_page)
    .then(photosArray => {
      totalPhotos = photosArray.total;
      createGallery(photosArray.hits);
      totalPages = totalPhotos / per_page;

      /*       if (page <= totalPages) {
        loadMore.classList.remove('is-hidden');
      } */

      if (totalPhotos === 0) {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      } else {
        Notiflix.Notify.success(`Hooray! We found ${totalPhotos} images.`);
      }
    })
    .catch(error => console.error(error));

  event.currentTarget.reset();
}

function loadMorePhotos() {
  totalPages = totalPhotos / per_page;

  page += 1;
  fetchPhotos(inputPhoto, page, per_page)
    .then(photosArray => {
      createGallery(photosArray.hits);
    })
    .catch(error => console.error(error));

  /* if (page > totalPages) {
    loadMore.classList.add('is-hidden');
  } */
}

function hasMorePhotos() {
    const {
        scrollTop,
        scrollHeight,
        clientHeight
    } = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight - 5) {
        loadMorePhotos()
    }
}

form.addEventListener('submit', renderPhotos);
//loadMore.addEventListener('click', loadMorePhotos);
window.addEventListener("scroll", hasMorePhotos)
