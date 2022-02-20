export class tokenOperator {
    constructor() {
        this.Token_Key = "token";
    }
    getToken() {
        return localStorage.getItem(this.Token_Key);
    }
    setToken(token) {
        localStorage.setItem(this.Token_Key, token);
    }
    clear() {
        localStorage.removeItem(this.Token_Key);
    }
}