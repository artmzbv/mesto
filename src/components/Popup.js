export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this.buttonClose = this._popup.querySelector('.popup__close-button')
        this._handleEscClose = this._handleEscClose.bind(this);
    }
    //добавляем слушатели кликов кнопке закрытия (класс для всех кнопок одинаковый - ни один попап не пострадает)
    //сюда же можно запихнуть оверлей
    setEventListeners() {
        this.buttonClose.addEventListener('click', () => {
            this.close()
        })
        this._popup.addEventListener('click', (evt) => {
            if (evt.target.classList.contains('popup')) {
                this.close();
            }
        })
    }

    //функция закрытия попапа через ESC 
    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.close();
        }
    }

    //функция открытия попапа
    open() {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
    };

    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
    };
}