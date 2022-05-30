export default class FormValidator {
    constructor(config, formElement) {
        this._formElement = formElement;
        this._config = config;
    }

    _showInputError = (inputElement, errorMessage) => {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._config.inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._config.errorClass);
    };

    _hideInputError = (inputElement) => {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._config.inputErrorClass);
        errorElement.classList.remove(this._config.errorClass);
        errorElement.textContent = '';
    };

    _checkInputValidity = (inputElement) => {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(inputElement);
        }
    };

    _setEventListeners = () => {
        const inputList = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));
        const buttonElement = this._formElement.querySelector(this._config.submitButtonSelector);

        this._toggleButtonState(inputList, buttonElement);

        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState(inputList, buttonElement);
            });
        });
    };

    _disabledButton = (buttonElement) => {
        buttonElement.classList.add(this._config.inactiveButtonClass);
        buttonElement.setAttribute('disabled', 'disabled');
    }

    enableValidation = () => {
        const formList = Array.from(document.querySelectorAll(this._config.formSelector));
        formList.forEach(() => {
            this._formElement.addEventListener('submit', (evt) => {
                const buttonElement = this._formElement.querySelector(this._config.submitButtonSelector);
                this._disabledButton(buttonElement, this._config);
            });
            this._setEventListeners(this._formElement, this._config);
        });
    };

    _hasInvalidInput = (inputList) => {
        return inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        })
    };

    _toggleButtonState = (inputList, buttonElement) => {
        if (this._hasInvalidInput(inputList)) {
            this._disabledButton(buttonElement)
        } else {
            buttonElement.classList.remove(this._config.inactiveButtonClass);
            buttonElement.removeAttribute('disabled');
        }
    };
};
