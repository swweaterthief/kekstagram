import {isEscapeKey} from './util.js';

const body = document.querySelector('body');
const overlay= body.querySelector('.img-upload__overlay');
const formUpload = body.querySelector('img-upload__form');
const formUploadClose = body.querySelector('#upload-cancel');
const fileUpload = body.querySelector('#upload-file');

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
