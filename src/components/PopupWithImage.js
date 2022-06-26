import Popup from "./Popup.js"

export default class PopupWithImage extends Popup {
    constructor(popupElement) {
        super(popupElement);
        this._elementImageExpand = this._popupElement.querySelector('.image-popup__mask-group');
        this._elementImageExpandText = this._popupElement.querySelector('.image-popup__text');
    }
    open = (name, link) => {
        super.open();
        this._elementImageExpand.src = link
        this._elementImageExpand.alt = name;
        this._elementImageExpandText.textContent = name;
    }
} 