export default class Section {
    constructor({ items, renderer }, selector) {
        this._items = items;
        this._renderer = renderer;
        this._container = document.querySelector(selector)
    }
    renderItems() {
        this._items.forEach(data => this._renderer(data, this._container));
    };

    addItem(element) {
        this._container.prepend(element);
    }
}