import {showBigPicture} from './show-big-photo.js';

const pictures = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const installPhotoInGallery = (photo) => {
  const pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = photo.url;
  pictureElement.querySelector('.picture__img').alt = photo.description;
  pictureElement.querySelector('.picture__likes').textContent = photo.likes;
  pictureElement.querySelector('.picture__comments').textContent = photo.comments.length;

  const onPictureElementClick = (evt) => {
    evt.preventDefault();
    showBigPicture(photo);
  };

  pictureElement.addEventListener('click', onPictureElementClick);
  return pictureElement;
};

const installPhotosInGallery = (photos) => {
  const fragment = document.createDocumentFragment();
  photos.forEach((photo) => {
    fragment.appendChild(installPhotoInGallery(photo));
  });
  pictures.appendChild(fragment);
};

export {installPhotosInGallery};
