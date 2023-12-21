import {photos, descriptions, messages, names} from './data.js';
import {randomInteger} from './util.js';
import {installPhotosInGallery} from './photos.js';
import './effects.js';
import './form-style.js';
import './form.js';
import {loadData} from './fetch.js';

installPhotosInGallery(photos);

const COUNT_PHOTO =  25;

const Comments = {
  MIN: 0,
  MAX: 30
};
const Ids = {
  MIN: 1,
  MAX: 100
};

const Likes = {
  MIN: 15,
  MAX: 200
};

const addComment = () => ({
  id: randomInteger(Ids.MIN, Ids.MAX),
  avatar: `img/avatar-${randomInteger(1, 6)}}.svg`,
  message: messages[randomInteger(0, messages.length - 1)],
  name: names[randomInteger(0, names.length - 1)]
});

const generateComments = () => {
  const commentsArray = [];
  const commentsCount = randomInteger(Comments.MIN, Comments.MAX);
  for (let i = 0; i < commentsCount; i++) {
    commentsArray.push(addComment());
  }
  return Comments;
};


const addPhoto = (index) => ({
  id: index + 1,
  url: `photos/${index + 1}.jpg`,
  description: descriptions[randomInteger(0, descriptions.length-1)],
  likes: randomInteger(Likes.MIN, Likes.MAX),
  comments: generateComments()
});

const addPhotos = () => {
  for (let i = 0; i < COUNT_PHOTO; i++) {
    photos.push(addPhoto(i));
  }
};

addPhotos();

let photo = [];

const onSuccess = (data) => {
  photo = data.slice();
  installPhotosInGallery(photo);
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
