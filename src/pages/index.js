import './index.css';
import PopupWithImage from '../components/PopupWithImage.js'
import PopupWithForm from '../components/PopupWithForm.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js'
import FormValidator from '../components/FormValidator.js';
import { initialCards } from '../utils/initialCards.js';
import UserInfo from '../components/UserInfo.js';
import { profileForm, imageForm, config, inputValueName, inputValueJob, cardButtonAdd, profileButton } from '../utils/utils.js';

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
    const { name, job } = data
    user.setUserInfo(name, job);
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
