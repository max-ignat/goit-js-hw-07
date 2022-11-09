import { galleryItems } from "./gallery-items.js";
// Change code below this line

console.log(galleryItems);

const gallery = document.querySelector(".gallery");
// console.log(createNewElement(galleryItems));

gallery.insertAdjacentHTML("beforeend", createNewElement(galleryItems));

function createNewElement(galleryItems) {
    return galleryItems
        .map(({ preview, original, description }) => {
            return `
    <div class="gallery__item">
    <a class="gallery__link" href="${original}">
    <img
    class="gallery__image"
    class="lazyload"
    data-src="${preview}"
    data-source="${original}"
    alt="${description}"
    loading="lazy"
    />
    </a>
</div>`;
        })
        .join("");
}




gallery.addEventListener('click', openModal);


function openModal(event) {
    event.preventDefault();
    
    if (event.target.nodeName !== 'IMG') {
    return;
    }

    const instance = basicLightbox.create(
    `<img src=${event.target.dataset.source} width="800" height="600" alt=${event.target.alt}> `,
    {
    onShow: (instance) => {
        window.addEventListener('keydown', escapePress);
    },

    onClose: (instance) => {
        window.removeEventListener('keydown', escapePress);
    },
    }
    );

    
    function escapePress(event) {
    if (event.key !== 'Escape') {
    return;
    }
    instance.close();
    }

    instance.show();
}





const lazyImages = document.querySelectorAll('img[loading=lazy]');
// console.log("lazyImages", lazyImages)


lazyImages.forEach(image => {
    image.addEventListener('load', onImageLoaded, { once: true} )
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
    // console.log('lazyload supported');
} else {
    
    const script = document.createElement('script');
    script.src ='https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    script.integrity ='sha512-q583ppKrCRc7N5O0n2nzUiJ+suUv7Et1JGels4bXOaMFQcamPk9HjdUknZuuFjBNs7tsMuadge5k9RzdmO+1GQ==';
    script.crossOrigin = 'anonymous';
    script.referrerPolicy = 'no-referrer';

    document.body.appendChild(script);
    // console.log('lazyload not supported');
}