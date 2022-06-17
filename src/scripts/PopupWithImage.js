import Popup from "./Popup.js"

export default class PopupWithImage extends Popup {
    open = (name, link) => {
        super.open();
        const elementImageExpand = this._popupSelector.querySelector('.image-popup__mask-group');
        const elementImageExpandText = this._popupSelector.querySelector('.image-popup__text');
        elementImageExpand.src = link
        elementImageExpand.alt = name;
        elementImageExpandText.textContent = name;
    }
}