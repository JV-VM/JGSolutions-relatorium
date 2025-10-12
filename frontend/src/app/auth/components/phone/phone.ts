import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
  forwardRef,
  ViewEncapsulation,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { intlTelInput } from 'intl-tel-input/angularWithUtils';
@Component({
  selector: 'phone',
  templateUrl: './phone.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PhoneNumberComponent),
      multi: true,
    },
  ],
  encapsulation: ViewEncapsulation.None, // ensures CSS applies to dynamic .iti structure
})
export class PhoneNumberComponent
  implements AfterViewInit, OnDestroy, ControlValueAccessor
{
  @ViewChild('phoneInput', { static: true }) phoneInput!: ElementRef;
  iti: any;

  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};

  ngAfterViewInit(): void {
    this.iti = intlTelInput(this.phoneInput.nativeElement, {
      initialCountry: 'br',
      separateDialCode: true,
      formatOnDisplay: true,
      autoPlaceholder: 'polite',
    });

    // Sync value on input
    this.phoneInput.nativeElement.addEventListener('input', () => {
      this.propagateValue();
    });

    // Sync value when country changes
    this.phoneInput.nativeElement.addEventListener('countrychange', () => {
      this.propagateValue();
    });
  }

  private propagateValue(): void {
    if (this.iti) {
      const e164 = this.iti.getNumber('E164');
      this.onChange(e164);
    }
  }

  // ControlValueAccessor methods
  writeValue(value: any): void {
    if (value && this.iti) {
      this.iti.setNumber(value);
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    if (this.phoneInput) {
      this.phoneInput.nativeElement.disabled = isDisabled;
    }
  }

  ngOnDestroy(): void {
    if (this.iti) {
      try {
        this.iti.destroy();
      } catch (err) {
        console.warn('intl-tel-input destroy skipped', err);
      }
    }
  }
}
