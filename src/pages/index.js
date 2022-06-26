import "./index.css";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import FormValidator from "../components/FormValidator.js";
import UserInfo from "../components/UserInfo.js";
import {profileForm, imageForm, config, inputValueName, inputValueJob, cardButtonAdd, profileButton, avatarButton} from "../utils/utils.js";
import { api } from "../components/Api.js";

let userId;

//Проводим формы через FormValidator
const formImageValid = new FormValidator(config, imageForm);
formImageValid.enableValidation();
const formProfileValid = new FormValidator(config, profileForm);
formProfileValid.enableValidation();

cardButtonAdd.addEventListener("click", (evt) => {
  evt.preventDefault();
  popupAddImage.open();
});
avatarButton.addEventListener("click", () => {
  popupAvatar.open();
});

//открытие попапа профиля//
profileButton.addEventListener("click", () => {
  const data = user.getUserInfo();
  inputValueName.value = data.name;
  inputValueJob.value = data.job;
  popupEdit.open();
});

//Создаем функцию сохранения инпутов в новую карточку(объект) массива
const handleCardFormSubmit = (data) => {
popupAddImage.loader(true)
  api.postNewCard(data["titleinput"], data["refinput"])
    .then((res) => {
      const object = {
        name: res.name,
        link: res.link,
        likes: res.likes,
        id: res._id,
        userId: userId,
        ownerId: res.owner._id,
      };
      cardList.renderItems(object);
      popupAddImage.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => popupAddImage.loader(false, 'add'))
};
//функция изменения данных в формой

const user = new UserInfo({
  userName: ".profile__title",
  userJob: ".profile__subtitle",
  userAvatar: ".profile__avatar",
});

const handleProfileFormSubmit = (data) => {
  popupEdit.loader(true)
  const { name, job } = data;
  api
    .patchProfile(name, job)
    .then((res) => {
      console.log(res);
      user.setUserInfo(res.name, res.about, res.avatar);
      popupEdit.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => popupEdit.loader(false, 'add'))
};

const createCard = (data) => {
  const card = new Card(
     data = ({
        name: data.name,
        link: data.link,
        likes: data.likes,
        id: data._id,
        userId: userId,
        ownerId: data.owner._id}),
    "#user",
    () => {
      popupImage.open(data.name, data.link, data.likes, data._id);
    },
    (id) => {
      console.log(id);
      popupDelete.open();
      popupDelete.setDeleteButtonSubmit(() => {
        api
          .deleteCard(id)
          .then((res) => {
            card.deleteCard();
            popupDelete.close();
          })
          .catch((err) => {
            console.log(err);
          });
      });
    },
    (id) => {
      if (card.switchLikes()) {
        api
          .deleteLike(id)
          .then((res) => {
            card.countLikes(res.likes);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        api
          .addLike(id)
          .then((res) => {
            card.countLikes(res.likes);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  );
  return card.generateCard();
};

const cardList = new Section({ renderer: createCard }, ".elements");

const handleAvatarFormSubmit = (input) => {
  popupAvatar.loader(true)
  api.changeAvatar(input)
    .then((res) => {
      console.log(res);
      user.setUserInfo(res.name, res.about, res.avatar);
      popupAvatar.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => popupAvatar.loader(false))
};

const popupImage = new PopupWithImage(".image-popup");
const popupAddImage = new PopupWithForm(".popup-add", handleCardFormSubmit);
const popupEdit = new PopupWithForm(".popup-edit", handleProfileFormSubmit);
const popupDelete = new PopupWithForm(".popup-delete");
const popupAvatar = new PopupWithForm(".popup-avatar", handleAvatarFormSubmit);

popupImage.setEventListeners();
popupAddImage.setEventListeners();
popupEdit.setEventListeners();
popupDelete.setEventListeners();
popupAvatar.setEventListeners();

Promise.all([api.getUserData(), api.getInitialCards()])
  .then((res) => {
    console.log(res);
    user.setUserInfo(res[0].name, res[0].about, res[0].avatar);
    userId = res[0]._id;
    cardList.renderItems(res[1]);
  }) //все данные получены, отрисовываем страницу
  .catch((err) => {
   console.log(err)
  });

//   api.getUserData().then((res) => {
//     console.log(res);
//     console.log(res);
//     user.setUserInfo(res.name, res.about, res.avatar);
//     userId = res._id;
//   })
//   .catch((err) => {
//     //попадаем сюда если один из промисов завершится ошибкой
//     console.log(err);
//   });

// api.getInitialCards()
//      .then(res => {
//          console.log(res)
//          res.forEach(data => {
//              const object = ({
//                  name: data.name,
//                  link: data.link,
//                  likes: data.likes,
//                  id: data._id,
//                  userId: userId,
//                  ownerId: data.owner._id
//              });
//              cardList.addItem(createCard(object));
//          });
//      });
 