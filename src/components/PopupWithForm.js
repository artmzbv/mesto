import Popup from './Popup.js'
import {addSubmitButton, editSubmitButton, avatarSubmitButton} from '../utils/utils.js'
export default class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._popupForm = this._popupSelector.querySelector('.popup__form');
        this._submitButton = this._popupForm.querySelector('.popup__submit-button')
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
        this._popupForm.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValues())
        });
    }

    setDeleteButtonSubmit(newSubmit) {
        this._handleFormSubmit = newSubmit;
    }


    close() {
        super.close();
        this._popupForm.reset();
    }
      //Задание 10 - создадим
    loader(isLoading){
        if (isLoading, this._popupSelector) {
        this._submitButton.textContent = 'Сохранение...'
    } else {
        if (this._popupSelector === 'popup-add') {
            this._submitButton.textContent = 'Создать'
        } else {
            this._submitButton.textContent = 'Сохранить'
        }
    }
    }
//   addSubmitButton.addEventListener("click", () => {
//     addSubmitButton.textContent = "Создать...";
//     setTimeout(function () {
//       addSubmitButton.textContent = "Создать";
//     }, 2000);
//     });
  
//   avatarSubmitButton.addEventListener("click", () => {
//     avatarSubmitButton.textContent = "Сохранить...";
//     setTimeout(function () {
//       avatarSubmitButton.textContent = "Сохранить";
//     }, 2000);
//   });
};
