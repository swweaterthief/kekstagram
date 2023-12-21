import {isEscapeKey} from './util.js';

const Zoom = {
  MIN: 25,
  MAX: 100,
  STEP: 25,
};

const body = document.querySelector('body');
const overlay= body.querySelector('.img-upload__overlay');
const formUpload = body.querySelector('img-upload__form');
const formUploadClose = body.querySelector('#upload-cancel');
const fileUpload = body.querySelector('#upload-file');
const minusButton = body.querySelector('.scale__control--smaller');
const plusButton = body.querySelector('scale__control--bigger');
const scaleControlValue = body.querySelector('.scale__control--value');
const imagePreview = body.querySelector('.img-upload__preview');


const onFormUploadCloseClick = () => {
  overlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onCloseFormEscKeyDown);
  formUpload.reset();
};

function onCloseFormEscKeyDown (evt) {
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
  imagePreview.style.transform = `scale(${size/100})`;
};

const onMinusButtonClick = () => {
  changeZoom(-1);
};

const onPlusButtonClick = () => {
  changeZoom();
};

minusButton.addeventListener('click', onMinusButtonClick);
plusButton.addEventListener('click', onPlusButtonClick);

export {formUpload, onFormUploadCloseClick};
