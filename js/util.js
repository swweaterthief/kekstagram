const randomInteger = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const DELAY = 500;

export {randomInteger};

const Keys = {
  ESCAPE: 'Escape',
  ESC: 'Esc',
};

const isEscapeKey = (callback) => (evt) => {
  if (evt.key === Keys.ESCAPE || evt.key === Keys.ESC) {
    callback();
  }
};

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
