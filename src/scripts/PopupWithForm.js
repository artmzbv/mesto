import Popup from './Popup.js'

export default class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._popupForm = this._popupSelector.querySelector('.popup__form');
    }

    _getInputValues() {
        const inputs = this._popupForm.querySelectorAll('.popup__input')
        const inputValues = {}
        inputs.forEach((input) => {
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