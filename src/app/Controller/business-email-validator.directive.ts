import { Directive, ElementRef, Renderer2 } from "@angular/core";
import { FormControl, NG_VALIDATORS, Validator } from "@angular/forms";
declare var $:any;

@Directive({
    selector: '[EmailValidator]',
    providers: [{ provide: NG_VALIDATORS, useExisting: BusinessEmailValidatorDirective, multi: true }]
})
export class BusinessEmailValidatorDirective implements Validator {
    constructor(public ref: ElementRef, private renderer: Renderer2) {
    }
    validate(control: FormControl) {
        let valid = null;
        $('.exclamation,.error-msg').remove();
        this.validateTest(control, (val: any) => {
            if (val == null) {
                if (control?.value == null || control?.value == undefined) {
                    valid = null;
                }
                valid = ['gmail', 'gmail.com', 'gmail.co', 'gmail.c']?.indexOf(control?.value?.split('@')[1]) != -1 ? true : false;
                if ((control?.dirty || control?.touched)) {
                    if (valid) {
                        const icon = document.createElement('i');
                        this.renderer.setAttribute(icon, "class", 'fa-solid fa-circle-exclamation exclamation');
                        this.renderer.setAttribute(icon, "style", `
                        position: absolute;
                        top: ${(this.ref.nativeElement?.clientHeight / 2) - 8}px;
                        left: ${this.ref.nativeElement?.clientWidth - 25}px;
                        color: red;`);
                        this.renderer.insertBefore(this.ref.nativeElement.parentNode, icon, this.ref.nativeElement);
                        this.ref.nativeElement.style['padding-right'] = '25px';
                        this.ref.nativeElement.parentNode.style['position'] = 'relative'
                        const ErrorMessageTag = document.createElement('p');
                        this.renderer.setAttribute(ErrorMessageTag, "class", 'error-msg');
                        this.renderer.setAttribute(ErrorMessageTag, "style", `
                        position: absolute;
                        top: 0px;
                        left: 20px;
                        font-size:10px;
                        color: red;`);
                        let TextNode = document.createTextNode("Please enter your business email address.");
                        ErrorMessageTag.appendChild(TextNode);
                        this.renderer.insertBefore(this.ref.nativeElement.parentNode, ErrorMessageTag, this.ref.nativeElement);
                        valid = { invalidBusinessEmail: true }
                    } else {
                        const icon = document.createElement('i');
                        this.renderer.setAttribute(icon, "class", 'fa-solid fa-check exclamation');
                        this.renderer.setAttribute(icon, "style", `
                        position: absolute;
                        top: ${(this.ref.nativeElement?.clientHeight / 2) - 8}px;
                        left: ${this.ref.nativeElement?.clientWidth - 25}px;
                        color: green;`);
                        this.renderer.insertBefore(this.ref.nativeElement.parentNode, icon, this.ref.nativeElement);
                        this.ref.nativeElement.style['padding-right'] = '25px';
                        this.ref.nativeElement.parentNode.style['position'] = 'relative'
                        valid = null
                    }
                } else {
                    valid = null;
                }
            } else {
                valid = val;
            }
        })
        return valid;
    }

    async validateTest(control: FormControl, CallBack: any) {
        $('.exclamation,.error-msg').remove();
        const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
        const valid = emailRegex.test(control.value);
        if ((control?.dirty || control?.touched)) {
            if (valid == false) {
                const icon = document.createElement('i');
                this.renderer.setAttribute(icon, "class", 'fa-solid fa-circle-exclamation exclamation');
                this.renderer.setAttribute(icon, "style", `
                position: absolute;
                top: ${(this.ref.nativeElement?.clientHeight / 2) - 8}px;
                left: ${this.ref.nativeElement?.clientWidth - 25}px;
                color: red;`);
                this.renderer.insertBefore(this.ref.nativeElement.parentNode, icon, this.ref.nativeElement);
                this.ref.nativeElement.style['padding-right'] = '25px';
                this.ref.nativeElement.parentNode.style['position'] = 'relative'

                const ErrorMessageTag = document.createElement('p');
                this.renderer.setAttribute(ErrorMessageTag, "class", 'error-msg');
                this.renderer.setAttribute(ErrorMessageTag, "style", `
                position: absolute;
                top: 0px;
                left: 20px;
                font-size:10px;
                color: red;`);
                let TextNode = document.createTextNode("Invalid email address.");
                ErrorMessageTag.appendChild(TextNode);
                this.renderer.insertBefore(this.ref.nativeElement.parentNode, ErrorMessageTag, this.ref.nativeElement);
            } else {
                const icon = document.createElement('i');
                this.renderer.setAttribute(icon, "class", 'fa-solid fa-check exclamation');
                this.renderer.setAttribute(icon, "style", `
                position: absolute;
                top: ${(this.ref.nativeElement?.clientHeight / 2) - 8}px;
                left: ${this.ref.nativeElement?.clientWidth - 25}px;
                color: green;`);
                this.renderer.insertBefore(this.ref.nativeElement.parentNode, icon, this.ref.nativeElement);
                this.ref.nativeElement.style['padding-right'] = '25px';
                this.ref.nativeElement.parentNode.style['position'] = 'relative'
            }
        } else {
            CallBack(null);
        }
        CallBack(valid ? null : { invalidEmail: true });
    }
}