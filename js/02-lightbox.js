import { galleryItems } from "./gallery-items.js";
// Change code below this line

console.log(galleryItems);

const gallery = document.querySelector(".gallery");

function createNewElement(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
        return `
    <a class="gallery__item" href="${original}">
    <img class="gallery__image"
    class="lazyload"
    data-src="${preview}" 
    alt="${description}"
    loading="lazy"
    />
    </a>`;
    })
    .join("");
}
gallery.insertAdjacentHTML("beforeend", createNewElement(galleryItems));


const lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
    scrollZoom: false,
    
});






const lazyImages = document.querySelectorAll('img[loading=lazy]');
// console.log("lazyImages", lazyImages)


lazyImages.forEach(image => {
    image.addEventListener('load', onImageLoaded,  { once: true}  )
});

function onImageLoaded(event) {
    console.log(' image has been loaded');
    // console.log(event.target)
    event.target.classList.add('appear');
}

if ('loading' in HTMLImageElement.prototype) {
    const lazyImages = document.querySelectorAll('img[loading=lazy]');
    lazyImages.forEach(img => {
        img.src = img.dataset.src;
    })
    // console.log('supported');
} else {
    
    const script = document.createElement('script');
    script.src ='https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    script.integrity ='sha512-q583ppKrCRc7N5O0n2nzUiJ+suUv7Et1JGels4bXOaMFQcamPk9HjdUknZuuFjBNs7tsMuadge5k9RzdmO+1GQ==';
    script.crossOrigin = 'anonymous';
    script.referrerPolicy = 'no-referrer';

    document.body.appendChild(script);
    // console.log('not supported');
}