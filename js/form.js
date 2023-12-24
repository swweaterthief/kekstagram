import {isEscapeKey} from './util.js';
import {uploadData} from './fetch.js';

const Zoom = {
  MIN: 25,
  MAX: 100,
  STEP: 25,
};

const body = document.querySelector('body');
const overlay = body.querySelector('.img-upload__overlay');
const formUpload = body.querySelector('.img-upload__form');
const formUploadClose = body.querySelector('#upload-cancel');
const fileUpload = body.querySelector('#upload-file');
const submitButton = body.querySelector('#upload-submit');
const minusButton = body.querySelector('.scale__control--smaller');
const plusButton = body.querySelector('.scale__control--bigger');
const scaleControlValue = body.querySelector('.scale__control--value');
const imagePreview = body.querySelector('.img-upload__preview');
const errorMessage = body.querySelector('#error');
const successMessage = body.querySelector('#success');

const onFormUploadCloseClick = () => {
  overlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onCloseFormEscKeyDown);
};

function onCloseFormEscKeyDown(evt) {
  if (isEscapeKey(evt) &&
    !evt.target.classList.contains('text__hashtags') &&
    !evt.target.classList.contains('text__description')
  ) {
    evt.preventDefault();
    onFormUploadCloseClick();
  }
}

const onFileUploadChange = () => {
  overlay.classList.remove('hidden');
  body.classList.add('modal-open');

  document.addEventListener('keydown', onCloseFormEscKeyDown);
};

fileUpload.addEventListener('change', onFileUploadChange);

formUploadClose.addEventListener('click', onFormUploadCloseClick);

const changeZoom = (factor = 1) => {
  let size = parseInt(scaleControlValue.value, 10) + (Zoom.STEP * factor);

  if (size < Zoom.MIN) {
    size = Zoom.MIN;
  }

  if (size > Zoom.MAX) {
    size = Zoom.MAX;
  }

  scaleControlValue.value = `${size}%`;
  imagePreview.style.transform = `scale(${size / 100})`;
};

const onMinusButtonClick = () => {
  changeZoom(-1);
};

const onPlusButtonClick = () => {
  changeZoom();
};

minusButton.addEventListener('click', onMinusButtonClick);
plusButton.addEventListener('click', onPlusButtonClick);

const resetForm = () => {
  formUpload.reset();
  imagePreview.src = 'img/upload-default-image.jpg';
  document.querySelector('.effects__list').querySelectorAll('span').forEach((evt) => {
    evt.style.backgroundImage = 'url(img/upload-default-image.jpg)';
  });
  submitButton.removeAttribute('disabled');
};

const onPopupClick = (evt) => {
  if (!evt.target.classList.contains('success__inner') && !evt.target.classList.contains('error__inner')) {
    evt.preventDefault();
    onFormUploadCloseClick();
    document.removeEventListener('keydown', onCloseFormEscKeyDown);
  }
};

const removeMessage = () => {
  const message = document.querySelector('.error');
  if (message) {
    message.remove();
  } else {
    document.querySelector('.success').remove();
  }
  document.removeEventListener('keydown', onCloseFormEscKeyDown);
};

const showMessage = (message) => {
  message.addEventListener('click', onPopupClick);
  message.querySelector('button').addEventListener('click', removeMessage);
  document.body.appendChild(message);
  document.addEventListener('keydown', removeMessage);
};

const showErrorMessage = () => {
  const messageFragment = errorMessage.content.cloneNode(true);
  showMessage(messageFragment);
};

const showSuccessMessage = () => {
  const messageFragment = successMessage.content.cloneNode(true);
  showMessage(messageFragment);
};


const onError = () => {
  onFormUploadCloseClick();
  showErrorMessage();
};

const onSuccess = () => {
  onFormUploadCloseClick();
  showSuccessMessage();
  resetForm();
};

const onFormUploadSubmit = (evt) => {
  evt.preventDefault();
  uploadData(onSuccess, onError, 'POST', new FormData(evt.target));
};


formUpload.addEventListener('submit', onFormUploadSubmit);

export {formUpload, onFormUploadCloseClick};
