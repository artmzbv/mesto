import '../pages/index.css';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import Card from './Card.js';
import Section from './Section.js'
import FormValidator from './FormValidator.js';
import { initialCards } from './initialCards.js';
import UserInfo from './UserInfo.js';
import { profileForm, imageForm, config, inputValueName, inputValueJob, cardButtonAdd, profileButton } from './utils/components.js';

//Проводим формы через FormValidator
const formImageValid = new FormValidator(config, imageForm);
formImageValid.enableValidation();
const formProfileValid = new FormValidator(config, profileForm);
formProfileValid.enableValidation();

cardButtonAdd.addEventListener('click', () => {
    popupAddImage.open()
});

//открытие попапа профиля//
profileButton.addEventListener('click', () => {
    const data = user.getUserInfo()
    inputValueName.value = data.name
    inputValueJob.value = data.job
    popupEdit.open();
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
//функция изменения данных в формой


const user = new UserInfo({ userName: '.profile__title', userJob: '.profile__subtitle' });

const handleProfileFormSubmit = (data) => {
    const { nameinput, jobinput } = data
    user.setUserInfo(nameinput, jobinput);
    popupEdit.close()
};

const createCard = (data) => {
    return new Card(data, '#user', () => {
        popupImage.open(data.name, data.link)
    }).generateCard();
};
//рендеринг массива карточек


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
