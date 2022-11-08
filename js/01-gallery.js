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
    <a class="gallery__link" href="large-image.jpg">
    <img
    class="gallery__image"
    src="${preview}"
    data-source="${original}"
    alt="${description}"
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