export default class UserInfo {
    constructor({ userName, userJob }) {
        this._nameElement = document.querySelector(userName)
        this._jobElement = document.querySelector(userJob)
    }

    getUserInfo() {
        return {
            name: this._nameElement.textContent,
            job: this._jobElement.textContent
        }
    }

    setUserInfo(name, job) {
        this._nameElement.textContent = name;
        this._jobElement.textContent = job;
    }
} 
