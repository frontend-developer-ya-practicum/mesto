class UserInfo {
  constructor(userNameSelector, userAboutSelector) {
    this._name = document.querySelector(userNameSelector);
    this._about = document.querySelector(userAboutSelector);
    this._id = null;
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      about: this._about.textContent,
      id: this._id,
    }
  }

  setUserInfo(userInfo) {
    this._name.textContent = userInfo.name;
    this._about.textContent = userInfo.about;
    this._id = userInfo._id;
  }
}

export default UserInfo;
