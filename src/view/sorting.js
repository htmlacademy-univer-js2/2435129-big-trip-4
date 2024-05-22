import AbstractView from '../framework/view/abstract-view.js';
import { SortType, SortTypeDescription, SORT_TYPES_DISABLED } from '../const.js';

const createSortingTemplate = (currentSortType) => (
  `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    ${Object.values(SortType).map((sortType) => `<div class="trip-sort__item  trip-sort__item--${sortType}">
    <input ${currentSortType === sortType ? 'checked' : ''} data-sort-type=${sortType} id="sort-${sortType}"
    class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${sortType}"
    ${SORT_TYPES_DISABLED.includes(sortType) ? 'disabled' : ''}>
    <label class="trip-sort__btn" for="sort-${sortType}">${SortTypeDescription[sortType]}</label>
    </div>`).join('')}
  </form>`
);

export default class SortingView extends AbstractView{

  #currentSortType = null;

  constructor(currentSortType) {
    super();
    this.#currentSortType = currentSortType;
  }

  get template(){
    return createSortingTemplate(this.#currentSortType);
  }

  setSortTypeChangeHandler = (callback) => {
    this._callback.sortTypeChange = callback;
    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  };

  #sortTypeChangeHandler = (evt) => {
    if (evt.target.tagName !== 'INPUT') {
      return;
    }
    evt.preventDefault();
    this._callback.sortTypeChange(evt.target.dataset.sortType);
  };
}
