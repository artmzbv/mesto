//Переменные формы попапа//
export const profileForm = document.querySelector('.popup__form_profile');
export const imageForm = document.querySelector('.popup__form_image');
//Аргументы в FormValidator
export const config = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_inactive',
    inputErrorClass: 'popup__input-error',
    errorClass: 'popup__error_active'
};
//Переменные профиля//
export const inputValueName = document.querySelector('.popup__input_profile_name');
export const inputValueJob = document.querySelector('.popup__input_profile_job');
//открытие попапа добавления карточек//
export const cardButtonAdd = document.querySelector('.profile__addbutton');
//открытие попапа профиля//
export const profileButton = document.querySelector('.profile__editbutton')