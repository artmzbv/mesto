import './index.css';
import PopupWithImage from '../components/PopupWithImage.js'
import PopupWithForm from '../components/PopupWithForm.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js'
import FormValidator from '../components/FormValidator.js';
import UserInfo from '../components/UserInfo.js';
import { profileForm, imageForm, addSubmitButton, editSubmitButton, avatarSubmitButton, config, inputValueName, inputValueJob, cardButtonAdd, profileButton, avatarButton } from '../utils/utils.js';
//import PopupWithSubmit from '../components/PopupWithSubmit.js';
import { api } from '../components/Api.js'

//Задание 10 - создадим 
editSubmitButton.addEventListener('click', () => {
    save.textContent = "Сохранить..."
    setTimeout(function () {
        save.textContent = "Сохранить"
    }, 1000);
})

addSubmitButton.addEventListener('click', () => {
    addSubmitButton.textContent = "Создать..."
    setTimeout(function () {
        adds.textContent = "Создать"
    }, 2000);
})

avatarSubmitButton.addEventListener('click', () => {
    avatarSubmitButton.textContent = "Сохранить..."
    setTimeout(function () {
        avatarSubmitButton.textContent = "Сохранить"
    }, 2000);
})


api.getUserData()
    .then(res => {
        console.log(res)
        user.setUserInfo(res.name, res.about, res.avatar)
        userId = res._id
    });
let userId

api.getInitialCards()
    .then(res => {
        console.log(res)
        res.forEach(data => {
            const object = ({
                name: data.name,
                link: data.link,
                likes: data.likes,
                id: data._id,
                userId: userId,
                ownerId: data.owner._id
            });
            cardList.addItem(createCard(object));
        });
    });


//Проводим формы через FormValidator
const formImageValid = new FormValidator(config, imageForm);
formImageValid.enableValidation();
const formProfileValid = new FormValidator(config, profileForm);
formProfileValid.enableValidation();

cardButtonAdd.addEventListener('click', () => {
    popupAddImage.open()
});
avatarButton.addEventListener('click', () => {
    popupAvatar.open()
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
    api.postNewCard(data['titleinput'], data['refinput'])
        .then(res => {
            const object = ({
                name: res.name,
                link: res.link,
                likes: res.likes,
                id: res._id,
                userId: userId,
                ownerId: res.owner._id
            });
            cardList.addItem(createCard(object));
            popupAddImage.close();
        })
        .catch((err) => {
            console.log(err);
        });
};
//функция изменения данных в формой


const user = new UserInfo({ userName: '.profile__title', userJob: '.profile__subtitle', userAvatar: '.profile__avatar' });

const handleProfileFormSubmit = (data) => {
    const { name, job } = data
    api.patchProfile(name, job)
        .then((res) => {
            console.log(res)
            user.setUserInfo(res.name, res.about, res.avatar);
            popupEdit.close()
        })
        .catch((err) => {
            console.log(err);
        });
};

// const handleCardDelete = (id) => {
//     console.log(id)
//     popupDelete.open()
//     popupDelete.setDeleteButtonSubmit(() => {
//         api.deleteCard(data._id)
//             .then(() => {
//                 popupDelete.close();
//                 card.deleteCard();
//             })
//             .catch(console.log())
//     })
// }

const createCard = (data) => {
    const card = new Card(data, '#user', () => {
        popupImage.open(data.name, data.link, data.likes, data._id)
    }, (id) => {
        console.log(id)
        popupDelete.open()
        popupDelete.setDeleteButtonSubmit(() => {
            api.deleteCard(id)
                .then(res => {
                    card.deleteCard();
                    popupDelete.close()
                })
                .catch((err) => {
                    console.log(err);
                });
        })
    }, (id) => {
        if (card.switchLikes()) {
            api.deleteLike(id)
                .then(res => {
                    card.countLikes(res.likes)
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            api.addLike(id)
                .then(res => {
                    card.countLikes(res.likes)
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    })
    return card.generateCard()
}


//рендеринг массива карточек
const renderCards = (data, container) => {
    const card = createCard(data);
    container.prepend(card);
};


const cardList = new Section({ items: [], renderer: renderCards }, '.elements');
cardList.renderItems();

const handleAvatarFormSubmit = (input) => {
    api.changeAvatar(input)
        .then(res => {
            console.log(res)
            user.setUserInfo(res.name, res.about, res.avatar)
            popupAvatar.close();
        })
        .catch((err) => {
            console.log(err);
        });
}


const popupImage = new PopupWithImage('.image-popup');
const popupAddImage = new PopupWithForm('.popup-add', handleCardFormSubmit);
const popupEdit = new PopupWithForm('.popup-edit', handleProfileFormSubmit);
const popupDelete = new PopupWithForm('.popup-delete');
const popupAvatar = new PopupWithForm('.popup-avatar', handleAvatarFormSubmit);


popupImage.setEventListeners();
popupAddImage.setEventListeners();
popupEdit.setEventListeners();
popupDelete.setEventListeners();
popupAvatar.setEventListeners();