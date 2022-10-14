import { Directive } from "@angular/core";
import { ValidatorFn, AbstractControl, ValidationErrors, NG_VALIDATORS } from "@angular/forms";

@Directive({
    selector : '[passwordvalidator]',
    providers: [{provide: NG_VALIDATORS, useExisting: PasswordCheackDirective, multi: true}]
})
export class PasswordCheackDirective {

    reg:RegExp = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,12}$/;

    constructor(){}
    validate(control: AbstractControl): ValidationErrors | null {
        console.log(control.value)

        const cheack = this.reg.test(control.value);
        console.log(cheack);
        return cheack ? null : {matchpass : true};
}
}