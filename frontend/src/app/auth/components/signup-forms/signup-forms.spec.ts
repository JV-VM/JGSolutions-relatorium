import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupForms } from './signup-forms';

describe('SignupForms', () => {
  let component: SignupForms;
  let fixture: ComponentFixture<SignupForms>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignupForms]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignupForms);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
