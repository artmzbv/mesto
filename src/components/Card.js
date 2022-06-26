export default class Card {
    constructor(data, template, cardExpand, cardDelete, cardLike) {
        //привязываем свойства объекта к массиву 
        this._name = data.name;
        this._link = data.link;
        this._likes = data.likes;
        this._id = data.id;
        this._userId = data.userId;
        this._ownerId = data.ownerId;

        this._template = template;
        this._cardExpand = cardExpand;
        this._cardDelete = cardDelete;
        this._cardLike = cardLike;
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
        this._setEventListeners();

        // Добавим данные
        this._element.querySelector('.element__mask-group').src = this._link;
        this._element.querySelector('.element__mask-group').alt = this._name;
        this._element.querySelector('.element__title').textContent = this._name;
        // Добавим счетчик лайков 
        this.countLikes(this._likes);
        // Вернём элемент наружу
        if (this._ownerId !== this._userId) {
            this._element.querySelector('.element__delete').style.display = 'none';
        }
        return this._element;
    }

    _setEventListeners() {
        //Объявляем переменные удаления и лайков
        this._element.querySelector('.element__like').addEventListener('click', () => {
            this._cardLike(this._id);
        });
        this._element.querySelector('.element__mask-group').addEventListener('click', () => {
            this._cardExpand();
        });
        this._element.querySelector('.element__delete').addEventListener('click', () => {
            this._cardDelete(this._id);
        });
    };
    //Создаем  функцию изменения лайков 
    _removeLikes() {
        this._element.querySelector('.element__like').classList.remove('element__like_active');
    };
    _paintLikes() {
        this._element.querySelector('.element__like').classList.add('element__like_active');
    };

    switchLikes() {
        const myLikes = this._likes.find(user => user._id === this._userId)
        return myLikes
    }
    //ПР9 - 5. Отображение количества лайков карточки
    countLikes(likesActualised) {
        this._likes = likesActualised;
        const likesCounter = this._element.querySelector('.element__like-counter')
        likesCounter.textContent = this._likes.length

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

