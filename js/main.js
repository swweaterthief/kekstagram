import {installPhotosInGallery} from './photos.js';
import './effects.js';
import './form.js';
import {loadData} from './fetch.js';
import './filter.js';
import './own-photo.js';

let photos = [];

const onSuccess = (data) => {
  photos = data;
  installPhotosInGallery(data);
  document.querySelector('.img-filters').classList.remove('img-filters--inactive');
};

const onError = () => {
  const messageAlert = document.creareElement('div');
  messageAlert.style.position = 'absolute';
  messageAlert.style.left = 0;
  messageAlert.style.top = 0;
  messageAlert.style.right = 0;
  messageAlert.style.fontSize = '30px';
  messageAlert.style.backgroundColor = 'red';
  messageAlert.style.textAlign = 'center';
  messageAlert.textContent = 'Ошибка загрузки фотографии';
  document.body.append(messageAlert);
};

loadData(onSuccess, onError);
export {photos};
