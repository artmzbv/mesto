import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import Card from './Card.js';
import Section from './Section.js'
import FormValidator from './FormValidator.js';
import { initialCards } from './initialCards.js';
import UserInfo from './UserInfo.js';
//Практическая работа №4
const user = new UserInfo('profile__title', '.profile__subtitle')
//Переменные формы попапа//
const profileForm = document.querySelector('.popup__form_profile');
const imageForm = document.querySelector('.popup__form_image');

//Практическая работа №6
//Аргументы в FormValidator
const config = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_inactive',
    inputErrorClass: 'popup__input-error',
    errorClass: 'popup__error_active'
};

//Проводим формы через FormValidator
const formImageValid = new FormValidator(config, imageForm);
formImageValid.enableValidation();
const formProfileValid = new FormValidator(config, profileForm);
formProfileValid.enableValidation();

//Переменные профиля//
const inputValueName = document.querySelector('.profile__title');
const inputValueJob = document.querySelector('.profile__subtitle');

const handleProfileFormSubmit = (data) => {
    const { nameinput, jobinput } = data;
    inputValueName.textContent = nameinput;
    inputValueJob.textContent = jobinput;
    popupEdit.close();
};

const cardButtonAdd = document.querySelector('.profile__addbutton');
cardButtonAdd.addEventListener('click', () => {
    document.querySelector('.popup-add').classList.add('popup_opened');

});

//Переменные попапа//
const profileButton = document.querySelector('.profile__editbutton')
profileButton.addEventListener('click', () => {
    document.getElementById('popup-edit').classList.add('popup_opened');
});

//Создаем функцию сохранения инпутов в новую карточку(объект) массива 
const handleCardFormSubmit = (data) => {
    const object = ({
        name: data['titleinput'],
        link: data['refinput']
    });
    cardList.addItem(createCard(object));
    popupAddImage.close();
};

const createCard = (data) => {
    return new Card(data, '#user', () => {
        popupImage.open(data.name, data.link)
    }).generateCard();
};

const renderCards = (data, container) => {
    const card = createCard(data);
    container.prepend(card);
};

const cardList = new Section({ items: initialCards, renderer: renderCards }, '.elements');
cardList.renderItems();

const popupImage = new PopupWithImage('.image-popup');
const popupAddImage = new PopupWithForm('.popup-add', handleCardFormSubmit);
const popupEdit = new PopupWithForm('.popup-edit', handleProfileFormSubmit);

popupImage.setEventListeners();
popupAddImage.setEventListeners();
popupEdit.setEventListeners();