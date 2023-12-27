const MAX_SYMBOLS = 20;
const MAX_HASHTAGS = 5;

const formUpload = document.querySelector('.img-upload__form');
const inputHashtag = document.querySelector('.text__hashtags');
const submitBttn = document.querySelector('#upload-submit');

const pristine = new Pristine(formUpload, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload--invalid',
  successClass: 'img-upload--valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__error'
}, true);


let errorMessage = '';

const getErrorMessage = () => errorMessage;

const hashtagHandler = (value) => {
  errorMessage = '';

  const inputText = value.toLowerCase().trim();

  if(!inputText) {
    return true;
  }

  const inputArray = inputText.split(/\s+/);

  if (inputArray.length === 0) {
    return true;
  }

  const rules = [
    {
      check: inputArray.some((item) => item.includes('#', 1) >= 1),
      error: 'Хеш-теги разделяются пробелами',
    },
    {
      check: inputArray.some((item) => item[0] !== '#'),
      error: 'Хеш-тег должен начинаться с символа #',
    },
    {
      check: inputArray.some((item, num, arr) => arr.includes(item, num + 1)),
      error: 'Хеш-теги не должны повторяться',
    },
    {
      check: inputArray.some((item) => item.length > MAX_SYMBOLS),
      error: `Максимальная длина хеш-тега ${MAX_SYMBOLS} символов, включая решётку`,
    },
    {
      check: inputArray.length > MAX_HASHTAGS,
      error: `Нельзя указать больше ${MAX_HASHTAGS} хеш-тегов`,
    },
    {
      check: inputArray.some((item) => !/^#[a-zа-яё0-9]{1,19}$/i.test(item)),
      error: 'Хеш-тег содержит недопустимые символы',
    },
  ];

  return rules.every((rule) => {
    const isInvalid = rule.check;
    if (isInvalid) {
      errorMessage = rule.error;
    }
    return !isInvalid;
  });
};

pristine.addValidator(inputHashtag, hashtagHandler, getErrorMessage, 2, false);

const onHashtagInput = () => {
  if (pristine.validate()) {
    submitBttn.disabled = false;
  } else {
    submitBttn.disabled = true;
  }
};

inputHashtag.addEventListener('input', onHashtagInput);

inputHashtag.addEventListener('keydown', (evt) => evt.stopPropagation());
formUpload.addEventListener('submit', (evt) => {
  evt.preventDefault();
  onHashtagInput(evt);
  pristine.validate();
});


