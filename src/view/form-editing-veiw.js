import { createEditFormElementTemplate, BLANK_POINT } from '../template/form-editing-template';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';

export default class EditFormView extends AbstractStatefulView {
  #offers = null;
  #destinations = null;

  #handlerFormSubmit = null;
  #handlerFormReset = null;
  #handlerFormSave = null;

  constructor({point = BLANK_POINT, offers, destinations, onFormSubmit, onFormReset, onFormSave}) {
    super();
    this._setState(EditFormView.parsePointToState({point}));
    this.#offers = offers;
    this.#destinations = destinations;
    this.#handlerFormSubmit = onFormSubmit;
    this.#handlerFormReset = onFormReset;
    this.#handlerFormSave = onFormSave;


    this._restoreHandlers();
  }

  get template() {
    return createEditFormElementTemplate({
      state: this._state,
      offers: this.#offers,
      destinations: this.#destinations,
    });
  }

  reset = (point) => this.updateElement({point});

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handlerFormSubmit(this.EditFormView.parseStateToPoint(this._state));
  };

  #formResetHandler = (evt) => {
    evt.preventDefault();
    this.#handlerFormReset();
  };

  #formSaveHandler = (evt) => {
    evt.preventDefault();
    this.#handlerFormSave();
  };

  _restoreHandlers() {
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#formResetHandler);
    this.element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelector('.event__save-btn').addEventListener('click', this.#formSaveHandler);
    this.element.querySelector('.event__type-group').addEventListener('change', this.#typeChangeHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#destinationChangeHandler);
    this.element.querySelector('.event__available-offers')?.addEventListener('change', this.#offerChangeHandler);
    this.element.querySelector('.event__input--price').addEventListener('change', this.#priceChangeHandler);
  }

  #typeChangeHandler = (evt) => {
    this.updateElement({
      point: {
        ...this._state.point,
        type: evt.target.value,
        offers: []
      }
    });
  };

  #destinationChangeHandler = (evt) => {
    const checkedDestination = this.#destinations.find((destination) => destination.city === evt.target.value);
    const checkedDestinationCity = (checkedDestination) ? checkedDestination.city : '';
    const checkedDestinationId = (checkedDestination) ? checkedDestination.id : null;

    this.updateElement({
      point: {
        ...this._state.point,
        city: checkedDestinationCity,
        destinations: checkedDestinationId
      }
    });
  };

  #offerChangeHandler = () => {
    const checkedOffers = Array.from(this.element.querySelectorAll('.event__offer-checkbox:checked'));

    this._setState({
      point: {
        ...this._state.point,
        offers: checkedOffers.map((element) => element.dataset.id)
      }
    });
  };

  #priceChangeHandler = (evt) => {
    this._setState({
      point: {
        ...this._state.point,
        price: evt.target.valueAsNumber
      }
    });
  };

  static parsePointToState = ({point}) => ({point});

  static parseStateToPoint = (state) => state.point;

}
