import {Directive, ElementRef, Input} from '@angular/core';

@Directive({
  selector: '[appAutoFocusInput]'
})
export class AutoFocusInputDirective {
  @Input() inputOrder: number = 1;
  @Input() timeout: number = 1000; // TODO: Refactor

  constructor(el: ElementRef) {
    setTimeout(() => {
      const inputs = el.nativeElement.querySelectorAll('input:not([type="hidden"]), textarea, select');
      if (inputs.length) {
        let inputIndex = this.inputOrder - 1;
        if (inputIndex < 0) {
          inputIndex = 0;
        }
        inputs[inputIndex].focus();
      }
    }, this.timeout);
  }
}
