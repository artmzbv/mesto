import FormValidator from './FormValidator.js';
import Card from './Card.js';

//Практическая работа №4
//Переменные попапа//
const profilePopup = document.getElementById('popup-edit');
const profileButtonClosed = profilePopup.querySelector('.popup__close-button');
const profileButton = document.querySelector('.profile__editbutton');

//Переменные формы попапа//
const profileForm = document.querySelector('.popup__form_profile');
const nameInput = profileForm.querySelector('.popup__input_profile_name');
const jobInput = profileForm.querySelector('.popup__input_profile_job');

//Переменные профиля//
const inputValueName = document.querySelector('.profile__title');
const inputValueJob = document.querySelector('.profile__subtitle');

//Переключение для кнопок "добавить" и "редактировать"//
profileButton.addEventListener('click', function () {
    openPopup(profilePopup);
    nameInput.value = inputValueName.textContent;
    jobInput.value = inputValueJob.textContent;
});

profileButtonClosed.addEventListener('click', function () {
    closePopup(profilePopup)
});

//Функция перезаписи и сохранения изменений и отправки формы//
function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    inputValueName.textContent = nameInput.value;
    inputValueJob.textContent = jobInput.value;
    closePopup(profilePopup);
};

profileForm.addEventListener('submit', handleProfileFormSubmit);

//Практическая работа №5
const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

//проблемный элемент - постоянно рисует ошибки - по поводу data
const renderCard = (data) => {
    const card = new Card(data);
    const cardElement = card.generateCard();
    document.querySelector('.elements').prepend(cardElement);
};

initialCards.forEach(data => {
    renderCard(data);
});

//Функция расширения карточки
const popupImage = document.querySelector('.image-popup');
const elementImageExpand = document.querySelector('.image-popup__mask-group');
const elementImageExpandText = document.querySelector('.image-popup__text');

const cardExpand = (name, link) => {
    elementImageExpand.alt = name;
    elementImageExpand.src = link;
    elementImageExpandText.textContent = name;
    openPopup(popupImage);
};

//Функция закрытия карточки
const imageButtonClose = document.querySelector('.popup__close-button_image');
imageButtonClose.addEventListener('click', function closeImagePopup() {
    closePopup(popupImage);
});

//Функции переключения//
function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupByEscape);
    document.addEventListener('click', closePopupByOverlay);
};

function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupByEscape);
    document.removeEventListener('click', closePopupByOverlay);
};

//Инпуты в форме
const imageForm = document.querySelector('.popup__form_image');
const titleInput = imageForm.querySelector('.popup__input_profile_title');
const refInput = imageForm.querySelector('.popup__input_profile_ref');
//Создаем функцию сохранения инпутов в новую карточку(объект) массива 
function handleCardFormSubmit(evt) {
    evt.preventDefault();
    const object = {
        name: titleInput.value,
        link: refInput.value,
    };
    renderCard(object)
    closePopup(popupAdd);

    titleInput.value = ""
    refInput.value = ""
};

imageForm.addEventListener('submit', handleCardFormSubmit);

// выбираем нужные элементы в html файле
const popupAdd = document.getElementById('popup-add');
const addButtonClose = popupAdd.querySelector('.popup__close-button');

//создаем кнопки открытия и закрытия нового попапа
//кнопка "добавить"
const cardButtonAdd = document.querySelector('.profile__addbutton')

//Привязываем слушатель к кнопке "добавить"
cardButtonAdd.addEventListener('click', function () {
    openPopup(popupAdd);
});

//привязываем слушатель к кнопке "закрыть"
addButtonClose.addEventListener('click', function () {
    closePopup(popupAdd);
});

//Практическая работа №6
function closePopupByEscape(evt) {
    if (evt.key === 'Escape') {
        const popupOpened = document.querySelector('.popup_opened')
        closePopup(popupOpened);
    }
};

function closePopupByOverlay(evt) {
    if (evt.target.classList.contains('popup')) {
        const popupOpened = document.querySelector('.popup_opened')
        closePopup(popupOpened);
    }
};

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
