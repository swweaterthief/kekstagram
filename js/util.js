const photos = ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg', '7.jpg', '8.jpg', '9.jpg', '10.jpg', '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg', '16.jpg', '17.jpg', '18.jpg', '19.jpg','20.jpg','21.jpg','22.jpg','23.jpg','24.jpg','25.jpg'];

const messages = [
  'Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра.', 'В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

const names = ['Ярослава', 'Мирожанна', 'Алиса', 'Нацу', 'Люси', 'Эрза', 'Леви', 'Слоумо', 'Венди'];

const descriptions = ['У меня все хорошо!', 'Мацарайва и ультравайоленс.', 'Подружки топ.', 'Пилоты выпустили новый альбом.', 'Лана дель рей это икона.', 'Люблю цветы!', 'Мой котик иногда глупый, но я его люблю.',];

const randomInteger = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const Keys = {
  ESCAPE: 'Escape',
  ESC: 'Esc',
};

const isEscapeKey = (callback) => (evt) => {
  if (evt.key === Keys.ESCAPE || evt.key === Keys.ESC) {
    callback();
  }
};

const DELAY = 500;

export {isEscapeKey};

const debounce = (cb) => {
  let lastTimeout = null;

  return (...args) => {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(() => {
      cb(...args);
    }, DELAY);
  };
};

const shuffleArray = (array) => {
  for (let indexOne = array.length - 1; indexOne > 0; indexOne--) {
    const indexTwo = Math.floor(Math.random() * (indexOne + 1));
    [array[indexOne], array[indexTwo]] = [array[indexTwo], array[indexOne]];
  }
  return array;
};

export {debounce};
export {shuffleArray};
export {photos, descriptions, messages, names};
export {randomInteger};
