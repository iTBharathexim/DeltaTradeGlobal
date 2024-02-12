import { Directive, ElementRef, EventEmitter, HostListener, Output } from "@angular/core";
declare var $:any;

@Directive({
    selector: '[clickOutside]'
})
export class ClickOutsideDirective {
    constructor(private elementRef: ElementRef) { }
    @Output() clickOutside = new EventEmitter<any>();
    @HostListener('document:click', ['$event', '$event.target'])
    public onClick(event: MouseEvent, targetElement: HTMLElement): void {
        if (!targetElement) {
            return;
        }
        const clickedInside = this.elementRef.nativeElement.contains(targetElement);
        let htmllist: any = $(this.elementRef.nativeElement).find("*");
        console.log(htmllist)
        for (const key in htmllist) {
            const element = htmllist[key];
            if (typeof element=="object") {
                // console.log($(targetElement).find("*"),"jhsjhjsgdjhdsds")
            }
        }

        // console.log($(this.elementRef.nativeElement).find("*"),targetElement,clickedInside)
        if (clickedInside) {
            this.clickOutside.emit(true);
        } else {
            this.clickOutside.emit(false);
        }
    }
}