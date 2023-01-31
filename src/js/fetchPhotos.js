async function fetchPhotos(inputPhoto, page, per_page) {
  const photos = await getJsonResponse(
    `https://pixabay.com/api/?key=33188868-874ed4f4ba7cc47db513adf3f&q=${inputPhoto
      .split(' ')
      .join(
        ''
      )}&image_type=photo&orientation=horizontal&page=${page}&per_page=${per_page}`
  );

  return photos;
}

async function getJsonResponse(url) {
  const response = await fetch(url);
  return response.json();
}

export { fetchPhotos, getJsonResponse };
