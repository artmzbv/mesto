export default class Card {
    constructor(data, template, expandCard, removeCard, likeCard) {
        //привязываем свойства объекта к массиву 
        this._name = data.name;
        this._link = data.link;
        this._likes = data.likes;
        this._id = data.id;
        this._userId = data.userId;
        this._ownerId = data.ownerId;

        this._template = template;
        this._expandCard = expandCard;
        this._removeCard = removeCard;
        this._likeCard = likeCard;
    };
    //выбираем нужный template
    _getTemplate() {
        //создаем карточку на основе template
        const cardElement = document
            //объявляем template, элементы которого перейдут в конйтенер блока elements// 
            .querySelector(this._template)
            .content
            //elements, судя по всему
            .querySelector('.element')
            .cloneNode(true)
        return cardElement;
    }

    generateCard() {
        // Запишем разметку в приватное поле _element. 
        // Так у других элементов появится доступ к ней.
        this._element = this._getTemplate();
        this._imageElement = this._element.querySelector('.element__mask-group');
        this._titleElement = this._element.querySelector('.element__title');
        this._deleteElement = this._element.querySelector('.element__delete');
        this._likesCounter = this._element.querySelector('.element__like-counter');
        this._likeElement = this._element.querySelector('.element__like')
        this._setEventListeners();
        // Добавим данные
        this._imageElement.src = this._link;
        this._imageElement.alt = this._name;
        this._titleElement.textContent = this._name;
        // Добавим счетчик лайков 
        this.countLikes(this._likes);
        // Вернём элемент наружу
        if (this._ownerId !== this._userId) {
            this._deleteElement.classList.add('element__delete_inactive');
        }
        return this._element;
    }

    _setEventListeners() {
        //Объявляем переменные удаления и лайков
        this._likeElement.addEventListener('click', () => {
            this._likeCard(this._id);
        });
        this._imageElement.addEventListener('click', () => {
            this._expandCard();
        });
        this._deleteElement.addEventListener('click', () => {
            this._removeCard(this._id);
        });
    };
    //Создаем  функцию изменения лайков 
    _removeLikes() {
        this._likeElement.classList.remove('element__like_active');
    };
    _paintLikes() {
        this._likeElement.classList.add('element__like_active');
    };

    switchLikes() {
        const myLikes = this._likes.find(user => user._id === this._userId)
        return myLikes
    }
    //ПР9 - 5. Отображение количества лайков карточки
    countLikes(likesActualised) {
        this._likes = likesActualised;
        this._likesCounter.textContent = this._likes.length

        if (this.switchLikes()) {
            this._paintLikes();
        } else {
            this._removeLikes();
        }
    }

    //2.Создаем функцию удаления карточек
    deleteCard() {
        this._element.remove();
        this._element = null;
    }
}