import { Directive, ElementRef, Renderer2 } from "@angular/core";
import { FormControl, NG_VALIDATORS, Validator } from "@angular/forms";
declare var $:any;

@Directive({
    selector: '[MobileValidator]',
    providers: [{ provide: NG_VALIDATORS, useExisting: MobileValidatorDirective, multi: true }]
})
export class MobileValidatorDirective implements Validator {
    constructor(public ref: ElementRef, private renderer: Renderer2) {
    }
    validate(control: FormControl) {
        let valid:any = null;
        $('.exclamation,.error-msg').remove();
        this.validateTest(control, (val: any) => {
            if (val == null) {
                if (control?.value == null || control?.value == undefined) {
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
        const emailRegex = /^[0-9 ]{10}$/i;
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
                let TextNode = document.createTextNode("please enter valid mobile number.");
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