import {EventEmitter} from "@angular/core";
export class AuthService1 {
  loggedIn = false;

  loggedInStatus = new EventEmitter<boolean>();

  isAuthenticated() {
    const promise = new Promise(
      (resolve, reject) => {
        setTimeout(() => {
          resolve(this.loggedIn);
        }, 800);
      }
    );
    return promise;
  }

  login() {
    this.loggedIn = true;
  }

  logout() {
    this.loggedIn = false;
  }
}
