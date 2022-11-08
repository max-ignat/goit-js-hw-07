import { galleryItems } from "./gallery-items.js";
// Change code below this line

console.log(galleryItems);

const gallery = document.querySelector(".gallery");
// console.log(createNewElement(galleryItems));
function createNewElement(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `<a class="gallery__item" href="${original}">
  <img class="gallery__image" src="${preview}" alt="${description}" />
</a>`;
    })
    .join("");
}
gallery.insertAdjacentHTML("beforeend", createNewElement(galleryItems));


const galleryEl = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

