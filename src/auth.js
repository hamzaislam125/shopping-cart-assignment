class Auth {
  isAuthenticated = false;

  #tokenKey = "@app/token";

  constructor() {
    this.getToken();
  }

  storeToken(res) {
    sessionStorage.setItem(this.#tokenKey, JSON.stringify(res));
    this.isAuthenticated = true;
  }

  getToken() {
    const res = sessionStorage.getItem(this.#tokenKey);
    if (res) {
      const json = JSON.parse(res);
      this.isAuthenticated = true;
      return json;
    }
    return null;
  }

  getAccessToken() {
    const token = this.getToken();
    if (token) {
      return token.accessToken;
    }
  }

  getUser() {
    const token = this.getToken();
    if (token) {
      return token.user;
    }
  }
}

export default Auth;
