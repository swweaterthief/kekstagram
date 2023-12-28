import {isEscapeKey} from './util.js';

const COUNT_COMMENTS_UNDER_PHOTO = 5;

const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const descriptionOfTheBigPicture = bigPicture.querySelector('.social__caption');
const socialComments = bigPicture.querySelector('.social__comments');
const socialCommentsCount = bigPicture.querySelector('.social__comment-count');
const loadComments = bigPicture.querySelector('.social__comments-loader');
const pictureCloseButton = bigPicture.querySelector('.big-picture__cancel');
const footerText = bigPicture.querySelector('.social__footer-text');

let commentsCount = COUNT_COMMENTS_UNDER_PHOTO;
let currentComments = [];

const generateCommentsUnderPhoto = () => {
  commentsCount = (commentsCount > currentComments.length) ? currentComments.length : commentsCount;
  const commentsSelected = currentComments.slice(0, commentsCount);
  if (currentComments.length <= COUNT_COMMENTS_UNDER_PHOTO || commentsCount >= currentComments.length) {
    loadComments.classList.add('hidden');
  } else {
    loadComments.classList.remove('hidden');
  }
  socialCommentsCount.innerHTML = `<span class="likes-count">${commentsCount} из ${currentComments.length} комментариев</span>`;
  socialComments.textContent = '';
  const commentFragment = document.createDocumentFragment();
  commentsSelected.forEach((comment) => {
    const commentElement = document.createElement('li');
    const avatarElement = document.createElement('img');
    const textElement = document.createElement('p');

    commentElement.classList.add('social__comment');
    avatarElement.classList.add('social__picture');
    textElement.classList.add('social__text');
    avatarElement.src = comment.avatar;
    avatarElement.alt = comment.name;
    textElement.textContent = comment.message;
    commentElement.appendChild(avatarElement);
    commentElement.appendChild(textElement);
    commentFragment.appendChild(commentElement);
  });
  socialComments.appendChild(commentFragment);
};

const onLoadCommentsButtonClick = () => {
  commentsCount += COUNT_COMMENTS_UNDER_PHOTO;
  generateCommentsUnderPhoto();
};

const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  socialComments.textContent = '';
  footerText.value = '';
};

document.addEventListener('keydown', isEscapeKey(closeBigPicture));

const onCloseBigPictureClick = () => {
  closeBigPicture();

  document.removeEventListener('keydown', isEscapeKey);
  pictureCloseButton.removeEventListener('click', onCloseBigPictureClick);
};

const showBigPicture = (photo) => {
  const {url, comments, likes, description} = photo;

  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');

  bigPictureImg.src = url;
  likesCount.textContent = likes;
  descriptionOfTheBigPicture.textContent = description;

  currentComments = comments.slice();

  commentsCount = COUNT_COMMENTS_UNDER_PHOTO;

  generateCommentsUnderPhoto();
  loadComments.addEventListener('click', onLoadCommentsButtonClick);
  document.addEventListener('keydown', isEscapeKey);
  pictureCloseButton.addEventListener('click', onCloseBigPictureClick);
};

export {showBigPicture};
