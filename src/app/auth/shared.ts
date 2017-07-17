import {FormControl, Validators} from "@angular/forms";

export interface SigninFormControlls {
    email: FormControl;
    password: FormControl;
}

export const Shared = {
    getSigninFormControlls(): SigninFormControlls {
        return {
            email: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', Validators.required)
        };
    }
};
