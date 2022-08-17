class UserInfo {
  constructor({ userNameSelector, userAboutSelector, userAvatarSelector }) {
    this._name = document.querySelector(userNameSelector);
    this._about = document.querySelector(userAboutSelector);
    this._avatar = document.querySelector(userAvatarSelector);
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

  setUserAvatar({ avatar }) {
    this._avatar.src = avatar;
  }
}

export default UserInfo;
