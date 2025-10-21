import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
  Output,
  EventEmitter,
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
  encapsulation: ViewEncapsulation.None,
})
export class PhoneNumberComponent
  implements AfterViewInit, OnDestroy, ControlValueAccessor
{
  @ViewChild('phoneInput', { static: true }) phoneInput!: ElementRef;
  @Output() countryChange = new EventEmitter<string>();

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

    this.phoneInput.nativeElement.addEventListener('input', () =>
      this.propagateValue()
    );

    this.phoneInput.nativeElement.addEventListener('countrychange', () => {
      const countryData = this.iti.getSelectedCountryData();
      this.countryChange.emit(countryData.iso2.toUpperCase());
      this.propagateValue();
    });

    this.phoneInput.nativeElement.addEventListener('blur', () =>
      this.onTouched()
    );
  }

  private propagateValue(): void {
    if (this.iti) {
      const e164 = this.iti.getNumber('E164');
      this.onChange(e164);
    }
  }

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
    this.phoneInput.nativeElement.disabled = isDisabled;
  }

  ngOnDestroy(): void {
    try {
      this.iti?.destroy();
    } catch {}
  }
}
