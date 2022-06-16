export default class UserInfo {
    constructor(userName, userJob) {
        this.nameSelector = document.querySelector(userName)
        this._jobSelector = document.querySelector(userJob)
    }

    getUserInfo() {
        return {
            name: this._nameSelector.textcontent,
            job: this._jobSelector.textcontent
        }
    }

    setUserInfo(name, job) {
        this._nameSelector = name;
        this._userJob = job;
    }
} 
