import Popup from './Popup.js'

export default class PopupWithForm extends Popup {
    constructor(popupElement, handleFormSubmit) {
        super(popupElement);
        this._handleFormSubmit = handleFormSubmit;
        this._popupForm = this._popupElement.querySelector('.popup__form');
        this._inputs = [...this._popupForm.querySelectorAll('.popup__input')];
    }

    _getInputValues() {
        const inputValues = {}
        this._inputs.forEach((input) => {
            inputValues[input.name] = input.value
        })
        return inputValues
    }

    setEventListeners() {
        super.setEventListeners();
        this._popupForm.addEventListener('submit', () => {
            this._handleFormSubmit(this._getInputValues())
        });
    }

    close() {
        super.close();
        this._popupForm.reset();
    }
};
