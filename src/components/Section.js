export default class Section {
    constructor({renderer}, selector) {
        this._renderer = renderer;
        this._container = document.querySelector(selector)
    }
    renderItems(items) {
        items.forEach(data => this.addItem(this._renderer(data)))
    };

    addItem(element) {
        this._container.prepend(element);
    }
}