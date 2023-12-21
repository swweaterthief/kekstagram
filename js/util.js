const randomInteger = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

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
