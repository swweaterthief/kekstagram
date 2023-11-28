const messages = [
  'Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра.', 'В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

const descriptions = ['У меня все хорошо!', 'Мацарайва и ультравайоленс.', 'Подружки топ.', 'Пилоты выпустили новый альбом.', 'Лана дель рей это икона.', 'Люблю цветы!', 'Мой котик иногда глупый, но я его люблю.',];

const names = ['Ярослава', 'Мирожанна', 'Алиса', 'Нацу', 'Люси', 'Эрза', 'Леви', 'Слоумо', 'Венди'];

const COUNT_PHOTO =  25;

const photos  = [];

const comments = {
  MIN: 0,
  MAX: 30
};
const ids = {
  MIN: 1,
  MAX: 100
};

const likes = {
  MIN: 15,
  MAX: 200
};

const randomInteger = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const addComment = () => ({
  id: randomInteger(ids.MIN, ids.MAX),
  avatar: `img/avatar-${randomInteger(1, 6)}}.svg`,
  message: messages[randomInteger(0, messages.length - 1)],
  name: names[randomInteger(0, names.length - 1)]
});

const generateComments = () => {
  const commentsArray = [];
  const commentsCount = randomInteger(comments.MIN, comments.MAX);
  for (let i = 0; i < commentsCount; i++) {
    commentsArray.push(addComment());
  }
  return comments;
};


const addPhoto = (index) => ({
  id: index + 1,
  url: `photos/${index + 1}.jpg`,
  description: descriptions[randomInteger(0, descriptions.length-1)],
  likes: randomInteger(likes.MIN, likes.MAX),
  comments: generateComments()
});

const addPhotos = () => {
  for (let i = 0; i < COUNT_PHOTO; i++) {
    photos.push(addPhoto(i));
  }
};

addPhotos();


