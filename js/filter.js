import { debounce, shuffleArray } from './util';
import { installPhotosInGallery } from './photos';
import { photos } from './main';
import { closeBigPicture } from './big-photo';

const COUNT_OF_FILTER = 10;
const ACTIVE_CLASS = 'img-filters__button--active';

const imgFilters = document.querySelector('.img-filters');
const imgFiltersForm = imgFilters.querySelector('.img-filters__form');

const availableFilters = {
  'filter-default': () => photos.slice(),
  'filter-random': () => shuffleArray(photos.slice()).slice(0, COUNT_OF_FILTER),
  'filter-discusssed': () => photos.slice().sort((firstElement, secondElement) => secondElement.comments.length - firstElement.comments.length),
};

const isButton = (evt) => evt.target.tagName === 'BUTTON';

const onImagFiltersFormClick = debounce((evt) => {
  if (isButton(evt)) {
    closeBigPicture();

    installPhotosInGallery(availableFilters[evt.target.id]());
  }
});

const onButtonClick = (evt) => {
  if (isButton(evt)) {
    const selectedButton = imgFiltersForm.querySelector(`.${ACTIVE_CLASS}`);

    if (selectedButton) {
      selectedButton.classList.remove(ACTIVE_CLASS);
    }

    evt.target.classList.add(ACTIVE_CLASS);

  }
};

imgFiltersForm.addEventListener('click', onImagFiltersFormClick);
imgFiltersForm.addEventListener('click', onButtonClick);
