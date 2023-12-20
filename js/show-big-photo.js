import { onDocumentEscKeyDown } from './util.js';

const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const commentsCount = bigPicture.querySelector('.comments-count');
const descriptionOfTheBigPicture = bigPicture.querySelector('.social__caption');
const socialComments = bigPicture.querySelector('..social__comments');
const socialCommentsCount = bigPicture.querySelector('.social__comment-count');
const loadComments = bigPicture.querySelector('.comments-loader');
const pictureCloseButton = bigPicture.querySelector('.big-picture__cancel');

const createCommentElement = (comment) => {
  const commentElement = document.createElement('li');
  commentElement.classList.add('social__comment');

  const avatar = document.createElement('img');
  avatar.classList.add('social__picture');
  avatar.src = comment.avatar;
  avatar.alt = comment.name;
  avatar.width = 35;
  avatar.height = 35;

  const text = document.createElement('p');
  text.classList.add('social__text');
  text.textContent = comment.message;

  commentElement.appendChild(avatar);
  commentElement.appendChild(text);

  return commentElement;
};

const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
};

document.addEventListener('keydown', onDocumentEscKeyDown(closeBigPicture));

const onCloseBigPictureClick = () => {
  closeBigPicture();

  document.removeEventListener('keydown', onDocumentEscKeyDown);
  pictureCloseButton.removeEventListener('click', onCloseBigPictureClick);
};

const showBigPicture = (photo) => {
  socialComments.innerHTML = '';

  const {url, comments, likes, description} = photo;

  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');

  bigPictureImg.src = url;
  likesCount.textContent = likes;
  descriptionOfTheBigPicture.textContent = description;

  commentsCount.textContent = comments.length;

  for (const comment of comments) {
    const commentElement = createCommentElement(comment);
    socialComments.appendChild(commentElement);
  }

  socialCommentsCount.classList.add('hidden');
  loadComments.classList.add('hidden');

  document.addEventListener('keydown', onDocumentEscKeyDown);
  pictureCloseButton.addEventListener('click', onCloseBigPictureClick);
};

export {showBigPicture};
