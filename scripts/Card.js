export default class Card {
    constructor(data) {
        //привязываем свойства объекта к массиву 
        this._name = data.name;
        this._link = data.link;
    };
    //выбираем нужный template
    _getTemplate() {
        //создаем карточку на основе template
        const cardElement = document
            //объявляем template, элементы которого перейдут в конйтенер блока elements// 
            .querySelector('#user')
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
        // Вернём элемент наружу
        return this._element;
    }

    _setEventListeners() {
        //Объявляем переменные удаления и лайков
        this._element.querySelector('.element__like').addEventListener('click', () => {
            this._toggleLikes();
        });

        this._element.querySelector('.element__delete').addEventListener('click', () => {
            this._deleteCard();
        });
        this._element.querySelector('.element__mask-group').addEventListener('click', () => {
            cardExpand(this._name, this._link);
        });
    };
    //1.Создаем  функцию изменения лайков 
    _toggleLikes() {
        this._element.querySelector('.element__like').classList.toggle('element__like_active');
    };

    //2.Создаем функцию удаления карточек
    _deleteCard() {
        this._element.remove();
    };
};